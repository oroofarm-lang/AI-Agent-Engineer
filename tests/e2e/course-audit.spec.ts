import fs from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';
const course = JSON.parse(fs.readFileSync('content/curriculum/curriculum.json', 'utf8')) as {
  lessons: { id: string; title: string; publicationStatus: string }[];
  modules: { id: string; lessonIds: string[] }[];
};
test('mandatory foundation unlocks advanced chapters and every published lesson renders accessible continuous reading', async ({
  page,
}) => {
  test.setTimeout(600000);
  const core = course.modules.find((chapter) => chapter.id === 'CORE')!;
  await page.goto('/learn/MKT_01');
  await expect(page.getByRole('heading', { name: 'מתחילים בפרק היסודות' })).toBeVisible();
  for (const id of core.lessonIds) {
    await page.goto(`/learn/${id}?module=CORE`);
    await page.getByRole('button', { name: 'התחלת השיעור', exact: true }).click();
    await page.getByRole('button', { name: 'סימון הבנייה כהושלמה', exact: true }).click();
    await expect(page.getByText('הבנייה הושלמה ונשמרה', { exact: true })).toBeVisible();
  }
  const exported = await (await page.request.get('/api/export')).json();
  expect(
    exported.lessonProgress.filter((p: { buildCompletedAt: string | null }) => p.buildCompletedAt),
  ).toHaveLength(core.lessonIds.length);
  for (const lesson of course.lessons.filter((unit) => unit.publicationStatus === 'published')) {
    await page.goto(`/learn/${lesson.id}`);
    await expect(
      page.getByRole('heading', { level: 1, name: lesson.title, exact: true }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'קריאה רציפה', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'הוכחת הבנה', exact: true })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      lesson.id,
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect
      .soft(
        audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        lesson.id,
      )
      .toEqual([]);
    expect(await page.locator('.sidebar').innerText()).not.toMatch(/מפת הפיתוח|בהמשך הפיתוח/);
  }
});
