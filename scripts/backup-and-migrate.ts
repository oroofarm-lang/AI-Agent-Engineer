import { loadEnvConfig } from '@next/env';
import { chmodSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { getConnection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';

async function main() {
  loadEnvConfig(process.cwd());
  const databasePath = path.resolve(process.env.DATABASE_URL || '.data/learning.sqlite');
  if (!existsSync(databasePath))
    throw new Error('No existing database. Use npm run db:setup for a new installation.');
  const connection = getConnection();
  try {
    const directory = path.join(path.dirname(databasePath), 'backups');
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    chmodSync(directory, 0o700);
    const filename = path.join(
      directory,
      `before-migration-${new Date().toISOString().replaceAll(':', '-')}-${randomUUID()}.sqlite`,
    );
    // SQLite online backup includes committed WAL state; no row contents are logged.
    await connection.sqlite.backup(filename);
    chmodSync(filename, 0o600);
    console.log('Consistent private backup saved before applying additive migrations.');
    setupDatabase(connection, loadCurriculum());
    console.log(
      'Migrations applied successfully. Existing curriculum versions and learner records were retained.',
    );
  } finally {
    connection.sqlite.close();
  }
}
main().catch(() => {
  console.error(
    'Backup/migration failed. No automatic restore or retry was performed. Inspect the migration before retrying.',
  );
  process.exitCode = 1;
});
