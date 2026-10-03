---
generated: true
schema_version: 1
kind: "skill"
entity_id: "CONTEXT_ENGINEERING"
curriculum_version: "2.2.0"
skill_id: "CONTEXT_ENGINEERING"
prerequisite_skill_ids: []
related: ["[[01_AGENTS/Agent-Model-Data]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[02_CURRICULUM/2.2.0/lessons/W02D07_CONTEXT_ENGINEERING]]","[[02_CURRICULUM/2.2.0/lessons/W02D08_STRUCTURED_OUTPUTS]]","[[02_CURRICULUM/2.2.0/lessons/W02D09_MODEL_RELIABILITY]]","[[02_CURRICULUM/2.2.0/lessons/W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D07_CONTEXT_ENGINEERING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D08_STRUCTURED_OUTPUTS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D09_MODEL_RELIABILITY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D09_MODEL_RELIABILITY_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D09_MODEL_RELIABILITY_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# Context Engineering

תחום: LLM Engineering

יכולת הנדסית: Context Engineering. הבנה, מימוש, ולבסוף תכנון וניפוי שגיאות באופן עצמאי.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/W02D06_HOW_LLM_APPLICATIONS_WORK|איך אפליקציות LLM פועלות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W02D07_CONTEXT_ENGINEERING|הנדסת הקשר]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W02D08_STRUCTURED_OUTPUTS|פלט מובנה ואימות נתונים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W02D09_MODEL_RELIABILITY|אמינות, ביסוס ואי־ודאות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE|פרויקט: מנוע קליטת פניות]] — מיומנות בשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK|הוכחה מעשית · איך אפליקציות LLM פועלות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D07_CONTEXT_ENGINEERING|הוכחה מעשית · הנדסת הקשר]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D08_STRUCTURED_OUTPUTS|הוכחה מעשית · פלט מובנה ואימות נתונים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D09_MODEL_RELIABILITY|הוכחה מעשית · אמינות, ביסוס ואי־ודאות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE|הוכחה מעשית · פרויקט: מנוע קליטת פניות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_BUILD|תבנית טקסט: איך אפליקציות LLM פועלות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_TRANSFER|תבנית טקסט: איך אפליקציות LLM פועלות · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_BUILD|תבנית טקסט: הנדסת הקשר · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_TRANSFER|תבנית טקסט: הנדסת הקשר · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_BUILD|תבנית טקסט: פלט מובנה ואימות נתונים · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D08_STRUCTURED_OUTPUTS_TRANSFER|תבנית טקסט: פלט מובנה ואימות נתונים · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D09_MODEL_RELIABILITY_BUILD|תבנית טקסט: אמינות, ביסוס ואי־ודאות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D09_MODEL_RELIABILITY_TRANSFER|תבנית טקסט: אמינות, ביסוס ואי־ודאות · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE_BUILD|תבנית טקסט: פרויקט: מנוע קליטת פניות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE_TRANSFER|תבנית טקסט: פרויקט: מנוע קליטת פניות · TRANSFER]] — מיומנות בתשובה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — מיומנות קשורה
