import type { Connection } from '../db/connection';
import { isOperator } from './access';

export function registrationDirectory(
  connection: Connection,
  user: { email: string; emailVerified: boolean },
  page = 1,
) {
  if (!isOperator(user)) throw new Error('FORBIDDEN');
  const size = 25;
  const offset = (Math.max(1, Math.min(100000, Math.floor(page))) - 1) * size;
  const accounts = connection.sqlite
    .prepare(
      `SELECT u.id, u.name, u.email, u.emailVerified,
    u.createdAt, (SELECT COUNT(*) FROM lesson_progress p WHERE p.user_id = u.id AND p.build_completed_at IS NOT NULL) AS builds,
    (SELECT COUNT(*) FROM assessment_results a WHERE a.user_id = u.id) AS submissions
    FROM user u ORDER BY u.createdAt DESC, u.id LIMIT ? OFFSET ?`,
    )
    .all(size, offset) as {
    id: string;
    name: string;
    email: string;
    emailVerified: number;
    createdAt: number;
    builds: number;
    submissions: number;
  }[];
  const total = (
    connection.sqlite.prepare('SELECT COUNT(*) AS count FROM user').get() as { count: number }
  ).count;
  return { accounts, total, pages: Math.max(1, Math.ceil(total / size)) };
}
