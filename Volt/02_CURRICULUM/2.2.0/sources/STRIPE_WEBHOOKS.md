---
generated: true
schema_version: 1
kind: "source"
entity_id: "STRIPE_WEBHOOKS"
curriculum_version: "2.2.0"
source_id: "STRIPE_WEBHOOKS"
url: "https://docs.stripe.com/webhooks"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Automation-Engineer]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/AUT_04]]","[[02_CURRICULUM/2.2.0/lessons/AUT_08]]","[[02_CURRICULUM/2.2.0/lessons/CRM_01]]","[[02_CURRICULUM/2.2.0/lessons/CRM_02]]","[[02_CURRICULUM/2.2.0/lessons/CRM_03]]","[[02_CURRICULUM/2.2.0/lessons/CRM_07]]","[[02_CURRICULUM/2.2.0/lessons/CRM_08]]","[[02_CURRICULUM/2.2.0/lessons/W07D31_PRODUCTION_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W07D32_TOOL_DESIGN]]","[[02_CURRICULUM/2.2.0/lessons/W07D34_SIDE_EFFECTS_PERMISSIONS]]","[[02_CURRICULUM/2.2.0/lessons/W07D35_PROJECT_OPERATIONS_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W09D44_LONG_RUNNING_WORKFLOWS]]","[[02_CURRICULUM/2.2.0/lessons/W09D45_PROJECT_DURABLE_WORKFLOW_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W13D63_QUEUES_WORKERS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_04]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_08]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_01]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_02]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_03]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_07]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_08]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D31_PRODUCTION_APIS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D32_TOOL_DESIGN]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D34_SIDE_EFFECTS_PERMISSIONS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D35_PROJECT_OPERATIONS_AGENT]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D44_LONG_RUNNING_WORKFLOWS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D45_PROJECT_DURABLE_WORKFLOW_AGENT]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D63_QUEUES_WORKERS]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# Stripe webhooks

[למקור הראשוני](https://docs.stripe.com/webhooks)

מפרסם: Stripe

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/AUT_04|כשלים, ניסיונות חוזרים וכפילויות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_08|מבחן מסכם: מערכת אוטומציה עסקית]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_01|מודל נתונים ללקוחות ולעסקאות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_02|יבוא לקוחות ומניעת כפילות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_03|סיווג לידים ומעקב מכירות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_07|מלאי, מוצרים והזמנות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_08|מבחן מסכם: מערכת עבודה לעסק]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D31_PRODUCTION_APIS|ממשקי API עסקיים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D32_TOOL_DESIGN|תכנון כלים עסקיים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D34_SIDE_EFFECTS_PERMISSIONS|תופעות לוואי והרשאות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D35_PROJECT_OPERATIONS_AGENT|פרויקט: סוכן תפעול]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W09D44_LONG_RUNNING_WORKFLOWS|תהליכים ארוכים והתאוששות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W09D45_PROJECT_DURABLE_WORKFLOW_AGENT|פרויקט: תהליך עבודה שנמשך לאחר תקלה]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W13D63_QUEUES_WORKERS|תורים ועובדים]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_04|בדיקת הבנה: אותו אירוע הגיע פעמיים. מה צריך לבדוק לפני יצירת משימה עסקית נוספת?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_08|בדיקת הבנה: שלב יצירת משימה הצליח, אבל הפנייה אינה ב־CRM הנכון. איך צריך להעריך את התהליך?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_01|בדיקת הבנה: לאותו לקוח יש שתי עסקאות. איך נכון לייצג זאת במודל הנתונים של ה־CRM?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_02|בדיקת הבנה: בקובץ יבוא מופיעות שתי רשומות עם אותו שם, אבל פרטי הקשר שונים. האם צריך למזג אותן אוטומטית?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_03|בדיקת הבנה: נוצרה משימת מעקב לליד, אך לא נקבע מי מטפל בו ומתי. מה חסר כדי שהמעקב יהיה שימושי?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_07|בדיקת הבנה: שתי הזמנות מנסות לרכוש את הפריט האחרון במלאי. איזה עיקרון צריך להנחות את עדכון היתרה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_08|בדיקת הבנה: מערכת הפניות מחוברת ל־CRM. האם החיבור מאפשר לדלג על בדיקת ההרשאות ב־CRM?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D31_PRODUCTION_APIS|בדיקת הבנה: Webhook התקבל והשרת אישר קבלה, אבל העבודה בתור טרם הסתיימה. איזה מצב נכון להציג?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D32_TOOL_DESIGN|בדיקת הבנה: מה היתרון בפיצול כלי CRM ל־lookup_customer, prepare_update ו־apply_update?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D34_SIDE_EFFECTS_PERMISSIONS|בדיקת הבנה: מה צריך להגדיר אישור אנושי לפעולה בעלת השפעה משמעותית?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D35_PROJECT_OPERATIONS_AGENT|בדיקת הבנה: הסוכן הכין טיוטת עדכון CRM אך טרם קיבל אישור. מה מותר להציג?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D44_LONG_RUNNING_WORKFLOWS|בדיקת הבנה: השירות החיצוני ביצע שינוי, אך התוכנית קרסה לפני רישום הצלחה. למה נדרש שלב reconcile?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D45_PROJECT_DURABLE_WORKFLOW_AGENT|בדיקת הבנה: איזה ניסוי בודק התאוששות לאחר הפעלה מחדש של תהליך העבודה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D63_QUEUES_WORKERS|בדיקת הבנה: Worker נעצר אחרי שחלק מהפעולה בוצע, והתור מסר שוב אותה עבודה. למה חשוב מזהה הפעולה?]] — מקור השאלה
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
