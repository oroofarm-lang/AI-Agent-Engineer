import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const required = [
  'BETTER_AUTH_URL',
  'BETTER_AUTH_SECRET',
  'MAIL_FROM',
  'LEGAL_OPERATOR',
  'LEGAL_CONTACT_EMAIL',
  'ADMIN_EMAILS',
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) throw new Error(`Deployment is not configured: ${missing.join(', ')}`);
if (!process.env.SMTP_URL && !(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD))
  throw new Error('Deployment requires configured SMTP delivery.');
if (!process.env.BETTER_AUTH_URL.startsWith('https://'))
  throw new Error('Public origin must use HTTPS.');
if (process.env.BETTER_AUTH_SECRET.length < 32)
  throw new Error('Auth secret must be at least 32 random characters.');
console.log('Required deployment settings present. Review docs/DEPLOYMENT.md before releasing.');
