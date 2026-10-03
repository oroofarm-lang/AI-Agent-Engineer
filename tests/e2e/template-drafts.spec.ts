import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import rawCatalog from '../../content/templates/releases/1.0.0.json';

test('owned draft API persists filled tables, protects stale tabs and retries, exports privately and deletes by owner', async ({
  page,
  browser,
}, testInfo) => {
  test.setTimeout(60000);
  const origin = testInfo.project.use.baseURL as string;
  const second = await browser.newContext({ baseURL: origin });
  const anonymous = await browser.newContext({ baseURL: origin });
  const definition = rawCatalog.templates.find(
    (item) => item.lessonId === 'FND_01' && item.kind === 'table',
  )!;
  const templateId = definition.id;
  try {
    const denied = await anonymous.request.get('/api/templates/drafts', { params: { templateId } });
    expect(denied.status()).toBe(401);
    expect(denied.headers()['cache-control']).toBe('no-store');
    const password = 'Isolated-draft-password-3498';
    for (const client of [page.request, second.request]) {
      const signed = await client.post('/api/auth/sign-up/email', {
        headers: { Origin: origin },
        data: { name: 'בדיקת טיוטות', email: `draft-${randomUUID()}@example.test`, password },
      });
      expect(signed.ok()).toBe(true);
    }
    const read = async () => {
      const response = await page.request.get('/api/templates/drafts', { params: { templateId } });
      expect(response.ok()).toBe(true);
      expect(response.headers()['cache-control']).toBe('no-store');
      return (await response.json()).draft;
    };
    const initial = await read();
    expect(initial.revision).toBe(0);
    expect(initial.document.table.rows).toHaveLength(8);
    expect(initial.completion.ready).toBe(false);
    const document = structuredClone(initial.document);
    document.notes =
      'נתוני תרגיל שנכתבו בחשבון בדיקה בלבד. אין כאן טענה להרצת מודל, קוד או שירות חיצוני.';
    document.table.rows = document.table.rows.map((row: string[], i: number) =>
      row.map((_, j) => `ערך בדיקה לשורה ${i + 1}, עמודה ${j + 1}`),
    );
    const input = {
      requestId: randomUUID(),
      templateId,
      definitionHash: initial.definitionHash,
      curriculumVersion: initial.curriculumVersion,
      expectedRevision: 0,
      document,
    };
    const headers = { Origin: origin };
    expect((await page.request.post('/api/templates/drafts', { data: input })).status()).toBe(403);
    expect(
      (
        await page.request.post('/api/templates/drafts', {
          headers: { Origin: 'https://hostile.example' },
          data: input,
        })
      ).status(),
    ).toBe(403);
    expect(
      (
        await page.request.post('/api/templates/drafts', {
          headers,
          data: { ...input, userId: 'other' },
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await page.request.post('/api/templates/drafts', {
          headers,
          data: { ...input, document: { ...document, notes: 'x'.repeat(400000) } },
        })
      ).status(),
    ).toBe(413);
    expect((await read()).revision).toBe(0);
    const saved = await page.request.post('/api/templates/drafts', { headers, data: input });
    expect(saved.ok()).toBe(true);
    expect(await saved.json()).toMatchObject({
      acknowledgedRevision: 1,
      replayed: false,
      draft: { revision: 1, completion: { ready: true } },
    });
    expect((await read()).document).toEqual(document);
    const other = await second.request.get('/api/templates/drafts', { params: { templateId } });
    expect((await other.json()).draft).toMatchObject({ revision: 0, document: { notes: '' } });
    const next = {
      ...input,
      requestId: randomUUID(),
      expectedRevision: 1,
      document: { ...document, notes: 'הגרסה העדכנית של העבודה בחשבון הבדיקה הראשון.' },
    };
    expect((await page.request.post('/api/templates/drafts', { headers, data: next })).ok()).toBe(
      true,
    );
    const stale = await page.request.post('/api/templates/drafts', {
      headers,
      data: {
        ...next,
        requestId: randomUUID(),
        document: { ...document, notes: 'שינוי מלשונית ישנה שלא אמור לדרוס את העבודה.' },
      },
    });
    expect(stale.status()).toBe(409);
    expect(await stale.json()).toEqual({ error: 'TEMPLATE_REVISION_CONFLICT' });
    const retry = await page.request.post('/api/templates/drafts', { headers, data: input });
    expect(await retry.json()).toMatchObject({
      acknowledgedRevision: 1,
      replayed: true,
      draft: { revision: 2, document: next.document },
    });
    const conflict = await page.request.post('/api/templates/drafts', {
      headers,
      data: { ...input, document: next.document },
    });
    expect(conflict.status()).toBe(409);
    expect(await conflict.json()).toEqual({ error: 'TEMPLATE_REQUEST_CONFLICT' });
    expect(
      (
        await page.request.post('/api/templates/drafts', {
          headers,
          data: { ...next, requestId: randomUUID(), definitionHash: '0'.repeat(64) },
        })
      ).status(),
    ).toBe(409);
    const advanced = rawCatalog.templates.find((item) => item.lessonId === 'AUT_01')!;
    expect(
      (
        await page.request.get('/api/templates/drafts', { params: { templateId: advanced.id } })
      ).status(),
    ).toBe(403);
    const exported = await (await page.request.get('/api/export')).json();
    expect(exported.schemaVersion).toBe(11);
    expect(exported.templateDrafts).toHaveLength(1);
    expect(exported.templateDraftRequests).toHaveLength(2);
    expect(JSON.parse(exported.templateDrafts[0].document)).toEqual(next.document);
    expect(exported.lessonProgress).toEqual([]);
    expect(exported.skillMastery).toEqual([]);
    expect((await (await second.request.get('/api/export')).json()).templateDrafts).toEqual([]);
    expect(
      (await second.request.post('/api/templates/drafts', { headers, data: input })).ok(),
    ).toBe(true);
    await page.goto('/settings');
    await page.getByText('מחיקת החשבון והנתונים', { exact: true }).click();
    await page.getByLabel('סיסמה לאישור המחיקה').fill(password);
    await page.getByLabel('אני מבין שהמחיקה קבועה').check();
    await page.getByRole('button', { name: 'מחיקה לצמיתות' }).click();
    await expect(page).toHaveURL(/\/auth/);
    expect(
      (await page.request.get('/api/templates/drafts', { params: { templateId } })).status(),
    ).toBe(401);
    expect((await (await second.request.get('/api/export')).json()).templateDrafts).toHaveLength(1);
  } finally {
    await second.close();
    await anonymous.close();
  }
});
