---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_FND_02_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_FND_02_BUILD"
template_version: "1.0.0"
lesson_id: "FND_02"
assessment_id: "ASSESS_FND_02"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "editors-autosave-frozen-template-submission"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/FND_02]]","[[02_CURRICULUM/2.2.0/lessons/FND_02]]","[[02_CURRICULUM/2.2.0/skills/AI_FUNDAMENTALS]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_DATA]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_FND_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_02]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_FND_02]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_MARKDOWN_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_DIRECTION]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_EXPORT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_MARKDOWN]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_TABLE_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_WORKSPACE_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/WORKSPACE_NAVIGATION_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טבלה: בחירת מודלים לפי מדידה · BUILD

## המשימה

השווה מודלים על סיווג, חילוץ וסיכום. שמור בטבלה את מזהי המודלים, הגרסאות, הקלטים והתוצאות. השתמש רק בשירותים שיש לך גישה אליהם ותעד את המגבלות. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- המשימה
- מזהה המודל
- גרסת המודל
- קלט שנבדק
- התוצאה שהתקבלה
- מגבלות הגישה והבדיקה

מספר השורות בתבנית: 3. מספר השורות שיש למלא במלואן: 3.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "המשימה"
    },
    {
      "id": "COLUMN_2",
      "label": "מזהה המודל"
    },
    {
      "id": "COLUMN_3",
      "label": "גרסת המודל"
    },
    {
      "id": "COLUMN_4",
      "label": "קלט שנבדק"
    },
    {
      "id": "COLUMN_5",
      "label": "התוצאה שהתקבלה"
    },
    {
      "id": "COLUMN_6",
      "label": "מגבלות הגישה והבדיקה"
    }
  ],
  "rows": [
    [
      "סיווג",
      "",
      "",
      "",
      "",
      ""
    ],
    [
      "חילוץ",
      "",
      "",
      "",
      "",
      ""
    ],
    [
      "סיכום",
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

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. עורך השיעור מחובר לשירות שמירת הטיוטות הפרטיות. בהגשה מתוך התבנית מצורף לעבודה הפרטית עותק קבוע של הטיוטה השמורה, כולל ההגדרה וגרסאות העריכה והקורס; אין לייצא לכאן תוכן טיוטות או עבודות אישיות.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/FND_02|התרגול: בחירת מודלים לפי מדידה]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/FND_02|בחירת מודלים לפי מדידה]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/AI_FUNDAMENTALS|יסודות AI]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/OPENAI_DATA|OpenAI data controls]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_FND_02|תנאי בדיקה: הוכחה מעשית · בחירת מודלים לפי מדידה]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_02|הוכחה מעשית · בחירת מודלים לפי מדידה]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_FND_02|תבנית הגשה: הוכחה מעשית · בחירת מודלים לפי מדידה]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT|שאלות ההוכחה המעשית]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_MARKDOWN_COMPONENT|עורך טקסט ותצוגה מקדימה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_DIRECTION|כיוון כתיבה עברי בקובץ PDF]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_EXPORT|ייצוא העבודה לקובץ PDF]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_MARKDOWN|עיצוב טקסט ותוכן Markdown ב־PDF]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT|בחירת טיוטות שמורות להגשה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_TABLE_COMPONENT|עורך טבלאות בתוך השיעור]] — עורך טבלת העבודה
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_WORKSPACE_COMPONENT|עריכת תבנית ושמירה אוטומטית]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/WORKSPACE_NAVIGATION_COMPONENT|התראה לפני מעבר כשאין אישור לשמירת העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
