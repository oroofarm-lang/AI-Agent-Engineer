---
generated: true
schema_version: 1
kind: "api"
entity_id: "PERSONAL_EXPORT"
curriculum_version: "2.2.0"
api_id: "PERSONAL_EXPORT"
route: "/api/export"
methods: ["GET"]
permission_scope: "own"
source_path: "src/app/api/export/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# ייצוא המידע האישי

כתובת: `/api/export`

פעולות HTTP: `GET`.

היקף הרשאה: `own`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

ייצוא הרשומות והקבצים של המשתמש המאומת בלבד. נתוני ייצוא אלה פרטיים ואינם חלק מכספת הידע הציבורית.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/export/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
