---
generated: true
schema_version: 1
kind: "asset"
entity_id: "DEPLOY_COMPOSE"
curriculum_version: "2.2.0"
source_path: "compose.yaml"
asset_kind: "deployment-code"
source_sha256: "0eb49aa8871ec9ceaa5932d39438322c4613e7105d6a1d3a1aec3e45218a817c"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Deployment]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# השרת והאחסון שנשמר בין הפעלות

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/compose.yaml)

סוג הקובץ: `deployment-code`. נתיב במאגר הציבורי: `compose.yaml`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
name: ai-agent-engineer
services:
  app:
    build: .
    image: ai-agent-engineer:${APP_RELEASE:-local}
    env_file: .env.production
    environment:
      DATABASE_URL: /app/.data/learning.sqlite
      CURRICULUM_AUDITOR_DIR: /app/.data/curriculum-auditor
      QUIZ_REVIEW_DIR: /app/.data/quiz-releases
      MENTOR_KNOWLEDGE_PATH: /app/.data/mentor/knowledge.json
      VAULT_EXPORT_DIR: /app/Volt
    restart: unless-stopped
    init: true
    read_only: true
    stop_grace_period: 30s
    volumes:
      - learning-data:/app/.data
      - public-vault:/app/Volt
      - next-cache:/app/.next/cache
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=64m
    expose: ['3000']
  caddy:
    image: caddy:2.10-alpine
    environment:
      APP_DOMAIN: ${APP_DOMAIN:?Set APP_DOMAIN to the real course hostname}
      ACME_EMAIL: ${ACME_EMAIL:?Set ACME_EMAIL for certificate notices}
    depends_on:
      app:
        condition: service_healthy
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
      - '443:443/udp'
    volumes:
      - ./deploy/Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data
      - caddy-config:/config
volumes:
  learning-data:
  public-vault:
  next-cache:
  caddy-data:
  caddy-config:

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
