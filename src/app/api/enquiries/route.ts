import { NextResponse } from 'next/server';
import crypto from 'crypto';

import { env } from '@/lib/env';
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

    // 5. Narrow Server Insertion into Supabase
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
      };
    };

    const dbClient = supabaseAdmin as unknown as SupabaseInsertClient;

    const { data: insertedData, error: dbError } = await dbClient
      .from('enquiries')
      .insert(insertPayload)
      .select('id, reference_number, full_name, email, service')
      .single();

    const insertedEnquiry = insertedData as {
      id: string;
      reference_number: string;
      full_name: string;
      email: string;
      service: string;
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

    // 6. Record Integration Delivery Attempt (Resend / CRM)
    try {
      if (env.RESEND_API_KEY) {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Ultron Lead <onboarding@resend.dev>',
            to:
              env.NOTIFICATION_EMAIL ||
              env.CONTACT_TO_EMAIL ||
              'info@ultronfinancials.com',
            subject: `New Lead: ${insertedEnquiry.reference_number} - ${insertedEnquiry.full_name}`,
            html: `<p><strong>Reference:</strong> ${insertedEnquiry.reference_number}</p>
                   <p><strong>Name:</strong> ${insertedEnquiry.full_name}</p>
                   <p><strong>Email:</strong> ${insertedEnquiry.email}</p>
                   <p><strong>Service:</strong> ${insertedEnquiry.service}</p>`,
          }),
        });

        const resendJson = await resendResponse.json();

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
          status: resendResponse.ok ? 'delivered' : 'failed',
          attempt_count: 1,
          external_id: resendJson.id || null,
          last_error_code: resendResponse.ok
            ? null
            : String(resendResponse.status),
        });
      }
    } catch (crmErr) {
      console.error('Integration delivery error:', crmErr);
    }

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
