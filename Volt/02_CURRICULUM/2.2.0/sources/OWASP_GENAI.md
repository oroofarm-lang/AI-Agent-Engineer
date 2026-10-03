---
generated: true
schema_version: 1
kind: "source"
entity_id: "OWASP_GENAI"
curriculum_version: "2.2.0"
source_id: "OWASP_GENAI"
url: "https://genai.owasp.org/llm-top-10/"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/BIZ_04]]","[[02_CURRICULUM/2.2.0/lessons/CRM_06]]","[[02_CURRICULUM/2.2.0/lessons/W11D55_PROJECT_AGENT_QUALITY_LAB]]","[[02_CURRICULUM/2.2.0/lessons/W12D56_PROMPT_INJECTION]]","[[02_CURRICULUM/2.2.0/lessons/W12D57_TOOL_ATTACKS]]","[[02_CURRICULUM/2.2.0/lessons/W12D58_AUTHENTICATION_AUTHORIZATION]]","[[02_CURRICULUM/2.2.0/lessons/W12D60_BOSS_LEVEL_3_RED_TEAM]]","[[02_CURRICULUM/2.2.0/lessons/W15D71_BROWSER_COMPUTER_AGENTS]]","[[02_CURRICULUM/2.2.0/lessons/W15D72_CODE_SANDBOX_AGENTS]]","[[02_CURRICULUM/2.2.0/lessons/W16D76_DISCOVERY]]","[[02_CURRICULUM/2.2.0/lessons/W16D77_ARCHITECTURE]]","[[02_CURRICULUM/2.2.0/lessons/W16D78_BUILD]]","[[02_CURRICULUM/2.2.0/lessons/W16D79_HARDEN]]","[[02_CURRICULUM/2.2.0/lessons/W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_BIZ_04]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_06]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W11D55_PROJECT_AGENT_QUALITY_LAB]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D56_PROMPT_INJECTION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D57_TOOL_ATTACKS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D58_AUTHENTICATION_AUTHORIZATION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D60_BOSS_LEVEL_3_RED_TEAM]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D71_BROWSER_COMPUTER_AGENTS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D72_CODE_SANDBOX_AGENTS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D76_DISCOVERY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D77_ARCHITECTURE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D78_BUILD]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D79_HARDEN]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# OWASP LLM risks

[למקור הראשוני](https://genai.owasp.org/llm-top-10/)

מפרסם: OWASP

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/BIZ_04|חשבונות לקוח, מידע והרשאות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_06|סביבת עבודה לעובדים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W11D55_PROJECT_AGENT_QUALITY_LAB|פרויקט: מעבדת איכות לסוכן]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D56_PROMPT_INJECTION|הזרקת הוראות זדוניות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D57_TOOL_ATTACKS|תקיפות כלים וחשיפת מידע]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D58_AUTHENTICATION_AUTHORIZATION|זהות, הרשאה ובידוד לקוחות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D60_BOSS_LEVEL_3_RED_TEAM|מבחן מסכם: בדיקת תקיפה ותיקון]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W15D71_BROWSER_COMPUTER_AGENTS|סוכני דפדפן ומחשב]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W15D72_CODE_SANDBOX_AGENTS|Sandbox וסוכני קוד]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D76_DISCOVERY|פרויקט גמר: גילוי צרכים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D77_ARCHITECTURE|פרויקט גמר: ארכיטקטורה]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D78_BUILD|פרויקט גמר: בנייה]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D79_HARDEN|פרויקט גמר: הקשחה]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION|מבחן גמר: פתרון עסקי מלא]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_BIZ_04|בדיקת הבנה: מערכת הלקוח עדיין תלויה במפתח גישה של ספק השירות. מה צריך להבהיר ולתכנן במסירה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_06|בדיקת הבנה: עובד משנה את כתובת העמוד כדי לפתוח פנייה שלא הוקצתה לו. מה צריכה מערכת ההרשאות לבדוק?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W11D55_PROJECT_AGENT_QUALITY_LAB|בדיקת הבנה: שינוי שיפר דיוק אך הגדיל את הזמן מעבר למגבלה. איך נכון להציג את ההשוואה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D56_PROMPT_INJECTION|בדיקת הבנה: מסמך חיצוני מבקש לשלוח מידע ליעד שאינו מורשה. איזו הגנה נדרשת מעבר להנחיית בטיחות למודל?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D57_TOOL_ATTACKS|בדיקת הבנה: בקשת כלי כוללת JSON תקין עם נתיב מחוץ לתיקיית העבודה. מה צריך לבדוק?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D58_AUTHENTICATION_AUTHORIZATION|בדיקת הבנה: משתמש נכנס לחשבון ושינה tenant_id בבקשה. מדוע אין בכך הרשאה לקרוא לקוח אחר?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D60_BOSS_LEVEL_3_RED_TEAM|בדיקת הבנה: תוקנה תקיפה אחת במערכת. איזו בדיקה נוספת דורש המבחן המסכם?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D71_BROWSER_COMPUTER_AGENTS|בדיקת הבנה: כפתור עבר מקום ונפתח חלון נוסף. מה צריך סוכן הדפדפן לבדוק לפני פעולה שמשנה נתונים?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D72_CODE_SANDBOX_AGENTS|בדיקת הבנה: איך בודקים שה־Sandbox אוכף את הגבולות שהוגדרו?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D76_DISCOVERY|בדיקת הבנה: מה צריך לעשות לפני שבוחרים טכנולוגיה לפרויקט הגמר?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D77_ARCHITECTURE|בדיקת הבנה: איזה מידע צריך תרשים הארכיטקטורה להבהיר מעבר לשמות הרכיבים?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D78_BUILD|בדיקת הבנה: מהי המטרה של Vertical Slice בפרויקט הגמר?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D79_HARDEN|בדיקת הבנה: בדיקת הפעלה מחדש חשפה פעולה עסקית כפולה. מהו הצעד הנדרש לאחר אבחון הכשל?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION|בדיקת הבנה: איזו ראיה מתאימה לשליטה מקצועית במבחן הגמר?]] — מקור השאלה
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
