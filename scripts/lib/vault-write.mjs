import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

const queues = new Map();
const hash = (value) => createHash('sha256').update(value).digest('hex');

/** JSON formatting is not a Canvas edit. Keep every property and array's drawing order. */
function canvasFingerprint(body) {
  const canonical = (value, depth = 0) => {
    if (depth > 80) throw new Error('CANVAS_TOO_DEEP');
    if (Array.isArray(value)) return value.map((item) => canonical(item, depth + 1));
    if (value && typeof value === 'object')
      return Object.fromEntries(
        Object.keys(value)
          .sort()
          .map((key) => [key, canonical(value[key], depth + 1)]),
      );
    return value;
  };
  try {
    const canvas = JSON.parse(body.toString('utf8'));
    if (!canvas || !Array.isArray(canvas.nodes) || !Array.isArray(canvas.edges)) return null;
    return hash(JSON.stringify(canonical(canvas)));
  } catch {
    return null;
  }
}
const publicPrefixes = [
  '00_ORCHESTRATION/',
  '01_AGENTS/',
  '02_CURRICULUM/',
  '03_PRACTICAL_PROOFS/',
  '04_AUTOMATIONS_AND_APIS/',
  'קורס/',
];
const publicRoots = new Set(['Index.md', 'Root_Knowledge_Graph.canvas', 'התחלה כאן.md']);

/** Never resolve or read the personal notebook, configuration secrets, or arbitrary vault paths. */
export function validateGeneratedPath(relative) {
  if (
    typeof relative !== 'string' ||
    relative.includes('\\') ||
    relative.startsWith('/') ||
    relative.split('/').some((part) => !part || part === '.' || part === '..') ||
    !/\.(md|canvas)$/.test(relative) ||
    (!publicRoots.has(relative) && !publicPrefixes.some((prefix) => relative.startsWith(prefix)))
  )
    throw new Error('INVALID_PUBLIC_VAULT_PATH');
  return relative;
}

async function statOrNull(file) {
  try {
    return await fs.lstat(file);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function inspectPath(root, relative, allowMissing = true) {
  const parts = relative.split('/');
  let current = root;
  for (let i = 0; i < parts.length; i++) {
    current = path.join(current, parts[i]);
    const stat = await statOrNull(current);
    if (!stat) {
      if (allowMissing) return null;
      throw new Error('VAULT_FILE_DISAPPEARED');
    }
    if (stat.isSymbolicLink()) throw new Error('VAULT_SYMLINK_REJECTED');
    if (i < parts.length - 1 && !stat.isDirectory()) throw new Error('VAULT_PATH_NOT_DIRECTORY');
    if (i === parts.length - 1 && !stat.isFile()) throw new Error('VAULT_PATH_NOT_FILE');
  }
  return fs.lstat(current);
}

async function readRegular(root, relative, limit = 8_000_000) {
  const stat = await inspectPath(root, relative);
  if (!stat) return null;
  if (stat.size > limit) throw new Error('VAULT_FILE_TOO_LARGE');
  const target = path.join(root, relative);
  const resolved = await fs.realpath(target);
  if (resolved !== target) throw new Error('VAULT_SYMLINK_REJECTED');
  const handle = await fs.open(target, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const opened = await handle.stat();
    if (!opened.isFile() || opened.size > limit) throw new Error('VAULT_FILE_TOO_LARGE');
    return { body: await handle.readFile(), mode: opened.mode & 0o777 };
  } finally {
    await handle.close();
  }
}

async function ensurePublicParents(root, relative) {
  const parts = relative.split('/').slice(0, -1);
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    const stat = await statOrNull(current);
    if (stat?.isSymbolicLink()) throw new Error('VAULT_SYMLINK_REJECTED');
    if (stat && !stat.isDirectory()) throw new Error('VAULT_PATH_NOT_DIRECTORY');
    if (!stat) await fs.mkdir(current);
  }
}

async function atomicWrite(root, relative, body, mode = 0o644) {
  await ensurePublicParents(root, relative);
  await inspectPath(root, relative);
  const target = path.join(root, relative);
  const temporary = path.join(path.dirname(target), `.vault-${randomUUID()}.tmp`);
  const handle = await fs.open(
    temporary,
    constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW,
    mode,
  );
  try {
    await handle.writeFile(body);
    await handle.sync();
  } finally {
    await handle.close();
  }
  try {
    await inspectPath(root, relative);
    await fs.rename(temporary, target);
  } finally {
    await fs.rm(temporary, { force: true });
  }
}

function parseManifest(saved) {
  const previous = saved ? JSON.parse(saved.body.toString('utf8')) : { files: {} };
  if (
    !previous ||
    !previous.files ||
    typeof previous.files !== 'object' ||
    Array.isArray(previous.files)
  )
    throw new Error('INVALID_VAULT_MANIFEST');
  for (const [relative, value] of Object.entries(previous.files)) {
    validateGeneratedPath(relative);
    if (!/^[a-f0-9]{64}$/.test(value)) throw new Error('INVALID_VAULT_MANIFEST');
  }
  if (previous.canvasFiles !== undefined) {
    if (
      !previous.canvasFiles ||
      typeof previous.canvasFiles !== 'object' ||
      Array.isArray(previous.canvasFiles)
    )
      throw new Error('INVALID_VAULT_MANIFEST');
    for (const [relative, value] of Object.entries(previous.canvasFiles)) {
      validateGeneratedPath(relative);
      if (
        !relative.endsWith('.canvas') ||
        !Object.hasOwn(previous.files, relative) ||
        typeof value !== 'string' ||
        !/^[a-f0-9]{64}$/.test(value)
      )
        throw new Error('INVALID_VAULT_MANIFEST');
    }
  }
  if (previous.curriculumHash !== undefined && !/^[a-f0-9]{64}$/.test(previous.curriculumHash))
    throw new Error('INVALID_VAULT_MANIFEST');
  if (
    previous.quizBankHash !== undefined &&
    previous.quizBankHash !== null &&
    !/^[a-f0-9]{64}$/.test(previous.quizBankHash)
  )
    throw new Error('INVALID_VAULT_MANIFEST');
  return previous;
}

/** Read only the known public manifest, without crawling notes or writing a directory. */
export async function readVaultManifest(vaultRoot) {
  const requestedRoot = path.resolve(vaultRoot),
    existing = await statOrNull(requestedRoot);
  if (!existing) return null;
  if (existing.isSymbolicLink() || !existing.isDirectory()) throw new Error('VAULT_ROOT_REJECTED');
  const root = await fs.realpath(requestedRoot),
    saved = await readRegular(root, '.course-export.json', 2_000_000);
  if (!saved) return null;
  const manifest = parseManifest(saved);
  if (manifest.schemaVersion !== 2 || !/^\d+\.\d+\.\d+$/.test(manifest.version))
    throw new Error('INVALID_VAULT_MANIFEST');
  return {
    version: manifest.version,
    curriculumHash: manifest.curriculumHash || null,
    quizBankHash: manifest.quizBankHash || null,
  };
}

async function performWrite(options) {
  const { vaultRoot, manifestName = '.course-export.json' } = options;
  if (manifestName !== '.course-export.json') throw new Error('INVALID_VAULT_MANIFEST');
  const requestedRoot = path.resolve(vaultRoot);
  const existing = await statOrNull(requestedRoot);
  if (existing?.isSymbolicLink() || (existing && !existing.isDirectory()))
    throw new Error('VAULT_ROOT_REJECTED');
  if (!existing) await fs.mkdir(requestedRoot, { recursive: true });
  const root = await fs.realpath(requestedRoot);
  const lockPath = path.join(root, '.vault-sync.lock');
  if ((await statOrNull(lockPath))?.isSymbolicLink()) throw new Error('VAULT_SYMLINK_REJECTED');
  let lock;
  try {
    lock = await fs.open(
      lockPath,
      constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW,
      0o600,
    );
  } catch (error) {
    if (error.code === 'EEXIST') throw new Error('VAULT_SYNC_BUSY');
    throw error;
  }
  try {
    await lock.writeFile(JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() }));
    // A waiting writer must construct its catalog snapshot only after acquiring the actual lock.
    const { files, version, curriculumHash, quizBankHash } = options.prepare
      ? await options.prepare()
      : options;
    if (
      !(files instanceof Map) ||
      !files.size ||
      !/^\d+\.\d+\.\d+$/.test(version) ||
      (curriculumHash !== undefined && !/^[a-f0-9]{64}$/.test(curriculumHash)) ||
      (quizBankHash !== undefined && quizBankHash !== null && !/^[a-f0-9]{64}$/.test(quizBankHash))
    )
      throw new Error('INVALID_VAULT_EXPORT');
    const desiredCanvases = new Map();
    for (const [relative, body] of files) {
      validateGeneratedPath(relative);
      if (typeof body !== 'string' || Buffer.byteLength(body) > 8_000_000)
        throw new Error('INVALID_VAULT_DOCUMENT');
      if (relative.endsWith('.canvas')) {
        const fingerprint = canvasFingerprint(body);
        if (!fingerprint) throw new Error('INVALID_VAULT_CANVAS');
        desiredCanvases.set(relative, fingerprint);
      }
    }
    const savedManifest = await readRegular(root, manifestName, 2_000_000);
    const previous = parseManifest(savedManifest),
      hashes = { ...previous.files },
      canvasFiles = { ...previous.canvasFiles };
    const updates = [],
      adoptions = [];
    // Preflight every target before publishing any document. Do not traverse unrelated notes.
    for (const [relative, body] of files) {
      const old = await readRegular(root, relative);
      const bytes = Buffer.from(body, 'utf8');
      const nextCanvas = desiredCanvases.get(relative);
      const oldHash = old && hash(old.body);
      const oldCanvas = old && nextCanvas ? canvasFingerprint(old.body) : null;
      const sameCanvas = Boolean(oldCanvas && oldCanvas === nextCanvas);
      if (
        old &&
        !old.body.equals(bytes) &&
        hashes[relative] !== oldHash &&
        !sameCanvas &&
        !(oldCanvas && oldCanvas === canvasFiles[relative])
      )
        throw new Error(`VAULT_EDITED_NOTE:${relative}`);
      if (!old || (!old.body.equals(bytes) && !sameCanvas)) updates.push({ relative, bytes, old });
      // A formatting-only save stays byte-for-byte intact, including a legacy manifest adoption.
      if (sameCanvas && hashes[relative] !== oldHash) adoptions.push({ relative, old });
      hashes[relative] = sameCanvas ? oldHash : hash(bytes);
      if (nextCanvas) canvasFiles[relative] = nextCanvas;
    }
    const ordered = (values) =>
      Object.fromEntries(Object.entries(values).sort(([a], [b]) => a.localeCompare(b, 'en')));
    const manifest = `${JSON.stringify({ schemaVersion: 2, version, ...(curriculumHash ? { curriculumHash } : {}), ...(quizBankHash !== undefined ? { quizBankHash } : {}), files: ordered(hashes), ...(Object.keys(canvasFiles).length ? { canvasFiles: ordered(canvasFiles) } : {}) }, null, 2)}\n`;
    const manifestChanged = !savedManifest || savedManifest.body.toString('utf8') !== manifest;
    const published = [];
    try {
      for (const update of updates) {
        // Recheck the old target immediately before its atomic replacement.
        const now = await readRegular(root, update.relative);
        if ((now?.body.toString('base64') || '') !== (update.old?.body.toString('base64') || ''))
          throw new Error('VAULT_CHANGED_DURING_SYNC');
        await atomicWrite(root, update.relative, update.bytes, update.old?.mode);
        published.push(update);
      }
      for (const adoption of adoptions) {
        const now = await readRegular(root, adoption.relative);
        if (!now?.body.equals(adoption.old.body)) throw new Error('VAULT_CHANGED_DURING_SYNC');
      }
      if (manifestChanged)
        await atomicWrite(root, manifestName, manifest, savedManifest?.mode || 0o600);
    } catch (error) {
      // Only this run's known public targets are restored; no directory traversal or notebook read.
      for (const update of published.reverse()) {
        const now = await readRegular(root, update.relative);
        if (!now?.body.equals(update.bytes))
          throw new Error('VAULT_ROLLBACK_CONFLICT', { cause: error });
        if (update.old) await atomicWrite(root, update.relative, update.old.body, update.old.mode);
        else await fs.rm(path.join(root, update.relative));
      }
      throw error;
    }
    return {
      changed: updates.length,
      unchanged: files.size - updates.length,
      manifestChanged,
      files: files.size,
      version,
      curriculumHash: curriculumHash || null,
      quizBankHash: quizBankHash || null,
    };
  } finally {
    await lock.close();
    await fs.rm(lockPath, { force: true });
  }
}

/** Serialize calls in-process and reject overlapping writers from another process via an exclusive lock. */
export function writeVaultFiles(options) {
  const key = path.resolve(options.vaultRoot);
  const previous = queues.get(key) || Promise.resolve();
  const running = previous.catch(() => {}).then(() => performWrite(options));
  queues.set(key, running);
  void running
    .finally(() => {
      if (queues.get(key) === running) queues.delete(key);
    })
    .catch(() => {});
  return running;
}
