import { loadEnvConfig } from '@next/env';
// Load the same cache and release-ledger settings as the server before importing readers.
loadEnvConfig(process.cwd());

async function main() {
  const { refreshKnowledge } = await import('../src/lib/ai/knowledge');
  const { persistKnowledge, readKnowledge } = await import('../src/lib/ai/knowledge-store');
  const snapshot = await refreshKnowledge(fetch, new Date(), await readKnowledge());
  await persistKnowledge(snapshot);
  for (const source of snapshot.sources)
    console.log(
      `${source.id}: ${source.status}, ${source.items.length} discovery references, ${source.change}`,
    );
  if (snapshot.sources.some((source) => source.status !== 'ok')) process.exitCode = 1;
}
main().catch(() => {
  console.error('Knowledge refresh failed');
  process.exitCode = 1;
});
