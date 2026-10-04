import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { readHiddenInput } from './lib/hidden-input.mjs';
import { gmailOAuthConfiguration } from './lib/gmail-config.mjs';

async function main() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error('TTY_REQUIRED');
  console.log('חיבור Gmail באמצעות OAuth. הרשאה לשליחה בלבד; אין קריאת תיבת דואר.');
  console.log('הוראות הכנה: docs/GMAIL_OAUTH_HE.md');
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const email = await prompt.question('כתובת Gmail לשליחה: ');
  const clientId = await prompt.question('Client ID של פרויקט Google Cloud: ');
  prompt.close();
  const secret = await readHiddenInput('Client Secret (לא יוצג): ');
  const refresh = await readHiddenInput('Refresh Token (לא יוצג): ');
  const target = path.resolve('.env.local');
  let previous = '';
  try {
    const stat = await fs.lstat(target);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('UNSAFE_CONFIG_FILE');
    previous = await fs.readFile(target, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const body = gmailOAuthConfiguration(previous, email, clientId, secret, refresh);
  const temporary = `${target}.${randomUUID()}.tmp`;
  try {
    await fs.writeFile(temporary, body, { flag: 'wx', mode: 0o600 });
    await fs.rename(temporary, target);
  } finally {
    await fs.rm(temporary, { force: true });
  }
  console.log('ההגדרות נשמרו באופן פרטי. לא נשלח מייל ולא בוצעה כניסה ל־Google.');
  console.log(
    'הרץ npm run mail:check. לאחר הצלחה, הפעל מחדש את האפליקציה ובדוק איפוס סיסמה בפועל.',
  );
}
main().catch(() => {
  console.error('ההגדרה לא הושלמה. בדוק את הפרטים וההרשאות לפי המדריך. לא הודפסו סודות.');
  process.exitCode = 1;
});
