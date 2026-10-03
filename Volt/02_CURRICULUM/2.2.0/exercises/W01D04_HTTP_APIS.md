---
generated: true
schema_version: 1
kind: "exercise"
entity_id: "EXERCISE_W01D04_HTTP_APIS"
curriculum_version: "2.2.0"
lesson_id: "W01D04_HTTP_APIS"
source_sections: ["Build First","Failure Lab","Challenge","Mastery Check"]
source_sha256: "c6740249f35f81a1b50588f32bbbcabc94f72911ca41275f0474e6fef31a633e"
related: ["[[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D04_HTTP_APIS]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D04_HTTP_APIS]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/assets/HTTP_LAB]]"]
---

# התרגול: HTTP וממשקי API

הקטעים הבאים לקוחים מן השיעור שפורסם. אין כאן תוצאה של הרצת קוד או בדיקה אוטומטית.

## קודם מתרגלים

קרא שני נתיבי שירות (endpoints) בשרת המעבדה המקומי. הבא את נתוני הלקוח והמוצר לאותו מבנה, עם השדות source ו־data. הגדר מראש זמן המתנה מרבי (timeout).

1. פתח תיקיית עבודה נפרדת. כתוב בקובץ ההסבר README מה התהליך מקבל, מה הוא מחזיר ומי רשאי להפעיל אותו.
2. בחר מקרה קטן לתרגול, למשל עסק שמקבל פנייה מלקוח. השתמש בשם בדוי ובנתוני בדיקה. בשלב הבנייה, השאר את המערכת בסביבת תרגול ואל תחבר נתונים של לקוח אמיתי.
3. הגדר את התוצאה המצופה לפני ההרצה: רשומה, מסמך, שינוי מצב או פעולה. הפרד בין תוצאה שמודל הציע לבין פעולה שהקוד ביצע.
4. ממש תחילה מקרה אחד שבו כל השלבים מצליחים. במשימת אפיון, הכן תרשים וטבלת החלטות; אין צורך לכתוב קוד שאינו נדרש למשימה. אם התרגיל דורש שירות חיצוני, בדוק בתיעוד את דרישות הגישה וההרשאות ורשום באיזו גרסת חבילה השתמשת.
5. שמור קלט, פלט ומזהה הרצה. השווה את התוצאה לציפייה והראה היכן היא תואמת והיכן לא.


### דוגמה מקומית

הדוגמה הבאה מציגה את המנגנון בלי לשלוח בקשה למודל. העתק אותה לקובץ `lab.py`, הרץ `python3 lab.py`, ואחר כך בצע את מעבדת הכשל. הפלט הקבוע בדוגמה נכתב לצורך ההדגמה; הוא אינו תשובה שנוצרה בידי מודל.

```python
"""A local HTTP lab: two endpoints, rate limit, bad JSON and a missing route."""
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from urllib.request import urlopen


class LabHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        routes = {'/customer': {'id': 'C1', 'name': 'Demo customer'},
                  '/product': {'id': 'P1', 'name': 'Demo product'}}
        if self.path in routes:
            status, body = 200, json.dumps(routes[self.path]).encode()
        elif self.path == '/limited':
            status, body = 429, b'{"error":"rate_limited"}'
        elif self.path == '/invalid':
            status, body = 200, b'not-json'
        else:
            status, body = 404, b'{"error":"not_found"}'
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        if status == 429:
            self.send_header('Retry-After', '1')
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass


def fetch(base: str, endpoint: str) -> dict:
    with urlopen(base + endpoint, timeout=2) as response:
        data = json.loads(response.read().decode('utf-8'))
    if not isinstance(data, dict):
        raise ValueError('expected JSON object')
    return {'source': endpoint, 'data': data}


if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 0), LabHandler)
    worker = Thread(target=server.serve_forever, daemon=True)
    worker.start()
    try:
        base = f'http://127.0.0.1:{server.server_port}'
        print(fetch(base, '/customer'))
        print(fetch(base, '/product'))
    finally:
        server.shutdown()
        server.server_close()
        worker.join()
```

**מבחן קבלה:** אדם אחר יכול לעקוב אחר התיעוד, להריץ את התרגיל ולבדוק את התוצר בלי לנחש למה התכוונת. חיבור לשירות חיצוני והפעלת פעולות בתשלום דורשים עבודה בסביבת התרגול שלך; אתר הלמידה אינו מבצע אותם.

### מוסיפים נתיב ובודקים תגובות

הרץ את הדוגמה ובדוק שבתוצאות מופיעים ערכים שונים בשדה source. המחשב בוחר יציאה פנויה לשרת, והשרת נעצר בסוף הניסוי.

הוסף נתיב `/order` שמחזיר מזהה הזמנה וסכום. קרא אותו דרך פונקציית fetch הקיימת.

בדוק בנפרד את `/missing`, את `/limited` ואת `/invalid`. לכל אחד כתוב היכן נכשל הטיפול: בקבלת תגובת HTTP, בפענוח או בבדיקת מבנה הנתונים.

בדוק את כותרת Retry-After בתגובה שבה השרת מגביל בקשות. לפני הוספת ניסיון חוזר (retry), קבע כמה ניסיונות מותר לבצע ומתי עוצרים.

## מנסים, שוברים ומתקנים

**התקלה שתיצור לצורך הבדיקה:** בדוק בנפרד 404, 429 ותגובה שאינה JSON. כתוב אם הבעיה נוצרה בתקשורת, בתגובת השירות או בנתונים.

שמור עותק שעובד, ואז צור מקרה אחד שאמור להיכשל. רשום מה הזנת, מה ציפית לקבל, מה קרה בפועל ואיזו הודעת שגיאה הופיעה. מצא את השלב הראשון שבו התוצאה הייתה שונה מהציפייה. אם הבעיה קשורה להרשאה, לרשת או לנתונים, שינוי ההנחיה למודל אינו פותר אותה כשלעצמו.

תקן את הגורם לתקלה והרץ שוב את המקרה שנכשל. בדוק גם שהמקרה שעבד קודם עדיין מצליח. שמור את הבדיקה כדי שתוכל להריץ אותה לאחר שינויים נוספים; זו בדיקת רגרסיה. צרף תוצאה שמראה שהתיקון עבד בפועל.

## אתגר עצמאי

הוסף נתיב שירות (endpoint) חדש והסבר את הבקשה ואת התגובה בלי להסתמך על SDK.

פתור את האתגר בלי להעתיק את הפתרון הקודם. אפשר להיעזר בתיעוד הרשמי. צרף לתוצר הסבר להחלטה אחת ומקרה אחד שהפתרון שלך עדיין אינו מטפל בו. לפרויקט המסכם אין פתרון מלא להעתקה, כדי שתוכל לתרגל עבודה עצמאית.

## בדיקת הבנה

הכן שלושה סוגי תיעוד לבדיקה המעשית שמתחת לשיעור. המחוון הוא רשימת הקריטריונים שלפיהם בוחנים את העבודה:

- **בנייה:** קרא שני נתיבי שירות (endpoints) בשרת המעבדה המקומי. הבא את נתוני הלקוח והמוצר לאותו מבנה, עם השדות source ו־data. הגדר מראש זמן המתנה מרבי (timeout). צרף תוצר, קלט ופלט או טבלת החלטות שאפשר לבדוק.
- **אבחון:** בדוק בנפרד 404, 429 ותגובה שאינה JSON. כתוב אם הבעיה נוצרה בתקשורת, בתגובת השירות או בנתונים. צרף מה קרה לפני התיקון ומה השתנה אחריו.
- **יישום במקרה חדש:** הוסף נתיב שירות (endpoint) חדש והסבר את הבקשה ואת התגובה בלי להסתמך על SDK. הסבר מדוע הפתרון מתאים ומה עדיין אינו פותר.

שאל את עצמך: האם אני יכול להסביר מה עושה כל רכיב? האם הבדיקה יכולה לזהות טעות גם כשהפלט נראה משכנע? האם אדם אחר יכול לבדוק את התוצאה? סימון שהתרגיל נבנה ושמירת תוצאות הבדיקות מתעדים את העבודה שביצעת. הם אינם ציון מקצועי ואינם מעידים כשלעצמם על שליטה בנושא.

## קשרים במפת הידע

- [[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS|HTTP וממשקי API]] — תרגול מתוך השיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D04_HTTP_APIS|בדיקת הבנה: שרת המעבדה החזיר קוד 200, אבל גוף התגובה הוא not-json. היכן עלולה הקריאה להיכשל?]] — חיזוק התרגול
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D04_HTTP_APIS|הוכחה מעשית · HTTP וממשקי API]] — ראיות מהתרגול
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_BUILD|תבנית טקסט: HTTP וממשקי API · BUILD]] — ארגון העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_DIAGNOSE|תבנית טקסט: HTTP וממשקי API · DIAGNOSE]] — ארגון העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D04_HTTP_APIS_TRANSFER|תבנית טקסט: HTTP וממשקי API · TRANSFER]] — ארגון העבודה
- [[04_AUTOMATIONS_AND_APIS/assets/HTTP_LAB|תרגיל HTTP]] — קוד לתרגול
