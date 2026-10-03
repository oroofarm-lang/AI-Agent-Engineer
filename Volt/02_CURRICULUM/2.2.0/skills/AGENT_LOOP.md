---
generated: true
schema_version: 1
kind: "skill"
entity_id: "AGENT_LOOP"
curriculum_version: "2.2.0"
skill_id: "AGENT_LOOP"
prerequisite_skill_ids: ["TOOL_CALLING"]
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W03D11_WHAT_MAKES_SOMETHING_AN_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP]]","[[02_CURRICULUM/2.2.0/lessons/W03D14_RELIABILITY_FAILURE_HANDLING]]","[[02_CURRICULUM/2.2.0/lessons/W03D15_PROJECT_AGENT_FROM_SCRATCH]]","[[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/lessons/W08D37_AGENTS_SDK]]","[[02_CURRICULUM/2.2.0/lessons/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[02_CURRICULUM/2.2.0/lessons/W08D39_LANGGRAPH]]","[[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[02_CURRICULUM/2.2.0/lessons/W16D76_DISCOVERY]]","[[02_CURRICULUM/2.2.0/lessons/W16D77_ARCHITECTURE]]","[[02_CURRICULUM/2.2.0/lessons/W16D78_BUILD]]","[[02_CURRICULUM/2.2.0/lessons/W16D79_HARDEN]]","[[02_CURRICULUM/2.2.0/lessons/W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION]]","[[02_CURRICULUM/2.2.0/skills/HANDOFFS]]","[[02_CURRICULUM/2.2.0/skills/TOOL_CALLING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D37_AGENTS_SDK]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D39_LANGGRAPH]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D76_DISCOVERY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D77_ARCHITECTURE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D78_BUILD]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D79_HARDEN]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION]]","[[04_AUTOMATIONS_AND_APIS/technologies/LANGGRAPH]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_AGENTS_SDK]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# Agent Loop

תחום: Agent Engineering

יכולת הנדסית: Agent Loop. הבנה, מימוש, ולבסוף תכנון וניפוי שגיאות באופן עצמאי.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/W03D11_WHAT_MAKES_SOMETHING_AN_AGENT|מה הופך מערכת לסוכן?]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D12_TOOL_CALLING|קריאות לכלים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP|לולאת סוכן ידנית]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D14_RELIABILITY_FAILURE_HANDLING|טיפול בכשלים וגבולות סוכן]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W03D15_PROJECT_AGENT_FROM_SCRATCH|פרויקט: סוכן מאפס]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API|אינטגרציה ישירה עם Responses API]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D37_AGENTS_SDK|SDK לסוכנים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|סביבות הרצה מנוהלות ושמירת מצב]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D39_LANGGRAPH|תהליכי גרף עם LangGraph]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE|מבחן מסכם: שתי ארכיטקטורות לאותה מערכת]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D76_DISCOVERY|פרויקט גמר: גילוי צרכים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D77_ARCHITECTURE|פרויקט גמר: ארכיטקטורה]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D78_BUILD|פרויקט גמר: בנייה]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D79_HARDEN|פרויקט גמר: הקשחה]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION|מבחן גמר: פתרון עסקי מלא]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/skills/HANDOFFS|Handoffs]] — תלות בין מיומנויות
- [[02_CURRICULUM/2.2.0/skills/TOOL_CALLING|Tool Calling]] — תלות בין מיומנויות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API|הוכחה מעשית · אינטגרציה ישירה עם Responses API]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D37_AGENTS_SDK|הוכחה מעשית · SDK לסוכנים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|הוכחה מעשית · סביבות הרצה מנוהלות ושמירת מצב]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D39_LANGGRAPH|הוכחה מעשית · תהליכי גרף עם LangGraph]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE|הוכחה מעשית · מבחן מסכם: שתי ארכיטקטורות לאותה מערכת]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D76_DISCOVERY|הוכחה מעשית · פרויקט גמר: גילוי צרכים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D77_ARCHITECTURE|הוכחה מעשית · פרויקט גמר: ארכיטקטורה]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D78_BUILD|הוכחה מעשית · פרויקט גמר: בנייה]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D79_HARDEN|הוכחה מעשית · פרויקט גמר: הקשחה]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION|הוכחה מעשית · מבחן גמר: פתרון עסקי מלא]] — מיומנות שנבדקת
- [[04_AUTOMATIONS_AND_APIS/technologies/LANGGRAPH|LangGraph]] — מיומנות קשורה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_AGENTS_SDK|OpenAI Agents SDK]] — מיומנות קשורה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — מיומנות קשורה
