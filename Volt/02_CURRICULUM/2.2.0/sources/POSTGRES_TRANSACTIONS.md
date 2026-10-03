---
generated: true
schema_version: 1
kind: "source"
entity_id: "POSTGRES_TRANSACTIONS"
curriculum_version: "2.2.0"
source_id: "POSTGRES_TRANSACTIONS"
url: "https://www.postgresql.org/docs/current/tutorial-transactions.html"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/AUT_04]]","[[02_CURRICULUM/2.2.0/lessons/CRM_04]]","[[02_CURRICULUM/2.2.0/lessons/CRM_07]]","[[02_CURRICULUM/2.2.0/lessons/DAT_01]]","[[02_CURRICULUM/2.2.0/lessons/W05D21_DATABASES]]","[[02_CURRICULUM/2.2.0/lessons/W13D62_PRODUCTION_DATABASES]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_04]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_04]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_07]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_DAT_01]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W05D21_DATABASES]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D62_PRODUCTION_DATABASES]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AUT_04_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AUT_04_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AUT_04_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_04_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_04_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_04_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_07_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_07_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_07_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_01_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_01_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_01_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D21_DATABASES_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D21_DATABASES_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D21_DATABASES_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D62_PRODUCTION_DATABASES_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D62_PRODUCTION_DATABASES_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D62_PRODUCTION_DATABASES_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# PostgreSQL transactions

[למקור הראשוני](https://www.postgresql.org/docs/current/tutorial-transactions.html)

מפרסם: PostgreSQL

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — מקור למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/AUT_04|כשלים, ניסיונות חוזרים וכפילויות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_04|הצעות עבודה מתוך קטלוג]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_07|מלאי, מוצרים והזמנות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/DAT_01|עוזר נתונים עסקיים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W05D21_DATABASES|מסדי נתונים ו־SQL]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W13D62_PRODUCTION_DATABASES|PostgreSQL ונתונים לפרודקשן]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_04|בדיקת הבנה: אותו אירוע הגיע פעמיים. מה צריך לבדוק לפני יצירת משימה עסקית נוספת?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_04|בדיקת הבנה: המודל מציע ללקוח הנחה שאינה מותרת בקטלוג. איך צריך להכין את הצעת העבודה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_07|בדיקת הבנה: שתי הזמנות מנסות לרכוש את הפריט האחרון במלאי. איזה עיקרון צריך להנחות את עדכון היתרה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_DAT_01|בדיקת הבנה: שאילתת מכירות רצה בלי שגיאה, אך JOIN הכפיל שורות והגדיל את סכום ההכנסות. מה צריך לבדוק?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W05D21_DATABASES|בדיקת הבנה: הוספת לקוח הצליחה, אך הוספת הפנייה באותה עסקה נכשלה. מה מטרת ROLLBACK בתרגיל?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D62_PRODUCTION_DATABASES|בדיקת הבנה: היכן צריך לנסות תחילה Migration שמעביר customers ו־runs ל־PostgreSQL?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AUT_04_BUILD|תבנית טקסט: כשלים, ניסיונות חוזרים וכפילויות · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AUT_04_DIAGNOSE|תבנית טקסט: כשלים, ניסיונות חוזרים וכפילויות · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AUT_04_TRANSFER|תבנית טקסט: כשלים, ניסיונות חוזרים וכפילויות · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_04_BUILD|תבנית טקסט: הצעות עבודה מתוך קטלוג · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_04_DIAGNOSE|תבנית טקסט: הצעות עבודה מתוך קטלוג · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_04_TRANSFER|תבנית טקסט: הצעות עבודה מתוך קטלוג · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_07_BUILD|תבנית טקסט: מלאי, מוצרים והזמנות · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_07_DIAGNOSE|תבנית טקסט: מלאי, מוצרים והזמנות · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_07_TRANSFER|תבנית טקסט: מלאי, מוצרים והזמנות · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_01_BUILD|תבנית טקסט: עוזר נתונים עסקיים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_01_DIAGNOSE|תבנית טבלה: עוזר נתונים עסקיים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_01_TRANSFER|תבנית טקסט: עוזר נתונים עסקיים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D21_DATABASES_BUILD|תבנית טבלה: מסדי נתונים ו־SQL · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D21_DATABASES_DIAGNOSE|תבנית טקסט: מסדי נתונים ו־SQL · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D21_DATABASES_TRANSFER|תבנית טקסט: מסדי נתונים ו־SQL · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D62_PRODUCTION_DATABASES_BUILD|תבנית טקסט: PostgreSQL ונתונים לפרודקשן · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D62_PRODUCTION_DATABASES_DIAGNOSE|תבנית טקסט: PostgreSQL ונתונים לפרודקשן · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W13D62_PRODUCTION_DATABASES_TRANSFER|תבנית טקסט: PostgreSQL ונתונים לפרודקשן · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
