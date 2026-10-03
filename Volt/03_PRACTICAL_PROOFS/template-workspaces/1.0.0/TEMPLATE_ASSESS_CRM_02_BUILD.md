---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_CRM_02_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_CRM_02_BUILD"
template_version: "1.0.0"
lesson_id: "CRM_02"
assessment_id: "ASSESS_CRM_02"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "definitions-and-formats-only"
related: ["[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/CRM_02]]","[[02_CURRICULUM/2.2.0/lessons/CRM_02]]","[[02_CURRICULUM/2.2.0/skills/CRM_OPERATIONS]]","[[02_CURRICULUM/2.2.0/sources/HUBSPOT_WEBHOOKS]]","[[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_CRM_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_02]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_CRM_02]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]"]
---

# תבנית טבלה: יבוא לקוחות ומניעת כפילות · BUILD

## המשימה

ייבא קובץ CSV והבא את השדות לפורמט אחיד. סמן רשומות שעשויות להיות כפולות והעבר אותן לבדיקה. אל תמזג על סמך שם בלבד. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- הרשומה המקורית
- השדות בפורמט אחיד
- סימן לכפילות
- הפרטים שיש לבדוק
- החלטה לאחר הבדיקה

מספר השורות בתבנית: 3. מספר השורות שיש למלא במלואן: 1.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "הרשומה המקורית"
    },
    {
      "id": "COLUMN_2",
      "label": "השדות בפורמט אחיד"
    },
    {
      "id": "COLUMN_3",
      "label": "סימן לכפילות"
    },
    {
      "id": "COLUMN_4",
      "label": "הפרטים שיש לבדוק"
    },
    {
      "id": "COLUMN_5",
      "label": "החלטה לאחר הבדיקה"
    }
  ],
  "rows": [
    [
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
      ""
    ],
    [
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

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, שמירה אוטומטית, הגשה או תוצאה של הרצת קוד.

## קשרים במפת הידע

- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/CRM_02|התרגול: יבוא לקוחות ומניעת כפילות]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/CRM_02|יבוא לקוחות ומניעת כפילות]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/CRM_OPERATIONS|CRM ותפעול לקוחות]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/HUBSPOT_WEBHOOKS|HubSpot webhooks]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/STRIPE_WEBHOOKS|Stripe webhooks]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_CRM_02|תנאי בדיקה: הוכחה מעשית · יבוא לקוחות ומניעת כפילות]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_02|הוכחה מעשית · יבוא לקוחות ומניעת כפילות]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_CRM_02|תבנית הגשה: הוכחה מעשית · יבוא לקוחות ומניעת כפילות]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
