import { getSession } from '@/lib/auth/session';
import { getRepository, getCurriculum } from '@/lib/data';
import { readCatalogLesson } from '@/lib/curriculum/load';
import { markdownCards } from '@/lib/curriculum/cards';
import { z } from 'zod';
export async function POST(request: Request) {
  if (!(await getSession())) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  if (
    request.headers.get('origin') !==
    new URL(process.env.BETTER_AUTH_URL || 'http://127.0.0.1:3000').origin
  )
    return Response.json({ error: 'ORIGIN' }, { status: 403 });
  try {
    const input = z
      .object({
        lessonId: z.string().regex(/^[A-Z][A-Z0-9_]+$/),
        stepId: z.string().max(100),
      })
      .parse(await request.json());
    const ids = readCatalogLesson(getCurriculum(), input.lessonId)
      .split(/^## /m)
      .filter(Boolean)
      .flatMap((part, i) =>
        markdownCards(part.slice(part.indexOf('\n') + 1)).map((_, j) => `section-${i}-${j}`),
      );
    if (!ids.includes(input.stepId))
      return Response.json({ error: 'INVALID_STEP' }, { status: 400 });
    (await getRepository()).savePosition(input.lessonId, input.stepId);
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'INVALID_POSITION' }, { status: 400 });
  }
}
