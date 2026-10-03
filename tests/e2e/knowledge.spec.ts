import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';
test('official discovery is readable without an AI key, filters by type and preserves access restrictions', async ({
  page,
  browser,
}) => {
  await page.goto('/updates');
  await expect(page.getByRole('heading', { name: 'מה חדש בעולם ה־AI?' })).toBeVisible();
  await expect(page.locator('.knowledge-source')).toHaveCount(8);
  await expect(page.getByRole('button', { name: 'עדכון המקורות' })).toHaveCount(0);
  const response = await page.request.get('/api/knowledge');
  expect(response.ok()).toBe(true);
  expect(response.headers()['cache-control']).toBe('no-store');
  const { snapshot } = await response.json();
  expect(snapshot.schemaVersion).toBe(2);
  expect(
    snapshot.sources.every((s: { verification: string }) => s.verification === 'discovery-only'),
  ).toBe(true);
  const forbidden = await page.request.post('/api/knowledge', {
    headers: { Origin: 'http://127.0.0.1:3100' },
    data: {},
  });
  expect(forbidden.status()).toBe(404);
  await page.getByLabel('סוג העדכון').selectOption('model-catalog');
  await page.getByRole('button', { name: 'סינון עדכונים' }).click();
  await expect(page.locator('.knowledge-source')).toHaveCount(1);
  await page.getByText('דפי מודלים שנמצאו בקטלוג (1)', { exact: true }).click();
  const model = page.getByRole('link', { name: /Fixture model/ });
  await expect(model).toHaveAttribute(
    'href',
    'https://developers.openai.com/api/docs/models/fixture-model',
  );
  await page.getByText('שיעורים שקשורים למקור', { exact: true }).click();
  expect(await page.locator('.knowledge-source a[href^="/learn/"]').count()).toBeGreaterThan(0);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    ).toBe(true);
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
  }
  const anonymous = await browser.newContext();
  try {
    const read = await anonymous.request.get('http://127.0.0.1:3100/api/knowledge');
    expect(read.status()).toBe(401);
    await anonymous.newPage().then(async (tab) => {
      await tab.goto('http://127.0.0.1:3100/updates');
      await expect(tab).toHaveURL(/\/auth/);
    });
  } finally {
    await anonymous.close();
  }
});
