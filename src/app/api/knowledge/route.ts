import { z } from 'zod';
import { getSession } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { boundedJSON } from '@/lib/http/body';
import { ensureKnowledge, readKnowledge } from '@/lib/ai/knowledge-store';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
export async function GET() {
  if (!(await getSession()))
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  return Response.json({ snapshot: (await readKnowledge()) || null }, { headers });
}
/** Fixed public feeds only; operators cannot supply endpoints, file paths or a forced retry. */
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
    z.strictObject({}).parse(await boundedJSON(request, 1000));
    return Response.json({ snapshot: await ensureKnowledge() }, { headers });
  } catch {
    return Response.json({ error: 'KNOWLEDGE_REFRESH_FAILED' }, { status: 400, headers });
  }
}
