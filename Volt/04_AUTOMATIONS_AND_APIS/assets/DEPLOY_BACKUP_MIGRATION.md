---
generated: true
schema_version: 1
kind: "asset"
entity_id: "DEPLOY_BACKUP_MIGRATION"
curriculum_version: "2.2.0"
source_path: "scripts/backup-and-migrate.ts"
asset_kind: "deployment-code"
source_sha256: "b39592f3d2a8aa897e11e344dcd91c2149c884ca4a5ebcd96fea35635484ed8f"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Deployment]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# גיבוי עקבי לפני שינוי מבנה מסד הנתונים

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/scripts/backup-and-migrate.ts)

סוג הקובץ: `deployment-code`. נתיב במאגר הציבורי: `scripts/backup-and-migrate.ts`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
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

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/QUALITY|איכות, אבטחה ובקרה]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Deployment|פריסה, אחסון מתמשך ותזמון תחזוקה]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
