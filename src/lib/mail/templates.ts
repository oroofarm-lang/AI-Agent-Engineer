export type AccountEmailKind = 'reset' | 'verification' | 'welcome';

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
  );
}

/** Inline styles and table layout also work in email clients without web fonts or scripts. */
export function accountEmail(kind: AccountEmailKind, url: string, name?: string) {
  const target = new URL(url);
  if (!['http:', 'https:'].includes(target.protocol)) throw new Error('INVALID_EMAIL_URL');
  const copy = {
    reset: {
      subject: 'איפוס הסיסמה שלך · Agent Engineer',
      title: 'חוזרים למסלול',
      body: 'קיבלנו בקשה לאיפוס הסיסמה שלך. לחיצה על הכפתור תפתח עמוד שבו אפשר לבחור סיסמה חדשה.',
      action: 'בחירת סיסמה חדשה',
      note: 'לא ביקשת לאפס סיסמה? אפשר להתעלם מההודעה. הסיסמה שלך תישאר ללא שינוי. אין להעביר את הקישור לאחרים.',
      stage: 'חוזרים ללמוד',
    },
    verification: {
      subject: 'ברוכים הבאים! נשאר רק לאמת את כתובת המייל · Agent Engineer',
      title: 'המסע שלך מתחיל כאן',
      body: 'שמחים שהצטרפת! בקורס נלמד לבנות אוטומציות ומערכות AI, צעד אחר צעד, עם הסברים ותרגול מעשי. כדי להפעיל את החשבון שלך, צריך קודם לאמת את כתובת המייל.',
      action: 'אימות כתובת המייל',
      note: 'לא נרשמת לקורס? אפשר להתעלם מההודעה. אין להעביר את קישור האימות לאחרים.',
      stage: 'שלב ראשון · אימות כתובת המייל',
    },
    welcome: {
      subject: 'החשבון שלך מוכן. מתחילים ללמוד! · Agent Engineer',
      title: 'איזה כיף שהצטרפת',
      body: 'כתובת המייל שלך אומתה והחשבון מוכן. מתחילים בפרק היסודות, מתקדמים בקצב שלך ומתרגלים בכל שלב. ההתקדמות שלך נשמרת בחשבון, כדי שאפשר יהיה לחזור ולהמשיך מאותה נקודה.',
      action: 'לפרק היסודות',
      note: 'אפשר להתחיל בצעד קטן אחד. אין צורך לדעת הכול מראש.',
      stage: 'פרק ראשון · יסודות',
    },
  }[kind];
  const greeting = name?.trim() ? `שלום ${name.trim()},` : 'שלום,';
  const safeUrl = escapeHtml(target.href);
  const text = `Agent Engineer\n\n${greeting}\n${copy.title}\n\n${copy.body}\n\n${copy.action}: ${target.href}\n\n${copy.note}`;
  const html = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(copy.subject)}</title></head>
<body style="margin:0;padding:0;background:#f4efdf;color:#302f29;font-family:Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efdf;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;margin:0 auto;border:2px solid #756d59;background:#fffaf0;">
<tr><td style="padding:22px 28px;border-bottom:2px solid #756d59;background:#e5edde;"><span dir="ltr" style="font-family:Courier New,monospace;font-size:21px;font-weight:bold;color:#235e50;">[ BYTE ] &nbsp; AGENT ENGINEER</span></td></tr>
<tr><td dir="rtl" style="padding:28px;text-align:right;"><p style="margin:0 0 18px;font-size:13px;font-weight:bold;color:#675016;">${copy.stage}</p><p style="font-size:17px;line-height:1.8;">${escapeHtml(greeting)}</p><h1 style="margin:12px 0 18px;font-size:30px;line-height:1.4;color:#302f29;">${copy.title}</h1><p style="margin:0 0 26px;font-size:17px;line-height:1.9;">${copy.body}</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border:2px solid #235e50;background:#b8dfd0;"><a href="${safeUrl}" style="display:inline-block;padding:15px 24px;color:#173e35;font-size:17px;font-weight:bold;text-decoration:none;">${copy.action} ←</a></td></tr></table>
<p style="margin:26px 0 0;padding:16px;border:1px solid #b6a675;background:#f5ebc9;font-size:15px;line-height:1.8;color:#51431d;">${copy.note}</p>
<p style="margin:24px 0 8px;font-size:13px;line-height:1.7;">אם הקישור לא נפתח בלחיצה על הכפתור, אפשר להעתיק אותו לדפדפן:</p><a dir="ltr" href="${safeUrl}" style="display:block;word-break:break-all;overflow-wrap:anywhere;font-size:12px;line-height:1.7;color:#235e50;">${safeUrl}</a></td></tr>
<tr><td style="padding:18px 28px;border-top:2px solid #756d59;font-size:12px;line-height:1.8;color:#595343;">הודעת שירות עבור החשבון שלך ב־Agent Engineer. זו אינה הודעה שיווקית.</td></tr></table></td></tr></table></body></html>`;
  return { subject: copy.subject, text, html };
}
