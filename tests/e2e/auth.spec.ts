import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import { randomUUID, randomInt } from 'node:crypto';
const origin = 'http://127.0.0.1:3100';
const password = 'A long private passphrase 918';
test('signup, build, resume after login, tenant isolation and account deletion', async ({
  page,
  browser,
}) => {
  await page.context().setExtraHTTPHeaders({
    'x-real-ip': `10.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`,
  });
  const email = `${randomUUID()}@example.test`;
  await page.goto('/');
  await expect(page).toHaveURL(/\/auth/);
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.screenshot({
    path: 'docs/screenshots/auth-login.png',
    fullPage: true,
    animations: 'disabled',
  });
  expect((await page.request.get('/api/export')).status()).toBe(401);
  await page.getByRole('button', { name: 'יצירת חשבון חדש', exact: true }).click();
  await page.getByLabel('שם לתצוגה', { exact: true }).fill('Learner One');
  await page.getByLabel('דוא״ל', { exact: true }).fill(email);
  await page.getByLabel('סיסמה', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'הרשמה', exact: true }).click();
  await expect(page).toHaveURL(origin + '/');
  await page.goto('/learn/W01D01_FIRST_AI_PROGRAM');
  await page.getByRole('button', { name: 'התחלת השיעור', exact: true }).click();
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה', exact: true }).click();
  await expect(page.locator('.xp-badge')).toContainText('00100');
  await page.getByLabel('ההערות ההנדסיות שלך').fill('Only learner one can read this note');
  await page.getByRole('button', { name: 'שמירת הערות' }).click();
  await expect(page.getByText('ההערות נשמרו בחשבון שלך.')).toBeVisible();
  await page.getByRole('button', { name: 'הבא', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'מיקום הקריאה נשמר.' })).toBeVisible();
  const saved = await (await page.request.get('/api/export')).json();
  expect(saved.lessonPositions[0].stepId).toBe('section-1-0');
  const second = await browser.newContext({
    baseURL: origin,
    extraHTTPHeaders: {
      'x-real-ip': `10.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`,
    },
  });
  const signup = await second.request.post('/api/auth/sign-up/email', {
    headers: { Origin: origin },
    data: { name: 'Other Learner', email: `${randomUUID()}@example.test`, password },
  });
  expect(signup.ok()).toBe(true);
  const otherData = await (await second.request.get('/api/export')).json();
  expect(otherData.lessonProgress).toEqual([]);
  expect(otherData.lessonNotes).toEqual([]);
  expect(otherData.lessonPositions).toEqual([]);
  expect(otherData.user.id).not.toBe(saved.user.id);
  // A client-supplied userId cannot redirect a write to someone else's account.
  const forgery = await second.request.post('/api/position', {
    headers: { Origin: origin },
    data: { lessonId: 'W01D01_FIRST_AI_PROGRAM', stepId: 'section-0-0', userId: saved.user.id },
  });
  expect(forgery.ok()).toBe(true);
  expect((await (await page.request.get('/api/export')).json()).lessonPositions[0].stepId).toBe(
    'section-1-0',
  );
  const foreign = await page.request.post('/api/auth/sign-out', {
    headers: { Origin: 'https://hostile.example' },
    data: {},
  });
  expect(foreign.status()).toBe(403);
  await page.goto('/settings');
  const oldState = await page.context().storageState();
  await page.getByRole('button', { name: 'התנתקות', exact: true }).click();
  await expect(page).toHaveURL(/\/auth/);
  const stale = await browser.newContext({ baseURL: origin, storageState: oldState });
  expect((await stale.request.get('/api/export')).status()).toBe(401);
  await stale.close();
  await page.getByLabel('דוא״ל', { exact: true }).fill(email);
  await page.getByLabel('סיסמה', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'כניסה לחשבון' }).click();
  await expect(page).toHaveURL(origin + '/');
  await page.goto('/learn/W01D01_FIRST_AI_PROGRAM');
  await expect(page.locator('#canvas-step-title')).toContainText('קודם בונים');
  await expect(page.locator('.xp-badge')).toContainText('00100');
  await page.getByRole('link').filter({ hasText: 'היום הבא' }).click();
  await expect(
    page.getByRole('heading', { name: 'Python לבוני סוכנים · חלק א׳', exact: true }),
  ).toBeVisible();
  await page.goto('/settings');
  await page.getByText('מחיקת החשבון והנתונים', { exact: true }).click();
  await page.getByLabel('סיסמה לאישור המחיקה').fill(password);
  await page.getByLabel('אני מבין שהמחיקה קבועה').check();
  await page.getByRole('button', { name: 'מחיקה לצמיתות' }).click();
  await expect(page).toHaveURL(/\/auth/);
  expect((await page.request.get('/api/export')).status()).toBe(401);
  expect((await second.request.get('/api/export')).ok()).toBe(true);
  await second.close();
});
test('authentication rejects wrong passwords and rate limits repeated attempts', async ({
  request,
}) => {
  const headers = {
    Origin: origin,
    'x-real-ip': `10.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`,
  };
  let limited = false;
  for (let i = 0; i < 12; i++) {
    const response = await request.post('/api/auth/sign-in/email', {
      headers,
      data: { email: 'nonexistent@example.test', password },
    });
    expect([401, 429]).toContain(response.status());
    if (response.status() === 429) {
      limited = true;
      break;
    }
  }
  expect(limited).toBe(true);
});
