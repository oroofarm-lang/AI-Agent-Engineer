import { getSession } from '@/lib/auth/session';
import { getCurriculum } from '@/lib/data';
import { readCatalogLesson } from '@/lib/curriculum/load';
import { getConnection } from '@/lib/db/connection';
import { repository } from '@/lib/db/repository';
import { canStudyLesson } from '@/lib/domain/learning-path';
import { isProject } from '@/lib/domain/projects';
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) {
  const session = await getSession();
  if (!session) return new Response('Unauthorized', { status: 401 });
  const { lessonId } = await params,
    c = getCurriculum(),
    lesson = c.lessons.find((l) => l.id === lessonId && isProject(l));
  if (!lesson) return new Response('Not found', { status: 404 });
  if (!canStudyLesson(c, repository(getConnection(), c, session.user.id).progress(), lesson))
    return new Response('Foundation required', { status: 403 });
  const body = `# ${lesson.title}\n\nתוכנית ${c.version}. זהו מסמך לתכנון העבודה; הוא אינו קוד שבוצע או פתרון מוכן.\n\n## תיקיית העבודה שלך\n\n- README.md: מה מקבלים, מה מחזירים ואיך מפעילים.\n- src/: הקוד שתכתוב.\n- tests/: מקרי בדיקה ותוצאות צפויות.\n- evidence/: תוצאות מהרצות שביצעת, ללא סודות.\n\n${readCatalogLesson(c, lessonId)}`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${lessonId}-README.md"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
