import AxeBuilder from '@axe-core/playwright';
import { randomInt } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test, expect } from './fixtures';

const origin = 'http://127.0.0.1:3100';
test.use({ actionTimeout: 15000 });
const lessonId = 'W01D01_FIRST_AI_PROGRAM';
const marker = 'נוסח לבדיקת פרסום מבודדת בדפדפן בלבד.';
function ownedRecords(value: Record<string, unknown>) {
  const {
    exportedAt: _time,
    curriculumVersion: _version,
    curriculumVersions: _versions,
    ...owned
  } = value;
  void _time;
  void _version;
  void _versions;
  return owned;
}

test('verified reviewer compares, approves, publishes and rolls back without changing learner records', async ({
  page,
  browser,
}, testInfo) => {
  test.setTimeout(120000);
  const vault = testInfo.config.metadata.testVault;
  // Only the fresh server fixture path supplied by this run's configuration may be inspected.
  expect(typeof vault === 'string' && /^\.data\/e2e-[a-f0-9-]{36}-vault$/.test(vault)).toBe(true);
  const vaultRoot = path.resolve(vault as string);
  await fs.mkdir(path.join(vaultRoot, 'מחברת'), { recursive: true });
  const personalFixture = path.join(vaultRoot, 'מחברת', 'qa-only-note.md');
  await fs.writeFile(personalFixture, 'Synthetic private note, never part of the public graph.');
  expect((await page.request.get('/api/auditor')).status()).toBe(404);
  expect(
    (await page.request.post('/api/auditor', { headers: { Origin: origin }, data: {} })).status(),
  ).toBe(404);
  expect((await page.goto('/admin/curriculum'))?.status()).toBe(404);
  expect((await page.request.get('/api/vault/sync')).status()).toBe(404);
  expect(
    (
      await page.request.post('/api/vault/sync', { headers: { Origin: origin }, data: {} })
    ).status(),
  ).toBe(404);
  await page.goto(`/learn/${lessonId}`);
  await page.getByRole('button', { name: 'התחלת השיעור', exact: true }).click();
  await page.getByRole('button', { name: 'סימון הבנייה כהושלמה', exact: true }).click();
  await expect(page.locator('.xp-badge')).toContainText('00100');
  await page
    .getByLabel('ההערות שלי לשיעור')
    .fill('הערה של לומד מדומה שנשמרת גם כשנוסח הקורס משתנה.');
  await page.getByRole('button', { name: 'שמירת הערות' }).click();
  await expect(page.getByText('ההערות נשמרו בחשבון שלך.')).toBeVisible();
  await page.getByRole('button', { name: 'הבא', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'מיקום הקריאה נשמר.' })).toBeVisible();
  const before = await (await page.request.get('/api/export')).json();

  const manager = await browser.newContext({
    baseURL: origin,
    extraHTTPHeaders: {
      'x-real-ip': `10.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`,
    },
  });
  let proposal: { id: string; hash: string } | undefined;
  let applied = false;
  try {
    expect((await manager.request.get('/api/auditor')).status()).toBe(401);
    expect((await manager.request.get('/api/vault/sync')).status()).toBe(401);
    const login = await manager.request.post('/api/auth/sign-in/email', {
      headers: { Origin: origin },
      data: {
        email: 'qa-manager@example.test',
        password: 'Qa-only-auditor-842-passphrase',
      },
    });
    expect(login.ok()).toBe(true);
    expect((await manager.request.get('/api/vault/sync?path=not-accepted')).status()).toBe(400);
    expect(
      (
        await manager.request.post('/api/vault/sync', {
          headers: { Origin: origin, 'Content-Type': 'application/json' },
          data: '{',
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await manager.request.post('/api/vault/sync', {
          headers: { Origin: origin, 'Content-Type': 'text/plain' },
          data: 'not JSON',
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await manager.request.post('/api/vault/sync', {
          headers: { Origin: origin, 'Content-Type': 'application/json' },
          data: ' '.repeat(1001),
        })
      ).status(),
    ).toBe(413);
    expect(
      (
        await manager.request.post('/api/vault/sync', {
          headers: { Origin: 'https://hostile.example' },
          data: {},
        })
      ).status(),
    ).toBe(403);
    expect(
      (
        await manager.request.post('/api/vault/sync', {
          headers: { Origin: origin },
          data: { path: 'not-accepted' },
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await manager.request.post('/api/auditor', {
          headers: { Origin: 'https://hostile.example' },
          data: {},
        })
      ).status(),
    ).toBe(403);
    const initial = await (await manager.request.get('/api/auditor')).json();
    const section = await (
      await manager.request.get(`/api/auditor?lessonId=${lessonId}&section=Engineering%20Notes`)
    ).json();
    const sourceId = initial.context.lessons.find(
      (lesson: { id: string }) => lesson.id === lessonId,
    ).sourceIds[0];
    const sourceTitle = initial.context.sources.find(
      (source: { id: string }) => source.id === sourceId,
    ).title;
    const review = await manager.newPage();
    await review.goto('/admin/curriculum');
    await expect(review.getByRole('heading', { name: 'בדיקת עדכונים לקורס' })).toBeVisible();
    await review.getByText('הכנת הצעה חדשה', { exact: true }).click();
    await review.getByLabel('השיעור לעריכה', { exact: true }).selectOption(lessonId);
    await review
      .getByLabel('כותרת ההצעה', { exact: true })
      .fill('הצעה מדומה לבדיקת פרסום וחזרה לגרסה קודמת');
    await review
      .getByLabel('מה המידע החדש?', { exact: true })
      .fill('זהו תוכן מדומה לבדיקת המנגנון בלבד, ללא טענה טכנית חדשה או אישור לפרסום בקורס אמיתי.');
    await review
      .getByLabel('למה השינוי נחוץ?', { exact: true })
      .fill('לבדוק שפרסום תוכן בגרסה חדשה אינו משנה את ההתקדמות, הנקודות וההערות של לומד.');
    await review.getByRole('checkbox', { name: sourceTitle, exact: true }).check();
    await review
      .getByLabel(`כיצד המקור תומך בשינוי המוצע? · ${sourceTitle}`, { exact: true })
      .fill(
        'זו בדיקת הפניה למקור קיים בלבד; הבדיקה אינה מאמתת טענה טכנית או קריאה אמיתית של המקור.',
      );
    await review
      .getByLabel('הנוסח המלא המוצע לקטע', { exact: true })
      .fill(`${section.beforeText}\n\n${marker}`);
    await review.getByRole('button', { name: 'לשמור הצעה לבדיקה', exact: true }).click();
    await expect(
      review.getByRole('status').filter({ hasText: 'ההצעה נשמרה לבדיקה' }),
    ).toBeVisible();
    await expect(review.locator('.auditor-detail')).toBeVisible();
    await expect(review.getByLabel('הנוסח הקיים להשוואה')).not.toContainText(marker);
    await expect(review.getByLabel('הנוסח המוצע להשוואה')).toContainText(marker);
    await review.screenshot({
      path: '.data/quality/auditor-review-fixture.png',
      fullPage: true,
      animations: 'disabled',
    });
    const saved = await (await manager.request.get('/api/auditor')).json();
    proposal = saved.proposals[0];
    expect(saved.context.version).toBe(initial.context.version);
    expect(
      (
        await manager.request.post('/api/auditor', {
          headers: { Origin: origin },
          data: {
            operation: 'apply',
            id: proposal!.id,
            proposalHash: proposal!.hash,
          },
        })
      ).status(),
    ).toBe(400);
    expect(ownedRecords(await (await page.request.get('/api/export')).json())).toEqual(
      ownedRecords(before),
    );

    for (const width of [390, 768, 1440]) {
      await review.setViewportSize({ width, height: 900 });
      await review.getByRole('button', { name: 'פתיחת אפשרויות נגישות' }).click();
      await review.getByLabel('גודל טקסט').selectOption('200');
      await review.keyboard.press('Escape');
      expect(
        await review.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${width}: reviewer at 200% text`,
      ).toBe(true);
      const result = await new AxeBuilder({ page: review })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        result.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
        })),
      ).toEqual([]);
    }
    await review.getByRole('button', { name: 'פתיחת אפשרויות נגישות' }).click();
    await review.getByRole('button', { name: 'איפוס העדפות' }).click();
    await review.keyboard.press('Escape');
    await review.getByLabel('החלטה', { exact: true }).selectOption('approve');
    await review
      .getByLabel('הסבר להחלטה', { exact: true })
      .fill(
        'אישור מדומה בסביבת בדיקות מבודדת בלבד; אין כאן אישור אנושי לתוכן בקורס המשמש לומדים אמיתיים.',
      );
    await review
      .getByRole('checkbox', {
        name: 'קראתי את המקורות הראשוניים ובדקתי שהם תומכים בטענות המוצעות.',
      })
      .check();
    await review
      .getByRole('checkbox', {
        name: 'קראתי את הנוסח המוצע ובדקתי את השפעתו על השיעור ועל הלמידה.',
      })
      .check();
    await review
      .getByLabel('השפעת השינוי על היסודות', { exact: false })
      .fill(
        'זהו שינוי מדומה בהערות בלבד שנועד לבדוק את הדרישה לנימוק מפורש בעת שינוי יסודות. אין כאן אימות טכני חדש או שינוי במושגי היסוד.',
      );
    await review.getByRole('button', { name: 'לשמור החלטה', exact: true }).click();
    await expect(
      review.getByRole('button', { name: 'לפרסם את העדכון המאושר', exact: true }),
    ).toBeVisible();
    const publicationResponse = review.waitForResponse(
      (response) =>
        response.url().endsWith('/api/auditor') &&
        response.request().method() === 'POST' &&
        response.request().postDataJSON()?.operation === 'apply',
    );
    await review.getByRole('button', { name: 'לפרסם את העדכון המאושר', exact: true }).click();
    expect((await (await publicationResponse).json()).vaultSync.status).toBe('SYNCED');
    await expect(
      review.getByRole('status').filter({ hasText: 'הגרסה החדשה פורסמה' }),
    ).toBeVisible();
    await expect(
      review.getByRole('status').filter({ hasText: 'גרסת הייצוא השמור תואמת' }),
    ).toBeVisible();
    applied = true;
    await expect(
      review.getByRole('button', { name: 'לחזור לגרסה הקודמת', exact: true }),
    ).toBeVisible();
    await page.reload();
    await page.getByRole('button', { name: 'קריאה רציפה', exact: true }).click();
    await expect(page.locator('.canvas-reading')).toContainText(marker);
    const published = await (await page.request.get('/api/export')).json();
    expect(published.curriculumVersion).not.toBe(before.curriculumVersion);
    expect(ownedRecords(published)).toEqual(ownedRecords(before));
    const exportedLesson = path.join(
      vaultRoot,
      '02_CURRICULUM',
      published.curriculumVersion,
      'lessons',
      `${lessonId}.md`,
    );
    expect(await fs.readFile(exportedLesson, 'utf8')).toContain(marker);
    const indexFile = path.join(vaultRoot, 'Index.md'),
      savedIndex = await fs.readFile(indexFile, 'utf8');
    const manualEdit = `${savedIndex}\nManual synthetic edit which export must preserve.\n`;
    await fs.writeFile(indexFile, manualEdit);
    const rollbackResponse = review.waitForResponse(
      (response) =>
        response.url().endsWith('/api/auditor') &&
        response.request().method() === 'POST' &&
        response.request().postDataJSON()?.operation === 'rollback',
    );
    await review.getByRole('button', { name: 'לחזור לגרסה הקודמת', exact: true }).click();
    const rollbackResult = await (await rollbackResponse).json();
    expect(rollbackResult).toMatchObject({
      state: 'ROLLED_BACK',
      vaultSync: { status: 'FAILED', error: 'VAULT_EDITED_NOTE' },
    });
    await expect(
      review.getByRole('status').filter({ hasText: 'הקורס חזר לגרסה הקודמת' }),
    ).toBeVisible();
    await expect(
      review.getByRole('status').filter({ hasText: 'מפת הידע טרם עודכנה' }),
    ).toBeVisible();
    applied = false;
    await page.reload();
    await page.getByRole('button', { name: 'קריאה רציפה', exact: true }).click();
    await expect(page.locator('.canvas-reading')).not.toContainText(marker);
    const rolledBack = await (await page.request.get('/api/export')).json();
    expect(rolledBack.curriculumVersion).toBe(before.curriculumVersion);
    expect(ownedRecords(rolledBack)).toEqual(ownedRecords(before));
    expect(await fs.readFile(indexFile, 'utf8')).toBe(manualEdit);
    expect(await (await manager.request.get('/api/vault/sync')).json()).toMatchObject({
      state: 'PENDING',
      activeVersion: before.curriculumVersion,
      exportedVersion: published.curriculumVersion,
    });
    await review.getByRole('button', { name: 'לעדכן את מפות Volt', exact: true }).click();
    await expect(
      review.getByRole('alert').filter({ hasText: 'העדכון נעצר כדי לא למחוק עריכה ידנית' }),
    ).toBeVisible();
    expect(await fs.readFile(indexFile, 'utf8')).toBe(manualEdit);
    // Restore only the known synthetic fixture, never a real edited note.
    await fs.writeFile(indexFile, savedIndex);
    const retryResponse = review.waitForResponse(
      (response) =>
        response.url().endsWith('/api/vault/sync') && response.request().method() === 'POST',
      { timeout: 60000 },
    );
    await review.getByRole('button', { name: 'לעדכן את מפות Volt', exact: true }).click();
    expect((await retryResponse).ok()).toBe(true);
    await expect(
      review.getByRole('status').filter({ hasText: 'גרסת הייצוא השמור תואמת' }),
    ).toBeVisible();
    const manifest = JSON.parse(
      await fs.readFile(path.join(vaultRoot, '.course-export.json'), 'utf8'),
    );
    expect(manifest.version).toBe(before.curriculumVersion);
    expect(manifest.curriculumHash).toMatch(/^[a-f0-9]{64}$/);
    expect(Object.keys(manifest.files).some((name) => name.startsWith('מחברת/'))).toBe(false);
    expect(await fs.readFile(personalFixture, 'utf8')).toBe(
      'Synthetic private note, never part of the public graph.',
    );
    expect(await fs.readFile(exportedLesson, 'utf8')).toContain(marker);
    expect(ownedRecords(await (await page.request.get('/api/export')).json())).toEqual(
      ownedRecords(before),
    );
  } finally {
    if (applied && proposal) {
      const rollback = await manager.request.post('/api/auditor', {
        headers: { Origin: origin },
        data: {
          operation: 'rollback',
          id: proposal.id,
          proposalHash: proposal.hash,
        },
      });
      expect(rollback.ok()).toBe(true);
    }
    await manager.close();
  }
});
