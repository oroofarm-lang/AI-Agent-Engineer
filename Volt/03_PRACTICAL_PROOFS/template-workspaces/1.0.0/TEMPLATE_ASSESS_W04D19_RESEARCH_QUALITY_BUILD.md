---
generated: true
schema_version: 1
kind: "interactive-template"
entity_id: "TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_BUILD"
curriculum_version: "2.2.0"
template_id: "TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_BUILD"
template_version: "1.0.0"
lesson_id: "W04D19_RESEARCH_QUALITY"
assessment_id: "ASSESS_W04D19_RESEARCH_QUALITY"
criterion_id: "BUILD"
rubric_version: "2.1.0"
editor_kind: "table"
source_path: "content/templates/releases/1.0.0.json"
implementation_status: "definitions-formats-owned-drafts-no-editor"
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W04D19_RESEARCH_QUALITY]]","[[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY]]","[[02_CURRICULUM/2.2.0/skills/PLANNING]]","[[02_CURRICULUM/2.2.0/sources/ANTHROPIC_AGENTS]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_TOOLS]]","[[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W04D19_RESEARCH_QUALITY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D19_RESEARCH_QUALITY]]","[[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W04D19_RESEARCH_QUALITY]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS]]","[[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA]]","[[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS]]"]
---

# תבנית טבלה: אימות דוח מחקר · BUILD

## המשימה

בנה טבלה של טענות, ראיות, סתירות ובדיקות שטרם בוצעו. השתמש בה כדי לכתוב דוח קצר. לכל טענה בדוח צרף את המקור שתומך בה. הראה תוצר והסבר כיצד בדקת אותו.

## מה לצרף

צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.

## מבנה העבודה

מלא את הטבלה לפי המשימה. אפשר לערוך את כותרות העמודות ולהוסיף שורות ועמודות. בהסבר שמתחת לטבלה כתוב מה עשית ואיך בדקת את התוצאה. הבחן בין תוצאות שהתקבלו בפועל לבין תוצאות צפויות ובדיקות מתוכננות. ציין מה לא נבדק ומה לא היה זמין. מילוי הטבלה מתעד את העבודה; הוא אינו מריץ קוד או מודל.

עמודות הטבלה:

- הטענה
- הראיה
- המקור והתאריך
- סתירה שנמצאה
- בדיקה שטרם בוצעה

מספר השורות בתבנית: 3. מספר השורות שיש למלא במלואן: 1.

```json
{
  "columns": [
    {
      "id": "COLUMN_1",
      "label": "הטענה"
    },
    {
      "id": "COLUMN_2",
      "label": "הראיה"
    },
    {
      "id": "COLUMN_3",
      "label": "המקור והתאריך"
    },
    {
      "id": "COLUMN_4",
      "label": "סתירה שנמצאה"
    },
    {
      "id": "COLUMN_5",
      "label": "בדיקה שטרם בוצעה"
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

זו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. שירות שמירת הטיוטות הפרטיות מקושר בנפרד; עורך השיעור עדיין לא חובר אליו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום עזרה בתבנית
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — תחום עזרה בתבנית
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום עזרה בתבנית
- [[02_CURRICULUM/2.2.0/exercises/W04D19_RESEARCH_QUALITY|התרגול: אימות דוח מחקר]] — ארגון העבודה
- [[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY|אימות דוח מחקר]] — מבנה תשובה לשיעור
- [[02_CURRICULUM/2.2.0/skills/PLANNING|Planning]] — מיומנות בתשובה
- [[02_CURRICULUM/2.2.0/sources/ANTHROPIC_AGENTS|Building effective agents]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/OPENAI_TOOLS|OpenAI function calling]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/evaluation-keys/ASSESS_W04D19_RESEARCH_QUALITY|תנאי בדיקה: הוכחה מעשית · אימות דוח מחקר]] — תנאי בדיקה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D19_RESEARCH_QUALITY|הוכחה מעשית · אימות דוח מחקר]] — סעיף במחוון
- [[03_PRACTICAL_PROOFS/2.2.0/templates/ASSESS_W04D19_RESEARCH_QUALITY|תבנית הגשה: הוכחה מעשית · אימות דוח מחקר]] — תבנית סעיף
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/Index|תבניות טקסט וטבלה לכל סעיפי ההערכה]] — הגדרת תבנית
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_DRAFT_CONTRACT|מבנה בקשות לשמירת טיוטות פרטיות]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_FORMATS|ייבוא וייצוא של תבניות העבודה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/assets/TEMPLATE_SCHEMA|סכמות תבניות טקסט וטבלה]] — קוד מבנה ופורמטים
- [[04_AUTOMATIONS_AND_APIS/endpoints/TEMPLATE_DRAFTS|שמירת טיוטות עבודה פרטיות]] — שמירת טיוטה פרטית
