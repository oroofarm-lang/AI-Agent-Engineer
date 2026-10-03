import { defineConfig, devices } from '@playwright/test';
import { randomUUID } from 'node:crypto';
const testDatabase = `.data/e2e-${randomUUID()}.sqlite`;
const testKnowledge = `.data/e2e-${randomUUID()}-knowledge.json`;
const testAuditor = `.data/e2e-${randomUUID()}-auditor`;
const testVault = `.data/e2e-${randomUUID()}-vault`;
export default defineConfig({
  metadata: { testVault },
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command:
      'npm run db:setup && npx tsx scripts/setup-test-knowledge.ts && npx tsx scripts/setup-test-auditor.ts && npm run start -- --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: false,
    timeout: 120000,
    env: {
      DATABASE_URL: testDatabase,
      OPENAI_API_KEY: '',
      AI_MODEL: '',
      BETTER_AUTH_URL: 'http://127.0.0.1:3100',
      BETTER_AUTH_SECRET: 'e2e-only-secret-not-for-deployment-0123456789',
      SMTP_URL: '',
      SMTP_HOST: '',
      SMTP_USER: '',
      SMTP_PASSWORD: '',
      MAIL_FROM: '',
      ADMIN_EMAILS: 'qa-manager@example.test',
      MENTOR_KNOWLEDGE_PATH: testKnowledge,
      CURRICULUM_AUDITOR_DIR: testAuditor,
      VAULT_EXPORT_DIR: testVault,
    },
  },
});
