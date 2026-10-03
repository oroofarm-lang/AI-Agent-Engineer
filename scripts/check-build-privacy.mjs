import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd(),
  manifests = [];
function visit(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (entry.name.endsWith('.nft.json')) manifests.push(file);
  }
}
visit(path.join(root, '.next/server'));
const serverTrace = path.join(root, '.next/next-server.js.nft.json');
if (fs.existsSync(serverTrace)) manifests.push(serverTrace);
if (!manifests.length) throw new Error('No production traces found; run next build first.');
const forbidden = [];
for (const manifest of manifests) {
  const data = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  for (const relative of data.files || []) {
    const file = path
      .relative(root, path.resolve(path.dirname(manifest), relative))
      .replaceAll(path.sep, '/');
    if (/^(\.data\/|\.git\/|\.env(?:\.|$)|Volt\/(?:מחברת|קבצים|AI-Agent-Engineer)\/)/.test(file))
      forbidden.push(file);
  }
}
if (forbidden.length)
  throw new Error(
    'Production traces include private configuration or user-data paths. Deployment is blocked.',
  );
console.log(
  `Production privacy check passed: ${manifests.length} traces contain no private configuration, user databases or personal Vault notes.`,
);
