---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W05D21_DATABASES"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W05D21_DATABASES"
lesson_id: "W05D21_DATABASES"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Concepts"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[02_CURRICULUM/2.2.0/exercises/W05D21_DATABASES]]","[[02_CURRICULUM/2.2.0/lessons/W05D21_DATABASES]]","[[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D21_DATABASES]]"]
---

# בדיקת הבנה: הוספת לקוח הצליחה, אך הוספת הפנייה באותה עסקה נכשלה. מה מטרת ROLLBACK בתרגיל?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

הוספת לקוח הצליחה, אך הוספת הפנייה באותה עסקה נכשלה. מה מטרת ROLLBACK בתרגיל?

- A: להשאיר את הלקוח החדש בלי קשר לפנייה
- B: להחזיר גם דוא״ל שכבר נשלח משירות חיצוני
- C: לבטל את השינויים שטרם אושרו באותה עסקה

## תשובה והסבר ללמידה

אפשרות: C.

עסקה מקבצת שינויים כדי שיצליחו יחד או יבוטלו יחד. ROLLBACK חל על השינויים שטרם אושרו במסד; הוא אינו מבטל פעולה שכבר התבצעה בשירות חיצוני.

קטע מקור בשיעור: Concepts. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W05D21_DATABASES|התרגול: מסדי נתונים ו־SQL]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W05D21_DATABASES|מסדי נתונים ו־SQL]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS|PostgreSQL transactions]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE|Python SQLite module]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D21_DATABASES|הוכחה מעשית · מסדי נתונים ו־SQL]] — תרגול לפני הגשה
