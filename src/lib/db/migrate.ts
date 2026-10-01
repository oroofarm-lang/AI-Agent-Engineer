import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import type { Connection } from './connection';
import { curriculumVersions, users } from './schema';
import { eq } from 'drizzle-orm';
import type { Curriculum } from '../curriculum/schema';
export function setupDatabase(connection: Connection, curriculum: Curriculum) {
  const { sqlite, db } = connection;
  sqlite.exec(
    'CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, hash TEXT NOT NULL)',
  );
  const dir = path.join(process.cwd(), 'src/lib/db/migrations');
  sqlite.transaction(() => {
    for (const name of fs
      .readdirSync(dir)
      .filter((n) => n.endsWith('.sql'))
      .sort()) {
      const sql = fs.readFileSync(path.join(dir, name), 'utf8');
      const hash = createHash('sha256').update(sql).digest('hex');
      const applied = sqlite
        .prepare('SELECT hash FROM schema_migrations WHERE name = ?')
        .get(name) as { hash: string } | undefined;
      if (applied && applied.hash !== hash)
        throw new Error(`Applied migration was modified: ${name}`);
      if (!applied) {
        sqlite.exec(sql);
        sqlite.prepare('INSERT INTO schema_migrations (name, hash) VALUES (?, ?)').run(name, hash);
      }
    }
    db.insert(users)
      .values({ id: 'local', locale: 'he-IL', createdAt: new Date().toISOString() })
      .onConflictDoNothing()
      .run();
    const manifestHash = createHash('sha256').update(JSON.stringify(curriculum)).digest('hex');
    const existing = db
      .select()
      .from(curriculumVersions)
      .where(eq(curriculumVersions.version, curriculum.version))
      .get();
    if (existing && existing.manifestHash !== manifestHash)
      throw new Error(
        'Released curriculum changed without a version bump. Preserve the release and create a new version.',
      );
    db.insert(curriculumVersions)
      .values({ version: curriculum.version, releasedAt: curriculum.releaseDate, manifestHash })
      .onConflictDoNothing()
      .run();
  })();
}
