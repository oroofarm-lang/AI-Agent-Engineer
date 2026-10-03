---
generated: true
schema_version: 1
kind: "source"
entity_id: "OPENAI_QUICKSTART"
curriculum_version: "2.2.0"
source_id: "OPENAI_QUICKSTART"
url: "https://developers.openai.com/api/docs/quickstart"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Model-Data]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/MKT_04]]","[[02_CURRICULUM/2.2.0/lessons/W01D01_FIRST_AI_PROGRAM]]","[[02_CURRICULUM/2.2.0/lessons/W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[02_CURRICULUM/2.2.0/lessons/W02D07_CONTEXT_ENGINEERING]]","[[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_MKT_04]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D01_FIRST_AI_PROGRAM]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W02D06_HOW_LLM_APPLICATIONS_WORK]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W02D07_CONTEXT_ENGINEERING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W08D36_RESPONSES_API]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FIRST_AI_PROGRAM_CRITERION_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FIRST_AI_PROGRAM_CRITERION_GIT_SECRETS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FIRST_AI_PROGRAM_CRITERION_REBUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FIRST_AI_PROGRAM_CRITERION_REQUEST_PATH]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_04_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_04_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_04_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# OpenAI quickstart

[למקור הראשוני](https://developers.openai.com/api/docs/quickstart)

מפרסם: OpenAI

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — מקור למומחה
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — מקור למומחה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/MKT_04|כתיבה ועריכה בעברית]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W01D01_FIRST_AI_PROGRAM|תוכנית ה־AI הראשונה שלך]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W02D06_HOW_LLM_APPLICATIONS_WORK|איך אפליקציות LLM פועלות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W02D07_CONTEXT_ENGINEERING|הנדסת הקשר]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W08D36_RESPONSES_API|אינטגרציה ישירה עם Responses API]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_MKT_04|בדיקת הבנה: בטיוטה בעברית מופיעה הבטחה על מוצר שאינה קיימת במידע שסופק. מה צריך לעשות בעריכה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D01_FIRST_AI_PROGRAM|בדיקת הבנה: מה תפקידו של ה־SDK בתוכנית app.py שבשיעור?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W02D06_HOW_LLM_APPLICATIONS_WORK|בדיקת הבנה: מה ההבדל בין טוקן לבין מילה שלמה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W02D07_CONTEXT_ENGINEERING|בדיקת הבנה: מסמך שצורף לעוזר פניות כולל הוראה לשנות את המשימה. כיצד צריך להתייחס אליה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W08D36_RESPONSES_API|בדיקת הבנה: מדוע מחזירים תוצאת כלי עם ה־call_id המתאים?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FIRST_AI_PROGRAM_CRITERION_DIAGNOSE|תבנית טקסט: תוכנית ה־AI הראשונה שלך · CRITERION_DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FIRST_AI_PROGRAM_CRITERION_GIT_SECRETS|תבנית טקסט: תוכנית ה־AI הראשונה שלך · CRITERION_GIT_SECRETS]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FIRST_AI_PROGRAM_CRITERION_REBUILD|תבנית טקסט: תוכנית ה־AI הראשונה שלך · CRITERION_REBUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FIRST_AI_PROGRAM_CRITERION_REQUEST_PATH|תבנית טקסט: תוכנית ה־AI הראשונה שלך · CRITERION_REQUEST_PATH]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_04_BUILD|תבנית טקסט: כתיבה ועריכה בעברית · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_04_DIAGNOSE|תבנית טקסט: כתיבה ועריכה בעברית · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_04_TRANSFER|תבנית טקסט: כתיבה ועריכה בעברית · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_BUILD|תבנית טקסט: איך אפליקציות LLM פועלות · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_DIAGNOSE|תבנית טקסט: איך אפליקציות LLM פועלות · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D06_HOW_LLM_APPLICATIONS_WORK_TRANSFER|תבנית טקסט: איך אפליקציות LLM פועלות · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_BUILD|תבנית טקסט: הנדסת הקשר · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_DIAGNOSE|תבנית טקסט: הנדסת הקשר · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W02D07_CONTEXT_ENGINEERING_TRANSFER|תבנית טקסט: הנדסת הקשר · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_BUILD|תבנית טקסט: אינטגרציה ישירה עם Responses API · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_DIAGNOSE|תבנית טקסט: אינטגרציה ישירה עם Responses API · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D36_RESPONSES_API_TRANSFER|תבנית טקסט: אינטגרציה ישירה עם Responses API · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG|OpenAI API changelog]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS|OpenAI model catalog]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS|OpenAI News]] — תיעוד בקורס
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — תיעוד בקורס
