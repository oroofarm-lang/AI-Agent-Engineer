import AxeBuilder from '@axe-core/playwright';
import { randomUUID } from 'node:crypto';
import { test, expect } from './fixtures';

test('lesson table workspace autosaves, resumes, exports and preserves local typing on network failure and conflicts', async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה' }).click();
  await expect(page.getByText('הבנייה הושלמה ונשמרה')).toBeVisible();
  const question = page.locator('.assessment-question:not([hidden])');
  await question.getByText('לעבוד בתבנית בתוך השיעור', { exact: true }).click();
  const workspace = question.locator('[data-template-workspace]');
  const table = workspace.getByRole('table', { name: 'טבלת העבודה שלך' });
  expect(await table.locator('tbody tr').count()).toBe(8);
  expect(await table.getByRole('textbox').count()).toBe(45);
  for (let row = 1; row <= 8; row++) {
    const cells = table.getByRole('textbox', { name: new RegExp(`^שורה ${row},`) });
    for (let column = 0; column < (await cells.count()); column++)
      await cells
        .nth(column)
        .fill(`נתון סינתטי לבדיקה ${row}-${column}: אין כאן מידע עסקי או ביצוע אמיתי`);
  }
  const notes = workspace.getByRole('textbox', { name: 'הסבר, תוצאות ומה למדתי' });
  const written =
    'בדיקת מערכת סינתטית בלבד: תיעדתי צרכים, פתרונות אפשריים ודרך לבדוק את התוצאה; אין בכך טענה שביצעתי הטמעת מערכת בעסק אמיתי.';
  await notes.fill(written);
  await expect(workspace.getByText('הטיוטה שמורה בחשבון שלך.', { exact: true })).toBeVisible();
  const data = await (await page.request.get('/api/export')).json();
  expect(data.templateDrafts).toHaveLength(1);
  const saved = data.templateDrafts[0];
  expect(JSON.parse(saved.document).notes).toBe(written);
  expect(data.assessmentResults).toEqual([]);
  await workspace.getByRole('button', { name: 'הוספת עמודה', exact: true }).click();
  await expect(table.getByRole('textbox', { name: 'שם עמודה 6' })).toBeVisible();
  await table.getByRole('button', { name: 'הסרת עמודה עמודה 6' }).click();
  await table.getByRole('textbox', { name: 'שם עמודה 1' }).fill('');
  await expect(workspace.getByText('הטיוטה לא נשמרת כרגע.', { exact: false })).toBeVisible();
  await notes.fill(written + ' הטקסט נשמר מקומית בזמן ששם העמודה ריק.');
  await table.getByRole('textbox', { name: 'שם עמודה 1' }).fill('צורך עסקי');
  await expect(workspace.getByText('הטיוטה שמורה בחשבון שלך.', { exact: true })).toBeVisible();
  page.once('dialog', (dialog) => dialog.accept());
  await workspace.getByRole('button', { name: 'החלפת התשובה בתוכן התבנית' }).click();
  await expect(question.locator('textarea[name^="evidence:"]')).toHaveValue(/צורך עסקי/);
  const download = page.waitForEvent('download');
  await workspace.getByRole('button', { name: 'הורדת JSON' }).click();
  expect((await download).suggestedFilename()).toBe(`${saved.template_id}.json`);
  await workspace.getByLabel('ייבוא עבודה מ־JSON או CSV').setInputFiles({
    name: 'invalid.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{"wrong": true}'),
  });
  await expect(workspace.getByText('הייבוא נכשל.', { exact: false })).toBeVisible();
  expect(await notes.inputValue()).toContain(written);
  await page.reload();
  await question.getByText('לעבוד בתבנית בתוך השיעור', { exact: true }).click();
  await expect(notes).toHaveValue(written + ' הטקסט נשמר מקומית בזמן ששם העמודה ריק.');

  let loseAcknowledgement = true;
  await page.route('**/api/templates/drafts', async (route) => {
    if (route.request().method() === 'POST' && loseAcknowledgement) {
      loseAcknowledgement = false;
      const writtenResponse = await route.fetch();
      expect(writtenResponse.ok()).toBe(true);
      await route.abort('failed');
    } else await route.continue();
  });
  await notes.fill(written + ' תגובת הרשת אבדה לאחר שמירה בפועל.');
  await expect(
    workspace.getByText('לא התקבל אישור לשמירת השינויים.', { exact: false }),
  ).toBeVisible();
  await notes.fill(written + ' הקלדה נוספת אחרי כשל הרשת.');
  await workspace.getByRole('button', { name: 'ניסיון שמירה נוסף' }).click();
  await expect(workspace.getByText('הטיוטה שמורה בחשבון שלך.', { exact: true })).toBeVisible();
  await page.unroute('**/api/templates/drafts');
  const latest = (
    await (await page.request.get(`/api/templates/drafts?templateId=${saved.template_id}`)).json()
  ).draft;
  const otherTab = { ...latest.document, notes: written + ' גרסה שנשמרה בלשונית אחרת.' };
  const otherSave = await page.request.post('/api/templates/drafts', {
    headers: { Origin: 'http://127.0.0.1:3100' },
    data: {
      requestId: randomUUID(),
      templateId: saved.template_id,
      definitionHash: latest.definitionHash,
      curriculumVersion: '2.2.0',
      expectedRevision: latest.revision,
      document: otherTab,
    },
  });
  expect(otherSave.ok()).toBe(true);
  await notes.fill(written + ' עבודה מקומית שצריך לשמר בזמן התנגשות.');
  await expect(
    workspace.getByText('גרסת הטיוטה או התבנית השתנתה.', { exact: false }),
  ).toBeVisible();
  await expect(notes).toHaveValue(written + ' עבודה מקומית שצריך לשמר בזמן התנגשות.');
  page.once('dialog', (dialog) => dialog.accept());
  await workspace.getByRole('button', { name: 'טעינת הטיוטה השמורה' }).click();
  await expect(notes).toHaveValue(otherTab.notes);
  await expect(workspace.getByText('הטיוטה השמורה נטענה.', { exact: true })).toBeVisible();
  await notes.fill(written + '\n\n```js\nconst value = 12;\n```');
  await expect(workspace.getByText('הטיוטה שמורה בחשבון שלך.', { exact: true })).toBeVisible();
  await workspace.getByText('תצוגה מקדימה של העבודה', { exact: true }).click();
  await expect(workspace.locator('.code-token-keyword').filter({ hasText: 'const' })).toBeVisible();
  const previewTable = workspace.getByRole('region', { name: 'תצוגת הטבלה — אפשר לגלול לרוחב' });
  await expect(previewTable).toBeVisible();
  await previewTable.focus();
  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => previewTable.evaluate((element) => element.scrollLeft)).not.toBe(0);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await workspace.screenshot({ path: 'test-results/template-workspace.png' });
});

test('unbuilt lesson allows saved table editing and opens the native file picker while submission stays locked', async ({
  page,
}) => {
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  const question = page.locator('.assessment-question:not([hidden])');
  await question.getByText('לעבוד בתבנית בתוך השיעור', { exact: true }).click();
  const workspace = question.locator('[data-template-workspace]');
  const cell = workspace.getByRole('textbox', { name: /^שורה 1,/ }).first();
  await cell.fill('בדיקת טבלה לפני השלמת תרגיל הבנייה');
  await expect(workspace.getByText('הטיוטה שמורה בחשבון שלך.', { exact: true })).toBeVisible();
  const chooser = page.waitForEvent('filechooser');
  await question.getByRole('button', { name: 'בחירת קבצים', exact: true }).click();
  await (
    await chooser
  ).setFiles({
    name: 'practice.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Synthetic practice attachment'),
  });
  await expect(question.getByText('practice.txt', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'הגשת ראיות להערכה', exact: true })).toBeDisabled();
  await page.reload();
  await question.getByText('לעבוד בתבנית בתוך השיעור', { exact: true }).click();
  await expect(cell).toHaveValue('בדיקת טבלה לפני השלמת תרגיל הבנייה');
});
