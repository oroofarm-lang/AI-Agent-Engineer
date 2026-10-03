---
generated: true
schema_version: 1
kind: "api"
entity_id: "QUIZ_REVIEW"
curriculum_version: "2.2.0"
api_id: "QUIZ_REVIEW"
route: "/api/quizzes/review"
methods: ["GET","POST"]
permission_scope: "verified-operator"
source_path: "src/app/api/quizzes/review/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בדיקת שאלות, פרסום וחזרה לגרסה קודמת

כתובת: `/api/quizzes/review`

פעולות HTTP: `GET`, `POST`.

היקף הרשאה: `verified-operator`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

מפעיל מאומת בודק כל שאלה מול השיעור והמקורות שלה. הפרסום דורש אישור מפורש של כל השאלות בנוסח המדויק. ההחלטות והזהות של הבודק נשמרות ביומן פרטי. רק מאגר שאושר ופורסם מוצג ללומדים; תשובות קודמות נשמרות גם לאחר החלפת גרסה. פרסום וחזרה לגרסה קודמת מפעילים עדכון של המפה הציבורית. כשל בייצוא מדווח בנפרד ואינו מבטל את הפעולה במאגר השאלות. תשובות לומדים והחלטות פרטיות אינן מיוצאות.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/quizzes/review/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — בדיקה לפני פרסום
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
