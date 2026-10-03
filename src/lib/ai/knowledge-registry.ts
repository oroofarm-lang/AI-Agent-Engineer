import { z } from 'zod';
import definitions from '../../../content/knowledge/registry.json';
import { loadCurriculum } from '../curriculum/load';
import type { ReturnTypeOfCurriculum } from './types';

const stable = z.string().regex(/^[A-Z][A-Z0-9_]+$/);
export const knowledgeKind = z.enum([
  'framework-release',
  'automation-release',
  'model-runtime-release',
  'news',
  'model-catalog',
  'api-changelog',
]);
const sourceSchema = z.strictObject({
  id: stable,
  name: z.string().min(1).max(100),
  reader: z.enum(['github-releases', 'news-rss', 'model-markdown', 'changelog-markdown']),
  kind: knowledgeKind,
  url: z.url(),
  repo: z
    .string()
    .regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/)
    .optional(),
  technologyIds: z.array(stable).min(1).max(6),
});
export const knowledgeRegistrySchema = z.strictObject({
  schemaVersion: z.literal(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  technologies: z
    .array(
      z.strictObject({
        id: stable,
        name: z.string().min(1).max(150),
        category: z.string().min(1).max(80),
        officialDocs: z.url(),
        versionStrategy: z.string().min(1).max(80),
        courseSourceIds: z.array(stable).min(1),
      }),
    )
    .min(1)
    .max(40),
  sources: z.array(sourceSchema).min(1).max(30),
});
export function loadKnowledgeRegistry(
  curriculum: ReturnTypeOfCurriculum = loadCurriculum(),
  raw: unknown = definitions,
) {
  const registry = knowledgeRegistrySchema.parse(raw);
  for (const records of [registry.sources, registry.technologies])
    if (new Set(records.map((record) => record.id)).size !== records.length)
      throw new Error('INVALID_KNOWLEDGE_REGISTRY');
  for (const technology of registry.technologies) {
    const url = new URL(technology.officialDocs);
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.port ||
      technology.courseSourceIds.some(
        (id) => !curriculum.sources.some((source) => source.id === id),
      )
    )
      throw new Error('INVALID_KNOWLEDGE_REGISTRY');
  }
  const sources = registry.sources.map((source) => {
    const expected =
      source.reader === 'github-releases'
        ? `https://api.github.com/repos/${source.repo}/releases?per_page=3`
        : source.reader === 'news-rss'
          ? 'https://openai.com/news/rss.xml'
          : source.reader === 'model-markdown'
            ? 'https://developers.openai.com/api/docs/models.md'
            : 'https://developers.openai.com/api/docs/changelog.md';
    if (
      source.url !== expected ||
      (source.reader === 'github-releases' && !source.repo) ||
      (source.reader !== 'github-releases' && Boolean(source.repo)) ||
      (source.reader === 'news-rss' && source.kind !== 'news') ||
      (source.reader === 'model-markdown' && source.kind !== 'model-catalog') ||
      (source.reader === 'changelog-markdown' && source.kind !== 'api-changelog') ||
      (source.reader === 'github-releases' && !source.kind.endsWith('-release')) ||
      source.technologyIds.some(
        (id) => !registry.technologies.some((technology) => technology.id === id),
      )
    )
      throw new Error('INVALID_KNOWLEDGE_REGISTRY');
    const courseSourceIds = [
      ...new Set(
        registry.technologies
          .filter((technology) => source.technologyIds.includes(technology.id))
          .flatMap((technology) => technology.courseSourceIds),
      ),
    ];
    const lessons = curriculum.lessons.filter((lesson) =>
      lesson.sourceIds.some((id) => courseSourceIds.includes(id)),
    );
    return {
      ...source,
      courseSourceIds,
      lessonIds: lessons.map((lesson) => lesson.id),
      skillIds: [...new Set(lessons.flatMap((lesson) => lesson.skillIds))],
      moduleIds: (curriculum.modules || [])
        .filter((module) =>
          module.lessonIds.some((id) => lessons.some((lesson) => lesson.id === id)),
        )
        .map((module) => module.id),
    };
  });
  return { ...registry, sources };
}
export type KnowledgeSource = ReturnType<typeof loadKnowledgeRegistry>['sources'][number];
