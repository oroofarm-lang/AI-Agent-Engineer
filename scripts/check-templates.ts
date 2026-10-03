import raw from '../content/templates/releases/1.0.0.json';
import baseline from '../content/releases/2.2.0/assessments.json';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { assessmentSchema } from '../src/lib/curriculum/assessment';
import { validateTemplateCatalog } from '../src/lib/templates/schema';
const templates = validateTemplateCatalog(raw, {
  version: raw.sourceCurriculumVersion,
  assessments: baseline.map((assessment) => assessmentSchema.parse(assessment)),
});
// Approved lesson-body releases can reuse unchanged rubrics; rubric edits need new bindings.
validateTemplateCatalog(raw, {
  version: raw.sourceCurriculumVersion,
  assessments: loadCurriculum().assessments,
});
console.log(
  `Templates ${templates.version}: ${templates.templates.length} exact criterion workspaces, ${templates.templates.filter((definition) => definition.kind === 'table').length} table structures. Lesson editors and owned autosave are connected; direct frozen template submission remains unfinished.`,
);
