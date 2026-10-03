import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { isOperator } from '../admin/access';
import type { Connection } from '../db/connection';
import { registerCurriculum } from '../db/migrate';
import { loadCurriculum, readCatalogLesson } from '../curriculum/load';
import { activeCurriculumSelection, catalogDirectory } from '../curriculum/runtime';
import { curriculumSchema } from '../curriculum/schema';
import { loadAgentRegistry } from '../agents/registry';
import { loadKnowledgeRegistry } from '../ai/knowledge-registry';
import type { ReturnTypeOfCurriculum } from '../ai/types';
import { createProposal, candidateRelease, fingerprint } from './analysis';
import { auditorDirectory, checkedPath, readRecord, writeRecord, withAuditorLock } from './files';
import {
  proposalSchema,
  proposalInputSchema,
  decisionInputSchema,
  decisionSchema,
  pointerSchema,
  applicationSchema,
  type Proposal,
  type ReleasePointer,
} from './schema';

const storedProposal = z.strictObject({
  proposal: proposalSchema,
  hash: z.string(),
  createdBy: z.string(),
});
const summarySchema = z.strictObject({
  id: z.uuid(),
  hash: z.string(),
  title: z.string(),
  createdAt: z.iso.datetime(),
  baseVersion: z.string(),
  targetVersion: z.string(),
  severity: z.string(),
  action: z.string(),
  directLessonIds: z.array(z.string()),
  downstreamCount: z.number().int(),
});
const changelogSchema = z
  .array(z.strictObject({ version: z.string(), date: z.iso.date(), changes: z.array(z.string()) }))
  .max(1000);
type Actor = { id: string; email: string; emailVerified: boolean };
const matches = (a: ReleasePointer | undefined, b: ReleasePointer) =>
  Boolean(a && a.version === b.version && a.manifestHash === b.manifestHash);

export function currentAuditorCatalog(directory = auditorDirectory()) {
  const selection = activeCurriculumSelection(directory);
  if (selection.expectedHash) {
    for (const file of ['curriculum.json', 'skills.json', 'sources.json', 'assessments.json'])
      checkedPath(selection.root, file);
    const manifest = curriculumSchema.parse(
      JSON.parse(fs.readFileSync(checkedPath(selection.root, 'curriculum.json'), 'utf8')),
    );
    for (const lesson of manifest.lessons.filter(
      (lesson) => lesson.publicationStatus === 'published',
    ))
      checkedPath(selection.root, `lessons/${lesson.id}.md`);
  }
  const catalog = loadCurriculum(selection.root);
  if (selection.expectedHash && fingerprint(catalog) !== selection.expectedHash)
    throw new Error('AUDITOR_RELEASE_INTEGRITY');
  return catalog;
}
const bodiesFor = (catalog: ReturnTypeOfCurriculum) =>
  Object.fromEntries(
    catalog.lessons
      .filter((lesson) => lesson.publicationStatus === 'published')
      .map((lesson) => [lesson.id, readCatalogLesson(catalog, lesson.id)]),
  );

/** The stored proposal is immutable; permissions are checked here as well as at the HTTP boundary. */
export function auditorStore(
  connection: Connection,
  actor: Actor,
  options: { directory?: string; now?: () => Date; fault?: (stage: string) => void } = {},
) {
  const directory = path.resolve(options.directory || auditorDirectory()),
    now = options.now || (() => new Date());
  const authorize = () => {
    if (!isOperator(actor)) throw new Error('AUDITOR_NOT_FOUND');
  };
  authorize();
  const idValue = (raw: unknown) => z.uuid().parse(raw);
  const mutate = <T>(task: () => T) =>
    withAuditorLock(directory, () => {
      const folder = checkedPath(directory, 'applications'),
        active = readRecord(directory, 'active.json', pointerSchema, 1000);
      if (fs.existsSync(folder)) {
        const files = fs
          .readdirSync(folder)
          .filter(
            (file) => file.endsWith('.json') && z.uuid().safeParse(file.slice(0, -5)).success,
          );
        if (files.length > 500) throw new Error('AUDITOR_RECORD_LIMIT');
        for (const file of files) {
          const record = readRecord(directory, `applications/${file}`, applicationSchema)!;
          if (record.state === 'prepared' && matches(active, record.next))
            writeRecord(
              directory,
              `applications/${file}`,
              { ...record, state: 'applied', completedAt: now().toISOString() },
              true,
            );
          if (record.state === 'rollback-prepared' && matches(active, record.previous))
            writeRecord(
              directory,
              `applications/${file}`,
              { ...record, state: 'rolled-back', completedAt: now().toISOString() },
              true,
            );
        }
      }
      return task();
    });
  function proposal(rawId: unknown, expectedHash?: string) {
    authorize();
    const id = idValue(rawId),
      record = readRecord(directory, `proposals/${id}.json`, storedProposal);
    if (!record) throw new Error('AUDITOR_NOT_FOUND');
    if (
      record.proposal.input.id !== id ||
      record.hash !== fingerprint(record.proposal) ||
      (expectedHash && expectedHash !== record.hash)
    )
      throw new Error('AUDITOR_PROPOSAL_CONFLICT');
    return record;
  }
  function state(id: string, hash: string) {
    const application = readRecord(directory, `applications/${id}.json`, applicationSchema),
      decision = readRecord(directory, `decisions/${id}.json`, decisionSchema);
    if (
      (application && (application.proposalId !== id || application.proposalHash !== hash)) ||
      (decision && (decision.proposalId !== id || decision.proposalHash !== hash))
    )
      throw new Error('AUDITOR_PROPOSAL_CONFLICT');
    if (application) {
      if (application.state === 'rolled-back') return 'ROLLED_BACK';
      if (
        application.state === 'rollback-prepared' &&
        matches(readRecord(directory, 'active.json', pointerSchema, 1000), application.previous)
      )
        return 'ROLLED_BACK';
      if (
        application.state === 'applied' ||
        matches(readRecord(directory, 'active.json', pointerSchema, 1000), application.next)
      )
        return 'APPLIED';
    }
    return decision
      ? ({ approve: 'APPROVED', defer: 'DEFERRED', watch: 'WATCHED' } as const)[decision.decision]
      : 'PROPOSED';
  }
  function summary(p: Proposal, hash: string) {
    return summarySchema.parse({
      id: p.input.id,
      hash,
      title: p.input.title,
      createdAt: p.createdAt,
      baseVersion: p.input.baseVersion,
      targetVersion: p.input.targetVersion,
      severity: p.input.severity,
      action: p.input.action,
      directLessonIds: p.impact.directLessonIds,
      downstreamCount: p.impact.downstreamLessonIds.length,
    });
  }
  function materialize(
    catalog: ReturnTypeOfCurriculum,
    bodies: Record<string, string>,
    changelog: z.infer<typeof changelogSchema>,
  ) {
    const pointer = pointerSchema.parse({
      schemaVersion: 1,
      version: catalog.version,
      manifestHash: fingerprint(catalog),
    });
    const destination = checkedPath(directory, `releases/${catalog.version}`);
    if (fs.existsSync(destination)) {
      const existing = loadCurriculum(destination);
      if (fingerprint(existing) !== pointer.manifestHash)
        throw new Error('AUDITOR_RELEASE_CONFLICT');
      return pointer;
    }
    const temporary = checkedPath(directory, `staging/${randomUUID()}`);
    fs.mkdirSync(checkedPath(temporary, 'lessons'), { recursive: true, mode: 0o700 });
    const { skills, sources, assessments, lessonBodyHashes: _hashes, ...manifest } = catalog;
    void _hashes;
    const files: Record<string, string> = {
      'curriculum.json': JSON.stringify(manifest, null, 2),
      'skills.json': JSON.stringify(skills, null, 2),
      'sources.json': JSON.stringify(sources, null, 2),
      'assessments.json': JSON.stringify(assessments, null, 2),
      'changelog.json': JSON.stringify(changelog, null, 2),
      ...Object.fromEntries(Object.entries(bodies).map(([id, body]) => [`lessons/${id}.md`, body])),
    };
    for (const [file, text] of Object.entries(files)) {
      if (Buffer.byteLength(text) > 1_200_000) throw new Error('AUDITOR_RECORD_SIZE');
      fs.writeFileSync(checkedPath(temporary, file), file.endsWith('.json') ? `${text}\n` : text, {
        flag: 'wx',
        mode: 0o600,
      });
    }
    const staged = loadCurriculum(temporary);
    if (fingerprint(staged) !== pointer.manifestHash) throw new Error('AUDITOR_RELEASE_INTEGRITY');
    loadAgentRegistry(staged);
    loadKnowledgeRegistry(staged);
    options.fault?.('afterValidation');
    fs.mkdirSync(path.dirname(destination), { recursive: true, mode: 0o700 });
    fs.renameSync(temporary, destination);
    return pointer;
  }
  return {
    context() {
      authorize();
      const c = currentAuditorCatalog(directory);
      return {
        version: c.version,
        manifestHash: fingerprint(c),
        lessons: c.lessons
          .filter((lesson) => lesson.publicationStatus === 'published')
          .map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            bodyHash: c.lessonBodyHashes[lesson.id],
            sourceIds: lesson.sourceIds,
          })),
        sources: c.sources.map(({ id, title, url }) => ({ id, title, url })),
      };
    },
    section(lessonId: string, section: string) {
      authorize();
      const c = currentAuditorCatalog(directory);
      const definition = c.lessons.find(
        (lesson) => lesson.id === lessonId && lesson.publicationStatus === 'published',
      );
      if (!definition) throw new Error('AUDITOR_UNKNOWN_LESSON');
      return { catalog: c, body: readCatalogLesson(c, lessonId), section };
    },
    list() {
      authorize();
      const root = checkedPath(directory, 'summaries');
      if (!fs.existsSync(root)) return [];
      const files = fs
        .readdirSync(root)
        .filter(
          (name) =>
            z.uuid().safeParse(name.replace(/\.json$/, '')).success && name.endsWith('.json'),
        );
      if (files.length > 500) throw new Error('AUDITOR_RECORD_LIMIT');
      return files
        .map((name) => readRecord(directory, `summaries/${name}`, summarySchema, 12000)!)
        .filter(Boolean)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 50)
        .map((item) => ({ ...item, state: state(item.id, item.hash) }));
    },
    details(id: unknown) {
      const record = proposal(id);
      return {
        proposal: record.proposal,
        hash: record.hash,
        state: state(record.proposal.input.id, record.hash),
        decision: readRecord(
          directory,
          `decisions/${record.proposal.input.id}.json`,
          decisionSchema,
        ),
        application: readRecord(
          directory,
          `applications/${record.proposal.input.id}.json`,
          applicationSchema,
        ),
      };
    },
    propose(raw: unknown) {
      authorize();
      const input = proposalInputSchema.parse(raw);
      return mutate(() => {
        const existing = readRecord(directory, `proposals/${input.id}.json`, storedProposal);
        if (existing) {
          if (
            fingerprint(existing.proposal.input) !== fingerprint(input) ||
            existing.hash !== fingerprint(existing.proposal)
          )
            throw new Error('AUDITOR_PROPOSAL_CONFLICT');
          if (!readRecord(directory, `summaries/${input.id}.json`, summarySchema, 12000))
            writeRecord(
              directory,
              `summaries/${input.id}.json`,
              summary(existing.proposal, existing.hash),
            );
          return { id: input.id, hash: existing.hash, state: state(input.id, existing.hash) };
        }
        const root = checkedPath(directory, 'proposals');
        if (fs.existsSync(root) && fs.readdirSync(root).length >= 500)
          throw new Error('AUDITOR_RECORD_LIMIT');
        const c = currentAuditorCatalog(directory),
          p = createProposal(c, bodiesFor(c), input, now()),
          hash = fingerprint(p);
        writeRecord(directory, `proposals/${input.id}.json`, {
          proposal: p,
          hash,
          createdBy: actor.id,
        });
        writeRecord(directory, `summaries/${input.id}.json`, summary(p, hash));
        return { id: input.id, hash, state: 'PROPOSED' };
      });
    },
    decide(raw: unknown) {
      authorize();
      const input = decisionInputSchema.parse(raw);
      return mutate(() => {
        const record = proposal(input.id, input.proposalHash),
          previous = readRecord(directory, `decisions/${input.id}.json`, decisionSchema);
        if (previous) {
          const { id: _id, ...payload } = input;
          void _id;
          const {
            schemaVersion: _schema,
            proposalId: _proposal,
            actorId: _actor,
            decidedAt: _date,
            ...stored
          } = previous;
          void _schema;
          void _proposal;
          void _actor;
          void _date;
          if (fingerprint(payload) !== fingerprint(stored))
            throw new Error('AUDITOR_DECISION_CONFLICT');
          return { state: state(input.id, record.hash) };
        }
        if (input.decision === 'approve') {
          if (record.proposal.input.action === 'WATCH' || !record.proposal.candidateHash)
            throw new Error('AUDITOR_WATCH_ONLY');
          if (!input.checkedPrimarySources || !input.checkedTeaching)
            throw new Error('AUDITOR_REVIEW_REQUIRED');
          if (record.proposal.impact.foundationTouched && input.foundationRationale.length < 60)
            throw new Error('AUDITOR_FOUNDATION_REVIEW');
          if (fingerprint(currentAuditorCatalog(directory)) !== record.proposal.input.baseHash)
            throw new Error('AUDITOR_STALE_BASE');
        }
        writeRecord(
          directory,
          `decisions/${input.id}.json`,
          decisionSchema.parse({
            schemaVersion: 1,
            proposalId: input.id,
            proposalHash: record.hash,
            actorId: actor.id,
            decidedAt: now().toISOString(),
            decision: input.decision,
            rationale: input.rationale,
            checkedPrimarySources: input.checkedPrimarySources,
            checkedTeaching: input.checkedTeaching,
            foundationRationale: input.foundationRationale,
          }),
        );
        return { state: state(input.id, record.hash) };
      });
    },
    apply(rawId: unknown, hash: string) {
      authorize();
      const id = idValue(rawId);
      return mutate(() => {
        const record = proposal(id, hash),
          decision = readRecord(directory, `decisions/${id}.json`, decisionSchema),
          oldApplication = readRecord(directory, `applications/${id}.json`, applicationSchema);
        if (
          !decision ||
          decision.decision !== 'approve' ||
          decision.proposalHash !== record.hash ||
          !decision.checkedPrimarySources ||
          !decision.checkedTeaching ||
          (record.proposal.impact.foundationTouched && decision.foundationRationale.length < 60)
        )
          throw new Error('AUDITOR_APPROVAL_REQUIRED');
        if (oldApplication) {
          if (oldApplication.proposalHash !== record.hash)
            throw new Error('AUDITOR_PROPOSAL_CONFLICT');
          if (oldApplication.state === 'rolled-back')
            throw new Error('AUDITOR_ALREADY_ROLLED_BACK');
          if (
            oldApplication.state === 'applied' ||
            matches(readRecord(directory, 'active.json', pointerSchema, 1000), oldApplication.next)
          ) {
            if (oldApplication.state === 'prepared')
              writeRecord(
                directory,
                `applications/${id}.json`,
                { ...oldApplication, state: 'applied', completedAt: now().toISOString() },
                true,
              );
            return { state: 'APPLIED', version: oldApplication.next.version };
          }
        }
        const base = currentAuditorCatalog(directory);
        if (fingerprint(base) !== record.proposal.input.baseHash)
          throw new Error('AUDITOR_STALE_BASE');
        const bodies = bodiesFor(base),
          candidate = candidateRelease(
            base,
            bodies,
            record.proposal.input,
            record.proposal.createdAt.slice(0, 10),
          );
        if (fingerprint(candidate.catalog) !== record.proposal.candidateHash)
          throw new Error('AUDITOR_PROPOSAL_CONFLICT');
        const history = readRecord(catalogDirectory(base), 'changelog.json', changelogSchema) || [];
        const previous = materialize(base, bodies, history),
          next = materialize(candidate.catalog, candidate.bodies, [
            ...history,
            {
              version: candidate.catalog.version,
              date: candidate.catalog.releaseDate,
              changes: [record.proposal.input.title, record.proposal.input.reason],
            },
          ]);
        const application = applicationSchema.parse({
          schemaVersion: 1,
          proposalId: id,
          proposalHash: record.hash,
          actorId: actor.id,
          preparedAt: now().toISOString(),
          previous,
          next,
          state: 'prepared',
          completedAt: null,
        });
        if (
          oldApplication &&
          (!matches(oldApplication.previous, previous) || !matches(oldApplication.next, next))
        )
          throw new Error('AUDITOR_PROPOSAL_CONFLICT');
        if (!oldApplication) writeRecord(directory, `applications/${id}.json`, application);
        try {
          connection.sqlite.transaction(() => {
            registerCurriculum(connection, candidate.catalog);
          })();
          options.fault?.('beforeActivation');
          writeRecord(directory, 'active.json', next, true);
          options.fault?.('afterActivation');
          writeRecord(
            directory,
            `applications/${id}.json`,
            { ...application, state: 'applied', completedAt: now().toISOString() },
            true,
          );
        } catch (error) {
          if (matches(readRecord(directory, 'active.json', pointerSchema, 1000), next))
            writeRecord(directory, 'active.json', previous, true);
          throw error;
        }
        return { state: 'APPLIED', version: next.version };
      });
    },
    rollback(rawId: unknown, hash: string) {
      authorize();
      const id = idValue(rawId);
      return mutate(() => {
        const record = proposal(id, hash),
          application = readRecord(directory, `applications/${id}.json`, applicationSchema);
        if (!application || application.proposalHash !== record.hash)
          throw new Error('AUDITOR_NOT_APPLIED');
        if (application.state === 'rolled-back')
          return { state: 'ROLLED_BACK', version: application.previous.version };
        const actual = readRecord(directory, 'active.json', pointerSchema, 1000);
        if (!matches(actual, application.next)) throw new Error('AUDITOR_ROLLBACK_CONFLICT');
        const previousRoot = checkedPath(directory, `releases/${application.previous.version}`),
          previous = loadCurriculum(previousRoot);
        if (fingerprint(previous) !== application.previous.manifestHash)
          throw new Error('AUDITOR_RELEASE_INTEGRITY');
        writeRecord(
          directory,
          `applications/${id}.json`,
          { ...application, state: 'rollback-prepared', completedAt: null },
          true,
        );
        try {
          writeRecord(directory, 'active.json', application.previous, true);
          options.fault?.('afterRollbackActivation');
          writeRecord(
            directory,
            `applications/${id}.json`,
            { ...application, state: 'rolled-back', completedAt: now().toISOString() },
            true,
          );
        } catch (error) {
          if (
            matches(readRecord(directory, 'active.json', pointerSchema, 1000), application.previous)
          )
            writeRecord(directory, 'active.json', application.next, true);
          throw error;
        }
        return { state: 'ROLLED_BACK', version: application.previous.version };
      });
    },
  };
}
