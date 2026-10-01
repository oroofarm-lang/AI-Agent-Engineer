import { loadEnvConfig } from '@next/env';
import { getConnection } from '../src/lib/db/connection';
loadEnvConfig(process.cwd());
const { sqlite } = getConnection();
try {
  sqlite.transaction(() => {
    for (const table of ['session', 'verification'])
      sqlite.prepare(`DELETE FROM "${table}" WHERE "expiresAt" < ?`).run(new Date().toISOString());
    sqlite
      .prepare('DELETE FROM "rateLimit" WHERE "lastRequest" < ?')
      .run(Date.now() - 24 * 60 * 60 * 1000);
  })();
  console.log('Expired authentication records cleaned.');
} finally {
  sqlite.close();
}
