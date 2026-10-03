---
generated: true
schema_version: 1
kind: "source"
entity_id: "NEXTJS"
curriculum_version: "2.2.0"
source_id: "NEXTJS"
url: "https://nextjs.org/docs/app"
last_verified: null
technology_ids: []
related: ["[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/Index]]","[[02_CURRICULUM/2.2.0/lessons/W14D66_FRONTEND_FUNDAMENTALS]]","[[02_CURRICULUM/2.2.0/lessons/W14D68_DEPLOYMENT]]","[[02_CURRICULUM/2.2.0/lessons/WEB_01]]","[[02_CURRICULUM/2.2.0/lessons/WEB_03]]","[[02_CURRICULUM/2.2.0/lessons/WEB_06]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D66_FRONTEND_FUNDAMENTALS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D68_DEPLOYMENT]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_WEB_01]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_WEB_03]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_WEB_06]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D66_FRONTEND_FUNDAMENTALS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D66_FRONTEND_FUNDAMENTALS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D66_FRONTEND_FUNDAMENTALS_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D68_DEPLOYMENT_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D68_DEPLOYMENT_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D68_DEPLOYMENT_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_01_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_01_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_01_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_03_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_03_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_03_TRANSFER]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_06_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_06_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_06_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/Knowledge-Updates]]"]
---

# Next.js App Router

[למקור הראשוני](https://nextjs.org/docs/app)

מפרסם: Vercel

סוג: official-docs

הקטלוג אינו מציין אימות טכני מלא של מקור זה.

רשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.

## קשרים במפת הידע

- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — מקור למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — מקור למומחה
- [[02_CURRICULUM/2.2.0/Index|כל הפרקים והשיעורים]] — מקור
- [[02_CURRICULUM/2.2.0/lessons/W14D66_FRONTEND_FUNDAMENTALS|React ו־Next.js למערכות AI]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/W14D68_DEPLOYMENT|פריסה וסביבות]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/WEB_01|תכנון אתר ומסע משתמש]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/WEB_03|בניית אתר בעזרת AI ובדיקת הקוד]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/lessons/WEB_06|מבחן מסכם: אתר המחובר למערכת AI]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D66_FRONTEND_FUNDAMENTALS|בדיקת הבנה: תשובה לבקשה ישנה הגיעה אחרי תשובה לבקשה החדשה. מה צריך הממשק למנוע?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W14D68_DEPLOYMENT|בדיקת הבנה: השירות נארז ב־Docker. איזו מסקנה אינה מוצדקת מהאריזה לבדה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_WEB_01|בדיקת הבנה: בטופס פנייה מופיע ״הושלם״ מיד לאחר שהמשימה נכנסה לתור. מהו התיקון המתאים למסע המשתמש?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_WEB_03|בדיקת הבנה: כרטיס בדף שנוצר בעזרת AI נראה טוב במחשב אך חורג מרוחב הטלפון. מה נדרש כדי להשלים את הבנייה?]] — מקור השאלה
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_WEB_06|בדיקת הבנה: העוזר באתר מציג תשובות קבועות לצורכי הדגמה. כיצד נכון לתאר אותו למשתמש?]] — מקור השאלה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D66_FRONTEND_FUNDAMENTALS_BUILD|תבנית טקסט: React ו־Next.js למערכות AI · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D66_FRONTEND_FUNDAMENTALS_DIAGNOSE|תבנית טקסט: React ו־Next.js למערכות AI · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D66_FRONTEND_FUNDAMENTALS_TRANSFER|תבנית טקסט: React ו־Next.js למערכות AI · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D68_DEPLOYMENT_BUILD|תבנית טקסט: פריסה וסביבות · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D68_DEPLOYMENT_DIAGNOSE|תבנית טקסט: פריסה וסביבות · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W14D68_DEPLOYMENT_TRANSFER|תבנית טקסט: פריסה וסביבות · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_01_BUILD|תבנית טקסט: תכנון אתר ומסע משתמש · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_01_DIAGNOSE|תבנית טקסט: תכנון אתר ומסע משתמש · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_01_TRANSFER|תבנית טקסט: תכנון אתר ומסע משתמש · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_03_BUILD|תבנית טקסט: בניית אתר בעזרת AI ובדיקת הקוד · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_03_DIAGNOSE|תבנית טקסט: בניית אתר בעזרת AI ובדיקת הקוד · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_03_TRANSFER|תבנית טקסט: בניית אתר בעזרת AI ובדיקת הקוד · TRANSFER]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_06_BUILD|תבנית טקסט: מבחן מסכם: אתר המחובר למערכת AI · BUILD]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_06_DIAGNOSE|תבנית טקסט: מבחן מסכם: אתר המחובר למערכת AI · DIAGNOSE]] — מקור לשיעור
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_WEB_06_TRANSFER|תבנית טקסט: מבחן מסכם: אתר המחובר למערכת AI · TRANSFER]] — מקור לשיעור
- [[04_AUTOMATIONS_AND_APIS/Knowledge-Updates|רענון מקורות וביקורת תוכן]] — מקור בקטלוג
