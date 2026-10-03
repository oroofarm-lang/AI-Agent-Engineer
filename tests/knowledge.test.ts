import { expect, it, vi } from 'vitest';
import { knowledgeSlot, refreshKnowledge, parseKnowledge } from '../src/lib/ai/knowledge';
import { knowledgeFixtureFetch, knowledgeNow } from './fixtures/knowledge';
it('uses exactly three weekly slots and does not invent a completed refresh', () => {
  expect(knowledgeSlot(new Date('2026-10-02T05:59:00Z'))).toBe('2026-09-30T06:00:00.000Z');
  expect(knowledgeSlot(new Date('2026-10-02T06:00:00Z'))).toBe('2026-10-02T06:00:00.000Z');
  expect(knowledgeSlot(new Date('2026-10-04T18:00:00Z'))).toBe('2026-10-02T06:00:00.000Z');
});
it('fetches only fixed public endpoints, filters drafts and records provenance', async () => {
  const request = vi.fn<typeof fetch>().mockImplementation(knowledgeFixtureFetch);
  const snapshot = await refreshKnowledge(request, knowledgeNow);
  expect(request).toHaveBeenCalledTimes(8);
  expect(snapshot.sources.every((item) => item.items.length >= 1 && item.status === 'ok')).toBe(
    true,
  );
  expect(
    snapshot.sources
      .filter((item) => item.kind.endsWith('-release'))
      .every((item) => item.items.length === 1),
  ).toBe(true);
  expect(parseKnowledge(snapshot)).toEqual(snapshot);
  const poisoned = structuredClone(snapshot);
  poisoned.sources[0].items[0].url = 'http://127.0.0.1/private';
  expect(() => parseKnowledge(poisoned)).toThrow('PROVENANCE');
  expect(
    request.mock.calls.every(
      ([, options]) =>
        options?.redirect === 'error' && options?.cache === 'no-store' && options?.signal,
    ),
  ).toBe(true);
});
it('handles outages, oversize responses and redirect attempts as unavailable data', async () => {
  const request = vi
    .fn<typeof fetch>()
    .mockResolvedValueOnce(new Response(null, { status: 302 }))
    .mockResolvedValueOnce(Response.json({ error: 'rate limit' }, { status: 429 }))
    .mockResolvedValueOnce(
      new Response('x'.repeat(256001), { headers: { 'content-type': 'application/json' } }),
    );
  const snapshot = await refreshKnowledge(request);
  expect(
    snapshot.sources.every((item) => item.status === 'unavailable' && item.items.length === 0),
  ).toBe(true);
});
