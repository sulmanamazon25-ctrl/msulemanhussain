import nodemailer from "nodemailer";
import { site } from "@/content/site";
import { formatEur } from "@/lib/shop/utils";

export { formatEur };

type MailPayload = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
};

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendMail(payload: MailPayload): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!smtpConfigured()) {
    console.warn("[mail] SMTP not configured — skipping send:", payload.subject);
    return { ok: true, skipped: true };
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.SMTP_FROM || site.emails.noreply;
  await transporter.sendMail({
    from,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
  return { ok: true };
}
