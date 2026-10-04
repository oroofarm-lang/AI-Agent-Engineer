import { afterEach, expect, it, vi } from 'vitest';
import { gmailAccessToken, gmailSendScope, sendGmailEmail } from '../src/lib/mail/gmail';
import { mailConfigured } from '../src/lib/mail/delivery';
import { gmailOAuthConfiguration } from '../scripts/lib/gmail-config.mjs';
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
function fixture() {
  vi.stubEnv('MAIL_PROVIDER', 'gmail');
  vi.stubEnv('MAIL_FROM', 'Agent Engineer <sender@example.test>');
  vi.stubEnv('GMAIL_CLIENT_ID', 'fixture.apps.googleusercontent.com');
  vi.stubEnv('GMAIL_CLIENT_SECRET', 'synthetic-secret');
  vi.stubEnv('GMAIL_REFRESH_TOKEN', 'synthetic-refresh');
}
it('uses only token refresh and the send endpoint, encodes MIME, and never requests inbox access', async () => {
  fixture();
  const request = vi
    .fn()
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ access_token: 'synthetic-access', scope: gmailSendScope })),
    )
    .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'synthetic-message-id' })));
  vi.stubGlobal('fetch', request);
  expect(mailConfigured()).toBe(true);
  await sendGmailEmail(
    'learner@example.test',
    'איפוס סיסמה',
    'https://academy.example.test/auth?token=synthetic',
  );
  expect(request).toHaveBeenCalledTimes(2);
  expect(request.mock.calls[0][0]).toBe('https://oauth2.googleapis.com/token');
  expect(request.mock.calls[1][0]).toBe(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
  );
  const mime = Buffer.from(JSON.parse(request.mock.calls[1][1].body).raw, 'base64url').toString();
  expect(mime).toContain('To: learner@example.test');
  expect(mime).toContain('sender@example.test');
  expect(mime).not.toContain('synthetic-secret');
  expect(mime).not.toContain('synthetic-refresh');
});
it('rejects revoked authorization or missing send scope before any message, and does not retry ambiguous sending', async () => {
  fixture();
  const request = vi
    .fn()
    .mockResolvedValueOnce(new Response('private-provider-error', { status: 400 }));
  vi.stubGlobal('fetch', request);
  await expect(gmailAccessToken()).rejects.toThrow('GMAIL_AUTH_FAILED');
  expect(request).toHaveBeenCalledTimes(1);
  request
    .mockReset()
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'test', scope: 'openid' })));
  await expect(sendGmailEmail('a@example.test', 'Test', 'Synthetic')).rejects.toThrow(
    'GMAIL_SCOPE_MISSING',
  );
  expect(request).toHaveBeenCalledTimes(1);
  request
    .mockReset()
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'test' })))
    .mockRejectedValueOnce(new Error('synthetic network interruption'));
  await expect(sendGmailEmail('a@example.test', 'Test', 'Synthetic')).rejects.toThrow(
    'GMAIL_SEND_UNCONFIRMED',
  );
  expect(request).toHaveBeenCalledTimes(2);
});
it('selects OAuth explicitly and preserves unrelated SMTP and database settings without accepting injected credentials', () => {
  const result = gmailOAuthConfiguration(
    'DATABASE_URL=test.sqlite\nMAIL_PROVIDER=smtp\nSMTP_HOST=old.example\n',
    'sender@example.test',
    'fixture.apps.googleusercontent.com',
    'synthetic-secret',
    'synthetic-refresh',
  );
  expect(result).toContain('MAIL_PROVIDER="gmail"');
  expect(result).toContain('DATABASE_URL=test.sqlite');
  expect(result).toContain('SMTP_HOST=old.example');
  expect(() => gmailOAuthConfiguration('', 'a@example.test', 'bad', 'secret', 'token')).toThrow();
  expect(() =>
    gmailOAuthConfiguration(
      '',
      'a@example.test',
      'fixture.apps.googleusercontent.com',
      'secret\ninjection',
      'token',
    ),
  ).toThrow();
});
