---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_DAT_01_DIAGNOSE"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_DAT_01_DIAGNOSE"
template_version: "1.0.0"
lesson_id: "DAT_01"
assessment_id: "ASSESS_DAT_01"
criterion_id: "DIAGNOSE"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "definitions-formats-owned-drafts-no-editor"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/DAT_01]]","[[02_CURRICULUM/2.2.0/lessons/DAT_01]]","[[02_CURRICULUM/2.2.0/skills/EVALS]]","[[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_DAT_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_01]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_DAT_01]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טבלה: עוזר נתונים עסקיים · DIAGNOSE

## המשימה

חבר טבלאות (JOIN) כך ששורות מוכפלות וההכנסות נראות גבוהות מדי. בדוק את התוצאה. תעד את האבחון ואת התיקון שבדקת.

## מה לצרף

כתוב מה ציפית לקבל. צרף את התוצאה לפני התיקון, את הבדיקה שעזרה למצוא את התקלה ואת התוצאה לאחר התיקון.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- הקלט
- תנאי ה־JOIN
- מספר השורות הצפוי
- מספר השורות בפועל
- הכנסות לפני התיקון
- הכנסות אחרי התיקון
- בדיקת התיקון

מספר השורות בתבנית: 3. מספר השורות שיש למלא במלואן: 1.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "הקלט"
    },
    {
      "id": "COLUMN_2",
      "label": "תנאי ה־JOIN"
    },
    {
      "id": "COLUMN_3",
      "label": "מספר השורות הצפוי"
    },
    {
      "id": "COLUMN_4",
      "label": "מספר השורות בפועל"
    },
    {
      "id": "COLUMN_5",
      "label": "הכנסות לפני התיקון"
    },
    {
      "id": "COLUMN_6",
      "label": "הכנסות אחרי התיקון"
    },
    {
      "id": "COLUMN_7",
      "label": "בדיקת התיקון"
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
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Paid-Media-Measurement|פרסום ומדידה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/DAT_01|התרגול: עוזר נתונים עסקיים]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/DAT_01|עוזר נתונים עסקיים]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/EVALS|Evals]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS|PostgreSQL transactions]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE|Python SQLite module]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_DAT_01|תנאי בדיקה: הוכחה מעשית · עוזר נתונים עסקיים]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_01|הוכחה מעשית · עוזר נתונים עסקיים]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_DAT_01|תבנית הגשה: הוכחה מעשית · עוזר נתונים עסקיים]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
