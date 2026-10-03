---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W03D12_TOOL_CALLING"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W03D12_TOOL_CALLING"
lesson_id: "W03D12_TOOL_CALLING"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Build First"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[02_CURRICULUM/2.2.0/exercises/W03D12_TOOL_CALLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_TOOLS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D12_TOOL_CALLING]]"]
---

# בדיקת הבנה: המודל ביקש להפעיל כלי שאינו ברשימת הכלים המורשים. מה תפקיד הקוד?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

המודל ביקש להפעיל כלי שאינו ברשימת הכלים המורשים. מה תפקיד הקוד?

- A: להפעיל אותו אם שם הכלי נשמע סביר
- B: להוסיף אותו לרשימה על סמך בקשת המודל
- C: לדחות את הבקשה ולא להפעיל את הכלי

## תשובה והסבר ללמידה

אפשרות: C.

בקשת מודל אינה הרשאה. הקוד בודק את שם הכלי ואת הארגומנטים מול רשימה וסכמה; הנחיה בטקסט אינה מחליפה את הבדיקות האלה.

קטע מקור בשיעור: Build First. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W03D12_TOOL_CALLING|התרגול: קריאות לכלים]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING|קריאות לכלים]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/OPENAI_TOOLS|OpenAI function calling]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D12_TOOL_CALLING|הוכחה מעשית · קריאות לכלים]] — תרגול לפני הגשה
