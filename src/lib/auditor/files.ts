import fs from 'node:fs';
import path from 'node:path';
import { constants } from 'node:fs';
import { randomUUID } from 'node:crypto';
import type { z } from 'zod';

export const auditorDirectory = () =>
  path.resolve(
    /* turbopackIgnore: true */ process.env.CURRICULUM_AUDITOR_DIR || '.data/curriculum-auditor',
  );
/** All paths are server-generated. Reject symbolic links before any reads or writes. */
export function checkedPath(root: string, relative = '') {
  if (
    relative &&
    (path.isAbsolute(relative) ||
      relative.split(/[\\/]/).some((part) => !part || part === '.' || part === '..'))
  )
    throw new Error('AUDITOR_PATH');
  const target = path.resolve(root, relative);
  let probe = target;
  while (true) {
    try {
      if (fs.lstatSync(/* turbopackIgnore: true */ probe).isSymbolicLink())
        throw new Error('AUDITOR_SYMLINK');
    } catch (error) {
      if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
    }
    const parent = path.dirname(probe);
    if (parent === probe) break;
    probe = parent;
  }
  return target;
}
export function readRecord<T>(
  root: string,
  relative: string,
  schema: z.ZodType<T>,
  maxBytes = 1_200_000,
): T | undefined {
  const file = checkedPath(root, relative);
  let fd: number | undefined;
  try {
    fd = fs.openSync(/* turbopackIgnore: true */ file, constants.O_RDONLY | constants.O_NOFOLLOW);
    const stat = fs.fstatSync(fd);
    if (!stat.isFile() || stat.size > maxBytes) throw new Error('AUDITOR_RECORD_SIZE');
    return schema.parse(JSON.parse(fs.readFileSync(fd, 'utf8')));
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return undefined;
    throw error;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}
/** Atomic creation never overwrites decisions; replacement is reserved for the active pointer/journal. */
export function writeRecord(root: string, relative: string, value: unknown, replace = false) {
  const target = checkedPath(root, relative),
    text = `${JSON.stringify(value, null, 2)}\n`;
  if (Buffer.byteLength(text) > 1_200_000) throw new Error('AUDITOR_RECORD_SIZE');
  fs.mkdirSync(path.dirname(target), { recursive: true, mode: 0o700 });
  const temporary = checkedPath(root, `${relative}.${randomUUID()}.tmp`);
  const fd = fs.openSync(temporary, 'wx', 0o600);
  try {
    fs.writeFileSync(fd, text);
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
  try {
    if (replace) fs.renameSync(temporary, target);
    else fs.linkSync(temporary, target);
  } finally {
    fs.rmSync(temporary, { force: true });
  }
}
/** The OS lock is held until the operation completes; a surviving lock is never silently discarded. */
export function withAuditorLock<T>(root: string, task: () => T) {
  checkedPath(root);
  fs.mkdirSync(root, { recursive: true, mode: 0o700 });
  const lock = checkedPath(root, 'mutation.lock');
  let fd: number;
  try {
    fd = fs.openSync(lock, 'wx', 0o600);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'EEXIST')
      throw new Error('AUDITOR_BUSY');
    throw error;
  }
  try {
    fs.writeFileSync(
      fd,
      JSON.stringify({ pid: process.pid, acquiredAt: new Date().toISOString() }),
    );
    return task();
  } finally {
    fs.closeSync(fd);
    fs.rmSync(lock);
  }
}
