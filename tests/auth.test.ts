import { afterEach, expect, it, vi } from 'vitest';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { createAuth, authOptions } from '../src/lib/auth/config';
const mail = vi.hoisted(() => ({ messages: [] as { text: string; to: string }[] }));
vi.mock('nodemailer', () => ({
  default: {
    createTransport: () => ({
      sendMail: async (message: { text: string; to: string }) => {
        mail.messages.push(message);
      },
    }),
  },
}));
const open: ReturnType<typeof connect>[] = [];
afterEach(() => {
  open.splice(0).forEach((c) => c.sqlite.close());
  mail.messages = [];
  vi.unstubAllEnvs();
});
function fixture() {
  vi.stubEnv('BETTER_AUTH_URL', 'https://academy.example.test');
  vi.stubEnv('BETTER_AUTH_SECRET', 'test-only-cryptographic-secret-123456789012345');
  vi.stubEnv('SMTP_URL', 'smtp://test.invalid');
  vi.stubEnv('MAIL_FROM', 'test@example.test');
  const c = connect(':memory:');
  open.push(c);
  setupDatabase(c, loadCurriculum());
  return { c, auth: createAuth(c) };
}
it('public hosting fails closed without required configuration', () => {
  const { c } = fixture();
  vi.stubEnv('SMTP_URL', '');
  expect(() => authOptions(c)).toThrow('Public auth requires');
});
it('requires email verification, delivers reset through transport and revokes old sessions', async () => {
  const { auth } = fixture(),
    origin = 'https://academy.example.test';
  const headers = { Origin: origin, 'Content-Type': 'application/json', 'x-real-ip': '192.0.2.22' };
  const post = (route: string, data: unknown) =>
    auth.handler(
      new Request(`${origin}/api/auth${route}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      }),
    );
  const credentials = {
    email: 'verified@example.test',
    password: 'Long password for test 926',
    name: 'Verified Learner',
  };
  expect((await post('/sign-up/email', credentials)).status).toBe(200);
  expect(mail.messages).toHaveLength(1);
  expect((await post('/sign-in/email', credentials)).status).toBe(403);
  const verification = mail.messages[0].text.split('\n\n')[1];
  expect((await auth.handler(new Request(verification))).status).toBeLessThan(400);
  const signedIn = await post('/sign-in/email', credentials);
  expect(signedIn.status).toBe(200);
  const cookie = signedIn.headers
    .getSetCookie()
    .map((value) => value.split(';')[0])
    .join('; ');
  expect(cookie).toContain('session_token=');
  expect(signedIn.headers.get('set-cookie')).toContain('Secure');
  const before = await auth.api.getSession({ headers: new Headers({ cookie }) });
  expect(before?.user.emailVerified).toBe(true);
  expect(
    (await post('/request-password-reset', { email: credentials.email, redirectTo: '/auth' }))
      .status,
  ).toBe(200);
  const resetUrl = mail.messages.at(-1)!.text.split('\n\n')[1];
  // Reset emails first visit the library's redirect endpoint, which yields the form token.
  const resetRedirect = await auth.handler(new Request(resetUrl));
  const target = new URL(resetRedirect.headers.get('location')!, origin);
  const token = target.searchParams.get('token');
  expect(token).toBeTruthy();
  expect(
    (await post('/reset-password', { token, newPassword: 'Different long password 826' })).status,
  ).toBe(200);
  expect(await auth.api.getSession({ headers: new Headers({ cookie }) })).toBeNull();
  expect(
    (await post('/reset-password', { token, newPassword: 'Reused token password 333' })).status,
  ).toBe(400);
  expect(
    (await post('/sign-in/email', { ...credentials, password: 'Different long password 826' }))
      .status,
  ).toBe(200);
});
