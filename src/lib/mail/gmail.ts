import nodemailer from 'nodemailer';
import { z } from 'zod';
export const gmailSendScope = 'https://www.googleapis.com/auth/gmail.send';
const tokenSchema = z.object({ access_token: z.string().min(1), scope: z.string().optional() });

/** Refresh only sending authorization. No inbox endpoint or automatic send retry. */
export async function gmailAccessToken() {
  if (
    !process.env.GMAIL_CLIENT_ID ||
    !process.env.GMAIL_CLIENT_SECRET ||
    !process.env.GMAIL_REFRESH_TOKEN
  )
    throw new Error('MAIL_NOT_CONFIGURED');
  let response: Response;
  try {
    response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GMAIL_CLIENT_ID,
        client_secret: process.env.GMAIL_CLIENT_SECRET,
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });
  } catch {
    throw new Error('GMAIL_AUTH_FAILED');
  }
  if (!response.ok) throw new Error('GMAIL_AUTH_FAILED');
  let token: z.infer<typeof tokenSchema>;
  try {
    token = tokenSchema.parse(await response.json());
  } catch {
    throw new Error('GMAIL_AUTH_FAILED');
  }
  if (token.scope && !token.scope.split(' ').includes(gmailSendScope))
    throw new Error('GMAIL_SCOPE_MISSING');
  return token.access_token;
}
export async function sendGmailEmail(to: string, subject: string, text: string, html?: string) {
  const accessToken = await gmailAccessToken();
  // Nodemailer builds inert MIME bytes only; this transport never opens an SMTP connection.
  const built = await nodemailer
    .createTransport({
      streamTransport: true,
      buffer: true,
      newline: 'windows',
      disableFileAccess: true,
      disableUrlAccess: true,
    })
    .sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      ...(html ? { html } : {}),
    });
  if (!Buffer.isBuffer(built.message)) throw new Error('GMAIL_MIME_FAILED');
  const raw = built.message.toString('base64url');
  let response: Response;
  try {
    response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(15000),
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw }),
    });
  } catch {
    throw new Error('GMAIL_SEND_UNCONFIRMED');
  }
  if (!response.ok) throw new Error('GMAIL_SEND_FAILED');
  let accepted: unknown;
  try {
    accepted = await response.json();
  } catch {
    throw new Error('GMAIL_SEND_UNCONFIRMED');
  }
  if (!z.object({ id: z.string().min(1) }).safeParse(accepted).success)
    throw new Error('GMAIL_SEND_UNCONFIRMED');
}
