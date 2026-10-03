import { sqliteTable, text, primaryKey, integer } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  locale: text('locale').notNull(),
  createdAt: text('created_at').notNull(),
});
export const curriculumVersions = sqliteTable('curriculum_versions', {
  version: text('version').primaryKey(),
  releasedAt: text('released_at').notNull(),
  manifestHash: text('manifest_hash').notNull(),
});
export const lessonProgress = sqliteTable(
  'lesson_progress',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    lessonId: text('lesson_id').notNull(),
    curriculumVersion: text('curriculum_version')
      .notNull()
      .references(() => curriculumVersions.version),
    state: text('state', {
      enum: [
        'NOT_STARTED',
        'IN_PROGRESS',
        'BUILD_COMPLETE',
        'MASTERY_PENDING',
        'MASTERED',
        'COMPLETED_WITHOUT_MASTERY',
      ],
    }).notNull(),
    startedAt: text('started_at').notNull(),
    buildCompletedAt: text('build_completed_at'),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.lessonId] })],
);
export const lessonNotes = sqliteTable(
  'lesson_notes',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    lessonId: text('lesson_id').notNull(),
    body: text('body').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.lessonId] })],
);

export const assessmentResults = sqliteTable('assessment_results', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  lessonId: text('lesson_id').notNull(),
  assessmentId: text('assessment_id').notNull(),
  curriculumVersion: text('curriculum_version')
    .notNull()
    .references(() => curriculumVersions.version),
  rubricVersion: text('rubric_version').notNull(),
  rubricSnapshot: text('rubric_snapshot').notNull(),
  evidence: text('evidence').notNull(),
  status: text('status', { enum: ['PENDING_REVIEW'] }).notNull(),
  submittedAt: text('submitted_at').notNull(),
  payloadFingerprint: text('payload_fingerprint'),
});

export const journalEntries = sqliteTable('journal_entries', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  curriculumVersion: text('curriculum_version')
    .notNull()
    .references(() => curriculumVersions.version),
  lessonId: text('lesson_id'),
  title: text('title').notNull(),
  content: text('content').notNull(),
  revision: integer('revision').notNull().default(1),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
export const failureEntries = sqliteTable('failure_entries', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  curriculumVersion: text('curriculum_version')
    .notNull()
    .references(() => curriculumVersions.version),
  lessonId: text('lesson_id'),
  skillId: text('skill_id'),
  category: text('category').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  revision: integer('revision').notNull().default(1),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
export const failureTestCases = sqliteTable('failure_test_cases', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  failureId: text('failure_id')
    .notNull()
    .references(() => failureEntries.id),
  failureRevision: integer('failure_revision').notNull(),
  failureSnapshot: text('failure_snapshot').notNull(),
  kind: text('kind').notNull(),
  input: text('input').notNull(),
  expected: text('expected').notNull(),
  createdAt: text('created_at').notNull(),
});

export const lessonPositions = sqliteTable(
  'lesson_positions',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    lessonId: text('lesson_id').notNull(),
    stepId: text('step_id').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.lessonId] })],
);

export const quizAttempts = sqliteTable(
  'quiz_attempts',
  {
    id: text('id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    lessonId: text('lesson_id').notNull(),
    curriculumVersion: text('curriculum_version')
      .notNull()
      .references(() => curriculumVersions.version),
    questionId: text('question_id').notNull(),
    questionVersion: text('question_version').notNull(),
    questionHash: text('question_hash').notNull(),
    questionSnapshot: text('question_snapshot').notNull(),
    optionId: text('option_id').notNull(),
    correct: integer('correct', { mode: 'boolean' }).notNull(),
    payloadFingerprint: text('payload_fingerprint').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [primaryKey({ columns: [table.id, table.userId] })],
);
