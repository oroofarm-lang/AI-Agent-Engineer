import { randomUUID } from 'node:crypto';
import type { Connection } from './connection';
import type { ProviderReply } from '../ai/provider';
type Message = {
  id: string;
  role: 'user' | 'assistant';
  body: string;
  mode: string;
  help_level: number;
  created_at: string;
};
type Thread = { id: string; lesson_id: string | null; curriculum_version: string };
export function mentorRepository({ sqlite }: Connection, userId: string) {
  function thread(id: string) {
    return sqlite
      .prepare(
        'SELECT id, lesson_id, curriculum_version FROM mentor_threads WHERE id = ? AND user_id = ?',
      )
      .get(id, userId) as Thread | undefined;
  }
  function messages(id: string) {
    if (!thread(id)) throw new Error('UNKNOWN_THREAD');
    return sqlite
      .prepare(
        'SELECT id, role, body, mode, help_level, created_at FROM (SELECT rowid AS sequence, * FROM mentor_messages WHERE thread_id = ? AND user_id = ? ORDER BY rowid DESC LIMIT 100) ORDER BY sequence',
      )
      .all(id, userId) as Message[];
  }
  return {
    thread,
    messages,
    latest(lessonId: string | null) {
      return sqlite
        .prepare(
          'SELECT id, lesson_id, curriculum_version FROM mentor_threads WHERE user_id = ? AND lesson_id IS ? ORDER BY updated_at DESC, rowid DESC LIMIT 1',
        )
        .get(userId, lessonId) as Thread | undefined;
    },
    reserve(input: {
      id: string;
      threadId?: string;
      lessonId: string | null;
      version: string;
      fingerprint: string;
      message: string;
      mode: string;
      helpLevel: number;
    }) {
      return sqlite.transaction(() => {
        const previous = sqlite
          .prepare('SELECT user_id, fingerprint, thread_id, state FROM mentor_runs WHERE id = ?')
          .get(input.id) as
          { user_id: string; fingerprint: string; thread_id: string; state: string } | undefined;
        if (previous) {
          if (previous.user_id !== userId || previous.fingerprint !== input.fingerprint)
            throw new Error('REQUEST_CONFLICT');
          return { duplicate: true, threadId: previous.thread_id, state: previous.state };
        }
        const now = new Date(),
          timestamp = now.toISOString();
        // Stale calls remain failed/unknown. A timeout never triggers an automatic charged retry.
        sqlite
          .prepare(
            "UPDATE mentor_runs SET state = 'FAILED', finished_at = ? WHERE user_id = ? AND state = 'RUNNING' AND created_at < ?",
          )
          .run(timestamp, userId, new Date(now.getTime() - 60000).toISOString());
        if (
          sqlite
            .prepare("SELECT id FROM mentor_runs WHERE user_id = ? AND state = 'RUNNING'")
            .get(userId)
        )
          throw new Error('MENTOR_BUSY');
        const day = timestamp.slice(0, 10);
        const daily = (
          sqlite
            .prepare('SELECT COUNT(*) AS n FROM mentor_runs WHERE user_id = ? AND created_at >= ?')
            .get(userId, `${day}T00:00:00.000Z`) as { n: number }
        ).n;
        if (daily >= 20) throw new Error('MENTOR_DAILY_LIMIT');
        let selected = input.threadId ? thread(input.threadId) : undefined;
        if (input.threadId && !selected) throw new Error('UNKNOWN_THREAD');
        if (selected && selected.lesson_id !== input.lessonId)
          throw new Error('THREAD_CONTEXT_CONFLICT');
        if (!selected) {
          selected = {
            id: randomUUID(),
            lesson_id: input.lessonId,
            curriculum_version: input.version,
          };
          sqlite
            .prepare(
              'INSERT INTO mentor_threads (id,user_id,lesson_id,curriculum_version,created_at,updated_at) VALUES (?,?,?,?,?,?)',
            )
            .run(selected.id, userId, input.lessonId, input.version, timestamp, timestamp);
        }
        sqlite
          .prepare(
            'INSERT INTO mentor_runs (id,user_id,thread_id,fingerprint,state,created_at) VALUES (?,?,?,?,?,?)',
          )
          .run(input.id, userId, selected.id, input.fingerprint, 'RUNNING', timestamp);
        sqlite
          .prepare(
            'INSERT INTO mentor_messages (id,thread_id,user_id,role,body,mode,help_level,created_at) VALUES (?,?,?,?,?,?,?,?)',
          )
          .run(
            randomUUID(),
            selected.id,
            userId,
            'user',
            input.message,
            input.mode,
            input.helpLevel,
            timestamp,
          );
        return { duplicate: false, threadId: selected.id, state: 'RUNNING' };
      })();
    },
    finish(id: string, reply?: ProviderReply) {
      sqlite.transaction(() => {
        const run = sqlite
          .prepare(
            "SELECT thread_id FROM mentor_runs WHERE id = ? AND user_id = ? AND state = 'RUNNING'",
          )
          .get(id, userId) as { thread_id: string } | undefined;
        if (!run) throw new Error('RUN_NOT_ACTIVE');
        const timestamp = new Date().toISOString();
        if (reply) {
          const original = sqlite
            .prepare(
              'SELECT mode, help_level FROM mentor_messages WHERE thread_id = ? AND user_id = ? ORDER BY rowid DESC LIMIT 1',
            )
            .get(run.thread_id, userId) as { mode: string; help_level: number };
          sqlite
            .prepare(
              'INSERT INTO mentor_messages (id,thread_id,user_id,role,body,mode,help_level,created_at) VALUES (?,?,?,?,?,?,?,?)',
            )
            .run(
              randomUUID(),
              run.thread_id,
              userId,
              'assistant',
              reply.text,
              original.mode,
              original.help_level,
              timestamp,
            );
        }
        sqlite
          .prepare(
            'UPDATE mentor_runs SET state = ?, input_tokens = ?, output_tokens = ?, finished_at = ? WHERE id = ? AND user_id = ?',
          )
          .run(
            reply ? 'COMPLETE' : 'FAILED',
            reply?.inputTokens ?? null,
            reply?.outputTokens ?? null,
            timestamp,
            id,
            userId,
          );
        sqlite
          .prepare('UPDATE mentor_threads SET updated_at = ? WHERE id = ? AND user_id = ?')
          .run(timestamp, run.thread_id, userId);
      })();
    },
  };
}
