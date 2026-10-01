'use server';
import { revalidatePath } from 'next/cache';
import { getAssessmentRepository } from '@/lib/data';
import type { ActionResult } from '../learn/actions';
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
    (await getAssessmentRepository()).submit({
      submissionId: form.get('submissionId'),
      assessmentId: form.get('assessmentId'),
      rubricVersion: form.get('rubricVersion'),
      curriculumVersion: form.get('curriculumVersion'),
      evidence,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    return {
      ok: false,
      message:
        message === 'BUILD_REQUIRED'
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
  return { ok: true, message: 'העבודה נשמרה וממתינה להערכה. ההגשה אינה מריצה קוד ואינה מוכיחה שליטה בנושא.' };
}
