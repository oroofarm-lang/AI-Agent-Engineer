import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';
test('foundational illustration responds to keyboard selection and remains readable at mobile sizes', async ({
  page,
}) => {
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'קריאה רציפה', exact: true }).click();
  const figure = page.getByRole('figure', { name: 'מהודעת לקוח לטיוטה שאפשר לבדוק' });
  await expect(figure).toBeVisible();
  const missing = figure.getByRole('button', { name: '2 בדיקת פרטים חסרים', exact: true });
  await missing.focus();
  await page.keyboard.press('Enter');
  await expect(missing).toHaveAttribute('aria-current', 'step');
  await expect(figure.getByRole('status')).toContainText('לא ידועים המוצר, הכתובת והתאריך המדויק.');
  await figure.getByRole('button', { name: 'השלב הבא בתרשים', exact: true }).click();
  await expect(figure.getByRole('status')).toContainText('מזהה המוצר');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});
