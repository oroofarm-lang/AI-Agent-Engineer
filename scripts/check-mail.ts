import { loadEnvConfig } from '@next/env';
import { gmailAccessToken } from '../src/lib/mail/gmail';
import { mailTransport } from '../src/lib/mail/delivery';
loadEnvConfig(process.cwd());
async function main() {
  try {
    if (process.env.MAIL_PROVIDER === 'gmail') {
      await gmailAccessToken();
      console.log(
        'Gmail OAuth token refresh succeeded. No email was sent; inbox delivery is not verified.',
      );
      return;
    }
    await mailTransport().verify();
    console.log(
      'SMTP connection and authentication succeeded. No email was sent; inbox delivery is not verified.',
    );
  } catch {
    console.error(
      'Mail verification failed. Check the selected provider configuration locally; credentials are never printed.',
    );
    process.exitCode = 1;
  }
}
void main();
