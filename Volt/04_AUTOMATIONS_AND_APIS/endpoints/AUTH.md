---
generated: true
schema_version: 1
kind: "api"
entity_id: "AUTH"
curriculum_version: "2.2.0"
api_id: "AUTH"
route: "/api/auth/[...all]"
methods: ["GET","POST"]
permission_scope: "authentication"
source_path: "src/app/api/auth/[...all]/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# אימות חשבון

כתובת: `/api/auth/[...all]`

פעולות HTTP: `GET`, `POST`.

היקף הרשאה: `authentication`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

מסלולי Better Auth ליצירת חשבון, כניסה, יציאה ואימות. סודות שרת ופרטי חשבונות אינם נכללים בכספת הציבורית.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/auth/%5B...all%5D/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
