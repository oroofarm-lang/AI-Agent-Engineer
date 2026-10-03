---
generated: true
schema_version: 1
kind: "proof"
entity_id: "ASSESS_W12D57_TOOL_ATTACKS"
curriculum_version: "2.2.0"
assessment_id: "ASSESS_W12D57_TOOL_ATTACKS"
assessment_version: "2.1.0"
lesson_id: "W12D57_TOOL_ATTACKS"
related: ["[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W12D57_TOOL_ATTACKS]]","[[02_CURRICULUM/2.2.0/lessons/W12D57_TOOL_ATTACKS]]","[[02_CURRICULUM/2.2.0/skills/HUMAN_APPROVAL]]","[[02_CURRICULUM/2.2.0/skills/PROMPT_INJECTION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D57_TOOL_ATTACKS]]","[[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W12D57_TOOL_ATTACKS]]","[[03_PRACTICAL_PROOFS/2.2.0/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W12D57_TOOL_ATTACKS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE]]","[[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD]]"]
---

# הוכחה מעשית · תקיפות כלים וחשיפת מידע

צרף תוצר וראיות שאפשר לבדוק. בכל סעיף כתוב הסבר וצרף דוגמה ותוצאה. ההגשה שומרת את העבודה לצורך בדיקה. היא אינה מריצה את הקוד ואינה מחשבת ציון באופן אוטומטי.

## תנאי ההגשה

### 1. BUILD

בדוק כלי קבצים, HTTP ו־CRM עם נתיבים ויעדים שאסור להם לגשת אליהם. הגדר רשימת יעדים מורשים (allowlist) בסביבת המעבדה ובדוק שהקוד אוכף אותה. הראה תוצר והסבר כיצד בדקת אותו.

**מה לצרף:** צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

### 2. DIAGNOSE

נסה נתיב מחוץ לתיקיית העבודה וכתובת (URL) של יעד פנימי שאינו מורשה. בדוק חסימה. תעד את האבחון ואת התיקון שבדקת.

**מה לצרף:** כתוב מה ציפית לקבל. צרף את התוצאה לפני התיקון, את הבדיקה שעזרה למצוא את התקלה ואת התוצאה לאחר התיקון.

### 3. TRANSFER

הוסף לכל ניסיון תקיפה בדיקת רגרסיה (Regression), כדי לוודא שהתיקון נשמר. הצג פתרון עצמאי וציין מקרה שהפתרון אינו מטפל בו.

**מה לצרף:** צרף תוצר חדש, החלטה מנומקת ומקרה שבו הפתרון אינו מספיק.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — משוב על ראיות
- [[01_AGENTS/Agent-Business-Discovery|אפיון שירות ופרויקט עסקי]] — משוב על ראיות
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — משוב על ראיות
- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — משוב על ראיות
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — משוב על ראיות
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — משוב על ראיות
- [[01_AGENTS/Agent-Paid-Media-Measurement|פרסום ומדידה]] — משוב על ראיות
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — משוב על ראיות
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — משוב על ראיות
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — משוב על ראיות
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — משוב על ראיות
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — משוב על ראיות
- [[02_CURRICULUM/2.2.0/exercises/W12D57_TOOL_ATTACKS|התרגול: תקיפות כלים וחשיפת מידע]] — ראיות מהתרגול
- [[02_CURRICULUM/2.2.0/lessons/W12D57_TOOL_ATTACKS|תקיפות כלים וחשיפת מידע]] — הוכחה מעשית
- [[02_CURRICULUM/2.2.0/skills/HUMAN_APPROVAL|Human Approval]] — מיומנות שנבדקת
- [[02_CURRICULUM/2.2.0/skills/PROMPT_INJECTION|Prompt Injection]] — מיומנות שנבדקת
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D57_TOOL_ATTACKS|בדיקת הבנה: בקשת כלי כוללת JSON תקין עם נתיב מחוץ לתיקיית העבודה. מה צריך לבדוק?]] — תרגול לפני הגשה
- [[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP|לפני שמגישים · שאלה קצרה לתרגול]] — הבחנה בין הגשה לשליטה
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W12D57_TOOL_ATTACKS|תנאי בדיקה: הוכחה מעשית · תקיפות כלים וחשיפת מידע]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/Index|תרגילים, ראיות ותיק עבודות]] — מחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W12D57_TOOL_ATTACKS|תבנית הגשה: הוכחה מעשית · תקיפות כלים וחשיפת מידע]] — תבנית הגשה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_BUILD|תבנית טקסט: תקיפות כלים וחשיפת מידע · BUILD]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_DIAGNOSE|תבנית טקסט: תקיפות כלים וחשיפת מידע · DIAGNOSE]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_TRANSFER|תבנית טקסט: תקיפות כלים וחשיפת מידע · TRANSFER]] — סעיף במחוון
- [[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE|משוב מנומק על עבודה]] — ראיות והגשות
- [[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD|הורדת קובץ של הגשה]] — ראיות והגשות
