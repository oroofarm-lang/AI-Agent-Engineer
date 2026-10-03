---
generated: true
schema_version: 1
kind: "exercise"
entity_id: "EXERCISE_W01D03_PYTHON_FOR_AGENT_BUILDERS_II"
curriculum_version: "2.2.0"
lesson_id: "W01D03_PYTHON_FOR_AGENT_BUILDERS_II"
source_sections: ["Build First","Failure Lab","Challenge","Mastery Check"]
source_sha256: "f9b1a391dc916bc4588a90a048bea15b1986085c3375d4e1c426c13b31891f8c"
related: ["[[02_CURRICULUM/2.2.0/lessons/W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/assets/PYTHON_II_LAB]]"]
---

# התרגול: Python לבוני סוכנים · חלק ב׳

הקטעים הבאים לקוחים מן השיעור שפורסם. אין כאן תוצאה של הרצת קוד או בדיקה אוטומטית.

## קודם מתרגלים

כתוב פונקציות save_messages ו־load_messages לשמירה ולטעינה של שיחה. בכל הודעה שמור role ו־content. כתוב בקידוד UTF-8 ובדוק את סוגי הערכים. החזר שיחה ריקה רק אם הקובץ אינו קיים.

1. פתח תיקיית עבודה נפרדת. כתוב בקובץ ההסבר README מה התהליך מקבל, מה הוא מחזיר ומי רשאי להפעיל אותו.
2. בחר מקרה קטן לתרגול, למשל עסק שמקבל פנייה מלקוח. השתמש בשם בדוי ובנתוני בדיקה. בשלב הבנייה, השאר את המערכת בסביבת תרגול ואל תחבר נתונים של לקוח אמיתי.
3. הגדר את התוצאה המצופה לפני ההרצה: רשומה, מסמך, שינוי מצב או פעולה. הפרד בין תוצאה שמודל הציע לבין פעולה שהקוד ביצע.
4. ממש תחילה מקרה אחד שבו כל השלבים מצליחים. במשימת אפיון, הכן תרשים וטבלת החלטות; אין צורך לכתוב קוד שאינו נדרש למשימה. אם התרגיל דורש שירות חיצוני, בדוק בתיעוד את דרישות הגישה וההרשאות ורשום באיזו גרסת חבילה השתמשת.
5. שמור קלט, פלט ומזהה הרצה. השווה את התוצאה לציפייה והראה היכן היא תואמת והיכן לא.


### דוגמה מקומית

הדוגמה הבאה מציגה את המנגנון בלי לשלוח בקשה למודל. העתק אותה לקובץ `lab.py`, הרץ `python3 lab.py`, ואחר כך בצע את מעבדת הכשל. הפלט הקבוע בדוגמה נכתב לצורך ההדגמה; הוא אינו תשובה שנוצרה בידי מודל.

```python
"""Validated conversation persistence. Corrupt input is never silently erased."""
import json
import os
from pathlib import Path
from tempfile import NamedTemporaryFile


def validate(messages: object) -> list:
    if not isinstance(messages, list):
        raise ValueError('conversation must be a list')
    for message in messages:
        if not isinstance(message, dict):
            raise ValueError('message must be an object')
        if message.get('role') not in ('user', 'assistant'):
            raise ValueError('unsupported role')
        if not isinstance(message.get('content'), str):
            raise ValueError('content must be a string')
    return messages


def load_messages(path: Path) -> list:
    try:
        content = path.read_text(encoding='utf-8')
    except FileNotFoundError:
        return []
    return validate(json.loads(content))


def save_messages(path: Path, messages: list) -> None:
    validate(messages)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with NamedTemporaryFile(mode='w', encoding='utf-8', dir=path.parent,
                                delete=False) as handle:
            temporary = Path(handle.name)
            json.dump(messages, handle, ensure_ascii=False, indent=2)
        os.replace(temporary, path)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


if __name__ == '__main__':
    from tempfile import TemporaryDirectory
    with TemporaryDirectory() as directory:
        path = Path(directory) / 'conversation.json'
        save_messages(path, [{'role': 'user', 'content': 'שלום'}])
        print(load_messages(path))
```

**מבחן קבלה:** אדם אחר יכול לעקוב אחר התיעוד, להריץ את התרגיל ולבדוק את התוצר בלי לנחש למה התכוונת. חיבור לשירות חיצוני והפעלת פעולות בתשלום דורשים עבודה בסביבת התרגול שלך; אתר הלמידה אינו מבצע אותם.

### בודקים שהמידע נשאר לאחר סגירה

שמור שתי הודעות ופתח את קובץ ה־JSON בעורך. מצא את הרשימה, המילונים והשדות. סגור את התוכנית והפעל אותה מחדש. טען את ההודעות: הנתונים שבזיכרון התוכנית אבדו, אך הנתונים שבקובץ נשמרו.

כתוב בקובץ את המילה `broken` ונסה לטעון אותו. בדוק שהשגיאה מוצגת ושהקובץ המקורי אינו נדרס.

לאחר מכן כתוב JSON תקין שבו content מכיל מספר. כאן הפענוח יכול להצליח, אך בדיקת המבנה צריכה לזהות את הסוג השגוי.

צור מחלקה פשוטה `Conversation` שמחזיקה רשימת הודעות. לפני שמירה המר אותה במפורש למבנה נתונים שמתאים ל־JSON.

## מנסים, שוברים ומתקנים

**התקלה שתיצור לצורך הבדיקה:** נסה לטעון קובץ פגום, ואז JSON שמכיל אובייקט במקום רשימה. בדוק שהקובץ המקורי נשמר גם כשהטעינה נכשלת.

שמור עותק שעובד, ואז צור מקרה אחד שאמור להיכשל. רשום מה הזנת, מה ציפית לקבל, מה קרה בפועל ואיזו הודעת שגיאה הופיעה. מצא את השלב הראשון שבו התוצאה הייתה שונה מהציפייה. אם הבעיה קשורה להרשאה, לרשת או לנתונים, שינוי ההנחיה למודל אינו פותר אותה כשלעצמו.

תקן את הגורם לתקלה והרץ שוב את המקרה שנכשל. בדוק גם שהמקרה שעבד קודם עדיין מצליח. שמור את הבדיקה כדי שתוכל להריץ אותה לאחר שינויים נוספים; זו בדיקת רגרסיה. צרף תוצאה שמראה שהתיקון עבד בפועל.

## אתגר עצמאי

תן לכל שיחה מזהה והוסף אפשרות לבחור איזו שיחה לטעון.

פתור את האתגר בלי להעתיק את הפתרון הקודם. אפשר להיעזר בתיעוד הרשמי. צרף לתוצר הסבר להחלטה אחת ומקרה אחד שהפתרון שלך עדיין אינו מטפל בו. לפרויקט המסכם אין פתרון מלא להעתקה, כדי שתוכל לתרגל עבודה עצמאית.

## בדיקת הבנה

הכן שלושה סוגי תיעוד לבדיקה המעשית שמתחת לשיעור. המחוון הוא רשימת הקריטריונים שלפיהם בוחנים את העבודה:

- **בנייה:** כתוב פונקציות save_messages ו־load_messages לשמירה ולטעינה של שיחה. בכל הודעה שמור role ו־content. כתוב בקידוד UTF-8 ובדוק את סוגי הערכים. החזר שיחה ריקה רק אם הקובץ אינו קיים. צרף תוצר, קלט ופלט או טבלת החלטות שאפשר לבדוק.
- **אבחון:** נסה לטעון קובץ פגום, ואז JSON שמכיל אובייקט במקום רשימה. בדוק שהקובץ המקורי נשמר גם כשהטעינה נכשלת. צרף מה קרה לפני התיקון ומה השתנה אחריו.
- **יישום במקרה חדש:** תן לכל שיחה מזהה והוסף אפשרות לבחור איזו שיחה לטעון. הסבר מדוע הפתרון מתאים ומה עדיין אינו פותר.

שאל את עצמך: האם אני יכול להסביר מה עושה כל רכיב? האם הבדיקה יכולה לזהות טעות גם כשהפלט נראה משכנע? האם אדם אחר יכול לבדוק את התוצאה? סימון שהתרגיל נבנה ושמירת תוצאות הבדיקות מתעדים את העבודה שביצעת. הם אינם ציון מקצועי ואינם מעידים כשלעצמם על שליטה בנושא.

## קשרים במפת הידע

- [[02_CURRICULUM/2.2.0/lessons/W01D03_PYTHON_FOR_AGENT_BUILDERS_II|Python לבוני סוכנים · חלק ב׳]] — תרגול מתוך השיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D03_PYTHON_FOR_AGENT_BUILDERS_II|בדיקת הבנה: קובץ השיחה קיים, אבל תוכנו הוא הטקסט broken. כיצד צריך load_messages להגיב?]] — חיזוק התרגול
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II|הוכחה מעשית · Python לבוני סוכנים · חלק ב׳]] — ראיות מהתרגול
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_BUILD|תבנית טקסט: Python לבוני סוכנים · חלק ב׳ · BUILD]] — ארגון העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_DIAGNOSE|תבנית טקסט: Python לבוני סוכנים · חלק ב׳ · DIAGNOSE]] — ארגון העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II_TRANSFER|תבנית טקסט: Python לבוני סוכנים · חלק ב׳ · TRANSFER]] — ארגון העבודה
- [[04_AUTOMATIONS_AND_APIS/assets/PYTHON_II_LAB|תרגיל Python — חלק ב׳]] — קוד לתרגול
