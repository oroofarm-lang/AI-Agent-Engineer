---
generated: true
schema_version: 1
kind: "skill"
entity_id: "PROMPT_INJECTION"
curriculum_version: "2.2.0"
skill_id: "PROMPT_INJECTION"
prerequisite_skill_ids: []
related: ["[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W12D56_PROMPT_INJECTION]]","[[02_CURRICULUM/2.2.0/lessons/W12D57_TOOL_ATTACKS]]","[[02_CURRICULUM/2.2.0/lessons/W12D58_AUTHENTICATION_AUTHORIZATION]]","[[02_CURRICULUM/2.2.0/lessons/W12D59_HUMAN_IN_THE_LOOP]]","[[02_CURRICULUM/2.2.0/lessons/W12D60_BOSS_LEVEL_3_RED_TEAM]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D56_PROMPT_INJECTION]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D57_TOOL_ATTACKS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D59_HUMAN_IN_THE_LOOP]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D56_PROMPT_INJECTION_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D56_PROMPT_INJECTION_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D59_HUMAN_IN_THE_LOOP_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D59_HUMAN_IN_THE_LOOP_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/technologies/LANGGRAPH]]","[[04_AUTOMATIONS_AND_APIS/technologies/N8N]]"]
---

# Prompt Injection

תחום: Security

יכולת הנדסית: Prompt Injection. הבנה, מימוש, ולבסוף תכנון וניפוי שגיאות באופן עצמאי.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/W12D56_PROMPT_INJECTION|הזרקת הוראות זדוניות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D57_TOOL_ATTACKS|תקיפות כלים וחשיפת מידע]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D58_AUTHENTICATION_AUTHORIZATION|זהות, הרשאה ובידוד לקוחות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D59_HUMAN_IN_THE_LOOP|אישור אנושי וחידוש תהליך]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D60_BOSS_LEVEL_3_RED_TEAM|מבחן מסכם: בדיקת תקיפה ותיקון]] — מיומנות בשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D56_PROMPT_INJECTION|הוכחה מעשית · הזרקת הוראות זדוניות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D57_TOOL_ATTACKS|הוכחה מעשית · תקיפות כלים וחשיפת מידע]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION|הוכחה מעשית · זהות, הרשאה ובידוד לקוחות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D59_HUMAN_IN_THE_LOOP|הוכחה מעשית · אישור אנושי וחידוש תהליך]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM|הוכחה מעשית · מבחן מסכם: בדיקת תקיפה ותיקון]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D56_PROMPT_INJECTION_BUILD|תבנית טקסט: הזרקת הוראות זדוניות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D56_PROMPT_INJECTION_TRANSFER|תבנית טקסט: הזרקת הוראות זדוניות · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_BUILD|תבנית טקסט: תקיפות כלים וחשיפת מידע · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D57_TOOL_ATTACKS_TRANSFER|תבנית טקסט: תקיפות כלים וחשיפת מידע · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_BUILD|תבנית טקסט: זהות, הרשאה ובידוד לקוחות · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_TRANSFER|תבנית טקסט: זהות, הרשאה ובידוד לקוחות · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D59_HUMAN_IN_THE_LOOP_BUILD|תבנית טקסט: אישור אנושי וחידוש תהליך · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D59_HUMAN_IN_THE_LOOP_TRANSFER|תבנית טקסט: אישור אנושי וחידוש תהליך · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM_BUILD|תבנית טקסט: מבחן מסכם: בדיקת תקיפה ותיקון · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM_TRANSFER|תבנית טקסט: מבחן מסכם: בדיקת תקיפה ותיקון · TRANSFER]] — מיומנות בתשובה
- [[04_AUTOMATIONS_AND_APIS/technologies/LANGGRAPH|LangGraph]] — מיומנות קשורה
- [[04_AUTOMATIONS_AND_APIS/technologies/N8N|n8n]] — מיומנות קשורה
