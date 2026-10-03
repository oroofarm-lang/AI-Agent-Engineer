---
generated: true
schema_version: 1
kind: "source"
entity_id: "MCP_SPEC"
curriculum_version: "2.2.0"
source_id: "MCP_SPEC"
url: "https://modelcontextprotocol.io/specification/2026-07-28"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/AGT_01]]","[[02_CURRICULUM/2.2.0/lessons/W07D33_MCP]]","[[02_CURRICULUM/2.2.0/lessons/W15D73_DYNAMIC_TOOLS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AGT_01]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D33_MCP]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D73_DYNAMIC_TOOLS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AGT_01_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AGT_01_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AGT_01_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W07D33_MCP_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W07D33_MCP_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W07D33_MCP_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/MCP_SDK]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]","[[04_AUTOMATIONS_AND_APIS/technologies/MCP]]"]
---

# MCP specification

[למקור הראשוני](https://modelcontextprotocol.io/specification/2026-07-28)

מפרסם: MCP

סוג: specification

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — מקור למומחה
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/AGT_01|MCP, ‏A2A ותקשורת בין סוכנים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D33_MCP|MCP: חיבור כלים והקשר]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W15D73_DYNAMIC_TOOLS|גילוי כלים דינמי]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_AGT_01|בדיקת הבנה: מה מתאר Agent Card בתרגיל התקשורת בין שירותים?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W07D33_MCP|בדיקת הבנה: מה ההבדל בין Tool ל־Resource בתיאור MCP שבשיעור?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W15D73_DYNAMIC_TOOLS|בדיקת הבנה: חיפוש כלים מצא כלי בעל שם מתאים. מה עוד צריך לבדוק לפני הפעלתו?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AGT_01_BUILD|תבנית טקסט: MCP, ‏A2A ותקשורת בין סוכנים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AGT_01_DIAGNOSE|תבנית טקסט: MCP, ‏A2A ותקשורת בין סוכנים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_AGT_01_TRANSFER|תבנית טקסט: MCP, ‏A2A ותקשורת בין סוכנים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W07D33_MCP_BUILD|תבנית טקסט: MCP: חיבור כלים והקשר · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W07D33_MCP_DIAGNOSE|תבנית טקסט: MCP: חיבור כלים והקשר · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W07D33_MCP_TRANSFER|תבנית טקסט: MCP: חיבור כלים והקשר · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_BUILD|תבנית טקסט: גילוי כלים דינמי · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_DIAGNOSE|תבנית טקסט: גילוי כלים דינמי · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W15D73_DYNAMIC_TOOLS_TRANSFER|תבנית טקסט: גילוי כלים דינמי · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/MCP_SDK|MCP TypeScript SDK]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
- [[04_AUTOMATIONS_AND_APIS/technologies/MCP|Model Context Protocol]] — תיעוד בקורס
