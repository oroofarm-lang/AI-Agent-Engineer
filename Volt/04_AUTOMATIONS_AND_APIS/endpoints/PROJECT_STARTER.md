---
generated: true
schema_version: 1
kind: "api"
entity_id: "PROJECT_STARTER"
curriculum_version: "2.2.0"
api_id: "PROJECT_STARTER"
route: "/api/projects/[lessonId]/starter"
methods: ["GET"]
permission_scope: "own"
source_path: "src/app/api/projects/[lessonId]/starter/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# קובצי התחלה לפרויקט

כתובת: `/api/projects/[lessonId]/starter`

פעולות HTTP: `GET`.

היקף הרשאה: `own`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

מכין קובצי התחלה לתרגיל לפי שיעור קיים והרשאות הלמידה. קובצי התחלה הם חומר עזר ולא הוכחה שהפרויקט נבנה.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/projects/%5BlessonId%5D/starter/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
