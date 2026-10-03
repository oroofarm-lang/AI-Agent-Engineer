---
generated: true
schema_version: 1
kind: "tool"
entity_id: "rubric.check"
curriculum_version: "2.2.0"
tool_id: "rubric.check"
scope: "own"
implementation: "src/lib/agents/tools.ts#executeAgentTool"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בדיקת התאמה למחוון

Checks owned frozen-rubric criterion completeness deterministically; it does not grade or certify mastery.

היקף מידע: **המידע המותר של המשתמש המאומת בלבד**.

מימוש במקור: `src/lib/agents/tools.ts#executeAgentTool`.

כלי מותר רק למומחה שהכלי נכלל במפורש בהגדרתו. תשובת מודל אינה יכולה להרחיב את ההרשאה.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — גבולות הרשאה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — כלי מותר
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — כלי
