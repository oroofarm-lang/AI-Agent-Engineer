import { createHash } from 'node:crypto';
import type { Connection } from '../db/connection';
import type { ReturnTypeOfCurriculum } from './types';
import { mentorRepository } from '../db/mentor';
import { repository } from '../db/repository';
import { reflectionRepository } from '../db/reflections';
import { canStudyLesson } from '../domain/learning-path';
import { mentorInstructions, type MentorInput } from './policy';
import type { MentorProvider } from './provider';
import { markdownCards } from '../curriculum/cards';
import type { KnowledgeSnapshot } from './knowledge';

export async function sendMentorMessage(
  connection: Connection,
  curriculum: ReturnTypeOfCurriculum,
  userId: string,
  input: MentorInput,
  provider: MentorProvider,
  body: string,
  knowledge?: KnowledgeSnapshot,
) {
  const learner = repository(connection, curriculum, userId);
  const progress = learner.progress();
  const lesson = input.lessonId
    ? curriculum.lessons.find(
        (item) => item.id === input.lessonId && item.publicationStatus === 'published',
      )
    : undefined;
  if (input.lessonId && !lesson) throw new Error('UNKNOWN_LESSON');
  let task: unknown = null;
  if (input.activeTask) {
    if (!lesson) throw new Error('INVALID_TASK_CONTEXT');
    if (input.activeTask.kind === 'assessment') {
      const assessment = curriculum.assessments.find((item) => item.lessonId === lesson.id);
      const criterion = assessment?.criteria.find((item) => item.id === input.activeTask!.id);
      if (!criterion) throw new Error('INVALID_TASK_CONTEXT');
      task = { kind: 'assessment', criterion, assessmentId: assessment!.id };
    } else {
      const sections = body.split(/^## /m).filter(Boolean);
      const match = /^section-(\d+)-(\d+)$/.exec(input.activeTask.id);
      const section = match ? sections[Number(match[1])] : undefined;
      const card = section
        ? markdownCards(section.slice(section.indexOf('\n') + 1))[Number(match![2])]
        : undefined;
      if (!card) throw new Error('INVALID_TASK_CONTEXT');
      task = {
        kind: 'lesson',
        id: input.activeTask.id,
        title: section!.slice(0, section!.indexOf('\n')),
        body: card.slice(0, 8000),
      };
    }
  }
  if (lesson && !canStudyLesson(curriculum, progress, lesson))
    throw new Error('FOUNDATION_REQUIRED');
  const boss = Boolean(lesson?.titleEn.toLowerCase().includes('boss') || lesson?.day === 80);
  const helpLevel =
    boss || input.learningMode === 'interview' ? Math.min(2, input.helpLevel) : input.helpLevel;
  const mentors = mentorRepository(connection, userId);
  const run = mentors.reserve({
    id: input.requestId,
    threadId: input.threadId,
    lessonId: input.lessonId,
    version: curriculum.version,
    fingerprint: createHash('sha256').update(JSON.stringify(input)).digest('hex'),
    message: input.message,
    mode: input.mode,
    helpLevel,
  });
  if (run.duplicate) return { ...run, messages: mentors.messages(run.threadId) };
  try {
    const notes = input.includeNotes && lesson ? learner.note(lesson.id).slice(0, 8000) : '';
    const reflections = reflectionRepository(connection, curriculum, userId);
    const selected = input.includeReflections
      ? {
          journal: reflections
            .journals()
            .filter((item) => !lesson || item.lessonId === lesson.id)
            .slice(0, 2)
            .map((item) => ({ title: item.title, content: item.content.slice(0, 3000) })),
          failures: reflections
            .failures()
            .filter((item) => !lesson || item.lessonId === lesson.id)
            .slice(0, 2)
            .map((item) => ({ title: item.title, content: item.content.slice(0, 3000) })),
        }
      : undefined;
    const context = JSON.stringify({
      curriculumVersion: curriculum.version,
      activeTask: task,
      knowledge: knowledge || null,
      skillMastery: connection.sqlite
        .prepare(
          'SELECT skill_id,level,curriculum_version FROM skill_mastery WHERE user_id=? LIMIT 80',
        )
        .all(userId),
      lesson: lesson
        ? {
            id: lesson.id,
            title: lesson.title,
            verification: lesson.verification,
            body: body.slice(0, 24000),
          }
        : null,
      progress: progress.slice(0, 160).map(({ lessonId, state }) => ({ lessonId, state })),
      mastery: 'No automated mastery certification. Only persisted assessment states are facts.',
      sources: lesson?.sourceIds
        .map((id) => curriculum.sources.find((source) => source.id === id))
        .map(
          (source) =>
            source && { title: source.title, url: source.url, lastVerified: source.lastVerified },
        ),
      selectedNotes: notes,
      selectedReflections: selected,
      selectedCode: input.code,
    });
    const messages = mentors
      .messages(run.threadId)
      .slice(-12)
      .map((message) => ({ role: message.role, content: message.body.slice(0, 8000) }));
    const reply = await provider.reply({
      instructions: mentorInstructions(input, boss),
      context,
      messages,
    });
    mentors.finish(input.requestId, reply);
    return { threadId: run.threadId, state: 'COMPLETE', messages: mentors.messages(run.threadId) };
  } catch (error) {
    try {
      mentors.finish(input.requestId);
    } catch {
      /* A stale run is already failed; preserve it. */
    }
    throw error;
  }
}
