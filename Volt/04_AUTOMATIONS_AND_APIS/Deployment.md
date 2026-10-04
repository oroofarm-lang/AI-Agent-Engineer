---
generated: true
schema_version: 1
kind: "configuration"
entity_id: "DEPLOYMENT"
curriculum_version: "2.2.0"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[04_AUTOMATIONS_AND_APIS/assets/AUTH_CLEANUP_CLI]]","[[04_AUTOMATIONS_AND_APIS/assets/AUTH_HOST_SERVICE]]","[[04_AUTOMATIONS_AND_APIS/assets/AUTH_HOST_TIMER]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_BACKUP_MIGRATION]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_BUILD_EXCLUSIONS]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_COMPOSE]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_CONTAINER_CI]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_HTTPS_PROXY]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_IMAGE]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_READINESS]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_RESTORE_SMOKE]]","[[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_STARTUP]]","[[04_AUTOMATIONS_AND_APIS/assets/KNOWLEDGE_CI]]","[[04_AUTOMATIONS_AND_APIS/assets/KNOWLEDGE_HOST_SERVICE]]","[[04_AUTOMATIONS_AND_APIS/assets/KNOWLEDGE_HOST_TIMER]]","[[04_AUTOMATIONS_AND_APIS/assets/KNOWLEDGE_REFRESH_CLI]]","[[04_AUTOMATIONS_AND_APIS/Environment]]","[[04_AUTOMATIONS_AND_APIS/Index]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# פריסה, אחסון מתמשך ותזמון תחזוקה

חבילת הפריסה מיועדת למופע Node יחיד עם SQLite, אחסון מתמשך ושרת כניסה Caddy. הקבצים הציבוריים מקושרים כאן לפי תפקידם. הכללתם בגרף אינה מוכיחה שהאתר הותקן על שרת ציבורי.

בחבילת הפריסה מוגדר רענון של המקורות שלוש פעמים בשבוע באמצעות systemd. לאחר התקנת התזמון בשרת, תוצאות הרענון נשמרות במטמון שבו המנטור משתמש. הבדיקה ב־GitHub מפיקה רשימה נפרדת של מקורות שהתגלו ואינה מעתיקה אותה אוטומטית לשרת. התקנת הטיימרים ובדיקת הרצה אמיתית נעשות אחרי הקמת השרת.

מסד משתמשים, קובצי סביבה, סודות וגיבויים פרטיים אינם נכללים בכספת. אין לבצע שחזור אוטומטי במערכת חיה. בדיקת השחזור הציבורית משתמשת רק בכרכי בדיקה עם נתונים סינתטיים.

[הוראות פריסה](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/docs/DEPLOY_CONTAINER_HE.md)

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — פרטיות והרשאות
- [[04_AUTOMATIONS_AND_APIS/assets/AUTH_CLEANUP_CLI|ניקוי רשומות אימות שפג תוקפן]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/AUTH_HOST_SERVICE|שירות לניקוי רשומות אימות זהות שפג תוקפן]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/AUTH_HOST_TIMER|תזמון יומי לניקוי רשומות אימות זהות]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_BACKUP_MIGRATION|גיבוי עקבי לפני שינוי מבנה מסד הנתונים]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_BUILD_EXCLUSIONS|הפרדת מידע פרטי מתמונת האפליקציה]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_COMPOSE|השרת והאחסון שנשמר בין הפעלות]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_CONTAINER_CI|בדיקות חבילת הפריסה ב־GitHub]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_HTTPS_PROXY|שרת הכניסה וגבולות הבקשה]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_IMAGE|בניית תמונת האפליקציה]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_READINESS|בדיקת מוכנות פנימית]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_RESTORE_SMOKE|בדיקת שמירה ושחזור עם נתונים סינתטיים]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/DEPLOY_STARTUP|בדיקת הגדרות וגיבוי לפני הפעלה]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/KNOWLEDGE_CI|גילוי מקורות ציבוריים ב־GitHub]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/KNOWLEDGE_HOST_SERVICE|שירות רענון המקורות בשרת]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/KNOWLEDGE_HOST_TIMER|תזמון רענון שלוש פעמים בשבוע]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/assets/KNOWLEDGE_REFRESH_CLI|רענון המטמון שבו המנטור משתמש]] — קובץ פריסה ציבורי
- [[04_AUTOMATIONS_AND_APIS/Environment|הגדרת חיבורים וסודות בצד השרת]] — הגדרות בזמן הפעלה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — חבילת פריסה
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — רענון מטמון המקורות
