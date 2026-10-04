import { expect, it } from 'vitest';
import { gmailConfiguration } from '../scripts/lib/gmail-config.mjs';
it('replaces competing SMTP values, preserves unrelated configuration and normalizes a pasted app password', () => {
  const previous =
    '# Synthetic fixture only\nDATABASE_URL=test.sqlite\nSMTP_URL="smtp://old.invalid"\nSMTP_USER=old\nSMTP_PASSWORD=old\nexport SMTP_HOST=old.invalid\nSMTP_USER=duplicate\n';
  const result = gmailConfiguration(previous, ' learner@example.test ', 'abcd efgh ijkl mnop');
  expect(result).toContain('DATABASE_URL=test.sqlite');
  expect(result).toContain('SMTP_HOST="smtp.gmail.com"');
  expect(result).toContain('SMTP_PASSWORD="abcdefghijklmnop"');
  expect(result).toContain('MAIL_FROM="Agent Engineer <learner@example.test>"');
  expect(result).not.toContain('old.invalid');
  expect(result.match(/^SMTP_USER=/gm)).toHaveLength(1);
});
it('rejects invalid sender or normal account password before returning any config', () => {
  expect(() =>
    gmailConfiguration('existing', 'x\nSMTP_USER=evil@example.test', 'abcdefghijklmnop'),
  ).toThrow('INVALID_EMAIL');
  expect(() => gmailConfiguration('existing', 'a@example.test', 'normal-password')).toThrow(
    'INVALID_APP_PASSWORD',
  );
});
