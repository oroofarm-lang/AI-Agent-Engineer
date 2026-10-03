import { z } from 'zod';
import { getSession } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { getConnection } from '@/lib/db/connection';
import { boundedJSON } from '@/lib/http/body';
import { auditorStore } from '@/lib/auditor/store';
import { mutationSchema } from '@/lib/auditor/schema';
import { sectionRange, fingerprint } from '@/lib/auditor/analysis';
import { requiredSections, stableId } from '@/lib/curriculum/schema';
import { revalidatePath } from 'next/cache';
import { syncReviewedRelease } from '@/lib/vault/sync';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'private, no-store' };
function failure(error: unknown) {
  const message = error instanceof Error ? error.message : '';
  const code = /^AUDITOR_[A-Z_]+$/.test(message)
    ? message
    : message === 'BODY_TOO_LARGE'
      ? message
      : error instanceof z.ZodError
        ? 'INVALID_REQUEST'
        : 'AUDITOR_FAILED';
  const status =
    code === 'AUDITOR_NOT_FOUND'
      ? 404
      : code === 'BODY_TOO_LARGE'
        ? 413
        : code === 'AUDITOR_BUSY'
          ? 409
          : /CONFLICT|STALE|ALREADY/.test(code)
            ? 409
            : code === 'AUDITOR_FAILED'
              ? 500
              : 400;
  return Response.json({ error: code }, { status, headers });
}
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  if (!isOperator(session.user))
    return Response.json({ error: 'NOT_FOUND' }, { status: 404, headers });
  try {
    const query = Object.fromEntries(new URL(request.url).searchParams),
      store = auditorStore(getConnection(), session.user);
    if ('proposalId' in query) {
      const { proposalId } = z.strictObject({ proposalId: z.uuid() }).parse(query);
      return Response.json(store.details(proposalId), { headers });
    }
    if ('lessonId' in query || 'section' in query) {
      const input = z
        .strictObject({ lessonId: stableId, section: z.enum(requiredSections) })
        .parse(query);
      const { catalog, body } = store.section(input.lessonId, input.section);
      return Response.json(
        {
          lessonId: input.lessonId,
          section: input.section,
          beforeText: sectionRange(body, input.section).text,
          bodyHash: catalog.lessonBodyHashes[input.lessonId],
          version: catalog.version,
          baseHash: fingerprint(catalog),
        },
        { headers },
      );
    }
    z.strictObject({}).parse(query);
    return Response.json({ context: store.context(), proposals: store.list() }, { headers });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  if (!isOperator(session.user))
    return Response.json({ error: 'NOT_FOUND' }, { status: 404, headers });
  if (
    request.headers.get('origin') !==
    new URL(process.env.BETTER_AUTH_URL || 'http://127.0.0.1:3000').origin
  )
    return Response.json({ error: 'ORIGIN' }, { status: 403, headers });
  try {
    const input = mutationSchema.parse(await boundedJSON(request, 600_000)),
      store = auditorStore(getConnection(), session.user);
    const result =
      input.operation === 'propose'
        ? store.propose(input.input)
        : input.operation === 'decide'
          ? store.decide(input.input)
          : input.operation === 'apply'
            ? store.apply(input.id, input.proposalHash)
            : store.rollback(input.id, input.proposalHash);
    revalidatePath('/', 'layout');
    if (input.operation === 'apply' || input.operation === 'rollback')
      return Response.json({ ...result, vaultSync: await syncReviewedRelease() }, { headers });
    return Response.json(result, { headers });
  } catch (error) {
    return failure(error);
  }
}
