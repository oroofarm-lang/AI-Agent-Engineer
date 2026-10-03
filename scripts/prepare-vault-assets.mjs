import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { publicAssetCatalog, publicApiCatalog } from './lib/vault-export.mjs';
const assets = publicAssetCatalog.map((asset) => {
  if (
    !(
      /^(src\/components|content\/labs|public\/course-data)\//.test(asset.sourcePath) ||
      /^src\/lib\/templates\/(schema|formats)\.ts$/.test(asset.sourcePath)
    ) ||
    asset.sourcePath.split('/').some((part) => part === '..')
  )
    throw new Error('INVALID_PUBLIC_ASSET');
  const body = fs.readFileSync(path.join(process.cwd(), asset.sourcePath), 'utf8');
  return { ...asset, body, sha256: createHash('sha256').update(body).digest('hex') };
});
const apis = publicApiCatalog.map((api) => ({
  ...api,
  status: fs.existsSync(path.join(process.cwd(), api.sourcePath))
    ? 'implemented'
    : 'integration-in-progress',
}));
const target = path.join(process.cwd(), 'content/vault/public-assets.json');
fs.mkdirSync(path.dirname(target), { recursive: true });
const body = JSON.stringify({ schemaVersion: 1, assets, apis }, null, 2) + '\n';
if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== body)
  fs.writeFileSync(target, body);
console.log(
  `Prepared ${assets.length} public asset snapshots and ${apis.length} API contracts. No private paths are included.`,
);
