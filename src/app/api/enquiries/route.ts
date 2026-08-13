import { NextResponse } from 'next/server';
import crypto from 'crypto';

import { env } from '@/lib/env';
import { sendEnquiryNotification } from '@/lib/mailer';
import { createAdminClient } from '@/lib/supabase/admin';
import { enquirySchema } from '@/lib/validation/enquiry';

// In-memory submission fingerprinting cache to prevent immediate duplicate submissions
const recentFingerprints = new Map<string, number>();
const FINGERPRINT_TTL_MS = 5 * 60 * 1000; // 5 minutes

function cleanOldFingerprints() {
  const now = Date.now();
  for (const [key, timestamp] of recentFingerprints.entries()) {
    if (now - timestamp > FINGERPRINT_TTL_MS) {
      recentFingerprints.delete(key);
    }
  }
}

export async function POST(request: Request) {
  try {
    // 1. Content-Length / Body Size Limit Check (Max 50KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 50 * 1024) {
      return NextResponse.json(
        { success: false, message: 'Payload size exceeds limit.' },
        { status: 413 },
      );
    }

    const body = await request.json();

    // 2. Validate payload with Zod
    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      const firstError =
        validationResult.error.errors[0]?.message || 'Invalid form input.';
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 },
      );
    }

    const data = validationResult.data;

    // 3. Honeypot check (spam protection)
    if (data.website && data.website.trim() !== '') {
      // Silently discard spam submission
      return NextResponse.json({
        success: true,
        referenceNumber: 'UF-2026-SPAM',
        message: 'Enquiry submitted successfully.',
      });
    }

    // 4. Submission Fingerprinting for Idempotency
    cleanOldFingerprints();
    const fingerprintRaw = `${data.email.toLowerCase()}:${(data.message || '').toLowerCase()}`;
    const fingerprintHash = crypto
      .createHash('sha256')
      .update(fingerprintRaw)
      .digest('hex');

    if (recentFingerprints.has(fingerprintHash)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'A duplicate submission was recently received. Please wait a few minutes before trying again.',
        },
        { status: 429 },
      );
    }

    recentFingerprints.set(fingerprintHash, Date.now());

    // 5. Database Insertion into Supabase
    const supabaseAdmin = createAdminClient();

    const insertPayload = {
      full_name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      company_name: data.company || null,
      business_type: data.businessType || data.company || null,
      service: data.service,
      message: data.message || null,
      source_page: data.sourcePage || '/contact',
      utm_source: data.utmSource || null,
      utm_medium: data.utmMedium || null,
      utm_campaign: data.utmCampaign || null,
      utm_term: data.utmTerm || null,
      utm_content: data.utmContent || null,
      status: 'new' as const,
      priority: 'normal' as const,
    };

    type SupabaseInsertClient = {
      from: (table: string) => {
        insert: (payload: Record<string, unknown>) => {
          select: (cols: string) => {
            single: () => Promise<{ data: unknown; error: unknown }>;
          };
        };
        select: (cols: string) => {
          eq: (
            col: string,
            val: string,
          ) => {
            single: () => Promise<{ data: unknown; error: unknown }>;
          };
        };
      };
    };

    const dbClient = supabaseAdmin as unknown as SupabaseInsertClient;

    const { data: insertedData, error: dbError } = await dbClient
      .from('enquiries')
      .insert(insertPayload)
      .select(
        'id, reference_number, full_name, email, phone, company_name, business_type, service, message, source_page, created_at',
      )
      .single();

    const insertedEnquiry = insertedData as {
      id: string;
      reference_number: string;
      full_name: string;
      email: string;
      phone: string | null;
      company_name: string | null;
      business_type: string | null;
      service: string;
      message: string | null;
      source_page: string | null;
      created_at: string;
    } | null;

    if (dbError || !insertedEnquiry) {
      console.error('Supabase DB insertion error:', dbError);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to record enquiry. Please try again.',
        },
        { status: 500 },
      );
    }

    // 6. Resolve Recipient Email from Website Settings or Env Fallback
    let recipientEmail: string | null = null;
    try {
      const { data: settingRow } = await dbClient
        .from('website_settings')
        .select('setting_value')
        .eq('setting_key', 'cta_settings')
        .single();

      if (settingRow) {
        const val = (settingRow as { setting_value?: Record<string, string> })
          .setting_value;
        const candidate =
          val?.form_notification_email || val?.consultation_email_recipient;
        if (candidate && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.trim())) {
          recipientEmail = candidate.trim();
        }
      }
    } catch {
      // Fallback silently if settings lookup is unavailable
    }

    if (!recipientEmail) {
      recipientEmail =
        env.INQUIRY_NOTIFICATION_EMAIL ||
        env.NOTIFICATION_EMAIL ||
        env.CONTACT_TO_EMAIL ||
        'info@ultronfinancials.com';
    }

    // 7. Send Notification Email Server-Side
    const mailerResult = await sendEnquiryNotification({
      referenceNumber: insertedEnquiry.reference_number,
      enquiryId: insertedEnquiry.id,
      fullName: insertedEnquiry.full_name,
      email: insertedEnquiry.email,
      phone: insertedEnquiry.phone,
      companyName: insertedEnquiry.company_name,
      businessType: insertedEnquiry.business_type,
      service: insertedEnquiry.service,
      message: insertedEnquiry.message,
      sourcePage: insertedEnquiry.source_page || data.sourcePage || '/contact',
      formName: data.formName || 'Website Enquiry Form',
      submittedAt: insertedEnquiry.created_at,
      recipientEmail,
    });

    // 8. Record Integration Delivery Attempt in Supabase
    try {
      const deliveryDbClient = supabaseAdmin as unknown as {
        from: (table: string) => {
          insert: (
            payload: Record<string, unknown>,
          ) => Promise<{ error: unknown }>;
        };
      };

      await deliveryDbClient.from('integration_deliveries').insert({
        enquiry_id: insertedEnquiry.id,
        destination: 'resend_email',
        status: mailerResult.success ? 'delivered' : 'failed',
        attempt_count: 1,
        external_id: mailerResult.externalId || null,
        last_error_code:
          mailerResult.lastErrorCode ||
          (mailerResult.skipped ? 'NOT_CONFIGURED' : null),
      });
    } catch (deliveryLogErr) {
      console.error(
        'Failed to log integration delivery status:',
        deliveryLogErr,
      );
    }

    // 9. Controlled Success Response
    return NextResponse.json({
      success: true,
      referenceNumber: insertedEnquiry.reference_number,
      message: 'Thank you! Your enquiry has been received.',
    });
  } catch (error) {
    console.error('Server error processing enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 },
    );
  }
}
