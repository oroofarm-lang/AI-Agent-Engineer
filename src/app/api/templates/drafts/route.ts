import { ZodError } from 'zod';
import { getSession } from '@/lib/auth/session';
import { getCurriculum } from '@/lib/data';
import { getConnection } from '@/lib/db/connection';
import { templateDraftRepository } from '@/lib/db/template-drafts';
import { draftQuerySchema, draftSaveSchema } from '@/lib/templates/persistence';
import { MAX_DOCUMENT_BYTES } from '@/lib/templates/schema';
import { boundedJSON } from '@/lib/http/body';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
const safeCodes = [
  'TEMPLATE_NOT_FOUND',
  'TEMPLATE_UNKNOWN_LESSON',
  'FOUNDATION_REQUIRED',
  'TEMPLATE_VERSION_CONFLICT',
  'TEMPLATE_REVISION_CONFLICT',
  'TEMPLATE_REQUEST_CONFLICT',
  'TEMPLATE_STORAGE_LIMIT',
  'TEMPLATE_DRAFT_LIMIT',
  'TEMPLATE_DAILY_LIMIT',
  'BODY_TOO_LARGE',
  'INVALID_BODY',
  'STALE_TEMPLATE',
  'UNEXPECTED_TABLE',
  'TABLE_REQUIRED',
  'REQUIRED_COLUMN_MISSING',
];
function failure(error: unknown) {
  const code =
    error instanceof Error && safeCodes.includes(error.message)
      ? error.message
      : error instanceof ZodError || error instanceof SyntaxError
        ? 'INVALID_BODY'
        : 'TEMPLATE_SAVE_FAILED';
  const status =
    code === 'TEMPLATE_SAVE_FAILED'
      ? 500
      : code === 'FOUNDATION_REQUIRED'
        ? 403
        : code.includes('NOT_FOUND') || code === 'TEMPLATE_UNKNOWN_LESSON'
          ? 404
          : code.includes('CONFLICT') || code === 'STALE_TEMPLATE'
            ? 409
            : code.endsWith('_LIMIT')
              ? 429
              : code === 'BODY_TOO_LARGE'
                ? 413
                : 400;
  return Response.json({ error: code }, { status, headers });
}
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  try {
    const query = draftQuerySchema.parse(Object.fromEntries(new URL(request.url).searchParams));
    const draft = templateDraftRepository(getConnection(), getCurriculum(), session.user.id).get(
      query,
    );
    return Response.json({ draft }, { headers });
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
    const input = draftSaveSchema.parse(await boundedJSON(request, MAX_DOCUMENT_BYTES + 4000));
    const result = templateDraftRepository(getConnection(), getCurriculum(), session.user.id).save(
      input,
    );
    return Response.json(result, { headers });
  } catch (error) {
    return failure(error);
  }
}
