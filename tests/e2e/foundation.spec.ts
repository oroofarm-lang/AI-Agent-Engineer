import { test, expect } from './fixtures';
test('dashboard → lesson → build → notes → export persists without an API key', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'פחות לצפות. יותר לבנות.' })).toBeVisible();
  await page.goto('/learn/W01D01_FIRST_AI_PROGRAM');
  await expect(page.getByRole('heading', { name: 'תוכנית ה־AI הראשונה שלך' })).toBeVisible();
  expect((await (await page.request.get('/api/export')).json()).lessonProgress).toHaveLength(0);
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה' }).click();
  await expect(page.getByText('הבנייה הושלמה ונשמרה')).toBeVisible();
  await page.getByLabel('ההערות שלי לשיעור').fill('בדיקת E2E: תיקנתי משתנה סביבה חסר.');
  await page.getByRole('button', { name: 'שמירת הערות' }).click();
  await expect(page.getByText('ההערות נשמרו בחשבון שלך.')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('ההערות שלי לשיעור')).toHaveValue(
    'בדיקת E2E: תיקנתי משתנה סביבה חסר.',
  );
  const exported = await page.request.get('/api/export');
  expect(exported.ok()).toBe(true);
  const data = await exported.json();
  expect(data.lessonProgress[0].state).toBe('BUILD_COMPLETE');
  expect(data.lessonNotes[0].body).toContain('E2E');
  await page.locator('.evidence-field textarea').evaluateAll((elements) => {
    if (elements.length !== 4) throw new Error('Expected four rubric criteria');
  });
  const fields = page.locator('.evidence-field textarea');
  for (let i = 0; i < (await fields.count()); i++) {
    await fields
      .nth(i)
      .fill(
        'ראיות E2E: בניתי תוכנית בתיקייה חדשה, הרצתי אותה, מצאתי משתנה חסר ותיקנתי אותו. תיעדתי את הפקודות ואת הפלט ללא סודות.',
      );
  }
  const retainedEvidence = await fields.nth(1).inputValue();
  await fields.nth(0).fill(' '.repeat(90));
  await page.getByRole('button', { name: 'הגשת ראיות להערכה' }).click();
  await expect(
    page.getByText('ההגשה לא נשמרה. כתוב בין 80 ל־12,000 תווים בכל סעיף ונסה שוב.'),
  ).toBeVisible();
  await expect(fields.nth(1)).toHaveValue(retainedEvidence);
  await fields.nth(0).fill(retainedEvidence);
  await page.getByRole('button', { name: 'הגשת ראיות להערכה' }).click();
  await expect(
    page.getByText('העבודה נשמרה וממתינה להערכה. ההגשה אינה מריצה קוד ואינה מוכיחה שליטה בנושא.'),
  ).toBeVisible();
  await page.getByRole('link', { name: 'לעבודות שהגשתי ולמשוב ←' }).click();
  await page.locator('.attempt summary').click();
  await expect(page.locator('.attempt-body')).toContainText('ראיות E2E');
  const after = await (await page.request.get('/api/export')).json();
  expect(after.lessonProgress[0].state).toBe('MASTERY_PENDING');
  expect(after.assessmentResults).toHaveLength(1);
});
test('original lessons now contain usable workbooks and evidence controls', async ({ page }) => {
  await page.goto('/learn');
  await expect(page.getByRole('heading', { name: 'בונים יכולת, יום אחרי יום.' })).toBeVisible();
  await page.getByText('הצגת שיעורי ההנדסה לפי שבועות', { exact: true }).click();
  await page.getByRole('link').filter({ hasText: 'Python לבוני סוכנים · חלק א׳' }).click();
  await expect(
    page.getByRole('heading', { name: 'Python לבוני סוכנים · חלק א׳', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'התחלת השיעור' })).toBeVisible();
  await expect(page.getByText('מה נבדק ביחידה הזו?', { exact: true })).toHaveCount(0);
  await expect(page.getByText('נתוני מעבדה לתרגול', { exact: true })).toHaveCount(0);
});
test('mentor clearly reports unavailable, dialog closes with Escape and mobile has no overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /AI Mentor/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText('חיבור ה־AI עדיין לא פעיל.', { exact: false })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.goto('/learn/W01D01_FIRST_AI_PROGRAM');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
test('unknown lesson renders a recoverable not-found page', async ({ page }) => {
  await page.goto('/learn/UNKNOWN');
  await expect(page.getByRole('heading', { name: 'העמוד לא נמצא' })).toBeVisible();
});

test('skills can be filtered, expanded and traversed by prerequisite', async ({ page }) => {
  await page.goto('/skills');
  await page.getByLabel('חיפוש מיומנות').fill('Agent Loop');
  await page.getByRole('button', { name: 'סינון', exact: true }).click();
  await expect(page.locator('.skill-card')).toHaveCount(1);
  await page.locator('.skill-card summary').click();
  await page.getByRole('link', { name: 'Tool Calling', exact: true }).click();
  await expect(page).toHaveURL(/\/skills#TOOL_CALLING$/);
  await page.locator('#TOOL_CALLING summary').click();
  await expect(page.locator('#TOOL_CALLING')).toContainText('JSON/Schemas');
});
