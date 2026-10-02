import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  knowledgeSlot,
  parseKnowledge,
  refreshKnowledge,
  type KnowledgeSnapshot,
} from './knowledge';
const filename = () =>
  path.resolve(
    /* turbopackIgnore: true */ process.env.MENTOR_KNOWLEDGE_PATH || '.data/mentor/knowledge.json',
  );
let running: Promise<KnowledgeSnapshot> | undefined;
export async function readKnowledge() {
  try {
    const file = filename();
    if ((await fs.stat(/* turbopackIgnore: true */ file)).size > 48000) return undefined;
    return parseKnowledge(JSON.parse(await fs.readFile(/* turbopackIgnore: true */ file, 'utf8')));
  } catch {
    return undefined;
  }
}
export async function persistKnowledge(snapshot: KnowledgeSnapshot) {
  const file = filename();
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.${randomUUID()}.tmp`;
  try {
    await fs.writeFile(temp, JSON.stringify(parseKnowledge(snapshot), null, 2), { mode: 0o600 });
    await fs.rename(temp, file);
  } finally {
    await fs.rm(temp, { force: true });
  }
}
/** Coalesce requests; refresh once per due slot, including failed checks (no retry storm). */
export async function ensureKnowledge() {
  const previous = await readKnowledge();
  if (previous && previous.slot === knowledgeSlot(new Date())) return previous;
  running ??= refreshKnowledge()
    .then(async (snapshot) => {
      await persistKnowledge(snapshot);
      return snapshot;
    })
    .finally(() => {
      running = undefined;
    });
  return running;
}
