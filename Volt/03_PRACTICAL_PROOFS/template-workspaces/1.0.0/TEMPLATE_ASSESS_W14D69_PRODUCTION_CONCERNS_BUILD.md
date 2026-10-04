---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_BUILD"
template_version: "1.0.0"
lesson_id: "W14D69_PRODUCTION_CONCERNS"
assessment_id: "ASSESS_W14D69_PRODUCTION_CONCERNS"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "markdown"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "editors-autosave-frozen-template-submission"
related: ["[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W14D69_PRODUCTION_CONCERNS]]","[[02_CURRICULUM/2.2.0/lessons/W14D69_PRODUCTION_CONCERNS]]","[[02_CURRICULUM/2.2.0/skills/DEPLOYMENT]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_DATA]]","[[02_CURRICULUM/2.2.0/sources/OTEL]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W14D69_PRODUCTION_CONCERNS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D69_PRODUCTION_CONCERNS]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W14D69_PRODUCTION_CONCERNS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/MENTOR_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/MENTOR_INPUT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/MENTOR_TEMPLATE_CONTEXT]]","[[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_MARKDOWN_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_DIRECTION]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_EXPORT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_MARKDOWN]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_WORKSPACE_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/WORKSPACE_NAVIGATION_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טקסט: עלות, ביצועים וניטור · BUILD

## המשימה

הוסף מגבלות שימוש ומדידת זמן. הגדר בחירת מודל לפי סוג המשימה (Model Routing), ובדוק אותה על אותם תרחישים כדי להשוות את התוצאה. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

כתוב את העבודה שלך כאן. אפשר לשלב כותרות, רשימות וקוד. תאר מה עשית, מה בדקת ומה התקבל; ציין גם מה עדיין לא נבדק.

תבנית טקסט בפורמט Markdown. המסמך מתחיל ריק; כתיבת כותרות בלבד אינה משלימה את המשימה.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/templates/releases/1.0.0.json)

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. עורך השיעור מחובר לשירות שמירת הטיוטות הפרטיות. בהגשה מתוך התבנית מצורף לעבודה הפרטית עותק קבוע של הטיוטה השמורה, כולל ההגדרה וגרסאות העריכה והקורס; אין לייצא לכאן תוכן טיוטות או עבודות אישיות.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W14D69_PRODUCTION_CONCERNS|התרגול: עלות, ביצועים וניטור]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W14D69_PRODUCTION_CONCERNS|עלות, ביצועים וניטור]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/DEPLOYMENT|Deployment]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/OPENAI_DATA|OpenAI data controls]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/OTEL|OpenTelemetry signals]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W14D69_PRODUCTION_CONCERNS|תנאי בדיקה: הוכחה מעשית · עלות, ביצועים וניטור]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D69_PRODUCTION_CONCERNS|הוכחה מעשית · עלות, ביצועים וניטור]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W14D69_PRODUCTION_CONCERNS|תבנית הגשה: הוכחה מעשית · עלות, ביצועים וניטור]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/MENTOR_COMPONENT|בחירת הקשר לשיחה עם המנטור]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/MENTOR_INPUT_CONTRACT|מבנה בקשות העזרה וההקשר הנבחר]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/MENTOR_TEMPLATE_CONTEXT|צירוף גרסת טיוטה שמורה לפי הרשאה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT|שאלות ההוכחה המעשית]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_MARKDOWN_COMPONENT|עורך טקסט ותצוגה מקדימה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_DIRECTION|כיוון כתיבה עברי בקובץ PDF]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_EXPORT|ייצוא העבודה לקובץ PDF]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_MARKDOWN|עיצוב טקסט ותוכן Markdown ב־PDF]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT|בחירת טיוטות שמורות להגשה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_WORKSPACE_COMPONENT|עריכת תבנית ושמירה אוטומטית]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/WORKSPACE_NAVIGATION_COMPONENT|התראה לפני מעבר כשאין אישור לשמירת העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
