import { getSession } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { getConnection } from '@/lib/db/connection';
import { optedInContacts, contactCsv } from '@/lib/db/contact-consent';
export const dynamic = 'force-dynamic';
export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  if (!isOperator(session.user)) return Response.json({ error: 'NOT_FOUND' }, { status: 404 });
  return new Response(contactCsv(optedInContacts(getConnection(), session.user)), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="course-opted-in-contacts.csv"',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
