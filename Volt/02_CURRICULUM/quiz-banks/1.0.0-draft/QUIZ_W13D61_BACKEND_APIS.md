---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W13D61_BACKEND_APIS"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W13D61_BACKEND_APIS"
lesson_id: "W13D61_BACKEND_APIS"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Build First"
related: ["[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/exercises/W13D61_BACKEND_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W13D61_BACKEND_APIS]]","[[02_CURRICULUM/2.2.0/sources/FASTAPI]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D61_BACKEND_APIS]]"]
---

# בדיקת הבנה: מה צריך GET /runs/{id} לבדוק לפני החזרת פרטי ריצה?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

מה צריך GET /runs/{id} לבדוק לפני החזרת פרטי ריצה?

- A: שהמשתמש המאומת מורשה לראות את הריצה המבוקשת
- B: רק שהמזהה מופיע בכתובת תקינה
- C: רק שהתוכנית יודעת לקרוא JSON

## תשובה והסבר ללמידה

אפשרות: A.

התרגיל דורש אימות קלט, זהות והרשאה לריצה המסוימת. מזהה תקין מבחינת מבנה אינו מעניק בעלות על ריצה של אדם אחר.

קטע מקור בשיעור: Build First. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — הסבר לשאלה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W13D61_BACKEND_APIS|התרגול: ממשקי API בצד השרת]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W13D61_BACKEND_APIS|ממשקי API בצד השרת]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/FASTAPI|FastAPI tutorial]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D61_BACKEND_APIS|הוכחה מעשית · ממשקי API בצד השרת]] — תרגול לפני הגשה
