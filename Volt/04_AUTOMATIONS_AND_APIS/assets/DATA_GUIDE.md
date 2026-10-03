---
generated: true
schema_version: 1
kind: "asset"
entity_id: "DATA_GUIDE"
curriculum_version: "2.2.0"
source_path: "public/course-data/v1/README.txt"
asset_kind: "fixture"
source_sha256: "def669374051bd88cb31d53bada69c8c72973b2e24a1c404706bea4e5335a5b9"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Marketing-Growth]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Visual-Media]]","[[01_AGENTS/Agent-Voice-Audio]]","[[02_CURRICULUM/2.2.0/modules/CORE]]","[[02_CURRICULUM/2.2.0/modules/CRM]]","[[02_CURRICULUM/2.2.0/modules/MARKETING]]","[[02_CURRICULUM/2.2.0/modules/VOICE]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# מדריך נתוני התרגול

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/public/course-data/v1/README.txt)

סוג הקובץ: `fixture`. נתיב במאגר הציבורי: `public/course-data/v1/README.txt`.

אלה נתונים סינתטיים שנועדו לתרגול, ולא מידע של לקוחות אמיתיים.

## תוכן הקובץ הציבורי

```
ערכת נתונים סינתטית — גרסה 1.0.0

כל הנתונים הומצאו לתרגול. המחירים, השמות והנהלים אינם עובדות על עסק אמיתי.
אין לשלוח הודעות לכתובות בקבצים; example.test משמש כאן ככתובת בדיקה.

business.json
קטלוג, לקוחות, פניות, מסמכים ואירועי אישור. בדיקות מכוונות:
R4 חוזר על האירוע של R1; אל תיצור עבודה עסקית כפולה.
R5 מבקש גישה לפרטי לקוח שאינו שייך ל־DEMO_A; יש לדחות גם כשהמזהה תקין.
R6 מבקש מוצר שאינו קיים; אין להמציא מחיר.
DOC_CATALOG_V1 הוא מסמך שהוחלף; המחיר הנוכחי של P1 במעבדה הוא 500.
DOC_INJECTION מכיל הוראה בתוך קלט לא מהימן; הוא אינו מעניק הרשאה.
עריכת טיוטת OP1 לגרסה 2 מבטלת את תוקף האישור לגרסה 1, לפי מדיניות התרגיל.
שתי הזמנות מתחרות על מלאי P1, שהכמות הזמינה בו היא 1 — עליך לתכנן בדיקה ועדכון עקביים.

campaigns.csv
שורת AD1 מופיעה פעמיים בכוונה. שמור row_id ומנע יבוא כפול.
בשורת AD1: CTR=5%, CPC=2 ILS, CPA=50 ILS, ROAS=5.
בשורות עם מכנה אפס היחס אינו מוגדר; הצג חסר במקום מספר מומצא.
אין לחבר ILS ו־USD בלי כלל המרה ותיעוד מתאים. אין כלל כזה בקובץ.
אין כאן נתוני קמפיין אמיתי או ראיה לביצועי פרסום.

contacts.csv
שתי רשומות שונות חולקות שם; אל תמזג לפי שם בלבד.
CONTACT_1 מופיע פעמיים בכוונה. שדה דוא״ל חסר אינו צריך להתמלא בניחוש.

call.txt
תסריט להקלטה ולתמלול, עם תוצאות צפויות. לא הוגשה הזמנה, והתאריך לא נקבע.
חותמות הזמן הן סימוני התרגיל בלבד.

שמור עותק של הקובץ לפני ניסוי. הוסף מקרי בדיקה משלך; ערכה זו אינה מכסה כל כשל.

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Marketing-Growth|תוכן ושיווק]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Visual-Media|תוכן חזותי ותהליכי מדיה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Voice-Audio|קול, תמלול ושיחה]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/CORE|פרק 1: יסודות · פרק חובה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/CRM|מכירות ושירות לקוחות]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/MARKETING|תוכן ושיווק עם AI]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/VOICE|קול ושירות לקוחות]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
