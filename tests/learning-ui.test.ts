import { describe, it, expect } from 'vitest';
import { learningActivity } from '../src/lib/domain/activity';
import { markdownCards } from '../src/lib/curriculum/cards';
const build = (id: string, date: string) => ({
  lessonId: id,
  state: 'BUILD_COMPLETE' as const,
  buildCompletedAt: date,
});
describe('honest learning rewards', () => {
  it('never invents a streak or XP for a new learner', () => {
    expect(learningActivity([], new Date('2026-09-30T12:00:00Z'))).toEqual({
      xp: 0,
      streak: 0,
      builds: 0,
    });
  });
  it('counts unique builds and calendar days rather than repeated actions', () => {
    const p = build('A', '2026-09-30T08:00:00Z');
    expect(
      learningActivity(
        [p, p, build('B', '2026-09-30T09:00:00Z'), build('C', '2026-09-29T09:00:00Z')],
        new Date('2026-09-30T12:00:00Z'),
      ),
    ).toEqual({ xp: 300, streak: 2, builds: 3 });
  });
  it('keeps yesterday’s streak alive and expires it after a missed day', () => {
    const p = build('A', '2026-09-29T08:00:00Z');
    expect(learningActivity([p], new Date('2026-09-30T12:00:00Z')).streak).toBe(1);
    expect(learningActivity([p], new Date('2026-10-01T12:00:00Z')).streak).toBe(0);
  });
  it('uses Israel calendar dates around midnight', () => {
    expect(
      learningActivity([build('A', '2026-09-29T22:30:00Z')], new Date('2026-09-30T07:00:00Z'))
        .streak,
    ).toBe(1);
  });
});
describe('bite-size Markdown', () => {
  it('never splits a code fence including blank lines', () => {
    const body = 'A paragraph.\n\n```python\nx = 1\n\ny = 2\n```\n\nA second paragraph.';
    const cards = markdownCards(body, 20);
    expect(cards).toContain('```python\nx = 1\n\ny = 2\n```');
    expect(cards.join('\n\n')).toBe(body);
  });
});
