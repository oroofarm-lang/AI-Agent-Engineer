import { describe, expect, it } from 'vitest';
import rawCatalog from '../content/templates/releases/1.0.0.json';
import { templateCatalogSchema, starterDocument } from '../src/lib/templates/schema';
import { DraftSaveCoordinator, DraftSaveError } from '../src/lib/templates/save-coordinator';
import type { DraftSaveInput } from '../src/lib/templates/persistence';

const definition = templateCatalogSchema
  .parse(rawCatalog)
  .templates.find((d) => d.kind === 'markdown')!;
const hash = 'a'.repeat(64);
const document = starterDocument(definition);
function acknowledgement(request: DraftSaveInput, revision = request.expectedRevision + 1) {
  return {
    requestId: request.requestId,
    acknowledgedRevision: request.expectedRevision + 1,
    replayed: false,
    draft: {
      definition,
      definitionHash: hash,
      document: request.document,
      revision,
      readOnly: false,
    },
  };
}
function setup(send: (request: DraftSaveInput) => Promise<unknown>, readOnly = false) {
  let serial = 0;
  return new DraftSaveCoordinator({
    definition,
    definitionHash: hash,
    curriculumVersion: '2.2.1',
    document,
    revision: 0,
    readOnly,
    send,
    uuid: () => `00000000-0000-4000-8000-${String(++serial).padStart(12, '0')}`,
  });
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe('editor save coordination', () => {
  it('serializes in-flight edits into the next revision without replacing local typing', async () => {
    const first = deferred<unknown>();
    const calls: DraftSaveInput[] = [];
    const coordinator = setup(async (request) => {
      calls.push(request);
      return calls.length === 1 ? first.promise : acknowledgement(request);
    });
    coordinator.edit({ ...document, notes: 'first edit' });
    const saving = coordinator.flush();
    coordinator.edit({ ...document, notes: 'newer typing during request' });
    const parallel = coordinator.flush();
    expect(calls).toHaveLength(1);
    first.resolve(acknowledgement(calls[0]));
    await Promise.all([saving, parallel]);
    expect(calls).toHaveLength(2);
    expect(calls[1].expectedRevision).toBe(1);
    expect(calls[1].document.notes).toBe('newer typing during request');
    expect(calls[1].curriculumVersion).toBe('2.2.1');
    expect(calls[1].requestId).not.toBe(calls[0].requestId);
    expect(coordinator.view()).toMatchObject({
      revision: 2,
      status: 'saved',
      document: { notes: calls[1].document.notes },
    });
  });
  it('retains the exact uncertain payload and UUID, then saves newer edits after explicit retry', async () => {
    const calls: DraftSaveInput[] = [];
    const coordinator = setup(async (request) => {
      calls.push(request);
      if (calls.length === 1) throw new Error('connection lost after server write');
      return { ...acknowledgement(request), replayed: calls.length === 2 };
    });
    coordinator.edit({ ...document, notes: 'uncertain first save' });
    await expect(coordinator.flush()).rejects.toThrow('SAVE_FAILED');
    coordinator.edit({ ...document, notes: 'local work after failure' });
    await expect(coordinator.flush()).rejects.toThrow('SAVE_FAILED');
    expect(calls).toHaveLength(1);
    await coordinator.flush(true);
    expect(calls[1]).toEqual(calls[0]);
    expect(calls[2]).toMatchObject({
      expectedRevision: 1,
      document: { notes: 'local work after failure' },
    });
    expect(coordinator.view().status).toBe('saved');
  });
  it('preserves local work when an old receipt exposes newer work from another tab', async () => {
    const coordinator = setup(async (request) => ({
      ...acknowledgement(request, 3),
      replayed: true,
      draft: {
        ...acknowledgement(request, 3).draft,
        document: { ...document, notes: 'other tab' },
      },
    }));
    coordinator.edit({ ...document, notes: 'keep my unsaved work' });
    await expect(coordinator.flush()).rejects.toThrow('TEMPLATE_REVISION_CONFLICT');
    expect(coordinator.view()).toMatchObject({
      status: 'conflict',
      revision: 0,
      document: { notes: 'keep my unsaved work' },
    });
    await expect(coordinator.flush(true)).rejects.toThrow('CONFLICT');
    coordinator.replaceFromServer(
      { ...document, notes: 'explicitly accepted other tab' },
      3,
      false,
    );
    expect(coordinator.view()).toMatchObject({ status: 'saved', revision: 3 });
  });
  it('protects against malformed or mismatched acknowledgement responses', async () => {
    for (const mismatch of ['identity', 'definition', 'document', 'revision', 'shape']) {
      const coordinator = setup(async (request) => {
        const result = acknowledgement(request);
        if (mismatch === 'identity') result.requestId = '00000000-0000-4000-8000-999999999999';
        if (mismatch === 'definition') result.draft.definitionHash = 'b'.repeat(64);
        if (mismatch === 'document') result.draft.document = { ...document, notes: 'wrong work' };
        if (mismatch === 'revision') result.acknowledgedRevision = 9;
        return mismatch === 'shape' ? { ok: true } : result;
      });
      coordinator.edit({ ...document, notes: 'do not lose this' });
      await expect(coordinator.flush()).rejects.toBeInstanceOf(DraftSaveError);
      expect(coordinator.view()).toMatchObject({
        status: 'failed',
        revision: 0,
        document: { notes: 'do not lose this' },
      });
    }
  });
  it('keeps historical work read-only and rejects stale explicit replacements', async () => {
    let calls = 0;
    const coordinator = setup(async (request) => {
      calls++;
      return acknowledgement(request);
    }, true);
    expect(() => coordinator.edit({ ...document, notes: 'attempt' })).toThrow('READ_ONLY');
    await expect(coordinator.flush()).rejects.toThrow('READ_ONLY');
    expect(calls).toBe(0);
    coordinator.replaceFromServer(document, 3, true);
    expect(() => coordinator.replaceFromServer(document, 2, false)).toThrow('STALE_REVISION');
  });
  it('does not issue writes for unchanged work and notifies unsubscribe safely', async () => {
    let calls = 0,
      notifications = 0;
    const coordinator = setup(async (request) => {
      calls++;
      return acknowledgement(request);
    });
    const unsubscribe = coordinator.subscribe(() => {
      notifications++;
    });
    coordinator.edit(document);
    await coordinator.flush();
    expect(calls).toBe(0);
    expect(notifications).toBeGreaterThan(0);
    unsubscribe();
    const before = notifications;
    coordinator.edit({ ...document, notes: 'different' });
    expect(notifications).toBe(before);
  });
  it('blocks replacement during a pending write and preserves edits on explicit server conflicts', async () => {
    const flight = deferred<unknown>();
    const coordinator = setup(async () => flight.promise);
    coordinator.edit({ ...document, notes: 'preserved' });
    const saving = coordinator.flush();
    expect(() => coordinator.replaceFromServer(document, 1, false)).toThrow('SAVE_IN_FLIGHT');
    flight.resolve(Promise.reject(new DraftSaveError('TEMPLATE_REVISION_CONFLICT')));
    await expect(saving).rejects.toThrow('TEMPLATE_REVISION_CONFLICT');
    expect(coordinator.view()).toMatchObject({
      status: 'conflict',
      document: { notes: 'preserved' },
    });
  });
});
