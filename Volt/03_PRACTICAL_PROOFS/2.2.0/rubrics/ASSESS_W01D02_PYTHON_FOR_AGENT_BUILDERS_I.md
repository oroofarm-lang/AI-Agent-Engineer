---
generated: true
schema_version: 1
kind: "proof"
entity_id: "ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I"
curriculum_version: "2.2.0"
assessment_id: "ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I"
assessment_version: "2.2.0"
lesson_id: "W01D02_PYTHON_FOR_AGENT_BUILDERS_I"
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-Voice-Audio]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[02_CURRICULUM/2.2.0/skills/PYTHON]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[03_PRACTICAL_PROOFS/2.2.0/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE]]","[[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD]]"]
---

# הוכחה מעשית · Python לבוני סוכנים · חלק א׳

צרף את העבודה שלך ודוגמאות שאפשר לבדוק. בכל סעיף כתוב הסבר וצרף את התוצאה המתאימה למשימה. ההגשה שומרת את העבודה לבדיקה; היא אינה מריצה קוד ואינה מחשבת ציון באופן אוטומטי.

## תנאי ההגשה

### 1. BUILD

כתוב פונקציה route(command, text) שבוחרת פעולה לפי אחת הפקודות research, summarize או extract. החזר מילון עם השדות action ו־result. התחל בפעולות מקומיות ללא מודל, וציין ליד הפלט שזו הדגמה בלבד. הראה תוצר והסבר כיצד בדקת אותו.

**מה לצרף:** צרף את קובץ הנתב, פקודת ההרצה שבה השתמשת, דוגמת קלט ואת הפלט שקיבלת. ציין שמדובר בתרגול מקומי שאינו שולח בקשות למודל.

### 2. DIAGNOSE

נסה שם פעולה לא מוכר, טקסט שמורכב מרווחים ומספר במקום טקסט. בדוק שהנתב דוחה כל אחד מהם לפני העיבוד. הסבר מה גרם לדחייה; אם מצאת תקלה בנתב, תעד את התיקון ובדוק אותו.

**מה לצרף:** לכל ניסיון כתוב מה הזנת, מה ציפית שיקרה ואיזו הודעת שגיאה הופיעה. אם שינית את הקוד בעקבות תקלה, צרף גם את התוצאה לאחר התיקון. אם הנתב פעל כמצופה, ציין זאת; אין צורך להמציא תקלה.

### 3. TRANSFER

הוסף count_words. ודא שהפקודות הקיימות עדיין מקבלות ומחזירות נתונים באותו מבנה. הצג פתרון עצמאי וציין מקרה שהפתרון אינו מטפל בו.

**מה לצרף:** צרף את הפעולה שהוספת ואת הבדיקות שלה. הראה גם ששלוש הבדיקות המקוריות עדיין עוברות, והסבר מה נספר ואיך הנתב מתנהג בקלט ריק.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — משוב על ראיות
- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — משוב על ראיות
- [[01_AGENTS/Agent-Business-Discovery|אפיון שירות ופרויקט עסקי]] — משוב על ראיות
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — משוב על ראיות
- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — משוב על ראיות
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — משוב על ראיות
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — משוב על ראיות
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — משוב על ראיות
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — משוב על ראיות
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — משוב על ראיות
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — משוב על ראיות
- [[01_AGENTS/Agent-Paid-Media-Measurement|פרסום ומדידה]] — משוב על ראיות
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — משוב על ראיות
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — משוב על ראיות
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — משוב על ראיות
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — משוב על ראיות
- [[01_AGENTS/Agent-Voice-Audio|קול, תמלול ושיחה]] — משוב על ראיות
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — משוב על ראיות
- [[02_CURRICULUM/2.2.0/exercises/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|התרגול: Python לבוני סוכנים · חלק א׳]] — ראיות מהתרגול
- [[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|Python לבוני סוכנים · חלק א׳]] — הוכחה מעשית
- [[02_CURRICULUM/2.2.0/skills/PYTHON|Python]] — מיומנות שנבדקת
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D02_PYTHON_FOR_AGENT_BUILDERS_I|בדיקת הבנה: הנתב החזיר status מסוג not_searched עבור הפעולה research. מה אפשר להסיק?]] — תרגול לפני הגשה
- [[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP|לפני שמגישים · שאלה קצרה לתרגול]] — הבחנה בין הגשה לשליטה
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I|תנאי בדיקה: הוכחה מעשית · Python לבוני סוכנים · חלק א׳]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/Index|תרגילים, ראיות ותיק עבודות]] — מחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I|תבנית הגשה: הוכחה מעשית · Python לבוני סוכנים · חלק א׳]] — תבנית הגשה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I_BUILD|תבנית טקסט: Python לבוני סוכנים · חלק א׳ · BUILD]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I_DIAGNOSE|תבנית טקסט: Python לבוני סוכנים · חלק א׳ · DIAGNOSE]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I_TRANSFER|תבנית טקסט: Python לבוני סוכנים · חלק א׳ · TRANSFER]] — סעיף במחוון
- [[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE|משוב מנומק על עבודה]] — ראיות והגשות
- [[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD|הורדת קובץ של הגשה]] — ראיות והגשות
