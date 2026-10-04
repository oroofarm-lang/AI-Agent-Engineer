import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import Database from 'better-sqlite3';

/** Read schema metadata only. Never create a missing database or return learner rows. */
export function databaseReady(filename, migrations = 'src/lib/db/migrations') {
  let database;
  try {
    database = new Database(filename, { readonly: true, fileMustExist: true, timeout: 1000 });
    const files = fs.readdirSync(migrations).filter((name) => name.endsWith('.sql'));
    if (!files.length) return false;
    const applied = database.prepare('SELECT hash FROM schema_migrations WHERE name = ?');
    return files.every((name) => {
      const expected = createHash('sha256')
        .update(fs.readFileSync(path.join(migrations, name)))
        .digest('hex');
      return applied.get(name)?.hash === expected;
    });
  } catch {
    return false;
  } finally {
    database?.close();
  }
}
export async function healthcheck({
  origin = 'http://127.0.0.1:3000',
  databasePath = process.env.DATABASE_URL || '.data/learning.sqlite',
  migrationsDirectory = 'src/lib/db/migrations',
} = {}) {
  if (!databaseReady(databasePath, migrationsDirectory)) return false;
  try {
    const response = await fetch(new URL('/auth', origin), {
      redirect: 'error',
      signal: AbortSignal.timeout(5000),
    });
    await response.body?.cancel();
    return response.status === 200;
  } catch {
    return false;
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  if (!(await healthcheck())) {
    console.error('Application readiness check failed. No private data was printed.');
    process.exitCode = 1;
  }
}
