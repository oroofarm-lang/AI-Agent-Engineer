---
generated: true
schema_version: 1
kind: "asset"
entity_id: "KNOWLEDGE_REFRESH_CLI"
curriculum_version: "2.2.0"
source_path: "scripts/refresh-mentor-knowledge.ts"
asset_kind: "deployment-code"
source_sha256: "d8d7505ccee268af61403869239d9ca18582e404df092e8bcb31165fa943d692"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Deployment]]","[[04_AUTOMATIONS_AND_APIS/Index]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# רענון המטמון שבו המנטור משתמש

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/scripts/refresh-mentor-knowledge.ts)

סוג הקובץ: `deployment-code`. נתיב במאגר הציבורי: `scripts/refresh-mentor-knowledge.ts`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
import { loadEnvConfig } from '@next/env';
// Load the same cache and release-ledger settings as the server before importing readers.
loadEnvConfig(process.cwd());

async function main() {
  const { refreshKnowledge } = await import('../src/lib/ai/knowledge');
  const { persistKnowledge, readKnowledge } = await import('../src/lib/ai/knowledge-store');
  const snapshot = await refreshKnowledge(fetch, new Date(), await readKnowledge());
  await persistKnowledge(snapshot);
  for (const source of snapshot.sources)
    console.log(
      `${source.id}: ${source.status}, ${source.items.length} discovery references, ${source.change}`,
    );
  if (snapshot.sources.some((source) => source.status !== 'ok')) process.exitCode = 1;
}
main().catch(() => {
  console.error('Knowledge refresh failed');
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
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — גילוי ותזמון מקורות
