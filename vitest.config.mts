import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    include: ['tests/**/*.test.ts'],
    env: {
      // Unit tests use the source baseline, never the host's private active-release ledger.
      CURRICULUM_AUDITOR_DIR: `.data/unit-${randomUUID()}-auditor`,
    },
  },
});
