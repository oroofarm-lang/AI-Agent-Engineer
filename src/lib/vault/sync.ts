import path from 'node:path';
import { loadCurriculum, readCatalogLesson } from '../curriculum/load';
import { loadAgentRegistry } from '../agents/registry';
import { loadKnowledgeRegistry } from '../ai/knowledge-registry';
import { fingerprint } from '../auditor/analysis';
import { buildVaultFiles } from '../../../scripts/lib/vault-export.mjs';
import templateCatalog from '../../../content/templates/releases/1.0.0.json';
import { validateTemplateCatalog } from '../templates/schema';
import publicSnapshot from '../../../content/vault/public-assets.json';
import quizDraft from '../../../content/authoring/quiz-bank/1.0.0-draft.json';
import { systemQuestion } from '../quizzes/catalog';
import { publishedTeachingBank } from '../quizzes/review-store';
import { buildLegacyFiles } from '../../../scripts/lib/vault-legacy.mjs';
import { readVaultManifest, writeVaultFiles } from '../../../scripts/lib/vault-write.mjs';

const vaultDirectory = () =>
  path.resolve(/* turbopackIgnore: true */ process.env.VAULT_EXPORT_DIR || 'Volt');

/** Never return a filesystem path, private configuration or raw exception to a client. */
export function safeVaultError(error: unknown) {
  const message = error instanceof Error ? error.message : '';
  if (message.startsWith('VAULT_EDITED_NOTE:')) return 'VAULT_EDITED_NOTE';
  return ['VAULT_SYNC_BUSY', 'VAULT_ACTIVE_CHANGED'].includes(message)
    ? message
    : 'VAULT_SYNC_FAILED';
}

export type VaultStatus = {
  state: 'CURRENT' | 'PENDING' | 'UNAVAILABLE';
  activeVersion: string;
  activeHash: string;
  exportedVersion: string | null;
  exportedHash: string | null;
  activeQuizHash: string | null;
  exportedQuizHash: string | null;
  activeTemplateHash: string;
  exportedTemplateHash: string | null;
  error?: string;
};

/** This identifies the last successful export, not edits made afterwards in a note editor. */
export async function publicVaultStatus(): Promise<VaultStatus> {
  let exported: Awaited<ReturnType<typeof readVaultManifest>> = null;
  let error: string | undefined;
  try {
    exported = await readVaultManifest(vaultDirectory());
  } catch (cause) {
    error = safeVaultError(cause);
  }
  const current = loadCurriculum(),
    activeHash = fingerprint(current);
  const bank = publishedTeachingBank(current),
    activeQuizHash = bank ? fingerprint(bank) : null;
  const activeTemplateHash = fingerprint(compatiblePublicTemplates(current));
  return {
    state: error
      ? 'UNAVAILABLE'
      : exported?.version === current.version &&
          exported.curriculumHash === activeHash &&
          exported.quizBankHash === activeQuizHash &&
          exported.templateCatalogHash === activeTemplateHash
        ? 'CURRENT'
        : 'PENDING',
    activeVersion: current.version,
    activeHash,
    exportedVersion: exported?.version || null,
    exportedHash: exported?.curriculumHash || null,
    activeQuizHash,
    activeTemplateHash,
    exportedTemplateHash: exported?.templateCatalogHash || null,
    exportedQuizHash: exported?.quizBankHash || null,
    ...(error ? { error } : {}),
  };
}

/** Fixed public catalog inputs only. Never inspect personal notes, uploads, secrets or user records. */
export async function syncPublicVault() {
  // Construct the snapshot under the actual public-writer lock. Reconcile a publication race.
  for (let attempt = 0; attempt < 3; attempt++) {
    let metadata: { counts: Record<string, number>; registryVersion: string } = {
      counts: {},
      registryVersion: '',
    };
    const result = await writeVaultFiles({
      vaultRoot: vaultDirectory(),
      prepare: () => {
        const projection = preparePublicVault();
        metadata = { counts: projection.counts, registryVersion: projection.registryVersion };
        return projection;
      },
    });
    const current = loadCurriculum(),
      bank = publishedTeachingBank(current);
    if (
      result.curriculumHash === fingerprint(current) &&
      result.quizBankHash === (bank ? fingerprint(bank) : null) &&
      result.templateCatalogHash === fingerprint(compatiblePublicTemplates(current))
    )
      return { ...result, ...metadata, curriculumVersion: result.version };
  }
  throw new Error('VAULT_ACTIVE_CHANGED');
}

// Course-body releases can reuse unchanged exact-bound rubrics; changed criteria fail closed.
function compatiblePublicTemplates(curriculum: ReturnType<typeof loadCurriculum>) {
  return validateTemplateCatalog(templateCatalog, {
    version: templateCatalog.sourceCurriculumVersion,
    assessments: curriculum.assessments,
  });
}

function preparePublicVault() {
  const curriculum = loadCurriculum(),
    registry = loadAgentRegistry(curriculum);
  const publishedQuizBank = publishedTeachingBank(curriculum);
  const lessonBodies = Object.fromEntries(
    curriculum.lessons
      .filter((lesson) => lesson.publicationStatus === 'published')
      .map((lesson) => [lesson.id, readCatalogLesson(curriculum, lesson.id)]),
  );
  const { assets: publicAssets, apis } = publicSnapshot;
  const graph = buildVaultFiles({
    curriculum,
    lessonBodies,
    registry,
    publicAssets,
    apis,
    quizBank: quizDraft,
    publishedQuizBank,
    systemQuestion,
    knowledgeRegistry: loadKnowledgeRegistry(curriculum),
    templateCatalog: compatiblePublicTemplates(curriculum),
  });
  const files = new Map([...buildLegacyFiles(curriculum, lessonBodies), ...graph.files]);
  return {
    files,
    version: curriculum.version,
    curriculumHash: fingerprint(curriculum),
    quizBankHash: publishedQuizBank ? fingerprint(publishedQuizBank) : null,
    templateCatalogHash: fingerprint(compatiblePublicTemplates(curriculum)),
    counts: graph.counts,
    registryVersion: registry.version,
  };
}

/** Export failure is separate from an already committed and approved course operation. */
export async function syncReviewedRelease() {
  try {
    return { status: 'SYNCED' as const, ...(await syncPublicVault()) };
  } catch (cause) {
    return { status: 'FAILED' as const, error: safeVaultError(cause) };
  }
}
