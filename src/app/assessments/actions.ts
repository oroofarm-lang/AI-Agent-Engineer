'use server';
import { revalidatePath } from 'next/cache';
import { getAssessmentRepository } from '@/lib/data';
import type { ActionResult } from '../learn/actions';
import { MAX_FILES, MAX_FILE_BYTES, MAX_TOTAL_BYTES } from '@/lib/domain/artifacts';
export async function submitEvidence(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const evidence = Object.fromEntries(
    [...form.entries()]
      .filter(([key]) => key.startsWith('evidence:'))
      .map(([key, value]) => [key.slice(9), value]),
  );
  try {
    const repo = await getAssessmentRepository();
    const selected = [...form.entries()].filter(
      ([key, value]) => key.startsWith('artifact:') && value instanceof File && value.size > 0,
    ) as [string, File][];
    if (
      selected.length > MAX_FILES ||
      selected.some(([, file]) => file.size > MAX_FILE_BYTES) ||
      selected.reduce((sum, [, file]) => sum + file.size, 0) > MAX_TOTAL_BYTES
    )
      throw new Error('FILES_TOO_LARGE');
    const artifacts = await Promise.all(
      selected.map(async ([key, file]) => {
        const [, criterionId, id] = key.split(':');
        return { id, criterionId, name: file.name, data: new Uint8Array(await file.arrayBuffer()) };
      }),
    );
    repo.submit({
      submissionId: form.get('submissionId'),
      assessmentId: form.get('assessmentId'),
      rubricVersion: form.get('rubricVersion'),
      curriculumVersion: form.get('curriculumVersion'),
      evidence,
      artifacts,
      ...(form.has('portfolioTitle')
        ? {
            portfolio: {
              included: form.get('portfolioIncluded') === 'on',
              title: form.get('portfolioTitle'),
              summary: form.get('portfolioSummary'),
            },
          }
        : {}),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    return {
      ok: false,
      message: ['FILES_TOO_LARGE', 'STORAGE_LIMIT'].includes(message)
        ? 'הקבצים לא נשמרו. אפשר לצרף עד 6 קבצים, עד 3MB לקובץ ועד 8MB להגשה. נפח האחסון לחשבון הוא 100MB.'
        : ['UNSUPPORTED_FILE', 'INVALID_FILE'].includes(message)
          ? 'אחד הקבצים אינו נתמך או שתוכנו אינו מתאים לסוג הקובץ. בחר קובץ טקסט, קוד, PDF, PNG או JPEG תקין.'
          : message === 'BUILD_REQUIRED'
            ? 'השלם את תרגיל הבנייה וסמן אותו כהושלם לפני הגשת העבודה לבדיקה.'
            : message === 'STALE_ASSESSMENT'
              ? 'גרסת המחוון השתנתה. שמור עותק של התשובות ורענן את העמוד לפני הגשה.'
              : message === 'SUBMISSION_CONFLICT'
                ? 'ההגשה הקודמת כבר נשמרה. להגשה חדשה יש לפתוח שוב את השיעור.'
                : 'ההגשה לא נשמרה. כתוב בין 80 ל־12,000 תווים בכל סעיף ונסה שוב.',
    };
  }
  revalidatePath('/learn', 'layout');
  revalidatePath('/skills');
  revalidatePath('/assessments');
  revalidatePath('/');
  revalidatePath('/portfolio');
  return {
    ok: true,
    message: 'העבודה נשמרה וממתינה להערכה. ההגשה אינה מריצה קוד ואינה מוכיחה שליטה בנושא.',
  };
}
