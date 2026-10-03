---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_ADS_02_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_ADS_02_BUILD"
template_version: "1.0.0"
lesson_id: "ADS_02"
assessment_id: "ASSESS_ADS_02"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "definitions-formats-owned-drafts-no-editor"
related: ["[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Visual-Media]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/ADS_02]]","[[02_CURRICULUM/2.2.0/lessons/ADS_02]]","[[02_CURRICULUM/2.2.0/skills/PAID_MEDIA]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/GOOGLE_ADS_TESTS]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_ADS_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_02]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_ADS_02]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טבלה: יבוא נתוני קמפיינים · BUILD

## המשימה

בנה יבוא מקובץ CSV, ואם יש גישה מתאימה הוסף גם קריאה מחשבון בדיקה. שמור source_id ובדוק שטעינה חוזרת אינה יוצרת שורות כפולות. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- source_id
- הרשומה בקלט
- המזהה לאחר הייבוא
- מספר שורות לפני טעינה חוזרת
- מספר שורות אחרי טעינה חוזרת
- תוצאת בדיקת הכפילויות

מספר השורות בתבנית: 3. מספר השורות שיש למלא במלואן: 1.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "source_id"
    },
    {
      "id": "COLUMN_2",
      "label": "הרשומה בקלט"
    },
    {
      "id": "COLUMN_3",
      "label": "המזהה לאחר הייבוא"
    },
    {
      "id": "COLUMN_4",
      "label": "מספר שורות לפני טעינה חוזרת"
    },
    {
      "id": "COLUMN_5",
      "label": "מספר שורות אחרי טעינה חוזרת"
    },
    {
      "id": "COLUMN_6",
      "label": "תוצאת בדיקת הכפילויות"
    }
  ],
  "rows": [
    [
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
      ""
    ],
    [
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

- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Paid-Media-Measurement|פרסום ומדידה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Visual-Media|תוכן חזותי ותהליכי מדיה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/ADS_02|התרגול: יבוא נתוני קמפיינים]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/ADS_02|יבוא נתוני קמפיינים]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/PAID_MEDIA|פרסום ומדידה]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/GOOGLE_ADS_TESTS|Google Ads API testing]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_ADS_02|תנאי בדיקה: הוכחה מעשית · יבוא נתוני קמפיינים]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_02|הוכחה מעשית · יבוא נתוני קמפיינים]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_ADS_02|תבנית הגשה: הוכחה מעשית · יבוא נתוני קמפיינים]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
