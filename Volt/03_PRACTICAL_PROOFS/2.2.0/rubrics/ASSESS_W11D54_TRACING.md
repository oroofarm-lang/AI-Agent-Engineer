---
generated: true
schema_version: 1
kind: "proof"
entity_id: "ASSESS_W11D54_TRACING"
curriculum_version: "2.2.0"
assessment_id: "ASSESS_W11D54_TRACING"
assessment_version: "2.1.0"
lesson_id: "W11D54_TRACING"
related: ["[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W11D54_TRACING]]","[[02_CURRICULUM/2.2.0/lessons/W11D54_TRACING]]","[[02_CURRICULUM/2.2.0/skills/EVALS]]","[[02_CURRICULUM/2.2.0/skills/TESTING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W11D54_TRACING]]","[[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W11D54_TRACING]]","[[03_PRACTICAL_PROOFS/2.2.0/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W11D54_TRACING]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE]]","[[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD]]"]
---

# הוכחה מעשית · תיעוד ריצות וניטור

צרף תוצר וראיות שאפשר לבדוק. בכל סעיף כתוב הסבר וצרף דוגמה ותוצאה. ההגשה שומרת את העבודה לצורך בדיקה. היא אינה מריצה את הקוד ואינה מחשבת ציון באופן אוטומטי.

## תנאי ההגשה

### 1. BUILD

תעד run_id, tool, duration, status ושינויים במצב. הסתר מידע רגיש. השתמש בתיעוד כדי לשחזר את סדר האירועים שהוביל לתקלה. הראה תוצר והסבר כיצד בדקת אותו.

**מה לצרף:** צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

### 2. DIAGNOSE

צור ריצה איטית שאינה מחזירה חריגה. בדוק אילו מדידות מאפשרות לאתר את העיכוב. תעד את האבחון ואת התיקון שבדקת.

**מה לצרף:** כתוב מה ציפית לקבל. צרף את התוצאה לפני התיקון, את הבדיקה שעזרה למצוא את התקלה ואת התוצאה לאחר התיקון.

### 3. TRANSFER

מצא את השלב האיטי בעזרת תיעוד הריצה (Trace) והראה את המדידה. הצג פתרון עצמאי וציין מקרה שהפתרון אינו מטפל בו.

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
- [[02_CURRICULUM/2.2.0/exercises/W11D54_TRACING|התרגול: תיעוד ריצות וניטור]] — ראיות מהתרגול
- [[02_CURRICULUM/2.2.0/lessons/W11D54_TRACING|תיעוד ריצות וניטור]] — הוכחה מעשית
- [[02_CURRICULUM/2.2.0/skills/EVALS|Evals]] — מיומנות שנבדקת
- [[02_CURRICULUM/2.2.0/skills/TESTING|Testing]] — מיומנות שנבדקת
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W11D54_TRACING|בדיקת הבנה: ריצה איטית לא החזירה חריגה. איזה תיעוד מסייע לאתר את העיכוב?]] — תרגול לפני הגשה
- [[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP|לפני שמגישים · שאלה קצרה לתרגול]] — הבחנה בין הגשה לשליטה
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W11D54_TRACING|תנאי בדיקה: הוכחה מעשית · תיעוד ריצות וניטור]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/Index|תרגילים, ראיות ותיק עבודות]] — מחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W11D54_TRACING|תבנית הגשה: הוכחה מעשית · תיעוד ריצות וניטור]] — תבנית הגשה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_BUILD|תבנית טקסט: תיעוד ריצות וניטור · BUILD]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_DIAGNOSE|תבנית טקסט: תיעוד ריצות וניטור · DIAGNOSE]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W11D54_TRACING_TRANSFER|תבנית טקסט: תיעוד ריצות וניטור · TRANSFER]] — סעיף במחוון
- [[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE|משוב מנומק על עבודה]] — ראיות והגשות
- [[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD|הורדת קובץ של הגשה]] — ראיות והגשות
