import { refreshKnowledge } from '../src/lib/ai/knowledge';
import { persistKnowledge } from '../src/lib/ai/knowledge-store';
import { knowledgeFixtureFetch, knowledgeNow } from '../tests/fixtures/knowledge';
if (!process.env.MENTOR_KNOWLEDGE_PATH?.startsWith('.data/e2e-'))
  throw new Error('ISOLATED_TEST_PATH_REQUIRED');
async function main() {
  await persistKnowledge(await refreshKnowledge(knowledgeFixtureFetch, knowledgeNow));
}
main().catch(() => {
  console.error('Isolated knowledge fixture setup failed');
  process.exitCode = 1;
});
