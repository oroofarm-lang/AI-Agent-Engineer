import { afterEach, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { reflectionRepository } from '../src/lib/db/reflections';
import { repository } from '../src/lib/db/repository';
const connections: ReturnType<typeof connect>[] = [];
afterEach(() => connections.splice(0).forEach((c) => c.sqlite.close()));
function fixture() {
  const c = loadCurriculum();
  const db = connect(':memory:');
  connections.push(db);
  setupDatabase(db, c);
  return { r: reflectionRepository(db, c, 'local'), exporter: repository(db, c, 'local') };
}
const failure = () => ({
  id: randomUUID(),
  revision: 0,
  title: 'Timeout investigation',
  lessonId: '',
  skillId: '',
  category: 'TOOL_TIMEOUT',
  description: 'Request failed after thirty seconds.',
  rootCause: 'The network request had no retry policy.',
  fix: 'Add a bounded retry and deadline.',
  testCreated: '',
});
it('preserves edits against stale updates and makes retries idempotent', () => {
  const { r } = fixture();
  const input = failure();
  expect(r.save('failure', input)).toBe(1);
  expect(r.save('failure', input)).toBe(1);
  expect(r.save('failure', { ...input, revision: 1, title: 'Revised timeout investigation' })).toBe(
    2,
  );
  expect(() => r.save('failure', { ...input, title: 'Stale overwrite' })).toThrow('STALE_ENTRY');
  expect(r.failures()[0].title).toBe('Revised timeout investigation');
});
it('keeps the failure snapshot when a documented test is created and exports it', () => {
  const { r, exporter } = fixture();
  const input = failure();
  r.save('failure', input);
  const testCase = {
    id: randomUUID(),
    failureId: input.id,
    kind: 'REGRESSION',
    input: 'Simulate a slow tool response.',
    expected: 'Stop at the deadline with a clear error.',
  };
  r.addCase(testCase);
  r.addCase(testCase);
  r.save('failure', {
    ...input,
    revision: 1,
    rootCause: 'The provider was temporarily unavailable.',
  });
  expect(r.cases()).toHaveLength(1);
  expect(JSON.parse(r.cases()[0].failureSnapshot).rootCause).toBe(input.rootCause);
  expect(exporter.exportData().failureTestCases).toHaveLength(1);
  expect(() => r.save('failure', { ...input, id: randomUUID(), lessonId: 'unknown' })).toThrow(
    'UNKNOWN_LESSON',
  );
});
