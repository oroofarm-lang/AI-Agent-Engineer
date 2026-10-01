/** A verified identity is required even on localhost. An email typed into signup is not ownership. */
export function isOperator(
  user: { email: string; emailVerified: boolean },
  allowlist = process.env.ADMIN_EMAILS || '',
) {
  return (
    user.emailVerified &&
    allowlist
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
      .includes(user.email.toLowerCase())
  );
}
