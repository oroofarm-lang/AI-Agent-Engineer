---
generated: true
schema_version: 1
kind: "asset"
entity_id: "KNOWLEDGE_HOST_SERVICE"
curriculum_version: "2.2.0"
source_path: "deploy/systemd/ai-course-mentor-refresh.service"
asset_kind: "deployment-code"
source_sha256: "6d5f6dd6e0aa004f08d4cac537fb1159b9136c0abca651566e825f8fa924aee0"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Deployment]]","[[04_AUTOMATIONS_AND_APIS/Index]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# שירות רענון המקורות בשרת

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/deploy/systemd/ai-course-mentor-refresh.service)

סוג הקובץ: `deployment-code`. נתיב במאגר הציבורי: `deploy/systemd/ai-course-mentor-refresh.service`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
[Unit]
Description=Refresh public AI discovery sources three times weekly
Requires=docker.service
After=docker.service network-online.target
Wants=network-online.target

[Service]
Type=oneshot
WorkingDirectory=/opt/AI-Agent-Engineer
UMask=0077
ExecStart=/usr/bin/docker compose --env-file .env.production run --rm --no-deps -T --entrypoint npm app run mentor:refresh
TimeoutStartSec=10min

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
