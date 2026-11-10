import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = Boolean(process.env.VERCEL || process.env.NOW_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME);
const OUTBOX_DIR = isVercel
  ? path.join(os.tmpdir(), 'dikaiosune-data', 'outbox')
  : path.join(__dirname, '..', 'data', 'outbox');

// Ensure outbox directory exists
try {
  if (!fs.existsSync(OUTBOX_DIR)) {
    fs.mkdirSync(OUTBOX_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('[EmailService] Outbox directory creation warning:', err.message);
}

/**
 * Configure Nodemailer transport
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  return null;
}

/**
 * Build Admin Notification Email HTML
 */
function buildAdminNotificationHtml(inquiry) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Partner Inquiry - Dikaiosune</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F6F1E7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F2420;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F6F1E7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFDF8; border: 1px solid #DCD4C3; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1E3A2B; padding: 25px 30px; border-bottom: 3px solid #C08A2E;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="color: #E2C27D; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">
                      THE DIKAIOSUNE MEGA PROJECT
                    </div>
                    <h1 style="color: #FFFFFF; font-family: Georgia, serif; font-size: 24px; margin: 0; font-weight: 600;">
                      New Partner Expression of Interest
                    </h1>
                  </td>
                  <td align="right">
                    <span style="background-color: #C08A2E; color: #1F2420; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 20px;">
                      ${inquiry.id}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin-top: 0; margin-bottom: 20px; font-size: 15px; line-height: 1.5; color: #5B6359;">
                A new inquiry has been submitted through the <strong>${escapeHtml(inquiry.source)}</strong> portal. Details are provided below:
              </p>

              <!-- Inquiry Summary Table -->
              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #F8F5EE; border-radius: 12px; border: 1px solid #E5DCCB; margin-bottom: 25px; font-size: 14px;">
                <tr>
                  <td width="35%" style="font-weight: 600; color: #8B4A2B; border-bottom: 1px solid #E5DCCB;">Full Name:</td>
                  <td style="border-bottom: 1px solid #E5DCCB; font-weight: 700; color: #1E3A2B;">${escapeHtml(inquiry.name)}</td>
                </tr>
                <tr>
                  <td style="font-weight: 600; color: #8B4A2B; border-bottom: 1px solid #E5DCCB;">Official Email:</td>
                  <td style="border-bottom: 1px solid #E5DCCB;"><a href="mailto:${escapeHtml(inquiry.email)}" style="color: #1E3A2B; font-weight: 600; text-decoration: underline;">${escapeHtml(inquiry.email)}</a></td>
                </tr>
                <tr>
                  <td style="font-weight: 600; color: #8B4A2B; border-bottom: 1px solid #E5DCCB;">Phone Number:</td>
                  <td style="border-bottom: 1px solid #E5DCCB;">${escapeHtml(inquiry.phone || 'Not provided')}</td>
                </tr>
                <tr>
                  <td style="font-weight: 600; color: #8B4A2B; border-bottom: 1px solid #E5DCCB;">Organization / Univ:</td>
                  <td style="border-bottom: 1px solid #E5DCCB;">${escapeHtml(inquiry.org || 'Individual / Self')}</td>
                </tr>
                <tr>
                  <td style="font-weight: 600; color: #8B4A2B; border-bottom: 1px solid #E5DCCB;">Partnership Track:</td>
                  <td style="border-bottom: 1px solid #E5DCCB; font-weight: 700; color: #C08A2E;">${escapeHtml(inquiry.category)}</td>
                </tr>
                <tr>
                  <td style="font-weight: 600; color: #8B4A2B;">Timestamp (UTC):</td>
                  <td>${new Date(inquiry.submittedAt).toUTCString()}</td>
                </tr>
              </table>

              <!-- Message / Expression of Interest -->
              <div style="margin-bottom: 25px;">
                <h3 style="font-family: Georgia, serif; font-size: 16px; color: #1E3A2B; margin: 0 0 8px 0; font-weight: 600;">
                  Message / Expression of Interest:
                </h3>
                <div style="background-color: #FFFFFF; border: 1px solid #DCD4C3; border-left: 4px solid #C08A2E; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1F2420; white-space: pre-wrap;">
                  ${escapeHtml(inquiry.message || 'No specific note provided.')}
                </div>
              </div>

              <!-- Quick Action Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(inquiry.email)}?subject=Re: Expression of Interest in The Dikaiosune Mega Project [${inquiry.id}]" 
                       style="display: inline-block; background-color: #1E3A2B; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.15);">
                      Directly Reply to ${escapeHtml(inquiry.name)} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #EDE6D6; padding: 20px 30px; font-size: 12px; color: #5B6359; border-top: 1px solid #DCD4C3;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <strong>Dikaiosune Private Limited</strong> &middot; CIN U01111UP2022PTC174884<br>
                    Project Site: Ram Sanehi Ghat, Barabanki, Uttar Pradesh
                  </td>
                  <td align="right">
                    <a href="https://dikaiosune.in" style="color: #8B4A2B; font-weight: 600; text-decoration: none;">dikaiosune.in</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Build Partner Acknowledgement Email HTML
 */
function buildPartnerAcknowledgementHtml(inquiry) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Acknowledgement - Dikaiosune Mega Project</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F6F1E7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F2420;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F6F1E7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFDF8; border: 1px solid #DCD4C3; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1E3A2B; padding: 28px 30px; border-bottom: 3px solid #C08A2E;">
              <div style="color: #E2C27D; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">
                DIKAIOSUNE PRIVATE LIMITED
              </div>
              <h1 style="color: #FFFFFF; font-family: Georgia, serif; font-size: 24px; margin: 0; font-weight: 600;">
                Expression of Interest Acknowledged
              </h1>
              <div style="color: #A9BFA0; font-size: 12px; margin-top: 4px; font-style: italic;">
                Justice for every living soul &middot; Ram Sanehi Ghat, Barabanki
              </div>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin-top: 0; font-size: 16px; line-height: 1.5; color: #1E3A2B;">
                Dear <strong>${escapeHtml(inquiry.name)}</strong>,
              </p>

              <p style="font-size: 15px; line-height: 1.6; color: #333C35;">
                Thank you for reaching out to <strong>Dikaiosune Private Limited</strong> regarding <em>The Dikaiosune Mega Project — Integrated Farm &amp; Veterinary University</em>.
              </p>

              <p style="font-size: 15px; line-height: 1.6; color: #333C35;">
                We have securely logged your expression of interest under the <strong>${escapeHtml(inquiry.category)}</strong> track.
              </p>

              <!-- Reference Badge -->
              <div style="background-color: #F8F5EE; border-left: 4px solid #C08A2E; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 14px;">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #8B4A2B; letter-spacing: 1px; margin-bottom: 4px;">
                  INQUIRY REFERENCE NUMBER
                </div>
                <div style="font-family: monospace; font-size: 18px; font-weight: 700; color: #1E3A2B;">
                  ${inquiry.id}
                </div>
              </div>

              <!-- What to Expect Next -->
              <h3 style="font-family: Georgia, serif; font-size: 16px; color: #1E3A2B; margin: 20px 0 10px 0; font-weight: 600;">
                Next Steps
              </h3>
              <ul style="font-size: 14px; line-height: 1.6; color: #5B6359; padding-left: 20px; margin: 0 0 25px 0;">
                <li>Our executive leadership and academic advisory team review all incoming partnership proposals.</li>
                <li>An authorized representative will follow up with you at <strong>${escapeHtml(inquiry.email)}</strong> within two business days.</li>
                <li>If your inquiry involves technical equipment or research collaboration, please keep relevant specifications or proposal briefs ready.</li>
              </ul>

              <!-- Summary of Submitted Information -->
              <div style="background-color: #FFF; border: 1px solid #E5DCCB; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #5B6359; margin-bottom: 25px;">
                <div style="font-weight: 700; color: #1E3A2B; margin-bottom: 6px;">Submitted Summary:</div>
                <div>&bull; <strong>Track:</strong> ${escapeHtml(inquiry.category)}</div>
                ${inquiry.org ? `<div>&bull; <strong>Organization:</strong> ${escapeHtml(inquiry.org)}</div>` : ''}
                ${inquiry.phone ? `<div>&bull; <strong>Contact Phone:</strong> ${escapeHtml(inquiry.phone)}</div>` : ''}
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #5B6359; margin-bottom: 0;">
                Warm regards,<br>
                <strong style="color: #1E3A2B;">The Partnership &amp; Academic Affairs Committee</strong><br>
                Dikaiosune Private Limited
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #EDE6D6; padding: 20px 30px; font-size: 12px; color: #5B6359; border-top: 1px solid #DCD4C3;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <strong>Dikaiosune Private Limited</strong> &middot; CIN U01111UP2022PTC174884<br>
                    Registered Office: Mohari Khurd, Mohanlalganj, Lucknow, UP, India<br>
                    Project Site: Ram Sanehi Ghat, Barabanki, UP, India
                  </td>
                  <td align="right" valign="top">
                    <a href="https://dikaiosune.in" style="color: #8B4A2B; font-weight: 600; text-decoration: none;">dikaiosune.in</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Escape HTML utility
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Dispatch Inquiry Emails
 * 1. Internal Notification to dikaiosunepvtltd@gmail.com and admin@dikaiosune.in
 * 2. User/Partner Acknowledgement to the submitted email
 */
export async function dispatchInquiryEmails(inquiry) {
  const adminEmailsRaw = process.env.ADMIN_EMAILS || 'dikaiosunepvtltd@gmail.com,admin@dikaiosune.in';
  const adminEmails = adminEmailsRaw.split(',').map(e => e.trim()).filter(Boolean);
  const fromEmail = process.env.FROM_EMAIL || '"Dikaiosune Mega Project" <admin@dikaiosune.in>';

  const adminSubject = `[Partner Inquiry] ${inquiry.category} — ${inquiry.name} (${inquiry.org || 'Individual'}) [${inquiry.id}]`;
  const adminHtml = buildAdminNotificationHtml(inquiry);
  const adminText = `
NEW PARTNER INQUIRY - THE DIKAIOSUNE MEGA PROJECT
Reference ID: ${inquiry.id}
Date: ${inquiry.submittedAt}

Full Name: ${inquiry.name}
Official Email: ${inquiry.email}
Phone: ${inquiry.phone || 'N/A'}
Organization: ${inquiry.org || 'N/A'}
Partnership Track: ${inquiry.category}
Source: ${inquiry.source}

Message / Expression of Interest:
${inquiry.message || 'N/A'}
  `.trim();

  const ackSubject = `Acknowledgement: Your Expression of Interest — The Dikaiosune Mega Project [${inquiry.id}]`;
  const ackHtml = buildPartnerAcknowledgementHtml(inquiry);
  const ackText = `
Dear ${inquiry.name},

Thank you for reaching out to Dikaiosune Private Limited regarding The Dikaiosune Mega Project — Integrated Farm & Veterinary University.

We have securely logged your expression of interest under the "${inquiry.category}" track.
Your Reference Number is: ${inquiry.id}

Our leadership and academic committee review incoming partnership proposals regularly. We will contact you at ${inquiry.email} within two business days.

Warm regards,
Dikaiosune Private Limited
CIN: U01111UP2022PTC174884
Project Site: Ram Sanehi Ghat, Barabanki, Uttar Pradesh
  `.trim();

  const results = {
    smtpSent: false,
    outboxSaved: true,
    adminRecipients: adminEmails,
    partnerRecipient: inquiry.email,
    timestamp: new Date().toISOString()
  };

  // 1. Save rendered artifacts to outbox for audit and inspection
  try {
    fs.writeFileSync(
      path.join(OUTBOX_DIR, `${inquiry.id}_admin_notification.html`),
      adminHtml,
      'utf-8'
    );
    fs.writeFileSync(
      path.join(OUTBOX_DIR, `${inquiry.id}_partner_acknowledgement.html`),
      ackHtml,
      'utf-8'
    );
    fs.writeFileSync(
      path.join(OUTBOX_DIR, `${inquiry.id}_meta.json`),
      JSON.stringify({
        id: inquiry.id,
        submittedAt: inquiry.submittedAt,
        adminRecipients: adminEmails,
        partnerRecipient: inquiry.email,
        adminSubject,
        ackSubject
      }, null, 2),
      'utf-8'
    );
  } catch (err) {
    console.error('Error writing outbox artifacts:', err);
  }

  // 2. Send via live SMTP if credentials configured
  const transporter = createTransporter();
  if (transporter) {
    try {
      // Send Admin Notification (with Reply-To set to Partner's email)
      await transporter.sendMail({
        from: fromEmail,
        to: adminEmails,
        replyTo: inquiry.email,
        subject: adminSubject,
        text: adminText,
        html: adminHtml
      });

      // Send Partner Acknowledgement
      await transporter.sendMail({
        from: fromEmail,
        to: inquiry.email,
        subject: ackSubject,
        text: ackText,
        html: ackHtml
      });

      results.smtpSent = true;
      console.log(`[EmailService] Successfully sent SMTP emails for ${inquiry.id} to admins and ${inquiry.email}`);
    } catch (smtpErr) {
      console.error(`[EmailService] SMTP error for ${inquiry.id}:`, smtpErr.message);
      results.smtpError = smtpErr.message;
    }
  } else {
    console.log(`[EmailService] SMTP not configured with live credentials. Emails logged to data/outbox for ${inquiry.id}`);
  }

  return results;
}
