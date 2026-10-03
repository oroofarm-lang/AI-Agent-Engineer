import { randomUUID } from 'node:crypto';
import { test, expect } from './fixtures';

test('practice answer survives reload/login, retries a lost confirmation once, and never grants progress or leaks across accounts', async ({
  page,
  browser,
}) => {
  await page.goto('/');
  await expect(page.locator('.hero-description')).not.toContainText('###');
  const before = await (await page.request.get('/api/export')).json();
  expect(before.quizAttempts).toEqual([]);
  await page.goto('/learn/FND_01?module=CORE');
  const quiz = page.locator('.reinforcement-quiz');
  await quiz.locator('summary').click();
  await quiz.getByRole('radio', { name: 'לסמן שהגעתי לשליטה בנושא, בלי לצרף ראיות' }).check();
  await expect(quiz.getByRole('status')).toContainText('נסה שוב.');
  await page.reload();
  await quiz.locator('summary').click();
  await expect(
    quiz.getByRole('radio', { name: 'לסמן שהגעתי לשליטה בנושא, בלי לצרף ראיות' }),
  ).toBeChecked();
  await expect(quiz.getByRole('status')).toContainText('התשובה נשמרה בחשבון שלך.');

  let lost = false;
  const tokens: string[] = [];
  await page.route('**/api/quizzes', async (route) => {
    if (route.request().method() !== 'POST') return route.continue();
    tokens.push(route.request().postDataJSON().requestId);
    const response = await route.fetch();
    if (!lost) {
      lost = true;
      await route.abort('failed');
    } else await route.fulfill({ response });
  });
  await quiz.getByRole('radio', { name: 'לצרף תוצאה והסבר ולהגיש אותם לבדיקה' }).check();
  await expect(quiz.getByRole('alert')).toContainText('לא התקבל אישור');
  await expect(quiz.getByRole('status')).not.toContainText('נכון.');
  await quiz.getByRole('button', { name: 'לנסות לשמור שוב' }).click();
  await expect(quiz.getByRole('status')).toContainText('נכון.');
  expect(tokens).toHaveLength(2);
  expect(tokens[0]).toBe(tokens[1]);
  await page.unroute('**/api/quizzes');
  const after = await (await page.request.get('/api/export')).json();
  expect(after.schemaVersion).toBe(11);
  expect(after.quizAttempts).toHaveLength(2);
  expect(after.quizAttempts[1].option_id).toBe('evidence');
  expect(after.lessonProgress).toEqual(before.lessonProgress);
  expect(after.skillMastery).toEqual(before.skillMastery);
  expect(after.assessmentResults).toEqual(before.assessmentResults);
  const origin = 'http://127.0.0.1:3100';
  expect((await page.request.get('/api/quizzes?lessonId=AUT_01')).status()).toBe(403);
  expect(
    (
      await page.request.post('/api/quizzes', {
        headers: { Origin: 'https://untrusted.example' },
        data: {},
      })
    ).status(),
  ).toBe(403);
  const saved = after.quizAttempts[1],
    payload = {
      requestId: saved.id,
      lessonId: saved.lesson_id,
      curriculumVersion: saved.curriculum_version,
      questionHash: saved.question_hash,
      optionId: 'skip',
    };
  expect(
    (
      await page.request.post('/api/quizzes', { headers: { Origin: origin }, data: payload })
    ).status(),
  ).toBe(409);
  expect(
    (
      await page.request.post('/api/quizzes', {
        headers: { Origin: origin },
        data: { ...payload, requestId: randomUUID(), optionId: 'injected' },
      })
    ).status(),
  ).toBe(400);
  const session = await (await page.request.get('/api/auth/get-session')).json();
  await page.request.post('/api/auth/sign-out', { headers: { Origin: origin }, data: {} });
  expect((await page.request.get('/api/quizzes?lessonId=FND_01')).status()).toBe(401);
  expect(
    (
      await page.request.post('/api/quizzes', { headers: { Origin: origin }, data: payload })
    ).status(),
  ).toBe(401);
  const signed = await page.request.post('/api/auth/sign-in/email', {
    headers: { Origin: origin },
    data: {
      email: session.user.email,
      password: 'Test-only-passphrase-987',
    },
  });
  expect(signed.ok()).toBe(true);
  await page.goto('/learn/FND_01');
  await quiz.locator('summary').click();
  await expect(
    quiz.getByRole('radio', { name: 'לצרף תוצאה והסבר ולהגיש אותם לבדיקה' }),
  ).toBeChecked();
  const other = await browser.newContext();
  try {
    const signup = await other.request.post(`${origin}/api/auth/sign-up/email`, {
      headers: { Origin: origin, 'x-real-ip': '10.243.177.91' },
      data: {
        email: `${randomUUID()}@example.test`,
        password: 'Test-only-passphrase-987',
        name: 'Other quiz fixture',
      },
    });
    expect(signup.ok()).toBe(true);
    expect(
      (await (await other.request.get(`${origin}/api/quizzes?lessonId=FND_01`)).json()).latest,
    ).toBeNull();
    expect((await (await other.request.get(`${origin}/api/export`)).json()).quizAttempts).toEqual(
      [],
    );
  } finally {
    await other.close();
  }
});
