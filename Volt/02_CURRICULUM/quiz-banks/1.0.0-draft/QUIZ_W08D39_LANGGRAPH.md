---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W08D39_LANGGRAPH"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W08D39_LANGGRAPH"
lesson_id: "W08D39_LANGGRAPH"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Concepts"
source_curriculum_version: "2.2.0"
active_curriculum_version: "2.2.0"
needs_version_review: false
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/exercises/W08D39_LANGGRAPH]]","[[02_CURRICULUM/2.2.0/lessons/W08D39_LANGGRAPH]]","[[02_CURRICULUM/2.2.0/sources/LANGGRAPH_STATE]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D39_LANGGRAPH]]"]
---

# בדיקת הבנה: מה מאפשר Interrupt בתהליך prepare → approve → execute?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

מה מאפשר Interrupt בתהליך prepare → approve → execute?

- A: להבטיח שכל פעולה חיצונית מתבטלת אוטומטית
- B: לדלג על שמירת הנתונים שהאדם אישר
- C: להמתין לקלט, למשל אישור, לפני המשך התהליך

## תשובה והסבר ללמידה

אפשרות: C.

השיעור מתאר Interrupt כעצירה לקבלת קלט, ו־Checkpoint כשמירת מצב. גם לאחר חידוש התהליך צריך למנוע ביצוע כפול ולשמור את הנתונים שאושרו.

קטע מקור בשיעור: Concepts. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W08D39_LANGGRAPH|התרגול: תהליכי גרף עם LangGraph]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W08D39_LANGGRAPH|תהליכי גרף עם LangGraph]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/LANGGRAPH_STATE|LangGraph persistence]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D39_LANGGRAPH|הוכחה מעשית · תהליכי גרף עם LangGraph]] — תרגול לפני הגשה
