import { test, expect } from './fixtures';
test('journal and failure records save, edit, export and capture unexecuted test cases', async ({
  page,
}) => {
  await page.goto('/journal');
  await page.getByLabel('כותרת', { exact: true }).fill('בחירת כלי לתרגיל');
  for (const field of await page.locator('.reflection-form textarea').all())
    await field.fill('תיעוד בדיקה: ניסיתי כלי אחד, בדקתי את הפלט ותיעדתי את המגבלות.');
  await page.getByRole('button', { name: 'שמירת הרשומה' }).click();
  await expect(page.getByText('הרשומה נשמרה בחשבון שלך.')).toBeVisible();
  await page.getByText('בחירת כלי לתרגיל', { exact: true }).click();
  await page.getByRole('link', { name: 'עריכת הרשומה', exact: true }).click();
  await expect(page).toHaveURL(/\/journal\?edit=/);
  await expect(page.locator('.reflection-form [role="status"]')).toHaveText('');
  await page
    .getByRole('textbox', { name: 'מה למדתי?', exact: true })
    .fill('למדתי לזהות שהקלט חסר ולבקש הבהרה לפני הפעלת כלי.');
  await page.getByRole('button', { name: 'שמירת הרשומה' }).click();
  await expect(page.getByText('הרשומה נשמרה בחשבון שלך.')).toBeVisible();
  await expect
    .poll(
      async () => (await (await page.request.get('/api/export')).json()).journalEntries[0].revision,
    )
    .toBe(2);
  await page.goto('/failures');
  await page.getByLabel('כותרת', { exact: true }).fill('קלט חסר בתרגיל');
  for (const field of await page.locator('.reflection-form textarea').all())
    await field.fill('מקרה בדיקה סינתטי: חסר מזהה לקוח. צריך לעצור ולבקש מידע לפני פעולה.');
  await page.getByRole('button', { name: 'שמירת הרשומה' }).click();
  await expect(page.getByText('הרשומה נשמרה בחשבון שלך.')).toBeVisible();
  await page.getByText('קלט חסר בתרגיל', { exact: true }).click();
  await page.getByLabel('הקלט או התנאים לבדיקה').fill('פנייה ללא מזהה לקוח, מתוך נתוני הבדיקה.');
  await page.getByLabel('התוצאה המצופה').fill('עצירה ללא שינוי נתונים ובקשה להשלמת המזהה.');
  await page.getByRole('button', { name: 'שמירת מקרה בדיקה' }).click();
  await expect(
    page.getByText('מקרה הבדיקה נשמר. הוא לא הורץ, ולכן עדיין אין תוצאה שמראה אם הבדיקה עברה.'),
  ).toBeVisible();
  const data = await (await page.request.get('/api/export')).json();
  expect(data.journalEntries).toHaveLength(1);
  expect(data.journalEntries[0].revision).toBe(2);
  expect(data.failureEntries).toHaveLength(1);
  expect(data.failureTestCases).toHaveLength(1);
  await page.reload();
  await page.getByText('קלט חסר בתרגיל', { exact: true }).click();
  await expect(page.getByText('מבוסס על גרסה 1 של תיעוד התקלה · טרם הורץ')).toBeVisible();
});
test('unconfigured Mentor performs no fake generation and unverified non-operator cannot read registrations', async ({
  page,
}) => {
  await page.goto('/');
  const before = await (await page.request.get('/api/export')).json();
  await page.getByRole('button', { name: /AI Mentor/ }).click();
  await expect(page.getByRole('button', { name: 'שליחה למנטור' })).toBeDisabled();
  await expect(page.getByText('חיבור ה־AI עדיין לא פעיל.', { exact: false })).toBeVisible();
  await page.getByLabel('דרך ההסבר').selectOption('eli5');
  await expect(page.getByLabel('דרך ההסבר')).toHaveValue('eli5');
  await page.keyboard.press('Escape');
  const response = await page.request.post('/api/mentor', {
    headers: { Origin: 'http://127.0.0.1:3100' },
    data: { message: 'test' },
  });
  expect(response.status()).toBe(503);
  const hostile = await page.request.post('/api/mentor', {
    headers: { Origin: 'https://hostile.example' },
    data: { message: 'test' },
  });
  expect(hostile.status()).toBe(403);
  const orchestrate = await page.request.post('/api/agents/orchestrate', {
    headers: { Origin: 'http://127.0.0.1:3100' },
    data: { message: 'fixture only' },
  });
  expect(orchestrate.status()).toBe(503);
  const evaluate = await page.request.post('/api/agents/evaluate', {
    headers: { Origin: 'http://127.0.0.1:3100' },
    data: { message: 'fixture only' },
  });
  expect(evaluate.status()).toBe(503);
  const forbiddenVault = await page.request.post('/api/vault/sync', {
    headers: { Origin: 'http://127.0.0.1:3100' },
    data: {},
  });
  expect(forbiddenVault.status()).toBe(404);
  const after = await (await page.request.get('/api/export')).json();
  expect(after.mentorMessages).toEqual(before.mentorMessages);
  expect(after.agentSteps).toEqual(before.agentSteps);
  expect(after.agentEvaluations).toEqual(before.agentEvaluations);
  expect((await page.goto('/admin'))?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'העמוד לא נמצא' })).toBeVisible();
});
