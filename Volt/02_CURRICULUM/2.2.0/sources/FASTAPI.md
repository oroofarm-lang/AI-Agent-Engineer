---
generated: true
schema_version: 1
kind: "source"
entity_id: "FASTAPI"
curriculum_version: "2.2.0"
source_id: "FASTAPI"
url: "https://fastapi.tiangolo.com/tutorial/"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Production-Reliability]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W13D61_BACKEND_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W13D64_STREAMING]]","[[02_CURRICULUM/2.2.0/lessons/W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE]]","[[02_CURRICULUM/2.2.0/lessons/W14D70_PROJECT_AGENT_SAAS]]","[[02_CURRICULUM/2.2.0/lessons/WEB_04]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D61_BACKEND_APIS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D64_STREAMING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D70_PROJECT_AGENT_SAAS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_WEB_04]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D61_BACKEND_APIS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D61_BACKEND_APIS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D61_BACKEND_APIS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D64_STREAMING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D64_STREAMING_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D64_STREAMING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_04_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_04_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_04_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# FastAPI tutorial

[למקור הראשוני](https://fastapi.tiangolo.com/tutorial/)

מפרסם: FastAPI

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/W13D61_BACKEND_APIS|ממשקי API בצד השרת]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W13D64_STREAMING|Streaming ואירועי ריצה]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE|פרויקט: שירות Agent API]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W14D70_PROJECT_AGENT_SAAS|פרויקט: מוצר AI עסקי]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/WEB_04|טפסים וחיבור ל־CRM]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D61_BACKEND_APIS|בדיקת הבנה: מה צריך GET /runs/{id} לבדוק לפני החזרת פרטי ריצה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D64_STREAMING|בדיקת הבנה: הדפדפן התנתק באמצע Streaming והמשתמש התחבר מחדש. מה צריך הממשק לטעון?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE|בדיקת הבנה: איזו בדיקה מתאימה לדרישת End-to-End של שירות Agent API?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D70_PROJECT_AGENT_SAAS|בדיקת הבנה: ממשק המוצר נראה תקין. איזו בדיקה עדיין נדרשת לפני מסירה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_WEB_04|בדיקת הבנה: הטופס נשלח, הרשת נותקה, והמשתמש מנסה שוב. מה עוזר למנוע יצירת שתי פניות?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D61_BACKEND_APIS_BUILD|תבנית טקסט: ממשקי API בצד השרת · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D61_BACKEND_APIS_DIAGNOSE|תבנית טקסט: ממשקי API בצד השרת · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D61_BACKEND_APIS_TRANSFER|תבנית טקסט: ממשקי API בצד השרת · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D64_STREAMING_BUILD|תבנית טקסט: Streaming ואירועי ריצה · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D64_STREAMING_DIAGNOSE|תבנית טקסט: Streaming ואירועי ריצה · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D64_STREAMING_TRANSFER|תבנית טקסט: Streaming ואירועי ריצה · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_BUILD|תבנית טקסט: פרויקט: שירות Agent API · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_DIAGNOSE|תבנית טקסט: פרויקט: שירות Agent API · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE_TRANSFER|תבנית טקסט: פרויקט: שירות Agent API · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_BUILD|תבנית טקסט: פרויקט: מוצר AI עסקי · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_DIAGNOSE|תבנית טקסט: פרויקט: מוצר AI עסקי · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D70_PROJECT_AGENT_SAAS_TRANSFER|תבנית טקסט: פרויקט: מוצר AI עסקי · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_04_BUILD|תבנית טקסט: טפסים וחיבור ל־CRM · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_04_DIAGNOSE|תבנית טקסט: טפסים וחיבור ל־CRM · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_04_TRANSFER|תבנית טקסט: טפסים וחיבור ל־CRM · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
