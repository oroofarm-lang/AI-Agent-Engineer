---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W07D31_PRODUCTION_APIS"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W07D31_PRODUCTION_APIS"
lesson_id: "W07D31_PRODUCTION_APIS"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Build First"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[02_CURRICULUM/2.2.0/exercises/W07D31_PRODUCTION_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W07D31_PRODUCTION_APIS]]","[[02_CURRICULUM/2.2.0/sources/HTTP_OVERVIEW]]","[[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D31_PRODUCTION_APIS]]"]
---

# בדיקת הבנה: Webhook התקבל והשרת אישר קבלה, אבל העבודה בתור טרם הסתיימה. איזה מצב נכון להציג?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

Webhook התקבל והשרת אישר קבלה, אבל העבודה בתור טרם הסתיימה. איזה מצב נכון להציג?

- A: שהאירוע התקבל, בלי להציגו כמשימה שהושלמה
- B: שהמשימה הושלמה מפני שהוחזרה תגובת קבלה
- C: שהאירוע נכשל מפני שלא בוצע כולו מיד

## תשובה והסבר ללמידה

אפשרות: A.

התרגיל מפריד בין received, processing ו־completed. אישור קבלת אירוע אינו בהכרח אישור שהעבודה העסקית הסתיימה.

קטע מקור בשיעור: Build First. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W07D31_PRODUCTION_APIS|התרגול: ממשקי API עסקיים]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W07D31_PRODUCTION_APIS|ממשקי API עסקיים]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/HTTP_OVERVIEW|HTTP overview]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS|Stripe webhooks]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D31_PRODUCTION_APIS|הוכחה מעשית · ממשקי API עסקיים]] — תרגול לפני הגשה
