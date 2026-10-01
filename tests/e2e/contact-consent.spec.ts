import { test, expect } from './fixtures';
test('optional email opt-in persists, can be withdrawn, exports only own history, and disappears with account deletion', async ({
  page,
}) => {
  await page.goto('/settings');
  const checkbox = page.getByRole('checkbox', { name: 'אני מסכים לקבל עדכונים על הקורס במייל.' });
  await expect(checkbox).not.toBeChecked();
  await expect(page.locator('#connections')).toHaveCount(0);
  expect((await page.request.get('/api/admin/contacts')).status()).toBe(404);
  await checkbox.check();
  await page.getByRole('button', { name: 'שמירת הבחירה' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'הבחירה נשמרה.' })).toBeVisible();
  await page.reload();
  await expect(checkbox).toBeChecked();
  let exported = await (await page.request.get('/api/export')).json();
  expect(exported.contactConsentEvents).toHaveLength(1);
  expect(exported.contactConsentEvents[0].enabled).toBe(1);
  await checkbox.uncheck();
  await page.getByRole('button', { name: 'שמירת הבחירה' }).click();
  await expect(
    page.getByText('הבחירה נשמרה. אינך רשום לקבלת עדכונים על הקורס במייל.', { exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(checkbox).not.toBeChecked();
  exported = await (await page.request.get('/api/export')).json();
  expect(exported.contactConsentEvents).toHaveLength(2);
  expect(exported.contactConsentEvents[1].enabled).toBe(0);
  const removed = await page.request.post('/api/auth/delete-user', {
    headers: { Origin: 'http://127.0.0.1:3100' },
    data: { password: 'Test-only-passphrase-987' },
  });
  expect(removed.ok()).toBe(true);
  expect((await page.request.get('/api/export')).status()).toBe(401);
});
