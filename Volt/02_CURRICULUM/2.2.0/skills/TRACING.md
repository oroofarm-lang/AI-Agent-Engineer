---
generated: true
schema_version: 1
kind: "skill"
entity_id: "TRACING"
curriculum_version: "2.2.0"
skill_id: "TRACING"
prerequisite_skill_ids: []
related: ["[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/lessons/W08D37_AGENTS_SDK]]","[[02_CURRICULUM/2.2.0/lessons/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[02_CURRICULUM/2.2.0/lessons/W08D39_LANGGRAPH]]","[[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[02_CURRICULUM/2.2.0/lessons/W11D51_WHY_DEMOS_LIE]]","[[02_CURRICULUM/2.2.0/lessons/W11D52_EVALUATION_DATASET_DESIGN]]","[[02_CURRICULUM/2.2.0/lessons/W11D53_GRADERS]]","[[02_CURRICULUM/2.2.0/lessons/W11D54_TRACING]]","[[02_CURRICULUM/2.2.0/lessons/W11D55_PROJECT_AGENT_QUALITY_LAB]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D37_AGENTS_SDK]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D39_LANGGRAPH]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D37_AGENTS_SDK_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D39_LANGGRAPH_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE_DIAGNOSE]]","[[04_AUTOMATIONS_AND_APIS/technologies/LANGGRAPH]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_AGENTS_SDK]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# Tracing

תחום: Reliability

יכולת הנדסית: Tracing. הבנה, מימוש, ולבסוף תכנון וניפוי שגיאות באופן עצמאי.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — מומחיות במיומנות
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API|אינטגרציה ישירה עם Responses API]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D37_AGENTS_SDK|SDK לסוכנים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|סביבות הרצה מנוהלות ושמירת מצב]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D39_LANGGRAPH|תהליכי גרף עם LangGraph]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE|מבחן מסכם: שתי ארכיטקטורות לאותה מערכת]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W11D51_WHY_DEMOS_LIE|למה הדגמה אינה בדיקת איכות?]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W11D52_EVALUATION_DATASET_DESIGN|תכנון נתוני הערכה]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W11D53_GRADERS|מחוונים ושופטים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W11D54_TRACING|תיעוד ריצות וניטור]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W11D55_PROJECT_AGENT_QUALITY_LAB|פרויקט: מעבדת איכות לסוכן]] — מיומנות בשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API|הוכחה מעשית · אינטגרציה ישירה עם Responses API]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D37_AGENTS_SDK|הוכחה מעשית · SDK לסוכנים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|הוכחה מעשית · סביבות הרצה מנוהלות ושמירת מצב]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D39_LANGGRAPH|הוכחה מעשית · תהליכי גרף עם LangGraph]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE|הוכחה מעשית · מבחן מסכם: שתי ארכיטקטורות לאותה מערכת]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_DIAGNOSE|תבנית טקסט: אינטגרציה ישירה עם Responses API · DIAGNOSE]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D37_AGENTS_SDK_DIAGNOSE|תבנית טקסט: SDK לסוכנים · DIAGNOSE]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS_DIAGNOSE|תבנית טקסט: סביבות הרצה מנוהלות ושמירת מצב · DIAGNOSE]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D39_LANGGRAPH_DIAGNOSE|תבנית טקסט: תהליכי גרף עם LangGraph · DIAGNOSE]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE_DIAGNOSE|תבנית טקסט: מבחן מסכם: שתי ארכיטקטורות לאותה מערכת · DIAGNOSE]] — מיומנות בתשובה
- [[04_AUTOMATIONS_AND_APIS/technologies/LANGGRAPH|LangGraph]] — מיומנות קשורה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_AGENTS_SDK|OpenAI Agents SDK]] — מיומנות קשורה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — מיומנות קשורה
