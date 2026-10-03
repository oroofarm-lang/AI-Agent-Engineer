import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { expect, it, vi } from 'vitest';
import { loadKnowledgeRegistry } from '../src/lib/ai/knowledge-registry';
import registry from '../content/knowledge/registry.json';
import {
  refreshKnowledge,
  parseKnowledge,
  knowledgeContext,
  knowledgeSources,
} from '../src/lib/ai/knowledge';
import { ensureKnowledge, persistKnowledge, readKnowledge } from '../src/lib/ai/knowledge-store';
import { knowledgeFixtureFetch, knowledgeNow } from './fixtures/knowledge';
const snapshot = () => refreshKnowledge(knowledgeFixtureFetch, knowledgeNow);
const fingerprint = (items: unknown) =>
  createHash('sha256').update(JSON.stringify(items)).digest('hex');
it('maps fixed source definitions to real course sources, lessons, skills and modules', () => {
  const mapped = loadKnowledgeRegistry();
  expect(mapped.sources).toHaveLength(8);
  expect(
    mapped.sources.every(
      (s) =>
        s.courseSourceIds.length && s.lessonIds.length && s.skillIds.length && s.moduleIds.length,
    ),
  ).toBe(true);
  for (const mutate of [
    (r: typeof registry) => {
      r.sources[0].url = 'https://127.0.0.1/secret';
    },
    (r: typeof registry) => {
      r.technologies[0].courseSourceIds = ['INVENTED'];
    },
    (r: typeof registry) => {
      r.sources[5].kind = 'framework-release';
    },
  ]) {
    const bad = structuredClone(registry);
    mutate(bad);
    expect(() => loadKnowledgeRegistry(undefined, bad)).toThrow('INVALID_KNOWLEDGE_REGISTRY');
  }
});
it('records date precision, bounded catalog references and real source change detection', async () => {
  const first = await snapshot();
  const model = first.sources.find((s) => s.id === 'OPENAI_MODELS')!.items[0];
  expect(model.modelRefs?.map((r) => r.slug)).toEqual(['fixture-model']);
  expect(model).toMatchObject({ publishedAt: null, publishedOn: null });
  expect(model.documentHash).toMatch(/^[a-f0-9]{64}$/);
  const changelog = first.sources.find((s) => s.id === 'OPENAI_CHANGELOG')!;
  expect(changelog.items.map((i) => i.publishedOn)).toEqual(['2026-10-02', '2026-10-01']);
  expect(changelog.items.every((i) => i.publishedAt === null)).toBe(true);
  const same = await refreshKnowledge(knowledgeFixtureFetch, knowledgeNow, first);
  expect(same.sources.every((s) => s.change === 'unchanged')).toBe(true);
  const changed = await refreshKnowledge(
    async (url, init) =>
      String(url).endsWith('models.md')
        ? new Response('[Other model](/api/docs/models/other.md)', {
            headers: { 'content-type': 'text/markdown' },
          })
        : knowledgeFixtureFetch(url, init),
    knowledgeNow,
    first,
  );
  expect(changed.sources.find((s) => s.id === 'OPENAI_MODELS')?.change).toBe('changed');
  expect(
    changed.sources.filter((s) => s.id !== 'OPENAI_MODELS').every((s) => s.change === 'unchanged'),
  ).toBe(true);
});
it('does not invent legacy checks and rejects corrupted endpoint, mappings, fingerprints or future dates', async () => {
  const first = await snapshot();
  const legacy = {
    schemaVersion: 1,
    slot: first.slot,
    attemptedAt: first.attemptedAt,
    sources: first.sources
      .slice(0, 3)
      .map(({ id, name, checkedAt, status, items }) => ({
        id,
        name,
        checkedAt,
        status,
        items: items.map(({ id, title, url, publishedAt }) => ({ id, title, url, publishedAt })),
      })),
  };
  const migrated = parseKnowledge(legacy);
  expect(migrated.registryVersion).toBe('legacy-1');
  expect(
    migrated.sources
      .slice(3)
      .every((s) => s.status === 'not-checked' && s.checkedAt === null && !s.items.length),
  ).toBe(true);
  for (const mutate of [
    (s: typeof first) => {
      s.sources[0].endpoint = 'https://evil.test';
    },
    (s: typeof first) => {
      s.sources[0].lessonIds = ['INVENTED'];
    },
    (s: typeof first) => {
      s.sources[0].items[0].title = 'Altered without matching fingerprint';
    },
    (s: typeof first) => {
      s.sources[0].items[0].publishedAt = '2099-01-01T00:00:00Z';
      s.sources[0].fingerprint = fingerprint(s.sources[0].items);
    },
    (s: typeof first) => {
      s.sources[6].items[0].modelRefs![0].url = 'https://evil.test';
      s.sources[6].fingerprint = fingerprint(s.sources[6].items);
    },
  ]) {
    const bad = structuredClone(first);
    mutate(bad);
    expect(() => parseKnowledge(bad)).toThrow('PROVENANCE');
  }
});
it('rejects XML entities, foreign URLs, HTML masquerading as Markdown and oversized RSS', async () => {
  for (const body of [
    '<!DOCTYPE rss [<!ENTITY e SYSTEM "file:///secret">]><rss/>',
    '<rss><item><title>Foreign</title><link>http://127.0.0.1/private</link><pubDate>Thu, 01 Oct 2026 00:00:00 GMT</pubDate></item></rss>',
    'x'.repeat(1_048_577),
  ]) {
    const data = await refreshKnowledge(
      async (url, init) =>
        String(url).endsWith('rss.xml')
          ? new Response(body, { headers: { 'content-type': 'text/xml' } })
          : knowledgeFixtureFetch(url, init),
      knowledgeNow,
    );
    expect(data.sources.find((s) => s.id === 'OPENAI_NEWS')).toMatchObject({
      status: 'unavailable',
      fingerprint: null,
      items: [],
    });
  }
  const html = await refreshKnowledge(
    async (url, init) =>
      String(url).endsWith('models.md')
        ? new Response('<html>unavailable</html>', { headers: { 'content-type': 'text/html' } })
        : knowledgeFixtureFetch(url, init),
    knowledgeNow,
  );
  expect(html.sources.find((s) => s.id === 'OPENAI_MODELS')?.status).toBe('unavailable');
});
it('limits Mentor context to lesson-related observations without large mapping arrays', async () => {
  const data = await snapshot(),
    lessonId = knowledgeSources[0].lessonIds[0];
  const context = knowledgeContext(data, lessonId);
  expect(context.sources.length).toBeGreaterThan(0);
  expect(
    context.sources.every((s) =>
      knowledgeSources.find((k) => k.id === s.id)!.lessonIds.includes(lessonId),
    ),
  ).toBe(true);
  expect(context.sources.every((s) => !('lessonIds' in s) && !('skillIds' in s))).toBe(true);
  expect(JSON.stringify(knowledgeContext(data)).length).toBeLessThan(12000);
});
it('coalesces by cache path, persists privately and skips repeated due-slot requests', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'knowledge-tests-'));
  try {
    const file = path.join(directory, 'cache.json'),
      request = vi.fn<typeof fetch>().mockImplementation(knowledgeFixtureFetch);
    const options = { file, now: knowledgeNow, request };
    const [a, b] = await Promise.all([ensureKnowledge(options), ensureKnowledge(options)]);
    expect(a).toEqual(b);
    expect(request).toHaveBeenCalledTimes(8);
    expect(await readKnowledge(file)).toEqual(a);
    expect((await fs.stat(file)).mode & 0o777).toBe(0o600);
    await ensureKnowledge(options);
    expect(request).toHaveBeenCalledTimes(8);
    await ensureKnowledge({ ...options, file: path.join(directory, 'other.json') });
    expect(request).toHaveBeenCalledTimes(16);
    const legacy = {
      schemaVersion: 1,
      slot: a.slot,
      attemptedAt: a.attemptedAt,
      sources: a.sources
        .slice(0, 3)
        .map(({ id, name, checkedAt, status, items }) => ({
          id,
          name,
          checkedAt,
          status,
          items: items.map(({ id, title, url, publishedAt }) => ({ id, title, url, publishedAt })),
        })),
    };
    await fs.writeFile(file, JSON.stringify(legacy));
    await ensureKnowledge(options);
    expect(request).toHaveBeenCalledTimes(24);
    await persistKnowledge(a, file);
    await fs.writeFile(file, 'x'.repeat(128001));
    expect(await readKnowledge(file)).toBeUndefined();
    expect((await fs.readdir(directory)).some((name) => name.endsWith('.tmp'))).toBe(false);
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
});
