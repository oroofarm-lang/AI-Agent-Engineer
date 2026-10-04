import { test, expect } from './fixtures';

test('internal links preserve hidden unsaved work; downloads stay available and saved work stops blocking', async ({
  page,
}) => {
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור', exact: true }).click();
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה', exact: true }).click();
  await expect(page.getByText('הבנייה הושלמה ונשמרה')).toBeVisible();
  const question = page.locator('.assessment-question:not([hidden])');
  const nav = page.getByRole('navigation', { name: 'מעבר בין שאלות ההערכה' });
  await question.getByText('לעבוד בתבנית בתוך השיעור', { exact: true }).click();
  const first = page.locator('[data-template-workspace]').first();
  await first
    .getByRole('textbox', { name: 'הסבר, תוצאות ומה למדתי' })
    .fill('טיוטת בדיקה ראשונה שנשמרת בחשבון ניסוי בלבד.');
  await expect(first.getByText('הטיוטה שמורה בחשבון שלך.', { exact: true })).toBeVisible();

  await nav.getByRole('button', { name: /^שאלה 2( |$)/ }).click();
  await question.getByText('לעבוד בתבנית בתוך השיעור', { exact: true }).click();
  const second = question.locator('[data-template-workspace]');
  const secondId = await second.getAttribute('data-template-workspace');
  await page.route('**/api/templates/drafts', async (route) => {
    if (route.request().method() === 'POST') await route.abort('failed');
    else await route.continue();
  });
  const local = 'טיוטת בדיקה שנייה: שינויים שנשארים מקומיים בזמן כשל רשת.';
  await second.getByRole('textbox', { name: 'הסבר, תוצאות ומה למדתי' }).fill(local);
  await expect(second.getByText('לא התקבל אישור לשמירת השינויים.', { exact: false })).toBeVisible();
  const prompts: string[] = [];
  let permitLeave = false;
  page.on('dialog', async (dialog) => {
    prompts.push(dialog.message());
    if (permitLeave) await dialog.accept();
    else await dialog.dismiss();
  });
  const download = page.waitForEvent('download');
  await second.getByRole('button', { name: 'הורדת JSON', exact: true }).click();
  expect((await download).suggestedFilename()).toBe(`${secondId}.json`);
  expect(prompts).toHaveLength(0);

  await nav.getByRole('button', { name: /^שאלה 1( |$)/ }).click();
  const leave = page
    .getByRole('navigation', { name: 'ניווט ראשי' })
    .getByRole('link', { name: 'יומן הלמידה', exact: true });
  await leave.click();
  await expect.poll(() => prompts.length).toBe(1);
  await expect(page).toHaveURL(/\/learn\/FND_01/);
  expect(prompts[0]).toContain('לעבור בכל זאת?');
  await nav.getByRole('button', { name: /^שאלה 2( |$)/ }).click();
  await expect(second.getByRole('textbox', { name: 'הסבר, תוצאות ומה למדתי' })).toHaveValue(local);
  const before = await (await page.request.get('/api/export')).json();
  expect(
    before.templateDrafts.some((draft: { template_id: string }) => draft.template_id === secondId),
  ).toBe(false);

  await page.unroute('**/api/templates/drafts');
  await second.getByRole('button', { name: 'ניסיון שמירה נוסף', exact: true }).click();
  await expect(second.getByText('הטיוטה שמורה בחשבון שלך.', { exact: true })).toBeVisible();
  const after = await (await page.request.get('/api/export')).json();
  expect(
    JSON.parse(
      after.templateDrafts.find((draft: { template_id: string }) => draft.template_id === secondId)
        .document,
    ).notes,
  ).toBe(local);
  await leave.click();
  await expect(page).toHaveURL(/\/journal$/);
  expect(prompts).toHaveLength(1);

  await page.goto('/learn/FND_01?module=CORE');
  await question.getByText('לעבוד בתבנית בתוך השיעור', { exact: true }).click();
  await page.route('**/api/templates/drafts', async (route) => {
    if (route.request().method() === 'POST') await route.abort('failed');
    else await route.continue();
  });
  await first
    .getByRole('textbox', { name: 'הסבר, תוצאות ומה למדתי' })
    .fill('שינוי מקומי לצורך בדיקת אישור עזיבה בלבד.');
  await expect(first.getByText('לא התקבל אישור לשמירת השינויים.', { exact: false })).toBeVisible();
  permitLeave = true;
  await leave.click();
  await expect(page).toHaveURL(/\/journal$/);
  expect(prompts).toHaveLength(2);
  await page
    .getByRole('navigation', { name: 'ניווט ראשי' })
    .getByRole('link', { name: 'פרקי הקורס', exact: true })
    .click();
  await expect(page).toHaveURL(/\/topics$/);
  expect(prompts).toHaveLength(2);
});
