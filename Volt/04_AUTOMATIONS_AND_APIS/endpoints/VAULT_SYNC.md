---
generated: true
schema_version: 1
kind: "api"
entity_id: "VAULT_SYNC"
curriculum_version: "2.2.0"
api_id: "VAULT_SYNC"
route: "/api/vault/sync"
methods: ["POST"]
permission_scope: "operator"
source_path: "src/app/api/vault/sync/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]","[[Index]]"]
---

# סנכרון גרף הידע הציבורי

כתובת: `/api/vault/sync`

פעולות HTTP: `POST`.

היקף הרשאה: `operator`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

סנכרון למפעיל מאומת המופיע ברשימת המנהלים. אינו מקבל נתיב מהמזמין. מייצא את הקטלוג הציבורי בלבד, שומר גרסאות ישנות ומסרב לדרוס רשומה שנערכה ידנית.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/vault/sync/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
- [[Index|מפת הידע של הקורס]] — ייצוא ציבורי
