---
generated: true
schema_version: 1
kind: "proof"
entity_id: "ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING"
curriculum_version: "2.2.0"
assessment_id: "ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING"
assessment_version: "2.1.0"
lesson_id: "W03D14_RELIABILITY_FAILURE_HANDLING"
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-Voice-Audio]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W03D14_RELIABILITY_FAILURE_HANDLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D14_RELIABILITY_FAILURE_HANDLING]]","[[02_CURRICULUM/2.2.0/skills/STOPPING_CONDITIONS]]","[[02_CURRICULUM/2.2.0/skills/TOOL_CALLING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D14_RELIABILITY_FAILURE_HANDLING]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING]]","[[03_PRACTICAL_PROOFS/2.2.0/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING]]","[[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE]]","[[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD]]"]
---

# הוכחה מעשית · טיפול בכשלים וגבולות סוכן

צרף תוצר וראיות שאפשר לבדוק. בכל סעיף כתוב הסבר וצרף דוגמה ותוצאה. ההגשה שומרת את העבודה לצורך בדיקה. היא אינה מריצה את הקוד ואינה מחשבת ציון באופן אוטומטי.

## תנאי ההגשה

### 1. BUILD

הוסף הגבלות זמן (timeouts), ניסיונות חוזרים (retry) במספר מוגבל לכלי קריאה, ומספר צעדים מרבי. בסוף החזר אחד מהמצבים completed, failed או needs_review, עם הסיבה. הראה תוצר והסבר כיצד בדקת אותו.

**מה לצרף:** צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

### 2. DIAGNOSE

צור כלי איטי ולולאה שחוזרת ללא התקדמות. מדוד את זמן הריצה ובדוק שהמגבלות עוצרות אותה. תעד את האבחון ואת התיקון שבדקת.

**מה לצרף:** כתוב מה ציפית לקבל. צרף את התוצאה לפני התיקון, את הבדיקה שעזרה למצוא את התקלה ואת התוצאה לאחר התיקון.

### 3. TRANSFER

מנע ניסיון חוזר של פעולה ששינתה נתונים, עד שהמערכת ביררה מה כבר בוצע. הצג פתרון עצמאי וציין מקרה שהפתרון אינו מטפל בו.

**מה לצרף:** צרף תוצר חדש, החלטה מנומקת ומקרה שבו הפתרון אינו מספיק.

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
- [[02_CURRICULUM/2.2.0/exercises/W03D14_RELIABILITY_FAILURE_HANDLING|התרגול: טיפול בכשלים וגבולות סוכן]] — ראיות מהתרגול
- [[02_CURRICULUM/2.2.0/lessons/W03D14_RELIABILITY_FAILURE_HANDLING|טיפול בכשלים וגבולות סוכן]] — הוכחה מעשית
- [[02_CURRICULUM/2.2.0/skills/STOPPING_CONDITIONS|Stopping Conditions]] — מיומנות שנבדקת
- [[02_CURRICULUM/2.2.0/skills/TOOL_CALLING|Tool Calling]] — מיומנות שנבדקת
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D14_RELIABILITY_FAILURE_HANDLING|בדיקת הבנה: פעולת כתיבה הסתיימה בהמתנה ארוכה, ולא ברור אם כבר שינתה נתונים. מה נכון לעשות לפני ניסיון חוזר?]] — תרגול לפני הגשה
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING|תנאי בדיקה: הוכחה מעשית · טיפול בכשלים וגבולות סוכן]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/Index|תרגילים, ראיות ותיק עבודות]] — מחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING|תבנית הגשה: הוכחה מעשית · טיפול בכשלים וגבולות סוכן]] — תבנית הגשה
- [[04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE|משוב מנומק על עבודה]] — ראיות והגשות
- [[04_AUTOMATIONS_AND_APIS/endpoints/ARTIFACT_DOWNLOAD|הורדת קובץ של הגשה]] — ראיות והגשות
