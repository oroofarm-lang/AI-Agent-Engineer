---
generated: true
schema_version: 1
kind: "source"
entity_id: "OPENAI_DATA"
curriculum_version: "2.2.0"
source_id: "OPENAI_DATA"
url: "https://developers.openai.com/api/docs/guides/your-data"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/BIZ_04]]","[[02_CURRICULUM/2.2.0/lessons/DAT_03]]","[[02_CURRICULUM/2.2.0/lessons/FND_02]]","[[02_CURRICULUM/2.2.0/lessons/W14D69_PRODUCTION_CONCERNS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_BIZ_04]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_DAT_03]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_FND_02]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D69_PRODUCTION_CONCERNS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_BIZ_04_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_BIZ_04_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_BIZ_04_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_03_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_03_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_03_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_02_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_02_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_02_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# OpenAI data controls

[למקור הראשוני](https://developers.openai.com/api/docs/guides/your-data)

מפרסם: OpenAI

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/BIZ_04|חשבונות לקוח, מידע והרשאות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/DAT_03|מודלים מקומיים ומשאבי חומרה]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/FND_02|בחירת מודלים לפי מדידה]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W14D69_PRODUCTION_CONCERNS|עלות, ביצועים וניטור]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_BIZ_04|בדיקת הבנה: מערכת הלקוח עדיין תלויה במפתח גישה של ספק השירות. מה צריך להבהיר ולתכנן במסירה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_DAT_03|בדיקת הבנה: מודל מופעל במחשב המקומי. איזו מסקנה מותר להסיק מכך בלבד?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_FND_02|בדיקת הבנה: מהי השוואה מתאימה לבחירת מודל למשימת חילוץ?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D69_PRODUCTION_CONCERNS|בדיקת הבנה: מה צריך מפתח המטמון להביא בחשבון כדי שלא להחזיר מידע ישן או של לקוח אחר?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_BIZ_04_BUILD|תבנית טקסט: חשבונות לקוח, מידע והרשאות · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_BIZ_04_DIAGNOSE|תבנית טקסט: חשבונות לקוח, מידע והרשאות · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_BIZ_04_TRANSFER|תבנית טקסט: חשבונות לקוח, מידע והרשאות · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_03_BUILD|תבנית טקסט: מודלים מקומיים ומשאבי חומרה · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_03_DIAGNOSE|תבנית טקסט: מודלים מקומיים ומשאבי חומרה · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_03_TRANSFER|תבנית טקסט: מודלים מקומיים ומשאבי חומרה · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_02_BUILD|תבנית טבלה: בחירת מודלים לפי מדידה · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_02_DIAGNOSE|תבנית טקסט: בחירת מודלים לפי מדידה · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_02_TRANSFER|תבנית טקסט: בחירת מודלים לפי מדידה · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_BUILD|תבנית טקסט: עלות, ביצועים וניטור · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_DIAGNOSE|תבנית טקסט: עלות, ביצועים וניטור · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D69_PRODUCTION_CONCERNS_TRANSFER|תבנית טקסט: עלות, ביצועים וניטור · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
