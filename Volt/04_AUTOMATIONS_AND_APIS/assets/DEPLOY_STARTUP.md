---
generated: true
schema_version: 1
kind: "asset"
entity_id: "DEPLOY_STARTUP"
curriculum_version: "2.2.0"
source_path: "scripts/deployment/entrypoint.sh"
asset_kind: "deployment-code"
source_sha256: "db1092fefcdd60e54bf75e46263112ad77b872356a2dba9d4d79a672da0a1fdd"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Deployment]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בדיקת הגדרות וגיבוי לפני הפעלה

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/scripts/deployment/entrypoint.sh)

סוג הקובץ: `deployment-code`. נתיב במאגר הציבורי: `scripts/deployment/entrypoint.sh`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
#!/bin/sh
set -eu
umask 077
# Public deployments fail closed before touching storage if configuration is missing.
node scripts/check-deployment.mjs
if node -e 'const fs = require("node:fs"); process.exit(fs.existsSync(process.env.DATABASE_URL || ".data/learning.sqlite") ? 0 : 1)'; then
  npm run db:migrate:backup
else
  npm run db:setup
fi
# An edited public note may block projection; preserve it and keep learning operational.
npm run vault:sync || printf '%s\n' 'Public Vault projection needs operator attention; existing notes were preserved.' >&2
exec node node_modules/next/dist/bin/next start --hostname 0.0.0.0 --port "${PORT:-3000}"

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
