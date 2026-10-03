---
generated: true
schema_version: 1
kind: "source"
entity_id: "PYTHON_JSON"
curriculum_version: "2.2.0"
source_id: "PYTHON_JSON"
url: "https://docs.python.org/3/library/json.html"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W02D08_STRUCTURED_OUTPUTS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D04_HTTP_APIS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W02D08_STRUCTURED_OUTPUTS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# Python JSON module

[למקור הראשוני](https://docs.python.org/3/library/json.html)

מפרסם: Python

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/W01D03_PYTHON_FOR_AGENT_BUILDERS_II|Python לבוני סוכנים · חלק ב׳]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS|HTTP וממשקי API]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W02D08_STRUCTURED_OUTPUTS|פלט מובנה ואימות נתונים]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D03_PYTHON_FOR_AGENT_BUILDERS_II|בדיקת הבנה: קובץ השיחה קיים, אבל תוכנו הוא הטקסט broken. כיצד צריך load_messages להגיב?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D04_HTTP_APIS|בדיקת הבנה: שרת המעבדה החזיר קוד 200, אבל גוף התגובה הוא not-json. היכן עלולה הקריאה להיכשל?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W02D08_STRUCTURED_OUTPUTS|בדיקת הבנה: רשומת Lead תואמת לסכמה, אך כוללת שם שלא הופיע בפנייה. איזו בדיקה עדיין נדרשת?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_BUILD|תבנית טקסט: Python לבוני סוכנים · חלק ב׳ · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_DIAGNOSE|תבנית טקסט: Python לבוני סוכנים · חלק ב׳ · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_TRANSFER|תבנית טקסט: Python לבוני סוכנים · חלק ב׳ · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_BUILD|תבנית טקסט: HTTP וממשקי API · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_DIAGNOSE|תבנית טקסט: HTTP וממשקי API · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_TRANSFER|תבנית טקסט: HTTP וממשקי API · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_BUILD|תבנית טקסט: פלט מובנה ואימות נתונים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_DIAGNOSE|תבנית טקסט: פלט מובנה ואימות נתונים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_TRANSFER|תבנית טקסט: פלט מובנה ואימות נתונים · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
