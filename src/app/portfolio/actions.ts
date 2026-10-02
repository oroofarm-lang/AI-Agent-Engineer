'use server';
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth/session';
import { getConnection } from '@/lib/db/connection';
import { portfolioRepository } from '@/lib/db/portfolio';
export async function togglePortfolio(_previous: { ok: boolean; message: string }, form: FormData) {
  try {
    portfolioRepository(getConnection(), (await requireUser()).id).setIncluded(
      form.get('submissionId'),
      form.get('included') === 'true',
    );
  } catch {
    return { ok: false, message: 'העדכון לא נשמר. רענן את העמוד ונסה שוב.' };
  }
  revalidatePath('/portfolio');
  revalidatePath('/assessments');
  return { ok: true, message: 'תיק העבודות עודכן.' };
}
