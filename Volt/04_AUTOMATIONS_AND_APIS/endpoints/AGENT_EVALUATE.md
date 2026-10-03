---
generated: true
schema_version: 1
kind: "api"
entity_id: "AGENT_EVALUATE"
curriculum_version: "2.2.0"
api_id: "AGENT_EVALUATE"
route: "/api/agents/evaluate"
methods: ["POST"]
permission_scope: "own"
source_path: "src/app/api/agents/evaluate/route.ts"
implementation_status: "implemented"
related: ["[[00_ORCHESTRATION/System-Policies]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_06]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AGT_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_06]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_07]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_08]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_06]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_06]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_07]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_08]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FIRST_AI_PROGRAM]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_06]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_07]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_08]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_09]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_10]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_06]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D04_HTTP_APIS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D05_PROJECT_AGENT_ZERO]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D07_CONTEXT_ENGINEERING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D08_STRUCTURED_OUTPUTS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D09_MODEL_RELIABILITY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D11_WHAT_MAKES_SOMETHING_AN_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D12_TOOL_CALLING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D13_AGENT_LOOP]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D15_PROJECT_AGENT_FROM_SCRATCH]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D16_TASK_DECOMPOSITION]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D17_SEARCH_EVIDENCE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D18_ITERATIVE_RESEARCH]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D19_RESEARCH_QUALITY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D21_DATABASES]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D22_STATE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D23_AGENT_MEMORY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D24_MEMORY_QUALITY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D26_EMBEDDINGS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D29_RAG_FAILURE_MODES]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D31_PRODUCTION_APIS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D32_TOOL_DESIGN]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D33_MCP]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D34_SIDE_EFFECTS_PERMISSIONS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D35_PROJECT_OPERATIONS_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D37_AGENTS_SDK]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D39_LANGGRAPH]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D42_ROUTERS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D43_PARALLEL_WORK]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D44_LONG_RUNNING_WORKFLOWS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D45_PROJECT_DURABLE_WORKFLOW_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D47_MANAGER_PATTERN]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D48_HANDOFFS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D49_SHARED_STATE_COORDINATION]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D50_PROJECT_AI_COMPANY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D51_WHY_DEMOS_LIE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D52_EVALUATION_DATASET_DESIGN]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D53_GRADERS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D54_TRACING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D55_PROJECT_AGENT_QUALITY_LAB]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D56_PROMPT_INJECTION]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D57_TOOL_ATTACKS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D59_HUMAN_IN_THE_LOOP]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D61_BACKEND_APIS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D62_PRODUCTION_DATABASES]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D63_QUEUES_WORKERS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D64_STREAMING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D66_FRONTEND_FUNDAMENTALS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D67_AGENT_UI]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D68_DEPLOYMENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D69_PRODUCTION_CONCERNS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D70_PROJECT_AGENT_SAAS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D71_BROWSER_COMPUTER_AGENTS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D72_CODE_SANDBOX_AGENTS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D73_DYNAMIC_TOOLS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D74_AGENTIC_CODING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D75_PROJECT_AUTONOMOUS_WORKFLOW]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D76_DISCOVERY]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D77_ARCHITECTURE]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D78_BUILD]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D79_HARDEN]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_06]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# משוב מנומק על עבודה

כתובת: `/api/agents/evaluate`

פעולות HTTP: `POST`.

היקף הרשאה: `own`.

**מצב המימוש: קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.**

משוב מייעץ על הגשה השייכת למשתמש, מול המחוון הקפוא שלה. הקשר כולל רק ראיות שהותר לקרוא, ומפרט אילו קבצים או חלקים נבדקו. משוב AI אינו החלטת בודק אנושי ואינו משנה ציונים או שליטה.

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/app/api/agents/evaluate/route.ts)

בקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.

## קשרים במפת הידע

- [[00_ORCHESTRATION/System-Policies|הרשאות, מידע פרטי וגבולות משוב]] — כללי הרשאה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — ממשק הפעלה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_01|הוכחה מעשית · מדדי פרסום ומשפך]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_02|הוכחה מעשית · יבוא נתוני קמפיינים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_03|הוכחה מעשית · קריאייטיב והשערות לניסוי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_04|הוכחה מעשית · דף נחיתה ומדידה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_05|הוכחה מעשית · המלצות תקציב וטיוטות שינוי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_ADS_06|הוכחה מעשית · מבחן מסכם: עוזר קמפיינים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AGT_01|הוכחה מעשית · MCP, ‏A2A ותקשורת בין סוכנים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_01|הוכחה מעשית · אוטומציה ראשונה ב־n8n]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_02|הוכחה מעשית · חיבור גיליון, דוא״ל ומערכת CRM]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_03|הוכחה מעשית · שלב AI בתוך תהליך קבוע]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_04|הוכחה מעשית · כשלים, ניסיונות חוזרים וכפילויות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_05|הוכחה מעשית · אישור אנושי בתהליך חזותי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_06|הוכחה מעשית · העברת תהליך ל־Make]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_07|הוכחה מעשית · הטמעה בסביבת Microsoft 365]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_AUT_08|הוכחה מעשית · מבחן מסכם: מערכת אוטומציה עסקית]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_01|הוכחה מעשית · בירור צרכים ופגישת אפיון]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_02|הוכחה מעשית · בחירת פיילוט לפי ערך וסיכון]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_03|הוכחה מעשית · הצעת עבודה וקריטריוני קבלה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_04|הוכחה מעשית · חשבונות לקוח, מידע והרשאות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_05|הוכחה מעשית · פיילוט, הדרכת עובדים ומסירה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_BIZ_06|הוכחה מעשית · מבחן מסכם: הצגת פתרון ללקוח]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_01|הוכחה מעשית · מודל נתונים ללקוחות ולעסקאות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_02|הוכחה מעשית · יבוא לקוחות ומניעת כפילות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_03|הוכחה מעשית · סיווג לידים ומעקב מכירות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_04|הוכחה מעשית · הצעות עבודה מתוך קטלוג]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_05|הוכחה מעשית · שירות בכמה ערוצים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_06|הוכחה מעשית · סביבת עבודה לעובדים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_07|הוכחה מעשית · מלאי, מוצרים והזמנות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_08|הוכחה מעשית · מבחן מסכם: מערכת עבודה לעסק]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_01|הוכחה מעשית · עוזר נתונים עסקיים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_02|הוכחה מעשית · כללים, חיזוי קלאסי ו־LLM]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_03|הוכחה מעשית · מודלים מקומיים ומשאבי חומרה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_DAT_04|הוכחה מעשית · Prompting, ‏RAG ו־Fine-tuning]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FIRST_AI_PROGRAM|מתיקייה ריקה לתוכנית עובדת]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_01|הוכחה מעשית · מפת עולם ה־AI]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_02|הוכחה מעשית · בחירת מודלים לפי מדידה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_03|הוכחה מעשית · מסמכים, תמונות וקול כקלט]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FND_04|הוכחה מעשית · מיפוי צורך עסקי ופיילוט]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_01|הוכחה מעשית · בריף מותג וקהל]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_02|הוכחה מעשית · מחקר קהל ומתחרים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_03|הוכחה מעשית · אסטרטגיית תוכן ולוח עבודה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_04|הוכחה מעשית · כתיבה ועריכה בעברית]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_05|הוכחה מעשית · מקור אחד לכמה פורמטים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_06|הוכחה מעשית · יצירת תמונות ועריכה לפי בריף]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_07|הוכחה מעשית · וידאו: מתסריט לתוצר]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_08|הוכחה מעשית · קריינות, תמלול ותרגום]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_09|הוכחה מעשית · SEO ואישור פרסום]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_MKT_10|הוכחה מעשית · מבחן מסכם: סטודיו תוכן עסקי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_01|הוכחה מעשית · תמלול שיחות ובדיקת דיוק]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_02|הוכחה מעשית · טיפול אחרי שיחה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_03|הוכחה מעשית · ממשק קולי עם תמלול וקריינות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_04|הוכחה מעשית · שיחה חיה וקטיעות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_05|הוכחה מעשית · העברה לאדם ותיאום פגישות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_VOI_06|הוכחה מעשית · מבחן מסכם: עוזר קולי עסקי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D02_PYTHON_FOR_AGENT_BUILDERS_I|הוכחה מעשית · Python לבוני סוכנים · חלק א׳]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II|הוכחה מעשית · Python לבוני סוכנים · חלק ב׳]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D04_HTTP_APIS|הוכחה מעשית · HTTP וממשקי API]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D05_PROJECT_AGENT_ZERO|הוכחה מעשית · פרויקט: Agent Zero]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK|הוכחה מעשית · איך אפליקציות LLM פועלות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D07_CONTEXT_ENGINEERING|הוכחה מעשית · הנדסת הקשר]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D08_STRUCTURED_OUTPUTS|הוכחה מעשית · פלט מובנה ואימות נתונים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D09_MODEL_RELIABILITY|הוכחה מעשית · אמינות, ביסוס ואי־ודאות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE|הוכחה מעשית · פרויקט: מנוע קליטת פניות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D11_WHAT_MAKES_SOMETHING_AN_AGENT|הוכחה מעשית · מה הופך מערכת לסוכן?]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D12_TOOL_CALLING|הוכחה מעשית · קריאות לכלים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D13_AGENT_LOOP|הוכחה מעשית · לולאת סוכן ידנית]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D14_RELIABILITY_FAILURE_HANDLING|הוכחה מעשית · טיפול בכשלים וגבולות סוכן]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D15_PROJECT_AGENT_FROM_SCRATCH|הוכחה מעשית · פרויקט: סוכן מאפס]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D16_TASK_DECOMPOSITION|הוכחה מעשית · פירוק משימות מחקר]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D17_SEARCH_EVIDENCE|הוכחה מעשית · חיפוש ואיכות ראיות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D18_ITERATIVE_RESEARCH|הוכחה מעשית · מחקר איטרטיבי ותנאי עצירה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D19_RESEARCH_QUALITY|הוכחה מעשית · אימות דוח מחקר]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W04D20_BOSS_LEVEL_1_RESEARCH_AGENT|הוכחה מעשית · מבחן מסכם: סוכן מחקר]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D21_DATABASES|הוכחה מעשית · מסדי נתונים ו־SQL]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D22_STATE|הוכחה מעשית · מצב שיחה ומצב תהליך]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D23_AGENT_MEMORY|הוכחה מעשית · סוגי זיכרון לסוכנים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D24_MEMORY_QUALITY|הוכחה מעשית · איכות ועדכון זיכרון]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT|הוכחה מעשית · פרויקט: סוכן זיכרון אישי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D26_EMBEDDINGS|הוכחה מעשית · Embeddings ודמיון סמנטי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL|הוכחה מעשית · קליטת מסמכים וחלוקה לקטעים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING|הוכחה מעשית · שליפה משולבת ודירוג מחדש]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D29_RAG_FAILURE_MODES|הוכחה מעשית · כשלים במערכות RAG]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT|הוכחה מעשית · פרויקט: עוזר ידע ארגוני]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D31_PRODUCTION_APIS|הוכחה מעשית · ממשקי API עסקיים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D32_TOOL_DESIGN|הוכחה מעשית · תכנון כלים עסקיים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D33_MCP|הוכחה מעשית · MCP: חיבור כלים והקשר]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D34_SIDE_EFFECTS_PERMISSIONS|הוכחה מעשית · תופעות לוואי והרשאות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D35_PROJECT_OPERATIONS_AGENT|הוכחה מעשית · פרויקט: סוכן תפעול]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D36_RESPONSES_API|הוכחה מעשית · אינטגרציה ישירה עם Responses API]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D37_AGENTS_SDK|הוכחה מעשית · SDK לסוכנים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS|הוכחה מעשית · סביבות הרצה מנוהלות ושמירת מצב]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D39_LANGGRAPH|הוכחה מעשית · תהליכי גרף עם LangGraph]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE|הוכחה מעשית · מבחן מסכם: שתי ארכיטקטורות לאותה מערכת]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW|הוכחה מעשית · תהליכים דטרמיניסטיים עם AI]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D42_ROUTERS|הוכחה מעשית · ניתוב פניות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D43_PARALLEL_WORK|הוכחה מעשית · עבודה במקביל]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D44_LONG_RUNNING_WORKFLOWS|הוכחה מעשית · תהליכים ארוכים והתאוששות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W09D45_PROJECT_DURABLE_WORKFLOW_AGENT|הוכחה מעשית · פרויקט: תהליך עבודה שנמשך לאחר תקלה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D46_WHEN_MULTI_AGENT_MAKES_SENSE|הוכחה מעשית · מתי כמה סוכנים מועילים?]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D47_MANAGER_PATTERN|הוכחה מעשית · מנהל ומומחים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D48_HANDOFFS|הוכחה מעשית · העברת אחריות בין סוכנים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D49_SHARED_STATE_COORDINATION|הוכחה מעשית · מצב משותף ותיאום]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W10D50_PROJECT_AI_COMPANY|הוכחה מעשית · פרויקט: צוות AI עסקי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D51_WHY_DEMOS_LIE|הוכחה מעשית · למה הדגמה אינה בדיקת איכות?]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D52_EVALUATION_DATASET_DESIGN|הוכחה מעשית · תכנון נתוני הערכה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D53_GRADERS|הוכחה מעשית · מחוונים ושופטים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D54_TRACING|הוכחה מעשית · תיעוד ריצות וניטור]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W11D55_PROJECT_AGENT_QUALITY_LAB|הוכחה מעשית · פרויקט: מעבדת איכות לסוכן]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D56_PROMPT_INJECTION|הוכחה מעשית · הזרקת הוראות זדוניות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D57_TOOL_ATTACKS|הוכחה מעשית · תקיפות כלים וחשיפת מידע]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION|הוכחה מעשית · זהות, הרשאה ובידוד לקוחות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D59_HUMAN_IN_THE_LOOP|הוכחה מעשית · אישור אנושי וחידוש תהליך]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W12D60_BOSS_LEVEL_3_RED_TEAM|הוכחה מעשית · מבחן מסכם: בדיקת תקיפה ותיקון]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D61_BACKEND_APIS|הוכחה מעשית · ממשקי API בצד השרת]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D62_PRODUCTION_DATABASES|הוכחה מעשית · PostgreSQL ונתונים לפרודקשן]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D63_QUEUES_WORKERS|הוכחה מעשית · תורים ועובדים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D64_STREAMING|הוכחה מעשית · Streaming ואירועי ריצה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE|הוכחה מעשית · פרויקט: שירות Agent API]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D66_FRONTEND_FUNDAMENTALS|הוכחה מעשית · React ו־Next.js למערכות AI]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D67_AGENT_UI|הוכחה מעשית · ממשק לסוכן ולפעולותיו]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D68_DEPLOYMENT|הוכחה מעשית · פריסה וסביבות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D69_PRODUCTION_CONCERNS|הוכחה מעשית · עלות, ביצועים וניטור]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W14D70_PROJECT_AGENT_SAAS|הוכחה מעשית · פרויקט: מוצר AI עסקי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D71_BROWSER_COMPUTER_AGENTS|הוכחה מעשית · סוכני דפדפן ומחשב]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D72_CODE_SANDBOX_AGENTS|הוכחה מעשית · Sandbox וסוכני קוד]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D73_DYNAMIC_TOOLS|הוכחה מעשית · גילוי כלים דינמי]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D74_AGENTIC_CODING|הוכחה מעשית · סוכן כתיבת קוד מבוקר]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W15D75_PROJECT_AUTONOMOUS_WORKFLOW|הוכחה מעשית · פרויקט: תהליך אוטונומי מבוקר]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D76_DISCOVERY|הוכחה מעשית · פרויקט גמר: גילוי צרכים]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D77_ARCHITECTURE|הוכחה מעשית · פרויקט גמר: ארכיטקטורה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D78_BUILD|הוכחה מעשית · פרויקט גמר: בנייה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D79_HARDEN|הוכחה מעשית · פרויקט גמר: הקשחה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION|הוכחה מעשית · מבחן גמר: פתרון עסקי מלא]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_01|הוכחה מעשית · תכנון אתר ומסע משתמש]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_02|הוכחה מעשית · עיצוב, RTL ונגישות]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_03|הוכחה מעשית · בניית אתר בעזרת AI ובדיקת הקוד]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_04|הוכחה מעשית · טפסים וחיבור ל־CRM]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_05|הוכחה מעשית · בדיקות לפני פריסה]] — ראיות והגשות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_WEB_06|הוכחה מעשית · מבחן מסכם: אתר המחובר למערכת AI]] — ראיות והגשות
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — ממשק
