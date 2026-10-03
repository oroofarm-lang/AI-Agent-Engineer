import { createHash } from 'node:crypto';
import { z } from 'zod';
import { loadKnowledgeRegistry, knowledgeKind, type KnowledgeSource } from './knowledge-registry';
const registry = loadKnowledgeRegistry();
export const knowledgeSources = registry.sources;
const hash = (text: string) => createHash('sha256').update(text).digest('hex');
const hex = z.string().regex(/^[a-f0-9]{64}$/);
const modelRef = z.strictObject({
  slug: z
    .string()
    .regex(/^[a-z0-9][a-z0-9._-]*$/)
    .max(100),
  title: z.string().min(1).max(150),
  url: z.url(),
});
const item = z.strictObject({
  id: z.string().min(1).max(110),
  title: z.string().min(1).max(500),
  url: z.url(),
  publishedAt: z.iso.datetime().nullable(),
  publishedOn: z.iso.date().nullable(),
  excerpt: z.string().max(700).optional(),
  documentHash: hex.optional(),
  modelRefs: z.array(modelRef).max(64).optional(),
});
const sourceSnapshot = z.strictObject({
  id: z.string(),
  name: z.string().max(100),
  kind: knowledgeKind,
  endpoint: z.url(),
  checkedAt: z.iso.datetime().nullable(),
  status: z.enum(['ok', 'unavailable', 'not-checked']),
  verification: z.literal('discovery-only'),
  fingerprint: hex.nullable(),
  change: z.enum(['first-observation', 'changed', 'unchanged', 'unavailable', 'not-checked']),
  technologyIds: z.array(z.string()).max(6),
  courseSourceIds: z.array(z.string()).max(1000),
  lessonIds: z.array(z.string()).max(1000),
  skillIds: z.array(z.string()).max(1000),
  moduleIds: z.array(z.string()).max(1000),
  items: z.array(item).max(3),
});
export const knowledgeSnapshotSchema = z.strictObject({
  schemaVersion: z.literal(2),
  registryVersion: z.string(),
  slot: z.iso.datetime(),
  attemptedAt: z.iso.datetime(),
  sources: z.array(sourceSnapshot).max(30),
});
export type KnowledgeSnapshot = z.infer<typeof knowledgeSnapshotSchema>;
type KnowledgeItem = z.infer<typeof item>;
const legacySchema = z.strictObject({
  schemaVersion: z.literal(1),
  slot: z.iso.datetime(),
  attemptedAt: z.iso.datetime(),
  sources: z
    .array(
      z.strictObject({
        id: z.string(),
        name: z.string(),
        checkedAt: z.iso.datetime(),
        status: z.enum(['ok', 'unavailable']),
        items: z
          .array(
            z.strictObject({
              id: z.string().max(100),
              title: z.string().max(500),
              url: z.url(),
              publishedAt: z.iso.datetime(),
            }),
          )
          .max(3),
      }),
    )
    .length(3),
});
const release = z.object({
  id: z.number(),
  tag_name: z.string().max(200),
  name: z.string().max(500).nullable(),
  html_url: z.url(),
  published_at: z.iso.datetime().nullable(),
  draft: z.boolean(),
  prerelease: z.boolean(),
});
function sourceFields(source: KnowledgeSource) {
  return {
    id: source.id,
    name: source.name,
    kind: source.kind,
    endpoint: source.url,
    technologyIds: source.technologyIds,
    courseSourceIds: source.courseSourceIds,
    lessonIds: source.lessonIds,
    skillIds: source.skillIds,
    moduleIds: source.moduleIds,
    verification: 'discovery-only' as const,
  };
}
/** Monday / Wednesday / Friday, 06:00 UTC; unchanged approved due slots. */
export function knowledgeSlot(now: Date) {
  for (let days = 0; days < 8; days++) {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() - days);
    date.setUTCHours(6, 0, 0, 0);
    if ([1, 3, 5].includes(date.getUTCDay()) && date <= now) return date.toISOString();
  }
  throw new Error('INVALID_DATE');
}
async function boundedText(response: Response, source: KnowledgeSource) {
  const type = response.headers.get('content-type') || '';
  if (
    !response.ok ||
    !(source.reader === 'github-releases'
      ? type.includes('json')
      : source.reader === 'news-rss'
        ? type.includes('xml')
        : type.includes('markdown') || type.includes('text/plain'))
  )
    throw new Error('FEED_UNAVAILABLE');
  const reader = response.body?.getReader();
  if (!reader) throw new Error('FEED_UNAVAILABLE');
  let size = 0;
  const chunks: Uint8Array[] = [],
    limit = source.reader === 'news-rss' ? 1_048_576 : 256000;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) throw new Error('FEED_TOO_LARGE');
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  return Buffer.concat(chunks).toString('utf8');
}
function trustedItemURL(source: KnowledgeSource, raw: string) {
  const url = new URL(raw);
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return false;
  if (source.reader === 'github-releases')
    return raw.startsWith(`https://github.com/${source.repo}/releases/tag/`);
  if (source.reader === 'news-rss')
    return url.hostname === 'openai.com' && /^\/(index|news|research)\//.test(url.pathname);
  return raw === source.url.replace(/\.md$/, '');
}
function textField(block: string, tag: string) {
  const start = block.indexOf(`<${tag}>`),
    end = block.indexOf(`</${tag}>`, start);
  if (start < 0 || end < 0) throw new Error('INVALID_RSS');
  let text = block.slice(start + tag.length + 2, end).trim();
  if (text.startsWith('<![CDATA[') && text.endsWith(']]>')) text = text.slice(9, -3);
  else
    text = text
      .replace(
        /&(?:amp|lt|gt|quot|apos);/g,
        (entity) =>
          ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" })[entity]!,
      )
      .replace(/&#(x[0-9a-fA-F]+|[0-9]+);/g, (_, digits: string) => {
        const code = digits[0] === 'x' ? parseInt(digits.slice(1), 16) : Number(digits);
        if (code > 0x10ffff || code < 1) throw new Error('INVALID_RSS');
        return String.fromCodePoint(code);
      });
  return text.replace(/\s+/g, ' ').trim();
}
function readNews(text: string, source: KnowledgeSource, now: Date): KnowledgeItem[] {
  // Only bounded RSS metadata is inspected. No DTD, entity fetching, HTML or linked pages.
  if (/<!DOCTYPE|<!ENTITY/i.test(text) || !text.includes('<rss')) throw new Error('INVALID_RSS');
  const items: KnowledgeItem[] = [];
  let offset = 0;
  for (let count = 0; count < 40 && items.length < 3; count++) {
    const start = text.indexOf('<item>', offset);
    if (start < 0) break;
    const end = text.indexOf('</item>', start);
    if (end < 0) throw new Error('INVALID_RSS');
    offset = end + 7;
    if (end - start > 18000) throw new Error('INVALID_RSS');
    const block = text.slice(start, end),
      url = textField(block, 'link'),
      title = textField(block, 'title'),
      date = new Date(textField(block, 'pubDate'));
    if (
      !trustedItemURL(source, url) ||
      !Number.isFinite(date.getTime()) ||
      date > now ||
      !title ||
      title.length > 500 ||
      items.some((entry) => entry.url === url)
    )
      continue;
    items.push({
      id: `${source.id}-${hash(url).slice(0, 24)}`,
      title,
      url,
      publishedAt: date.toISOString(),
      publishedOn: null,
    });
  }
  if (!items.length) throw new Error('EMPTY_FEED');
  return items;
}
function readModels(text: string, source: KnowledgeSource): KnowledgeItem[] {
  const refs = new Map<string, z.infer<typeof modelRef>>();
  for (const match of text.matchAll(
    /\[([^\]\n]{1,150})\]\((\/api\/docs\/models\/([a-z0-9][a-z0-9._-]*))\)/g,
  )) {
    const slug = match[3].replace(/\.md$/, '');
    if (!['all', 'compare'].includes(slug) && !refs.has(slug) && refs.size < 64)
      refs.set(slug, {
        slug,
        title: match[1],
        url: `https://developers.openai.com/api/docs/models/${slug}`,
      });
  }
  if (!refs.size) throw new Error('EMPTY_MODEL_CATALOG');
  return [
    {
      id: source.id,
      title: 'OpenAI model catalog',
      url: source.url.replace(/\.md$/, ''),
      publishedAt: null,
      publishedOn: null,
      documentHash: hash(text),
      modelRefs: [...refs.values()],
    },
  ];
}
function readChangelog(text: string, source: KnowledgeSource, now: Date): KnowledgeItem[] {
  const items: KnowledgeItem[] = [];
  let year = 0,
    month = -1,
    current: { date: string; lines: string[] } | undefined;
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  function save() {
    if (!current || items.length >= 3) return;
    const excerpt = current.lines
      .join(' ')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/[*`]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .slice(0, 40)
      .join(' ')
      .slice(0, 650);
    if (
      !excerpt ||
      current.date > now.toISOString().slice(0, 10) ||
      items.some((entry) => entry.publishedOn === current!.date)
    )
      return;
    items.push({
      id: `${source.id}-${current.date}`,
      title: `OpenAI API · ${current.date}`,
      url: source.url.replace(/\.md$/, ''),
      publishedAt: null,
      publishedOn: current.date,
      excerpt,
    });
  }
  for (const line of text.split('\n')) {
    const heading = /^## ([A-Za-z]+),? (\d{4})$/.exec(line.trim()),
      day = /^### ([A-Za-z]+) (\d{1,2})$/.exec(line.trim());
    if (heading || day) {
      save();
      if (items.length >= 3) break;
      current = undefined;
    }
    if (heading) {
      year = Number(heading[2]);
      month = months.indexOf(heading[1]);
    } else if (
      day &&
      year &&
      month >= 0 &&
      [months[month], months[month].slice(0, 3)].includes(day[1])
    ) {
      const number = Number(day[2]),
        date = new Date(Date.UTC(year, month, number));
      if (date.getUTCMonth() === month && date.getUTCDate() === number)
        current = { date: date.toISOString().slice(0, 10), lines: [] };
    } else if (current && current.lines.join(' ').length < 1000) current.lines.push(line);
  }
  if (items.length < 3) save();
  if (!items.length) throw new Error('EMPTY_CHANGELOG');
  return items;
}
export async function refreshKnowledge(
  request: typeof fetch = fetch,
  now = new Date(),
  previous?: KnowledgeSnapshot,
): Promise<KnowledgeSnapshot> {
  const checkedAt = now.toISOString();
  const sources = await Promise.all(
    knowledgeSources.map(async (source) => {
      try {
        const response = await request(source.url, {
          headers: {
            Accept: source.reader === 'github-releases' ? 'application/vnd.github+json' : '*/*',
            'User-Agent': 'Agent-Engineer-Knowledge',
          },
          redirect: 'error',
          cache: 'no-store',
          signal: AbortSignal.timeout(10000),
        });
        const text = await boundedText(response, source);
        const items: KnowledgeItem[] =
          source.reader === 'github-releases'
            ? z
                .array(release)
                .max(10)
                .parse(JSON.parse(text))
                .filter(
                  (entry) =>
                    !entry.draft &&
                    !entry.prerelease &&
                    entry.published_at &&
                    new Date(entry.published_at) <= now &&
                    trustedItemURL(source, entry.html_url),
                )
                .slice(0, 3)
                .map((entry) => ({
                  id: `${source.id}-${entry.id}`,
                  title: entry.name || entry.tag_name,
                  url: entry.html_url,
                  publishedAt: entry.published_at!,
                  publishedOn: null,
                }))
            : source.reader === 'news-rss'
              ? readNews(text, source, now)
              : source.reader === 'model-markdown'
                ? readModels(text, source)
                : readChangelog(text, source, now);
        const fingerprint = hash(JSON.stringify(items)),
          old = previous?.sources.find((entry) => entry.id === source.id)?.fingerprint;
        return {
          ...sourceFields(source),
          checkedAt,
          status: 'ok' as const,
          fingerprint,
          change: !old
            ? ('first-observation' as const)
            : old === fingerprint
              ? ('unchanged' as const)
              : ('changed' as const),
          items,
        };
      } catch {
        return {
          ...sourceFields(source),
          checkedAt,
          status: 'unavailable' as const,
          fingerprint: null,
          change: 'unavailable' as const,
          items: [],
        };
      }
    }),
  );
  return parseKnowledge({
    schemaVersion: 2,
    registryVersion: registry.version,
    slot: knowledgeSlot(now),
    attemptedAt: checkedAt,
    sources,
  });
}
/** Validate file provenance and course mappings, never trust a merely schema-valid cached URL. */
export function parseKnowledge(raw: unknown): KnowledgeSnapshot {
  let input = raw;
  if (raw && typeof raw === 'object' && 'schemaVersion' in raw && raw.schemaVersion === 1) {
    const legacy = legacySchema.parse(raw),
      ids = ['AGENTS_SDK', 'LANGGRAPH', 'MCP_SDK'];
    if (
      new Set(legacy.sources.map((entry) => entry.id)).size !== 3 ||
      legacy.sources.some((entry) => !ids.includes(entry.id))
    )
      throw new Error('INVALID_PROVENANCE');
    input = {
      schemaVersion: 2,
      registryVersion: 'legacy-1',
      slot: legacy.slot,
      attemptedAt: legacy.attemptedAt,
      sources: knowledgeSources.map((source) => {
        const old = legacy.sources.find((entry) => entry.id === source.id),
          items = old?.items.map((entry) => ({ ...entry, publishedOn: null })) || [];
        return {
          ...sourceFields(source),
          checkedAt: old?.checkedAt || null,
          status: old?.status || 'not-checked',
          fingerprint: old?.status === 'ok' ? hash(JSON.stringify(items)) : null,
          change: old?.status === 'ok' ? 'first-observation' : old ? 'unavailable' : 'not-checked',
          items,
        };
      }),
    };
  }
  const parsed = knowledgeSnapshotSchema.parse(input);
  if (
    parsed.sources.length !== knowledgeSources.length ||
    new Set(parsed.sources.map((entry) => entry.id)).size !== parsed.sources.length ||
    ![registry.version, 'legacy-1'].includes(parsed.registryVersion)
  )
    throw new Error('INVALID_PROVENANCE');
  for (const source of parsed.sources) {
    const trusted = knowledgeSources.find((entry) => entry.id === source.id);
    if (
      !trusted ||
      Object.entries(sourceFields(trusted)).some(
        ([key, value]) =>
          JSON.stringify(value) !== JSON.stringify(source[key as keyof typeof source]),
      ) ||
      source.items.some(
        (entry) =>
          !trustedItemURL(trusted, entry.url) ||
          entry.modelRefs?.some(
            (ref) => ref.url !== `https://developers.openai.com/api/docs/models/${ref.slug}`,
          ),
      )
    )
      throw new Error('INVALID_PROVENANCE');
    if (source.status === 'ok') {
      if (
        !source.checkedAt ||
        source.fingerprint !== hash(JSON.stringify(source.items)) ||
        !['first-observation', 'changed', 'unchanged'].includes(source.change)
      )
        throw new Error('INVALID_PROVENANCE');
    } else if (
      source.items.length ||
      source.fingerprint ||
      (source.status === 'not-checked'
        ? source.checkedAt !== null || source.change !== 'not-checked'
        : !source.checkedAt || source.change !== 'unavailable')
    )
      throw new Error('INVALID_PROVENANCE');
    if (
      (source.checkedAt && new Date(source.checkedAt) > new Date(parsed.attemptedAt)) ||
      new Set(source.items.map((entry) => entry.id)).size !== source.items.length ||
      source.items.some(
        (entry) =>
          (entry.publishedAt && entry.publishedOn) ||
          (entry.publishedAt && new Date(entry.publishedAt) > new Date(source.checkedAt!)) ||
          (entry.publishedOn && entry.publishedOn > source.checkedAt!.slice(0, 10)) ||
          (entry.modelRefs && trusted.reader !== 'model-markdown') ||
          (entry.documentHash && trusted.reader !== 'model-markdown') ||
          (entry.excerpt && trusted.reader !== 'changelog-markdown') ||
          (trusted.reader === 'model-markdown' &&
            (!entry.modelRefs?.length ||
              !entry.documentHash ||
              entry.publishedAt ||
              entry.publishedOn)) ||
          (trusted.reader === 'changelog-markdown' && (!entry.publishedOn || !entry.excerpt)) ||
          (['github-releases', 'news-rss'].includes(trusted.reader) && !entry.publishedAt),
      )
    )
      throw new Error('INVALID_PROVENANCE');
  }
  return parsed;
}
/** Bounded lesson-relevant discovery context; the full snapshot remains available for inspection. */
export function knowledgeContext(snapshot: KnowledgeSnapshot, lessonId?: string) {
  const parsed = parseKnowledge(snapshot);
  return {
    schemaVersion: parsed.schemaVersion,
    attemptedAt: parsed.attemptedAt,
    verification: 'discovery-only',
    sources: parsed.sources
      .filter((source) => !lessonId || source.lessonIds.includes(lessonId))
      .map((source) => ({
        id: source.id,
        name: source.name,
        kind: source.kind,
        status: source.status,
        checkedAt: source.checkedAt,
        change: source.change,
        items: source.items.map((entry) => ({
          ...entry,
          ...(entry.modelRefs ? { modelRefs: entry.modelRefs.slice(0, 12) } : {}),
        })),
      })),
  };
}
