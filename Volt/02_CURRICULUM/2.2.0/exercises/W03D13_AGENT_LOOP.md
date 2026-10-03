---
generated: true
schema_version: 1
kind: "exercise"
entity_id: "EXERCISE_W03D13_AGENT_LOOP"
curriculum_version: "2.2.0"
lesson_id: "W03D13_AGENT_LOOP"
source_sections: ["Build First","Failure Lab","Challenge","Mastery Check"]
source_sha256: "3d978a2ce29c7839cde3fdd4643b3bd68fe534e5db4070ccf4eda393788c5468"
related: ["[[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D13_AGENT_LOOP]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D13_AGENT_LOOP]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_TRANSFER]]","[[04_AUTOMATIONS_AND_APIS/assets/AGENT_LOOP_LAB]]"]
---

# התרגול: לולאת סוכן ידנית

הקטעים הבאים לקוחים מן השיעור שפורסם. אין כאן תוצאה של הרצת קוד או בדיקה אוטומטית.

## קודם מתרגלים

ממש את הסדר GOAL → MODEL → VALIDATE → TOOL → OBSERVATION → MODEL בלי מסגרת פיתוח (Framework). שמור מזהה לכל קריאה, והגדר כמה צעדים מותר לבצע לפני עצירה.

1. פתח תיקיית עבודה נפרדת. כתוב בקובץ ההסבר README מה התהליך מקבל, מה הוא מחזיר ומי רשאי להפעיל אותו.
2. בחר מקרה קטן לתרגול, למשל עסק שמקבל פנייה מלקוח. השתמש בשם בדוי ובנתוני בדיקה. בשלב הבנייה, השאר את המערכת בסביבת תרגול ואל תחבר נתונים של לקוח אמיתי.
3. הגדר את התוצאה המצופה לפני ההרצה: רשומה, מסמך, שינוי מצב או פעולה. הפרד בין תוצאה שמודל הציע לבין פעולה שהקוד ביצע.
4. ממש תחילה מקרה אחד שבו כל השלבים מצליחים. במשימת אפיון, הכן תרשים וטבלת החלטות; אין צורך לכתוב קוד שאינו נדרש למשימה. אם התרגיל דורש שירות חיצוני, בדוק בתיעוד את דרישות הגישה וההרשאות ורשום באיזו גרסת חבילה השתמשת.
5. שמור קלט, פלט ומזהה הרצה. השווה את התוצאה לציפייה והראה היכן היא תואמת והיכן לא.


### דוגמה מקומית

הדוגמה הבאה מציגה את המנגנון בלי לשלוח בקשה למודל. העתק אותה לקובץ `lab.py`, הרץ `python3 lab.py`, ואחר כך בצע את מעבדת הכשל. הפלט הקבוע בדוגמה נכתב לצורך ההדגמה; הוא אינו תשובה שנוצרה בידי מודל.

```python
"""Provider-independent control loop. The scripted model is explicitly a test double."""
import json


def lookup_customer(customer_id: str) -> dict:
    if not isinstance(customer_id, str):
        raise ValueError('customer_id must be text')
    customers = {'C1': {'name': 'Demo customer', 'status': 'active'}}
    if customer_id not in customers:
        raise ValueError('customer not found')
    return customers[customer_id]


def run_agent(model, goal: str, max_steps: int = 4) -> dict:
    if not isinstance(max_steps, int) or isinstance(max_steps, bool) or not 1 <= max_steps <= 20:
        raise ValueError('max_steps must be 1..20')
    history = [{'role': 'user', 'content': goal}]
    tools = {'lookup_customer': lookup_customer}
    for step in range(max_steps):
        decision = model(list(history))
        if not isinstance(decision, dict):
            raise ValueError('model response must be an object')
        if decision.get('kind') == 'final':
            if not isinstance(decision.get('text'), str):
                raise ValueError('final text must be a string')
            return {'status': 'completed', 'result': decision['text'], 'trace': history}
        if decision.get('kind') != 'tool' or decision.get('name') not in tools:
            raise ValueError('unknown tool decision')
        arguments = decision.get('arguments')
        if not isinstance(arguments, dict) or set(arguments) != {'customer_id'}:
            raise ValueError('invalid tool arguments')
        try:
            result = tools[decision['name']](arguments['customer_id'])
            observation = {'ok': True, 'data': result}
        except ValueError as error:
            observation = {'ok': False, 'error': str(error)}
        history.append({'role': 'tool', 'step': step,
                        'name': decision['name'], 'content': json.dumps(observation)})
    return {'status': 'step_limit', 'result': None, 'trace': history}


def scripted_model(history):
    if len(history) == 1:
        return {'kind': 'tool', 'name': 'lookup_customer',
                'arguments': {'customer_id': 'C1'}}
    return {'kind': 'final', 'text': 'Demo: lookup finished; inspect the tool observation.'}


if __name__ == '__main__':
    print(json.dumps(run_agent(scripted_model, 'Look up customer C1'), indent=2))
```

**מבחן קבלה:** אדם אחר יכול לעקוב אחר התיעוד, להריץ את התרגיל ולבדוק את התוצר בלי לנחש למה התכוונת. חיבור לשירות חיצוני והפעלת פעולות בתשלום דורשים עבודה בסביבת התרגול שלך; אתר הלמידה אינו מבצע אותם.

## מנסים, שוברים ומתקנים

**התקלה שתיצור לצורך הבדיקה:** הזן רצף החלטות קבוע שבו אותו כלי מתבקש שוב בלי התקדמות. בדוק מתי הלולאה נעצרת.

שמור עותק שעובד, ואז צור מקרה אחד שאמור להיכשל. רשום מה הזנת, מה ציפית לקבל, מה קרה בפועל ואיזו הודעת שגיאה הופיעה. מצא את השלב הראשון שבו התוצאה הייתה שונה מהציפייה. אם הבעיה קשורה להרשאה, לרשת או לנתונים, שינוי ההנחיה למודל אינו פותר אותה כשלעצמו.

תקן את הגורם לתקלה והרץ שוב את המקרה שנכשל. בדוק גם שהמקרה שעבד קודם עדיין מצליח. שמור את הבדיקה כדי שתוכל להריץ אותה לאחר שינויים נוספים; זו בדיקת רגרסיה. צרף תוצאה שמראה שהתיקון עבד בפועל.

## אתגר עצמאי

הוסף עצירה עם המצב budget_exhausted ותעד איזו מגבלה הופעלה.

פתור את האתגר בלי להעתיק את הפתרון הקודם. אפשר להיעזר בתיעוד הרשמי. צרף לתוצר הסבר להחלטה אחת ומקרה אחד שהפתרון שלך עדיין אינו מטפל בו. לפרויקט המסכם אין פתרון מלא להעתקה, כדי שתוכל לתרגל עבודה עצמאית.

## בדיקת הבנה

הכן שלושה סוגי תיעוד לבדיקה המעשית שמתחת לשיעור. המחוון הוא רשימת הקריטריונים שלפיהם בוחנים את העבודה:

- **בנייה:** ממש את הסדר GOAL → MODEL → VALIDATE → TOOL → OBSERVATION → MODEL בלי מסגרת פיתוח (Framework). שמור מזהה לכל קריאה, והגדר כמה צעדים מותר לבצע לפני עצירה. צרף תוצר, קלט ופלט או טבלת החלטות שאפשר לבדוק.
- **אבחון:** הזן רצף החלטות קבוע שבו אותו כלי מתבקש שוב בלי התקדמות. בדוק מתי הלולאה נעצרת. צרף מה קרה לפני התיקון ומה השתנה אחריו.
- **יישום במקרה חדש:** הוסף עצירה עם המצב budget_exhausted ותעד איזו מגבלה הופעלה. הסבר מדוע הפתרון מתאים ומה עדיין אינו פותר.

שאל את עצמך: האם אני יכול להסביר מה עושה כל רכיב? האם הבדיקה יכולה לזהות טעות גם כשהפלט נראה משכנע? האם אדם אחר יכול לבדוק את התוצאה? סימון שהתרגיל נבנה ושמירת תוצאות הבדיקות מתעדים את העבודה שביצעת. הם אינם ציון מקצועי ואינם מעידים כשלעצמם על שליטה בנושא.

## קשרים במפת הידע

- [[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP|לולאת סוכן ידנית]] — תרגול מתוך השיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W03D13_AGENT_LOOP|בדיקת הבנה: מה צריך לקרות לאחר שהקוד מפעיל כלי בלולאת הסוכן?]] — חיזוק התרגול
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_W03D13_AGENT_LOOP|הוכחה מעשית · לולאת סוכן ידנית]] — ראיות מהתרגול
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_BUILD|תבנית טקסט: לולאת סוכן ידנית · BUILD]] — ארגון העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_DIAGNOSE|תבנית טקסט: לולאת סוכן ידנית · DIAGNOSE]] — ארגון העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W03D13_AGENT_LOOP_TRANSFER|תבנית טקסט: לולאת סוכן ידנית · TRANSFER]] — ארגון העבודה
- [[04_AUTOMATIONS_AND_APIS/assets/AGENT_LOOP_LAB|תרגיל לולאת סוכן]] — קוד לתרגול
