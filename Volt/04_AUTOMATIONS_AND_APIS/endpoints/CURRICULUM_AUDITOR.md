---
generated: true
schema_version: 1
kind: "api"
entity_id: "CURRICULUM_AUDITOR"
curriculum_version: "2.2.0"
api_id: "CURRICULUM_AUDITOR"
route: "/api/auditor"
methods: ["GET","POST"]
permission_scope: "verified-operator"
source_path: "src/app/api/auditor/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[02_CURRICULUM/2.2.0/modules/ADS]]","[[02_CURRICULUM/2.2.0/modules/AGENTS]]","[[02_CURRICULUM/2.2.0/modules/AUTOMATION]]","[[02_CURRICULUM/2.2.0/modules/BUSINESS]]","[[02_CURRICULUM/2.2.0/modules/CAPSTONE]]","[[02_CURRICULUM/2.2.0/modules/CORE]]","[[02_CURRICULUM/2.2.0/modules/CRM]]","[[02_CURRICULUM/2.2.0/modules/DATA]]","[[02_CURRICULUM/2.2.0/modules/KNOWLEDGE]]","[[02_CURRICULUM/2.2.0/modules/MARKETING]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[02_CURRICULUM/2.2.0/modules/VOICE]]","[[02_CURRICULUM/2.2.0/modules/WEB]]","[[04_AUTOMATIONS_AND_APIS/Index]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# בדיקה, פרסום וחזרה לגרסת קורס קודמת

כתובת: `/api/auditor`

פעולות HTTP: `GET`, `POST`.

היקף הרשאה: `verified-operator`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

מפעיל מאומת ומורשה משווה נוסחים ומקורות, שומר הצעה והחלטה על הנוסח המדויק, ומפרסם גרסה רק לאחר אישור אנושי נפרד. הפרסום שומר את הגרסה הקודמת ומאפשר חזרה אליה ללא שינוי ברשומות הלומדים. פרסום או חזרה לגרסה קודמת מפעילים עדכון של מפות Volt; כשל בייצוא מדווח בנפרד ואינו מבטל את הפעולה בקורס. גילוי עדכונים ומשוב סוכן אינם אישור לפרסום. יומן ההצעות, זהות הבודק והמסד הפרטי אינם מיוצאים לכספת.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/auditor/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — אישור נפרד לפרסום
- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הצעת מומחה ללא הרשאת פרסום
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — בדיקת ניסוח
- [[02_CURRICULUM/2.2.0/modules/ADS|פרסום ומדידה]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/AGENTS|סוכנים ותזמור]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/AUTOMATION|אוטומציה והטמעת מערכות]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/BUSINESS|הפיכת הידע לשירות]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/CAPSTONE|פרויקט גמר לעסק]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/CORE|פרק 1: יסודות · פרק חובה]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/CRM|מכירות ושירות לקוחות]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/DATA|נתונים ומודלים מקומיים]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/KNOWLEDGE|זיכרון ומערכות ידע]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/MARKETING|תוכן ושיווק עם AI]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/QUALITY|איכות, אבטחה ובקרה]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/VOICE|קול ושירות לקוחות]] — עדכון גרסה ללא איפוס התקדמות
- [[02_CURRICULUM/2.2.0/modules/WEB|אתרים וכלים פנימיים]] — עדכון גרסה ללא איפוס התקדמות
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — הצעה וביקורת אנושית
