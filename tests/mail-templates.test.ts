import { expect, it } from 'vitest';
import { accountEmail } from '../src/lib/mail/templates';

it('escapes names and links, supplies readable text, and rejects executable URLs', () => {
  const mail = accountEmail(
    'reset',
    'https://example.test/reset?token=synthetic&next=home',
    '<img src=x onerror=alert(1)>',
  );
  expect(mail.html).toContain('&lt;img');
  expect(mail.html).not.toContain('<img');
  expect(mail.html).toContain('token=synthetic&amp;next=home');
  expect(mail.html).toContain('dir="rtl"');
  expect(mail.text).toContain('הסיסמה שלך תישאר ללא שינוי');
  expect(() => accountEmail('reset', 'javascript:alert(1)')).toThrow('INVALID_EMAIL_URL');
});

it('distinguishes verification, welcome and reset without marketing or remote tracking', () => {
  for (const kind of ['reset', 'verification', 'welcome'] as const) {
    const mail = accountEmail(kind, 'https://example.test/learn', 'נועה');
    expect(mail.text).toContain('שלום נועה,');
    expect(mail.html).toContain('זו אינה הודעה שיווקית');
    expect(mail.html).not.toMatch(/<script|<img|<link|<iframe/);
  }
  expect(accountEmail('verification', 'https://example.test/verify').subject).toContain('לאמת');
  expect(accountEmail('welcome', 'https://example.test/learn').text).toContain(
    'כתובת המייל שלך אומתה',
  );
});
