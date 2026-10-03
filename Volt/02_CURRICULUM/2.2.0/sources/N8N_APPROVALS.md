---
generated: true
schema_version: 1
kind: "source"
entity_id: "N8N_APPROVALS"
curriculum_version: "2.2.0"
source_id: "N8N_APPROVALS"
url: "https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-CRM-Sales]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/AUT_01]]","[[02_CURRICULUM/2.2.0/lessons/AUT_03]]","[[02_CURRICULUM/2.2.0/lessons/AUT_05]]","[[02_CURRICULUM/2.2.0/lessons/AUT_08]]","[[02_CURRICULUM/2.2.0/lessons/MKT_09]]","[[02_CURRICULUM/2.2.0/lessons/W07D32_TOOL_DESIGN]]","[[02_CURRICULUM/2.2.0/lessons/W07D34_SIDE_EFFECTS_PERMISSIONS]]","[[02_CURRICULUM/2.2.0/lessons/W07D35_PROJECT_OPERATIONS_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W12D59_HUMAN_IN_THE_LOOP]]","[[02_CURRICULUM/2.2.0/lessons/W14D67_AGENT_UI]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_01]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_03]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_05]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_08]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_MKT_09]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D32_TOOL_DESIGN]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D34_SIDE_EFFECTS_PERMISSIONS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D35_PROJECT_OPERATIONS_AGENT]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D59_HUMAN_IN_THE_LOOP]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D67_AGENT_UI]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/N8N]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]","[[04_AUTOMATIONS_AND_APIS/technologies/N8N]]"]
---

# n8n human-in-the-loop

[למקור הראשוני](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools)

מפרסם: n8n

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — מקור למומחה
- [[01_AGENTS/Agent-Business-Discovery|אפיון שירות ופרויקט עסקי]] — מקור למומחה
- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/AUT_01|אוטומציה ראשונה ב־n8n]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_03|שלב AI בתוך תהליך קבוע]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_05|אישור אנושי בתהליך חזותי]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_08|מבחן מסכם: מערכת אוטומציה עסקית]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/MKT_09|SEO ואישור פרסום]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D32_TOOL_DESIGN|תכנון כלים עסקיים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D34_SIDE_EFFECTS_PERMISSIONS|תופעות לוואי והרשאות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D35_PROJECT_OPERATIONS_AGENT|פרויקט: סוכן תפעול]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D59_HUMAN_IN_THE_LOOP|אישור אנושי וחידוש תהליך]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W14D67_AGENT_UI|ממשק לסוכן ולפעולותיו]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_01|בדיקת הבנה: תהליך n8n עובד עם רשומה אחת. איזו בדיקה נוספת מבקש השיעור?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_03|בדיקת הבנה: שלב ה־AI החזיר טקסט חופשי במקום המבנה שהוגדר. מה צריך לקרות לפני כתיבה ל־CRM?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_05|בדיקת הבנה: טיוטת תשובה שונתה אחרי אישור בתהליך החזותי. מה נדרש כדי להמשיך?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AUT_08|בדיקת הבנה: שלב יצירת משימה הצליח, אבל הפנייה אינה ב־CRM הנכון. איך צריך להעריך את התהליך?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_MKT_09|בדיקת הבנה: מאמר כולל כותרת ותיאור לחיפוש, אך אינו מוסיף מידע מועיל לקורא. האם אפשר לאשר אותו רק בזכות הגדרות ה־SEO?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D32_TOOL_DESIGN|בדיקת הבנה: מה היתרון בפיצול כלי CRM ל־lookup_customer, prepare_update ו־apply_update?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D34_SIDE_EFFECTS_PERMISSIONS|בדיקת הבנה: מה צריך להגדיר אישור אנושי לפעולה בעלת השפעה משמעותית?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D35_PROJECT_OPERATIONS_AGENT|בדיקת הבנה: הסוכן הכין טיוטת עדכון CRM אך טרם קיבל אישור. מה מותר להציג?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D59_HUMAN_IN_THE_LOOP|בדיקת הבנה: טיוטת הפעולה נערכה אחרי אישור אנושי. מה צריך לבדוק לפני הביצוע?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D67_AGENT_UI|בדיקת הבנה: איזה מידע צריך להציג לפני לחיצה על אישור פעולה?]] — מקור השאלה
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/N8N|n8n]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
- [[04_AUTOMATIONS_AND_APIS/technologies/N8N|n8n]] — תיעוד בקורס
