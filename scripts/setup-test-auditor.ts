import { connect } from '../src/lib/db/connection';
import { createAuth } from '../src/lib/auth/config';

const filename = process.env.DATABASE_URL || '';
if (
  !/^\.data\/e2e-[a-f0-9-]+\.sqlite$/.test(filename) ||
  !/^\.data\/e2e-[a-f0-9-]+-auditor$/.test(process.env.CURRICULUM_AUDITOR_DIR || '') ||
  process.env.BETTER_AUTH_URL !== 'http://127.0.0.1:3100'
)
  throw new Error('ISOLATED_TEST_PATH_REQUIRED');
async function main() {
  const connection = connect(filename);
  try {
    const result = await createAuth(connection).api.signUpEmail({
      body: {
        name: 'QA Content Operator',
        email: 'qa-manager@example.test',
        password: 'Qa-only-auditor-842-passphrase',
      },
    });
    // A synthetic test identity only; this never verifies a real account or sends email.
    connection.sqlite
      .prepare('UPDATE "user" SET "emailVerified"=1 WHERE id=? AND email=?')
      .run(result.user.id, 'qa-manager@example.test');
    console.log(
      'Isolated synthetic reviewer fixture created. No real account or email delivery is involved.',
    );
  } finally {
    connection.sqlite.close();
  }
}
main().catch(() => {
  console.error('Isolated reviewer fixture setup failed');
  process.exitCode = 1;
});
