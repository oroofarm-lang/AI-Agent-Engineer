---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W08D36_RESPONSES_API"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W08D36_RESPONSES_API"
lesson_id: "W08D36_RESPONSES_API"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Concepts"
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/exercises/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_QUICKSTART]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_TOOLS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API]]"]
---

# בדיקת הבנה: מדוע מחזירים תוצאת כלי עם ה־call_id המתאים?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

מדוע מחזירים תוצאת כלי עם ה־call_id המתאים?

- A: כדי להפוך כל שגיאת כלי לתשובה סופית
- B: כדי להימנע משמירת פריטי הפלט שנדרשים להמשך
- C: כדי לשייך אותה לבקשת הכלי המסוימת ולא לערבב בין קריאות

## תשובה והסבר ללמידה

אפשרות: C.

המודל יכול להחזיר כמה בקשות לכלים. שיוך לפי מזהי הקריאות שומר על התאמה בין כל בקשה לתוצאתה; שם הכלי לבדו אינו מספיק.

קטע מקור בשיעור: Concepts. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W08D36_RESPONSES_API|התרגול: אינטגרציה ישירה עם Responses API]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API|אינטגרציה ישירה עם Responses API]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/OPENAI_QUICKSTART|OpenAI quickstart]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/OPENAI_TOOLS|OpenAI function calling]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API|הוכחה מעשית · אינטגרציה ישירה עם Responses API]] — תרגול לפני הגשה
