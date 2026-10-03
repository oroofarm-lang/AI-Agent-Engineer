---
generated: true
schema_version: 1
kind: "tool"
entity_id: "evidence.read"
curriculum_version: "2.2.0"
tool_id: "evidence.read"
scope: "own"
implementation: "src/lib/agents/tools.ts#executeAgentTool"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Security-Auditor]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# קריאת העבודה שבחרת

Reads explicitly selected learner material from server-resolved, owner-scoped context. Reports exactly what content was inspected; never implies metadata is a content review.

היקף מידע: **המידע המותר של המשתמש המאומת בלבד**.

מימוש במקור: `src/lib/agents/tools.ts#executeAgentTool`.

כלי מותר רק למומחה שהכלי נכלל במפורש בהגדרתו. תשובת מודל אינה יכולה להרחיב את ההרשאה.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — גבולות הרשאה
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — כלי מותר
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — כלי מותר
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — כלי מותר
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — כלי מותר
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — כלי
