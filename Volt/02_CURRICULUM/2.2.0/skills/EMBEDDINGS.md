---
generated: true
schema_version: 1
kind: "skill"
entity_id: "EMBEDDINGS"
curriculum_version: "2.2.0"
skill_id: "EMBEDDINGS"
prerequisite_skill_ids: []
related: ["[[01_AGENTS/Agent-Knowledge-RAG]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W06D26_EMBEDDINGS]]","[[02_CURRICULUM/2.2.0/lessons/W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[02_CURRICULUM/2.2.0/lessons/W06D28_HYBRID_RETRIEVAL_RERANKING]]","[[02_CURRICULUM/2.2.0/lessons/W06D29_RAG_FAILURE_MODES]]","[[02_CURRICULUM/2.2.0/lessons/W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[02_CURRICULUM/2.2.0/skills/RETRIEVAL]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D26_EMBEDDINGS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D29_RAG_FAILURE_MODES]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_TRANSFER]]"]
---

# Embeddings

תחום: Knowledge

יכולת הנדסית: Embeddings. הבנה, מימוש, ולבסוף תכנון וניפוי שגיאות באופן עצמאי.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — מומחיות במיומנות
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מיומנות
- [[02_CURRICULUM/2.2.0/lessons/W06D26_EMBEDDINGS|Embeddings ודמיון סמנטי]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D27_CHUNKING_VECTOR_RETRIEVAL|קליטת מסמכים וחלוקה לקטעים]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D28_HYBRID_RETRIEVAL_RERANKING|שליפה משולבת ודירוג מחדש]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D29_RAG_FAILURE_MODES|כשלים במערכות RAG]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/lessons/W06D30_PROJECT_KNOWLEDGE_AGENT|פרויקט: עוזר ידע ארגוני]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/skills/RETRIEVAL|Retrieval]] — תלות בין מיומנויות
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D26_EMBEDDINGS|הוכחה מעשית · Embeddings ודמיון סמנטי]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL|הוכחה מעשית · קליטת מסמכים וחלוקה לקטעים]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING|הוכחה מעשית · שליפה משולבת ודירוג מחדש]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D29_RAG_FAILURE_MODES|הוכחה מעשית · כשלים במערכות RAG]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT|הוכחה מעשית · פרויקט: עוזר ידע ארגוני]] — מיומנות שנבדקת
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_BUILD|תבנית טקסט: Embeddings ודמיון סמנטי · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D26_EMBEDDINGS_TRANSFER|תבנית טקסט: Embeddings ודמיון סמנטי · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_BUILD|תבנית טבלה: קליטת מסמכים וחלוקה לקטעים · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_TRANSFER|תבנית טקסט: קליטת מסמכים וחלוקה לקטעים · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_BUILD|תבנית טקסט: שליפה משולבת ודירוג מחדש · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D28_HYBRID_RETRIEVAL_RERANKING_TRANSFER|תבנית טקסט: שליפה משולבת ודירוג מחדש · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_BUILD|תבנית טקסט: כשלים במערכות RAG · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D29_RAG_FAILURE_MODES_TRANSFER|תבנית טקסט: כשלים במערכות RAG · TRANSFER]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_BUILD|תבנית טקסט: פרויקט: עוזר ידע ארגוני · BUILD]] — מיומנות בתשובה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D30_PROJECT_KNOWLEDGE_AGENT_TRANSFER|תבנית טקסט: פרויקט: עוזר ידע ארגוני · TRANSFER]] — מיומנות בתשובה
