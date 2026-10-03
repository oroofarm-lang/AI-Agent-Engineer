---
generated: true
schema_version: 1
kind: "evaluation-key"
entity_id: "KEY_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING"
curriculum_version: "2.2.0"
assessment_id: "ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING"
assessment_version: "2.1.0"
lesson_id: "W06D28_HYBRID_RETRIEVAL_RERANKING"
related: ["[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_TRANSFER]]"]
---

# תנאי בדיקה: הוכחה מעשית · שליפה משולבת ודירוג מחדש

אלה תנאי בדיקה המבוססים על המחוון שפורסם. הם אינם מפתח תשובות מלא, ציונים מחושבים או תוצאות הרצה. במשימות שיש להן כמה פתרונות יש לבחון את הנימוק והראיות ביחס לתנאים.

## 1. BUILD

- [ ] העבודה מתייחסת לדרישה: בנה חיפוש שמסנן לפי tenant_id ומחזיר מספר תוצאות שהוגדר ב־top_k. הוסף דירוג מחדש והצג את הקטעים שנבחרו. בדוק גם התאמה לשאלה וגם הרשאה לקרוא כל קטע. הראה תוצר והסבר כיצד בדקת אותו.
- [ ] צורפו ראיות שאפשר לבדוק: צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.
- [ ] הוסבר כיצד הראיות תומכות בטענה ומה עדיין לא נבדק.

מיומנות קשורה: EMBEDDINGS

## 2. DIAGNOSE

- [ ] העבודה מתייחסת לדרישה: הכנס קטע מתאים לשאלה ששייך ללקוח אחר. בדוק שהוא אינו מועבר למודל. תעד את האבחון ואת התיקון שבדקת.
- [ ] צורפו ראיות שאפשר לבדוק: כתוב מה ציפית לקבל. צרף את התוצאה לפני התיקון, את הבדיקה שעזרה למצוא את התקלה ואת התוצאה לאחר התיקון.
- [ ] הוסבר כיצד הראיות תומכות בטענה ומה עדיין לא נבדק.

מיומנות קשורה: RAG

## 3. TRANSFER

- [ ] העבודה מתייחסת לדרישה: בדוק על אותן שאלות גם התאמה של התשובות וגם הרשאה לקרוא את המקורות. הצג פתרון עצמאי וציין מקרה שהפתרון אינו מטפל בו.
- [ ] צורפו ראיות שאפשר לבדוק: צרף תוצר חדש, החלטה מנומקת ומקרה שבו הפתרון אינו מספיק.
- [ ] הוסבר כיצד הראיות תומכות בטענה ומה עדיין לא נבדק.

מיומנות קשורה: EMBEDDINGS

## קשרים במפת הידע

- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING|הוכחה מעשית · שליפה משולבת ודירוג מחדש]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_BUILD|תבנית טקסט: שליפה משולבת ודירוג מחדש · BUILD]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_DIAGNOSE|תבנית טקסט: שליפה משולבת ודירוג מחדש · DIAGNOSE]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_TRANSFER|תבנית טקסט: שליפה משולבת ודירוג מחדש · TRANSFER]] — תנאי בדיקה
