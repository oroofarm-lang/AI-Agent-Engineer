import path from 'node:path';
import { loadCurriculum, readLesson } from '../curriculum/load';
import { loadAgentRegistry } from '../agents/registry';
import { loadKnowledgeRegistry } from '../ai/knowledge-registry';
import { buildVaultFiles } from '../../../scripts/lib/vault-export.mjs';
import publicSnapshot from '../../../content/vault/public-assets.json';
import quizDraft from '../../../content/authoring/quiz-bank/1.0.0-draft.json';
import { buildLegacyFiles } from '../../../scripts/lib/vault-legacy.mjs';
import { writeVaultFiles } from '../../../scripts/lib/vault-write.mjs';

/** Fixed public catalog inputs only. Never inspect personal notes, uploads, secrets or user records. */
export async function syncPublicVault() {
  const curriculum = loadCurriculum(),
    registry = loadAgentRegistry(curriculum);
  const lessonBodies = Object.fromEntries(
    curriculum.lessons
      .filter((lesson) => lesson.publicationStatus === 'published')
      .map((lesson) => [lesson.id, readLesson(lesson.id)]),
  );
  const { assets: publicAssets, apis } = publicSnapshot;
  const graph = buildVaultFiles({
    curriculum,
    lessonBodies,
    registry,
    publicAssets,
    apis,
    quizBank: quizDraft,
    knowledgeRegistry: loadKnowledgeRegistry(curriculum),
  });
  const files = new Map([...buildLegacyFiles(curriculum, lessonBodies), ...graph.files]);
  const result = await writeVaultFiles({
    vaultRoot: path.join(process.cwd(), 'Volt'),
    files,
    version: curriculum.version,
  });
  return {
    ...result,
    counts: graph.counts,
    curriculumVersion: curriculum.version,
    registryVersion: registry.version,
  };
}
