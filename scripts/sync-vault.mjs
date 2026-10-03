// Compatibility entry point; the validated TypeScript sync shares the protected API writer.
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const child = spawn(
  process.execPath,
  [path.join(root, 'node_modules/tsx/dist/cli.mjs'), path.join(root, 'scripts/sync-vault.ts')],
  { cwd: root, stdio: 'inherit', shell: false },
);
child.on('error', () => {
  console.error('Could not start the public Vault exporter.');
  process.exitCode = 1;
});
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
