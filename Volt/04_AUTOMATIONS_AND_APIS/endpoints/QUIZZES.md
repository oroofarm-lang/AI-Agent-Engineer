---
generated: true
schema_version: 1
kind: "api"
entity_id: "QUIZZES"
curriculum_version: "2.2.0"
api_id: "QUIZZES"
route: "/api/quizzes"
methods: ["GET","POST"]
permission_scope: "own"
source_path: "src/app/api/quizzes/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# שמירת תשובות לתרגול

כתובת: `/api/quizzes`

פעולות HTTP: `GET`, `POST`.

היקף הרשאה: `own`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

טעינת התשובה האחרונה ושמירת תשובה לשאלה קיימת בממשק, בחשבון המאומת ובהקשר השיעור בלבד. השאלה נשמרת עם גרסתה, בחירת הלומד והמשוב. שליחה חוזרת עם אותו מזהה ותוכן אינה יוצרת ניסיון נוסף. תשובה נכונה בתרגול אינה מעניקה XP או שליטה.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/quizzes/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP|לפני שמגישים · שאלה קצרה לתרגול]] — שמירת תשובה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
