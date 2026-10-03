---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W12D58_AUTHENTICATION_AUTHORIZATION"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W12D58_AUTHENTICATION_AUTHORIZATION"
lesson_id: "W12D58_AUTHENTICATION_AUTHORIZATION"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Concepts"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[02_CURRICULUM/2.2.0/exercises/W12D58_AUTHENTICATION_AUTHORIZATION]]","[[02_CURRICULUM/2.2.0/lessons/W12D58_AUTHENTICATION_AUTHORIZATION]]","[[02_CURRICULUM/2.2.0/sources/OWASP_GENAI]]","[[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION]]"]
---

# בדיקת הבנה: משתמש נכנס לחשבון ושינה tenant_id בבקשה. מדוע אין בכך הרשאה לקרוא לקוח אחר?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

משתמש נכנס לחשבון ושינה tenant_id בבקשה. מדוע אין בכך הרשאה לקרוא לקוח אחר?

- A: כי השרת קובע את השיוך ובודק בעלות בכל קריאה וכתיבה
- B: כי כל משתמש מחובר יכול לקרוא את כל המסד
- C: כי מזהה שהגיע מהדפדפן אמין יותר מנתוני ההתחברות

## תשובה והסבר ללמידה

אפשרות: A.

אימות זהות אומר מי המשתמש; הרשאה קובעת מה מותר לו. השיעור דורש tenant_id מתוך שיוך שנבדק בשרת, ולא אמון במזהה שהדפדפן או המודל בחרו.

קטע מקור בשיעור: Concepts. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W12D58_AUTHENTICATION_AUTHORIZATION|התרגול: זהות, הרשאה ובידוד לקוחות]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W12D58_AUTHENTICATION_AUTHORIZATION|זהות, הרשאה ובידוד לקוחות]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/OWASP_GENAI|OWASP LLM risks]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY|Azure search security trimming]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION|הוכחה מעשית · זהות, הרשאה ובידוד לקוחות]] — תרגול לפני הגשה
