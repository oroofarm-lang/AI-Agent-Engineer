/** Public definitions only. Filled learner documents and private draft storage are never inputs. */
export function addTemplateWorkspaces({
  catalog,
  assessments,
  lessons,
  registry,
  paths,
  add,
  connect,
  sectionIndex,
  sourceLink,
}) {
  if (!catalog) return { count: 0, byLesson: new Map() };
  if (
    catalog.schemaVersion !== 1 ||
    !/^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(catalog.version) ||
    !/^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(catalog.sourceCurriculumVersion) ||
    !Array.isArray(catalog.templates)
  )
    throw new Error('Invalid public template catalog');
  const sourcePath = `content/templates/releases/${catalog.version}.json`;
  const root = `03_PRACTICAL_PROOFS/template-workspaces/${catalog.version}`;
  const index = add(
    `${root}/Index.md`,
    'index',
    'TEMPLATE_WORKSPACES_INDEX',
    'תבניות טקסט וטבלה לכל סעיפי ההערכה',
    'הגדרות ציבוריות של מבנה התשובות: טקסט, כותרות טבלה ושורות התחלה. הן אינן עבודות שהוגשו. שירות שמירת הטיוטות הפרטיות ממומש בממשק ה־API המקושר. עורכי הטקסט והטבלה, השמירה האוטומטית והייבוא והייצוא של JSON ו־CSV מחוברים לממשק השיעור. הלומד יכול לבחור טיוטות שמורות ולהגיש אותן בלחצן ״הגש מתוך הטמפלייט״. המערכת מצרפת עותק קבוע של התוכן וההגדרה להגשה הפרטית, עם אפשרות לכלול אותה בתיק העבודות. הייבוא, הייצוא ובדיקת מבנה הנתונים ממומשים בקובצי המקור המקושרים.\n\n' +
      sourceLink(sourcePath),
    {
      template_version: catalog.version,
      source_curriculum_version: catalog.sourceCurriculumVersion,
      implementation_status: 'editors-autosave-frozen-template-submission',
    },
  );
  connect(sectionIndex, index, 'מבנה תבניות ההגשה');
  const expected = new Map();
  for (const assessment of assessments)
    for (const criterion of assessment.criteria)
      expected.set(`${assessment.id}:${criterion.id}`, { assessment, criterion });
  if (catalog.templates.length !== expected.size) throw new Error('Template coverage mismatch');
  const seen = new Set(),
    byLesson = new Map();
  for (const definition of catalog.templates) {
    const key = `${definition.assessmentId}:${definition.criterionId}`;
    const bound = expected.get(key);
    if (
      !bound ||
      seen.has(key) ||
      definition.id !== `TEMPLATE_${definition.assessmentId}_${definition.criterionId}` ||
      definition.version !== catalog.version ||
      definition.lessonId !== bound.assessment.lessonId ||
      definition.rubricVersion !== bound.assessment.version ||
      definition.prompt !== bound.criterion.prompt ||
      definition.evidenceHint !== bound.criterion.evidenceHint ||
      !['table', 'markdown'].includes(definition.kind) ||
      typeof definition.guidance !== 'string' ||
      definition.guidance.length < 20
    )
      throw new Error('Template criterion mismatch');
    seen.add(key);
    const table = definition.kind === 'table' ? definition.starter : undefined;
    if (
      definition.kind === 'table' &&
      (!table ||
        !Array.isArray(table.columns) ||
        !table.columns.length ||
        table.columns.length > 12 ||
        !Array.isArray(table.rows) ||
        table.rows.length > 100 ||
        table.columns.some(
          (column) =>
            !/^[A-Z][A-Z0-9_]{0,199}$/.test(column.id) || typeof column.label !== 'string',
        ) ||
        new Set(table.columns.map((column) => column.id)).size !== table.columns.length ||
        !Number.isInteger(definition.minimumRows) ||
        definition.minimumRows < 1 ||
        definition.minimumRows > table.rows.length ||
        table.rows.some(
          (row) =>
            !Array.isArray(row) ||
            row.length !== table.columns.length ||
            row.some((cell) => typeof cell !== 'string'),
        ))
    )
      throw new Error('Invalid template table');
    const lesson = lessons.find((item) => item.id === definition.lessonId);
    if (!lesson) throw new Error('Template without published lesson');
    const body = `## המשימה\n\n${definition.prompt}\n\n## מה לצרף\n\n${definition.evidenceHint}\n\n## מבנה העבודה\n\n${definition.guidance}\n\n${table ? 'עמודות הטבלה:\n\n' + table.columns.map((column) => `- ${column.label}`).join('\n') + `\n\nמספר השורות בתבנית: ${table.rows.length}. מספר השורות שיש למלא במלואן: ${definition.minimumRows}.\n\n\`\`\`json\n` + JSON.stringify({ columns: table.columns.map(({ id, label }) => ({ id, label })), rows: table.rows }, null, 2) + '\n\`\`\`' : 'תבנית טקסט בפורמט Markdown. המסמך מתחיל ריק; כתיבת כותרות בלבד אינה משלימה את המשימה.'}\n\n${sourceLink(sourcePath)}\n\nזו הגדרת תבנית בלבד. אין כאן תשובת לומד, הגשה או תוצאה של הרצת קוד. עורך השיעור מחובר לשירות שמירת הטיוטות הפרטיות. בהגשה מתוך התבנית מצורף לעבודה הפרטית עותק קבוע של הטיוטה השמורה, כולל ההגדרה וגרסאות העריכה והקורס; אין לייצא לכאן תוכן טיוטות או עבודות אישיות.`;
    const file = add(
      `${root}/${definition.id}.md`,
      'interactive-template',
      definition.id,
      `תבנית ${definition.kind === 'table' ? 'טבלה' : 'טקסט'}: ${lesson.title} · ${definition.criterionId}`,
      body,
      {
        template_id: definition.id,
        template_version: definition.version,
        lesson_id: definition.lessonId,
        assessment_id: definition.assessmentId,
        criterion_id: definition.criterionId,
        rubric_version: definition.rubricVersion,
        editor_kind: definition.kind,
        source_path: sourcePath,
        implementation_status: 'editors-autosave-frozen-template-submission',
      },
    );
    if (!byLesson.has(definition.lessonId)) byLesson.set(definition.lessonId, []);
    byLesson.get(definition.lessonId).push(file);
    for (const [target, relation] of [
      [index, 'הגדרת תבנית'],
      [paths.lesson.get(definition.lessonId), 'מבנה תשובה לשיעור'],
      [paths.exercise.get(definition.lessonId), 'ארגון העבודה'],
      [paths.proof.get(definition.lessonId), 'סעיף במחוון'],
      [paths.template.get(definition.lessonId), 'תבנית סעיף'],
      [paths.key.get(definition.lessonId), 'תנאי בדיקה'],
      [paths.skill.get(bound.criterion.skillId), 'מיומנות בתשובה'],
    ])
      connect(file, target, relation);
    for (const sourceId of lesson.sourceIds)
      connect(file, paths.source.get(sourceId), 'מקור לשיעור');
    for (const agent of registry.agents) {
      if (
        agent.role === 'orchestrator' ||
        agent.role === 'synthesis' ||
        agent.skillIds.includes(bound.criterion.skillId) ||
        agent.moduleIds.some((moduleId) =>
          paths.moduleLessons.get(moduleId)?.includes(definition.lessonId),
        )
      )
        connect(file, paths.agent.get(agent.id), 'תחום עזרה בתבנית');
    }
    for (const id of [
      'TEMPLATE_SCHEMA',
      'TEMPLATE_FORMATS',
      'TEMPLATE_DRAFT_CONTRACT',
      'TEMPLATE_SUBMISSION_CONTRACT',
      'PROOF_COMPONENT',
    ])
      if (paths.asset.has(id)) connect(file, paths.asset.get(id), 'קוד מבנה ופורמטים');
    if (paths.api.has('TEMPLATE_DRAFTS'))
      connect(file, paths.api.get('TEMPLATE_DRAFTS'), 'שמירת טיוטה פרטית');
  }
  return { count: seen.size, byLesson };
}
