---
generated: true
schema_version: 1
kind: "quiz"
entity_id: "QUIZ_W06D27_CHUNKING_VECTOR_RETRIEVAL"
curriculum_version: "2.2.0"
quiz_id: "QUIZ_W06D27_CHUNKING_VECTOR_RETRIEVAL"
lesson_id: "W06D27_CHUNKING_VECTOR_RETRIEVAL"
quiz_version: "1.0.0"
review_status: "requires-human-review"
source_section: "Build First"
source_curriculum_version: "2.2.0"
active_curriculum_version: "2.2.0"
needs_version_review: false
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[02_CURRICULUM/2.2.0/exercises/W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[02_CURRICULUM/2.2.0/lessons/W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL]]"]
---

# בדיקת הבנה: מדוע שומרים לכל קטע document_id, version, page ו־chunk_id?

**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**

מדוע שומרים לכל קטע document_id, version, page ו־chunk_id?

- A: כדי להימנע מבדיקה שחילוץ הטקסט תקין
- B: כדי להוכיח מראש שכל תשובה המבוססת על הקטע נכונה
- C: כדי לחזור למסמך ולמיקום שמהם הגיע הקטע ולנהל עדכונים

## תשובה והסבר ללמידה

אפשרות: C.

חלוקה לקטעים צריכה לשמור קשר למקור ולמיקום. השדות מסייעים לציטוט ולעדכון, אבל אינם פוטרים מבדיקת החילוץ או התשובה.

קטע מקור בשיעור: Build First. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — הסבר לשאלה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — הסבר לשאלה
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — הסבר לשאלה
- [[02_CURRICULUM/2.2.0/exercises/W06D27_CHUNKING_VECTOR_RETRIEVAL|התרגול: קליטת מסמכים וחלוקה לקטעים]] — חיזוק התרגול
- [[02_CURRICULUM/2.2.0/lessons/W06D27_CHUNKING_VECTOR_RETRIEVAL|קליטת מסמכים וחלוקה לקטעים]] — בדיקת הבנה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור השאלה
- [[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY|Azure search security trimming]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — שאלה לביקורת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL|הוכחה מעשית · קליטת מסמכים וחלוקה לקטעים]] — תרגול לפני הגשה
