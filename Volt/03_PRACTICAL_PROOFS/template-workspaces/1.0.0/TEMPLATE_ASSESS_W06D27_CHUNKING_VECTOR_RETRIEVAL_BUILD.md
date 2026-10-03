---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_BUILD"
template_version: "1.0.0"
lesson_id: "W06D27_CHUNKING_VECTOR_RETRIEVAL"
assessment_id: "ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "definitions-formats-owned-drafts-no-editor"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[02_CURRICULUM/2.2.0/lessons/W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[02_CURRICULUM/2.2.0/skills/EMBEDDINGS]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טבלה: קליטת מסמכים וחלוקה לקטעים · BUILD

## המשימה

קלוט מסמך טקסט, PDF וטבלה. לכל קטע שמור document_id, version, page ו־chunk_id. השווה שתי דרכים לחלוקת המסמכים ובדוק שאפשר לחזור למקור של כל קטע. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- document_id
- version
- page
- chunk_id
- שיטת החלוקה
- הקטע שחולץ
- המיקום במקור

מספר השורות בתבנית: 3. מספר השורות שיש למלא במלואן: 1.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "document_id"
    },
    {
      "id": "COLUMN_2",
      "label": "version"
    },
    {
      "id": "COLUMN_3",
      "label": "page"
    },
    {
      "id": "COLUMN_4",
      "label": "chunk_id"
    },
    {
      "id": "COLUMN_5",
      "label": "שיטת החלוקה"
    },
    {
      "id": "COLUMN_6",
      "label": "הקטע שחולץ"
    },
    {
      "id": "COLUMN_7",
      "label": "המיקום במקור"
    }
  ],
  "rows": [
    [
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  ]
}
```

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/templates/releases/1.0.0.json)

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. שירות שמירת הטיוטות הפרטיות מקושר בנפרד; עורך השיעור עדיין לא חובר אליו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W06D27_CHUNKING_VECTOR_RETRIEVAL|התרגול: קליטת מסמכים וחלוקה לקטעים]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W06D27_CHUNKING_VECTOR_RETRIEVAL|קליטת מסמכים וחלוקה לקטעים]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/EMBEDDINGS|Embeddings]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/SEARCH_SECURITY|Azure search security trimming]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL|תנאי בדיקה: הוכחה מעשית · קליטת מסמכים וחלוקה לקטעים]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL|הוכחה מעשית · קליטת מסמכים וחלוקה לקטעים]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL|תבנית הגשה: הוכחה מעשית · קליטת מסמכים וחלוקה לקטעים]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
