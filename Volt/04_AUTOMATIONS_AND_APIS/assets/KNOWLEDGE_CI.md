---
generated: true
schema_version: 1
kind: "asset"
entity_id: "KNOWLEDGE_CI"
curriculum_version: "2.2.0"
source_path: ".github/workflows/mentor-knowledge.yml"
asset_kind: "deployment-code"
source_sha256: "4fadf52ba2e0ee8bdcf87c1eff52c4da6d823bd8e3364f4c7bdf9cc2a9281505"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Deployment]]","[[04_AUTOMATIONS_AND_APIS/Index]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# גילוי מקורות ציבוריים ב־GitHub

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/.github/workflows/mentor-knowledge.yml)

סוג הקובץ: `deployment-code`. נתיב במאגר הציבורי: `.github/workflows/mentor-knowledge.yml`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
name: Mentor public knowledge sources
on:
  workflow_dispatch:
  schedule:
    # UTC due slots match the application; avoid the busy top of the hour.
    - cron: '17 6 * * 1,3,5'
  push:
    branches: [main]
    paths:
      - '.github/workflows/mentor-knowledge.yml'
      - 'scripts/refresh-mentor-knowledge.ts'
      - 'src/lib/ai/knowledge*.ts'
      - 'content/knowledge/registry.json'
concurrency:
  group: mentor-public-knowledge
  cancel-in-progress: false
permissions:
  contents: read
jobs:
  refresh:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    env:
      MENTOR_KNOWLEDGE_PATH: .data/mentor/knowledge.json
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: npm
      - run: npm ci
      - run: npm run mentor:refresh
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: mentor-public-knowledge
          path: .data/mentor/knowledge.json
          include-hidden-files: true
          retention-days: 14

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
