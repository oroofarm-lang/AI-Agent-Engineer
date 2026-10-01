'use server';
import { revalidatePath } from 'next/cache';
import { getLearningSystem } from '@/lib/data';
type Result = { ok: boolean; message: string; revision?: number };
export async function saveWorkspace(_previous: Result, form: FormData): Promise<Result> {
  try {
    const revision = (await getLearningSystem()).saveWorkspace({
      lessonId: form.get('lessonId'),
      revision: Number(form.get('revision')),
      architecture: form.get('architecture'),
      testLog: form.get('testLog'),
      reflection: form.get('reflection'),
    });
    revalidatePath('/projects', 'layout');
    return { ok: true, message: 'תיעוד הפרויקט נשמר.', revision };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error && error.message === 'STALE_WORKSPACE'
          ? 'התיעוד השתנה מאז שפתחת אותו. העתק את השינויים שלך ורענן את העמוד לפני שמירה נוספת.'
          : 'התיעוד לא נשמר. בדוק שסיימת את פרק הבסיס ונסה שוב.',
    };
  }
}
export async function bossAction(_previous: Result, form: FormData): Promise<Result> {
  try {
    const system = await getLearningSystem();
    if (form.get('action') === 'start')
      system.startBoss({ id: form.get('id'), lessonId: form.get('lessonId') });
    else if (form.get('action') === 'submit')
      system.submitBoss({ id: form.get('id'), submissionId: form.get('submissionId') });
    else throw new Error('UNKNOWN_ACTION');
    revalidatePath('/boss');
    revalidatePath('/');
    return {
      ok: true,
      message:
        form.get('action') === 'start'
          ? 'הניסיון התחיל ונשמר בחשבון שלך.'
          : 'העבודה צורפה לניסיון וממתינה להערכה אנושית.',
    };
  } catch {
    return {
      ok: false,
      message: 'הניסיון לא נשמר. ודא שהשלמת את תרגילי פרק הבסיס, ובדוק שהגשת ראיות לשיעור ולגרסה המתאימים.',
    };
  }
}
