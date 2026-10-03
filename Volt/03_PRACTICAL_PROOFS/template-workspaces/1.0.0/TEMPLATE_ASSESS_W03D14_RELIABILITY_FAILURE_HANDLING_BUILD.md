---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING_BUILD"
template_version: "1.0.0"
lesson_id: "W03D14_RELIABILITY_FAILURE_HANDLING"
assessment_id: "ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "markdown"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "definitions-formats-owned-drafts-no-editor"
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W03D14_RELIABILITY_FAILURE_HANDLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D14_RELIABILITY_FAILURE_HANDLING]]","[[02_CURRICULUM/2.2.0/skills/TOOL_CALLING]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_AGENTS]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_TUTORIAL]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טקסט: טיפול בכשלים וגבולות סוכן · BUILD

## המשימה

הוסף הגבלות זמן (timeouts), ניסיונות חוזרים (retry) במספר מוגבל לכלי קריאה, ומספר צעדים מרבי. בסוף החזר אחד מהמצבים completed, failed או needs_review, עם הסיבה. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

כתוב את העבודה שלך כאן. אפשר לשלב כותרות, רשימות וקוד. תאר מה עשית, מה בדקת ומה התקבל; ציין גם מה עדיין לא נבדק.

תבנית טקסט בפורמט Markdown. המסמך מתחיל ריק; כתיבת כותרות בלבד אינה משלימה את המשימה.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/templates/releases/1.0.0.json)

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. שירות שמירת הטיוטות הפרטיות מקושר בנפרד; עורך השיעור עדיין לא חובר אליו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W03D14_RELIABILITY_FAILURE_HANDLING|התרגול: טיפול בכשלים וגבולות סוכן]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W03D14_RELIABILITY_FAILURE_HANDLING|טיפול בכשלים וגבולות סוכן]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/TOOL_CALLING|Tool Calling]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_AGENTS|Building effective agents]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/PYTHON_TUTORIAL|Python tutorial]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING|תנאי בדיקה: הוכחה מעשית · טיפול בכשלים וגבולות סוכן]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING|הוכחה מעשית · טיפול בכשלים וגבולות סוכן]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING|תבנית הגשה: הוכחה מעשית · טיפול בכשלים וגבולות סוכן]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
