---
generated: true
schema_version: 1
kind: "api"
entity_id: "AGENT_ORCHESTRATE"
curriculum_version: "2.2.0"
api_id: "AGENT_ORCHESTRATE"
route: "/api/agents/orchestrate"
methods: ["POST"]
permission_scope: "own"
source_path: "src/app/api/agents/orchestrate/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Marketing-Growth]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[01_AGENTS/Agent-Visual-Media]]","[[01_AGENTS/Agent-Voice-Audio]]","[[01_AGENTS/Orchestrator-Prime]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# תזמור מומחי הלמידה

כתובת: `/api/agents/orchestrate`

פעולות HTTP: `POST`.

היקף הרשאה: `own`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

בקשת למידה מאומתת בהקשר של שיעור. התזמור בוחר מומחים מהמרשם, שומר את שלבי הריצה בפועל ומנסח תשובה בעברית. קריאת מודל דורשת מפתח ומודל תקינים בצד השרת. מסלול זה אינו מעניק שליטה מקצועית או הרשאות חדשות.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/agents/orchestrate/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — ממשק הפעלה
- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — ממשק הפעלה
- [[01_AGENTS/Agent-Business-Discovery|אפיון שירות ופרויקט עסקי]] — ממשק הפעלה
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — ממשק הפעלה
- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — ממשק הפעלה
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — ממשק הפעלה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — ממשק הפעלה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — ממשק הפעלה
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — ממשק הפעלה
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — ממשק הפעלה
- [[01_AGENTS/Agent-Marketing-Growth|תוכן ושיווק]] — ממשק הפעלה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — ממשק הפעלה
- [[01_AGENTS/Agent-Paid-Media-Measurement|פרסום ומדידה]] — ממשק הפעלה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — ממשק הפעלה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — ממשק הפעלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — ממשק הפעלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — ממשק הפעלה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — ממשק הפעלה
- [[01_AGENTS/Agent-Visual-Media|תוכן חזותי ותהליכי מדיה]] — ממשק הפעלה
- [[01_AGENTS/Agent-Voice-Audio|קול, תמלול ושיחה]] — ממשק הפעלה
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — ממשק הפעלה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
