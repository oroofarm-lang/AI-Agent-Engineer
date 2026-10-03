import 'server-only';
import rawCatalog from '../../../content/templates/releases/1.0.0.json';
import { templateCatalogSchema, validateTemplateCatalog } from './schema';
import { templateHash } from './hash';
export { templateHash } from './hash';

export const publicTemplateCatalog = templateCatalogSchema.parse(rawCatalog);
export function templatesForAssessment(assessment: {
  id: string;
  lessonId: string;
  version: string;
  criteria: { id: string; prompt: string; evidenceHint: string }[];
}) {
  return assessment.criteria.map((criterion) => {
    const definition = publicTemplateCatalog.templates.find(
      (item) => item.assessmentId === assessment.id && item.criterionId === criterion.id,
    );
    if (
      !definition ||
      definition.lessonId !== assessment.lessonId ||
      definition.rubricVersion !== assessment.version ||
      definition.prompt !== criterion.prompt ||
      definition.evidenceHint !== criterion.evidenceHint
    )
      throw new Error('TEMPLATE_CRITERION_DRIFT');
    return { definition, hash: templateHash(definition) };
  });
}
export { validateTemplateCatalog };
