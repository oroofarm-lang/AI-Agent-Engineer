import type { Connection } from '../db/connection';
import type { ReturnTypeOfCurriculum } from './types';
import type { MentorInput } from './policy';
import { templateDraftRepository } from '../db/template-drafts';
import { templateMarkdown } from '../templates/formats';

/** A reference is consent to one owned saved revision, never a client-provided document. */
export function mentorTemplateContext(
  connection: Connection,
  curriculum: ReturnTypeOfCurriculum,
  userId: string,
  input: MentorInput,
) {
  const drafts = templateDraftRepository(connection, curriculum, userId);
  const templateProgress = drafts.mentorSummary(input.lessonId);
  if (!input.selectedTemplate) return { templateProgress, selectedTemplate: null };
  if (!input.lessonId || input.activeTask?.kind !== 'assessment')
    throw new Error('INVALID_TEMPLATE_CONTEXT');
  const draft = drafts.get({ templateId: input.selectedTemplate.templateId });
  if (
    draft.definition.lessonId !== input.lessonId ||
    draft.definition.criterionId !== input.activeTask.id
  )
    throw new Error('INVALID_TEMPLATE_CONTEXT');
  if (
    draft.readOnly ||
    draft.revision !== input.selectedTemplate.revision ||
    draft.definitionHash !== input.selectedTemplate.definitionHash
  )
    throw new Error('TEMPLATE_REVISION_CONFLICT');
  const source = templateMarkdown(draft.document, draft.definition);
  const text = source.slice(0, 8000);
  return {
    templateProgress,
    selectedTemplate: {
      ...input.selectedTemplate,
      lessonId: draft.definition.lessonId,
      criterionId: draft.definition.criterionId,
      format: 'markdown',
      text,
      includedCharacters: text.length,
      totalCharacters: source.length,
      truncated: text.length < source.length,
      execution: 'not-run',
      grade: null,
    },
  };
}
