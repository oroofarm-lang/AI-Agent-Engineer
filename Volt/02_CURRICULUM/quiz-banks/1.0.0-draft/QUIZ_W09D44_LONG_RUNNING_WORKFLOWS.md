---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W09D44_LONG_RUNNING_WORKFLOWS"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W09D44_LONG_RUNNING_WORKFLOWS"
lesson_id: "W09D44_LONG_RUNNING_WORKFLOWS"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Build First"
source_curriculum_version: "2.2.0"
active_curriculum_version: "2.2.0"
needs_version_review: false
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/exercises/W09D44_LONG_RUNNING_WORKFLOWS]]","[[02_CURRICULUM/2.2.0/lessons/W09D44_LONG_RUNNING_WORKFLOWS]]","[[02_CURRICULUM/2.2.0/sources/LANGGRAPH_STATE]]","[[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D44_LONG_RUNNING_WORKFLOWS]]"]
---

# בדיקת הבנה: השירות החיצוני ביצע שינוי, אך התוכנית קרסה לפני רישום הצלחה. למה נדרש שלב reconcile?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

השירות החיצוני ביצע שינוי, אך התוכנית קרסה לפני רישום הצלחה. למה נדרש שלב reconcile?

- A: כדי למחוק את operation_id ולנסות כפעולה חדשה
- B: כדי לברר מה כבר בוצע לפני חידוש הפעולה
- C: כדי להניח שנקודת השמירה ביטלה את השינוי בשירות

## תשובה והסבר ללמידה

אפשרות: B.

נקודת שמירה מתעדת מצב פנימי, ולא מבטלת שינוי חיצוני. התרגיל שומר run_id ו־operation_id ומברר את מצב הפעולה כדי להימנע מתוצאה עסקית כפולה.

קטע מקור בשיעור: Build First. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W09D44_LONG_RUNNING_WORKFLOWS|התרגול: תהליכים ארוכים והתאוששות]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W09D44_LONG_RUNNING_WORKFLOWS|תהליכים ארוכים והתאוששות]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/LANGGRAPH_STATE|LangGraph persistence]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS|Stripe webhooks]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D44_LONG_RUNNING_WORKFLOWS|הוכחה מעשית · תהליכים ארוכים והתאוששות]] — תרגול לפני הגשה
