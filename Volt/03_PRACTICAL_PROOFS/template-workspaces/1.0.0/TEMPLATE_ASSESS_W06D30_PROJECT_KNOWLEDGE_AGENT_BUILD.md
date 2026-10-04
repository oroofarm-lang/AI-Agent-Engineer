---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_BUILD"
template_version: "1.0.0"
lesson_id: "W06D30_PROJECT_KNOWLEDGE_AGENT"
assessment_id: "ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "markdown"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "editors-autosave-frozen-template-submission"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[02_CURRICULUM/2.2.0/skills/EMBEDDINGS]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טקסט: פרויקט: עוזר ידע ארגוני · BUILD

## המשימה

בנה את השלבים ingest → retrieve → answer: קליטת מסמכים, חיפוש קטעים ומתן תשובה. צרף ציטוטים וקטעים תומכים. שמור גרסאות ובדוק שכל לקוח רואה רק מידע שלו. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

כתוב את העבודה שלך כאן. אפשר לשלב כותרות, רשימות וקוד. תאר מה עשית, מה בדקת ומה התקבל; ציין גם מה עדיין לא נבדק.

תבנית טקסט בפורמט Markdown. המסמך מתחיל ריק; כתיבת כותרות בלבד אינה משלימה את המשימה.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/templates/releases/1.0.0.json)

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. עורך השיעור מחובר לשירות שמירת הטיוטות הפרטיות. בהגשה מתוך התבנית מצורף לעבודה הפרטית עותק קבוע של הטיוטה השמורה, כולל ההגדרה וגרסאות העריכה והקורס; אין לייצא לכאן תוכן טיוטות או עבודות אישיות.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W06D30_PROJECT_KNOWLEDGE_AGENT|התרגול: פרויקט: עוזר ידע ארגוני]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W06D30_PROJECT_KNOWLEDGE_AGENT|פרויקט: עוזר ידע ארגוני]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/EMBEDDINGS|Embeddings]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY|Azure search security trimming]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT|תנאי בדיקה: הוכחה מעשית · פרויקט: עוזר ידע ארגוני]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT|הוכחה מעשית · פרויקט: עוזר ידע ארגוני]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT|תבנית הגשה: הוכחה מעשית · פרויקט: עוזר ידע ארגוני]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT|שאלות ההוכחה המעשית]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT|בחירת טיוטות שמורות להגשה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
