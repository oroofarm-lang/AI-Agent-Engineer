---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W05D22_STATE"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W05D22_STATE"
lesson_id: "W05D22_STATE"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Build First"
source_curriculum_version: "2.2.0"
active_curriculum_version: "2.2.0"
needs_version_review: false
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[02_CURRICULUM/2.2.0/exercises/W05D22_STATE]]","[[02_CURRICULUM/2.2.0/lessons/W05D22_STATE]]","[[02_CURRICULUM/2.2.0/sources/LANGGRAPH_STATE]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D22_STATE]]"]
---

# בדיקת הבנה: מה צריך לשמור כדי להמשיך תהליך אחרי סגירת התוכנית?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

מה צריך לשמור כדי להמשיך תהליך אחרי סגירת התוכנית?

- A: מזהה ריצה, מצב ושלב שהושלם באחסון שנשמר גם לאחר סגירת התוכנית
- B: רק את הטקסט שהופיע לאחרונה במסך
- C: רק משתנה מקומי שנמצא בזיכרון התהליך

## תשובה והסבר ללמידה

אפשרות: A.

מצב ששמור רק בזיכרון נעלם בסגירה. התרגיל דורש run_id, status ו־last_completed_step כדי לטעון את העבודה ולהמשיך מהשלב המתאים.

קטע מקור בשיעור: Build First. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W05D22_STATE|התרגול: מצב שיחה ומצב תהליך]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W05D22_STATE|מצב שיחה ומצב תהליך]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/LANGGRAPH_STATE|LangGraph persistence]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE|Python SQLite module]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D22_STATE|הוכחה מעשית · מצב שיחה ומצב תהליך]] — תרגול לפני הגשה
