import { loadEnvConfig } from '@next/env';
import { mailTransport } from '../src/lib/mail/delivery';
loadEnvConfig(process.cwd());
async function main() {
  try {
    await mailTransport().verify();
    console.log('SMTP connection and authentication succeeded. No email was sent; inbox delivery is not verified.');
  } catch {
    console.error('SMTP verification failed. Check SMTP configuration and provider access locally; credentials are never printed.');
    process.exitCode = 1;
  }
}
void main();
