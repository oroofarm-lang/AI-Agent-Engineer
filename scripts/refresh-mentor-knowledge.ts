async function main() {
  const snapshot = await refreshKnowledge();
  await persistKnowledge(snapshot);
  for (const source of snapshot.sources)
    console.log(
      `${source.id}: ${source.status}, ${source.items.length} official release references`,
    );
  if (snapshot.sources.some((source) => source.status !== 'ok')) process.exitCode = 1;
}
main().catch(() => {
  console.error('Knowledge refresh failed');
  process.exitCode = 1;
});
import { refreshKnowledge } from '../src/lib/ai/knowledge';
import { persistKnowledge } from '../src/lib/ai/knowledge-store';
