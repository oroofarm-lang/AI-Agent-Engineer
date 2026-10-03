import { getSession } from '@/lib/auth/session';
import { getCurriculum } from '@/lib/data';
import { getConnection } from '@/lib/db/connection';
import { quizRepository, quizFeedback } from '@/lib/db/quizzes';
import { boundedJSON } from '@/lib/http/body';
import { quizInput } from '@/lib/quizzes/catalog';
import { z, ZodError } from 'zod';
import { stableId } from '@/lib/curriculum/schema';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
const allowed = [
  'QUIZ_UNKNOWN_LESSON',
  'FOUNDATION_REQUIRED',
  'QUIZ_VERSION_CONFLICT',
  'QUIZ_INVALID_OPTION',
  'QUIZ_REQUEST_CONFLICT',
  'QUIZ_DAILY_LIMIT',
  'BODY_TOO_LARGE',
];
function failure(error: unknown) {
  const code =
    error instanceof Error && allowed.includes(error.message) ? error.message : 'QUIZ_SAVE_FAILED';
  return Response.json(
    { error: code },
    {
      status:
        code === 'QUIZ_DAILY_LIMIT'
          ? 429
          : code.includes('CONFLICT')
            ? 409
            : code === 'FOUNDATION_REQUIRED'
              ? 403
              : code === 'QUIZ_UNKNOWN_LESSON'
                ? 404
                : code === 'BODY_TOO_LARGE'
                  ? 413
                  : code === 'QUIZ_SAVE_FAILED' && !(error instanceof ZodError)
                    ? 500
                    : 400,
      headers,
    },
  );
}
function publicAttempt(attempt: ReturnType<ReturnType<typeof quizRepository>['latest']>) {
  return attempt
    ? {
        id: attempt.id,
        optionId: attempt.option_id,
        questionHash: attempt.question_hash,
        correct: Boolean(attempt.correct),
        createdAt: attempt.created_at,
        feedback: quizFeedback(attempt),
      }
    : null;
}
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  try {
    const { lessonId, questionId } = z
      .strictObject({ lessonId: stableId, questionId: stableId.optional() })
      .parse(Object.fromEntries(new URL(request.url).searchParams));
    return Response.json(
      {
        latest: publicAttempt(
          quizRepository(getConnection(), getCurriculum(), session.user.id).latest(
            lessonId,
            questionId,
          ),
        ),
      },
      { headers },
    );
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  if (
    request.headers.get('origin') !==
    new URL(process.env.BETTER_AUTH_URL || 'http://127.0.0.1:3000').origin
  )
    return Response.json({ error: 'ORIGIN' }, { status: 403, headers });
  try {
    const input = quizInput.parse(await boundedJSON(request, 4000));
    const attempt = quizRepository(getConnection(), getCurriculum(), session.user.id).save(input);
    return Response.json({ attempt: publicAttempt(attempt) }, { headers });
  } catch (error) {
    return failure(error);
  }
}
