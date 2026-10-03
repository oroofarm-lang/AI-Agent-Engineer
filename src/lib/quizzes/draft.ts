import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { isOperator } from '../admin/access';
import { teachingBankSchema } from './bank';
import { fingerprint } from '../auditor/analysis';

/** A fixed public authoring source is available only to a verified operator, never learner selection. */
export function operatorQuizDraft(actor: { email: string; emailVerified: boolean }) {
  if (!isOperator(actor)) throw new Error('QUIZ_REVIEW_FORBIDDEN');
  const bank = teachingBankSchema.parse(
    JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'content/authoring/quiz-bank/1.0.0-draft.json'),
        'utf8',
      ),
    ),
  );
  if (bank.status !== 'draft') throw new Error('QUIZ_REVIEW_DRAFT_REQUIRED');
  return { bank, hash: fingerprint(bank) };
}
