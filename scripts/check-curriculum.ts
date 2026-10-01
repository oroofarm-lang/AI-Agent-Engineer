import { loadCurriculum } from '../src/lib/curriculum/load';
const c = loadCurriculum(process.argv[2]);
console.log(
  `Curriculum ${c.version}: ${c.weeks.length} weeks, ${c.lessons.length} lessons, ${c.lessons.filter((l) => l.publicationStatus === 'published').length} published, ${c.skills.length} skills, ${c.assessments.length} practical rubric. Integrity passed.`,
);
