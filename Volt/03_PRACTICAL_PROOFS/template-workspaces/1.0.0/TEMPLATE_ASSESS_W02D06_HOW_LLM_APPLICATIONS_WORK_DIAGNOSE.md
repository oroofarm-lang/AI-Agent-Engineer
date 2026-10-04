---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_DIAGNOSE"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_DIAGNOSE"
template_version: "1.0.0"
lesson_id: "W02D06_HOW_LLM_APPLICATIONS_WORK"
assessment_id: "ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK"
criterion_id: "DIAGNOSE"
rubric_version: "2.1.0"
editor_kind: "markdown"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "editors-autosave-frozen-template-submission"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[02_CURRICULUM/2.2.0/lessons/W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[02_CURRICULUM/2.2.0/skills/GROUNDING]]","[[02_CURRICULUM/2.2.0/sources/GOOGLE_ML]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_QUICKSTART]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טקסט: איך אפליקציות LLM פועלות · DIAGNOSE

## המשימה

הסר מהמסמך עובדה שנחוצה לתשובה. בדוק אם המודל מציין שהמידע חסר. תעד את האבחון ואת התיקון שבדקת.

## מה לצרף

כתוב מה ציפית לקבל. צרף את התוצאה לפני התיקון, את הבדיקה שעזרה למצוא את התקלה ואת התוצאה לאחר התיקון.

## מבנה העבודה

כתוב את העבודה שלך כאן. אפשר לשלב כותרות, רשימות וקוד. תאר מה עשית, מה בדקת ומה התקבל; ציין גם מה עדיין לא נבדק.

תבנית טקסט בפורמט Markdown. המסמך מתחיל ריק; כתיבת כותרות בלבד אינה משלימה את המשימה.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/templates/releases/1.0.0.json)

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. עורך השיעור מחובר לשירות שמירת הטיוטות הפרטיות. בהגשה מתוך התבנית מצורף לעבודה הפרטית עותק קבוע של הטיוטה השמורה, כולל ההגדרה וגרסאות העריכה והקורס; אין לייצא לכאן תוכן טיוטות או עבודות אישיות.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W02D06_HOW_LLM_APPLICATIONS_WORK|התרגול: איך אפליקציות LLM פועלות]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W02D06_HOW_LLM_APPLICATIONS_WORK|איך אפליקציות LLM פועלות]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/GROUNDING|Grounding]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/GOOGLE_ML|Machine Learning Crash Course]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/OPENAI_QUICKSTART|OpenAI quickstart]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK|תנאי בדיקה: הוכחה מעשית · איך אפליקציות LLM פועלות]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK|הוכחה מעשית · איך אפליקציות LLM פועלות]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK|תבנית הגשה: הוכחה מעשית · איך אפליקציות LLM פועלות]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT|שאלות ההוכחה המעשית]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT|בחירת טיוטות שמורות להגשה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
