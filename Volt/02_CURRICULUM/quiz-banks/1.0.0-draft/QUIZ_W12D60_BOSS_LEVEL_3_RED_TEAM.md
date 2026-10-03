---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W12D60_BOSS_LEVEL_3_RED_TEAM"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W12D60_BOSS_LEVEL_3_RED_TEAM"
lesson_id: "W12D60_BOSS_LEVEL_3_RED_TEAM"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Failure Lab"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/exercises/W12D60_BOSS_LEVEL_3_RED_TEAM]]","[[02_CURRICULUM/2.2.0/lessons/W12D60_BOSS_LEVEL_3_RED_TEAM]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/OWASP_GENAI]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM]]"]
---

# בדיקת הבנה: תוקנה תקיפה אחת במערכת. איזו בדיקה נוספת דורש המבחן המסכם?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

תוקנה תקיפה אחת במערכת. איזו בדיקה נוספת דורש המבחן המסכם?

- A: רק הדגמה שההודעה הזדונית כבר אינה מופיעה
- B: הכרזה שהמערכת חסינה מפני כל תקיפה עתידית
- C: בדיקת רגרסיה לתקיפה ובדיקה שהשימוש הרגיל עדיין פועל

## תשובה והסבר ללמידה

אפשרות: C.

לכל תקלה מתוקנת מוסיפים בדיקת רגרסיה. מעבדת הכשל דורשת גם לבדוק שהתיקון לא פגע בשימוש רגיל; בדיקות נקודתיות אינן הבטחת חסינות.

קטע מקור בשיעור: Failure Lab. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הסבר לשאלה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — הסבר לשאלה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — הסבר לשאלה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W12D60_BOSS_LEVEL_3_RED_TEAM|התרגול: מבחן מסכם: בדיקת תקיפה ותיקון]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W12D60_BOSS_LEVEL_3_RED_TEAM|מבחן מסכם: בדיקת תקיפה ותיקון]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/OWASP_GENAI|OWASP LLM risks]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM|הוכחה מעשית · מבחן מסכם: בדיקת תקיפה ותיקון]] — תרגול לפני הגשה
