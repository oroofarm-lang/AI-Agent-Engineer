---
generated: true
schema_version: 1
kind: "source"
entity_id: "OTEL"
curriculum_version: "2.2.0"
source_id: "OTEL"
url: "https://opentelemetry.io/docs/concepts/signals/"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Production-Reliability]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W11D54_TRACING]]","[[02_CURRICULUM/2.2.0/lessons/W13D63_QUEUES_WORKERS]]","[[02_CURRICULUM/2.2.0/lessons/W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE]]","[[02_CURRICULUM/2.2.0/lessons/W14D69_PRODUCTION_CONCERNS]]","[[02_CURRICULUM/2.2.0/lessons/W14D70_PROJECT_AGENT_SAAS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W11D54_TRACING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D63_QUEUES_WORKERS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D69_PRODUCTION_CONCERNS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D70_PROJECT_AGENT_SAAS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D63_QUEUES_WORKERS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D63_QUEUES_WORKERS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D63_QUEUES_WORKERS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# OpenTelemetry signals

[למקור הראשוני](https://opentelemetry.io/docs/concepts/signals/)

מפרסם: OpenTelemetry

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/W11D54_TRACING|תיעוד ריצות וניטור]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W13D63_QUEUES_WORKERS|תורים ועובדים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE|פרויקט: שירות Agent API]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W14D69_PRODUCTION_CONCERNS|עלות, ביצועים וניטור]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W14D70_PROJECT_AGENT_SAAS|פרויקט: מוצר AI עסקי]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W11D54_TRACING|בדיקת הבנה: ריצה איטית לא החזירה חריגה. איזה תיעוד מסייע לאתר את העיכוב?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D63_QUEUES_WORKERS|בדיקת הבנה: Worker נעצר אחרי שחלק מהפעולה בוצע, והתור מסר שוב אותה עבודה. למה חשוב מזהה הפעולה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE|בדיקת הבנה: איזו בדיקה מתאימה לדרישת End-to-End של שירות Agent API?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D69_PRODUCTION_CONCERNS|בדיקת הבנה: מה צריך מפתח המטמון להביא בחשבון כדי שלא להחזיר מידע ישן או של לקוח אחר?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D70_PROJECT_AGENT_SAAS|בדיקת הבנה: ממשק המוצר נראה תקין. איזו בדיקה עדיין נדרשת לפני מסירה?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_BUILD|תבנית טקסט: תיעוד ריצות וניטור · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_DIAGNOSE|תבנית טקסט: תיעוד ריצות וניטור · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_TRANSFER|תבנית טקסט: תיעוד ריצות וניטור · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D63_QUEUES_WORKERS_BUILD|תבנית טקסט: תורים ועובדים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D63_QUEUES_WORKERS_DIAGNOSE|תבנית טקסט: תורים ועובדים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D63_QUEUES_WORKERS_TRANSFER|תבנית טקסט: תורים ועובדים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_BUILD|תבנית טקסט: פרויקט: שירות Agent API · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_DIAGNOSE|תבנית טקסט: פרויקט: שירות Agent API · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_TRANSFER|תבנית טקסט: פרויקט: שירות Agent API · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_BUILD|תבנית טקסט: עלות, ביצועים וניטור · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_DIAGNOSE|תבנית טקסט: עלות, ביצועים וניטור · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_TRANSFER|תבנית טקסט: עלות, ביצועים וניטור · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_BUILD|תבנית טקסט: פרויקט: מוצר AI עסקי · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_DIAGNOSE|תבנית טקסט: פרויקט: מוצר AI עסקי · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_TRANSFER|תבנית טקסט: פרויקט: מוצר AI עסקי · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
