---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W05D25_PROJECT_PERSONAL_MEMORY_AGENT"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W05D25_PROJECT_PERSONAL_MEMORY_AGENT"
lesson_id: "W05D25_PROJECT_PERSONAL_MEMORY_AGENT"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Concepts"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[02_CURRICULUM/2.2.0/exercises/W05D25_PROJECT_PERSONAL_MEMORY_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W05D25_PROJECT_PERSONAL_MEMORY_AGENT]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT]]"]
---

# בדיקת הבנה: משתמש ב׳ מבקש לקרוא זיכרון השייך למשתמש א׳. מה על פעולת retrieve לבדוק?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

משתמש ב׳ מבקש לקרוא זיכרון השייך למשתמש א׳. מה על פעולת retrieve לבדוק?

- A: הרשאה לקרוא את הזיכרון בהקשר המשתמש המאומת
- B: רק אם הזיכרון מכיל מילים שמתאימות לשאלה
- C: רק אם המשתמש יודע לנחש את מזהה הרשומה

## תשובה והסבר ללמידה

אפשרות: A.

כל פעולת זיכרון עוברת דרך פונקציה שבודקת הרשאות. שמירת מידע של משתמש אחד אינה מעניקה למשתמש אחר גישה אליו.

קטע מקור בשיעור: Concepts. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הסבר לשאלה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — הסבר לשאלה
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W05D25_PROJECT_PERSONAL_MEMORY_AGENT|התרגול: פרויקט: סוכן זיכרון אישי]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W05D25_PROJECT_PERSONAL_MEMORY_AGENT|פרויקט: סוכן זיכרון אישי]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY|Azure search security trimming]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT|הוכחה מעשית · פרויקט: סוכן זיכרון אישי]] — תרגול לפני הגשה
