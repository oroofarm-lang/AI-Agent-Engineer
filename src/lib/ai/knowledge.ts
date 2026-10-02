import { z } from 'zod';
/** Fixed public endpoints. User input and release-note links never choose a fetch URL. */
export const knowledgeSources = [
  { id: 'AGENTS_SDK', repo: 'openai/openai-agents-python', name: 'OpenAI Agents SDK' },
  { id: 'LANGGRAPH', repo: 'langchain-ai/langgraph', name: 'LangGraph' },
  { id: 'MCP_SDK', repo: 'modelcontextprotocol/typescript-sdk', name: 'MCP TypeScript SDK' },
] as const;
const release = z.object({
  id: z.number(),
  tag_name: z.string().max(200),
  name: z.string().max(500).nullable(),
  html_url: z.url(),
  published_at: z.iso.datetime().nullable(),
  draft: z.boolean(),
  prerelease: z.boolean(),
});
const item = z.strictObject({
  id: z.string().max(100),
  title: z.string().max(500),
  url: z.url(),
  publishedAt: z.iso.datetime(),
});
export const knowledgeSnapshotSchema = z.strictObject({
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
        items: z.array(item).max(3),
      }),
    )
    .max(3),
});
export type KnowledgeSnapshot = z.infer<typeof knowledgeSnapshotSchema>;

/** Monday / Wednesday / Friday, 06:00 UTC; return the latest due slot. */
export function knowledgeSlot(now: Date) {
  for (let days = 0; days < 8; days++) {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() - days);
    date.setUTCHours(6, 0, 0, 0);
    if ([1, 3, 5].includes(date.getUTCDay()) && date <= now) return date.toISOString();
  }
  throw new Error('INVALID_DATE');
}
async function boundedFeed(response: Response) {
  if (!response.ok || !response.headers.get('content-type')?.includes('json'))
    throw new Error('FEED_UNAVAILABLE');
  const reader = response.body?.getReader();
  if (!reader) throw new Error('FEED_UNAVAILABLE');
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 256000) throw new Error('FEED_TOO_LARGE');
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  return z
    .array(release)
    .max(10)
    .parse(JSON.parse(Buffer.concat(chunks).toString('utf8')));
}
export async function refreshKnowledge(
  request: typeof fetch = fetch,
  now = new Date(),
): Promise<KnowledgeSnapshot> {
  const checkedAt = now.toISOString();
  const sources = await Promise.all(
    knowledgeSources.map(async (source) => {
      try {
        const response = await request(
          `https://api.github.com/repos/${source.repo}/releases?per_page=3`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              'User-Agent': 'Agent-Engineer-Knowledge',
            },
            redirect: 'error',
            signal: AbortSignal.timeout(8000),
          },
        );
        const releases = await boundedFeed(response);
        const items = releases
          .filter(
            (entry) =>
              !entry.draft &&
              !entry.prerelease &&
              entry.published_at &&
              entry.html_url.startsWith(`https://github.com/${source.repo}/releases/tag/`),
          )
          .slice(0, 3)
          .map((entry) => ({
            id: `${source.id}-${entry.id}`,
            title: entry.name || entry.tag_name,
            url: entry.html_url,
            publishedAt: entry.published_at!,
          }));
        return { id: source.id, name: source.name, checkedAt, status: 'ok' as const, items };
      } catch {
        return {
          id: source.id,
          name: source.name,
          checkedAt,
          status: 'unavailable' as const,
          items: [],
        };
      }
    }),
  );
  return { schemaVersion: 1, slot: knowledgeSlot(now), attemptedAt: checkedAt, sources };
}

/** Validate provenance again when loading a file, not just at network retrieval. */
export function parseKnowledge(raw: unknown) {
  const parsed = knowledgeSnapshotSchema.parse(raw);
  if (
    parsed.sources.length !== knowledgeSources.length ||
    new Set(parsed.sources.map((source) => source.id)).size !== parsed.sources.length
  )
    throw new Error('INVALID_PROVENANCE');
  for (const source of parsed.sources) {
    const trusted = knowledgeSources.find((item) => item.id === source.id);
    if (
      !trusted ||
      source.items.some(
        (entry) => !entry.url.startsWith(`https://github.com/${trusted.repo}/releases/tag/`),
      )
    )
      throw new Error('INVALID_PROVENANCE');
  }
  return parsed;
}
