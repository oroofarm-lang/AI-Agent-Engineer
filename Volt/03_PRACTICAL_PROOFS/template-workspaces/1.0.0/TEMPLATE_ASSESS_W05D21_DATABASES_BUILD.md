---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W05D21_DATABASES_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W05D21_DATABASES_BUILD"
template_version: "1.0.0"
lesson_id: "W05D21_DATABASES"
assessment_id: "ASSESS_W05D21_DATABASES"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "editors-autosave-frozen-template-submission"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W05D21_DATABASES]]","[[02_CURRICULUM/2.2.0/lessons/W05D21_DATABASES]]","[[02_CURRICULUM/2.2.0/skills/DATABASE]]","[[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W05D21_DATABASES]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D21_DATABASES]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W05D21_DATABASES]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טבלה: מסדי נתונים ו־SQL · BUILD

## המשימה

צור ב־SQLite את הטבלאות customers, requests ו־events. הוסף לקוח ופנייה באותה עסקה. בדוק ביטול עסקה (rollback) כשהכתיבה נכשלת, כדי שלא יישאר עדכון חלקי. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- הטבלה
- המפתח
- הקשרים
- בדיקת העסקה במסד הנתונים (Transaction)
- התוצאה בפועל

מספר השורות בתבנית: 3. מספר השורות שיש למלא במלואן: 1.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "הטבלה"
    },
    {
      "id": "COLUMN_2",
      "label": "המפתח"
    },
    {
      "id": "COLUMN_3",
      "label": "הקשרים"
    },
    {
      "id": "COLUMN_4",
      "label": "בדיקת העסקה במסד הנתונים (Transaction)"
    },
    {
      "id": "COLUMN_5",
      "label": "התוצאה בפועל"
    }
  ],
  "rows": [
    [
      "customers",
      "",
      "",
      "",
      ""
    ],
    [
      "requests",
      "",
      "",
      "",
      ""
    ],
    [
      "events",
      "",
      "",
      "",
      ""
    ]
  ]
}
```

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/templates/releases/1.0.0.json)

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. עורך השיעור מחובר לשירות שמירת הטיוטות הפרטיות. בהגשה מתוך התבנית מצורף לעבודה הפרטית עותק קבוע של הטיוטה השמורה, כולל ההגדרה וגרסאות העריכה והקורס; אין לייצא לכאן תוכן טיוטות או עבודות אישיות.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W05D21_DATABASES|התרגול: מסדי נתונים ו־SQL]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W05D21_DATABASES|מסדי נתונים ו־SQL]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/DATABASE|Database]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/POSTGRES_TRANSACTIONS|PostgreSQL transactions]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/PYTHON_SQLITE|Python SQLite module]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W05D21_DATABASES|תנאי בדיקה: הוכחה מעשית · מסדי נתונים ו־SQL]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D21_DATABASES|הוכחה מעשית · מסדי נתונים ו־SQL]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W05D21_DATABASES|תבנית הגשה: הוכחה מעשית · מסדי נתונים ו־SQL]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT|שאלות ההוכחה המעשית]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT|בחירת טיוטות שמורות להגשה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
