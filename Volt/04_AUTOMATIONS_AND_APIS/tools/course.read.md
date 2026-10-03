---
generated: true
schema_version: 1
kind: "tool"
entity_id: "course.read"
curriculum_version: "2.2.0"
tool_id: "course.read"
scope: "public"
implementation: "src/lib/agents/tools.ts#executeAgentTool"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Marketing-Growth]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[01_AGENTS/Agent-Visual-Media]]","[[01_AGENTS/Agent-Voice-Audio]]","[[01_AGENTS/Orchestrator-Prime]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# קריאת חומר הקורס

Reads validated published lesson sections and catalog relationships. Only server-resolved IDs are permitted.

היקף מידע: **מידע ציבורי**.

מימוש במקור: `src/lib/agents/tools.ts#executeAgentTool`.

כלי מותר רק למומחה שהכלי נכלל במפורש בהגדרתו. תשובת מודל אינה יכולה להרחיב את ההרשאה.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — גבולות הרשאה
- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — כלי מותר
- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — כלי מותר
- [[01_AGENTS/Agent-Business-Discovery|אפיון שירות ופרויקט עסקי]] — כלי מותר
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — כלי מותר
- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — כלי מותר
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — כלי מותר
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — כלי מותר
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — כלי מותר
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — כלי מותר
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — כלי מותר
- [[01_AGENTS/Agent-Marketing-Growth|תוכן ושיווק]] — כלי מותר
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — כלי מותר
- [[01_AGENTS/Agent-Paid-Media-Measurement|פרסום ומדידה]] — כלי מותר
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — כלי מותר
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — כלי מותר
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — כלי מותר
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — כלי מותר
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — כלי מותר
- [[01_AGENTS/Agent-Visual-Media|תוכן חזותי ותהליכי מדיה]] — כלי מותר
- [[01_AGENTS/Agent-Voice-Audio|קול, תמלול ושיחה]] — כלי מותר
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — כלי מותר
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — כלי
