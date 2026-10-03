import { knowledgeSources } from '../../src/lib/ai/knowledge';
export const knowledgeNow = new Date('2026-10-02T07:00:00Z');
/** Controlled protocol examples, never presented as actual publisher observations. */
export const knowledgeFixtureFetch: typeof fetch = async (url) => {
  const source = knowledgeSources.find((entry) => entry.url === String(url))!;
  if (source.reader === 'github-releases')
    return Response.json([
      {
        id: 1,
        name: 'fixture release',
        tag_name: 'v1',
        draft: false,
        prerelease: false,
        published_at: '2026-10-01T00:00:00Z',
        html_url: `https://github.com/${source.repo}/releases/tag/v1`,
      },
      {
        id: 2,
        name: 'draft',
        tag_name: 'draft',
        draft: true,
        prerelease: false,
        published_at: null,
        html_url: 'https://example.test/ignored',
      },
      {
        id: 3,
        name: 'foreign release',
        tag_name: 'v3',
        draft: false,
        prerelease: false,
        published_at: '2026-10-01T00:00:00Z',
        html_url: 'https://github.com/foreign/repo/releases/tag/v3',
      },
      {
        id: 4,
        name: 'future release',
        tag_name: 'v4',
        draft: false,
        prerelease: false,
        published_at: '2099-01-01T00:00:00Z',
        html_url: `https://github.com/${source.repo}/releases/tag/v4`,
      },
    ]);
  if (source.reader === 'news-rss')
    return new Response(
      '<rss><channel><item><title><![CDATA[Official fixture & news]]></title><link>https://openai.com/index/fixture</link><pubDate>Thu, 01 Oct 2026 00:00:00 GMT</pubDate></item></channel></rss>',
      { headers: { 'content-type': 'text/xml' } },
    );
  if (source.reader === 'model-markdown')
    return new Response(
      '[Fixture model](/api/docs/models/fixture-model.md)\n[Duplicate](/api/docs/models/fixture-model)\n[Compare](/api/docs/models/compare)\n[Foreign](https://evil.test/model)',
      { headers: { 'content-type': 'text/markdown' } },
    );
  return new Response(
    '## October, 2026\n### Oct 2\nFeature: fixture API change.\n### Oct 1\nFix: fixture correction.',
    { headers: { 'content-type': 'text/markdown' } },
  );
};
