---
generated: true
schema_version: 1
kind: "skill"
entity_id: "TOOL_CALLING"
curriculum_version: "2.2.0"
skill_id: "TOOL_CALLING"
prerequisite_skill_ids: ["JSON_SCHEMAS"]
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W03D11_WHAT_MAKES_SOMETHING_AN_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP]]","[[02_CURRICULUM/2.2.0/lessons/W03D14_RELIABILITY_FAILURE_HANDLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D15_PROJECT_AGENT_FROM_SCRATCH]]","[[02_CURRICULUM/2.2.0/skills/AGENT_LOOP]]","[[02_CURRICULUM/2.2.0/skills/JSON_SCHEMAS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D11_WHAT_MAKES_SOMETHING_AN_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D12_TOOL_CALLING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D13_AGENT_LOOP]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D15_PROJECT_AGENT_FROM_SCRATCH]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D11_WHAT_MAKES_SOMETHING_AN_AGENT_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D11_WHAT_MAKES_SOMETHING_AN_AGENT_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D15_PROJECT_AGENT_FROM_SCRATCH_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D15_PROJECT_AGENT_FROM_SCRATCH_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# Tool Calling

תחום: Agent Engineering

יכולת הנדסית: Tool Calling. הבנה, מימוש, ולבסוף תכנון וניפוי שגיאות באופן עצמאי.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/W03D11_WHAT_MAKES_SOMETHING_AN_AGENT|מה הופך מערכת לסוכן?]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING|קריאות לכלים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP|לולאת סוכן ידנית]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D14_RELIABILITY_FAILURE_HANDLING|טיפול בכשלים וגבולות סוכן]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D15_PROJECT_AGENT_FROM_SCRATCH|פרויקט: סוכן מאפס]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/skills/AGENT_LOOP|Agent Loop]] — תלות בין מיומנויות
- [[02_CURRICULUM/2.2.0/skills/JSON_SCHEMAS|JSON/Schemas]] — תלות בין מיומנויות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D11_WHAT_MAKES_SOMETHING_AN_AGENT|הוכחה מעשית · מה הופך מערכת לסוכן?]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D12_TOOL_CALLING|הוכחה מעשית · קריאות לכלים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D13_AGENT_LOOP|הוכחה מעשית · לולאת סוכן ידנית]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING|הוכחה מעשית · טיפול בכשלים וגבולות סוכן]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D15_PROJECT_AGENT_FROM_SCRATCH|הוכחה מעשית · פרויקט: סוכן מאפס]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D11_WHAT_MAKES_SOMETHING_AN_AGENT_BUILD|תבנית טקסט: מה הופך מערכת לסוכן? · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D11_WHAT_MAKES_SOMETHING_AN_AGENT_TRANSFER|תבנית טקסט: מה הופך מערכת לסוכן? · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_BUILD|תבנית טקסט: קריאות לכלים · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D12_TOOL_CALLING_TRANSFER|תבנית טקסט: קריאות לכלים · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_BUILD|תבנית טקסט: לולאת סוכן ידנית · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_TRANSFER|תבנית טקסט: לולאת סוכן ידנית · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING_BUILD|תבנית טקסט: טיפול בכשלים וגבולות סוכן · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING_TRANSFER|תבנית טקסט: טיפול בכשלים וגבולות סוכן · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D15_PROJECT_AGENT_FROM_SCRATCH_BUILD|תבנית טקסט: פרויקט: סוכן מאפס · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D15_PROJECT_AGENT_FROM_SCRATCH_TRANSFER|תבנית טקסט: פרויקט: סוכן מאפס · TRANSFER]] — מיומנות בתשובה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — מיומנות קשורה
