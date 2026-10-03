import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { loadKnowledgeRegistry } from './knowledge-registry';
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
const maxBytes = 128000;
const running = new Map<string, Promise<KnowledgeSnapshot>>();
export async function readKnowledge(file = filename()) {
  try {
    if ((await fs.stat(/* turbopackIgnore: true */ file)).size > maxBytes) return undefined;
    return parseKnowledge(JSON.parse(await fs.readFile(/* turbopackIgnore: true */ file, 'utf8')));
  } catch {
    return undefined;
  }
}
export async function persistKnowledge(snapshot: KnowledgeSnapshot, file = filename()) {
  const text = JSON.stringify(parseKnowledge(snapshot), null, 2);
  if (Buffer.byteLength(text, 'utf8') > maxBytes) throw new Error('KNOWLEDGE_TOO_LARGE');
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.${randomUUID()}.tmp`;
  try {
    await fs.writeFile(temp, text, { mode: 0o600, flag: 'wx' });
    await fs.rename(temp, file);
  } finally {
    await fs.rm(temp, { force: true });
  }
}
/** Coalesce requests; refresh once per due slot, including failed checks (no retry storm). */
export async function ensureKnowledge(
  options: { file?: string; now?: Date; request?: typeof fetch } = {},
) {
  const file = path.resolve(options.file || filename());
  const existing = running.get(file);
  if (existing) return existing;
  const now = options.now || new Date();
  // Register before reading the cache so concurrent requests cannot start duplicate refreshes.
  const task = (async () => {
    const previous = await readKnowledge(file);
    if (
      previous &&
      previous.registryVersion === loadKnowledgeRegistry().version &&
      previous.slot === knowledgeSlot(now)
    )
      return previous;
    const snapshot = await refreshKnowledge(options.request || fetch, now, previous);
    await persistKnowledge(snapshot, file);
    return snapshot;
  })().finally(() => {
    running.delete(file);
  });
  running.set(file, task);
  return task;
}
