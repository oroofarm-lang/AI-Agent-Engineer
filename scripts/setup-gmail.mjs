import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { readHiddenInput } from './lib/hidden-input.mjs';
import { gmailConfiguration } from './lib/gmail-config.mjs';

async function main() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error('TTY_REQUIRED');
  console.log('חיבור Gmail לאימות חשבון ולאיפוס סיסמה. אין להזין את סיסמת החשבון הרגילה.');
  console.log('יצירת סיסמת אפליקציה: https://myaccount.google.com/apppasswords');
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const email = await prompt.question('כתובת Gmail לשליחה: ');
  prompt.close();
  const password = await readHiddenInput('סיסמת אפליקציה של Google (לא תוצג): ');
  const target = path.resolve('.env.local');
  let previous = '';
  try {
    const stat = await fs.lstat(target);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('UNSAFE_CONFIG_FILE');
    previous = await fs.readFile(target, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const body = gmailConfiguration(previous, email, password);
  const temporary = `${target}.${randomUUID()}.tmp`;
  try {
    await fs.writeFile(temporary, body, { flag: 'wx', mode: 0o600 });
    await fs.rename(temporary, target);
  } finally {
    await fs.rm(temporary, { force: true });
  }
  console.log('ההגדרות נשמרו ב־.env.local בהרשאות פרטיות. הסיסמה לא הודפסה ולא נשלח מייל.');
  console.log('כעת הרץ npm run mail:check, ולאחר הצלחה הפעל מחדש את שרת האפליקציה.');
}
main().catch((error) => {
  const messages = {
    INVALID_EMAIL: 'כתובת המייל אינה תקינה.',
    INVALID_APP_PASSWORD: 'נדרשת סיסמת אפליקציה בת 16 תווים. ההגדרות לא השתנו.',
    TTY_REQUIRED: 'יש להריץ את הפקודה בטרמינל רגיל; אין להעביר סיסמה כארגומנט.',
    CANCELLED: 'ההגדרה בוטלה ללא שינוי.',
  };
  console.error(messages[error.message] || 'לא ניתן לשמור את ההגדרות. לא הודפסו פרטים פרטיים.');
  process.exitCode = 1;
});
