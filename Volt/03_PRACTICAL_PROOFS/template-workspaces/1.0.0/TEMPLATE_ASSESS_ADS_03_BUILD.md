---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_ADS_03_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_ADS_03_BUILD"
template_version: "1.0.0"
lesson_id: "ADS_03"
assessment_id: "ASSESS_ADS_03"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "definitions-and-formats-only"
related: ["[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Visual-Media]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/ADS_03]]","[[02_CURRICULUM/2.2.0/lessons/ADS_03]]","[[02_CURRICULUM/2.2.0/skills/PAID_MEDIA]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS]]","[[02_CURRICULUM/2.2.0/sources/GOOGLE_ADS_TESTS]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_ADS_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_03]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_ADS_03]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]"]
---

# תבנית טבלה: קריאייטיב והשערות לניסוי · BUILD

## המשימה

הכן טבלה של מסר, קהל וחומרי פרסום. בכל ניסוי שנה משתנה אחד בלבד, וכתוב איזו השערה השינוי אמור לבדוק. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- המסר
- הקהל
- חומר הפרסום
- המשתנה ששונה
- ההשערה
- הדרך לבדוק אותה

מספר השורות בתבנית: 3. מספר השורות שיש למלא במלואן: 1.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "המסר"
    },
    {
      "id": "COLUMN_2",
      "label": "הקהל"
    },
    {
      "id": "COLUMN_3",
      "label": "חומר הפרסום"
    },
    {
      "id": "COLUMN_4",
      "label": "המשתנה ששונה"
    },
    {
      "id": "COLUMN_5",
      "label": "ההשערה"
    },
    {
      "id": "COLUMN_6",
      "label": "הדרך לבדוק אותה"
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

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, שמירה אוטומטית, הגשה או תוצאה של הרצת קוד.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Paid-Media-Measurement|פרסום ומדידה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Visual-Media|תוכן חזותי ותהליכי מדיה]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/ADS_03|התרגול: קריאייטיב והשערות לניסוי]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/ADS_03|קריאייטיב והשערות לניסוי]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/PAID_MEDIA|פרסום ומדידה]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_EVALS|Demystifying evals for AI agents]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/GOOGLE_ADS_TESTS|Google Ads API testing]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_ADS_03|תנאי בדיקה: הוכחה מעשית · קריאייטיב והשערות לניסוי]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_03|הוכחה מעשית · קריאייטיב והשערות לניסוי]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_ADS_03|תבנית הגשה: הוכחה מעשית · קריאייטיב והשערות לניסוי]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
