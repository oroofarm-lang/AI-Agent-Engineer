import { createHash } from 'node:crypto';

const stableId = /^[A-Za-z][A-Za-z0-9_.-]*$/;
const digest = (value) => createHash('sha256').update(value).digest('hex');
const quote = (value) => JSON.stringify(String(value));
const safeTitle = (value) => String(value).replace(/[\[\]|\r\n]/g, ' ');
const wikilink = (file, title) => `[[${file.replace(/\.md$/, '')}|${safeTitle(title)}]]`;

/** Public source descriptors point to real files; they are not uploaded learner artifacts. */
export const publicAssetCatalog = [
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
    methods: ['POST'],
    title: 'סנכרון גרף הידע הציבורי',
    scope: 'operator',
    sourcePath: 'src/app/api/vault/sync/route.ts',
    description:
      'סנכרון למפעיל מאומת המופיע ברשימת המנהלים. אינו מקבל נתיב מהמזמין. מייצא את הקטלוג הציבורי בלבד, שומר גרסאות ישנות ומסרב לדרוס רשומה שנערכה ידנית.',
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
    !/^(src|content\/labs|public\/course-data|scripts)\//.test(sourcePath)
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
    `הכספת מקשרת בין התוכנית שפורסמה, מומחי הלמידה, תרגילים, מחוונים וחיבורי המערכת. גרסת הקורס הפעילה: **${version}**.\n\nפתח את [[Root_Knowledge_Graph.canvas|המפה החזותית המלאה]]. אפשר להזיז ולהגדיל את המפה כדי להגיע לכל פרק ושיעור.\n\nהכספת מכילה חומר ציבורי בלבד. מחברות, שיחות, חשבונות, ציונים וקובצי הגשה פרטיים נשארים מחוץ לגרף. שמירה ב־Obsidian אינה משנה התקדמות באפליקציה.\n\nייצוא קודם בתיקיית קורס נשמר. הקבצים שנוצרו מוגנים מפני דריסת עריכה ידנית; רשומה ששונתה עוצרת את הסנכרון לפני כתיבה.`,
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
  if (quizBank) {
    const quizzes = Array.isArray(quizBank) ? quizBank : quizBank.quizzes;
    if (!Array.isArray(quizzes)) throw new Error('Invalid public quiz bank');
    const quizVersion = quizBank.version || '0.0.0';
    if (!/^\d+\.\d+\.\d+$/.test(quizVersion)) throw new Error('Invalid quiz bank version');
    if (quizBank.curriculumVersion && quizBank.curriculumVersion !== version)
      throw new Error('Quiz curriculum version mismatch');
    const draft = quizBank.status !== 'published' || quizBank.reviewStatus !== 'approved';
    const quizRoot = `02_CURRICULUM/quiz-banks/${quizVersion}${draft ? '-draft' : ''}`;
    const quizIndex = add(
      `${quizRoot}/Index.md`,
      'index',
      'QUIZ_BANK_INDEX',
      draft ? 'טיוטת שאלות לחיזוק ההבנה' : 'שאלות לחיזוק ההבנה',
      draft
        ? 'השאלות נכתבו לפי השיעורים, אך עדיין דורשות ביקורת הוראה אנושית. הן אינן פעילות בשיעורים ואינן מעניקות ציון או שליטה. נשמרות כאן לצורך קריאה וביקורת.'
        : 'שאלות לחיזוק ההבנה, נפרדות מהגשת ראיות והערכת שליטה.',
      { quiz_version: quizVersion, review_status: draft ? 'requires-human-review' : 'approved' },
    );
    connect(sectionIndexes.curriculum, quizIndex, draft ? 'טיוטה לביקורת' : 'חיזוק ההבנה');
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
        `${draft ? '**טיוטה לביקורת אנושית — אינה פעילה בשיעורים.**\n\n' : ''}${quiz.question}\n\n${quiz.options.map((option) => `- ${option.id}: ${option.text}`).join('\n')}\n\n## תשובה והסבר ללמידה\n\nאפשרות: ${quiz.correctOptionId}.\n\n${quiz.explanation}\n\nקטע מקור בשיעור: ${quiz.sourceSection}. השאלה מיועדת לחיזוק הבנה; היא אינה אישור שליטה מקצועית.`,
        {
          quiz_id: quiz.id,
          lesson_id: quiz.lessonId,
          quiz_version: quizVersion,
          review_status: draft ? 'requires-human-review' : 'approved',
          source_section: quiz.sourceSection,
        },
      );
      paths.quiz.set(quiz.id, file);
      connect(quizIndex, file, draft ? 'שאלה לביקורת' : 'בדיקת הבנה');
      connect(paths.lesson.get(quiz.lessonId), file, 'בדיקת הבנה');
      connect(paths.exercise.get(quiz.lessonId), file, 'חיזוק התרגול');
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
    ['הוכחות מעשיות', ['proof', 'submission-template', 'evaluation-key'], 10000, 0, '#3'],
    ['מיומנויות ומקורות', ['skill', 'source', 'quiz'], 15000, 0, '#2'],
    ['ממשקים וקובצי עזר', ['tool', 'api', 'asset', 'configuration', 'automation'], 20000, 0, '#6'],
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
  const canvasPairs = new Set();
  for (const relation of relations) {
    const pair = [relation.from, relation.to].sort().join('\0');
    if (canvasPairs.has(pair)) continue;
    canvasPairs.add(pair);
    canvasEdges.push({
      id: `edge-${digest(pair).slice(0, 24)}`,
      fromNode: ids.get(relation.from),
      fromSide: 'right',
      toNode: ids.get(relation.to),
      toSide: 'left',
      fromEnd: 'arrow',
      toEnd: 'arrow',
      label: relation.type,
    });
  }
  files.set(
    'Root_Knowledge_Graph.canvas',
    `${JSON.stringify({ nodes: canvasNodes, edges: canvasEdges }, null, 2)}\n`,
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
      exercises: paths.exercise.size,
      agents: registry.agents.length,
      tools: registry.tools.length,
      apis: apis.length,
      assets: publicAssets.length,
      quizzes: paths.quiz.size,
      documents: vertices.size,
      relations: relations.length,
      canvasFileNodes: ids.size,
    },
  };
}
