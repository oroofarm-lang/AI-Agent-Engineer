import { test, expect } from './fixtures';

test('topic → new stable-ID lesson → resume → build → export is persistent and honest', async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.goto('/');
  await expect(page.locator('.hero')).toContainText('חובה');
  await page.goto('/learn/MKT_01?module=MARKETING');
  await expect(
    page.getByRole('heading', { name: 'מתחילים בפרק הבסיס', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'התחלת השיעור' })).toHaveCount(0);
  await page.goto('/topics/CORE');
  const paths = await page
    .locator('.lesson-row')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')!));
  expect(paths).toHaveLength(24);
  for (const path of paths) {
    await page.goto(path);
    await page.getByRole('button', { name: 'התחלת השיעור' }).click();
    await page.getByRole('button', { name: 'סימון הבנייה כהושלמה' }).click();
    await expect(page.getByText('הבנייה הושלמה ונשמרה')).toBeVisible();
  }
  await page.goto('/topics');
  await expect(page.locator('.topic-card')).toHaveCount(14);
  await page.getByRole('link', { name: 'תוכן ושיווק עם AI', exact: true }).click();
  await page.getByRole('link').filter({ hasText: 'בריף מותג וקהל' }).click();
  await expect(page).toHaveURL(/MKT_01\?module=MARKETING$/);
  await expect(page.getByRole('heading', { name: 'בריף מותג וקהל', exact: true })).toBeVisible();
  await expect(page.getByText('מה נבדק ביחידה הזו?', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  await expect(page.getByRole('button', { name: 'סימון הבנייה כהושלמה' })).toBeVisible();
  await page.getByRole('button', { name: 'הבא', exact: true }).click();
  await expect(page.getByText('מיקום הקריאה נשמר.', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.locator('#canvas-step-title')).toContainText('קודם בונים');
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה' }).click();
  await expect(page.getByText('הבנייה הושלמה ונשמרה')).toBeVisible();
  await page.getByLabel('ההערות שלי לשיעור').fill('הפרדתי עובדות מהנחות בבריף המותג.');
  await page.getByRole('button', { name: 'שמירת הערות' }).click();
  await expect(page.getByText('ההערות נשמרו בחשבון שלך.')).toBeVisible();
  const fixture = await (await page.request.get('/course-data/v1/business.json')).json();
  expect(fixture.synthetic).toBe(true);
  expect(fixture.products[0].id).toBe('P1');
  const exported = await (await page.request.get('/api/export')).json();
  expect(
    exported.lessonProgress.find((p: { lessonId: string }) => p.lessonId === 'MKT_01').state,
  ).toBe('BUILD_COMPLETE');
  expect(
    exported.lessonPositions.find((p: { lessonId: string }) => p.lessonId === 'MKT_01').stepId,
  ).toBe('section-1-0');
  expect(
    exported.lessonNotes.find((p: { lessonId: string }) => p.lessonId === 'MKT_01').body,
  ).toContain('בריף');
  const fields = page.locator('.evidence-field textarea');
  expect(await fields.count()).toBe(3);
  for (const field of await fields.all()) {
    await field.fill(
      'ראיית בדיקה: יצרתי בריף עם מקורות לטענות, זיהיתי הבטחה שאינה קיימת בנתוני העסק ותיקנתי אותה. השוויתי את התוצר למקור והצגתי מגבלה ברורה.',
    );
  }
  await page.getByRole('button', { name: 'הגשת ראיות להערכה' }).click();
  await expect(
    page.getByText('העבודה נשמרה וממתינה להערכה. ההגשה אינה מריצה קוד ואינה מוכיחה שליטה בנושא.'),
  ).toBeVisible();
  const afterEvidence = await (await page.request.get('/api/export')).json();
  expect(afterEvidence.assessmentResults[0].lessonId).toBe('MKT_01');
  expect(
    afterEvidence.lessonProgress.find(
      (record: { lessonId: string }) => record.lessonId === 'MKT_01',
    ).state,
  ).toBe('MASTERY_PENDING');
  await page.getByRole('link').filter({ hasText: 'היחידה הבאה בפרק' }).click();
  await expect(page).toHaveURL(/MKT_02\?module=MARKETING$/);
  await page.goto('/topics/MARKETING');
  await expect(page.locator('.lesson-row').first()).toContainText('ממתין להערכת שליטה');
});
