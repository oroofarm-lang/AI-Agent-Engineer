import { test, expect } from './fixtures';

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
