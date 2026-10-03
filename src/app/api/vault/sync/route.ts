import { getSession } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { boundedJSON } from '@/lib/http/body';
import { publicVaultStatus, safeVaultError, syncPublicVault } from '@/lib/vault/sync';
import { z } from 'zod';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'private, no-store' };
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  if (!isOperator(session.user))
    return Response.json({ error: 'NOT_FOUND' }, { status: 404, headers });
  try {
    z.strictObject({}).parse(Object.fromEntries(new URL(request.url).searchParams));
  } catch {
    return Response.json({ error: 'INVALID_REQUEST' }, { status: 400, headers });
  }
  try {
    return Response.json(await publicVaultStatus(), { headers });
  } catch {
    return Response.json({ error: 'VAULT_STATUS_FAILED' }, { status: 500, headers });
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
    z.strictObject({}).parse(await boundedJSON(request, 1000));
  } catch (error) {
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE')
      return Response.json({ error: 'BODY_TOO_LARGE' }, { status: 413, headers });
    return Response.json({ error: 'INVALID_REQUEST' }, { status: 400, headers });
  }
  try {
    return Response.json(await syncPublicVault(), { headers });
  } catch (error) {
    const safe = safeVaultError(error);
    return Response.json(
      { error: safe },
      { status: safe === 'VAULT_SYNC_FAILED' ? 500 : 409, headers },
    );
  }
}
