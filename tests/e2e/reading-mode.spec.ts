import { test, expect } from './fixtures';

test('reading modes move keyboard focus to the displayed content and scroll to its start', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/learn/W01D01_FIRST_AI_PROGRAM');
  await page.getByRole('button', { name: 'קריאה רציפה', exact: true }).click();
  const readingHeading = page.locator('.canvas-reading h2').first();
  await expect(readingHeading).toBeFocused();
  await expect
    .poll(() =>
      page.locator('.canvas-reading').evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBeGreaterThanOrEqual(0);
  await expect
    .poll(() =>
      page.locator('.canvas-reading').evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBeLessThan(70);
  await page.getByRole('button', { name: 'חזרה לכרטיסיות', exact: true }).click();
  await expect(page.locator('#canvas-step-title')).toBeFocused();
});

test('high contrast retains a visible current-slide marker independently of color', async ({
  page,
}) => {
  await page.goto('/learn/W01D01_FIRST_AI_PROGRAM');
  await page.getByRole('button', { name: 'פתיחת אפשרויות נגישות' }).click();
  await page.getByLabel('ניגודיות גבוהה', { exact: true }).check();
  await page.keyboard.press('Escape');
  const steps = page.getByRole('navigation', { name: 'מעבר לפי מספר שקופית' });
  await expect(steps.locator('[aria-current="step"]')).toHaveCSS('box-shadow', /inset/);
  await expect(steps.locator('button').nth(1)).not.toHaveCSS('box-shadow', /inset/);
  await steps.locator('button').nth(1).click();
  await expect(steps.locator('button').nth(1)).toHaveAttribute('aria-current', 'step');
  await expect(steps.locator('button').nth(1)).toHaveCSS('box-shadow', /inset/);
  await expect(steps.locator('button').first()).not.toHaveCSS('box-shadow', /inset/);
});
