import { test, expect } from './fixtures';
test('focus cards, concrete instruction practice and reading acknowledgement work', async ({
  page,
}) => {
  await page.goto('/learn/W01D01_FIRST_AI_PROGRAM');
  await page
    .locator('.focus-card')
    .screenshot({ path: 'docs/screenshots/arcade-lesson.png', animations: 'disabled' });
  const before = await (await page.request.get('/api/export')).json();
  await expect(page.getByRole('heading', { name: 'המשימה', exact: true })).toBeVisible();
  await expect(page.getByText('תרגול כתיבה · ללא שליחה ל־AI')).toBeVisible();
  await page.getByLabel('1. מה המשימה?').selectOption('הסבר מהי אוטומציה');
  await page.getByLabel('2. למי התשובה מיועדת?').selectOption('למתחיל ללא רקע טכני');
  await page.getByLabel('3. איך להציג אותה?').selectOption('בשלוש נקודות קצרות');
  await expect(
    page.getByText('הסבר מהי אוטומציה למתחיל ללא רקע טכני, בשלוש נקודות קצרות.', { exact: false }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'הבנתי, לשקופית הבאה' }).click();
  await expect(page.locator('#canvas-step-title')).toBeFocused();
  const numbered = page.getByRole('navigation', { name: 'מעבר לפי מספר שקופית' });
  await expect(numbered.getByRole('button', { name: /^שקופית 2:/ })).toHaveAttribute(
    'aria-current',
    'step',
  );
  await expect(page.locator('#canvas-step-title')).toContainText('קודם בונים');
  await page
    .getByRole('navigation', { name: 'מעבר לפי מספר שקופית' })
    .getByRole('button', { name: /^שקופית 1:/ })
    .click();
  await expect(page.getByRole('heading', { name: 'המשימה', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'ביטול סימון הקריאה', exact: true }).click();
  await expect(numbered.getByRole('button', { name: /^שקופית 1:/ })).not.toHaveClass(/acknowledged/);
  await expect(page.getByRole('button', { name: 'ביטול סימון הקריאה' })).toHaveCount(0);
  await numbered.getByRole('button').last().click();
  await page.getByRole('button', { name: 'הבנתי, סיימתי לקרוא', exact: true }).click();
  await expect(page.getByRole('button', { name: 'סיימתי לקרוא', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'ביטול סימון הקריאה', exact: true }).click();
  await expect(page.getByRole('button', { name: 'הבנתי, סיימתי לקרוא', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'הבנתי, סיימתי לקרוא', exact: true }).click();
  const after = await (await page.request.get('/api/export')).json();
  expect(after.lessonProgress).toEqual(before.lessonProgress);
  await page.getByRole('button', { name: 'קריאה רציפה' }).click();
  await expect(page.getByRole('heading', { name: 'הוכחת הבנה', exact: true })).toBeVisible();
});
test('map nodes expose published workbooks and week selection', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({
    path: 'docs/screenshots/arcade-dashboard.png',
    fullPage: true,
    animations: 'disabled',
  });
  await page.getByRole('button', { name: /יום 2: Python/ }).click();
  await expect(page.locator('.map-selected')).toContainText('Python לבוני סוכנים');
  await page.getByLabel('בחירת שבוע במפה').selectOption('2');
  await expect(page.getByRole('button', { name: /יום 6:/ })).toBeVisible();
  await page.getByRole('link', { name: 'מעבר לשיעור', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'איך אפליקציות LLM פועלות', exact: true }),
  ).toBeVisible();
});
test('arcade UI fits mobile and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.screenshot({
    path: 'docs/screenshots/arcade-mobile.png',
    fullPage: true,
    animations: 'disabled',
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.getByRole('progressbar', { name: 'השלמת תרגילי הקורס' })).toBeVisible();
  expect(
    await page.locator('.mascot-rig').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  await page.goto('/learn/W01D01_FIRST_AI_PROGRAM');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'הבא', exact: true }).click();
  await expect(page.locator('#canvas-step-title')).toContainText('קודם בונים');
});
