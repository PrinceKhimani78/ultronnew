import { env } from '@/lib/env';

/**
 * Escapes raw text input to prevent HTML injection in emails.
 */
function escapeHtml(unsafe: string | null | undefined): string {
  if (!unsafe) return '<em>Not provided</em>';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export type SendEnquiryNotificationInput = {
  referenceNumber: string;
  enquiryId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  businessType?: string | null;
  service: string;
  message?: string | null;
  sourcePage?: string | null;
  formName?: string | null;
  submittedAt?: string;
  recipientEmail?: string | null;
};

export type MailerResult = {
  success: boolean;
  skipped?: boolean;
  externalId?: string | null;
  lastErrorCode?: string | null;
  errorSummary?: string | null;
};

/**
 * Sends a clean, branded HTML enquiry notification email server-side.
 * Never throws an error; returns a MailerResult summarizing delivery state.
 */
export async function sendEnquiryNotification(
  input: SendEnquiryNotificationInput,
): Promise<MailerResult> {
  const {
    referenceNumber,
    enquiryId,
    fullName,
    email,
    phone,
    companyName,
    businessType,
    service,
    message,
    sourcePage,
    formName,
    submittedAt,
    recipientEmail,
  } = input;

  // Determine recipient email: explicitly provided > env.INQUIRY_NOTIFICATION_EMAIL > fallback
  const toEmail =
    recipientEmail && recipientEmail.trim()
      ? recipientEmail.trim()
      : env.INQUIRY_NOTIFICATION_EMAIL ||
        env.NOTIFICATION_EMAIL ||
        env.CONTACT_TO_EMAIL ||
        'info@ultronfinancials.com';

  // Determine verified sender
  const fromEmail =
    env.INQUIRY_FROM_EMAIL ||
    env.CONTACT_FROM_EMAIL ||
    'Ultron Financials <onboarding@resend.dev>';

  if (!env.RESEND_API_KEY) {
    console.warn(
      `[Mailer] Email delivery skipped for enquiry ${referenceNumber} (${toEmail}): RESEND_API_KEY is not configured.`,
    );
    return {
      success: false,
      skipped: true,
      errorSummary: 'RESEND_API_KEY is not configured.',
    };
  }

  const subjectService =
    service && service.trim() ? service : 'Ultron Financials';
  const subject = `New Website Enquiry — ${subjectService}`;

  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleString('en-US', {
        timeZone: 'Asia/Dubai',
        dateStyle: 'full',
        timeStyle: 'medium',
      }) + ' (GST)'
    : new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dubai',
        dateStyle: 'full',
        timeStyle: 'medium',
      }) + ' (GST)';

  const displayBusiness = businessType || companyName || null;
  const displayForm = formName || 'Website Enquiry Form';
  const displaySource = sourcePage || '/contact';

  // Plain Text Version
  const textContent = `
NEW WEBSITE ENQUIRY - ULTRON FINANCIALS
========================================

Reference Number: ${referenceNumber}
Lead ID: ${enquiryId}
Form Name: ${displayForm}
Submission Time: ${formattedDate}

SUBMITTED DETAILS:
------------------
Full Name: ${fullName}
Email Address: ${email}
Phone Number: ${phone || 'Not provided'}
Business Type / Company: ${displayBusiness || 'Not provided'}
Service Interested In: ${service}
Source Page: ${displaySource}

MESSAGE / SITUATION:
--------------------
${message || 'No additional message provided.'}

--
Ultron Financials Advisory Lead System
  `.trim();

  // Branded HTML Version (#035551 Dark Teal, #FDFBEE Off-white)
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A1A1A; line-height: 1.5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f5f7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #035551; padding: 28px 32px; text-align: left;">
              <h1 style="margin: 0; color: #FDFBEE; font-size: 22px; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase;">
                Ultron Financials
              </h1>
              <p style="margin: 6px 0 0 0; color: rgba(253, 251, 238, 0.85); font-size: 14px; font-weight: 400;">
                New Website Lead Notification
              </p>
            </td>
          </tr>

          <!-- Notice Bar -->
          <tr>
            <td style="background-color: #FDFBEE; padding: 14px 32px; border-bottom: 1px solid rgba(3, 85, 81, 0.15);">
              <span style="color: #035551; font-weight: 600; font-size: 13px; text-transform: uppercase; tracking: 0.05em;">
                Reference: ${escapeHtml(referenceNumber)}
              </span>
              <span style="float: right; color: #5A5A5A; font-size: 12px;">
                ${escapeHtml(formattedDate)}
              </span>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px 0; color: #035551; font-size: 18px; font-weight: 700;">
                Enquiry Details
              </h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" border="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr style="border-bottom: 1px solid #E5E7EB;">
                  <td width="35%" style="font-size: 13px; font-weight: 600; color: #4B5563; text-transform: uppercase; padding: 10px 0;">Full Name</td>
                  <td style="font-size: 15px; font-weight: 600; color: #111827; padding: 10px 0;">${escapeHtml(fullName)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E5E7EB;">
                  <td style="font-size: 13px; font-weight: 600; color: #4B5563; text-transform: uppercase; padding: 10px 0;">Email Address</td>
                  <td style="font-size: 15px; color: #111827; padding: 10px 0;">
                    <a href="mailto:${escapeHtml(email)}" style="color: #035551; text-decoration: underline; font-weight: 600;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #E5E7EB;">
                  <td style="font-size: 13px; font-weight: 600; color: #4B5563; text-transform: uppercase; padding: 10px 0;">Phone Number</td>
                  <td style="font-size: 15px; color: #111827; padding: 10px 0;">${escapeHtml(phone)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E5E7EB;">
                  <td style="font-size: 13px; font-weight: 600; color: #4B5563; text-transform: uppercase; padding: 10px 0;">Business / Company</td>
                  <td style="font-size: 15px; color: #111827; padding: 10px 0;">${escapeHtml(displayBusiness)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E5E7EB;">
                  <td style="font-size: 13px; font-weight: 600; color: #4B5563; text-transform: uppercase; padding: 10px 0;">Service Interested In</td>
                  <td style="font-size: 15px; font-weight: 700; color: #035551; padding: 10px 0;">${escapeHtml(service)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E5E7EB;">
                  <td style="font-size: 13px; font-weight: 600; color: #4B5563; text-transform: uppercase; padding: 10px 0;">Form Origin</td>
                  <td style="font-size: 14px; color: #6B7280; padding: 10px 0;">${escapeHtml(displayForm)} (${escapeHtml(displaySource)})</td>
                </tr>
                <tr>
                  <td style="font-size: 13px; font-weight: 600; color: #4B5563; text-transform: uppercase; padding: 10px 0;">Lead ID</td>
                  <td style="font-size: 13px; font-family: monospace; color: #6B7280; padding: 10px 0;">${escapeHtml(enquiryId)}</td>
                </tr>
              </table>

              <!-- Message Box -->
              <div style="background-color: #FDFBEE; border-left: 4px solid #035551; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-top: 10px;">
                <h3 style="margin: 0 0 8px 0; color: #035551; font-size: 14px; font-weight: 700; text-transform: uppercase;">
                  Message / Client Situation
                </h3>
                <p style="margin: 0; font-size: 14px; color: #374151; white-space: pre-wrap; word-break: break-word;">
                  ${escapeHtml(message)}
                </p>
              </div>

              <!-- Action Callout -->
              <div style="margin-top: 28px; text-align: center;">
                <a href="mailto:${escapeHtml(email)}?subject=Re:%20Enquiry%20${encodeURIComponent(referenceNumber)}" 
                   style="display: inline-block; background-color: #035551; color: #FDFBEE; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.03em;">
                  Reply Directly to ${escapeHtml(fullName)}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 32px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 12px; color: #9CA3AF;">
              This notification was generated automatically by the Ultron Financials website advisory lead engine.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        html: htmlContent,
        text: textContent,
      }),
    });

    const resendJson = await resendResponse.json();

    if (!resendResponse.ok) {
      const errorMsg =
        resendJson.message ||
        `Resend API error status ${resendResponse.status}`;
      console.error(
        `[Mailer] Resend API delivery failed for enquiry ${referenceNumber}:`,
        errorMsg,
      );
      return {
        success: false,
        externalId: null,
        lastErrorCode: String(resendResponse.status),
        errorSummary: errorMsg,
      };
    }

    console.warn(
      `[Mailer] Email notification delivered successfully for enquiry ${referenceNumber} to ${toEmail} (ID: ${resendJson.id})`,
    );
    return {
      success: true,
      externalId: resendJson.id || null,
      lastErrorCode: null,
      errorSummary: null,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : 'Unknown mailer network error';
    console.error(
      `[Mailer] Exception sending email for enquiry ${referenceNumber}:`,
      errorMsg,
    );
    return {
      success: false,
      externalId: null,
      lastErrorCode: 'NETWORK_ERROR',
      errorSummary: errorMsg,
    };
  }
}
