import { betterAuth } from 'better-auth';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { mailConfigured, sendAccountEmail } from '../mail/delivery';
import type { Connection } from '../db/connection';
import { users } from '../db/schema';

export function authOptions(connection: Connection) {
  const baseURL = process.env.BETTER_AUTH_URL || 'http://127.0.0.1:3000';
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(new URL(baseURL).hostname);
  const mail = mailConfigured();
  if (
    !local &&
    (new URL(baseURL).protocol !== 'https:' || !process.env.BETTER_AUTH_SECRET || !mail)
  )
    throw new Error('Public auth requires HTTPS, BETTER_AUTH_SECRET, SMTP_URL and MAIL_FROM.');
  const secret =
    process.env.BETTER_AUTH_SECRET ||
    readFileSync(
      path.join(path.dirname(process.env.DATABASE_URL || '.data/learning.sqlite'), 'auth-secret'),
      'utf8',
    ).trim();
  if (secret.length < 32) throw new Error('Auth secret must have at least 32 random characters.');
  return {
    appName: 'Agent Engineer',
    baseURL,
    secret,
    database: connection.sqlite,
    trustedOrigins: [baseURL],
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      requireEmailVerification: !local || mail,
      revokeSessionsOnPasswordReset: true,
      ...(mail
        ? {
            sendResetPassword: async ({ user, url }: { user: { email: string }; url: string }) =>
              sendAccountEmail(user.email, 'איפוס סיסמה · Agent Engineer', url),
          }
        : {}),
    },
    emailVerification: {
      sendOnSignUp: !local || mail,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }: { user: { email: string }; url: string }) =>
        sendAccountEmail(user.email, 'אימות כתובת דוא״ל · Agent Engineer', url),
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      freshAge: 60 * 10,
      cookieCache: { enabled: false },
    },
    rateLimit: {
      enabled: true,
      storage: 'database' as const,
      window: 60,
      max: 100,
      customRules: {
        '/sign-in/email': { window: 60, max: 10 },
        '/sign-up/email': { window: 60, max: 10 },
        '/request-password-reset': { window: 60, max: 3 },
        '/send-verification-email': { window: 60, max: 3 },
      },
    },
    advanced: {
      useSecureCookies: !local,
      defaultCookieAttributes: { sameSite: 'lax' as const, httpOnly: true },
      ipAddress: { ipAddressHeaders: ['x-real-ip'] },
    },
    user: {
      deleteUser: {
        enabled: true,
        beforeDelete: async (user: { id: string }) => {
          // Delete child records in dependency order. Never touch another learner or the legacy local row.
          connection.sqlite.transaction(() => {
            connection.sqlite
              .prepare('UPDATE assessment_reviews SET reviewer_id=NULL WHERE reviewer_id=?')
              .run(user.id);
            for (const table of [
              'marketing_consent_events',
              'boss_attempts',
              'project_workspaces',
              'skill_mastery',
              'assessment_reviews',
              'mentor_runs',
              'mentor_messages',
              'mentor_threads',
              'failure_test_cases',
              'failure_entries',
              'journal_entries',
              'assessment_results',
              'lesson_notes',
              'lesson_progress',
              'lesson_positions',
            ])
              connection.sqlite.prepare(`DELETE FROM ${table} WHERE user_id = ?`).run(user.id);
            connection.sqlite.prepare('DELETE FROM users WHERE id = ?').run(user.id);
          })();
        },
      },
    },
    databaseHooks: {
      user: {
        create: {
          after: async (user: { id: string }) => {
            connection.db
              .insert(users)
              .values({ id: user.id, locale: 'he-IL', createdAt: new Date().toISOString() })
              .onConflictDoNothing()
              .run();
          },
        },
      },
    },
  };
}
export function createAuth(connection: Connection) {
  return betterAuth(authOptions(connection));
}
