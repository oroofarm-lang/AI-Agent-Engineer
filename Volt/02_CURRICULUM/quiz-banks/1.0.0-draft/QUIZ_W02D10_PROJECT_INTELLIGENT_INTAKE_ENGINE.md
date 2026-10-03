---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE"
lesson_id: "W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Build First"
source_curriculum_version: "2.2.0"
active_curriculum_version: "2.2.0"
needs_version_review: false
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[02_CURRICULUM/2.2.0/exercises/W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE]]","[[02_CURRICULUM/2.2.0/lessons/W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_AGENTS]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_TUTORIAL]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE]]"]
---

# בדיקת הבנה: מדוע מנוע הקליטה שומר פנייה מטקסט, מטופס ומקובץ במבנה משותף?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

מדוע מנוע הקליטה שומר פנייה מטקסט, מטופס ומקובץ במבנה משותף?

- A: כדי לבדוק ולשמור את הפרטים באופן אחיד, תוך תיעוד ערוץ המקור
- B: כדי להסתיר מאיזה ערוץ הגיעה הפנייה
- C: כדי לפטור פניות מקבצים מבדיקת כללי העסק

## תשובה והסבר ללמידה

אפשרות: A.

המבנה המשותף כולל בין היתר channel, extracted_fields ו־missing_fields. האחידות אינה מוחקת את המקור ואינה מחליפה אימות מבנה וכללים עסקיים.

קטע מקור בשיעור: Build First. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE|התרגול: פרויקט: מנוע קליטת פניות]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE|פרויקט: מנוע קליטת פניות]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_AGENTS|Building effective agents]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/PYTHON_TUTORIAL|Python tutorial]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE|הוכחה מעשית · פרויקט: מנוע קליטת פניות]] — תרגול לפני הגשה
