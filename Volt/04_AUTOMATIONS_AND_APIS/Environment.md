---
generated: true
schema_version: 1
kind: "configuration"
entity_id: "ENVIRONMENT"
curriculum_version: "2.2.0"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# הגדרת חיבורים וסודות בצד השרת

הדוגמה הציבורית נמצאת בקובץ `.env.example`. `OPENAI_API_KEY` ו־`AI_MODEL` מוגדרים רק בצד השרת. כתובת `BETTER_AUTH_URL` ופרטי SMTP נדרשים להפעלה בהתאם לסביבת ההרצה. `ADMIN_EMAILS` מגדיר מפעילים מורשים.

אין להעתיק מפתחות, סיסמאות, מסד משתמשים או `.env.local` לכספת. ייצוא הכספת אינו משנה את ההגדרות ואינו מוכיח שהחיבור לשירות עובד.

[דוגמת ההגדרות הציבורית](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/.env.example)

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — שמירת סודות
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — הגדרת סביבה
