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
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W01D05_PROJECT_AGENT_ZERO]]","[[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP]]","[[02_CURRICULUM/2.2.0/lessons/W04D16_TASK_DECOMPOSITION]]","[[02_CURRICULUM/2.2.0/lessons/W04D17_SEARCH_EVIDENCE]]","[[02_CURRICULUM/2.2.0/lessons/W04D18_ITERATIVE_RESEARCH]]","[[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY]]","[[02_CURRICULUM/2.2.0/lessons/W04D20_BOSS_LEVEL_1_RESEARCH_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[02_CURRICULUM/2.2.0/lessons/W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW]]","[[02_CURRICULUM/2.2.0/lessons/W09D42_ROUTERS]]","[[02_CURRICULUM/2.2.0/lessons/W10D46_WHEN_MULTI_AGENT_MAKES_SENSE]]","[[02_CURRICULUM/2.2.0/lessons/W10D47_MANAGER_PATTERN]]","[[02_CURRICULUM/2.2.0/lessons/W10D48_HANDOFFS]]","[[02_CURRICULUM/2.2.0/lessons/W10D49_SHARED_STATE_COORDINATION]]","[[02_CURRICULUM/2.2.0/lessons/W10D50_PROJECT_AI_COMPANY]]","[[02_CURRICULUM/2.2.0/lessons/W15D73_DYNAMIC_TOOLS]]","[[02_CURRICULUM/2.2.0/lessons/W15D74_AGENTIC_CODING]]","[[02_CURRICULUM/2.2.0/lessons/W15D75_PROJECT_AUTONOMOUS_WORKFLOW]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D05_PROJECT_AGENT_ZERO]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D12_TOOL_CALLING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D13_AGENT_LOOP]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D16_TASK_DECOMPOSITION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D17_SEARCH_EVIDENCE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D18_ITERATIVE_RESEARCH]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D19_RESEARCH_QUALITY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W08D36_RESPONSES_API]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W09D42_ROUTERS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D47_MANAGER_PATTERN]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D48_HANDOFFS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D49_SHARED_STATE_COORDINATION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W10D50_PROJECT_AI_COMPANY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D73_DYNAMIC_TOOLS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D74_AGENTIC_CODING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D75_PROJECT_AUTONOMOUS_WORKFLOW]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D05_PROJECT_AGENT_ZERO_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D05_PROJECT_AGENT_ZERO_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D05_PROJECT_AGENT_ZERO_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D42_ROUTERS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D42_ROUTERS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D42_ROUTERS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D47_MANAGER_PATTERN_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D47_MANAGER_PATTERN_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D47_MANAGER_PATTERN_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D48_HANDOFFS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D48_HANDOFFS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D48_HANDOFFS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D49_SHARED_STATE_COORDINATION_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D49_SHARED_STATE_COORDINATION_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D49_SHARED_STATE_COORDINATION_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D50_PROJECT_AI_COMPANY_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D50_PROJECT_AI_COMPANY_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D50_PROJECT_AI_COMPANY_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D74_AGENTIC_CODING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D74_AGENTIC_CODING_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D74_AGENTIC_CODING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D75_PROJECT_AUTONOMOUS_WORKFLOW_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D75_PROJECT_AUTONOMOUS_WORKFLOW_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D75_PROJECT_AUTONOMOUS_WORKFLOW_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
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
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D05_PROJECT_AGENT_ZERO_BUILD|תבנית טקסט: פרויקט: Agent Zero · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D05_PROJECT_AGENT_ZERO_DIAGNOSE|תבנית טקסט: פרויקט: Agent Zero · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D05_PROJECT_AGENT_ZERO_TRANSFER|תבנית טקסט: פרויקט: Agent Zero · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_BUILD|תבנית טקסט: קריאות לכלים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_DIAGNOSE|תבנית טקסט: קריאות לכלים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_TRANSFER|תבנית טקסט: קריאות לכלים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_BUILD|תבנית טקסט: לולאת סוכן ידנית · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_DIAGNOSE|תבנית טקסט: לולאת סוכן ידנית · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_TRANSFER|תבנית טקסט: לולאת סוכן ידנית · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_BUILD|תבנית טקסט: פירוק משימות מחקר · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_DIAGNOSE|תבנית טקסט: פירוק משימות מחקר · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_TRANSFER|תבנית טקסט: פירוק משימות מחקר · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_BUILD|תבנית טקסט: חיפוש ואיכות ראיות · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_DIAGNOSE|תבנית טקסט: חיפוש ואיכות ראיות · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_TRANSFER|תבנית טקסט: חיפוש ואיכות ראיות · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_BUILD|תבנית טקסט: מחקר איטרטיבי ותנאי עצירה · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_DIAGNOSE|תבנית טקסט: מחקר איטרטיבי ותנאי עצירה · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_TRANSFER|תבנית טקסט: מחקר איטרטיבי ותנאי עצירה · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_BUILD|תבנית טבלה: אימות דוח מחקר · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_DIAGNOSE|תבנית טקסט: אימות דוח מחקר · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_TRANSFER|תבנית טקסט: אימות דוח מחקר · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_BUILD|תבנית טקסט: מבחן מסכם: סוכן מחקר · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_DIAGNOSE|תבנית טקסט: מבחן מסכם: סוכן מחקר · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_TRANSFER|תבנית טקסט: מבחן מסכם: סוכן מחקר · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_BUILD|תבנית טקסט: אינטגרציה ישירה עם Responses API · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_DIAGNOSE|תבנית טקסט: אינטגרציה ישירה עם Responses API · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_TRANSFER|תבנית טקסט: אינטגרציה ישירה עם Responses API · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE_BUILD|תבנית טקסט: מבחן מסכם: שתי ארכיטקטורות לאותה מערכת · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE_DIAGNOSE|תבנית טקסט: מבחן מסכם: שתי ארכיטקטורות לאותה מערכת · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE_TRANSFER|תבנית טקסט: מבחן מסכם: שתי ארכיטקטורות לאותה מערכת · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW_BUILD|תבנית טקסט: תהליכים דטרמיניסטיים עם AI · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW_DIAGNOSE|תבנית טקסט: תהליכים דטרמיניסטיים עם AI · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW_TRANSFER|תבנית טקסט: תהליכים דטרמיניסטיים עם AI · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D42_ROUTERS_BUILD|תבנית טקסט: ניתוב פניות · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D42_ROUTERS_DIAGNOSE|תבנית טקסט: ניתוב פניות · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W09D42_ROUTERS_TRANSFER|תבנית טקסט: ניתוב פניות · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE_BUILD|תבנית טקסט: מתי כמה סוכנים מועילים? · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE_DIAGNOSE|תבנית טקסט: מתי כמה סוכנים מועילים? · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE_TRANSFER|תבנית טקסט: מתי כמה סוכנים מועילים? · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D47_MANAGER_PATTERN_BUILD|תבנית טקסט: מנהל ומומחים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D47_MANAGER_PATTERN_DIAGNOSE|תבנית טקסט: מנהל ומומחים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D47_MANAGER_PATTERN_TRANSFER|תבנית טקסט: מנהל ומומחים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D48_HANDOFFS_BUILD|תבנית טקסט: העברת אחריות בין סוכנים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D48_HANDOFFS_DIAGNOSE|תבנית טקסט: העברת אחריות בין סוכנים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D48_HANDOFFS_TRANSFER|תבנית טקסט: העברת אחריות בין סוכנים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D49_SHARED_STATE_COORDINATION_BUILD|תבנית טקסט: מצב משותף ותיאום · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D49_SHARED_STATE_COORDINATION_DIAGNOSE|תבנית טקסט: מצב משותף ותיאום · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D49_SHARED_STATE_COORDINATION_TRANSFER|תבנית טקסט: מצב משותף ותיאום · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D50_PROJECT_AI_COMPANY_BUILD|תבנית טקסט: פרויקט: צוות AI עסקי · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D50_PROJECT_AI_COMPANY_DIAGNOSE|תבנית טקסט: פרויקט: צוות AI עסקי · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W10D50_PROJECT_AI_COMPANY_TRANSFER|תבנית טקסט: פרויקט: צוות AI עסקי · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_BUILD|תבנית טקסט: גילוי כלים דינמי · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_DIAGNOSE|תבנית טקסט: גילוי כלים דינמי · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_TRANSFER|תבנית טקסט: גילוי כלים דינמי · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D74_AGENTIC_CODING_BUILD|תבנית טקסט: סוכן כתיבת קוד מבוקר · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D74_AGENTIC_CODING_DIAGNOSE|תבנית טקסט: סוכן כתיבת קוד מבוקר · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D74_AGENTIC_CODING_TRANSFER|תבנית טקסט: סוכן כתיבת קוד מבוקר · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D75_PROJECT_AUTONOMOUS_WORKFLOW_BUILD|תבנית טקסט: פרויקט: תהליך אוטונומי מבוקר · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D75_PROJECT_AUTONOMOUS_WORKFLOW_DIAGNOSE|תבנית טקסט: פרויקט: תהליך אוטונומי מבוקר · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D75_PROJECT_AUTONOMOUS_WORKFLOW_TRANSFER|תבנית טקסט: פרויקט: תהליך אוטונומי מבוקר · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG|OpenAI API changelog]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS|OpenAI model catalog]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS|OpenAI News]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — תיעוד בקורס
