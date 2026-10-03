---
generated: true
schema_version: 1
kind: "proof"
entity_id: "ASSESS_W13D61_BACKEND_APIS"
curriculum_version: "2.2.0"
assessment_id: "ASSESS_W13D61_BACKEND_APIS"
assessment_version: "2.1.0"
lesson_id: "W13D61_BACKEND_APIS"
related: ["[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W13D61_BACKEND_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W13D61_BACKEND_APIS]]","[[02_CURRICULUM/2.2.0/skills/BACKEND]]","[[02_CURRICULUM/2.2.0/skills/QUEUES]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D61_BACKEND_APIS]]","[[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W13D61_BACKEND_APIS]]","[[03_PRACTICAL_PROOFS/2.2.0/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W13D61_BACKEND_APIS]]","[[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE]]","[[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD]]"]
---

# הוכחה מעשית · ממשקי API בצד השרת

צרף תוצר וראיות שאפשר לבדוק. בכל סעיף כתוב הסבר וצרף דוגמה ותוצאה. ההגשה שומרת את העבודה לצורך בדיקה. היא אינה מריצה את הקוד ואינה מחשבת ציון באופן אוטומטי.

## תנאי ההגשה

### 1. BUILD

בנה POST /runs ו־GET /runs/{id} ב־FastAPI. בדוק את הקלט, את זהות המשתמש ואת הרשאתו לראות את הריצה המבוקשת. הראה תוצר והסבר כיצד בדקת אותו.

**מה לצרף:** צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

### 2. DIAGNOSE

שלח JSON פגום, בקשה עם שדה חסר ובקשה לריצה של משתמש אחר. בדוק את התגובות. תעד את האבחון ואת התיקון שבדקת.

**מה לצרף:** כתוב מה ציפית לקבל. צרף את התוצאה לפני התיקון, את הבדיקה שעזרה למצוא את התקלה ואת התוצאה לאחר התיקון.

### 3. TRANSFER

הוסף בדיקות של קלט ופלט עם קודי התשובה שצריכים להתקבל. הצג פתרון עצמאי וציין מקרה שהפתרון אינו מטפל בו.

**מה לצרף:** צרף תוצר חדש, החלטה מנומקת ומקרה שבו הפתרון אינו מספיק.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — משוב על ראיות
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — משוב על ראיות
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — משוב על ראיות
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — משוב על ראיות
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — משוב על ראיות
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — משוב על ראיות
- [[02_CURRICULUM/2.2.0/exercises/W13D61_BACKEND_APIS|התרגול: ממשקי API בצד השרת]] — ראיות מהתרגול
- [[02_CURRICULUM/2.2.0/lessons/W13D61_BACKEND_APIS|ממשקי API בצד השרת]] — הוכחה מעשית
- [[02_CURRICULUM/2.2.0/skills/BACKEND|Backend]] — מיומנות שנבדקת
- [[02_CURRICULUM/2.2.0/skills/QUEUES|Queues]] — מיומנות שנבדקת
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W13D61_BACKEND_APIS|בדיקת הבנה: מה צריך GET /runs/{id} לבדוק לפני החזרת פרטי ריצה?]] — תרגול לפני הגשה
- [[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP|לפני שמגישים · שאלה קצרה לתרגול]] — הבחנה בין הגשה לשליטה
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W13D61_BACKEND_APIS|תנאי בדיקה: הוכחה מעשית · ממשקי API בצד השרת]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/Index|תרגילים, ראיות ותיק עבודות]] — מחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W13D61_BACKEND_APIS|תבנית הגשה: הוכחה מעשית · ממשקי API בצד השרת]] — תבנית הגשה
- [[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE|משוב מנומק על עבודה]] — ראיות והגשות
- [[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD|הורדת קובץ של הגשה]] — ראיות והגשות
