---
generated: true
schema_version: 1
kind: "api"
entity_id: "CONTACT_EXPORT"
curriculum_version: "2.2.0"
api_id: "CONTACT_EXPORT"
route: "/api/admin/contacts"
methods: ["GET"]
permission_scope: "operator"
source_path: "src/app/api/admin/contacts/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# ייצוא אנשי קשר למנהל

כתובת: `/api/admin/contacts`

פעולות HTTP: `GET`.

היקף הרשאה: `operator`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

מסלול למפעיל מאומת ומורשה. שומר על הפרדה בין הרשמה ללמידה לבין הסכמה לדיוור; נתוני אנשי הקשר נשארים מחוץ לכספת.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/admin/contacts/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
