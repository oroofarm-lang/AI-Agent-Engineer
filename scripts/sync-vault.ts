import { syncPublicVault } from '../src/lib/vault/sync';
syncPublicVault()
  .then((result) => console.log(JSON.stringify(result, null, 2)))
  .catch(() => {
    console.error(
      'Public Vault sync failed. Existing edited notes are preserved. Inspect the public export before retrying.',
    );
    process.exitCode = 1;
  });
