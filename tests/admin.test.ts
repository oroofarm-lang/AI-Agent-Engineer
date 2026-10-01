import { afterEach, expect, it, vi } from 'vitest';
import { isOperator } from '../src/lib/admin/access';
import { registrationDirectory } from '../src/lib/admin/directory';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
afterEach(() => vi.unstubAllEnvs());
it('requires both verified mailbox ownership and explicit operator allowlisting', () => {
  expect(
    isOperator({ email: 'OWNER@example.test', emailVerified: true }, 'owner@example.test'),
  ).toBe(true);
  expect(
    isOperator({ email: 'owner@example.test', emailVerified: false }, 'owner@example.test'),
  ).toBe(false);
  expect(
    isOperator({ email: 'stranger@example.test', emailVerified: true }, 'owner@example.test'),
  ).toBe(false);
});
it('directory denies non-operators and never exposes password hashes or session data', () => {
  const connection = connect(':memory:');
  vi.stubEnv('ADMIN_EMAILS', 'owner@example.test');
  try {
    setupDatabase(connection, loadCurriculum());
    connection.sqlite
      .prepare(
        'INSERT INTO user(id,name,email,emailVerified,createdAt,updatedAt) VALUES(?,?,?,?,?,?)',
      )
      .run('one', 'Learner', 'learner@example.test', 0, Date.now(), Date.now());
    expect(() =>
      registrationDirectory(connection, { email: 'owner@example.test', emailVerified: false }),
    ).toThrow('FORBIDDEN');
    const data = registrationDirectory(connection, {
      email: 'owner@example.test',
      emailVerified: true,
    });
    expect(data.total).toBe(1);
    expect(data.accounts[0].email).toBe('learner@example.test');
    expect(JSON.stringify(data)).not.toMatch(/password|token|session/);
  } finally {
    connection.sqlite.close();
  }
});
