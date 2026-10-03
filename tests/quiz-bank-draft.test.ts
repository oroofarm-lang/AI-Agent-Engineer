import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { loadCurriculum, readLesson } from '../src/lib/curriculum/load';

const draftPath = 'content/authoring/quiz-bank/1.0.0-draft.json';
const reportPath = 'docs/quality-reports/2026-10-03-quiz-draft.md';
const curriculum = loadCurriculum();
const optionId = z.enum(['A', 'B', 'C']);
const bankSchema = z.strictObject({
  version: z.literal('1.0.0'),
  status: z.literal('draft'),
  curriculumVersion: z.literal('2.2.0'),
  reviewStatus: z.literal('requires-human-review'),
  quizzes: z.array(
    z.strictObject({
      id: z.string().regex(/^QUIZ_[A-Z][A-Z0-9_]+$/),
      lessonId: z.string().regex(/^[A-Z][A-Z0-9_]+$/),
      question: z.string().min(25),
      options: z.array(z.strictObject({ id: optionId, text: z.string().min(5) })).length(3),
      correctOptionId: optionId,
      explanation: z.string().min(70),
      sourceSection: z.string().min(1),
      sourceIds: z.array(z.string().regex(/^[A-Z][A-Z0-9_]+$/)).min(1),
    }),
  ),
});
const bank = bankSchema.parse(JSON.parse(readFileSync(draftPath, 'utf8')));
const digest = (body: string) => createHash('sha256').update(body).digest('hex');
const normalized = (text: string) => text.normalize('NFKC').trim().replace(/\s+/g, ' ');

/** Ignore headings inside code fences when resolving the published H2 source section. */
function sections(body: string) {
  const result = new Map<string, string>();
  let section: string | undefined;
  let fence: string | undefined;
  for (const line of body.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1][0];
      else if (marker[1][0] === fence) fence = undefined;
    }
    const heading = !fence && line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      section = heading[1];
      result.set(section, '');
    } else if (section) result.set(section, `${result.get(section)}\n${line}`);
  }
  return result;
}

describe('isolated reinforcement-question draft', () => {
  it('covers each of the 139 published lessons once, preserving canonical IDs and order', () => {
    expect(curriculum.version).toBe(bank.curriculumVersion);
    expect(bank.quizzes).toHaveLength(139);
    expect(new Set(bank.quizzes.map((quiz) => quiz.id)).size).toBe(139);
    expect(bank.quizzes.map((quiz) => quiz.lessonId)).toEqual(
      curriculum.lessons.map((lesson) => lesson.id),
    );
    for (const quiz of bank.quizzes) expect(quiz.id).toBe(`QUIZ_${quiz.lessonId}`);
  });

  it('resolves every question to a substantive published section and existing lesson sources', () => {
    const validSources = new Set(curriculum.sources.map((source) => source.id));
    for (const quiz of bank.quizzes) {
      const lesson = curriculum.lessons.find((item) => item.id === quiz.lessonId)!;
      const section = sections(readLesson(quiz.lessonId)).get(quiz.sourceSection);
      expect(section, `${quiz.id}: missing published source section`).toBeDefined();
      expect(section!.trim().length, `${quiz.id}: empty source section`).toBeGreaterThan(30);
      expect(new Set(quiz.sourceIds).size).toBe(quiz.sourceIds.length);
      for (const source of quiz.sourceIds) {
        expect(validSources.has(source), `${quiz.id}: unknown source ${source}`).toBe(true);
        expect(lesson.sourceIds, `${quiz.id}: source not assigned to lesson`).toContain(source);
      }
    }
  });

  it('provides three distinct choices and spreads correct answers across all three positions', () => {
    const distribution = { A: 0, B: 0, C: 0 };
    for (const quiz of bank.quizzes) {
      expect(quiz.options.map((option) => option.id)).toEqual(['A', 'B', 'C']);
      expect(new Set(quiz.options.map((option) => normalized(option.text))).size).toBe(3);
      expect(quiz.options.some((option) => option.id === quiz.correctOptionId)).toBe(true);
      distribution[quiz.correctOptionId]++;
    }
    expect(distribution).toEqual({ A: 47, B: 46, C: 46 });
  });

  it('contains individually authored questions and explanations rather than a reused placeholder', () => {
    expect(new Set(bank.quizzes.map((quiz) => normalized(quiz.question))).size).toBe(139);
    expect(new Set(bank.quizzes.map((quiz) => normalized(quiz.explanation))).size).toBe(139);
    for (const quiz of bank.quizzes) {
      expect(quiz.question).toMatch(/[א-ת]/);
      expect(quiz.explanation).toMatch(/[א-ת]/);
      expect(quiz.question).not.toMatch(/TODO|PLACEHOLDER|שאלה לדוגמה|השאלה תתווסף/);
      // Structural checks cannot certify instructional quality or the truth of an answer.
      expect(quiz.explanation).not.toMatch(/אומת ב־|נבדק במלואו|מובטח ב־100/);
    }
  });

  it('keeps the draft outside learner selection; only the public exporter and verified operator entry point can read it', () => {
    expect(bank).toMatchObject({ status: 'draft', reviewStatus: 'requires-human-review' });
    for (const file of readdirSync('src', { recursive: true })) {
      if (typeof file !== 'string' || !/\.(?:ts|tsx|js|jsx|json)$/.test(file)) continue;
      const name = file.replaceAll(path.sep, '/');
      if (name === 'lib/vault/sync.ts') continue;
      const body = readFileSync(path.join('src', file), 'utf8');
      if (name === 'lib/quizzes/draft.ts') {
        expect(body).toContain("import 'server-only'");
        expect(body).toContain('if (!isOperator(actor))');
        continue;
      }
      expect(body, `runtime references unreleased quiz bank: ${file}`).not.toContain(
        '1.0.0-draft.json',
      );
      expect(body, `runtime references authoring quiz directory: ${file}`).not.toContain(
        'content/authoring/quiz-bank',
      );
    }
  });

  it('preserves the released lesson bytes and records the exact public files read', () => {
    const report = readFileSync(reportPath, 'utf8');
    const recorded = [...report.matchAll(/^\| +([A-Z][A-Z0-9_]+) +\| +`([a-f0-9]{64})` +\|/gm)];
    expect(recorded).toHaveLength(139);
    expect(new Set(recorded.map((row) => row[1])).size).toBe(139);
    for (const lesson of curriculum.lessons) {
      const active = readLesson(lesson.id);
      const released = readLesson(lesson.id, 'content/releases/2.2.0');
      expect(active, `${lesson.id}: immutable lesson changed`).toBe(released);
      expect(recorded.find((row) => row[1] === lesson.id)?.[2]).toBe(digest(active));
    }
    expect(report).toContain('requires-human-review');
    expect(report).toContain('139 / 139');
  });
});
