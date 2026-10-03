---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_DAT_01"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_DAT_01"
lesson_id: "DAT_01"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Deep Dive"
related: ["[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Model-Data]]","[[02_CURRICULUM/2.2.0/exercises/DAT_01]]","[[02_CURRICULUM/2.2.0/lessons/DAT_01]]","[[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_01]]"]
---

# בדיקת הבנה: שאילתת מכירות רצה בלי שגיאה, אך JOIN הכפיל שורות והגדיל את סכום ההכנסות. מה צריך לבדוק?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

שאילתת מכירות רצה בלי שגיאה, אך JOIN הכפיל שורות והגדיל את סכום ההכנסות. מה צריך לבדוק?

- A: את משמעות החיבור ולהשוות את הסכום לחישוב נפרד
- B: רק אם השרת החזיר קוד הצלחה
- C: אם המספר גדול מספיק כדי להיחשב תוצאה טובה

## תשובה והסבר ללמידה

אפשרות: A.

השיעור מתאר חיבור טבלאות שמכפיל שורות: השאילתה יכולה להצליח טכנית ועדיין להחזיר הכנסות שגויות. בדיקה מול חישוב נפרד מאפשרת לזהות את הפער ולהסביר את הכפילות.

קטע מקור בשיעור: Deep Dive. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — הסבר לשאלה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/DAT_01|התרגול: עוזר נתונים עסקיים]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/DAT_01|עוזר נתונים עסקיים]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS|PostgreSQL transactions]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE|Python SQLite module]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_01|הוכחה מעשית · עוזר נתונים עסקיים]] — תרגול לפני הגשה
