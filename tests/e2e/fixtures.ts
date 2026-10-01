import { test as base, expect } from '@playwright/test';
import { randomUUID, randomInt } from 'node:crypto';
export const test = base.extend<{ learner: void }>({
  learner: [
    async ({ page }, use) => {
      await page
        .context()
        .setExtraHTTPHeaders({
          'x-real-ip': `10.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`,
        });
      const response = await page.request.post('/api/auth/sign-up/email', {
        headers: { Origin: 'http://127.0.0.1:3100' },
        data: {
          email: `${randomUUID()}@example.test`,
          password: 'Test-only-passphrase-987',
          name: 'Test Learner',
        },
      });
      expect(response.ok()).toBe(true);
      await use();
    },
    { auto: true },
  ],
});
export { expect };
