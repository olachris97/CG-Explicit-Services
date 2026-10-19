import nodemailer from "nodemailer";

/**
 * Booking notification mailer.
 *
 * Every appointment booked on the website is emailed to NOTIFY_EMAIL
 * (defaults to sales@cgexplicitservices.com). Requires SMTP settings in the
 * environment; without them the server still saves bookings and logs a warning.
 */

// Settings are read lazily because server.ts calls dotenv.config() after its imports run.
export const getNotifyEmail = () => process.env.NOTIFY_EMAIL || "sales@cgexplicitservices.com";

let transporter: nodemailer.Transporter | null | undefined;

function getTransporter() {
  if (transporter !== undefined) return transporter;

  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  transporter =
    host && user && pass
      ? nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
      : null;

  if (!transporter) {
    console.warn(
      `[mailer] SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS). Booking notifications to ${getNotifyEmail()} are disabled.`
    );
  }
  return transporter;
}

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Sends a notification to the sales inbox. Never throws — a mail failure must not break a booking. */
export async function notifySales(options: {
  subject: string;
  heading: string;
  fields: [string, unknown][];
  replyTo?: string;
}) {
  const mailer = getTransporter();
  if (!mailer) return;
  const user = process.env.SMTP_USER || "";
  const from = process.env.SMTP_FROM || `CG Explicit Services <${user}>`;

  const rows = options.fields
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 12px;border-bottom:1px solid #eee;color:#0f172a;font-size:14px">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const text = options.fields
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto">
      <div style="background:#7A1F2B;color:#fff;padding:18px 22px;border-radius:10px 10px 0 0">
        <h2 style="margin:0;font-size:18px">${escapeHtml(options.heading)}</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-top:0">${rows}</table>
      <p style="color:#94a3b8;font-size:12px;margin-top:14px">Sent automatically by cgexplicitservices.com</p>
    </div>`;

  try {
    await mailer.sendMail({
      from,
      to: getNotifyEmail(),
      replyTo: options.replyTo,
      subject: options.subject,
      text,
      html
    });
  } catch (error) {
    console.error("[mailer] Failed to send booking notification:", error);
  }
}
