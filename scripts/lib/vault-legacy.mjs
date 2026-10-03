// Preserve the established course-reading paths alongside the new complete public graph.
export function buildLegacyFiles(curriculum, lessonBodies) {
  const files = new Map(),
    base = `קורס/${curriculum.version}`;
  const sections = {
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
  function convert(body) {
    body = body.replace(/^## (.+)$/gm, (_line, section) => `## ${sections[section] || section}`);
    return body.replace(/```learning-flow\n([\s\S]*?)\n```/g, (_block, text) => {
      const data = JSON.parse(text),
        nodes = data.steps.map(
          (step, index) => `  N${index}["${step.label.replaceAll('"', "'")}"]`,
        ),
        arrows = data.steps.slice(1).map((_step, index) => `  N${index} --> N${index + 1}`);
      return `### ${data.title}\n\n\`\`\`mermaid\nflowchart TD\n${[...nodes, ...arrows].join('\n')}\n\`\`\`\n\n${data.steps.map((step, index) => `**${index + 1}. ${step.label}**\n\n${step.detail}\n\nבדוגמה: ${step.example}`).join('\n\n')}\n\n${data.conclusion}`;
    });
  }
  const link = (lesson) => `[[${base}/שיעורים/${lesson.id}|${lesson.title}]]`;
  for (const lesson of curriculum.lessons.filter(
    (item) => item.publicationStatus === 'published',
  )) {
    const chapter = curriculum.modules.find((item) => item.lessonIds.includes(lesson.id)),
      index = chapter.lessonIds.indexOf(lesson.id);
    const navigation = [
      index > 0
        ? `הקודם: ${link(curriculum.lessons.find((item) => item.id === chapter.lessonIds[index - 1]))}`
        : '',
      `[[${base}/פרקים/${chapter.id}|לפרק ${chapter.title}]]`,
      index < chapter.lessonIds.length - 1
        ? `הבא: ${link(curriculum.lessons.find((item) => item.id === chapter.lessonIds[index + 1]))}`
        : '',
    ]
      .filter(Boolean)
      .join(' · ');
    files.set(
      `${base}/שיעורים/${lesson.id}.md`,
      `---\nlesson_id: ${lesson.id}\ncurriculum_version: ${curriculum.version}\n---\n\n# ${lesson.title}\n\n${navigation}\n\n${convert(lessonBodies[lesson.id])}\n\n${navigation}\n`,
    );
  }
  for (const chapter of curriculum.modules)
    files.set(
      `${base}/פרקים/${chapter.id}.md`,
      `# ${chapter.title}\n\n${chapter.description}\n\n## מה בונים?\n\n${chapter.outcome}\n\n## השיעורים לפי הסדר\n\n${chapter.lessonIds.map((id, index) => `${index + 1}. ${link(curriculum.lessons.find((item) => item.id === id))}`).join('\n')}\n\n[[${base}/תוכנית הקורס|לתוכנית הקורס]]\n`,
    );
  files.set(
    `${base}/תוכנית הקורס.md`,
    `# תוכנית הקורס\n\nמתחילים בפרק החובה של היסודות, ואז בוחרים התמחות. תרגול, הגשת ראיות והערכת שליטה הם שלבים נפרדים.\n\n${curriculum.modules.map((chapter, index) => `${index + 1}. [[${base}/פרקים/${chapter.id}|${chapter.title}]] — ${chapter.lessonIds.length} יחידות`).join('\n')}\n\n[לאפליקציית הלמידה המקומית](http://127.0.0.1:3000/)\n`,
  );
  return files;
}
