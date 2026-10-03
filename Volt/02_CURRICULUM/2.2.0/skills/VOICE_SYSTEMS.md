---
generated: true
schema_version: 1
kind: "skill"
entity_id: "VOICE_SYSTEMS"
curriculum_version: "2.2.0"
skill_id: "VOICE_SYSTEMS"
prerequisite_skill_ids: []
related: ["[[01_AGENTS/Agent-Voice-Audio]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/VOI_01]]","[[02_CURRICULUM/2.2.0/lessons/VOI_02]]","[[02_CURRICULUM/2.2.0/lessons/VOI_03]]","[[02_CURRICULUM/2.2.0/lessons/VOI_04]]","[[02_CURRICULUM/2.2.0/lessons/VOI_05]]","[[02_CURRICULUM/2.2.0/lessons/VOI_06]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_06]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_01_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_01_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_02_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_02_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_03_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_03_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_04_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_04_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_05_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_05_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_06_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_06_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# קול ומסמכים

תחום: Business applications

עיבוד דיבור ומסמכים עם מיקום מקור, מדידה ואימות שגיאות.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Voice-Audio|קול, תמלול ושיחה]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/VOI_01|תמלול שיחות ובדיקת דיוק]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/VOI_02|טיפול אחרי שיחה]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/VOI_03|ממשק קולי עם תמלול וקריינות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/VOI_04|שיחה חיה וקטיעות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/VOI_05|העברה לאדם ותיאום פגישות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/VOI_06|מבחן מסכם: עוזר קולי עסקי]] — מיומנות בשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_01|הוכחה מעשית · תמלול שיחות ובדיקת דיוק]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_02|הוכחה מעשית · טיפול אחרי שיחה]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_03|הוכחה מעשית · ממשק קולי עם תמלול וקריינות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_04|הוכחה מעשית · שיחה חיה וקטיעות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_05|הוכחה מעשית · העברה לאדם ותיאום פגישות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_06|הוכחה מעשית · מבחן מסכם: עוזר קולי עסקי]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_01_BUILD|תבנית טקסט: תמלול שיחות ובדיקת דיוק · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_01_TRANSFER|תבנית טקסט: תמלול שיחות ובדיקת דיוק · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_02_BUILD|תבנית טקסט: טיפול אחרי שיחה · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_02_TRANSFER|תבנית טקסט: טיפול אחרי שיחה · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_03_BUILD|תבנית טקסט: ממשק קולי עם תמלול וקריינות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_03_TRANSFER|תבנית טקסט: ממשק קולי עם תמלול וקריינות · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_04_BUILD|תבנית טקסט: שיחה חיה וקטיעות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_04_TRANSFER|תבנית טקסט: שיחה חיה וקטיעות · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_05_BUILD|תבנית טקסט: העברה לאדם ותיאום פגישות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_05_TRANSFER|תבנית טקסט: העברה לאדם ותיאום פגישות · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_06_BUILD|תבנית טקסט: מבחן מסכם: עוזר קולי עסקי · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_VOI_06_TRANSFER|תבנית טקסט: מבחן מסכם: עוזר קולי עסקי · TRANSFER]] — מיומנות בתשובה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — מיומנות קשורה
