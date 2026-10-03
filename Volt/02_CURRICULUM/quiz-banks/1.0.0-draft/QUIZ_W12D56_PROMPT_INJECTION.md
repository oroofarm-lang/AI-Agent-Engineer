---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W12D56_PROMPT_INJECTION"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W12D56_PROMPT_INJECTION"
lesson_id: "W12D56_PROMPT_INJECTION"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Concepts"
source_curriculum_version: "2.2.0"
active_curriculum_version: "2.2.0"
needs_version_review: false
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/exercises/W12D56_PROMPT_INJECTION]]","[[02_CURRICULUM/2.2.0/lessons/W12D56_PROMPT_INJECTION]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/OWASP_GENAI]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D56_PROMPT_INJECTION]]"]
---

# בדיקת הבנה: מסמך חיצוני מבקש לשלוח מידע ליעד שאינו מורשה. איזו הגנה נדרשת מעבר להנחיית בטיחות למודל?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

מסמך חיצוני מבקש לשלוח מידע ליעד שאינו מורשה. איזו הגנה נדרשת מעבר להנחיית בטיחות למודל?

- A: הוספת עוד משפט מנומס בהנחיה בלבד
- B: בדיקת הרשאה ופעולה בקוד לפני ביצוע
- C: אמון בבקשה מפני שהיא מופיעה במסמך מצורף

## תשובה והסבר ללמידה

אפשרות: B.

הפרדה בין הוראות למידע מסייעת אך אינה הגנה מלאה. השיעור דורש אכיפת הרשאות ופעולות בקוד גם כשהמודל קיבל הוראות בטיחות.

קטע מקור בשיעור: Concepts. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הסבר לשאלה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W12D56_PROMPT_INJECTION|התרגול: הזרקת הוראות זדוניות]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W12D56_PROMPT_INJECTION|הזרקת הוראות זדוניות]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/OWASP_GENAI|OWASP LLM risks]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D56_PROMPT_INJECTION|הוכחה מעשית · הזרקת הוראות זדוניות]] — תרגול לפני הגשה
