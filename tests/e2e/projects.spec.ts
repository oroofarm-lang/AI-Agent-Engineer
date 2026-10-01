import {test,expect} from './fixtures';
test('project workspace and starter download persist per account; Boss remains gated by foundations',async({page})=>{
 await page.goto('/projects');await expect(page.getByRole('heading',{name:'הפרויקטים שלך',exact:true})).toBeVisible();
 await page.getByRole('link',{name:'להוראות ולתיעוד הפרויקט'}).first().click();
 await page.getByLabel('איך תכננתי את הפתרון?').fill('פונקציה מקבלת קלט בדיקה, בודקת אותו ומחזירה תוצאה בלי פעולה אצל לקוח.');
 await page.getByLabel('אילו בדיקות הרצתי ומה היו התוצאות?').fill('תיעוד סינתטי לצורך בדיקת השמירה: קלט ריק נדחה, קלט מלא מתקבל.');
 await page.getByLabel('מה למדתי ומה אשנה?').fill('אתעד גם את הסיבה לדחייה ואוסיף בדיקה למניעת חזרה של התקלה.');
 await page.getByRole('button',{name:'שמירת תיעוד הפרויקט'}).click();await expect(page.getByText('תיעוד הפרויקט נשמר.')).toBeVisible();
 const first=await(await page.request.get('/api/export')).json();expect(first.projectWorkspaces).toHaveLength(1);expect(first.projectWorkspaces[0].revision).toBe(1);
 const starter=await page.request.get('/api/projects/W01D05_PROJECT_AGENT_ZERO/starter');expect(starter.ok()).toBe(true);expect(await starter.text()).toContain('זהו מסמך לתכנון העבודה');
 await page.reload();await expect(page.getByRole('textbox',{name:'איך תכננתי את הפתרון?',exact:true})).toHaveValue(first.projectWorkspaces[0].architecture);
 await page.getByRole('textbox',{name:'מה למדתי ומה אשנה?',exact:true}).fill('לאחר בדיקה נוספת אבדוק גם שני קלטים זהים וארשום מה ציפיתי לקבל.');
 await page.getByRole('button',{name:'שמירת תיעוד הפרויקט'}).click();await expect(page.getByText('תיעוד הפרויקט נשמר.')).toBeVisible();
 await expect.poll(async()=> (await(await page.request.get('/api/export')).json()).projectWorkspaces[0].revision).toBe(2);
 await page.goto('/boss');await expect(page.getByRole('heading',{name:'מבחנים מסכמים · Boss Levels'})).toBeVisible();await expect(page.getByRole('button',{name:'התחלת ניסיון'})).toHaveCount(0);
 expect((await(await page.request.get('/api/export')).json()).bossAttempts).toEqual([]);
});
