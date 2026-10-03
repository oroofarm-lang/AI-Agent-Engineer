---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W13D62_PRODUCTION_DATABASES"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W13D62_PRODUCTION_DATABASES"
lesson_id: "W13D62_PRODUCTION_DATABASES"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Build First"
related: ["[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/exercises/W13D62_PRODUCTION_DATABASES]]","[[02_CURRICULUM/2.2.0/lessons/W13D62_PRODUCTION_DATABASES]]","[[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D62_PRODUCTION_DATABASES]]"]
---

# בדיקת הבנה: היכן צריך לנסות תחילה Migration שמעביר customers ו־runs ל־PostgreSQL?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

היכן צריך לנסות תחילה Migration שמעביר customers ו־runs ל־PostgreSQL?

- A: על הנתונים היחידים הקיימים, בלי גיבוי
- B: על עותק של הנתונים, לפני שינוי סביבת העבודה
- C: בתשובת המודל בלבד, בלי להפעיל שינוי סכמה

## תשובה והסבר ללמידה

אפשרות: B.

השיעור דורש שינוי סכמה מתועד שנבדק תחילה על עותק. כך אפשר לבדוק כשל ושחזור בלי לאבד את נתוני המקור.

קטע מקור בשיעור: Build First. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — הסבר לשאלה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W13D62_PRODUCTION_DATABASES|התרגול: PostgreSQL ונתונים לפרודקשן]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W13D62_PRODUCTION_DATABASES|PostgreSQL ונתונים לפרודקשן]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS|PostgreSQL transactions]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D62_PRODUCTION_DATABASES|הוכחה מעשית · PostgreSQL ונתונים לפרודקשן]] — תרגול לפני הגשה
