import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

test('Mentor template consent sends only a saved revision reference and resets on reopen', async ({
  page,
}) => {
  // Only AI network responses are fixtures. Draft ownership and autosave use the real isolated server.
  const requests: Record<string, unknown>[] = [];
  await page.route('**/api/mentor*', (route) =>
    route.fulfill({
      json: { configuration: { ready: true }, messages: [], steps: [], knowledge: null },
    }),
  );
  await page.route('**/api/agents/orchestrate', async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({ json: { messages: [], steps: [] } });
  });
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  const question = page.locator('.assessment-question:not([hidden])');
  await question.getByText('לעבוד בתבנית בתוך השיעור', { exact: true }).click();
  const workspace = question.locator('[data-template-workspace]');
  await workspace
    .getByRole('textbox', { name: 'הסבר, תוצאות ומה למדתי' })
    .fill('PRIVATE_DRAFT_FIXTURE: תוכן סינתטי לבדיקת הסכמה בלבד');
  await expect(workspace).toHaveAttribute('data-template-saved', 'true');
  const revision = Number(await workspace.getAttribute('data-template-revision'));
  await page.getByRole('button', { name: 'AI Mentor', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'המנטור שלך' });
  const consent = dialog.getByRole('checkbox', { name: /לצרף את הטיוטה השמורה/ });
  await expect(consent).not.toBeChecked();
  await dialog.getByLabel('מה ניסית, ובמה נתקעת?').fill('איך מתחילים עם התרגיל?');
  await dialog.getByRole('button', { name: 'שליחה למנטור', exact: true }).click();
  await expect.poll(() => requests.length).toBe(1);
  expect(requests[0].selectedTemplate).toBeNull();
  await expect(
    dialog.getByText('התשובה נשמרה. זו תשובת AI; בדוק אותה לפני שימוש.', { exact: true }),
  ).toBeVisible();
  await consent.check();
  await dialog.getByLabel('מה ניסית, ובמה נתקעת?').fill('איך לשפר את מבנה התשובה?');
  await dialog.getByRole('button', { name: 'שליחה למנטור', exact: true }).click();
  await expect.poll(() => requests.length).toBe(2);
  expect(requests[1].selectedTemplate).toEqual({
    templateId: await workspace.getAttribute('data-template-workspace'),
    definitionHash: await workspace.getAttribute('data-template-definition-hash'),
    revision,
  });
  expect(JSON.stringify(requests)).not.toContain('PRIVATE_DRAFT_FIXTURE');
  await expect(
    dialog.getByText('התשובה נשמרה. זו תשובת AI; בדוק אותה לפני שימוש.', { exact: true }),
  ).toBeVisible();
  await dialog.getByRole('button', { name: 'סגירת חלונית המנטור' }).click();
  await page.getByRole('button', { name: 'AI Mentor', exact: true }).click();
  await expect(consent).not.toBeChecked();
});

test('lesson explanation shortcuts select the actual card and never send automatically', async ({
  page,
}) => {
  const requests: Record<string, unknown>[] = [];
  await page.route('**/api/mentor*', (route) =>
    route.fulfill({
      json: { configuration: { ready: true }, messages: [], steps: [], knowledge: null },
    }),
  );
  await page.route('**/api/agents/orchestrate', async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({ json: { messages: [], steps: [] } });
  });
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  const card = page.locator('.focus-card');
  await card.getByText('רוצה עזרה עם ההסבר?', { exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'המנטור שלך' });
  for (const [label, level] of [
    ['הסבר פשוט', 'eli5'],
    ['צעדים מעשיים', 'practical'],
    ['העמקה', 'advanced'],
  ]) {
    const count = requests.length;
    await card.getByRole('button', { name: label, exact: true }).click();
    await expect(dialog.getByLabel('דרך ההסבר')).toHaveValue(level);
    expect(requests).toHaveLength(count);
    await dialog.getByLabel('מה ניסית, ובמה נתקעת?').fill('אפשר להסביר את החלק הזה?');
    await dialog.getByRole('button', { name: 'שליחה למנטור', exact: true }).click();
    await expect.poll(() => requests.length).toBe(count + 1);
    expect(requests[count].explanationLevel).toBe(level);
    expect(requests[count].mode).toBe('explain');
    expect(requests[count].activeTask).toEqual({
      kind: 'lesson',
      id: await card.getAttribute('data-mentor-id'),
    });
    expect(requests[count].selectedTemplate).toBeNull();
    await dialog.getByRole('button', { name: 'סגירת חלונית המנטור' }).click();
  }
  await page.getByRole('button', { name: 'שקופית 2:', exact: false }).click();
  await card.getByText('רוצה עזרה עם ההסבר?', { exact: true }).click();
  await card.getByRole('button', { name: 'העמקה', exact: true }).click();
  await dialog.getByLabel('מה ניסית, ובמה נתקעת?').fill('אפשר להעמיק כאן?');
  await dialog.getByRole('button', { name: 'שליחה למנטור', exact: true }).click();
  await expect.poll(() => requests.length).toBe(4);
  expect(requests[3].activeTask).toEqual({
    kind: 'lesson',
    id: await card.getAttribute('data-mentor-id'),
  });
});

test('lesson explanation choices fit enlarged mobile text and open by keyboard', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/api/mentor*', (route) =>
    route.fulfill({
      json: { configuration: { ready: false }, messages: [], steps: [], knowledge: null },
    }),
  );
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  await page.getByRole('button', { name: 'פתיחת אפשרויות נגישות' }).click();
  await page.getByLabel('גודל טקסט').selectOption('200');
  await page.keyboard.press('Escape');
  const helper = page.locator('.focus-card .lesson-mentor-help');
  await helper.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(helper).toHaveAttribute('open', '');
  expect(await helper.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .include('.lesson-mentor-help')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press('Tab');
  await expect(helper.getByRole('button', { name: 'הסבר פשוט', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'המנטור שלך' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel('דרך ההסבר')).toHaveValue('eli5');
  await page.keyboard.press('Escape');
  await expect(helper.getByRole('button', { name: 'הסבר פשוט', exact: true })).toBeFocused();
});
