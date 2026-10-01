import { and, desc, eq } from 'drizzle-orm';
import type { Connection } from './connection';
import type { Curriculum, Skill } from '../curriculum/schema';
import { journalEntries, failureEntries, failureTestCases } from './schema';
import {
  journalSchema,
  failureSchema,
  testCaseSchema,
  type ReflectionKind,
} from '../domain/reflections';
export function reflectionRepository(
  { db, sqlite }: Connection,
  curriculum: Curriculum & { skills: Skill[] },
  userId: string,
) {
  function validateLesson(id: string) {
    if (id && !curriculum.lessons.some((l) => l.id === id)) throw new Error('UNKNOWN_LESSON');
  }
  return {
    journals: () =>
      db
        .select()
        .from(journalEntries)
        .where(eq(journalEntries.userId, userId))
        .orderBy(desc(journalEntries.updatedAt))
        .all(),
    failures: () =>
      db
        .select()
        .from(failureEntries)
        .where(eq(failureEntries.userId, userId))
        .orderBy(desc(failureEntries.updatedAt))
        .all(),
    cases: () =>
      db
        .select()
        .from(failureTestCases)
        .where(eq(failureTestCases.userId, userId))
        .orderBy(desc(failureTestCases.createdAt))
        .all(),
    save(kind: ReflectionKind, raw: unknown) {
      const parsed = kind === 'journal' ? journalSchema.parse(raw) : failureSchema.parse(raw);
      validateLesson(parsed.lessonId);
      if (
        'skillId' in parsed &&
        parsed.skillId &&
        !curriculum.skills.some((s) => s.id === parsed.skillId)
      )
        throw new Error('UNKNOWN_SKILL');
      const table = kind === 'journal' ? journalEntries : failureEntries;
      const { id, revision, ...payload } = parsed;
      const content = JSON.stringify(payload);
      return sqlite.transaction(() => {
        const row = db
          .select()
          .from(table)
          .where(and(eq(table.id, id), eq(table.userId, userId)))
          .get();
        if (row && row.content === content) return row.revision; // Retries do not duplicate entries.
        if (row ? row.revision !== revision : revision !== 0) throw new Error('STALE_ENTRY');
        const now = new Date().toISOString(),
          nextRevision = (row?.revision ?? 0) + 1;
        const values = {
          userId,
          lessonId: parsed.lessonId || null,
          title: parsed.title,
          content,
          revision: nextRevision,
          updatedAt: now,
        };
        if (kind === 'failure' && 'category' in parsed) {
          const failureValues = {
            ...values,
            category: parsed.category,
            skillId: parsed.skillId || null,
          };
          if (row)
            db.update(failureEntries)
              .set(failureValues)
              .where(and(eq(failureEntries.id, id), eq(failureEntries.userId, userId)))
              .run();
          else
            db.insert(failureEntries)
              .values({
                ...failureValues,
                id,
                curriculumVersion: curriculum.version,
                createdAt: now,
              })
              .run();
        } else {
          if (row)
            db.update(journalEntries)
              .set(values)
              .where(and(eq(journalEntries.id, id), eq(journalEntries.userId, userId)))
              .run();
          else
            db.insert(journalEntries)
              .values({ ...values, id, curriculumVersion: curriculum.version, createdAt: now })
              .run();
        }
        return nextRevision;
      })();
    },
    addCase(raw: unknown) {
      const input = testCaseSchema.parse(raw);
      return sqlite.transaction(() => {
        const failure = db
          .select()
          .from(failureEntries)
          .where(and(eq(failureEntries.id, input.failureId), eq(failureEntries.userId, userId)))
          .get();
        if (!failure) throw new Error('UNKNOWN_FAILURE');
        const existing = db
          .select()
          .from(failureTestCases)
          .where(eq(failureTestCases.id, input.id))
          .get();
        if (existing) {
          if (
            existing.userId !== userId ||
            existing.failureId !== input.failureId ||
            existing.kind !== input.kind ||
            existing.input !== input.input ||
            existing.expected !== input.expected
          )
            throw new Error('CASE_CONFLICT');
          return existing.id;
        }
        db.insert(failureTestCases)
          .values({
            ...input,
            userId,
            failureRevision: failure.revision,
            failureSnapshot: failure.content,
            createdAt: new Date().toISOString(),
          })
          .run();
        return input.id;
      })();
    },
  };
}
