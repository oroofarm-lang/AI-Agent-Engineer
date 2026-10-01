import { getSession } from '@/lib/auth/session';
import { getRepository } from '@/lib/data';
export const dynamic = 'force-dynamic';
export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  return Response.json(
    {
      ...(await getRepository()).exportData(),
      profile: {
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
      },
    },
    {
      headers: {
        'Content-Disposition': `attachment; filename="agent-engineer-backup-${new Date().toISOString().slice(0, 10)}.json"`,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    },
  );
}
