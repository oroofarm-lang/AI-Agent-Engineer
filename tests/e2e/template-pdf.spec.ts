import { readFile } from 'node:fs/promises';
import { test, expect } from './fixtures';

test('PDF exports a wide hundred-row table and formatted Hebrew notes without submitting it', async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה' }).click();
  await expect(page.getByText('הבנייה הושלמה ונשמרה')).toBeVisible();
  await page.getByRole('checkbox', { name: 'להגיש את סעיף 1 מתוך התבנית' }).check();
  const workspace = page.locator('[data-template-workspace]').first();
  const id = await workspace.getAttribute('data-template-workspace');
  const response = await page.request.get(`/api/templates/drafts?templateId=${id}`);
  expect(response.ok()).toBe(true);
  const { draft } = await response.json();
  const document = structuredClone(draft.document);
  while (document.table.columns.length < 12) {
    const n = document.table.columns.length;
    document.table.columns.push({ id: `CUSTOM_${n}`, label: `עמודה נוספת ${n}` });
  }
  document.table.rows = Array.from({ length: 100 }, (_, row) =>
    Array.from({ length: 12 }, (_, col) => `CELL_${row}_${col} ערך לבדיקה`),
  );
  document.table.rows[0][0] = `LONG_START ${'בדיקה Python 42 '.repeat(220)} LONG_END`;
  document.notes =
    '# כותרת בעברית\n\n**מילים מודגשות** לצד API ומספר 123.\n\n- שלב ראשון\n- שלב שני\n\n```python\nprint("hello")\nx = 123\n```\n\n[קישור](https://example.test)\n\n<img src="https://example.test/private">\n\n' +
    'פסקת הסבר לבדיקה בלבד. '.repeat(450) +
    '\n\nNOTES_END';
  expect(document.notes.length).toBeLessThanOrEqual(12000);
  page.once('dialog', (dialog) => dialog.accept());
  await workspace
    .locator('input[type=file]')
    .setInputFiles({
      name: 'synthetic.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(document)),
    });
  await expect(workspace.getByRole('textbox', { name: 'הסבר, תוצאות ומה למדתי' })).toHaveValue(
    document.notes,
  );
  const downloaded = page.waitForEvent('download');
  await workspace.getByRole('button', { name: 'הורדת PDF', exact: true }).click();
  const download = await downloaded;
  await download.saveAs('test-results/template-export-long.pdf');
  expect((await readFile('test-results/template-export-long.pdf')).subarray(0, 5).toString()).toBe(
    '%PDF-',
  );
  const exported = await (await page.request.get('/api/export')).json();
  expect(exported.assessmentResults).toEqual([]);
  expect(exported.portfolioEntries).toEqual([]);
});
