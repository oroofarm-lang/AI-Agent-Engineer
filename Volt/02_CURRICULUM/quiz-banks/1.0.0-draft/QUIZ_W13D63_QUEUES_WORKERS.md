---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W13D63_QUEUES_WORKERS"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W13D63_QUEUES_WORKERS"
lesson_id: "W13D63_QUEUES_WORKERS"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Concepts"
related: ["[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/exercises/W13D63_QUEUES_WORKERS]]","[[02_CURRICULUM/2.2.0/lessons/W13D63_QUEUES_WORKERS]]","[[02_CURRICULUM/2.2.0/sources/OTEL]]","[[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D63_QUEUES_WORKERS]]"]
---

# בדיקת הבנה: Worker נעצר אחרי שחלק מהפעולה בוצע, והתור מסר שוב אותה עבודה. למה חשוב מזהה הפעולה?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

Worker נעצר אחרי שחלק מהפעולה בוצע, והתור מסר שוב אותה עבודה. למה חשוב מזהה הפעולה?

- A: כדי לתת בכל ניסיון מזהה חדש ולהתעלם מהקודם
- B: כדי להציג את העבודה ככישלון גם אם חלקה הצליח
- C: כדי לזהות מה כבר בוצע ולהימנע מתוצאה עסקית נוספת

## תשובה והסבר ללמידה

אפשרות: C.

תור עשוי למסור עבודה שוב. השיעור דורש מזהה פעולה ותכנון המשך לאחר ביצוע חלקי, כדי שחידוש לא ייצור אותה תוצאה עסקית פעמיים.

קטע מקור בשיעור: Concepts. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — הסבר לשאלה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W13D63_QUEUES_WORKERS|התרגול: תורים ועובדים]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W13D63_QUEUES_WORKERS|תורים ועובדים]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/OTEL|OpenTelemetry signals]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS|Stripe webhooks]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D63_QUEUES_WORKERS|הוכחה מעשית · תורים ועובדים]] — תרגול לפני הגשה
