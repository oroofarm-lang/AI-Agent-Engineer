import { loadEnvConfig } from '@next/env';
import { syncPublicVault } from '../src/lib/vault/sync';
// Match the server's configured release ledger and public root without printing environment values.
loadEnvConfig(process.cwd());
syncPublicVault()
  .then((result) => console.log(JSON.stringify(result, null, 2)))
  .catch(() => {
    console.error(
      'Public Vault sync failed. Existing edited notes are preserved. Inspect the public export before retrying.',
    );
    process.exitCode = 1;
  });
