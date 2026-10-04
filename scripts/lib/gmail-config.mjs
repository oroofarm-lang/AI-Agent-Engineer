/** Preserve unrelated configuration without exposing it to logs or shell arguments. */
export function gmailConfiguration(previous, email, rawPassword) {
  email = email.trim();
  const password = rawPassword.replace(/\s/g, '');
  if (!/^[^\s@"\\]+@[^\s@"\\]+\.[^\s@"\\]+$/.test(email)) throw new Error('INVALID_EMAIL');
  if (!/^[a-zA-Z0-9]{16}$/.test(password)) throw new Error('INVALID_APP_PASSWORD');
  const settings = {
    SMTP_URL: '',
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: '465',
    SMTP_USER: email,
    SMTP_PASSWORD: password,
    MAIL_FROM: `Agent Engineer <${email}>`,
  };
  const keys = new Set(Object.keys(settings));
  const retained = previous
    .split(/\r?\n/)
    .filter((line) => {
      const match = /^\s*(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=/.exec(line);
      return !match || !keys.has(match[1]);
    })
    .join('\n')
    .trimEnd();
  return (
    retained +
    '\n\n# Gmail SMTP — configured locally; never commit this file.\n' +
    Object.entries(settings)
      .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
      .join('\n') +
    '\n'
  );
}
