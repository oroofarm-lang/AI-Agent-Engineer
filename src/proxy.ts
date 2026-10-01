import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@/lib/auth/server';
export async function proxy(request: NextRequest) {
  const session = await getAuth().api.getSession({ headers: request.headers });
  if (!session) {
    const url = new URL('/auth', request.url);
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/',
    '/learn/:path*',
    '/topics/:path*',
    '/skills/:path*',
    '/assessments/:path*',
    '/settings/:path*',
    '/roadmap/:path*',
    '/admin/:path*',
    '/journal/:path*',
    '/failures/:path*',
    '/projects/:path*',
    '/boss-levels/:path*',
  ],
};
