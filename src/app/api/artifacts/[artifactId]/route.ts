import { getSession } from '@/lib/auth/session';
import { getConnection } from '@/lib/db/connection';
import { downloadArtifact } from '@/lib/db/artifacts';
export const runtime = 'nodejs';
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ artifactId: string }> },
) {
  const session = await getSession();
  if (!session) return new Response(null, { status: 401 });
  const file = downloadArtifact(getConnection(), session.user, (await params).artifactId);
  if (!file) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(file.data), {
    headers: {
      'Content-Type': file.mime,
      'Content-Length': String(file.size),
      'Content-Disposition': `attachment; filename="artifact"; filename*=UTF-8''${encodeURIComponent(file.name).replace(/['()*]/g, (character) => '%' + character.charCodeAt(0).toString(16))}`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "sandbox; default-src 'none'",
    },
  });
}
