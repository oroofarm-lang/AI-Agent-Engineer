---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W08D36_RESPONSES_API_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W08D36_RESPONSES_API_BUILD"
template_version: "1.0.0"
lesson_id: "W08D36_RESPONSES_API"
assessment_id: "ASSESS_W08D36_RESPONSES_API"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "markdown"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "editors-autosave-no-template-submission"
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/skills/AGENT_LOOP]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_QUICKSTART]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_TOOLS]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W08D36_RESPONSES_API]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W08D36_RESPONSES_API]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טקסט: אינטגרציה ישירה עם Responses API · BUILD

## המשימה

חבר את הסוכן הידני ל־Responses. הפרד את רכיב הקריאה לשירות מהכלים המקומיים. החזר כל תוצאת כלי לפי call_id של הבקשה שקיבלת. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

כתוב את העבודה שלך כאן. אפשר לשלב כותרות, רשימות וקוד. תאר מה עשית, מה בדקת ומה התקבל; ציין גם מה עדיין לא נבדק.

תבנית טקסט בפורמט Markdown. המסמך מתחיל ריק; כתיבת כותרות בלבד אינה משלימה את המשימה.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/templates/releases/1.0.0.json)

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. עורך השיעור מחובר לשירות שמירת הטיוטות הפרטיות. ההגשה הישירה כקובץ תבנית מובנה עדיין לא חוברה; אין לייצא לכאן תוכן טיוטות או עבודות אישיות.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W08D36_RESPONSES_API|התרגול: אינטגרציה ישירה עם Responses API]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API|אינטגרציה ישירה עם Responses API]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/AGENT_LOOP|Agent Loop]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/OPENAI_QUICKSTART|OpenAI quickstart]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/OPENAI_TOOLS|OpenAI function calling]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W08D36_RESPONSES_API|תנאי בדיקה: הוכחה מעשית · אינטגרציה ישירה עם Responses API]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API|הוכחה מעשית · אינטגרציה ישירה עם Responses API]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W08D36_RESPONSES_API|תבנית הגשה: הוכחה מעשית · אינטגרציה ישירה עם Responses API]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
