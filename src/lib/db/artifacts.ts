import { z } from 'zod';
import { createHash } from 'node:crypto';
import type { Connection } from './connection';
import { isOperator } from '../admin/access';
import {
  artifactMime,
  MAX_ACCOUNT_BYTES,
  type ArtifactInput,
  type ArtifactMetadata,
} from '../domain/artifacts';

export function artifactRepository(connection: Connection, userId: string) {
  const { sqlite } = connection;
  return {
    metadata(submissionId?: string) {
      const columns = 'id,submission_id,criterion_id,name,mime,size,sha256,created_at';
      return (
        submissionId
          ? sqlite
              .prepare(
                `SELECT ${columns} FROM assessment_artifacts WHERE user_id=? AND submission_id=? ORDER BY rowid`,
              )
              .all(userId, submissionId)
          : sqlite
              .prepare(`SELECT ${columns} FROM assessment_artifacts WHERE user_id=? ORDER BY rowid`)
              .all(userId)
      ) as ArtifactMetadata[];
    },
    save(submissionId: string, files: ArtifactInput[]) {
      if (
        !sqlite
          .prepare('SELECT id FROM assessment_results WHERE id=? AND user_id=?')
          .get(submissionId, userId)
      )
        throw new Error('UNKNOWN_SUBMISSION');
      const usage = sqlite
        .prepare('SELECT coalesce(sum(size),0) AS bytes FROM assessment_artifacts WHERE user_id=?')
        .get(userId) as { bytes: number };
      if (
        usage.bytes + files.reduce((sum, file) => sum + file.data.byteLength, 0) >
        MAX_ACCOUNT_BYTES
      )
        throw new Error('STORAGE_LIMIT');
      for (const file of files) {
        sqlite
          .prepare('INSERT INTO assessment_artifacts VALUES (?,?,?,?,?,?,?,?,?,?)')
          .run(
            file.id,
            userId,
            submissionId,
            file.criterionId,
            file.name,
            artifactMime(file.name, file.data),
            file.data.byteLength,
            createHash('sha256').update(file.data).digest('hex'),
            Buffer.from(file.data),
            new Date().toISOString(),
          );
      }
    },
  };
}

/** Owner and verified operator access only. Unknown and unauthorized IDs look identical. */
export function downloadArtifact(
  connection: Connection,
  actor: { id: string; email: string; emailVerified: boolean },
  rawId: string,
) {
  const id = z.uuid().safeParse(rawId);
  if (!id.success) return undefined;
  const file = connection.sqlite
    .prepare('SELECT * FROM assessment_artifacts WHERE id=? AND (user_id=? OR ?=1)')
    .get(id.data, actor.id, isOperator(actor) ? 1 : 0) as
    (ArtifactMetadata & { data: Buffer }) | undefined;
  return file;
}
