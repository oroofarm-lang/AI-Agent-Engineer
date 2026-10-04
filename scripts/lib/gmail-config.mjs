/** Preserve unrelated configuration without exposing it to logs or shell arguments. */
export function gmailConfiguration(previous, email, rawPassword) {
  email = email.trim();
  const password = rawPassword.replace(/\s/g, '');
  if (!/^[^\s@"\\]+@[^\s@"\\]+\.[^\s@"\\]+$/.test(email)) throw new Error('INVALID_EMAIL');
  if (!/^[a-zA-Z0-9]{16}$/.test(password)) throw new Error('INVALID_APP_PASSWORD');
  const settings = {
    MAIL_PROVIDER: 'smtp',
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

export function gmailOAuthConfiguration(previous, email, clientId, clientSecret, refreshToken) {
  email = email.trim();
  if (!/^[^\s@"\\]+@[^\s@"\\]+\.[^\s@"\\]+$/.test(email)) throw new Error('INVALID_EMAIL');
  if (!/^[A-Za-z0-9-]+\.apps\.googleusercontent\.com$/.test(clientId.trim()))
    throw new Error('INVALID_CLIENT_ID');
  if (
    [clientSecret, refreshToken].some(
      (value) => !value.trim() || /\s/.test(value.trim()) || value.length > 8192,
    )
  )
    throw new Error('INVALID_OAUTH_SECRET');
  const settings = {
    MAIL_PROVIDER: 'gmail',
    MAIL_FROM: `Agent Engineer <${email}>`,
    GMAIL_CLIENT_ID: clientId.trim(),
    GMAIL_CLIENT_SECRET: clientSecret.trim(),
    GMAIL_REFRESH_TOKEN: refreshToken.trim(),
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
    '\n\n# Gmail OAuth sending only — private local configuration.\n' +
    Object.entries(settings)
      .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
      .join('\n') +
    '\n'
  );
}
