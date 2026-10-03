---
generated: true
schema_version: 1
kind: "skill"
entity_id: "HTTP_APIS"
curriculum_version: "2.2.0"
skill_id: "HTTP_APIS"
prerequisite_skill_ids: []
related: ["[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Voice-Audio]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/AUT_01]]","[[02_CURRICULUM/2.2.0/lessons/AUT_02]]","[[02_CURRICULUM/2.2.0/lessons/AUT_03]]","[[02_CURRICULUM/2.2.0/lessons/AUT_04]]","[[02_CURRICULUM/2.2.0/lessons/AUT_05]]","[[02_CURRICULUM/2.2.0/lessons/AUT_06]]","[[02_CURRICULUM/2.2.0/lessons/AUT_07]]","[[02_CURRICULUM/2.2.0/lessons/AUT_08]]","[[02_CURRICULUM/2.2.0/lessons/CRM_01]]","[[02_CURRICULUM/2.2.0/lessons/CRM_02]]","[[02_CURRICULUM/2.2.0/lessons/CRM_03]]","[[02_CURRICULUM/2.2.0/lessons/CRM_04]]","[[02_CURRICULUM/2.2.0/lessons/CRM_05]]","[[02_CURRICULUM/2.2.0/lessons/CRM_06]]","[[02_CURRICULUM/2.2.0/lessons/CRM_07]]","[[02_CURRICULUM/2.2.0/lessons/CRM_08]]","[[02_CURRICULUM/2.2.0/lessons/W01D01_FIRST_AI_PROGRAM]]","[[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[02_CURRICULUM/2.2.0/lessons/W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W01D05_PROJECT_AGENT_ZERO]]","[[02_CURRICULUM/2.2.0/lessons/W07D31_PRODUCTION_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W07D32_TOOL_DESIGN]]","[[02_CURRICULUM/2.2.0/lessons/W07D33_MCP]]","[[02_CURRICULUM/2.2.0/lessons/W07D34_SIDE_EFFECTS_PERMISSIONS]]","[[02_CURRICULUM/2.2.0/lessons/W07D35_PROJECT_OPERATIONS_AGENT]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_01]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_02]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_03]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_04]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_05]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_06]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_07]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_08]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FIRST_AI_PROGRAM]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D04_HTTP_APIS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D05_PROJECT_AGENT_ZERO]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D31_PRODUCTION_APIS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D32_TOOL_DESIGN]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D33_MCP]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D34_SIDE_EFFECTS_PERMISSIONS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D35_PROJECT_OPERATIONS_AGENT]]","[[04_AUTOMATIONS_AND_APIS/technologies/MCP]]","[[04_AUTOMATIONS_AND_APIS/technologies/N8N]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# HTTP/APIs

תחום: Programming

יכולת הנדסית: HTTP/APIs. הבנה, מימוש, ולבסוף תכנון וניפוי שגיאות באופן עצמאי.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — מומחיות במיומנות
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — מומחיות במיומנות
- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — מומחיות במיומנות
- [[01_AGENTS/Agent-Voice-Audio|קול, תמלול ושיחה]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/AUT_01|אוטומציה ראשונה ב־n8n]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_02|חיבור גיליון, דוא״ל ומערכת CRM]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_03|שלב AI בתוך תהליך קבוע]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_04|כשלים, ניסיונות חוזרים וכפילויות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_05|אישור אנושי בתהליך חזותי]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_06|העברת תהליך ל־Make]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_07|הטמעה בסביבת Microsoft 365]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/AUT_08|מבחן מסכם: מערכת אוטומציה עסקית]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_01|מודל נתונים ללקוחות ולעסקאות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_02|יבוא לקוחות ומניעת כפילות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_03|סיווג לידים ומעקב מכירות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_04|הצעות עבודה מתוך קטלוג]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_05|שירות בכמה ערוצים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_06|סביבת עבודה לעובדים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_07|מלאי, מוצרים והזמנות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/CRM_08|מבחן מסכם: מערכת עבודה לעסק]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W01D01_FIRST_AI_PROGRAM|תוכנית ה־AI הראשונה שלך]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|Python לבוני סוכנים · חלק א׳]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W01D03_PYTHON_FOR_AGENT_BUILDERS_II|Python לבוני סוכנים · חלק ב׳]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS|HTTP וממשקי API]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W01D05_PROJECT_AGENT_ZERO|פרויקט: Agent Zero]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D31_PRODUCTION_APIS|ממשקי API עסקיים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D32_TOOL_DESIGN|תכנון כלים עסקיים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D33_MCP|MCP: חיבור כלים והקשר]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D34_SIDE_EFFECTS_PERMISSIONS|תופעות לוואי והרשאות]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W07D35_PROJECT_OPERATIONS_AGENT|פרויקט: סוכן תפעול]] — מיומנות בשיעור
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_01|הוכחה מעשית · מודל נתונים ללקוחות ולעסקאות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_02|הוכחה מעשית · יבוא לקוחות ומניעת כפילות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_03|הוכחה מעשית · סיווג לידים ומעקב מכירות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_04|הוכחה מעשית · הצעות עבודה מתוך קטלוג]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_05|הוכחה מעשית · שירות בכמה ערוצים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_06|הוכחה מעשית · סביבת עבודה לעובדים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_07|הוכחה מעשית · מלאי, מוצרים והזמנות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_CRM_08|הוכחה מעשית · מבחן מסכם: מערכת עבודה לעסק]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FIRST_AI_PROGRAM|מתיקייה ריקה לתוכנית עובדת]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II|הוכחה מעשית · Python לבוני סוכנים · חלק ב׳]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D04_HTTP_APIS|הוכחה מעשית · HTTP וממשקי API]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D05_PROJECT_AGENT_ZERO|הוכחה מעשית · פרויקט: Agent Zero]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D31_PRODUCTION_APIS|הוכחה מעשית · ממשקי API עסקיים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D32_TOOL_DESIGN|הוכחה מעשית · תכנון כלים עסקיים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D33_MCP|הוכחה מעשית · MCP: חיבור כלים והקשר]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D34_SIDE_EFFECTS_PERMISSIONS|הוכחה מעשית · תופעות לוואי והרשאות]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W07D35_PROJECT_OPERATIONS_AGENT|הוכחה מעשית · פרויקט: סוכן תפעול]] — מיומנות שנבדקת
- [[04_AUTOMATIONS_AND_APIS/technologies/MCP|Model Context Protocol]] — מיומנות קשורה
- [[04_AUTOMATIONS_AND_APIS/technologies/N8N|n8n]] — מיומנות קשורה
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — מיומנות קשורה
