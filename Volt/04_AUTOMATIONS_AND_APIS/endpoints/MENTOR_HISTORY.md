---
generated: true
schema_version: 1
kind: "api"
entity_id: "MENTOR_HISTORY"
curriculum_version: "2.2.0"
api_id: "MENTOR_HISTORY"
route: "/api/mentor"
methods: ["GET","POST"]
permission_scope: "own"
source_path: "src/app/api/mentor/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# היסטוריית המנטור ומסלול תאימות

כתובת: `/api/mentor`

פעולות HTTP: `GET`, `POST`.

היקף הרשאה: `own`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

קורא רק את שיחת המשתמש המאומת בהקשר הנבחר, ומפעיל את מנגנון הלמידה דרך מסלול התאימות. מטמון המקורות מכיל מידע ציבורי בלבד.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/mentor/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
