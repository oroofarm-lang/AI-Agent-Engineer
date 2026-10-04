---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_CRM_01_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_CRM_01_BUILD"
template_version: "1.0.0"
lesson_id: "CRM_01"
assessment_id: "ASSESS_CRM_01"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "editors-autosave-frozen-template-submission"
related: ["[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/CRM_01]]","[[02_CURRICULUM/2.2.0/lessons/CRM_01]]","[[02_CURRICULUM/2.2.0/skills/CRM_OPERATIONS]]","[[02_CURRICULUM/2.2.0/sources/HUBSPOT_WEBHOOKS]]","[[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_CRM_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_01]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_CRM_01]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/PROOF_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_MARKDOWN_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_DIRECTION]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_EXPORT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_PDF_MARKDOWN]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SUBMISSION_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_TABLE_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_WORKSPACE_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/assets/WORKSPACE_NAVIGATION_COMPONENT]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טבלה: מודל נתונים ללקוחות ולעסקאות · BUILD

## המשימה

צייר תרשים קשרים בין טבלאות (ERD). הכן נתוני דוגמה ל־contacts, companies, deals ו־activities והסבר כיצד הרשומות קשורות זו לזו. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- הטבלה
- מזהה לדוגמה
- מזהה רשומה קשורה
- הקשר בין הרשומות
- איך אבדוק את הקשר

מספר השורות בתבנית: 4. מספר השורות שיש למלא במלואן: 4.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "הטבלה"
    },
    {
      "id": "COLUMN_2",
      "label": "מזהה לדוגמה"
    },
    {
      "id": "COLUMN_3",
      "label": "מזהה רשומה קשורה"
    },
    {
      "id": "COLUMN_4",
      "label": "הקשר בין הרשומות"
    },
    {
      "id": "COLUMN_5",
      "label": "איך אבדוק את הקשר"
    }
  ],
  "rows": [
    [
      "contacts",
      "",
      "",
      "",
      ""
    ],
    [
      "companies",
      "",
      "",
      "",
      ""
    ],
    [
      "deals",
      "",
      "",
      "",
      ""
    ],
    [
      "activities",
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

- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/CRM_01|התרגול: מודל נתונים ללקוחות ולעסקאות]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/CRM_01|מודל נתונים ללקוחות ולעסקאות]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/CRM_OPERATIONS|CRM ותפעול לקוחות]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/HUBSPOT_WEBHOOKS|HubSpot webhooks]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS|Stripe webhooks]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_CRM_01|תנאי בדיקה: הוכחה מעשית · מודל נתונים ללקוחות ולעסקאות]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_01|הוכחה מעשית · מודל נתונים ללקוחות ולעסקאות]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_CRM_01|תבנית הגשה: הוכחה מעשית · מודל נתונים ללקוחות ולעסקאות]] — תבנית סעיף
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
