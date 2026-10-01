import { z } from 'zod';
import type { Connection } from './connection';
import { isOperator } from '../admin/access';

export const consentPolicyVersion = 'course-updates-2026-10-01';
type ConsentEvent = {
  id: string;
  user_id: string;
  enabled: number;
  policy_version: string;
  recorded_at: string;
};
const consentInput = z.strictObject({ id: z.uuid(), enabled: z.boolean() });

/** No record means no permission. Events are immutable and scoped to the authenticated owner. */
export function contactConsent({ sqlite }: Connection, userId: string) {
  return {
    latest() {
      return sqlite
        .prepare(
          'SELECT * FROM marketing_consent_events WHERE user_id=? ORDER BY rowid DESC LIMIT 1',
        )
        .get(userId) as ConsentEvent | undefined;
    },
    record(raw: unknown) {
      const input = consentInput.parse(raw);
      return sqlite.transaction(() => {
        const prior = sqlite
          .prepare('SELECT * FROM marketing_consent_events WHERE id=?')
          .get(input.id) as ConsentEvent | undefined;
        if (prior) {
          if (prior.user_id !== userId || Boolean(prior.enabled) !== input.enabled)
            throw new Error('CONSENT_CONFLICT');
          return prior;
        }
        const event: ConsentEvent = {
          id: input.id,
          user_id: userId,
          enabled: Number(input.enabled),
          policy_version: consentPolicyVersion,
          recorded_at: new Date().toISOString(),
        };
        sqlite
          .prepare(
            'INSERT INTO marketing_consent_events(id,user_id,enabled,policy_version,recorded_at) VALUES(?,?,?,?,?)',
          )
          .run(event.id, event.user_id, event.enabled, event.policy_version, event.recorded_at);
        return event;
      })();
    },
  };
}

export type OptedInContact = {
  name: string;
  email: string;
  recorded_at: string;
  policy_version: string;
  builds: number;
};
export function optedInContacts(
  { sqlite }: Connection,
  actor: { email: string; emailVerified: boolean },
) {
  if (!isOperator(actor)) throw new Error('FORBIDDEN');
  return sqlite
    .prepare(
      `SELECT u.name,u.email,c.recorded_at,c.policy_version,
    (SELECT COUNT(*) FROM lesson_progress p WHERE p.user_id=u.id AND p.build_completed_at IS NOT NULL) AS builds
    FROM user u JOIN marketing_consent_events c ON c.user_id=u.id
    WHERE u.emailVerified=1 AND c.enabled=1
    AND c.rowid=(SELECT MAX(last.rowid) FROM marketing_consent_events last WHERE last.user_id=u.id)
    ORDER BY u.email`,
    )
    .all() as OptedInContact[];
}

/** Prevent spreadsheet formulas while preserving UTF-8 names and emails. */
export function contactCsv(rows: OptedInContact[]) {
  const cell = (value: string | number) => {
    const raw = String(value),
      safe = /^[\s]*[=+@-]/.test(raw) || /^[\t\r\n]/.test(raw) ? `'${raw}` : raw;
    return `"${safe.replaceAll('"', '""')}"`;
  };
  return (
    '\uFEFF' +
    [
      ['name', 'email', 'consent_recorded_at', 'consent_policy', 'completed_exercises'],
      ...rows.map((row) => [row.name, row.email, row.recorded_at, row.policy_version, row.builds]),
    ]
      .map((row) => row.map(cell).join(','))
      .join('\r\n') +
    '\r\n'
  );
}
