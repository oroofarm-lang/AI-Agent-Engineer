---
generated: true
schema_version: 1
kind: "lesson"
entity_id: "W01D03_PYTHON_FOR_AGENT_BUILDERS_II"
curriculum_version: "2.2.0"
lesson_id: "W01D03_PYTHON_FOR_AGENT_BUILDERS_II"
lesson_version: "2.2.0"
skill_ids: ["PYTHON","GIT","HTTP_APIS"]
source_ids: ["PYTHON_JSON","PYTHON_TUTORIAL"]
prerequisite_lesson_ids: ["W01D02_PYTHON_FOR_AGENT_BUILDERS_I"]
source_sha256: "f9b1a391dc916bc4588a90a048bea15b1986085c3375d4e1c426c13b31891f8c"
estimated_minutes: 180
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-Voice-Audio]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS]]","[[02_CURRICULUM/2.2.0/modules/CORE]]","[[02_CURRICULUM/2.2.0/skills/GIT]]","[[02_CURRICULUM/2.2.0/skills/HTTP_APIS]]","[[02_CURRICULUM/2.2.0/skills/PYTHON]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_JSON]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_TUTORIAL]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[04_AUTOMATIONS_AND_APIS/assets/PYTHON_II_LAB]]"]
---

# Python לבוני סוכנים · חלק ב׳

## המשימה

בשיעור זה תעסוק בנושא ״Python לבוני סוכנים · חלק ב׳״. בנה תוצר שאפשר לבדוק והסבר מדוע בחרת בדרך העבודה שלך. התוצר יצטרף לתיק העבודות שלך בפרק ״יסודות ובנייה מאפס״.

**מטרת הבנייה:** כתוב פונקציות save_messages ו־load_messages לשמירה ולטעינה של שיחה. בכל הודעה שמור role ו־content. כתוב בקידוד UTF-8 ובדוק את סוגי הערכים. החזר שיחה ריקה רק אם הקובץ אינו קיים.

הקצה לתרגול עד 180 דקות. אם נושא בסיסי אינו ברור לך, חזור לשיעור הקודם שנדרש ליחידה זו והשלם את ההבנה לפני הבדיקה. זו חוברת תרגול מעשית: יש בה הסבר תמציתי, משימות ומקורות להעמקה. היא אינה מדריך שמציג את כל שלבי הפתרון או פתרון מוכן להעתקה.

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

## המושגים

JSON הוא פורמט לשמירת נתונים ולהעברתם בין תוכניות. אי אפשר לשמור בו כל אובייקט של Python בלי להמיר אותו למבנה מתאים. יש שלוש בעיות שונות לבדיקה: הקובץ אינו קיים, הטקסט בו אינו JSON תקין, או שהנתונים אינם בנויים כפי שהתוכנית מצפה. בכל מקרה צריך להציג את הסיבה ולשמור את הקובץ המקורי.

בדוק כיצד ההסבר מתאים לתוצר שלך. ציין אילו ערכים נקבעו בקוד, אילו נלקחו ממקור ואילו נוצרו או הוערכו בידי מודל. לכל סוג של ערך נדרשת בדיקה מתאימה. גם ערך שמודל כתב בשדה מובנה עלול להיות שגוי.

### שומרים שיחה בקובץ

`import json` טוען מודול מהספרייה הסטנדרטית של Python. `json.loads` ממיר טקסט JSON לנתוני Python, ו־`json.dump` כותב נתונים לקובץ. JSON תומך באובייקטים, במערכים, במחרוזות, במספרים, בערכים בוליאניים וב־null. פונקציה או מחלקה אינן נשמרות כך מעצמן; צריך להמיר אותן לנתונים מתאימים.

חריגה היא מצב שהתוכנית אינה יכולה להמשיך ממנו בדרך הרגילה. `try` ו־`except` מאפשרים לטפל בחריגה מסוימת. קובץ חסר הוא מצב שונה מקובץ שקיים אך אין הרשאה לקרוא אותו.

גם טקסט JSON תקין יכול להכיל מבנה לא מתאים. `{}` מתפענח, אבל אינו רשימת הודעות. לכן קודם מפענחים את הטקסט, ואז בודקים אם הנתונים מתאימים למה שהתוכנית צריכה.

`with` סוגר את הקובץ גם אם מתרחשת חריגה. `Path` מייצג נתיב לקובץ, ו־`encoding='utf-8'` קובע את הקידוד. בדוגמה כותבים קודם לקובץ זמני באותה תיקייה. רק לאחר כתיבה תקינה מחליפים את קובץ היעד.

הדוגמה אינה מסד נתונים שמטפל בעדכונים מקבילים. אין להציג אותה כפתרון לשני תהליכים שכותבים את אותה שיחה בו־זמנית.

## איך זה עובד

```text
Input → Contract check → Work / model proposal → Result check → Evidence
                                    ↓ failure
                             Stop / review / recover
```

התאם את התרשים לתרגיל: כתוב בכל תיבה את שם הרכיב שמבצע את השלב. לפני שינוי במערכת חיצונית, הוסף בדיקת הרשאה; אחרי השינוי, בדוק מה בוצע בפועל. אם אין שינוי במערכת חיצונית, השאר רק את השלבים הדרושים.

## להעמקה

### בודקים חלק קטן לפני שבונים מערכת

בפנייה של לקוח יש טקסט. המודל יכול לבקש lookup_product עם מזהה מוצר, והכלי יכול להחזיר מחיר מהקטלוג. אלו שלושה מבנים שונים: קלט המשתמש, בקשת הכלי והתוצאה. מגדירים לכל אחד את השדות ומה הם אומרים. בדיקת JSON אינה מוכיחה שהמחיר נכון, והצלחת הכלי אינה מוכיחה שהמודל השתמש במחיר נכון.

לפני חיבור מודל, כתוב מה צריך לקרות בפנייה תקינה ובפנייה שחסר בה מידע. במקום מודל השתמש בהדמיה שמחזירה החלטות קבועות. כך בודקים את הקוד שמנהל את הפעולות. אחר כך, בחיבור למודל אמיתי, שומרים את תשובותיו ומשווים לתוצאה הצפויה. אלו שתי בדיקות שונות.

כתוב ב־README איך להריץ, באילו גרסאות השתמשת, אילו דוגמאות נבדקו ומה עדיין מוגבל. בנה את החלק שהשיעור מבקש והסבר אותו. אין צורך לבנות מערכת שלמה כדי ללמוד תנאי או פונקציה אחת.

חקור החלטה אחת לעומק: מה תצטרך לשנות אם כמות הנתונים תגדל פי עשרה, אם מקור מידע לא יהיה זמין או אם אדם אחר יקבל אחריות על התהליך? השווה בין שתי דרכי פתרון. לכל דרך כתוב על איזו הנחה היא נשענת, והצע בדיקה שתעזור לבחור ביניהן. מספרים שנבחרו לתרגיל הם הנחות עבודה; הם אינם הבטחה לתוצאות אצל לקוח.

פתח את המקור המקושר וחפש את ההסבר הנוגע להחלטה שלך. רשום מתי קראת אותו, באיזו גרסת תוכנה השתמשת ומה היה שונה בין התיעוד לתוצאה שקיבלת. אם אתה משתמש בשירות חיצוני, בדוק בחשבון שלך שהמודל או התכונה זמינים ומהן מגבלות המסלול שלך.

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

## מקורות

- [Python JSON module](https://docs.python.org/3/library/json.html)
- [Python tutorial](https://docs.python.org/3/tutorial/)

המקורות הבאים מסבירים את הכלים והמנגנונים שנלמדו. בחר מקור אחד וקרא את החלק שמתאים לתרגיל שלך. נסה למצוא בו הסבר להחלטה שקיבלת.

## מה כדאי לתעד

תעד מה בנית, מה מדדת, מה נכשל ואיזה שינוי ביצעת. הפרד בין ממצא מההרצה לבין השערה. לפני מסירה ללקוח, רשום את הגרסה שנבדקה ומגבלה אחת של הפתרון.

ההערות והראיות נשמרות בחשבון שלך במסד הנתונים של האפליקציה וניתנות לייצוא. השאר מפתחות גישה, סיסמאות ומידע אישי של לקוחות מחוץ להערות. התוצר שאליו מכוון הפרק: תוכנית AI קטנה ותהליך קליטת פניות, עם בדיקת נתונים, טיפול בשגיאות ותיעוד הבדיקות.


## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Automation-Engineer|אוטומציה וחיבור מערכות]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Business-Discovery|אפיון שירות ופרויקט עסקי]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — מומחיות בשיעור
- [[01_AGENTS/Agent-CRM-Sales|לקוחות, מכירות ושירות]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Paid-Media-Measurement|פרסום ומדידה]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — מומחיות בשיעור
- [[01_AGENTS/Agent-Voice-Audio|קול, תמלול ושיחה]] — מומחיות בשיעור
- [[01_AGENTS/Orchestrator-Prime|תיאום צוות ההדרכה]] — מומחיות בשיעור
- [[02_CURRICULUM/2.2.0/exercises/W01D03_PYTHON_FOR_AGENT_BUILDERS_II|התרגול: Python לבוני סוכנים · חלק ב׳]] — תרגול מתוך השיעור
- [[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|Python לבוני סוכנים · חלק א׳]] — סדר לימוד
- [[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|Python לבוני סוכנים · חלק א׳]] — תלות בין שיעורים
- [[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS|HTTP וממשקי API]] — סדר לימוד
- [[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS|HTTP וממשקי API]] — תלות בין שיעורים
- [[02_CURRICULUM/2.2.0/modules/CORE|פרק 1: יסודות · פרק חובה]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/skills/GIT|Git]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/skills/HTTP_APIS|HTTP/APIs]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/skills/PYTHON|Python]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/sources/PYTHON_JSON|Python JSON module]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/PYTHON_TUTORIAL|Python tutorial]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D03_PYTHON_FOR_AGENT_BUILDERS_II|בדיקת הבנה: קובץ השיחה קיים, אבל תוכנו הוא הטקסט broken. כיצד צריך load_messages להגיב?]] — בדיקת הבנה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W01D03_PYTHON_FOR_AGENT_BUILDERS_II|הוכחה מעשית · Python לבוני סוכנים · חלק ב׳]] — הוכחה מעשית
- [[04_AUTOMATIONS_AND_APIS/assets/PYTHON_II_LAB|תרגיל Python — חלק ב׳]] — קובץ עזר לשיעור
