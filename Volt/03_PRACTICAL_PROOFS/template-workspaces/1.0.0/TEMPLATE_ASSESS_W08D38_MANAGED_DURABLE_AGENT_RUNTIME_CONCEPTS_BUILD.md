---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS_BUILD"
template_version: "1.0.0"
lesson_id: "W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS"
assessment_id: "ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "editors-autosave-frozen-template-submission"
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[02_CURRICULUM/2.2.0/lessons/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[02_CURRICULUM/2.2.0/skills/AGENT_LOOP]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_DEPRECATIONS]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_RUNTIME]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_MARKDOWN_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_DIRECTION]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_EXPORT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_MARKDOWN]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_TABLE_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_WORKSPACE_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/WORKSPACE_NAVIGATION_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טבלה: סביבות הרצה מנוהלות ושמירת מצב · BUILD

## המשימה

בנה טבלת אחריות עבור state, recovery, sandbox, secrets ו־events: מי שומר מצב, מתאושש, מבודד הרצה, מנהל סודות ומתעד אירועים. נסה משימה קטנה בסביבה זמינה, או תעד שאין לך גישה. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- תחום האחריות
- הרכיב האחראי
- מה הוא עושה
- איך בדקתי או מה לא זמין

מספר השורות בתבנית: 5. מספר השורות שיש למלא במלואן: 5.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "תחום האחריות"
    },
    {
      "id": "COLUMN_2",
      "label": "הרכיב האחראי"
    },
    {
      "id": "COLUMN_3",
      "label": "מה הוא עושה"
    },
    {
      "id": "COLUMN_4",
      "label": "איך בדקתי או מה לא זמין"
    }
  ],
  "rows": [
    [
      "state",
      "",
      "",
      ""
    ],
    [
      "recovery",
      "",
      "",
      ""
    ],
    [
      "sandbox",
      "",
      "",
      ""
    ],
    [
      "secrets",
      "",
      "",
      ""
    ],
    [
      "events",
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

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|התרגול: סביבות הרצה מנוהלות ושמירת מצב]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|סביבות הרצה מנוהלות ושמירת מצב]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/AGENT_LOOP|Agent Loop]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/OPENAI_DEPRECATIONS|OpenAI deprecations]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/OPENAI_RUNTIME|OpenAI managed agent runtime]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|תנאי בדיקה: הוכחה מעשית · סביבות הרצה מנוהלות ושמירת מצב]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|הוכחה מעשית · סביבות הרצה מנוהלות ושמירת מצב]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|תבנית הגשה: הוכחה מעשית · סביבות הרצה מנוהלות ושמירת מצב]] — תבנית סעיף
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
