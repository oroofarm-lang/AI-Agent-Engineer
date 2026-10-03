import { getSession } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { boundedJSON } from '@/lib/http/body';
import { syncPublicVault } from '@/lib/vault/sync';
import { z } from 'zod';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
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
    return Response.json(await syncPublicVault(), { headers });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    const safe = code.startsWith('VAULT_EDITED_NOTE:')
      ? 'VAULT_EDITED_NOTE'
      : code === 'VAULT_SYNC_BUSY'
        ? 'VAULT_SYNC_BUSY'
        : 'VAULT_SYNC_FAILED';
    return Response.json(
      { error: safe },
      { status: safe === 'VAULT_SYNC_FAILED' ? 400 : 409, headers },
    );
  }
}
