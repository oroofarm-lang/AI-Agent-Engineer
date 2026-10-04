import { createHash } from 'node:crypto';
import { focusedCanvas } from './vault-canvas.mjs';
import { addTemplateWorkspaces } from './vault-templates.mjs';

const stableId = /^[A-Za-z][A-Za-z0-9_.-]*$/;
const digest = (value) => createHash('sha256').update(value).digest('hex');
const quote = (value) => JSON.stringify(String(value));
const safeTitle = (value) => String(value).replace(/[\[\]|\r\n]/g, ' ');
const wikilink = (file, title) => `[[${file.replace(/\.md$/, '')}|${safeTitle(title)}]]`;

export const publicDeploymentSources = Object.freeze([
  'Dockerfile',
  '.dockerignore',
  'compose.yaml',
  'deploy/Caddyfile',
  'scripts/deployment/entrypoint.sh',
  'scripts/deployment/healthcheck.mjs',
  'scripts/deployment/smoke-test.sh',
  '.github/workflows/container.yml',
  '.github/workflows/mentor-knowledge.yml',
  'scripts/refresh-mentor-knowledge.ts',
  'scripts/cleanup-auth.ts',
  'scripts/backup-and-migrate.ts',
  'deploy/systemd/ai-course-mentor-refresh.service',
  'deploy/systemd/ai-course-mentor-refresh.timer',
  'deploy/systemd/ai-course-auth-cleanup.service',
  'deploy/systemd/ai-course-auth-cleanup.timer',
]);

/** Public source descriptors point to real files; they are not uploaded learner artifacts. */
export const publicAssetCatalog = [
  {
    id: 'DEPLOY_IMAGE',
    title: 'בניית תמונת האפליקציה',
    sourcePath: 'Dockerfile',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'DEPLOY_BUILD_EXCLUSIONS',
    title: 'הפרדת מידע פרטי מתמונת האפליקציה',
    sourcePath: '.dockerignore',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'DEPLOY_COMPOSE',
    title: 'השרת והאחסון שנשמר בין הפעלות',
    sourcePath: 'compose.yaml',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'DEPLOY_HTTPS_PROXY',
    title: 'שרת הכניסה וגבולות הבקשה',
    sourcePath: 'deploy/Caddyfile',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'DEPLOY_STARTUP',
    title: 'בדיקת הגדרות וגיבוי לפני הפעלה',
    sourcePath: 'scripts/deployment/entrypoint.sh',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'DEPLOY_READINESS',
    title: 'בדיקת מוכנות פנימית',
    sourcePath: 'scripts/deployment/healthcheck.mjs',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'DEPLOY_RESTORE_SMOKE',
    title: 'בדיקת שמירה ושחזור עם נתונים סינתטיים',
    sourcePath: 'scripts/deployment/smoke-test.sh',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'DEPLOY_CONTAINER_CI',
    title: 'בדיקות חבילת הפריסה ב־GitHub',
    sourcePath: '.github/workflows/container.yml',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'KNOWLEDGE_CI',
    title: 'גילוי מקורות ציבוריים ב־GitHub',
    sourcePath: '.github/workflows/mentor-knowledge.yml',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'KNOWLEDGE_REFRESH_CLI',
    title: 'רענון המטמון שבו המנטור משתמש',
    sourcePath: 'scripts/refresh-mentor-knowledge.ts',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'AUTH_CLEANUP_CLI',
    title: 'ניקוי רשומות אימות שפג תוקפן',
    sourcePath: 'scripts/cleanup-auth.ts',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'DEPLOY_BACKUP_MIGRATION',
    title: 'גיבוי עקבי לפני שינוי מבנה מסד הנתונים',
    sourcePath: 'scripts/backup-and-migrate.ts',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'KNOWLEDGE_HOST_SERVICE',
    title: 'שירות רענון המקורות בשרת',
    sourcePath: 'deploy/systemd/ai-course-mentor-refresh.service',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'KNOWLEDGE_HOST_TIMER',
    title: 'תזמון רענון שלוש פעמים בשבוע',
    sourcePath: 'deploy/systemd/ai-course-mentor-refresh.timer',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'AUTH_HOST_SERVICE',
    title: 'שירות לניקוי רשומות אימות זהות שפג תוקפן',
    sourcePath: 'deploy/systemd/ai-course-auth-cleanup.service',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'AUTH_HOST_TIMER',
    title: 'תזמון יומי לניקוי רשומות אימות זהות',
    sourcePath: 'deploy/systemd/ai-course-auth-cleanup.timer',
    kind: 'deployment-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Production-Reliability', 'Agent-Security-Auditor'],
  },
  {
    id: 'MENTOR_LESSON_HELP',
    title: 'בחירת רמת הסבר מתוך השיעור',
    sourcePath: 'src/components/learning/mentor-help.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Curriculum-Pedagogy', 'Agent-Hebrew-UX'],
  },
  {
    id: 'MENTOR_LESSON_HELP_STYLE',
    title: 'עיצוב אפשרויות הסבר למסכים קטנים',
    sourcePath: 'src/components/learning/mentor-help.module.css',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-UI-UX-Inspector', 'Agent-Hebrew-UX'],
  },
  {
    id: 'MENTOR_ACTIVE_TASK',
    title: 'בחירת ההקשר הנוכחי בשיעור ובתרגיל',
    sourcePath: 'src/components/learning/mentor-context.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Curriculum-Pedagogy', 'Agent-Security-Auditor'],
  },
  {
    id: 'MENTOR_COMPONENT',
    title: 'בחירת הקשר לשיחה עם המנטור',
    sourcePath: 'src/components/mentor-info.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Hebrew-UX', 'Agent-Security-Auditor'],
  },
  {
    id: 'MENTOR_TEMPLATE_CONTEXT',
    title: 'צירוף גרסת טיוטה שמורה לפי הרשאה',
    sourcePath: 'src/lib/ai/template-context.ts',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Hebrew-UX', 'Agent-Security-Auditor'],
  },
  {
    id: 'MENTOR_INPUT_CONTRACT',
    title: 'מבנה בקשות העזרה וההקשר הנבחר',
    sourcePath: 'src/lib/ai/policy.ts',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Hebrew-UX', 'Agent-Security-Auditor'],
  },
  {
    id: 'WORKSPACE_NAVIGATION_COMPONENT',
    title: 'התראה לפני מעבר כשאין אישור לשמירת העבודה',
    sourcePath: 'src/components/workspace-navigation.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-UI-UX-Inspector', 'Agent-Hebrew-UX'],
  },
  {
    id: 'TEMPLATE_WORKSPACE_COMPONENT',
    title: 'עריכת תבנית ושמירה אוטומטית',
    sourcePath: 'src/components/assessment/workspace/workspace.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-UI-UX-Inspector', 'Agent-Progress-Tracker'],
  },
  {
    id: 'TEMPLATE_TABLE_COMPONENT',
    title: 'עורך טבלאות בתוך השיעור',
    sourcePath: 'src/components/assessment/workspace/table-editor.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-UI-UX-Inspector', 'Agent-Curriculum-Pedagogy'],
  },
  {
    id: 'TEMPLATE_MARKDOWN_COMPONENT',
    title: 'עורך טקסט ותצוגה מקדימה',
    sourcePath: 'src/components/assessment/workspace/markdown-editor.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Hebrew-UX', 'Agent-Curriculum-Pedagogy'],
  },
  {
    id: 'TEMPLATE_PDF_EXPORT',
    title: 'ייצוא העבודה לקובץ PDF',
    sourcePath: 'src/lib/templates/pdf.tsx',
    kind: 'template-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-UI-UX-Inspector', 'Agent-Hebrew-UX'],
  },
  {
    id: 'TEMPLATE_PDF_MARKDOWN',
    title: 'עיצוב טקסט ותוכן Markdown ב־PDF',
    sourcePath: 'src/lib/templates/pdf-markdown.tsx',
    kind: 'template-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-UI-UX-Inspector', 'Agent-Hebrew-UX'],
  },
  {
    id: 'TEMPLATE_PDF_DIRECTION',
    title: 'כיוון כתיבה עברי בקובץ PDF',
    sourcePath: 'src/lib/templates/pdf-text.tsx',
    kind: 'template-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Hebrew-UX'],
  },
  {
    id: 'TEMPLATE_SUBMISSION_CONTRACT',
    title: 'בחירת טיוטות שמורות להגשה',
    sourcePath: 'src/lib/templates/submission.ts',
    kind: 'template-submission-schema',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Progress-Tracker', 'Agent-Security-Auditor'],
  },
  {
    id: 'TEMPLATE_DRAFT_CONTRACT',
    title: 'מבנה בקשות לשמירת טיוטות פרטיות',
    sourcePath: 'src/lib/templates/persistence.ts',
    kind: 'template-api-schema',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Curriculum-Pedagogy', 'Agent-Progress-Tracker', 'Agent-Security-Auditor'],
  },
  {
    id: 'TEMPLATE_SCHEMA',
    title: 'סכמות תבניות טקסט וטבלה',
    sourcePath: 'src/lib/templates/schema.ts',
    kind: 'template-schema',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Curriculum-Pedagogy', 'Agent-Hebrew-UX'],
  },
  {
    id: 'TEMPLATE_FORMATS',
    title: 'ייבוא וייצוא של תבניות העבודה',
    sourcePath: 'src/lib/templates/formats.ts',
    kind: 'template-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
    agentIds: ['Agent-Curriculum-Pedagogy', 'Agent-Progress-Tracker'],
  },
  {
    id: 'VAULT_SYNC_COMPONENT',
    title: 'גרסת מפת הידע ועדכון הייצוא',
    sourcePath: 'src/components/vault-sync-status.tsx',
    kind: 'ui-code',
    moduleIds: ['QUALITY', 'KNOWLEDGE'],
    agentIds: ['Agent-Curriculum-Auditor', 'Agent-Hebrew-UX'],
  },
  {
    id: 'CURRICULUM_REVIEW_COMPONENT',
    title: 'בדיקת הצעות לעדכון הקורס',
    sourcePath: 'src/components/curriculum-review.tsx',
    kind: 'ui-code',
    moduleIds: ['QUALITY', 'KNOWLEDGE'],
    agentIds: ['Agent-Curriculum-Auditor', 'Agent-Hebrew-UX'],
  },
  {
    id: 'REINFORCEMENT_COMPONENT',
    title: 'שאלת תרגול ושמירת תשובה',
    sourcePath: 'src/components/assessment/reinforcement-quiz.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
  },
  {
    id: 'BUSINESS_DATA',
    title: 'נתוני עסק לתרגול',
    sourcePath: 'public/course-data/v1/business.json',
    kind: 'fixture',
    moduleIds: ['CORE', 'CRM', 'KNOWLEDGE'],
  },
  {
    id: 'CAMPAIGNS_DATA',
    title: 'נתוני קמפיינים לתרגול',
    sourcePath: 'public/course-data/v1/campaigns.csv',
    kind: 'fixture',
    moduleIds: ['MARKETING', 'ADS', 'DATA'],
  },
  {
    id: 'CONTACTS_DATA',
    title: 'נתוני לקוחות לתרגול',
    sourcePath: 'public/course-data/v1/contacts.csv',
    kind: 'fixture',
    moduleIds: ['CRM', 'AUTOMATION'],
  },
  {
    id: 'CALL_TRANSCRIPT',
    title: 'תסריט שיחה לתרגול',
    sourcePath: 'public/course-data/v1/call.txt',
    kind: 'fixture',
    moduleIds: ['VOICE'],
  },
  {
    id: 'DATA_GUIDE',
    title: 'מדריך נתוני התרגול',
    sourcePath: 'public/course-data/v1/README.txt',
    kind: 'fixture',
    moduleIds: ['CORE', 'CRM', 'MARKETING', 'VOICE'],
  },
  {
    id: 'PYTHON_I_LAB',
    title: 'תרגיל Python — חלק א׳',
    sourcePath: 'content/labs/W01D02_PYTHON_FOR_AGENT_BUILDERS_I.py',
    kind: 'exercise-code',
    lessonIds: ['W01D02_PYTHON_FOR_AGENT_BUILDERS_I'],
  },
  {
    id: 'PYTHON_II_LAB',
    title: 'תרגיל Python — חלק ב׳',
    sourcePath: 'content/labs/W01D03_PYTHON_FOR_AGENT_BUILDERS_II.py',
    kind: 'exercise-code',
    lessonIds: ['W01D03_PYTHON_FOR_AGENT_BUILDERS_II'],
  },
  {
    id: 'HTTP_LAB',
    title: 'תרגיל HTTP',
    sourcePath: 'content/labs/W01D04_HTTP_APIS.py',
    kind: 'exercise-code',
    lessonIds: ['W01D04_HTTP_APIS'],
  },
  {
    id: 'AGENT_LOOP_LAB',
    title: 'תרגיל לולאת סוכן',
    sourcePath: 'content/labs/W03D13_AGENT_LOOP.py',
    kind: 'exercise-code',
    lessonIds: ['W03D13_AGENT_LOOP'],
  },
  {
    id: 'LAB_TESTS',
    title: 'בדיקות המעבדה',
    sourcePath: 'content/labs/test_labs.py',
    kind: 'test-code',
    moduleIds: ['CORE', 'AGENTS'],
  },
  {
    id: 'GUIDED_LAB_TESTS',
    title: 'בדיקות התרגילים המודרכים',
    sourcePath: 'content/labs/test_guided.py',
    kind: 'test-code',
    moduleIds: ['CORE'],
  },
  {
    id: 'BYTE_COMPONENT',
    title: 'Byte — רכיב הרובוט האינטראקטיבי',
    sourcePath: 'src/components/learning/ai-mascot.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'WEB'],
  },
  {
    id: 'JOURNEY_MAP_COMPONENT',
    title: 'מפת המסע — רכיב הממשק',
    sourcePath: 'src/components/learning/lesson-map.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'WEB'],
  },
  {
    id: 'PROOF_COMPONENT',
    title: 'שאלות ההוכחה המעשית',
    sourcePath: 'src/components/assessment-form.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
  },
  {
    id: 'QUIZ_REVIEW_COMPONENT',
    title: 'בדיקת שאלות ואישור מאגר לפרסום',
    sourcePath: 'src/components/quiz-bank-review.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
  },
  {
    id: 'UPLOAD_COMPONENT',
    title: 'בחירת קבצים ותצוגה מקדימה',
    sourcePath: 'src/components/assessment/artifact-picker.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'WEB'],
  },
  {
    id: 'PORTFOLIO_COMPONENT',
    title: 'תצוגת תיק העבודות',
    sourcePath: 'src/components/assessment/portfolio-card.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'WEB'],
  },
  {
    id: 'AI_FEEDBACK_COMPONENT',
    title: 'בקשת משוב אוטומטי וכיסוי החומר',
    sourcePath: 'src/components/assessment/evaluation-panel.tsx',
    kind: 'ui-code',
    moduleIds: ['PRODUCT', 'QUALITY'],
  },
];

export const publicApiCatalog = [
  {
    id: 'TEMPLATE_DRAFTS',
    path: '/api/templates/drafts',
    methods: ['GET', 'POST'],
    title: 'שמירת טיוטות עבודה פרטיות',
    scope: 'own',
    sourcePath: 'src/app/api/templates/drafts/route.ts',
    description:
      'חשבון מחובר יכול לטעון ולשמור רק את טיוטות העבודה שלו. השמירה קושרת את התוכן לגרסת התבנית המדויקת, ובודקת את גרסת העריכה כדי למנוע דריסה בין לשוניות. בקשה זהה שנשלחת שוב בתוך 30 יום מחזירה את אישור השמירה של הבקשה המקורית, לצד הטיוטה העדכנית. האישור עשוי להתייחס לגרסת עריכה קודמת; השליחה החוזרת אינה מחזירה את העבודה לאחור. תבניות קודמות נשמרות לקריאה בלבד. הטיוטות כלולות בגיבוי האישי ונמחקות עם החשבון. העורך והשמירה האוטומטית מחוברים לממשק השיעור; בהגשה מתוך התבנית נוצר עותק קבוע של הטיוטה השמורה, יחד עם ההגדרה, גרסת העריכה וגרסת הקורס. העותק מצורף להגשה. אם הלומד בחר לכלול את ההגשה בתיק העבודות הפרטי, היא תופיע גם שם. ההגשה אינה מריצה קוד או מאשרת שליטה. תוכן טיוטות ומזהי חשבונות אינם מיוצאים ל־Volt.',
  },
  {
    id: 'QUIZ_REVIEW',
    path: '/api/quizzes/review',
    methods: ['GET', 'POST'],
    title: 'בדיקת שאלות, פרסום וחזרה לגרסה קודמת',
    scope: 'verified-operator',
    sourcePath: 'src/app/api/quizzes/review/route.ts',
    description:
      'מפעיל מאומת בודק כל שאלה מול השיעור והמקורות שלה. הפרסום דורש אישור מפורש של כל השאלות בנוסח המדויק. ההחלטות והזהות של הבודק נשמרות ביומן פרטי. רק מאגר שאושר ופורסם מוצג ללומדים; תשובות קודמות נשמרות גם לאחר החלפת גרסה. פרסום וחזרה לגרסה קודמת מפעילים עדכון של המפה הציבורית. כשל בייצוא מדווח בנפרד ואינו מבטל את הפעולה במאגר השאלות. תשובות לומדים והחלטות פרטיות אינן מיוצאות.',
  },
  {
    id: 'CURRICULUM_AUDITOR',
    path: '/api/auditor',
    methods: ['GET', 'POST'],
    title: 'בדיקה, פרסום וחזרה לגרסת קורס קודמת',
    scope: 'verified-operator',
    sourcePath: 'src/app/api/auditor/route.ts',
    description:
      'מפעיל מאומת ומורשה משווה נוסחים ומקורות, שומר הצעה והחלטה על הנוסח המדויק, ומפרסם גרסה רק לאחר אישור אנושי נפרד. הפרסום שומר את הגרסה הקודמת ומאפשר חזרה אליה ללא שינוי ברשומות הלומדים. פרסום או חזרה לגרסה קודמת מפעילים עדכון של מפות Volt; כשל בייצוא מדווח בנפרד ואינו מבטל את הפעולה בקורס. גילוי עדכונים ומשוב סוכן אינם אישור לפרסום. יומן ההצעות, זהות הבודק והמסד הפרטי אינם מיוצאים לכספת.',
  },
  {
    id: 'QUIZZES',
    path: '/api/quizzes',
    methods: ['GET', 'POST'],
    title: 'שמירת תשובות לתרגול',
    scope: 'own',
    sourcePath: 'src/app/api/quizzes/route.ts',
    description:
      'טעינת התשובה האחרונה ושמירת תשובה לשאלה קיימת בממשק, בחשבון המאומת ובהקשר השיעור בלבד. השאלה נשמרת עם גרסתה, בחירת הלומד והמשוב. שליחה חוזרת עם אותו מזהה ותוכן אינה יוצרת ניסיון נוסף. תשובה נכונה בתרגול אינה מעניקה XP או שליטה.',
  },
  {
    id: 'KNOWLEDGE',
    path: '/api/knowledge',
    methods: ['GET', 'POST'],
    title: 'מקורות רשמיים ועדכונים',
    scope: 'signed-in-read/operator-refresh',
    sourcePath: 'src/app/api/knowledge/route.ts',
    description:
      'קריאה של תוצאות גילוי ציבוריות לחשבון מחובר. רענון מקורות קבועים מותר למפעיל מאומת בלבד, ללא קבלת כתובת או נתיב מהלקוח. הרענון מוגבל למועדי הבדיקה הקיימים ואינו משנה שיעורים.',
  },
  {
    id: 'AGENT_ORCHESTRATE',
    path: '/api/agents/orchestrate',
    methods: ['POST'],
    title: 'תזמור מומחי הלמידה',
    scope: 'own',
    sourcePath: 'src/app/api/agents/orchestrate/route.ts',
    description:
      'בקשת למידה מאומתת בהקשר של שיעור. התזמור בוחר מומחים מהמרשם, שומר את שלבי הריצה בפועל ומנסח תשובה בעברית. קריאת מודל דורשת מפתח ומודל תקינים בצד השרת. מסלול זה אינו מעניק שליטה מקצועית או הרשאות חדשות.',
  },
  {
    id: 'AGENT_EVALUATE',
    path: '/api/agents/evaluate',
    methods: ['POST'],
    title: 'משוב מנומק על עבודה',
    scope: 'own',
    sourcePath: 'src/app/api/agents/evaluate/route.ts',
    description:
      'משוב מייעץ על הגשה השייכת למשתמש, מול המחוון הקפוא שלה. הקשר כולל רק ראיות שהותר לקרוא, ומפרט אילו קבצים או חלקים נבדקו. משוב AI אינו החלטת בודק אנושי ואינו משנה ציונים או שליטה.',
  },
  {
    id: 'VAULT_SYNC',
    path: '/api/vault/sync',
    methods: ['GET', 'POST'],
    title: 'סנכרון גרף הידע הציבורי',
    scope: 'verified-operator',
    sourcePath: 'src/app/api/vault/sync/route.ts',
    description:
      'בדיקת גרסת הייצוא ועדכון המפות למפעיל מאומת המופיע ברשימת המנהלים. בדיקת המצב משווה את גרסת הקורס ואת מזהה התוכן לייצוא האחרון; היא אינה סורקת עריכות מאוחרות בקבצים. לא ניתן לבחור בבקשת העדכון היכן יישמרו הקבצים. העדכון מייצא את הקטלוג הציבורי בלבד, שומר גרסאות ישנות ומסרב לדרוס רשומה שנערכה ידנית.',
  },
  {
    id: 'MENTOR_HISTORY',
    path: '/api/mentor',
    methods: ['GET', 'POST'],
    title: 'היסטוריית המנטור ומסלול תאימות',
    scope: 'own',
    sourcePath: 'src/app/api/mentor/route.ts',
    description:
      'קורא רק את שיחת המשתמש המאומת בהקשר הנבחר, ומפעיל את מנגנון הלמידה דרך מסלול התאימות. מטמון המקורות מכיל מידע ציבורי בלבד.',
  },
  {
    id: 'ARTIFACT_DOWNLOAD',
    path: '/api/artifacts/[artifactId]',
    methods: ['GET'],
    title: 'הורדת קובץ של הגשה',
    scope: 'own-or-operator',
    sourcePath: 'src/app/api/artifacts/[artifactId]/route.ts',
    description:
      'הורדת הבתים שנשמרו בהגשה לבעלים או לבודק מאומת ומורשה. קובץ של משתמש אחר אינו נחשף. ההורדה מוגשת כקובץ מצורף, ללא מטמון ועם חסימת הרצת תוכן בדפדפן.',
  },
  {
    id: 'PERSONAL_EXPORT',
    path: '/api/export',
    methods: ['GET'],
    title: 'ייצוא המידע האישי',
    scope: 'own',
    sourcePath: 'src/app/api/export/route.ts',
    description:
      'ייצוא הרשומות והקבצים של המשתמש המאומת בלבד. נתוני ייצוא אלה פרטיים ואינם חלק מכספת הידע הציבורית.',
  },
  {
    id: 'LESSON_POSITION',
    path: '/api/position',
    methods: ['POST'],
    title: 'שמירת המקום בשיעור',
    scope: 'own',
    sourcePath: 'src/app/api/position/route.ts',
    description:
      'שומר את מזהה השקופית התקף בשיעור עבור המשתמש המאומת. שמירת מקום אינה השלמת תרגיל או אישור מקצועי.',
  },
  {
    id: 'PROJECT_STARTER',
    path: '/api/projects/[lessonId]/starter',
    methods: ['GET'],
    title: 'קובצי התחלה לפרויקט',
    scope: 'own',
    sourcePath: 'src/app/api/projects/[lessonId]/starter/route.ts',
    description:
      'מכין קובצי התחלה לתרגיל לפי שיעור קיים והרשאות הלמידה. קובצי התחלה הם חומר עזר ולא הוכחה שהפרויקט נבנה.',
  },
  {
    id: 'AUTH',
    path: '/api/auth/[...all]',
    methods: ['GET', 'POST'],
    title: 'אימות חשבון',
    scope: 'authentication',
    sourcePath: 'src/app/api/auth/[...all]/route.ts',
    description:
      'מסלולי Better Auth ליצירת חשבון, כניסה, יציאה ואימות. סודות שרת ופרטי חשבונות אינם נכללים בכספת הציבורית.',
  },
  {
    id: 'CONTACT_EXPORT',
    path: '/api/admin/contacts',
    methods: ['GET'],
    title: 'ייצוא אנשי קשר למנהל',
    scope: 'operator',
    sourcePath: 'src/app/api/admin/contacts/route.ts',
    description:
      'מסלול למפעיל מאומת ומורשה. שומר על הפרדה בין הרשמה ללמידה לבין הסכמה לדיוור; נתוני אנשי הקשר נשארים מחוץ לכספת.',
  },
];

const sectionTitles = {
  Mission: 'המשימה',
  'Build First': 'קודם מתרגלים',
  Concepts: 'המושגים',
  'Mental Model': 'איך זה עובד',
  'Deep Dive': 'להעמקה',
  'Failure Lab': 'מנסים, שוברים ומתקנים',
  Challenge: 'אתגר עצמאי',
  'Mastery Check': 'בדיקת הבנה',
  Documentation: 'מקורות',
  'Engineering Notes': 'מה כדאי לתעד',
};

function convertLesson(body) {
  return body
    .replace(/^## (.+)$/gm, (_line, section) => `## ${sectionTitles[section] || section}`)
    .replace(/```learning-flow\n([\s\S]*?)\n```/g, (_block, text) => {
      const flow = JSON.parse(text);
      const nodes = flow.steps.map(
        (step, index) => `  N${index}[${quote(step.label.replaceAll('"', "'"))}]`,
      );
      const edges = flow.steps.slice(1).map((_step, index) => `  N${index} --> N${index + 1}`);
      return `### ${flow.title}\n\n\`\`\`mermaid\nflowchart TD\n${[...nodes, ...edges].join('\n')}\n\`\`\`\n\n${flow.steps.map((step, index) => `**${index + 1}. ${step.label}**\n\n${step.detail}\n\nבדוגמה: ${step.example}`).join('\n\n')}\n\n${flow.conclusion}`;
    });
}

function lessonSections(body) {
  const sections = new Map();
  let name = '',
    lines = [],
    fence = '';
  const save = () => {
    if (name) sections.set(name, lines.join('\n').trim());
  };
  for (const line of body.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker)
      fence = fence
        ? marker[1][0] === fence[0] && marker[1].length >= fence.length
          ? ''
          : fence
        : marker[1];
    const heading = !fence && line.match(/^## (.+)$/);
    if (heading) {
      save();
      name = heading[1];
      lines = [];
    } else lines.push(line);
  }
  save();
  return sections;
}

function validateId(id, kind) {
  if (typeof id !== 'string' || !stableId.test(id)) throw new Error(`Invalid ${kind} ID`);
  return id;
}

function safePublicSource(sourcePath) {
  if (
    typeof sourcePath !== 'string' ||
    sourcePath.includes('\\') ||
    sourcePath.split('/').some((part) => !part || part === '.' || part === '..') ||
    !(
      publicDeploymentSources.includes(sourcePath) ||
      /^(src|content\/labs|public\/course-data|scripts)\//.test(sourcePath) ||
      /^content\/templates\/releases\/\d{1,4}\.\d{1,4}\.\d{1,4}\.json$/.test(sourcePath)
    )
  )
    throw new Error('Invalid public source path');
  return sourcePath;
}

function sourceLink(sourcePath) {
  const safe = safePublicSource(sourcePath);
  return `[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/${safe.split('/').map(encodeURIComponent).join('/')})`;
}

const prose = {
  routing:
    'התזמור בוחר מומחים לפי סוג הבקשה, הפרק, המיומנויות והצורך שהלומד הציג. מספר ההתמחויות במרשם אינו מוגבל למספר קבוע. מספר הקריאות בכל ריצה מוגבל בתקציב הביצוע. תוצאות המומחים נאספות ורק אז נוצר ניסוח מסכם בעברית. שלבים שנכשלו נשמרים ככשל ואינם מוצגים כהצלחה.',
  policies:
    'הסוכן משתמש רק בכלים שהשרת התיר לו. תוכן שיעור, קוד, מסמך ותשובת מודל הם מידע ולא הוראה שמרחיבה הרשאות. חומר פרטי נקרא רק בהסכמה ובהקשר השייך למשתמש. משוב AI מייעץ; החלטת בודק אנושי והערכת שליטה נשארות נפרדות. לא מריצים קוד ולא שולחים הודעות עסקיות באמצעות הבטחה בטקסט.',
  pedagogy:
    'בוחרים דרך הסבר בנפרד מרמת העזרה: הסבר פשוט כולל דימוי, דוגמה ומגבלות; תרגול מעשי כולל צעדים, תוצאה צפויה ובדיקה; העמקה כוללת מנגנון, חלופות, תקלות ומקורות ראשוניים. במבחן או באתגר Boss נשמרות מגבלות רמזים גם כשהלומד מבקש העמקה. גרסת השיעור שפורסמה אינה משתנה בעקבות תשובת מודל.',
  knowledge:
    'רענון המקורות מגלה עדכונים ממקורות רשמיים ושומר מועד אחזור ומעמד נפרד לגילוי ולאימות. הרענון מתוזמן לשלוש פעמים בשבוע. כותרת גרסה אינה הוכחה להתנהגות API. שינוי הוראה מוצע בגרסה נפרדת עם קישורים לשיעורים ולמיומנויות המושפעים, ונדרש אישור אנושי לפני פרסום.',
};

/** Generate documents from supplied public catalogs. No filesystem, user database, or secret is read. */
export function buildVaultFiles({
  curriculum,
  lessonBodies,
  registry,
  quizBank,
  publishedQuizBank,
  systemQuestion,
  knowledgeRegistry,
  templateCatalog,
  publicAssets = publicAssetCatalog,
  apis = publicApiCatalog,
}) {
  if (!curriculum || !registry || !/^\d+\.\d+\.\d+$/.test(curriculum.version))
    throw new Error('Invalid public catalog');
  const version = curriculum.version;
  const lessons = curriculum.lessons.filter((lesson) => lesson.publicationStatus === 'published');
  const modules = curriculum.modules || [],
    skills = curriculum.skills || [],
    sources = curriculum.sources || [],
    assessments = curriculum.assessments || [];
  const bodies =
    lessonBodies instanceof Map ? lessonBodies : new Map(Object.entries(lessonBodies || {}));
  const vertices = new Map(),
    relations = [],
    relationKeys = new Set();
  const paths = {
    module: new Map(),
    lesson: new Map(),
    skill: new Map(),
    source: new Map(),
    proof: new Map(),
    template: new Map(),
    key: new Map(),
    exercise: new Map(),
    quiz: new Map(),
    agent: new Map(),
    tool: new Map(),
    api: new Map(),
    asset: new Map(),
    technology: new Map(),
    feed: new Map(),
  };
  function add(file, kind, id, title, body, metadata = {}) {
    if (vertices.has(file)) throw new Error(`Duplicate vault path: ${file}`);
    if (
      !file.endsWith('.md') ||
      file.startsWith('/') ||
      file.includes('\\') ||
      file.split('/').some((part) => !part || part === '.' || part === '..')
    )
      throw new Error('Invalid vault path');
    vertices.set(file, { file, kind, id, title, body, metadata, links: [] });
    return file;
  }
  function connect(a, b, type) {
    if (!vertices.has(a) || !vertices.has(b))
      throw new Error(`Unknown graph relation: ${a} -> ${b}`);
    if (a === b) return;
    for (const [from, to] of [
      [a, b],
      [b, a],
    ]) {
      const key = `${from}\0${to}\0${type}`;
      if (relationKeys.has(key)) continue;
      relationKeys.add(key);
      relations.push({ from, to, type });
      vertices.get(from).links.push({ to, type });
    }
  }
  const index = add(
    'Index.md',
    'root',
    'INDEX',
    'מפת הידע של הקורס',
    `הכספת מקשרת בין התוכנית שפורסמה, מומחי הלמידה, תרגילים, מחוונים וחיבורי המערכת. גרסת הקורס הפעילה: **${version}**.\n\nהתחל ב־[[00_ORCHESTRATION/System_Overview.canvas|מפת מבט על]]: מפה קטנה שמציגה את חמשת חלקי המערכת וכמה דוגמאות לקשרים ביניהם. לכל השיעורים, המומחים והתרגילים, פתח את [[Root_Knowledge_Graph.canvas|המפה החזותית המלאה]]. אפשר להזיז ולהגדיל את המפה כדי להגיע לכל פרק ושיעור.\n\nלגרף הקשרים של Obsidian: פתח את תצוגת הגרף מהתפריט. בחר רשומה ופתח גרף מקומי כדי לראות את השכנים שלה; הגדל את עומק הקשרים כדי להרחיב את המפה. כל קשר מופיע גם כקישור לחיץ בסוף הרשומה.\n\nהכספת מכילה חומר ציבורי בלבד. מחברות, שיחות, חשבונות, ציונים וקובצי הגשה פרטיים נשארים מחוץ לגרף. שמירה ב־Obsidian אינה משנה התקדמות באפליקציה.\n\nייצוא קודם בתיקיית קורס נשמר. הקבצים שנוצרו מוגנים מפני דריסת עריכה ידנית; רשומה ששונתה עוצרת את הסנכרון לפני כתיבה.`,
  );
  const sectionIndexes = {
    orchestration: add(
      '00_ORCHESTRATION/Index.md',
      'index',
      'ORCHESTRATION_INDEX',
      'תזמור וכללי המערכת',
      'איך המערכת מחלקת משימות, שומרת גבולות ומנסחת תשובות.',
    ),
    agents: add(
      '01_AGENTS/Index.md',
      'index',
      'AGENTS_INDEX',
      'מומחי הלמידה והכלים',
      `הגדרות פומביות של המומחים ממרשם גרסה ${registry.version}. כל רשומה מציגה את ההוראות והכלים המותרים שלה. הגדרה אינה מעידה על ריצה; השתתפות בפועל מתועדת במסלול הריצה באפליקציה.`,
    ),
    curriculum: add(
      `02_CURRICULUM/${version}/Index.md`,
      'index',
      'CURRICULUM_INDEX',
      'כל הפרקים והשיעורים',
      'מתחילים בפרק היסודות החובה. תרגול, הגשת ראיות והערכת שליטה הם שלבים נפרדים. השיעורים כאן הם עותק של הגרסה שפורסמה.',
    ),
    proofs: add(
      `03_PRACTICAL_PROOFS/${version}/Index.md`,
      'index',
      'PROOFS_INDEX',
      'תרגילים, ראיות ותיק עבודות',
      'המחוונים ותבניות ההגשה ציבוריים. עבודות שהוגשו וקבצים פרטיים אינם מיוצאים לכספת. תנאי הבדיקה מתארים מה צריך להציג; הם אינם פתרון אוטומטי או ציון.',
    ),
    integrations: add(
      '04_AUTOMATIONS_AND_APIS/Index.md',
      'index',
      'INTEGRATIONS_INDEX',
      'חיבורים, ממשקים וקובצי עזר',
      'ממשקי האפליקציה, הכלים המותרים וקובצי העזר הציבוריים. פרטי חשבונות ומפתחות API אינם חלק מהרשומות.',
    ),
  };
  for (const file of Object.values(sectionIndexes)) connect(index, file, 'תיקייה ראשית');
  const prime = add(
    '00_ORCHESTRATION/Orchestrator-Prime.md',
    'orchestration',
    'ORCHESTRATOR_PRIME',
    'Orchestrator-Prime — תזמור הלמידה',
    prose.routing,
  );
  const routing = add(
    '00_ORCHESTRATION/Routing.md',
    'orchestration',
    'ROUTING',
    'בחירת מומחים וניתוב בקשות',
    prose.routing,
  );
  const policies = add(
    '00_ORCHESTRATION/System-Policies.md',
    'orchestration',
    'SYSTEM_POLICIES',
    'הרשאות, מידע פרטי וגבולות משוב',
    prose.policies,
  );
  const pedagogy = add(
    '00_ORCHESTRATION/Pedagogy.md',
    'orchestration',
    'PEDAGOGY',
    'שלוש דרכי הסבר ורמות עזרה',
    prose.pedagogy,
  );
  for (const file of [prime, routing, policies, pedagogy])
    connect(sectionIndexes.orchestration, file, 'כלל מערכת');
  connect(prime, routing, 'ניתוב');
  connect(prime, policies, 'גבולות הרשאה');
  connect(prime, pedagogy, 'מדיניות הוראה');
  for (const chapter of modules) {
    validateId(chapter.id, 'module');
    paths.module.set(
      chapter.id,
      add(
        `02_CURRICULUM/${version}/modules/${chapter.id}.md`,
        'module',
        chapter.id,
        chapter.title,
        `${chapter.description}\n\n## התוצר של הפרק\n\n${chapter.outcome}\n\n${chapter.requiredEntry ? '**פרק חובה:** משלימים את תרגילי היסודות לפני פתיחת התמחות. השלמת הבנייה אינה אישור שליטה מקצועית.\n\n' : ''}## סדר השיעורים\n\n${chapter.lessonIds.map((id, number) => `${number + 1}. ${id}`).join('\n')}`,
        {
          required_entry: Boolean(chapter.requiredEntry),
          lesson_ids: chapter.lessonIds,
          prerequisite_module_ids: chapter.prerequisiteModuleIds,
        },
      ),
    );
    connect(sectionIndexes.curriculum, paths.module.get(chapter.id), 'פרק');
  }
  for (const lesson of lessons) {
    validateId(lesson.id, 'lesson');
    const body = bodies.get(lesson.id);
    if (typeof body !== 'string' || !body.trim())
      throw new Error(`Missing published lesson body: ${lesson.id}`);
    const file = add(
      `02_CURRICULUM/${version}/lessons/${lesson.id}.md`,
      'lesson',
      lesson.id,
      lesson.title,
      convertLesson(body),
      {
        lesson_id: lesson.id,
        lesson_version: lesson.version,
        skill_ids: lesson.skillIds,
        source_ids: lesson.sourceIds,
        prerequisite_lesson_ids: lesson.prerequisiteLessonIds,
        source_sha256: digest(body),
        estimated_minutes: lesson.estimatedMinutes,
      },
    );
    paths.lesson.set(lesson.id, file);
    const sections = lessonSections(body);
    const exerciseSections = ['Build First', 'Failure Lab', 'Challenge', 'Mastery Check'].filter(
      (key) => sections.has(key),
    );
    if (!exerciseSections.includes('Build First') || !exerciseSections.includes('Mastery Check'))
      throw new Error(`Missing actual exercise sections: ${lesson.id}`);
    paths.exercise.set(
      lesson.id,
      add(
        `02_CURRICULUM/${version}/exercises/${lesson.id}.md`,
        'exercise',
        `EXERCISE_${lesson.id}`,
        `התרגול: ${lesson.title}`,
        `הקטעים הבאים לקוחים מן השיעור שפורסם. אין כאן תוצאה של הרצת קוד או בדיקה אוטומטית.\n\n${exerciseSections.map((key) => `## ${sectionTitles[key]}\n\n${convertLesson(sections.get(key))}`).join('\n\n')}`,
        { lesson_id: lesson.id, source_sections: exerciseSections, source_sha256: digest(body) },
      ),
    );
    connect(file, paths.exercise.get(lesson.id), 'תרגול מתוך השיעור');
  }
  for (const skill of skills) {
    validateId(skill.id, 'skill');
    paths.skill.set(
      skill.id,
      add(
        `02_CURRICULUM/${version}/skills/${skill.id}.md`,
        'skill',
        skill.id,
        skill.name,
        `תחום: ${skill.domain}\n\n${skill.description}`,
        { skill_id: skill.id, prerequisite_skill_ids: skill.prerequisiteSkillIds },
      ),
    );
    connect(sectionIndexes.curriculum, paths.skill.get(skill.id), 'מיומנות');
  }
  for (const source of sources) {
    validateId(source.id, 'source');
    if (!String(source.url).startsWith('https://')) throw new Error('Invalid source URL');
    paths.source.set(
      source.id,
      add(
        `02_CURRICULUM/${version}/sources/${source.id}.md`,
        'source',
        source.id,
        source.title,
        `[למקור הראשוני](${source.url})\n\nמפרסם: ${source.vendor}\n\nסוג: ${source.type}\n\n${source.lastVerified ? `תאריך האימות שמופיע בקטלוג: ${source.lastVerified}.` : 'הקטלוג אינו מציין אימות טכני מלא של מקור זה.'}\n\nרשומה זו מקשרת למקור; הייצוא אינו מוריד או מאמת מחדש את תוכנו.`,
        {
          source_id: source.id,
          url: source.url,
          last_verified: source.lastVerified,
          technology_ids: source.technologyIds,
        },
      ),
    );
    connect(sectionIndexes.curriculum, paths.source.get(source.id), 'מקור');
  }
  for (const assessment of assessments) {
    validateId(assessment.id, 'assessment');
    if (!paths.lesson.has(assessment.lessonId))
      throw new Error('Assessment without published lesson');
    const common = {
      assessment_id: assessment.id,
      assessment_version: assessment.version,
      lesson_id: assessment.lessonId,
    };
    const rubric = add(
      `03_PRACTICAL_PROOFS/${version}/rubrics/${assessment.id}.md`,
      'proof',
      assessment.id,
      assessment.title,
      `${assessment.instructions}\n\n## תנאי ההגשה\n\n${assessment.criteria.map((criterion, number) => `### ${number + 1}. ${criterion.id}\n\n${criterion.prompt}\n\n**מה לצרף:** ${criterion.evidenceHint}`).join('\n\n')}`,
      common,
    );
    paths.proof.set(assessment.lessonId, rubric);
    const template = add(
      `03_PRACTICAL_PROOFS/${version}/templates/${assessment.id}.md`,
      'submission-template',
      `TEMPLATE_${assessment.id}`,
      `תבנית הגשה: ${assessment.title}`,
      `העתק את התבנית למחברת האישית ומלא אותה בעבודה שלך. הקובץ הציבורי אינו שולח הגשה. באתר אפשר לצרף קבצים ולבחור האם לכלול את ההגשה בתיק העבודות הפרטי.\n\n${assessment.criteria.map((criterion, number) => `## ${number + 1}. ${criterion.prompt}\n\n${criterion.evidenceHint}\n\n### ההסבר שלי\n\n### הראיות שצירפתי\n\n### מה בדקתי ומה קרה בפועל\n\n### מגבלות או מידע שעדיין חסר`).join('\n\n')}`,
      common,
    );
    paths.template.set(assessment.lessonId, template);
    const key = add(
      `03_PRACTICAL_PROOFS/${version}/evaluation-keys/${assessment.id}.md`,
      'evaluation-key',
      `KEY_${assessment.id}`,
      `תנאי בדיקה: ${assessment.title}`,
      `אלה תנאי בדיקה המבוססים על המחוון שפורסם. הם אינם מפתח תשובות מלא, ציונים מחושבים או תוצאות הרצה. במשימות שיש להן כמה פתרונות יש לבחון את הנימוק והראיות ביחס לתנאים.\n\n${assessment.criteria.map((criterion, number) => `## ${number + 1}. ${criterion.id}\n\n- [ ] העבודה מתייחסת לדרישה: ${criterion.prompt}\n- [ ] צורפו ראיות שאפשר לבדוק: ${criterion.evidenceHint}\n- [ ] הוסבר כיצד הראיות תומכות בטענה ומה עדיין לא נבדק.\n\nמיומנות קשורה: ${criterion.skillId}`).join('\n\n')}`,
      common,
    );
    paths.key.set(assessment.lessonId, key);
    connect(sectionIndexes.proofs, rubric, 'מחוון');
    connect(rubric, template, 'תבנית הגשה');
    connect(rubric, key, 'תנאי בדיקה');
    connect(paths.lesson.get(assessment.lessonId), rubric, 'הוכחה מעשית');
    connect(paths.exercise.get(assessment.lessonId), rubric, 'ראיות מהתרגול');
    for (const criterion of assessment.criteria)
      if (paths.skill.has(criterion.skillId))
        connect(rubric, paths.skill.get(criterion.skillId), 'מיומנות שנבדקת');
  }
  for (const tool of registry.tools) {
    validateId(tool.id, 'tool');
    paths.tool.set(
      tool.id,
      add(
        `04_AUTOMATIONS_AND_APIS/tools/${tool.id}.md`,
        'tool',
        tool.id,
        tool.title,
        `${tool.description}\n\nהיקף מידע: **${tool.scope === 'own' ? 'המידע המותר של המשתמש המאומת בלבד' : 'מידע ציבורי'}**.\n\nמימוש במקור: \`${tool.implementation}\`.\n\nכלי מותר רק למומחה שהכלי נכלל במפורש בהגדרתו. תשובת מודל אינה יכולה להרחיב את ההרשאה.`,
        { tool_id: tool.id, scope: tool.scope, implementation: tool.implementation },
      ),
    );
    connect(sectionIndexes.integrations, paths.tool.get(tool.id), 'כלי');
    connect(paths.tool.get(tool.id), policies, 'גבולות הרשאה');
  }
  for (const agent of registry.agents) {
    validateId(agent.id, 'agent');
    const file = add(
      `01_AGENTS/${agent.id}.md`,
      'agent',
      agent.id,
      agent.titleHebrew || agent.title,
      `${agent.description}\n\nשם במערכת: **${agent.name}**. תפקיד: \`${agent.role}\`. גרסת הגדרה: \`${agent.version}\`.\n\n## ההוראות למומחה\n\n${agent.instructions}\n\n## תחומי אחריות\n\n${agent.domains.map((domain) => `- ${domain}`).join('\n')}\n\n## התאמת בקשות\n\n${agent.keywords.map((keyword) => `- ${keyword}`).join('\n')}\n\nהגדרה זו אינה טענה שהמודל רץ או שפעולה בוצעה. השרת מתעד ריצות אמיתיות, תוצאות וכשלים.`,
      {
        agent_id: agent.id,
        agent_version: agent.version,
        role: agent.role,
        module_ids: agent.moduleIds,
        skill_ids: agent.skillIds,
        source_ids: agent.sourceIds,
        allowed_tools: agent.allowedTools,
      },
    );
    paths.agent.set(agent.id, file);
    connect(sectionIndexes.agents, file, 'מומחה');
    connect(prime, file, 'מומחה מתוזמר');
    connect(file, policies, 'כללי מערכת');
    connect(file, pedagogy, 'אופן ההסבר');
  }
  for (const api of apis) {
    validateId(api.id, 'API');
    const status =
      api.status ||
      (['AGENT_ORCHESTRATE', 'AGENT_EVALUATE', 'VAULT_SYNC'].includes(api.id)
        ? 'integration-in-progress'
        : 'implemented');
    const file = add(
      `04_AUTOMATIONS_AND_APIS/endpoints/${api.id}.md`,
      'api',
      api.id,
      api.title,
      `כתובת: \`${api.path}\`\n\nפעולות HTTP: ${api.methods.map((method) => `\`${method}\``).join(', ')}.\n\nהיקף הרשאה: \`${api.scope}\`.\n\n**מצב המימוש: ${status === 'implemented' ? 'קוד המסלול קיים; יש לבדוק את החיבור וההרשאות בסביבת ההרצה.' : 'החיבור במימוש; הרשומה מתארת את חוזה הממשק ואינה מוכיחה שהמסלול פעיל.'}**\n\n${api.description}\n\n${sourceLink(api.sourcePath)}\n\nבקשות כתיבה תלויות באימות החשבון ובבדיקת המקור. השרת מאמת קלט ומזהים; הוא אינו סומך על מזהה בעלים שהלקוח שלח. מסלול זה אינו מעתיק מידע פרטי לכספת.`,
      {
        api_id: api.id,
        route: api.path,
        methods: api.methods,
        permission_scope: api.scope,
        source_path: api.sourcePath,
        implementation_status: status,
      },
    );
    paths.api.set(api.id, file);
    connect(sectionIndexes.integrations, file, 'ממשק');
    connect(file, policies, 'כללי הרשאה');
  }
  const environment = add(
    '04_AUTOMATIONS_AND_APIS/Environment.md',
    'configuration',
    'ENVIRONMENT',
    'הגדרת חיבורים וסודות בצד השרת',
    'הדוגמה הציבורית נמצאת בקובץ `.env.example`. `OPENAI_API_KEY` ו־`AI_MODEL` מוגדרים רק בצד השרת. כתובת `BETTER_AUTH_URL` ופרטי SMTP נדרשים להפעלה בהתאם לסביבת ההרצה. `ADMIN_EMAILS` מגדיר מפעילים מורשים.\n\nאין להעתיק מפתחות, סיסמאות, מסד משתמשים או `.env.local` לכספת. ייצוא הכספת אינו משנה את ההגדרות ואינו מוכיח שהחיבור לשירות עובד.\n\n[דוגמת ההגדרות הציבורית](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/.env.example)',
  );
  connect(sectionIndexes.integrations, environment, 'הגדרת סביבה');
  connect(environment, policies, 'שמירת סודות');
  const knowledge = add(
    '04_AUTOMATIONS_AND_APIS/Knowledge-Updates.md',
    'automation',
    'KNOWLEDGE_UPDATES',
    'רענון מקורות וביקורת תוכן',
    prose.knowledge,
  );
  connect(sectionIndexes.integrations, knowledge, 'אוטומציה');
  connect(knowledge, prime, 'הקשר של עדכונים');
  connect(knowledge, policies, 'גבולות אימות');
  if (paths.api.has('KNOWLEDGE'))
    connect(knowledge, paths.api.get('KNOWLEDGE'), 'קריאת תוצאות ורענון');
  if (paths.api.has('CURRICULUM_AUDITOR')) {
    const auditor = paths.api.get('CURRICULUM_AUDITOR');
    connect(knowledge, auditor, 'הצעה וביקורת אנושית');
    connect(auditor, paths.agent.get('Agent-Curriculum-Auditor'), 'הצעת מומחה ללא הרשאת פרסום');
    connect(auditor, paths.agent.get('Agent-Hebrew-UX'), 'בדיקת ניסוח');
    connect(auditor, policies, 'אישור נפרד לפרסום');
    for (const file of paths.module.values())
      connect(auditor, file, 'עדכון גרסה ללא איפוס התקדמות');
  }
  if (knowledgeRegistry) {
    for (const technology of knowledgeRegistry.technologies) {
      validateId(technology.id, 'technology');
      const file = add(
        `04_AUTOMATIONS_AND_APIS/technologies/${technology.id}.md`,
        'technology',
        technology.id,
        technology.name,
        `הטכנולוגיה מקושרת למקורות הקורס ולשיעורים המשתמשים בהם.\n\n[תיעוד רשמי](${technology.officialDocs})\n\nדרך גילוי עדכונים: \`${technology.versionStrategy}\`. רשומה זו מתארת את החיבור למקורות; היא אינה מוכיחה שנבדקה גרסה חדשה או ששינוי הוטמע בשיעור.`,
        {
          technology_id: technology.id,
          registry_version: knowledgeRegistry.version,
          category: technology.category,
          course_source_ids: technology.courseSourceIds,
        },
      );
      paths.technology.set(technology.id, file);
      connect(file, knowledge, 'טכנולוגיה במעקב');
      for (const sourceId of technology.courseSourceIds) {
        if (!paths.source.has(sourceId)) throw new Error('Unknown technology course source');
        connect(file, paths.source.get(sourceId), 'תיעוד בקורס');
      }
      for (const lesson of lessons.filter((entry) =>
        entry.sourceIds.some((id) => technology.courseSourceIds.includes(id)),
      )) {
        connect(file, paths.lesson.get(lesson.id), 'טכנולוגיה בשיעור');
        for (const skillId of lesson.skillIds)
          connect(file, paths.skill.get(skillId), 'מיומנות קשורה');
      }
      for (const agent of registry.agents.filter((entry) =>
        entry.sourceIds.some((id) => technology.courseSourceIds.includes(id)),
      ))
        connect(file, paths.agent.get(agent.id), 'מקור למומחה');
    }
    for (const source of knowledgeRegistry.sources) {
      validateId(source.id, 'knowledge source');
      const file = add(
        `04_AUTOMATIONS_AND_APIS/knowledge-sources/${source.id}.md`,
        'knowledge-source',
        source.id,
        source.name,
        `מקור רשמי לגילוי עדכונים.\n\n[כתובת המקור](${source.url})\n\nאופן קריאת המקור: \`${source.reader}\`. סוג העדכון: \`${source.kind}\`.\n\nהשרת שומר מידע מוגבל על פרסומים, מועד קריאת המקור ומצב הצלחה או כשל. איסוף העדכונים מהמקור מתוכנן לשלוש פעמים בשבוע. מצב האחזור בפועל נמצא באפליקציה; הכספת אינה מציגה בדיקה שלא בוצעה. כותרות ודפי קטלוג אינם אישור להתנהגות API או לזמינות מודל בחשבון.`,
        {
          discovery_source_id: source.id,
          registry_version: knowledgeRegistry.version,
          reader: source.reader,
          source_kind: source.kind,
          endpoint: source.url,
          verification: 'discovery-only',
        },
      );
      paths.feed.set(source.id, file);
      connect(file, knowledge, 'מקור מתעדכן');
      for (const id of source.technologyIds) {
        if (!paths.technology.has(id)) throw new Error('Unknown source technology');
        connect(file, paths.technology.get(id), 'עדכונים לטכנולוגיה');
      }
      for (const id of source.courseSourceIds) {
        if (!paths.source.has(id)) throw new Error('Unknown discovery course source');
        connect(file, paths.source.get(id), 'תיעוד בקורס');
      }
      for (const id of source.lessonIds) {
        if (!paths.lesson.has(id)) throw new Error('Unknown discovery lesson');
        connect(file, paths.lesson.get(id), 'שיעור קשור למעקב');
      }
      for (const id of source.moduleIds) {
        if (!paths.module.has(id)) throw new Error('Unknown discovery module');
        connect(file, paths.module.get(id), 'פרק קשור');
      }
      if (paths.tool.has('knowledge.read'))
        connect(file, paths.tool.get('knowledge.read'), 'הקשר של המנטור');
    }
  }
  for (const asset of publicAssets) {
    validateId(asset.id, 'asset');
    safePublicSource(asset.sourcePath);
    const body = `${sourceLink(asset.sourcePath)}\n\nסוג הקובץ: \`${asset.kind}\`. נתיב במאגר הציבורי: \`${asset.sourcePath}\`.\n\n${asset.kind === 'fixture' ? 'אלה נתונים סינתטיים שנועדו לתרגול, ולא מידע של לקוחות אמיתיים.' : asset.kind === 'ui-code' ? 'זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.' : 'זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.'}${typeof asset.body === 'string' ? `\n\n## תוכן הקובץ הציבורי\n\n\`\`\`\n${asset.body.replaceAll('```', '`\u200b``')}\n\`\`\`` : ''}`;
    paths.asset.set(
      asset.id,
      add(`04_AUTOMATIONS_AND_APIS/assets/${asset.id}.md`, 'asset', asset.id, asset.title, body, {
        source_path: asset.sourcePath,
        asset_kind: asset.kind,
        ...(typeof asset.body === 'string' ? { source_sha256: digest(asset.body) } : {}),
      }),
    );
    connect(sectionIndexes.integrations, paths.asset.get(asset.id), 'קובץ עזר');
  }
  const deployment = add(
    '04_AUTOMATIONS_AND_APIS/Deployment.md',
    'configuration',
    'DEPLOYMENT',
    'פריסה, אחסון מתמשך ותזמון תחזוקה',
    'חבילת הפריסה מיועדת למופע Node יחיד עם SQLite, אחסון מתמשך ושרת כניסה Caddy. הקבצים הציבוריים מקושרים כאן לפי תפקידם. הכללתם בגרף אינה מוכיחה שהאתר הותקן על שרת ציבורי.\n\nבחבילת הפריסה מוגדר רענון של המקורות שלוש פעמים בשבוע באמצעות systemd. לאחר התקנת התזמון בשרת, תוצאות הרענון נשמרות במטמון שבו המנטור משתמש. הבדיקה ב־GitHub מפיקה רשימה נפרדת של מקורות שהתגלו ואינה מעתיקה אותה אוטומטית לשרת. התקנת הטיימרים ובדיקת הרצה אמיתית נעשות אחרי הקמת השרת.\n\nמסד משתמשים, קובצי סביבה, סודות וגיבויים פרטיים אינם נכללים בכספת. אין לבצע שחזור אוטומטי במערכת חיה. בדיקת השחזור הציבורית משתמשת רק בכרכי בדיקה עם נתונים סינתטיים.\n\n[הוראות פריסה](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/docs/DEPLOY_CONTAINER_HE.md)',
  );
  connect(sectionIndexes.integrations, deployment, 'חבילת פריסה');
  connect(deployment, environment, 'הגדרות בזמן הפעלה');
  connect(deployment, knowledge, 'רענון מטמון המקורות');
  connect(deployment, policies, 'פרטיות והרשאות');
  for (const asset of publicAssets.filter((item) => item.kind === 'deployment-code')) {
    connect(deployment, paths.asset.get(asset.id), 'קובץ פריסה ציבורי');
    if (asset.id.startsWith('KNOWLEDGE_'))
      connect(knowledge, paths.asset.get(asset.id), 'גילוי ותזמון מקורות');
  }
  for (const chapter of modules) {
    for (const id of chapter.lessonIds) {
      if (!paths.lesson.has(id))
        throw new Error(`Module references unknown published lesson: ${id}`);
      connect(paths.module.get(chapter.id), paths.lesson.get(id), 'שיעור בפרק');
    }
    for (const prerequisite of chapter.prerequisiteModuleIds) {
      if (!paths.module.has(prerequisite)) throw new Error('Unknown prerequisite module');
      connect(paths.module.get(chapter.id), paths.module.get(prerequisite), 'תלות בין פרקים');
    }
    for (let i = 1; i < chapter.lessonIds.length; i++)
      connect(
        paths.lesson.get(chapter.lessonIds[i - 1]),
        paths.lesson.get(chapter.lessonIds[i]),
        'סדר לימוד',
      );
  }
  for (const lesson of lessons) {
    for (const prerequisite of lesson.prerequisiteLessonIds) {
      if (!paths.lesson.has(prerequisite)) throw new Error('Unknown prerequisite lesson');
      connect(paths.lesson.get(lesson.id), paths.lesson.get(prerequisite), 'תלות בין שיעורים');
    }
    for (const skillId of lesson.skillIds) {
      if (!paths.skill.has(skillId)) throw new Error('Unknown lesson skill');
      connect(paths.lesson.get(lesson.id), paths.skill.get(skillId), 'מיומנות בשיעור');
    }
    for (const sourceId of lesson.sourceIds) {
      if (!paths.source.has(sourceId)) throw new Error('Unknown lesson source');
      connect(paths.lesson.get(lesson.id), paths.source.get(sourceId), 'מקור לשיעור');
    }
  }
  for (const skill of skills)
    for (const prerequisite of skill.prerequisiteSkillIds) {
      if (!paths.skill.has(prerequisite)) throw new Error('Unknown prerequisite skill');
      connect(paths.skill.get(skill.id), paths.skill.get(prerequisite), 'תלות בין מיומנויות');
    }
  for (const agent of registry.agents) {
    const file = paths.agent.get(agent.id);
    const associatedModules = new Set(agent.moduleIds);
    for (const chapter of modules)
      if (
        agent.role === 'orchestrator' ||
        agent.role === 'synthesis' ||
        chapter.lessonIds.some((id) =>
          lessons
            .find((lesson) => lesson.id === id)
            ?.skillIds.some((id) => agent.skillIds.includes(id)),
        )
      )
        associatedModules.add(chapter.id);
    for (const moduleId of associatedModules) {
      if (!paths.module.has(moduleId)) throw new Error('Unknown agent module');
      connect(file, paths.module.get(moduleId), 'תחום הפרק');
      for (const lessonId of modules.find((chapter) => chapter.id === moduleId).lessonIds) {
        connect(file, paths.lesson.get(lessonId), 'מומחיות בשיעור');
        if (paths.proof.has(lessonId)) connect(file, paths.proof.get(lessonId), 'משוב על ראיות');
      }
    }
    for (const skillId of agent.skillIds) {
      if (!paths.skill.has(skillId)) throw new Error('Unknown agent skill');
      connect(file, paths.skill.get(skillId), 'מומחיות במיומנות');
    }
    for (const sourceId of agent.sourceIds) {
      if (!paths.source.has(sourceId)) throw new Error('Unknown agent source');
      connect(file, paths.source.get(sourceId), 'מקור למומחה');
    }
    for (const toolId of agent.allowedTools) {
      if (!paths.tool.has(toolId)) throw new Error('Unknown agent tool');
      connect(file, paths.tool.get(toolId), 'כלי מותר');
    }
    for (const id of [
      'AGENT_ORCHESTRATE',
      ...(agent.name.includes('Progress') ? ['AGENT_EVALUATE'] : []),
    ])
      if (paths.api.has(id)) connect(file, paths.api.get(id), 'ממשק הפעלה');
    connect(file, knowledge, 'מקורות מתעדכנים');
  }
  for (const asset of publicAssets) {
    const file = paths.asset.get(asset.id);
    for (const moduleId of asset.moduleIds || [])
      if (paths.module.has(moduleId)) {
        connect(file, paths.module.get(moduleId), 'קובץ עזר לפרק');
        for (const agent of registry.agents.filter((item) => item.moduleIds.includes(moduleId)))
          connect(file, paths.agent.get(agent.id), 'קובץ עזר למומחה');
      }
    for (const lessonId of asset.lessonIds || [])
      if (paths.lesson.has(lessonId)) {
        connect(file, paths.lesson.get(lessonId), 'קובץ עזר לשיעור');
        connect(file, paths.exercise.get(lessonId), 'קוד לתרגול');
      }
    for (const agentId of asset.agentIds || []) {
      if (!paths.agent.has(agentId)) throw new Error('Unknown asset agent');
      connect(file, paths.agent.get(agentId), 'קובץ עזר למומחה');
    }
  }
  for (const id of ['AGENT_EVALUATE', 'ARTIFACT_DOWNLOAD'])
    if (paths.api.has(id))
      for (const file of paths.proof.values()) connect(paths.api.get(id), file, 'ראיות והגשות');
  if (paths.api.has('VAULT_SYNC')) connect(paths.api.get('VAULT_SYNC'), index, 'ייצוא ציבורי');
  for (const source of sources) connect(knowledge, paths.source.get(source.id), 'מקור בקטלוג');
  for (const selectedBank of [quizBank, publishedQuizBank].filter(Boolean)) {
    const quizBank = selectedBank;
    const quizzes = Array.isArray(quizBank) ? quizBank : quizBank.quizzes;
    if (!Array.isArray(quizzes)) throw new Error('Invalid public quiz bank');
    const quizVersion = quizBank.version || '0.0.0';
    if (!/^\d+\.\d+\.\d+$/.test(quizVersion)) throw new Error('Invalid quiz bank version');
    const draft = quizBank.status !== 'published' || quizBank.reviewStatus !== 'approved';
    const authoredVersion = quizBank.curriculumVersion || version;
    if (!/^\d+\.\d+\.\d+$/.test(authoredVersion))
      throw new Error('Invalid quiz curriculum version');
    const needsVersionReview = authoredVersion !== version;
    if (needsVersionReview && !draft) throw new Error('Quiz curriculum version mismatch');
    const versionNotice = needsVersionReview
      ? `\n\n**טיוטה שנכתבה לגרסת הקורס ${authoredVersion}. גרסת הקורס הפעילה היא ${version}. יש לבדוק את התאמת השאלות לגרסה הפעילה לפני פרסום.**`
      : '';
    const quizRoot = `02_CURRICULUM/quiz-banks/${quizVersion}${draft ? '-draft' : ''}`;
    const quizIndex = add(
      `${quizRoot}/Index.md`,
      'index',
      'QUIZ_BANK_INDEX',
      draft ? 'טיוטת שאלות לחיזוק ההבנה' : 'שאלות לחיזוק ההבנה',
      draft
        ? `השאלות נכתבו לפי השיעורים, אך עדיין דורשות ביקורת הוראה אנושית. הן אינן פעילות בשיעורים ואינן מעניקות ציון או שליטה. נשמרות כאן לצורך קריאה וביקורת.${versionNotice}`
        : 'שאלות לחיזוק ההבנה, נפרדות מהגשת ראיות והערכת שליטה.',
      {
        quiz_version: quizVersion,
        review_status: draft ? 'requires-human-review' : 'approved',
        source_curriculum_version: authoredVersion,
        active_curriculum_version: version,
        needs_version_review: needsVersionReview,
      },
    );
    connect(sectionIndexes.curriculum, quizIndex, draft ? 'טיוטה לביקורת' : 'חיזוק ההבנה');
    if (paths.api.has('QUIZ_REVIEW'))
      connect(
        quizIndex,
        paths.api.get('QUIZ_REVIEW'),
        draft ? 'בדיקה לפני פרסום' : 'מאגר שאושר ופורסם',
      );
    if (paths.asset.has('QUIZ_REVIEW_COMPONENT'))
      connect(quizIndex, paths.asset.get('QUIZ_REVIEW_COMPONENT'), 'ממשק בדיקת שאלות');
    for (const quiz of quizzes) {
      validateId(quiz.id, 'quiz');
      if (
        !paths.lesson.has(quiz.lessonId) ||
        typeof quiz.question !== 'string' ||
        !Array.isArray(quiz.options) ||
        !quiz.options.some((option) => option.id === quiz.correctOptionId) ||
        typeof quiz.explanation !== 'string' ||
        typeof quiz.sourceSection !== 'string'
      )
        throw new Error('Invalid authored quiz');
      const source = lessonSections(bodies.get(quiz.lessonId));
      if (!source.has(quiz.sourceSection)) throw new Error('Quiz source section does not exist');
      const file = add(
        `${quizRoot}/${quiz.id}.md`,
        'quiz',
        quiz.id,
        `בדיקת הבנה: ${quiz.question}`,
        `${draft ? `**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**${versionNotice}\n\n` : ''}${quiz.question}\n\n${quiz.options.map((option) => `- ${option.id}: ${option.text}`).join('\n')}\n\n## תשובה והסבר ללמידה\n\nאפשרות: ${quiz.correctOptionId}.\n\n${quiz.explanation}\n\nקטע מקור בשיעור: ${quiz.sourceSection}. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.`,
        {
          quiz_id: quiz.id,
          lesson_id: quiz.lessonId,
          quiz_version: quizVersion,
          review_status: draft ? 'requires-human-review' : 'approved',
          source_section: quiz.sourceSection,
          source_curriculum_version: authoredVersion,
          active_curriculum_version: version,
          needs_version_review: needsVersionReview,
        },
      );
      paths.quiz.set(`${quizVersion}:${draft ? 'draft' : 'published'}:${quiz.id}`, file);
      connect(quizIndex, file, draft ? 'שאלה לביקורת' : 'בדיקת הבנה');
      connect(paths.lesson.get(quiz.lessonId), file, 'בדיקת הבנה');
      connect(paths.exercise.get(quiz.lessonId), file, 'חיזוק התרגול');
      if (!draft && paths.api.has('QUIZZES'))
        connect(file, paths.api.get('QUIZZES'), 'שמירת תשובה');
      if (!draft && paths.asset.has('REINFORCEMENT_COMPONENT'))
        connect(file, paths.asset.get('REINFORCEMENT_COMPONENT'), 'שאלה פעילה בממשק');
      if (paths.proof.has(quiz.lessonId))
        connect(paths.proof.get(quiz.lessonId), file, 'תרגול לפני הגשה');
      for (const sourceId of quiz.sourceIds || []) {
        if (!paths.source.has(sourceId)) throw new Error('Unknown authored quiz source');
        connect(paths.source.get(sourceId), file, 'מקור השאלה');
      }
      for (const agent of registry.agents.filter((item) =>
        item.moduleIds.some((id) =>
          modules.find((chapter) => chapter.id === id)?.lessonIds.includes(quiz.lessonId),
        ),
      ))
        connect(paths.agent.get(agent.id), file, 'הסבר לשאלה');
    }
  }
  let systemQuizzes = 0;
  if (systemQuestion) {
    validateId(systemQuestion.id, 'system question');
    if (
      !/^\d+\.\d+\.\d+$/.test(systemQuestion.version) ||
      typeof systemQuestion.question !== 'string' ||
      !Array.isArray(systemQuestion.options) ||
      !systemQuestion.options.some((option) => option.id === systemQuestion.correctOptionId) ||
      typeof systemQuestion.feedback?.correct !== 'string' ||
      typeof systemQuestion.feedback?.incorrect !== 'string'
    )
      throw new Error('Invalid public system question');
    const file = add(
      `02_CURRICULUM/system-quizzes/${systemQuestion.version}/${systemQuestion.id}.md`,
      'quiz',
      systemQuestion.id,
      systemQuestion.title,
      `זוהי השאלה על תהליך ההגשה שכבר קיימת בממשק. היא נפרדת מטיוטת שאלות הקורס. תשובה לתרגול אינה אישור שליטה.\n\n${systemQuestion.question}\n\n${systemQuestion.options.map((option) => `- ${option.id}: ${option.text}`).join('\n')}\n\n## המשוב המוגדר בשאלה\n\nתשובה מתאימה: ${systemQuestion.correctOptionId}.\n\n${systemQuestion.feedback.correct}\n\nלתשובה אחרת: ${systemQuestion.feedback.incorrect}\n\nבחירת הלומד נשמרת בחשבונו בלבד, והכספת אינה כוללת תשובות של משתמשים.`,
      {
        question_id: systemQuestion.id,
        question_version: systemQuestion.version,
        definition_sha256: digest(JSON.stringify(systemQuestion)),
        purpose: 'app-workflow-practice',
      },
    );
    connect(file, sectionIndexes.curriculum, 'שאלה קיימת בממשק');
    connect(file, prime, 'תרגול בהקשר הלמידה');
    if (paths.api.has('QUIZZES')) connect(file, paths.api.get('QUIZZES'), 'שמירת תשובה');
    if (paths.asset.has('REINFORCEMENT_COMPONENT'))
      connect(file, paths.asset.get('REINFORCEMENT_COMPONENT'), 'רכיב התרגול');
    for (const lesson of lessons) {
      connect(file, paths.lesson.get(lesson.id), 'תרגול לפני הגשה');
      if (paths.proof.has(lesson.id))
        connect(file, paths.proof.get(lesson.id), 'הבחנה בין הגשה לשליטה');
    }
    systemQuizzes = 1;
  }
  const templateWorkspaces = addTemplateWorkspaces({
    catalog: templateCatalog,
    assessments,
    lessons,
    registry,
    paths: {
      ...paths,
      moduleLessons: new Map(modules.map((chapter) => [chapter.id, chapter.lessonIds])),
    },
    add,
    connect,
    sectionIndex: sectionIndexes.proofs,
    sourceLink,
  });
  // Keep each chapter and specialist navigable without zooming through the full graph.
  // These are projections of existing relationships, never fabricated connections.
  const focusedMaps = [];
  const neighbors = (files, kinds) => {
    const selected = new Set();
    for (const file of files)
      for (const link of vertices.get(file).links)
        if (kinds.includes(vertices.get(link.to).kind)) selected.add(link.to);
    return [...selected].sort((a, b) => a.localeCompare(b, 'en'));
  };
  const chapterLinks = [],
    agentLinks = [];
  for (const chapter of modules) {
    const root = paths.module.get(chapter.id);
    const lessonFiles = chapter.lessonIds.map((id) => paths.lesson.get(id));
    const file = `02_CURRICULUM/${version}/maps/${chapter.id}.canvas`;
    focusedMaps.push({
      file,
      root,
      groups: [
        { label: 'שיעורים · לפי סדר הלמידה', files: lessonFiles, color: '5' },
        {
          label: 'תרגולים מתוך השיעורים',
          files: chapter.lessonIds.map((id) => paths.exercise.get(id)),
          color: '3',
        },
        {
          label: 'מחוונים ודרישות להגשה',
          files: chapter.lessonIds.map((id) => paths.proof.get(id)).filter(Boolean),
          color: '4',
        },
        ...(templateWorkspaces.count
          ? [
              {
                label: 'מבנה תבניות טקסט וטבלה · מחוברות לעורך השיעור',
                files: chapter.lessonIds.flatMap((id) => templateWorkspaces.byLesson.get(id) || []),
                color: '3',
              },
            ]
          : []),
        {
          label: 'שאלות לחיזוק ההבנה · טיוטות מסומנות ברשומות',
          files: neighbors(lessonFiles, ['quiz']),
          color: '2',
        },
        {
          label: 'קשרים נוספים לפרק ולשיעורים',
          files: neighbors(
            [root, ...lessonFiles],
            ['skill', 'source', 'agent', 'module', 'asset', 'technology', 'knowledge-source'],
          ),
          color: '6',
        },
      ],
    });
    vertices.get(root).body +=
      `\n\n## מפת הקשרים של הפרק\n\n${wikilink(file, 'פתיחת מפת הפרק')} — השיעורים, התרגולים, המחוונים והמקורות הקשורים לפרק זה. הקשרים הנוספים מופיעים גם ברשומות עצמן.`;
    chapterLinks.push(`- ${wikilink(file, chapter.title)}`);
  }
  for (const agent of registry.agents) {
    const root = paths.agent.get(agent.id);
    const file = `01_AGENTS/maps/${agent.id}.canvas`;
    focusedMaps.push({
      file,
      root,
      groups: [
        { label: 'פרקים הקשורים לתחום העזרה', files: neighbors([root], ['module']), color: '5' },
        { label: 'מיומנויות ומקורות', files: neighbors([root], ['skill', 'source']), color: '2' },
        { label: 'כלים וממשקי הפעלה', files: neighbors([root], ['tool', 'api']), color: '6' },
        ...(templateWorkspaces.count
          ? [
              {
                label: 'הגדרות תבניות הקשורות לתחום העזרה',
                files: neighbors([root], ['interactive-template']),
                color: '3',
              },
            ]
          : []),
        {
          label: 'תיאום הצוות וכללי הפעולה',
          files: neighbors([root], ['orchestration', 'automation', 'index']),
          color: '4',
        },
      ],
    });
    vertices.get(root).body +=
      `\n\n## מפת הקשרים של המומחה\n\n${wikilink(file, 'פתיחת מפת המומחה')} — הפרקים הקשורים, המקורות והכלים המותרים. הקשרים מתארים תחומי עזרה אפשריים; השתתפות בפועל בתשובה מתועדת באפליקציה. מכל פרק אפשר לפתוח את מפת השיעורים שלו.`;
    agentLinks.push(`- ${wikilink(file, agent.titleHebrew || agent.title)}`);
  }
  vertices.get(index).body +=
    `\n\n## מפות לפי פרק\n\nבחר פרק כדי לראות את המסלול והקשרים שלו במפה נפרדת.\n\n${chapterLinks.join('\n')}\n\n## מפות לפי מומחה\n\n${agentLinks.join('\n')}`;
  vertices.get(sectionIndexes.curriculum).body +=
    `\n\n## מפות הפרקים\n\n${chapterLinks.join('\n')}`;
  vertices.get(sectionIndexes.agents).body += `\n\n## מפות המומחים\n\n${agentLinks.join('\n')}`;
  const files = new Map();
  for (const vertex of vertices.values()) {
    vertex.links.sort(
      (a, b) => a.to.localeCompare(b.to, 'en') || a.type.localeCompare(b.type, 'he'),
    );
    const metadata = {
      generated: true,
      schema_version: 1,
      kind: vertex.kind,
      entity_id: vertex.id,
      curriculum_version: version,
      ...vertex.metadata,
      related: [...new Set(vertex.links.map((link) => `[[${link.to.replace(/\.md$/, '')}]]`))],
    };
    const frontmatter = Object.entries(metadata)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n');
    files.set(
      vertex.file,
      `---\n${frontmatter}\n---\n\n# ${vertex.title}\n\n${vertex.body}\n\n## קשרים במפת הידע\n\n${vertex.links.map((link) => `- ${wikilink(link.to, vertices.get(link.to).title)} — ${link.type}`).join('\n')}\n`,
    );
  }
  const canvasNodes = [],
    canvasEdges = [],
    ids = new Map();
  const buckets = [
    ['מערכת ומומחים', ['root', 'index', 'orchestration', 'agent'], 0, 0, '#4'],
    ['פרקים ושיעורים', ['module', 'lesson', 'exercise'], 5000, 0, '#5'],
    [
      'הוכחות מעשיות',
      ['proof', 'submission-template', 'evaluation-key', 'interactive-template'],
      10000,
      0,
      '#3',
    ],
    ['מיומנויות ומקורות', ['skill', 'source', 'quiz'], 15000, 0, '#2'],
    [
      'ממשקים וקובצי עזר',
      ['tool', 'api', 'asset', 'configuration', 'automation', 'technology', 'knowledge-source'],
      20000,
      0,
      '#6',
    ],
  ];
  for (const [label, kinds, x, y, color] of buckets) {
    const members = [...vertices.values()].filter((vertex) => kinds.includes(vertex.kind));
    const rows = Math.ceil(members.length / 6);
    canvasNodes.push({
      id: `group-${digest(label).slice(0, 20)}`,
      type: 'group',
      x: x - 60,
      y: y - 100,
      width: 4740,
      height: rows * 200 + 160,
      label,
      color: color.slice(1),
    });
    members.forEach((vertex, i) => {
      const id = `file-${digest(vertex.file).slice(0, 24)}`;
      ids.set(vertex.file, id);
      canvasNodes.push({
        id,
        type: 'file',
        file: vertex.file,
        x: x + (i % 6) * 780,
        y: y + Math.floor(i / 6) * 200,
        width: 720,
        height: 160,
        color: color.slice(1),
      });
    });
  }
  const canvasPairs = new Map();
  for (const relation of relations) {
    const pair = [relation.from, relation.to].sort().join('\0');
    if (!canvasPairs.has(pair))
      canvasPairs.set(pair, { from: relation.from, to: relation.to, labels: new Set() });
    canvasPairs.get(pair).labels.add(relation.type);
  }
  for (const [pair, relation] of canvasPairs) {
    canvasEdges.push({
      id: `edge-${digest(pair).slice(0, 24)}`,
      fromNode: ids.get(relation.from),
      fromSide: 'right',
      toNode: ids.get(relation.to),
      toSide: 'left',
      fromEnd: 'arrow',
      toEnd: 'arrow',
      label: [...relation.labels].sort((a, b) => a.localeCompare(b, 'he')).join(' · '),
    });
  }
  files.set(
    'Root_Knowledge_Graph.canvas',
    `${JSON.stringify({ nodes: canvasNodes, edges: canvasEdges }, null, 2)}\n`,
  );
  // A readable entry view uses a few real examples. The full Canvas above retains every note.
  const firstLesson = lessons[0],
    firstModule = modules.find((module) => module.lessonIds.includes(firstLesson.id));
  const overviewColumns = [
    [sectionIndexes.orchestration, prime, policies],
    [
      sectionIndexes.agents,
      ...[...paths.agent.values()].filter((file) => file !== prime).slice(0, 2),
    ],
    [
      sectionIndexes.curriculum,
      paths.module.get(firstModule?.id),
      paths.lesson.get(firstLesson.id),
      paths.exercise.get(firstLesson.id),
    ],
    [sectionIndexes.proofs, paths.proof.get(firstLesson.id), paths.template.get(firstLesson.id)],
    [sectionIndexes.integrations, knowledge, ...paths.technology.values()].slice(0, 3),
  ];
  const overviewGroups = overviewColumns.map((members, column) => ({
    id: `overview-group-${column}`,
    type: 'group',
    x: column * 530 - 20,
    y: 260,
    width: 480,
    height: members.filter(Boolean).length * 220 + 50,
    label: vertices.get(members[0]).title,
    color: String(column + 1),
  }));
  const overviewNodes = [
    ...overviewGroups,
    {
      id: ids.get(index),
      type: 'file',
      file: index,
      x: 1050,
      y: 0,
      width: 440,
      height: 160,
      color: '4',
    },
  ];
  overviewColumns.forEach((members, column) =>
    members.filter(Boolean).forEach((file, row) => {
      overviewNodes.push({
        id: ids.get(file),
        type: 'file',
        file,
        x: column * 530,
        y: 320 + row * 220,
        width: 440,
        height: 160,
        color: String(column + 1),
      });
    }),
  );
  // Keep the entry map readable: a real relationship tree rather than every cross-link.
  // All cross-links and their labels remain in the full graph and in the linked notes.
  const overviewEdges = [];
  overviewColumns.forEach((members, column) => {
    const files = members.filter(Boolean);
    files.forEach((file, row) => {
      const parent = row === 0 ? index : column === 1 ? files[0] : files[row - 1];
      const fromNode = ids.get(parent),
        toNode = ids.get(file);
      const edge = canvasEdges.find(
        (candidate) =>
          (candidate.fromNode === fromNode && candidate.toNode === toNode) ||
          (candidate.fromNode === toNode && candidate.toNode === fromNode),
      );
      if (!edge) throw new Error('Missing real relationship in overview Canvas');
      const branch = column === 1 && row > 1;
      overviewEdges.push({
        ...edge,
        fromNode,
        toNode,
        fromSide: branch ? 'right' : 'bottom',
        toSide: branch ? 'right' : 'top',
        // The five section labels already explain root links without overlapping captions.
        label: row === 0 ? undefined : edge.label,
      });
    });
  });
  files.set(
    '00_ORCHESTRATION/System_Overview.canvas',
    `${JSON.stringify({ nodes: overviewNodes, edges: overviewEdges }, null, 2)}\n`,
  );
  for (const view of focusedMaps)
    files.set(
      view.file,
      `${JSON.stringify(focusedCanvas({ ...view, vertices, edges: canvasEdges, ids }), null, 2)}\n`,
    );
  return {
    files,
    relations,
    counts: {
      lessons: lessons.length,
      modules: modules.length,
      skills: skills.length,
      sources: sources.length,
      rubrics: assessments.length,
      templateWorkspaces: templateWorkspaces.count,
      exercises: paths.exercise.size,
      agents: registry.agents.length,
      tools: registry.tools.length,
      apis: apis.length,
      assets: publicAssets.length,
      quizzes: paths.quiz.size,
      systemQuizzes,
      technologies: paths.technology.size,
      discoverySources: paths.feed.size,
      documents: vertices.size,
      relations: relations.length,
      canvasFileNodes: ids.size,
      overviewFileNodes: overviewNodes.filter((node) => node.type === 'file').length,
      chapterCanvases: modules.length,
      agentCanvases: registry.agents.length,
    },
  };
}
