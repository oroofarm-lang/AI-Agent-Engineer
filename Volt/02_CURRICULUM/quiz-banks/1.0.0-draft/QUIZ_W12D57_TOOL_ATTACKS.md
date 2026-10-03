---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W12D57_TOOL_ATTACKS"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W12D57_TOOL_ATTACKS"
lesson_id: "W12D57_TOOL_ATTACKS"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Concepts"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/exercises/W12D57_TOOL_ATTACKS]]","[[02_CURRICULUM/2.2.0/lessons/W12D57_TOOL_ATTACKS]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/OWASP_GENAI]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D57_TOOL_ATTACKS]]"]
---

# בדיקת הבנה: בקשת כלי כוללת JSON תקין עם נתיב מחוץ לתיקיית העבודה. מה צריך לבדוק?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

בקשת כלי כוללת JSON תקין עם נתיב מחוץ לתיקיית העבודה. מה צריך לבדוק?

- A: רק שה־JSON ניתן לפענוח
- B: רק ששם הכלי מוכר למודל
- C: את ערכי הקלט, יעד הגישה והרשאת המשתמש

## תשובה והסבר ללמידה

אפשרות: C.

מבנה JSON תקין אינו הופך ארגומנט לבטוח. השיעור דורש בדיקת ערכים, יעדים והרשאות, וחסימת גישה שאינה ברשימה המורשית.

קטע מקור בשיעור: Concepts. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הסבר לשאלה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W12D57_TOOL_ATTACKS|התרגול: תקיפות כלים וחשיפת מידע]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W12D57_TOOL_ATTACKS|תקיפות כלים וחשיפת מידע]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/OWASP_GENAI|OWASP LLM risks]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D57_TOOL_ATTACKS|הוכחה מעשית · תקיפות כלים וחשיפת מידע]] — תרגול לפני הגשה
