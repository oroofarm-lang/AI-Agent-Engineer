import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { boundedJSON } from '@/lib/http/body';
import { quizReviewStore, questionDecisionInput } from '@/lib/quizzes/review-store';
import { operatorQuizDraft } from '@/lib/quizzes/draft';
import { bankVersion, digest } from '@/lib/quizzes/bank';
import { stableId } from '@/lib/curriculum/schema';
import { syncReviewedRelease } from '@/lib/vault/sync';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'private, no-store' };
const mutation = z.discriminatedUnion('operation', [
  z.strictObject({
    operation: z.literal('propose'),
    requestId: z.uuid(),
    targetVersion: bankVersion,
    draftHash: digest,
    curriculumHash: digest,
  }),
  z.strictObject({ operation: z.literal('decide'), input: questionDecisionInput }),
  z.strictObject({
    operation: z.literal('publish'),
    proposalId: z.uuid(),
    proposalHash: digest,
    requestId: z.uuid(),
  }),
  z.strictObject({ operation: z.literal('rollback'), requestId: z.uuid(), releaseHash: digest }),
]);
function failure(cause: unknown) {
  const message = cause instanceof Error ? cause.message : '';
  const code = /^QUIZ_REVIEW_[A-Z_]+$/.test(message)
    ? message
    : message === 'AUDITOR_BUSY'
      ? 'QUIZ_REVIEW_BUSY'
      : message === 'BODY_TOO_LARGE'
        ? message
        : cause instanceof z.ZodError ||
            ['INVALID_BODY'].includes(message) ||
            cause instanceof SyntaxError
          ? 'INVALID_REQUEST'
          : 'QUIZ_REVIEW_FAILED';
  const status =
    code === 'QUIZ_REVIEW_NOT_FOUND'
      ? 404
      : code === 'BODY_TOO_LARGE'
        ? 413
        : /STALE|CONFLICT|ALREADY|BUSY/.test(code)
          ? 409
          : code === 'QUIZ_REVIEW_FAILED' || /CORRUPT/.test(code)
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
      store = quizReviewStore(session.user);
    if ('questionId' in query) {
      const input = z.strictObject({ proposalId: z.uuid(), questionId: stableId }).parse(query);
      return Response.json(store.question(input.proposalId, input.questionId), { headers });
    }
    if ('proposalId' in query) {
      const { proposalId } = z.strictObject({ proposalId: z.uuid() }).parse(query);
      return Response.json(store.details(proposalId), { headers });
    }
    z.strictObject({}).parse(query);
    const draft = operatorQuizDraft(session.user);
    return Response.json(
      {
        ...store.list(),
        status: store.status(),
        draft: {
          hash: draft.hash,
          version: draft.bank.version,
          curriculumVersion: draft.bank.curriculumVersion,
          questionCount: draft.bank.quizzes.length,
        },
      },
      { headers },
    );
  } catch (cause) {
    return failure(cause);
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
    const input = mutation.parse(await boundedJSON(request, 16000)),
      store = quizReviewStore(session.user);
    let result: unknown;
    if (input.operation === 'propose') {
      const draft = operatorQuizDraft(session.user);
      if (draft.hash !== input.draftHash) throw new Error('QUIZ_REVIEW_STALE_DRAFT');
      result = store.create(
        input.requestId,
        input.targetVersion,
        draft.bank,
        new Date(),
        input.curriculumHash,
      );
    } else if (input.operation === 'decide') result = store.decide(input.input);
    else if (input.operation === 'publish')
      result = store.publish(input.proposalId, input.proposalHash, input.requestId);
    else result = store.rollback(input.requestId, input.releaseHash);
    revalidatePath('/', 'layout');
    if (input.operation === 'publish' || input.operation === 'rollback')
      return Response.json(
        { ...(result as object), vaultSync: await syncReviewedRelease() },
        { headers },
      );
    return Response.json(result, { headers });
  } catch (cause) {
    return failure(cause);
  }
}
