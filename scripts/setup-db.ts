import { loadEnvConfig } from '@next/env';
import { getConnection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
loadEnvConfig(process.cwd());
const c = getConnection();
try {
  setupDatabase(c, loadCurriculum());
  console.log('Database migrated and local learner seeded; existing progress preserved.');
} finally {
  c.sqlite.close();
}
