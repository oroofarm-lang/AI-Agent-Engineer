import AxeBuilder from '@axe-core/playwright';
import { randomUUID } from 'node:crypto';
import { test, expect } from './fixtures';

test('assessment wizard saves real files, previews private portfolio and isolates downloads', async ({
  page,
  browser,
}) => {
  await page.goto('/learn/FND_01?module=CORE');
  await page.getByRole('button', { name: 'התחלת השיעור' }).click();
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה' }).click();
  await expect(page.getByText('הבנייה הושלמה ונשמרה')).toBeVisible();
  const quiz = page.locator('#assessment');
  await quiz.getByText('לפני שמגישים · שאלה קצרה לתרגול').click();
  await quiz.getByRole('radio', { name: 'לצרף תוצאה והסבר ולהגיש אותם לבדיקה' }).check();
  await expect(quiz.getByText('נכון.', { exact: false })).toBeVisible();
  const fields = quiz.locator('.evidence-field textarea');
  const nav = quiz.getByRole('navigation', { name: 'מעבר בין שאלות ההערכה' });
  for (let i = 0; i < (await fields.count()); i++) {
    await nav.getByRole('button', { name: new RegExp(`^שאלה ${i + 1}( |$)`) }).click();
    await fields
      .nth(i)
      .fill(
        'בדיקת מערכת בלבד: כתבתי דוגמה עם קלט ופלט, הצגתי את הבחירות שלי ואת המידע החסר, השוויתי למקור ותיעדתי מה צריך לבדוק כדי לקבל תוצאה נכונה.',
      );
  }
  await nav.getByRole('button', { name: /^שאלה 1( |$)/ }).click();
  const fileInput = quiz.locator('.assessment-question:not([hidden]) input[type=file]');
  await fileInput.setInputFiles({
    name: 'old.py',
    mimeType: 'text/plain',
    buffer: Buffer.from('print("old")\n'),
  });
  await quiz.getByRole('button', { name: 'החלפת old.py' }).click();
  await fileInput.setInputFiles({
    name: 'answer.py',
    mimeType: 'text/plain',
    buffer: Buffer.from('print("saved evidence")\n'),
  });
  await expect(quiz.getByText('print("saved evidence")', { exact: false })).toBeVisible();
  await expect(quiz.getByText('old.py', { exact: true })).toHaveCount(0);
  await fileInput.setInputFiles({
    name: 'remove.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Remove before submission'),
  });
  await quiz.getByRole('button', { name: 'הסרת remove.txt' }).click();
  const png = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=',
    'base64',
  );
  const transfer = await page.evaluateHandle(
    (bytes) => {
      const data = new DataTransfer();
      data.items.add(new File([new Uint8Array(bytes)], 'screenshot.png', { type: 'image/png' }));
      return data;
    },
    [...png],
  );
  await quiz
    .locator('.assessment-question:not([hidden]) .artifact-dropzone')
    .dispatchEvent('drop', { dataTransfer: transfer });
  await expect(quiz.getByRole('img', { name: 'תצוגה מקדימה של screenshot.png' })).toBeVisible();
  expect((await (await page.request.get('/api/export')).json()).assessmentArtifacts).toEqual([]);
  await quiz.getByText('להציג את העבודה בתיק העבודות שלי', { exact: true }).click();
  await quiz.getByLabel('לכלול את ההגשה בתיק העבודות הפרטי שלי').check();
  await quiz.getByLabel('שם העבודה', { exact: true }).fill('מפת החלטות לעסק');
  await quiz
    .getByLabel('מה בניתי ומה למדתי?', { exact: true })
    .fill('השוויתי בין אוטומציה רגילה לבין קריאה למודל ושמרתי את הבדיקות.');
  await expect(quiz.locator('.portfolio-card')).toContainText('מפת החלטות לעסק');
  await quiz.screenshot({ path: 'test-results/refinement-assessment.png' });
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await quiz.getByRole('button', { name: 'הגשת ראיות להערכה' }).click();
  await expect(quiz.getByText('העבודה נשמרה וממתינה להערכה.', { exact: false })).toBeVisible();
  const saved = await (await page.request.get('/api/export')).json();
  expect(saved.assessmentArtifacts).toHaveLength(2);
  expect(saved.assessmentResults).toHaveLength(1);
  expect(saved.portfolioEntries[0].included).toBe(1);
  const file = saved.assessmentArtifacts.find(
    (item: { name: string }) => item.name === 'answer.py',
  );
  const download = await page.request.get(`/api/artifacts/${file.id}`);
  expect(download.ok()).toBe(true);
  expect(await download.text()).toBe('print("saved evidence")\n');
  expect(download.headers()['content-disposition']).toContain('attachment');
  const other = await browser.newContext();
  try {
    const signup = await other.request.post('http://127.0.0.1:3100/api/auth/sign-up/email', {
      headers: { Origin: 'http://127.0.0.1:3100', 'x-real-ip': '10.244.123.7' },
      data: {
        email: `${randomUUID()}@example.test`,
        password: 'Test-only-passphrase-987',
        name: 'Other test learner',
      },
    });
    expect(signup.ok()).toBe(true);
    expect(
      (await other.request.get(`http://127.0.0.1:3100/api/artifacts/${file.id}`)).status(),
    ).toBe(404);
    expect(
      (await (await other.request.get('http://127.0.0.1:3100/api/export')).json()).portfolioEntries,
    ).toEqual([]);
  } finally {
    await other.close();
  }
  await page.goto('/portfolio');
  await expect(page.locator('.portfolio-card')).toContainText('מפת החלטות לעסק');
  await expect(page.locator('.portfolio-card')).toContainText('ממתינה להערכה');
  await page.getByRole('button', { name: 'הסרה מתיק העבודות' }).click();
  await expect(page.locator('.portfolio-card')).toHaveCount(0);
  await page.getByText('הגשות ששמרת מחוץ לתיק (1)').click();
  await page.getByRole('button', { name: 'הוספה לתיק העבודות' }).click();
  await expect(page.locator('.portfolio-card')).toContainText('מפת החלטות לעסק');
  await page.reload();
  await expect(page.getByRole('link', { name: 'answer.py · הורדה' })).toBeVisible();
});

test('map details, foundation emphasis, Byte interaction and one accessibility trigger fit large text', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'פתיחת אפשרויות נגישות' });
    await expect(toggle).toHaveCount(1);
    await toggle.click();
    await page.getByLabel('גודל טקסט').selectOption('200');
    await page.keyboard.press('Escape');
    await expect(page.getByText('מתחילים כאן · שבוע 1', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /יום 2: Python/ }).click();
    await expect(page.locator('.map-selected')).toContainText('Python לבוני סוכנים · חלק א׳');
    await expect(
      page.locator('.map-selected').getByRole('link', { name: 'מעבר לשיעור' }),
    ).toHaveAttribute('href', '/learn/W01D02_PYTHON_FOR_AGENT_BUILDERS_I');
    const overflow = await page.evaluate(() =>
      [...document.querySelectorAll('body *')]
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1);
        })
        .map((el) => ({
          tag: el.tagName,
          className: el.className,
          width: el.getBoundingClientRect().width,
        })),
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      JSON.stringify(overflow),
    ).toBe(true);
    const map = await page.locator('.lesson-map').boundingBox(),
      selected = await page.locator('.map-selected').boundingBox();
    expect(selected!.y + selected!.height).toBeLessThanOrEqual(map!.y + map!.height);
    await page.getByRole('button', { name: 'הצגת הודעה מ־Byte' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.mascot-speech')).toContainText('היי, אני Byte!');
    expect(
      await page.locator('.mascot-speech').evaluate((el) => getComputedStyle(el).animationName),
    ).toBe('none');
    await page.getByRole('button', { name: 'סגירת הודעת Byte' }).click();
    await page.getByRole('button', { name: 'תגיד לי שלום' }).click();
    await expect(page.locator('.mascot-speech')).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await page
      .locator('.lesson-map')
      .screenshot({ path: `test-results/refinement-map-${width}.png` });
    if (width === 1440) {
      await page.getByRole('button', { name: 'פתיחת אפשרויות נגישות' }).click();
      await page.getByLabel('גודל טקסט').selectOption('100');
      await page.keyboard.press('Escape');
      await page
        .locator('.mascot-stage:not(.compact)')
        .screenshot({ path: 'test-results/refinement-byte.png' });
    }
  }
});

test('Mentor receives the active assessment task without reading typed answers', async ({
  page,
}) => {
  await page.goto('/learn/FND_01?module=CORE');
  await page
    .getByRole('navigation', { name: 'מעבר בין שאלות ההערכה' })
    .getByRole('button', { name: /^שאלה 2( |$)/ })
    .click();
  const question = await page.locator('.assessment-question:not([hidden]) h3').innerText();
  await page.getByRole('button', { name: 'AI Mentor', exact: true }).click();
  await expect(page.getByRole('dialog').getByText(`עזרה בשאלה: ${question}`)).toBeVisible();
  await expect(
    page.getByRole('dialog').getByRole('button', { name: 'שליחה למנטור' }),
  ).toBeDisabled();
});
