import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { expect, it } from 'vitest';
const execute = promisify(execFile);

it('scheduled CLI honors an isolated local cache setting without loading real configuration or contacting publishers', async () => {
  const root = process.cwd();
  const folder = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'knowledge-cli-')));
  try {
    await fs.cp(path.join(root, 'content/curriculum'), path.join(folder, 'content/curriculum'), {
      recursive: true,
    });
    await fs.writeFile(
      path.join(folder, '.env.local'),
      'MENTOR_KNOWLEDGE_PATH=custom-cache/knowledge.json\nSYNTHETIC_SECRET=do-not-print-fixture\n',
    );
    const preload = path.join(folder, 'fixture.mts');
    await fs.writeFile(
      preload,
      `import { knowledgeFixtureFetch } from ${JSON.stringify(path.join(root, 'tests/fixtures/knowledge.ts'))};\nglobalThis.fetch = knowledgeFixtureFetch;\n`,
    );
    const { stdout, stderr } = await execute(
      process.execPath,
      [
        '--import',
        path.join(root, 'node_modules/tsx/dist/loader.mjs'),
        '--import',
        preload,
        path.join(root, 'scripts/refresh-mentor-knowledge.ts'),
      ],
      { cwd: folder, env: { PATH: process.env.PATH, NODE_ENV: 'production' }, timeout: 15000 },
    );
    const snapshot = JSON.parse(
      await fs.readFile(path.join(folder, 'custom-cache/knowledge.json'), 'utf8'),
    );
    expect(snapshot.schemaVersion).toBe(2);
    expect(snapshot.sources).toHaveLength(8);
    expect(snapshot.sources.every((source: { status: string }) => source.status === 'ok')).toBe(
      true,
    );
    expect(stdout + stderr).not.toContain('do-not-print-fixture');
    await expect(fs.stat(path.join(folder, '.data/mentor/knowledge.json'))).rejects.toMatchObject({
      code: 'ENOENT',
    });
  } finally {
    await fs.rm(folder, { recursive: true, force: true });
  }
}, 20000);
