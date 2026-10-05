import nodemailer from 'nodemailer';
import { sendGmailEmail } from './gmail';
import { accountEmail, type AccountEmailKind } from './templates';

export function mailConfigured() {
  if (process.env.MAIL_PROVIDER === 'gmail')
    return Boolean(
      process.env.MAIL_FROM &&
      process.env.GMAIL_CLIENT_ID &&
      process.env.GMAIL_CLIENT_SECRET &&
      process.env.GMAIL_REFRESH_TOKEN,
    );
  if (process.env.MAIL_PROVIDER && process.env.MAIL_PROVIDER !== 'smtp') return false;
  return Boolean(
    process.env.MAIL_FROM &&
    (process.env.SMTP_URL ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD)),
  );
}

export function mailTransport() {
  if (!mailConfigured()) throw new Error('MAIL_NOT_CONFIGURED');
  if (process.env.MAIL_PROVIDER === 'gmail') throw new Error('SMTP_NOT_SELECTED');
  return nodemailer.createTransport({
    ...(process.env.SMTP_URL
      ? { url: process.env.SMTP_URL }
      : {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || '465'),
          secure: (process.env.SMTP_PORT || '465') === '465',
          auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASSWORD! },
        }),
    requireTLS: true,
    tls: { minVersion: 'TLSv1.2' },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
}

export async function sendAccountEmail(to: string, subject: string, url: string, name?: string) {
  const kind = subject.startsWith('איפוס') ? 'reset' : 'verification';
  return sendTemplatedEmail(to, kind, url, name);
}

export async function sendTemplatedEmail(
  to: string,
  kind: AccountEmailKind,
  url: string,
  name?: string,
) {
  const { subject, text, html } = accountEmail(kind, url, name);
  if (process.env.MAIL_PROVIDER === 'gmail') {
    if (!mailConfigured()) throw new Error('MAIL_NOT_CONFIGURED');
    await sendGmailEmail(to, subject, text, html);
    return;
  }
  const result = await mailTransport().sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
    html,
  });
  if (result?.rejected?.length) throw new Error('MAIL_REJECTED');
}
