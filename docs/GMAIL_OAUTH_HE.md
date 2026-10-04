# חיבור Gmail באמצעות OAuth

מסלול זה מאפשר לשלוח אימות חשבון ואיפוס סיסמה גם כאשר סיסמאות אפליקציה אינן זמינות. הוא אינו דורש את סיסמת Gmail. חשבון השליחה מאשר את החיבור פעם אחת; תלמידי הקורס אינם נדרשים לתת גישה ל־Gmail שלהם.

## 1. יצירת פרויקט

פתח את [Google Cloud](https://console.cloud.google.com/projectcreate), צור פרויקט בשם `Agent Engineer Mail`, ובחר אותו כפרויקט הפעיל. לאחר מכן פתח את ספריית השירותים, חפש `Gmail API` והפעל אותו בפרויקט הזה.

## 2. הגדרת מסך ההרשאה

ב־Google Auth Platform הגדר את שם האפליקציה, כתובת התמיכה וכתובת הקשר. לחשבון Gmail אישי בחר קהל External. לצורך בדיקה, הוסף את כתובת חשבון השליחה כמשתמש בדיקה תחת Audience. תחת Data Access הוסף רק את ההרשאה:

```
https://www.googleapis.com/auth/gmail.send
```

זו הרשאה רגישה לשליחה בשם החשבון. אין צורך בהרשאת קריאה, מחיקה או בהרשאה הרחבה `https://mail.google.com/`. אם Google מציגה חסימה, עצור ושמור רק את נוסח השגיאה ללא פרטים סודיים; אין לעקוף חסימה.

## 3. יצירת לקוח OAuth

תחת Clients צור לקוח מסוג Web application. הוסף ל־Authorized redirect URIs בדיוק:

```
https://developers.google.com/oauthplayground
```

שמור את Client ID ואת Client Secret באופן פרטי. אל תשלח אותם בצ׳אט ואל תוסיף אותם ל־Git.

## 4. אישור חשבון השליחה

פתח את [OAuth Playground הרשמי של Google](https://developers.google.com/oauthplayground/). כלי זה מתווך את ההרשאה דרך שרתי Google; הזן בו רק את פרטי הלקוח שיצרת לצורך החיבור הזה.

בהגדרות גלגל השיניים בחר `Use your own OAuth credentials`, הזן את Client ID ו־Client Secret, והשאר OAuth endpoints על Google. בחר Access type: Offline ו־Force prompt: Consent Screen. אל תיצור או תשתף קישור הכולל פרטי OAuth או טוקנים.

ב־Step 1 הזן רק את הרשאת `gmail.send` המופיעה לעיל ולחץ Authorize APIs. היכנס לחשבון Gmail שממנו יישלחו ההודעות ואשר את ההרשאה לאחר בדיקת שם הפרויקט וההרשאה. ב־Step 2 לחץ Exchange authorization code for tokens. שמור את Refresh token באופן פרטי. אין צורך לבצע בקשת API ב־Step 3.

חשוב להשתמש בלקוח שלך: Google מציינת שטוקנים של לקוח ברירת המחדל של Playground מבוטלים לאחר 24 שעות.

## 5. שמירה מקומית

בטרמינל הפרויקט הרץ:

```
npm run mail:setup:gmail:oauth
```

הזן את כתובת חשבון השליחה, Client ID, Client Secret ו־Refresh Token. שני הערכים הסודיים מוסתרים בהקלדה. הפקודה שומרת את ההגדרות ב־`.env.local` בהרשאות פרטיות, משאירה הגדרות אחרות ובוחרת `MAIL_PROVIDER=gmail`. היא אינה מתחברת ל־Google ואינה שולחת הודעה.

## 6. אימות ושליחה בפועל

הרץ `npm run mail:check`. הצלחה במסלול OAuth מוכיחה שניתן לרענן טוקן בלבד; היא אינה מוכיחה הגעת מייל או שליחה. הפעל מחדש את האפליקציה ובקש איפוס סיסמה עבור חשבון בדיקה שבבעלותך. ודא שהמייל הגיע, שהקישור נפתח ושאפשר לשנות את הסיסמה. בדוק גם ספאם. לא נשלח מייל אמיתי במהלך הכנת הקוד.

## לפני פתיחה לציבור

במצב External / Testing, טוקן רענון הכולל הרשאת Gmail פג לאחר שבעה ימים לפי Google. מצב זה מתאים לבדיקה ראשונית בלבד. לפני שימוש רציף יש להסדיר את מצב הפרסום ואת דרישות האימות ש־Google מציגה לפרויקט; מעבר למצב פרסום אינו אישור אוטומטי ולא הושלם כאן תהליך אימות.

בשרת הציבורי יש להגדיר במנהל הסודות `MAIL_PROVIDER`, `MAIL_FROM`, `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, ואת כתובת האתר הציבורית ב־`BETTER_AUTH_URL`. אין להעלות `.env.local` למאגר. חשבון השליחה צריך להיות אותו חשבון שנתן את ההרשאה. שינוי סיסמת Google או ביטול הרשאה עלולים לבטל טוקן רענון. אם בדיקת הרענון נכשלת, נדרש לבדוק את ההרשאה לפני ניסיון שליחה נוסף.

## מקורות ראשוניים

נבדקו ב־2026-10-04:

- [הרשאות Gmail](https://developers.google.com/workspace/gmail/api/auth/scopes)
- [OAuth Playground והגדרות לקוח משלך](https://developers.google.com/oauthplayground/)
- [OAuth ורענון טוקנים, כולל תפוגה במצב Testing](https://developers.google.com/identity/protocols/oauth2)
- [שליחת MIME באמצעות Gmail API](https://developers.google.com/workspace/gmail/api/guides/sending)
