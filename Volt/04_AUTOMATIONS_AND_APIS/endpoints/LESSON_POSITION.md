---
generated: true
schema_version: 1
kind: "api"
entity_id: "LESSON_POSITION"
curriculum_version: "2.2.0"
api_id: "LESSON_POSITION"
route: "/api/position"
methods: ["POST"]
permission_scope: "own"
source_path: "src/app/api/position/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# שמירת המקום בשיעור

כתובת: `/api/position`

פעולות HTTP: `POST`.

היקף הרשאה: `own`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

שומר את מזהה השקופית התקף בשיעור עבור המשתמש המאומת. שמירת מקום אינה השלמת תרגיל או אישור מקצועי.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/position/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
