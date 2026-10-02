import { z } from 'zod';
import type { Connection } from './connection';
export type PortfolioEntry = {
  submission_id: string;
  title: string;
  summary: string;
  included: number;
  lesson_id: string;
  submitted_at: string;
  outcome: 'PASS' | 'REVISE' | null;
};
export function portfolioRepository(connection: Connection, userId: string) {
  const { sqlite } = connection;
  return {
    entries: () =>
      sqlite
        .prepare(
          `SELECT a.id AS submission_id, coalesce(p.title,json_extract(a.rubric_snapshot,'$.title')) AS title, coalesce(p.summary,'') AS summary, coalesce(p.included,0) AS included, a.lesson_id,a.submitted_at,r.outcome FROM assessment_results a LEFT JOIN portfolio_entries p ON p.submission_id=a.id AND p.user_id=a.user_id LEFT JOIN assessment_reviews r ON r.submission_id=a.id WHERE a.user_id=? ORDER BY a.submitted_at DESC`,
        )
        .all(userId) as PortfolioEntry[],
    setIncluded(rawId: unknown, included: boolean) {
      const id = z.uuid().parse(rawId);
      const changed = sqlite
        .prepare(
          `INSERT INTO portfolio_entries SELECT id,user_id,json_extract(rubric_snapshot,'$.title'),'',?,? FROM assessment_results WHERE id=? AND user_id=? ON CONFLICT(submission_id) DO UPDATE SET included=excluded.included,updated_at=excluded.updated_at WHERE portfolio_entries.user_id=excluded.user_id`,
        )
        .run(included ? 1 : 0, new Date().toISOString(), id, userId);
      if (!changed.changes) throw new Error('UNKNOWN_PORTFOLIO_ENTRY');
    },
  };
}
