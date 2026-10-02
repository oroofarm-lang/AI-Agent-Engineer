import { defineConfig, devices } from '@playwright/test';
import { randomUUID } from 'node:crypto';
const testDatabase = `.data/e2e-${randomUUID()}.sqlite`;
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run db:setup && npm run start -- --port 3100',
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
      MENTOR_KNOWLEDGE_PATH: '.data/e2e-mentor-knowledge.json',
    },
  },
});
