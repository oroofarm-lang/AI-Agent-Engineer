---
generated: true
schema_version: 1
kind: "source"
entity_id: "SEARCH_SECURITY"
curriculum_version: "2.2.0"
source_id: "SEARCH_SECURITY"
url: "https://learn.microsoft.com/en-us/azure/search/search-security-trimming-for-azure-search"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/CRM_06]]","[[02_CURRICULUM/2.2.0/lessons/W05D23_AGENT_MEMORY]]","[[02_CURRICULUM/2.2.0/lessons/W05D24_MEMORY_QUALITY]]","[[02_CURRICULUM/2.2.0/lessons/W05D25_PROJECT_PERSONAL_MEMORY_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W06D26_EMBEDDINGS]]","[[02_CURRICULUM/2.2.0/lessons/W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[02_CURRICULUM/2.2.0/lessons/W06D28_HYBRID_RETRIEVAL_RERANKING]]","[[02_CURRICULUM/2.2.0/lessons/W06D29_RAG_FAILURE_MODES]]","[[02_CURRICULUM/2.2.0/lessons/W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[02_CURRICULUM/2.2.0/lessons/W12D58_AUTHENTICATION_AUTHORIZATION]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_06]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W05D23_AGENT_MEMORY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W05D24_MEMORY_QUALITY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W05D25_PROJECT_PERSONAL_MEMORY_AGENT]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D26_EMBEDDINGS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D28_HYBRID_RETRIEVAL_RERANKING]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D29_RAG_FAILURE_MODES]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D58_AUTHENTICATION_AUTHORIZATION]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_06_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_06_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_06_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D23_AGENT_MEMORY_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D23_AGENT_MEMORY_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D23_AGENT_MEMORY_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D24_MEMORY_QUALITY_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D24_MEMORY_QUALITY_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D24_MEMORY_QUALITY_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# Azure search security trimming

[למקור הראשוני](https://learn.microsoft.com/en-us/azure/search/search-security-trimming-for-azure-search)

מפרסם: Microsoft

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — מקור למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/CRM_06|סביבת עבודה לעובדים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W05D23_AGENT_MEMORY|סוגי זיכרון לסוכנים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W05D24_MEMORY_QUALITY|איכות ועדכון זיכרון]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W05D25_PROJECT_PERSONAL_MEMORY_AGENT|פרויקט: סוכן זיכרון אישי]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D26_EMBEDDINGS|Embeddings ודמיון סמנטי]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D27_CHUNKING_VECTOR_RETRIEVAL|קליטת מסמכים וחלוקה לקטעים]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D28_HYBRID_RETRIEVAL_RERANKING|שליפה משולבת ודירוג מחדש]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D29_RAG_FAILURE_MODES|כשלים במערכות RAG]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D30_PROJECT_KNOWLEDGE_AGENT|פרויקט: עוזר ידע ארגוני]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W12D58_AUTHENTICATION_AUTHORIZATION|זהות, הרשאה ובידוד לקוחות]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_CRM_06|בדיקת הבנה: עובד משנה את כתובת העמוד כדי לפתוח פנייה שלא הוקצתה לו. מה צריכה מערכת ההרשאות לבדוק?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W05D23_AGENT_MEMORY|בדיקת הבנה: משתמש אומר: ״היום אני מעדיף שיחה קצרה״. מה צריך לברר לפני שמירתה כהעדפה ארוכת טווח?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W05D24_MEMORY_QUALITY|בדיקת הבנה: רשומה חדשה סותרת זיכרון קיים. האם תאריך חדש יותר מספיק כדי לקבל אותה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W05D25_PROJECT_PERSONAL_MEMORY_AGENT|בדיקת הבנה: משתמש ב׳ מבקש לקרוא זיכרון השייך למשתמש א׳. מה על פעולת retrieve לבדוק?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D26_EMBEDDINGS|בדיקת הבנה: לשני מוצרים תיאור דומה אבל מק״ט שונה. מדוע כדאי לבדוק גם חיפוש לפי מילים?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D27_CHUNKING_VECTOR_RETRIEVAL|בדיקת הבנה: מדוע שומרים לכל קטע document_id, version, page ו־chunk_id?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D28_HYBRID_RETRIEVAL_RERANKING|בדיקת הבנה: קטע של לקוח אחר מתאים מאוד לשאלה. מתי צריך לסנן אותו?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D29_RAG_FAILURE_MODES|בדיקת הבנה: השליפה החזירה את הקטע הנכון, אבל התשובה הוסיפה טענה שאינה בו. איזה כשל יש לבדוק?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W06D30_PROJECT_KNOWLEDGE_AGENT|בדיקת הבנה: איזה ציטוט מתאים לתשובת עוזר הידע הארגוני?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W12D58_AUTHENTICATION_AUTHORIZATION|בדיקת הבנה: משתמש נכנס לחשבון ושינה tenant_id בבקשה. מדוע אין בכך הרשאה לקרוא לקוח אחר?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_06_BUILD|תבנית טקסט: סביבת עבודה לעובדים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_06_DIAGNOSE|תבנית טקסט: סביבת עבודה לעובדים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_06_TRANSFER|תבנית טקסט: סביבת עבודה לעובדים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D23_AGENT_MEMORY_BUILD|תבנית טקסט: סוגי זיכרון לסוכנים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D23_AGENT_MEMORY_DIAGNOSE|תבנית טקסט: סוגי זיכרון לסוכנים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D23_AGENT_MEMORY_TRANSFER|תבנית טקסט: סוגי זיכרון לסוכנים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D24_MEMORY_QUALITY_BUILD|תבנית טקסט: איכות ועדכון זיכרון · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D24_MEMORY_QUALITY_DIAGNOSE|תבנית טקסט: איכות ועדכון זיכרון · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D24_MEMORY_QUALITY_TRANSFER|תבנית טקסט: איכות ועדכון זיכרון · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT_BUILD|תבנית טקסט: פרויקט: סוכן זיכרון אישי · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT_DIAGNOSE|תבנית טקסט: פרויקט: סוכן זיכרון אישי · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D25_PROJECT_PERSONAL_MEMORY_AGENT_TRANSFER|תבנית טקסט: פרויקט: סוכן זיכרון אישי · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_BUILD|תבנית טקסט: Embeddings ודמיון סמנטי · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_DIAGNOSE|תבנית טקסט: Embeddings ודמיון סמנטי · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_TRANSFER|תבנית טקסט: Embeddings ודמיון סמנטי · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_BUILD|תבנית טבלה: קליטת מסמכים וחלוקה לקטעים · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_DIAGNOSE|תבנית טבלה: קליטת מסמכים וחלוקה לקטעים · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_TRANSFER|תבנית טקסט: קליטת מסמכים וחלוקה לקטעים · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_BUILD|תבנית טקסט: שליפה משולבת ודירוג מחדש · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_DIAGNOSE|תבנית טקסט: שליפה משולבת ודירוג מחדש · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_TRANSFER|תבנית טקסט: שליפה משולבת ודירוג מחדש · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_BUILD|תבנית טקסט: כשלים במערכות RAG · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_DIAGNOSE|תבנית טקסט: כשלים במערכות RAG · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_TRANSFER|תבנית טקסט: כשלים במערכות RAG · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_BUILD|תבנית טקסט: פרויקט: עוזר ידע ארגוני · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_DIAGNOSE|תבנית טקסט: פרויקט: עוזר ידע ארגוני · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_TRANSFER|תבנית טקסט: פרויקט: עוזר ידע ארגוני · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_BUILD|תבנית טקסט: זהות, הרשאה ובידוד לקוחות · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_DIAGNOSE|תבנית טקסט: זהות, הרשאה ובידוד לקוחות · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W12D58_AUTHENTICATION_AUTHORIZATION_TRANSFER|תבנית טקסט: זהות, הרשאה ובידוד לקוחות · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
