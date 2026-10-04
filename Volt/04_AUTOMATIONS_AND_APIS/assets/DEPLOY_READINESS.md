---
generated: true
schema_version: 1
kind: "asset"
entity_id: "DEPLOY_READINESS"
curriculum_version: "2.2.0"
source_path: "scripts/deployment/healthcheck.mjs"
asset_kind: "deployment-code"
source_sha256: "33301813b46cf36769e79c81f19fd826b95cde15568f6bc7a8860679402cdf4e"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Deployment]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בדיקת מוכנות פנימית

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/scripts/deployment/healthcheck.mjs)

סוג הקובץ: `deployment-code`. נתיב במאגר הציבורי: `scripts/deployment/healthcheck.mjs`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
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
