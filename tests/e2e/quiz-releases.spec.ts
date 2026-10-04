import AxeBuilder from '@axe-core/playwright';
import { randomUUID, randomInt } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test, expect } from './fixtures';

const origin = 'http://127.0.0.1:3100';
test.use({ actionTimeout: 15000 });
test('operator reviews exact questions, publishes only complete approval, and preserves owned answers through rollback', async ({
  page,
  browser,
}, testInfo) => {
  test.setTimeout(240000);
  const reviewRoot = testInfo.config.metadata.testQuizzes;
  expect(
    typeof reviewRoot === 'string' && /^\.data\/e2e-[a-f0-9-]{36}-quizzes$/.test(reviewRoot),
  ).toBe(true);
  expect((await page.request.get('/api/quizzes/review')).status()).toBe(404);
  expect((await page.goto('/admin/quizzes'))?.status()).toBe(404);
  await page.goto('/learn/FND_01');
  const learnerQuiz = page.locator('.reinforcement-quiz');
  await learnerQuiz.locator('summary').click();
  await learnerQuiz.getByRole('radio', { name: 'לצרף תוצאה והסבר ולהגיש אותם לבדיקה' }).check();
  await expect(learnerQuiz.getByRole('status')).toContainText('התשובה נשמרה בחשבון שלך.');
  const before = await (await page.request.get('/api/export')).json();
  const manager = await browser.newContext({
    baseURL: origin,
    extraHTTPHeaders: {
      'x-real-ip': `10.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`,
    },
  });
  let activeHash: string | undefined;
  try {
    expect((await manager.request.get('/api/quizzes/review')).status()).toBe(401);
    expect(
      (
        await manager.request.post('/api/auth/sign-in/email', {
          headers: { Origin: origin },
          data: { email: 'qa-manager@example.test', password: 'Qa-only-auditor-842-passphrase' },
        })
      ).ok(),
    ).toBe(true);
    expect(
      (
        await manager.request.post('/api/quizzes/review', {
          headers: { Origin: 'https://untrusted.example' },
          data: {},
        })
      ).status(),
    ).toBe(403);
    expect((await manager.request.get('/api/quizzes/review?path=forbidden')).status()).toBe(400);
    expect(
      (
        await manager.request.post('/api/quizzes/review', {
          headers: { Origin: origin },
          data: { operation: 'propose', root: 'forbidden' },
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await manager.request.post('/api/quizzes/review', {
          headers: { Origin: origin, 'Content-Type': 'application/json' },
          data: ' '.repeat(16001),
        })
      ).status(),
    ).toBe(413);
    const review = await manager.newPage();
    await review.goto('/admin/quizzes');
    await expect(review.getByRole('heading', { name: 'בדיקת שאלות לתרגול' })).toBeVisible();
    await review.getByRole('button', { name: 'להכין בדיקה חדשה', exact: true }).click();
    await expect(review.getByRole('status').filter({ hasText: 'הבדיקה נשמרה.' })).toBeVisible();
    const overview = await (await manager.request.get('/api/quizzes/review')).json();
    expect(overview.status.active).toBeNull();
    const id = overview.proposals[0].id;
    const detail = await (await manager.request.get(`/api/quizzes/review?proposalId=${id}`)).json();
    const subjectIndex = detail.proposal.bank.quizzes.findIndex(
      (question: { lessonId: string }) => question.lessonId === 'FND_01',
    );
    const subject = detail.proposal.bank.quizzes[subjectIndex];
    await review.getByLabel('מעבר לשאלה לפי מספר').selectOption(String(subjectIndex));
    await expect(review.getByLabel('הקטע מהשיעור לבדיקת השאלה')).toBeVisible();
    await expect(
      review.getByRole('heading', { name: subject.question, exact: true }),
    ).toBeVisible();
    await expect(
      review.getByRole('button', { name: 'לפרסם את כל השאלות המאושרות' }),
    ).toBeDisabled();
    expect(
      (
        await manager.request.post('/api/quizzes/review', {
          headers: { Origin: origin },
          data: {
            operation: 'publish',
            proposalId: id,
            proposalHash: detail.proposalHash,
            requestId: randomUUID(),
          },
        })
      ).status(),
    ).toBe(400);
    const shared = {
      proposalId: id,
      proposalHash: detail.proposalHash,
      questionId: subject.id,
      questionHash: detail.proposal.contexts[subjectIndex].questionHash,
      decision: 'approve',
      answerChecked: true,
      sourcesChecked: true,
      hebrewChecked: true,
      notes:
        'Synthetic browser workflow approval only; this is not a human teaching approval of real course content.',
    };
    expect(
      (
        await manager.request.post('/api/quizzes/review', {
          headers: { Origin: origin },
          data: { operation: 'decide', input: { ...shared, hebrewChecked: false } },
        })
      ).status(),
    ).toBe(400);
    await review.getByLabel('החלטה', { exact: true }).selectOption('approve');
    await review
      .getByRole('checkbox', { name: 'בדקתי את השאלה, את כל האפשרויות ואת ההסבר לתשובה.' })
      .check();
    await review
      .getByRole('checkbox', { name: 'קראתי את המקורות ובדקתי שהם תומכים בתשובה המסומנת.' })
      .check();
    await review
      .getByRole('checkbox', { name: 'בדקתי שהעברית תקינה ושהניסוח ברור ללומד.' })
      .check();
    await review.getByLabel('הסבר להחלטה').fill(shared.notes);
    await review.getByRole('button', { name: 'לשמור החלטה לשאלה' }).click();
    await expect(review.getByText('השאלה אושרה בבדיקה הזו.', { exact: true })).toBeVisible();
    // Resume a saved review by number and reopen it, including when it is already selected.
    await review.getByRole('button', { name: 'השאלה הבאה', exact: true }).click();
    await expect(review.getByLabel('הקטע מהשיעור לבדיקת השאלה')).toBeVisible();
    await review.getByLabel('מעבר לשאלה לפי מספר').selectOption(String(subjectIndex));
    await expect(review.getByText('השאלה אושרה בבדיקה הזו.', { exact: true })).toBeVisible();
    await review.getByRole('button', { name: 'לפתוח בדיקה', exact: true }).click();
    await expect(review.getByLabel('הקטע מהשיעור לבדיקת השאלה')).toBeVisible();
    await review.getByRole('button', { name: 'לפתוח בדיקה', exact: true }).click();
    await expect(review.getByLabel('הקטע מהשיעור לבדיקת השאלה')).toBeVisible();
    for (const width of [390, 768, 1440]) {
      await review.setViewportSize({ width, height: 900 });
      await review.getByRole('button', { name: 'פתיחת אפשרויות נגישות' }).click();
      await review.getByLabel('גודל טקסט').selectOption('200');
      await review.keyboard.press('Escape');
      const excerpt = review.getByLabel('הקטע מהשיעור לבדיקת השאלה');
      await excerpt.focus();
      await expect(excerpt).toBeFocused();
      if (await excerpt.evaluate((element) => element.scrollHeight > element.clientHeight)) {
        await excerpt.evaluate((element) => {
          element.scrollTop = 0;
        });
        await review.keyboard.press('PageDown');
        await expect
          .poll(() => excerpt.evaluate((element) => element.scrollTop))
          .toBeGreaterThan(0);
      }
      expect(
        await review.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBe(true);
      const audit = await new AxeBuilder({ page: review })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        audit.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        })),
      ).toEqual([]);
    }
    await review.getByRole('button', { name: 'פתיחת אפשרויות נגישות' }).click();
    await review.getByRole('button', { name: 'איפוס העדפות' }).click();
    await review.keyboard.press('Escape');
    await review.screenshot({
      path: '.data/quality/quiz-review-fixture.png',
      fullPage: true,
      animations: 'disabled',
    });
    // Exercise complete publication in this run's fresh ledger. These acknowledgements are test fixtures.
    for (const context of detail.proposal.contexts) {
      if (context.questionId === subject.id) continue;
      const response = await manager.request.post('/api/quizzes/review', {
        headers: { Origin: origin },
        data: {
          operation: 'decide',
          input: { ...shared, questionId: context.questionId, questionHash: context.questionHash },
        },
      });
      expect(response.ok(), context.questionId).toBe(true);
    }
    await review.reload();
    await review.getByRole('button', { name: 'לפתוח בדיקה', exact: true }).click();
    await expect(review.getByRole('button', { name: 'לפרסם את כל השאלות המאושרות' })).toBeEnabled();
    const publication = review.waitForResponse(
      (response) =>
        response.url().endsWith('/api/quizzes/review') &&
        response.request().method() === 'POST' &&
        response.request().postDataJSON()?.operation === 'publish',
    );
    await review.getByRole('button', { name: 'לפרסם את כל השאלות המאושרות' }).click();
    const savedPublication = await (await publication).json();
    activeHash = savedPublication.selection.releaseHash;
    expect(savedPublication.vaultSync.status).toBe('SYNCED');
    await expect(
      review.getByRole('status').filter({ hasText: 'גרסת השאלות המאושרת פורסמה' }),
    ).toBeVisible();
    await page.reload();
    await learnerQuiz.locator('summary').click();
    await expect(learnerQuiz.getByText(subject.question, { exact: true })).toBeVisible();
    const chosen = subject.options.find(
      (option: { id: string }) => option.id === subject.correctOptionId,
    );
    await learnerQuiz.getByRole('radio', { name: chosen.text, exact: true }).check();
    await expect(learnerQuiz.getByRole('status')).toContainText(subject.explanation);
    await page.reload();
    await learnerQuiz.locator('summary').click();
    await expect(learnerQuiz.getByRole('radio', { name: chosen.text, exact: true })).toBeChecked();
    const after = await (await page.request.get('/api/export')).json();
    expect(after.quizAttempts).toHaveLength(2);
    expect(after.quizAttempts[1].question_id).toBe('QUIZ_FND_01');
    expect(after.lessonProgress).toEqual(before.lessonProgress);
    expect(after.skillMastery).toEqual(before.skillMastery);
    expect(after.assessmentResults).toEqual(before.assessmentResults);
    expect(
      (await (await manager.request.get('/api/quizzes?lessonId=FND_01')).json()).latest,
    ).toBeNull();
    const ledger = JSON.parse(await fs.readFile(path.join(reviewRoot, 'active.json'), 'utf8'));
    expect(ledger.selection.releaseHash).toBe(activeHash);
    const rollback = review.waitForResponse(
      (response) =>
        response.url().endsWith('/api/quizzes/review') &&
        response.request().method() === 'POST' &&
        response.request().postDataJSON()?.operation === 'rollback',
    );
    await review.getByRole('button', { name: 'לחזור לגרסת השאלות הקודמת' }).click();
    const rolledBack = await rollback;
    expect(rolledBack.ok()).toBe(true);
    expect((await rolledBack.json()).vaultSync.status).toBe('SYNCED');
    activeHash = undefined;
    await expect(
      review.getByRole('status').filter({ hasText: 'המערכת חזרה לגרסת השאלות הקודמת.' }),
    ).toBeVisible();
    await expect(review.getByLabel('מספר הגרסה לפרסום')).toHaveValue('1.0.1');
    await page.reload();
    await learnerQuiz.locator('summary').click();
    await expect(
      learnerQuiz.getByRole('radio', { name: 'לצרף תוצאה והסבר ולהגיש אותם לבדיקה' }),
    ).toBeChecked();
    const replay = after.quizAttempts[1];
    expect(
      (
        await page.request.post('/api/quizzes', {
          headers: { Origin: origin },
          data: {
            requestId: replay.id,
            lessonId: replay.lesson_id,
            curriculumVersion: replay.curriculum_version,
            questionHash: replay.question_hash,
            optionId: replay.option_id,
          },
        })
      ).ok(),
    ).toBe(true);
    expect((await (await page.request.get('/api/export')).json()).quizAttempts).toEqual(
      after.quizAttempts,
    );
    expect(
      JSON.parse(await fs.readFile(path.join(reviewRoot, 'active.json'), 'utf8')).selection,
    ).toBeNull();
    expect((await fs.stat(path.join(reviewRoot, 'releases/1.0.0.json'))).isFile()).toBe(true);
  } finally {
    if (activeHash)
      expect
        .soft(
          (
            await manager.request.post('/api/quizzes/review', {
              headers: { Origin: origin },
              data: { operation: 'rollback', requestId: randomUUID(), releaseHash: activeHash },
            })
          ).ok(),
          'Synthetic release cleanup must succeed without hiding an earlier failure',
        )
        .toBe(true);
    await manager.close();
  }
});
