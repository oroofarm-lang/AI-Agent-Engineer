import { randomUUID } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { contactConsent, optedInContacts, contactCsv } from '../src/lib/db/contact-consent';
import { repository } from '../src/lib/db/repository';
afterEach(() => vi.unstubAllEnvs());
const owner = { email: 'owner@example.test', emailVerified: true };
it('stores explicit consent idempotently, scopes history to an account, and honors withdrawal', () => {
  const connection = connect(':memory:');
  try {
    const c = loadCurriculum();
    setupDatabase(connection, c);
    vi.stubEnv('ADMIN_EMAILS', owner.email);
    for (const [id, verified] of [
      ['a', 1],
      ['b', 0],
    ] as const) {
      connection.sqlite
        .prepare('INSERT INTO users(id,locale,created_at) VALUES(?,?,?)')
        .run(id, 'he-IL', new Date().toISOString());
      connection.sqlite
        .prepare(
          'INSERT INTO user(id,name,email,emailVerified,createdAt,updatedAt) VALUES(?,?,?,?,?,?)',
        )
        .run(id, `Learner ${id}`, `${id}@example.test`, verified, Date.now(), Date.now());
    }
    const a = contactConsent(connection, 'a'),
      b = contactConsent(connection, 'b');
    expect(a.latest()).toBeUndefined();
    expect(optedInContacts(connection, owner)).toEqual([]);
    const id = randomUUID();
    a.record({ id, enabled: true });
    a.record({ id, enabled: true });
    expect(repository(connection, c, 'a').exportData().contactConsentEvents).toHaveLength(1);
    expect(() => b.record({ id, enabled: true })).toThrow('CONSENT_CONFLICT');
    expect(() => a.record({ id, enabled: false })).toThrow('CONSENT_CONFLICT');
    b.record({ id: randomUUID(), enabled: true });
    expect(optedInContacts(connection, owner).map((row) => row.email)).toEqual(['a@example.test']);
    expect(repository(connection, c, 'b').exportData().contactConsentEvents).toHaveLength(1);
    a.record({ id: randomUUID(), enabled: false });
    expect(a.latest()?.enabled).toBe(0);
    expect(optedInContacts(connection, owner)).toEqual([]);
    expect(() => optedInContacts(connection, { ...owner, emailVerified: false })).toThrow(
      'FORBIDDEN',
    );
    expect(() =>
      optedInContacts(connection, { email: 'stranger@example.test', emailVerified: true }),
    ).toThrow('FORBIDDEN');
  } finally {
    connection.sqlite.close();
  }
});
it('protects CSV spreadsheet imports from formulas and correctly quotes Hebrew and line breaks', () => {
  const csv = contactCsv([
    {
      name: '=HYPERLINK("example")',
      email: 'safe@example.test',
      recorded_at: '2026-10-01',
      policy_version: 'policy',
      builds: 3,
    },
    {
      name: 'שם, בעברית\nבשתי שורות',
      email: 'b@example.test',
      recorded_at: 'date',
      policy_version: 'policy',
      builds: 0,
    },
  ]);
  expect(csv).toContain('"\'=HYPERLINK(""example"")"');
  expect(csv).toContain('"שם, בעברית\nבשתי שורות"');
  expect(csv.startsWith('\uFEFF')).toBe(true);
});
