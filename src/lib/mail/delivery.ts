import nodemailer from 'nodemailer';

export function mailConfigured() {
  return Boolean(
    process.env.MAIL_FROM &&
    (process.env.SMTP_URL ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD)),
  );
}

export function mailTransport() {
  if (!mailConfigured()) throw new Error('MAIL_NOT_CONFIGURED');
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

export async function sendAccountEmail(to: string, subject: string, url: string) {
  const result = await mailTransport().sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text: `Agent Engineer\n\n${url}\n\nהקישור מיועד לאימות החשבון או לאיפוס הסיסמה, לפי בקשתך. אם לא ביקשת זאת, אפשר להתעלם מההודעה.`,
  });
  if (result?.rejected?.length) throw new Error('MAIL_REJECTED');
}
