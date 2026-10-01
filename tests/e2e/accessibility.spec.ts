import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';
const lesson = '/learn/W01D01_FIRST_AI_PROGRAM';
test('WCAG automated checks across public, learning and account screens', async ({ page }) => {
  for (const route of [
    '/',
    '/learn',
    lesson,
    '/skills',
    '/assessments',
    '/projects',
    '/projects/W01D05_PROJECT_AGENT_ZERO',
    '/boss',
    '/settings',
    '/journal',
    '/failures',
    '/topics',
    '/topics/CORE',
    '/learn/FND_01?module=CORE',
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect
      .soft(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
        `${route}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })) })))}`,
      )
      .toEqual([]);
  }
  await page.getByRole('button', { name: /AI Mentor/ }).click();
  await expect(page.getByText('חיבור ה־AI עדיין לא פעיל.', { exact: false })).toBeVisible();
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await page.goto(lesson);
  await page.getByRole('button', { name: 'קריאה רציפה', exact: true }).click();
  const reading = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(reading.violations).toEqual([]);
});
test('card navigation scrolls and focuses, preferences persist and dialogs support keyboard', async ({
  page,
}) => {
  await page.goto(lesson);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'הבא', exact: true }).click();
  await expect(page.locator('#canvas-step-title')).toBeFocused();
  await expect
    .poll(() =>
      page.locator('.focus-card').evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBeGreaterThanOrEqual(0);
  await expect
    .poll(() =>
      page.locator('.focus-card').evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBeLessThan(70);
  await expect(page.getByText('מיקום הקריאה נשמר.', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.locator('#canvas-step-title')).toContainText('קודם בונים');
  const toggle = page.getByRole('button', { name: 'פתיחת אפשרויות נגישות' });
  await toggle.click();
  await page.getByRole('dialog').screenshot({ path: 'docs/screenshots/accessibility-menu.png' });
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    expect(
      await page.evaluate(() => Boolean(document.activeElement?.closest('dialog[open]'))),
    ).toBe(true);
  }
  await page.getByLabel('ניגודיות גבוהה', { exact: true }).check();
  await page.getByLabel('גווני אפור', { exact: true }).check();
  await page.getByLabel('הפחתת תנועה ועצירת אנימציות').check();
  await page.getByLabel('גודל טקסט').selectOption('200');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-contrast', 'high');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduce');
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await toggle.click();
  await expect(page.getByLabel('גודל טקסט')).toHaveValue('200');
  await page.getByRole('button', { name: 'איפוס העדפות' }).click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'מדיניות פרטיות', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'מדיניות פרטיות' })).toBeVisible();
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'מדיניות פרטיות', exact: true })).toBeFocused();
});
test('responsive layout at mobile, tablet and desktop with 200 percent text', async ({ page }) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', lesson, '/settings', '/topics', '/topics/CORE']) {
      await page.goto(route);
      await page.getByRole('button', { name: 'פתיחת אפשרויות נגישות' }).click();
      await page.getByLabel('גודל טקסט').selectOption('200');
      await page.keyboard.press('Escape');
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${width} ${route}`,
      ).toBe(true);
      if (width === 390 && route === '/')
        await page.screenshot({
          path: 'docs/screenshots/mobile-large-text.png',
          fullPage: true,
          animations: 'disabled',
        });
    }
  }
});
