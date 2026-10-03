---
generated: true
schema_version: 1
kind: "source"
entity_id: "OPENAI_TOOLS"
curriculum_version: "2.2.0"
source_id: "OPENAI_TOOLS"
url: "https://developers.openai.com/api/docs/guides/function-calling"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W01D05_PROJECT_AGENT_ZERO]]","[[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP]]","[[02_CURRICULUM/2.2.0/lessons/W04D16_TASK_DECOMPOSITION]]","[[02_CURRICULUM/2.2.0/lessons/W04D17_SEARCH_EVIDENCE]]","[[02_CURRICULUM/2.2.0/lessons/W04D18_ITERATIVE_RESEARCH]]","[[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY]]","[[02_CURRICULUM/2.2.0/lessons/W04D20_BOSS_LEVEL_1_RESEARCH_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[02_CURRICULUM/2.2.0/lessons/W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW]]","[[02_CURRICULUM/2.2.0/lessons/W09D42_ROUTERS]]","[[02_CURRICULUM/2.2.0/lessons/W10D46_WHEN_MULTI_AGENT_MAKES_SENSE]]","[[02_CURRICULUM/2.2.0/lessons/W10D47_MANAGER_PATTERN]]","[[02_CURRICULUM/2.2.0/lessons/W10D48_HANDOFFS]]","[[02_CURRICULUM/2.2.0/lessons/W10D49_SHARED_STATE_COORDINATION]]","[[02_CURRICULUM/2.2.0/lessons/W10D50_PROJECT_AI_COMPANY]]","[[02_CURRICULUM/2.2.0/lessons/W15D73_DYNAMIC_TOOLS]]","[[02_CURRICULUM/2.2.0/lessons/W15D74_AGENTIC_CODING]]","[[02_CURRICULUM/2.2.0/lessons/W15D75_PROJECT_AUTONOMOUS_WORKFLOW]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D05_PROJECT_AGENT_ZERO]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D12_TOOL_CALLING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D13_AGENT_LOOP]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D16_TASK_DECOMPOSITION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D17_SEARCH_EVIDENCE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D18_ITERATIVE_RESEARCH]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D19_RESEARCH_QUALITY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W08D36_RESPONSES_API]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D42_ROUTERS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D47_MANAGER_PATTERN]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D48_HANDOFFS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D49_SHARED_STATE_COORDINATION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D50_PROJECT_AI_COMPANY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D73_DYNAMIC_TOOLS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D74_AGENTIC_CODING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D75_PROJECT_AUTONOMOUS_WORKFLOW]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# OpenAI function calling

[למקור הראשוני](https://developers.openai.com/api/docs/guides/function-calling)

מפרסם: OpenAI

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/W01D05_PROJECT_AGENT_ZERO|פרויקט: Agent Zero]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING|קריאות לכלים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP|לולאת סוכן ידנית]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D16_TASK_DECOMPOSITION|פירוק משימות מחקר]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D17_SEARCH_EVIDENCE|חיפוש ואיכות ראיות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D18_ITERATIVE_RESEARCH|מחקר איטרטיבי ותנאי עצירה]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY|אימות דוח מחקר]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D20_BOSS_LEVEL_1_RESEARCH_AGENT|מבחן מסכם: סוכן מחקר]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API|אינטגרציה ישירה עם Responses API]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE|מבחן מסכם: שתי ארכיטקטורות לאותה מערכת]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW|תהליכים דטרמיניסטיים עם AI]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W09D42_ROUTERS|ניתוב פניות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W10D46_WHEN_MULTI_AGENT_MAKES_SENSE|מתי כמה סוכנים מועילים?]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W10D47_MANAGER_PATTERN|מנהל ומומחים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W10D48_HANDOFFS|העברת אחריות בין סוכנים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W10D49_SHARED_STATE_COORDINATION|מצב משותף ותיאום]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W10D50_PROJECT_AI_COMPANY|פרויקט: צוות AI עסקי]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W15D73_DYNAMIC_TOOLS|גילוי כלים דינמי]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W15D74_AGENTIC_CODING|סוכן כתיבת קוד מבוקר]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W15D75_PROJECT_AUTONOMOUS_WORKFLOW|פרויקט: תהליך אוטונומי מבוקר]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D05_PROJECT_AGENT_ZERO|בדיקת הבנה: הכלי lookup_product נכשל ולא סיפק נתוני מלאי. איזו תשובה מתאימה לדרישת הפרויקט?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D12_TOOL_CALLING|בדיקת הבנה: המודל ביקש להפעיל כלי שאינו ברשימת הכלים המורשים. מה תפקיד הקוד?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D13_AGENT_LOOP|בדיקת הבנה: מה צריך לקרות לאחר שהקוד מפעיל כלי בלולאת הסוכן?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D16_TASK_DECOMPOSITION|בדיקת הבנה: איזו שאלת משנה כדאי להשאיר בתוכנית להשוואת ספקים?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D17_SEARCH_EVIDENCE|בדיקת הבנה: איזה מידע כדאי לשמור לצד טענה שנמצאה במחקר?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D18_ITERATIVE_RESEARCH|בדיקת הבנה: בסבב מחקר נוסף נמצאו שוב אותם קישורים בלי מידע שמקדם את ההחלטה. מה מתאים לתנאי העצירה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D19_RESEARCH_QUALITY|בדיקת הבנה: קישור בדוח נפתח בהצלחה, אבל הקטע אינו תומך בטענה שלידו. מה הבעיה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT|בדיקת הבנה: באיזה מדד לא מספיק להשתמש לבדו כדי להעריך את סוכן המחקר?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W08D36_RESPONSES_API|בדיקת הבנה: מדוע מחזירים תוצאת כלי עם ה־call_id המתאים?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE|בדיקת הבנה: מה צריך להשאיר זהה בהשוואה בין לולאה ידנית למימוש SDK או גרף?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW|בדיקת הבנה: מודל הציע חריגה מכלל הזכאות העסקי. מי צריך לקבוע אם מותר לבצע אותה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D42_ROUTERS|בדיקת הבנה: פנייה עוסקת גם במכירה וגם בתמיכה, ואין די מידע לבחור יעד. מה יכול הנתב להחזיר?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE|בדיקת הבנה: איך כדאי להחליט אם מנהל ושני מומחים עדיפים על סוכן יחיד?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D47_MANAGER_PATTERN|בדיקת הבנה: בדפוס מנהל ומומחים, מי נשאר אחראי לתוצאה הכוללת?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D48_HANDOFFS|בדיקת הבנה: מה מבדיל Handoff מבקשה למומחה לבצע חישוב?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D49_SHARED_STATE_COORDINATION|בדיקת הבנה: שני מומחים מציעים ערכים שונים לאותו שדה במצב המשותף. מה נדרש?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D50_PROJECT_AI_COMPANY|בדיקת הבנה: מומחה אחד נכשל ולתוצאה אחרת חסר מקור. מה צריך צוות ה־AI לתעד?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D73_DYNAMIC_TOOLS|בדיקת הבנה: חיפוש כלים מצא כלי בעל שם מתאים. מה עוד צריך לבדוק לפני הפעלתו?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D74_AGENTIC_CODING|בדיקת הבנה: תיקון קוד העביר בדיקה אחת, אבל שבר פעולה אחרת. איזה שלב נדרש בתהליך המבוקר?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D75_PROJECT_AUTONOMOUS_WORKFLOW|בדיקת הבנה: המערכת הגיעה לפעולה שדורשת אישור אדם. האם בקשת אישור יכולה להיות סיום תקין של המשימה הנוכחית?]] — מקור השאלה
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG|OpenAI API changelog]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS|OpenAI model catalog]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS|OpenAI News]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — תיעוד בקורס
