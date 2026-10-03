---
generated: true
schema_version: 1
kind: "api"
entity_id: "KNOWLEDGE"
curriculum_version: "2.2.0"
api_id: "KNOWLEDGE"
route: "/api/knowledge"
methods: ["GET","POST"]
permission_scope: "signed-in-read/operator-refresh"
source_path: "src/app/api/knowledge/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# מקורות רשמיים ועדכונים

כתובת: `/api/knowledge`

פעולות HTTP: `GET`, `POST`.

היקף הרשאה: `signed-in-read/operator-refresh`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

קריאה של תוצאות גילוי ציבוריות לחשבון מחובר. רענון מקורות קבועים מותר למפעיל מאומת בלבד, ללא קבלת כתובת או נתיב מהלקוח. הרענון מוגבל למועדי הבדיקה הקיימים ואינו משנה שיעורים.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/knowledge/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — קריאת תוצאות ורענון
