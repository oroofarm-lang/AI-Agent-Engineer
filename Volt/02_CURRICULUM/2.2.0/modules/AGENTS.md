---
generated: true
schema_version: 1
kind: "module"
entity_id: "AGENTS"
curriculum_version: "2.2.0"
required_entry: false
lesson_ids: ["W04D16_TASK_DECOMPOSITION","W04D17_SEARCH_EVIDENCE","W04D18_ITERATIVE_RESEARCH","W04D19_RESEARCH_QUALITY","W04D20_BOSS_LEVEL_1_RESEARCH_AGENT","W08D36_RESPONSES_API","W08D37_AGENTS_SDK","W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS","W08D39_LANGGRAPH","W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE","W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW","W09D42_ROUTERS","W09D43_PARALLEL_WORK","W09D44_LONG_RUNNING_WORKFLOWS","W09D45_PROJECT_DURABLE_WORKFLOW_AGENT","W10D46_WHEN_MULTI_AGENT_MAKES_SENSE","W10D47_MANAGER_PATTERN","W10D48_HANDOFFS","AGT_01","W10D49_SHARED_STATE_COORDINATION","W10D50_PROJECT_AI_COMPANY","W15D71_BROWSER_COMPUTER_AGENTS","W15D72_CODE_SANDBOX_AGENTS","W15D73_DYNAMIC_TOOLS","W15D74_AGENTIC_CODING","W15D75_PROJECT_AUTONOMOUS_WORKFLOW"]
prerequisite_module_ids: ["CORE"]
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/AGT_01]]","[[02_CURRICULUM/2.2.0/lessons/W04D16_TASK_DECOMPOSITION]]","[[02_CURRICULUM/2.2.0/lessons/W04D17_SEARCH_EVIDENCE]]","[[02_CURRICULUM/2.2.0/lessons/W04D18_ITERATIVE_RESEARCH]]","[[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY]]","[[02_CURRICULUM/2.2.0/lessons/W04D20_BOSS_LEVEL_1_RESEARCH_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API]]","[[02_CURRICULUM/2.2.0/lessons/W08D37_AGENTS_SDK]]","[[02_CURRICULUM/2.2.0/lessons/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[02_CURRICULUM/2.2.0/lessons/W08D39_LANGGRAPH]]","[[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[02_CURRICULUM/2.2.0/lessons/W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW]]","[[02_CURRICULUM/2.2.0/lessons/W09D42_ROUTERS]]","[[02_CURRICULUM/2.2.0/lessons/W09D43_PARALLEL_WORK]]","[[02_CURRICULUM/2.2.0/lessons/W09D44_LONG_RUNNING_WORKFLOWS]]","[[02_CURRICULUM/2.2.0/lessons/W09D45_PROJECT_DURABLE_WORKFLOW_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W10D46_WHEN_MULTI_AGENT_MAKES_SENSE]]","[[02_CURRICULUM/2.2.0/lessons/W10D47_MANAGER_PATTERN]]","[[02_CURRICULUM/2.2.0/lessons/W10D48_HANDOFFS]]","[[02_CURRICULUM/2.2.0/lessons/W10D49_SHARED_STATE_COORDINATION]]","[[02_CURRICULUM/2.2.0/lessons/W10D50_PROJECT_AI_COMPANY]]","[[02_CURRICULUM/2.2.0/lessons/W15D71_BROWSER_COMPUTER_AGENTS]]","[[02_CURRICULUM/2.2.0/lessons/W15D72_CODE_SANDBOX_AGENTS]]","[[02_CURRICULUM/2.2.0/lessons/W15D73_DYNAMIC_TOOLS]]","[[02_CURRICULUM/2.2.0/lessons/W15D74_AGENTIC_CODING]]","[[02_CURRICULUM/2.2.0/lessons/W15D75_PROJECT_AUTONOMOUS_WORKFLOW]]","[[02_CURRICULUM/2.2.0/modules/CORE]]","[[04_AUTOMATIONS_AND_APIS/assets/LAB_TESTS]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/AGENTS_SDK]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/LANGGRAPH]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/MCP_SDK]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS]]"]
---

# סוכנים ותזמור

מבצע מחקר עם מקורות שאפשר לבדוק, משווה סביבות הרצה ובונה סוכנים ותהליכים שיכולים להימשך לאחר תקלה.

## התוצר של הפרק

מערכת מחקר ותפעול שמחלקת משימות, מתעדת את שלבי הריצה, מבקשת אישורים ומתאוששת מתקלות.

## סדר השיעורים

1. W04D16_TASK_DECOMPOSITION
2. W04D17_SEARCH_EVIDENCE
3. W04D18_ITERATIVE_RESEARCH
4. W04D19_RESEARCH_QUALITY
5. W04D20_BOSS_LEVEL_1_RESEARCH_AGENT
6. W08D36_RESPONSES_API
7. W08D37_AGENTS_SDK
8. W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS
9. W08D39_LANGGRAPH
10. W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE
11. W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW
12. W09D42_ROUTERS
13. W09D43_PARALLEL_WORK
14. W09D44_LONG_RUNNING_WORKFLOWS
15. W09D45_PROJECT_DURABLE_WORKFLOW_AGENT
16. W10D46_WHEN_MULTI_AGENT_MAKES_SENSE
17. W10D47_MANAGER_PATTERN
18. W10D48_HANDOFFS
19. AGT_01
20. W10D49_SHARED_STATE_COORDINATION
21. W10D50_PROJECT_AI_COMPANY
22. W15D71_BROWSER_COMPUTER_AGENTS
23. W15D72_CODE_SANDBOX_AGENTS
24. W15D73_DYNAMIC_TOOLS
25. W15D74_AGENTIC_CODING
26. W15D75_PROJECT_AUTONOMOUS_WORKFLOW

## מפת הקשרים של הפרק

[[02_CURRICULUM/2.2.0/maps/AGENTS.canvas|פתיחת מפת הפרק]] — השיעורים, התרגולים, המחוונים והמקורות הקשורים לפרק זה. הקשרים הנוספים מופיעים גם ברשומות עצמן.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — תחום הפרק
- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — תחום הפרק
- [[01_AGENTS/Agent-Business-Discovery|אפיון שירות ופרויקט עסקי]] — תחום הפרק
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — תחום הפרק
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — תחום הפרק
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — תחום הפרק
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — תחום הפרק
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — תחום הפרק
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — תחום הפרק
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — תחום הפרק
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — תחום הפרק
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — תחום הפרק
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — תחום הפרק
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — פרק
- [[02_CURRICULUM/2.2.0/lessons/AGT_01|MCP, ‏A2A ותקשורת בין סוכנים]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W04D16_TASK_DECOMPOSITION|פירוק משימות מחקר]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W04D17_SEARCH_EVIDENCE|חיפוש ואיכות ראיות]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W04D18_ITERATIVE_RESEARCH|מחקר איטרטיבי ותנאי עצירה]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W04D19_RESEARCH_QUALITY|אימות דוח מחקר]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W04D20_BOSS_LEVEL_1_RESEARCH_AGENT|מבחן מסכם: סוכן מחקר]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API|אינטגרציה ישירה עם Responses API]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W08D37_AGENTS_SDK|SDK לסוכנים]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|סביבות הרצה מנוהלות ושמירת מצב]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W08D39_LANGGRAPH|תהליכי גרף עם LangGraph]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE|מבחן מסכם: שתי ארכיטקטורות לאותה מערכת]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW|תהליכים דטרמיניסטיים עם AI]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W09D42_ROUTERS|ניתוב פניות]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W09D43_PARALLEL_WORK|עבודה במקביל]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W09D44_LONG_RUNNING_WORKFLOWS|תהליכים ארוכים והתאוששות]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W09D45_PROJECT_DURABLE_WORKFLOW_AGENT|פרויקט: תהליך עבודה שנמשך לאחר תקלה]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W10D46_WHEN_MULTI_AGENT_MAKES_SENSE|מתי כמה סוכנים מועילים?]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W10D47_MANAGER_PATTERN|מנהל ומומחים]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W10D48_HANDOFFS|העברת אחריות בין סוכנים]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W10D49_SHARED_STATE_COORDINATION|מצב משותף ותיאום]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W10D50_PROJECT_AI_COMPANY|פרויקט: צוות AI עסקי]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W15D71_BROWSER_COMPUTER_AGENTS|סוכני דפדפן ומחשב]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W15D72_CODE_SANDBOX_AGENTS|Sandbox וסוכני קוד]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W15D73_DYNAMIC_TOOLS|גילוי כלים דינמי]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W15D74_AGENTIC_CODING|סוכן כתיבת קוד מבוקר]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/lessons/W15D75_PROJECT_AUTONOMOUS_WORKFLOW|פרויקט: תהליך אוטונומי מבוקר]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/modules/CORE|פרק 1: יסודות · פרק חובה]] — תלות בין פרקים
- [[04_AUTOMATIONS_AND_APIS/assets/LAB_TESTS|בדיקות המעבדה]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/AGENTS_SDK|OpenAI Agents SDK]] — פרק קשור
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/LANGGRAPH|LangGraph]] — פרק קשור
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/MCP_SDK|MCP TypeScript SDK]] — פרק קשור
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG|OpenAI API changelog]] — פרק קשור
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS|OpenAI model catalog]] — פרק קשור
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS|OpenAI News]] — פרק קשור
