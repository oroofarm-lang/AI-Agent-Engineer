import AxeBuilder from '@axe-core/playwright';
import { randomUUID } from 'node:crypto';
import { test, expect } from './fixtures';

test('saved templates submit as frozen owned artifacts and portfolio, including a lost confirmation retry', async ({
  page,
  browser,
}) => {
  test.setTimeout(90000);
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה' }).click();
  await expect(page.getByText('הבנייה הושלמה ונשמרה')).toBeVisible();
  const quiz = page.locator('#assessment');
  const nav = quiz.getByRole('navigation', { name: 'מעבר בין שאלות ההערכה' });
  const question = quiz.locator('.assessment-question:not([hidden])');
  const count = await quiz.locator('.assessment-question').count();
  const snapshots = new Map<
    string,
    { definitionHash: string; revision: number; document: unknown }
  >();
  const manual =
    'תשובה ידנית סינתטית שנשמרת בנפרד: בדיקת פעולה ותוצאה צפויה בלבד, ללא טענה להרצת קוד או להטמעה בעסק אמיתי. '.repeat(
      2,
    );
  for (let i = 0; i < count; i++) {
    await nav.getByRole('button', { name: new RegExp(`^שאלה ${i + 1}( |$)`) }).click();
    const manualField = question.locator('textarea[name^="evidence:"]');
    await manualField.fill(manual);
    const mode = question.getByRole('checkbox', { name: `להגיש את סעיף ${i + 1} מתוך התבנית` });
    await mode.check();
    await expect(manualField).toBeHidden();
    // Switching modes preserves the manual answer without copying or overwriting it.
    await mode.uncheck();
    await expect(manualField).toHaveValue(manual);
    await mode.check();
    const workspace = question.locator('[data-template-workspace]');
    const cells = workspace.locator('table textarea[aria-label^="שורה "]');
    for (let j = 0; j < (await cells.count()); j++)
      await cells.nth(j).fill(`נתון סינתטי ${j + 1}: קלט, פעולה ותוצאה לבדיקה`);
    await workspace
      .getByRole('textbox', { name: 'הסבר, תוצאות ומה למדתי' })
      .fill(
        `סעיף ${i + 1}: זו עבודה סינתטית לבדיקת שמירה והגשה בלבד. אין כאן מידע של לקוח או טענה לשימוש במערכת אמיתית. תיעדתי קלט, פלט צפוי, מגבלות והדרך שבה אפשר לבדוק את התוצאה.`,
      );
    await expect(workspace.getByText('הטיוטה שמורה בחשבון שלך.', { exact: true })).toBeVisible();
    await expect(question.getByText('המילוי הושלם. איכות התשובה תיבדק לאחר ההגשה.')).toBeVisible();
    const id = (await workspace.getAttribute('data-template-workspace'))!;
    const response = await page.request.get(`/api/templates/drafts?templateId=${id}`);
    expect(response.ok()).toBe(true);
    snapshots.set(id, (await response.json()).draft);
    if (i === 0) {
      const downloaded = page.waitForEvent('download');
      await workspace.getByRole('button', { name: 'הורדת PDF', exact: true }).click();
      const pdfDownload = await downloaded;
      expect(pdfDownload.suggestedFilename()).toBe(`${id}.pdf`);
      await pdfDownload.saveAs('test-results/template-export.pdf');
      const { readFile } = await import('node:fs/promises');
      const bytes = await readFile('test-results/template-export.pdf');
      expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
      expect(bytes.length).toBeGreaterThan(5000);
    }
  }
  await expect(quiz.getByText(`תשובות מוכנות להגשה: ${count}`, { exact: true })).toBeVisible();
  await nav.getByRole('button', { name: /^שאלה 1( |$)/ }).click();
  await question.locator('.artifact-picker input[type=file]').setInputFiles([
    {
      name: 'synthetic.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Synthetic external evidence only.\n'),
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      name: `extra-${i}.txt`,
      mimeType: 'text/plain',
      buffer: Buffer.from('Synthetic temporary fixture'),
    })),
  ]);
  await quiz.getByRole('button', { name: 'הגש מתוך הטמפלייט', exact: true }).click();
  await expect(
    quiz.getByText('אפשר לצרף עד 6 קבצים בסך הכול, כולל התבניות שנבחרו.', { exact: false }),
  ).toBeVisible();
  expect((await (await page.request.get('/api/export')).json()).assessmentResults).toEqual([]);
  for (let i = 0; i < 5; i++)
    await quiz.getByRole('button', { name: `הסרת extra-${i}.txt` }).click();
  await quiz.getByText('להציג את העבודה בתיק העבודות שלי', { exact: true }).click();
  await quiz.getByLabel('לכלול את ההגשה בתיק העבודות הפרטי שלי').check();
  await quiz.getByLabel('שם העבודה', { exact: true }).fill('תבניות שמורות · בדיקת מערכת');
  const before = await (await page.request.get('/api/export')).json();
  expect(before.assessmentResults).toEqual([]);
  expect(before.assessmentArtifacts).toEqual([]);
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await quiz.screenshot({ path: 'test-results/template-submission.png' });

  let lost = false;
  await page.route(
    (url) => url.pathname === '/learn/FND_01',
    async (route) => {
      if (
        route.request().method() === 'POST' &&
        route.request().headers()['next-action'] &&
        !lost
      ) {
        lost = true;
        const committed = await route.fetch();
        expect(committed.ok()).toBe(true);
        await route.abort('failed');
      } else await route.continue();
    },
  );
  const submissionId = await quiz.locator('input[name="submissionId"]').inputValue();
  await quiz.getByRole('button', { name: 'הגש מתוך הטמפלייט', exact: true }).click();
  await expect(
    quiz.getByText('לא התקבל אישור להגשה. התשובות עדיין כאן;', { exact: false }),
  ).toBeVisible();
  expect(lost).toBe(true);
  await expect(quiz.getByLabel('לכלול את ההגשה בתיק העבודות הפרטי שלי')).toBeChecked();
  await expect(quiz.getByLabel('שם העבודה', { exact: true })).toHaveValue(
    'תבניות שמורות · בדיקת מערכת',
  );
  const committed = await (await page.request.get('/api/export')).json();
  expect(committed.assessmentResults).toHaveLength(1);
  expect(committed.assessmentArtifacts).toHaveLength(count + 1);
  // An unrelated Server Action refresh must not replace the retry identity.
  await page
    .getByLabel('ההערות שלי לשיעור')
    .fill('הערה סינתטית לבדיקת רענון לאחר אובדן אישור הגשה.');
  await page.getByRole('button', { name: 'שמירת הערות', exact: true }).click();
  await expect(page.getByText('ההערות נשמרו בחשבון שלך.', { exact: true })).toBeVisible();
  await expect(quiz.locator('input[name="submissionId"]')).toHaveValue(submissionId);
  await quiz.getByRole('button', { name: 'הגש מתוך הטמפלייט', exact: true }).click();
  await expect(quiz.getByText('העבודה נשמרה וממתינה להערכה.', { exact: false })).toBeVisible();
  const saved = await (await page.request.get('/api/export')).json();
  expect(saved.assessmentResults).toHaveLength(1);
  expect(saved.assessmentResults[0].id).toBe(committed.assessmentResults[0].id);
  expect(saved.assessmentResults[0].status).toBe('PENDING_REVIEW');
  expect(saved.assessmentArtifacts).toEqual(committed.assessmentArtifacts);
  expect(saved.skillMastery).toEqual(before.skillMastery);
  expect(saved.portfolioEntries[0].included).toBe(1);
  for (const file of saved.assessmentArtifacts) {
    const response = await page.request.get(`/api/artifacts/${file.id}`);
    expect(response.ok()).toBe(true);
    if (file.name === 'synthetic.txt') {
      expect(await response.text()).toBe('Synthetic external evidence only.\n');
      continue;
    }
    const frozen = await response.json();
    const draft = snapshots.get(frozen.definition.id)!;
    expect(draft).toBeDefined();
    expect(frozen.document).toEqual(draft.document);
    expect(frozen.definitionHash).toBe(draft.definitionHash);
    expect(frozen.revision).toBe(draft.revision);
    expect(frozen.curriculumVersion).toBe(saved.curriculumVersion);
  }
  const other = await browser.newContext();
  try {
    const signup = await other.request.post('http://127.0.0.1:3100/api/auth/sign-up/email', {
      headers: { Origin: 'http://127.0.0.1:3100', 'x-real-ip': '10.244.123.9' },
      data: {
        email: `${randomUUID()}@example.test`,
        password: 'Test-only-passphrase-987',
        name: 'Other synthetic learner',
      },
    });
    expect(signup.ok()).toBe(true);
    for (const file of saved.assessmentArtifacts)
      expect(
        (await other.request.get(`http://127.0.0.1:3100/api/artifacts/${file.id}`)).status(),
      ).toBe(404);
  } finally {
    await other.close();
  }
  await page.goto('/portfolio');
  await expect(page.locator('.portfolio-card')).toContainText('תבניות שמורות · בדיקת מערכת');
  await expect(page.getByRole('link', { name: /^template-.* · הורדה$/ })).toHaveCount(count);
});
