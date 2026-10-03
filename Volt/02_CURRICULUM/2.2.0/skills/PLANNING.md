---
generated: true
schema_version: 1
kind: "skill"
entity_id: "PLANNING"
curriculum_version: "2.2.0"
skill_id: "PLANNING"
prerequisite_skill_ids: []
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W04D16_TASK_DECOMPOSITION]]","[[02_CURRICULUM/2.2.0/lessons/W04D17_SEARCH_EVIDENCE]]","[[02_CURRICULUM/2.2.0/lessons/W04D18_ITERATIVE_RESEARCH]]","[[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY]]","[[02_CURRICULUM/2.2.0/lessons/W04D20_BOSS_LEVEL_1_RESEARCH_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D16_TASK_DECOMPOSITION]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D17_SEARCH_EVIDENCE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D18_ITERATIVE_RESEARCH]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D19_RESEARCH_QUALITY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# Planning

תחום: Agent Engineering

יכולת הנדסית: Planning. הבנה, מימוש, ולבסוף תכנון וניפוי שגיאות באופן עצמאי.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/W04D16_TASK_DECOMPOSITION|פירוק משימות מחקר]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D17_SEARCH_EVIDENCE|חיפוש ואיכות ראיות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D18_ITERATIVE_RESEARCH|מחקר איטרטיבי ותנאי עצירה]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY|אימות דוח מחקר]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W04D20_BOSS_LEVEL_1_RESEARCH_AGENT|מבחן מסכם: סוכן מחקר]] — מיומנות בשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D16_TASK_DECOMPOSITION|הוכחה מעשית · פירוק משימות מחקר]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D17_SEARCH_EVIDENCE|הוכחה מעשית · חיפוש ואיכות ראיות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D18_ITERATIVE_RESEARCH|הוכחה מעשית · מחקר איטרטיבי ותנאי עצירה]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D19_RESEARCH_QUALITY|הוכחה מעשית · אימות דוח מחקר]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT|הוכחה מעשית · מבחן מסכם: סוכן מחקר]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_BUILD|תבנית טקסט: פירוק משימות מחקר · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D16_TASK_DECOMPOSITION_TRANSFER|תבנית טקסט: פירוק משימות מחקר · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_BUILD|תבנית טקסט: חיפוש ואיכות ראיות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D17_SEARCH_EVIDENCE_TRANSFER|תבנית טקסט: חיפוש ואיכות ראיות · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_BUILD|תבנית טקסט: מחקר איטרטיבי ותנאי עצירה · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D18_ITERATIVE_RESEARCH_TRANSFER|תבנית טקסט: מחקר איטרטיבי ותנאי עצירה · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_BUILD|תבנית טבלה: אימות דוח מחקר · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_TRANSFER|תבנית טקסט: אימות דוח מחקר · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_BUILD|תבנית טקסט: מבחן מסכם: סוכן מחקר · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT_TRANSFER|תבנית טקסט: מבחן מסכם: סוכן מחקר · TRANSFER]] — מיומנות בתשובה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — מיומנות קשורה
