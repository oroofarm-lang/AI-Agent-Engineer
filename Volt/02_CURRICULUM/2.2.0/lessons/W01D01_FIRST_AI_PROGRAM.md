---
generated: true
schema_version: 1
kind: "lesson"
entity_id: "W01D01_FIRST_AI_PROGRAM"
curriculum_version: "2.2.0"
lesson_id: "W01D01_FIRST_AI_PROGRAM"
lesson_version: "2.2.0"
skill_ids: ["PYTHON","GIT","HTTP_APIS"]
source_ids: ["PYTHON_TUTORIAL","OPENAI_QUICKSTART","GIT_BOOK"]
prerequisite_lesson_ids: ["FND_01"]
source_sha256: "ebdaedb1bbdefa3124b6f1d5eb428771c98ee41122b8f4d29486aa183ce5cb60"
estimated_minutes: 180
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Automation-Engineer]]","[[01_AGENTS/Agent-Business-Discovery]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-CRM-Sales]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Paid-Media-Measurement]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-Voice-Audio]]","[[01_AGENTS/Orchestrator-Prime]]","[[02_CURRICULUM/2.2.0/exercises/W01D01_FIRST_AI_PROGRAM]]","[[02_CURRICULUM/2.2.0/lessons/FND_01]]","[[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[02_CURRICULUM/2.2.0/modules/CORE]]","[[02_CURRICULUM/2.2.0/skills/GIT]]","[[02_CURRICULUM/2.2.0/skills/HTTP_APIS]]","[[02_CURRICULUM/2.2.0/skills/PYTHON]]","[[02_CURRICULUM/2.2.0/sources/GIT_BOOK]]","[[02_CURRICULUM/2.2.0/sources/OPENAI_QUICKSTART]]","[[02_CURRICULUM/2.2.0/sources/PYTHON_TUTORIAL]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D01_FIRST_AI_PROGRAM]]","[[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP]]","[[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FIRST_AI_PROGRAM]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS]]","[[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS]]","[[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API]]"]
---

# תוכנית ה־AI הראשונה שלך

## המשימה

בשיעור זה תתחיל מתיקייה ריקה ותבנה תוכנית Python. התוכנית תקבל שאלה, תשלח אותה למודל ותציג את התשובה. בסיום תוכל להסביר היכן הקוד רץ, לאן הבקשה נשלחת ואיפה נשמר מפתח הגישה. למד בקצב שלך; אם השלמת את התרגיל והבנת אותו, אין צורך להמשיך רק כדי למלא את הזמן המתוכנן.

לתרגיל צריך Python 3, עורך טקסט וטרמינל — חלון שבו מקלידים פקודות למחשב. אתר הלמידה עצמו פועל בלי מפתח API, אבל התוכנית שתבנה שולחת בקשה אמיתית למודל. לכן צריך מפתח גישה לשירות (API key) ותקציב בחשבון שלך. את הקוד מריצים במחשב שלך; האתר אינו מריץ אותו או מבצע חיוב באופן אוטומטי.

## קודם מתרגלים

פתח טרמינל. שמור את קובצי הפרויקט בתיקייה נפרדת. הפקודות פועלות מתוך התיקייה שבה הטרמינל נמצא באותו רגע. ב־macOS או ב־Linux, הרץ את הפקודות הבאות:

```bash
mkdir first-ai-program
cd first-ai-program
python3 -m venv .venv
source .venv/bin/activate
python -m pip install openai
```

ב־Windows PowerShell השתמש ב־`py -m venv .venv` ואז ` .venv\Scripts\Activate.ps1`. אם הפעלת הסביבה חסומה, אפשר להריץ ישירות ` .venv\Scripts\python.exe` במקום `python`, בלי לשנות מדיניות אבטחה.

סביבה וירטואלית (Virtual environment) שומרת את חבילות הפרויקט בנפרד מחבילות של פרויקטים אחרים. חבילה היא אוסף של קוד מוכן שאפשר להתקין ולהשתמש בו.

צור קובץ בשם `.gitignore` לפני שמירת מידע סודי. הקובץ מגדיר אילו קבצים ותיקיות Git צריך להתעלם מהם:

```text
.venv/
.env
__pycache__/
```

צור מפתח גישה בחשבון ה־API שלך. הגדר אותו בשם `OPENAI_API_KEY` כמשתנה סביבה: ערך שהתוכנית יכולה לקרוא בזמן הריצה. השאר את המפתח מחוץ לקוד, לצילומי מסך ולאתר הלמידה.

בטרמינל אפשר להזין אותו בלי שיירשם בהיסטוריית הפקודות. ב־zsh שב־macOS, השתמש בפקודות הבאות:

```bash
read -s 'OPENAI_API_KEY?API key: '
export OPENAI_API_KEY
printf '\n'
read 'AI_MODEL?Model ID from your account: '
export AI_MODEL
```

הדוגמה הזו מיועדת ל־zsh. במערכת אחרת השתמש בהוראות משתני הסביבה בתיעוד הרשמי. בחר מזהה מודל שנתמך בחשבון שלך; איננו מניחים שלכל חשבון זמינים אותם מודלים. הגדר תקציב קטן בחשבון לפני הניסוי.

צור קובץ בשם `app.py`. נשתמש בערכת הפיתוח של השירות (SDK), שמספקת קוד לשליחת הבקשה. היא קוראת את המפתח ממשתנה הסביבה, והתוכנית קוראת את שם המודל שהגדרת:

```python
import os
from openai import OpenAI

question = input("Question: ").strip()
if not question:
    raise SystemExit("Please enter a question.")

client = OpenAI(timeout=30.0, max_retries=0)
result = client.responses.create(
    model=os.environ["AI_MODEL"],
    input=question,
)
print(result.output_text)
```

הרץ `python app.py` ושאל שאלה קצרה. אם התקבלה תשובה, החיבור הצליח בניסוי הזה. עדיין צריך לבדוק אם תוכן התשובה נכון. שמור את גרסת החבילות שבה השתמשת:

```bash
python -m pip freeze > requirements.txt
git init
git add app.py requirements.txt .gitignore
git status
git commit -m "Build first AI program"
```

בדוק ב־`git status` שהקבצים הנכונים בלבד נבחרו. אם Git מבקש שם ודוא״ל, הגדר אותם לפרויקט לפי הוראות ההתקנה של Git. אין צורך לפרסם את המאגר ברשת.

## המושגים

תוכנית **Python** מריצה את ההוראות במחשב שלך. **חבילה** מספקת קוד מוכן של מפתחים אחרים. **SDK** הוא ערכת פיתוח שמספקת דרך נוחה להשתמש בממשק השירות. **API** הוא הממשק שדרכו התוכנית שולחת בקשות ומקבלת תשובות. **HTTP** הוא הפרוטוקול להעברת הבקשה והתשובה מול השירות המרוחק. **המודל** מייצר את הפלט אצל ספק השירות; הוא אינו הקובץ `app.py`.

`input()` קורא טקסט מהמשתמש. משתנה שומר ערך. `os.environ` מאפשר לקרוא הגדרות של התהליך. `print()` מציג פלט. Git שומר גרסאות של קבצים שבחרת לעקוב אחריהם; הוא אינו מנהל סודות.

זוהי אפליקציית AI עם קריאה אחת. אין בה בחירת כלים או לולאת החלטות, ולכן אין צורך לקרוא לה סוכן. קודם לומדים איך הבקשה נשלחת ואיך התשובה חוזרת. בהמשך מוסיפים כלים והחלטות מורכבות יותר.

## איך זה עובד

```text
Terminal → Python app → SDK → HTTPS request → Model service
Terminal ← print()    ← SDK ← HTTPS response ← Model service
```

הפרד בין שלושה מקומות: קובצי הקוד בדיסק, משתני הסביבה של התהליך, והשירות המרוחק. המפתח מאפשר לשירות לזהות את החשבון; הוא לא הופך את המחשב שלך למודל.

## להעמקה

נסה להסביר למה `python -m pip` מתקין חבילות עבור מפרש ה־Python שבחרת. הרץ `python -c "import sys; print(sys.executable)"` לפני ואחרי הפעלת הסביבה הווירטואלית ובדוק את ההבדל.

זמן ההמתנה לתשובה כולל את העברת המידע ברשת ואת עיבוד הבקשה אצל הספק. עצירת ההמתנה במחשב שלך אינה מבטיחה שהחישוב אצל הספק נעצר. בקוד הגדרנו זמן המתנה מרבי (timeout) וביטלנו ניסיונות שליחה חוזרים, כדי שיהיה קל יותר לעקוב אחר מספר הבקשות בניסוי הראשון.

## מנסים, שוברים ומתקנים

בצע כל ניסוי בנפרד. שמור את הודעת השגיאה, אבל הסר ממנה מפתחות גישה או מידע סודי:

1. פתח טרמינל חדש בלי להגדיר `AI_MODEL`. מה נכשל, והאם הבקשה כבר נשלחה?
2. הזן שאלה ריקה. ודא שהתוכנית עוצרת לפני יצירת הלקוח.
3. הגדר מזהה מודל שלא קיים. הפרד שגיאת שירות משגיאת Python מקומית.
4. הרץ את התוכנית מחוץ לסביבה הווירטואלית. אם החבילה חסרה, בדוק איזה מפרש Python מריץ את התוכנית לפני שתתקין אותה שוב.

לכל תקלה כתוב מה ציפית שיקרה, מה קרה בפועל ואיזו בדיקה עזרה לך לזהות את הגורם. בצע את התיקון הנדרש, החזר את ההגדרה התקינה והרץ שוב. אל תנסה ליצור שגיאות באמצעות פרסום מפתח או העמסת השירות.

## אתגר עצמאי

הוסף אפשרות לשאול שאלה נוספת עד שהמשתמש מקליד `exit`. דחה קלט ריק בלי לשלוח בקשה. תכנן קודם על נייר אילו צעדים חוזרים ומתי עוצרים. אם עדיין אינך מכיר לולאות, נסה לקרוא את הפרק הרלוונטי במדריך Python; יום 2 יעמיק בנושא.

אין צורך בספרייה לבניית סוכנים בשביל המשימה הזו. הסבר מדוע הקוד יכול להחליט מתי לעצור לפי כלל קבוע, בלי לבקש החלטה ממודל.

## בדיקת הבנה

סגור את הדוגמה ופתח תיקייה חדשה. שחזר סביבה, התקנה, קובץ תוכנית והגדרות בעזרת התיעוד בלבד. הצג:

- הרצה מוצלחת עם שאלה שבחרת ותיאור מסלול הבקשה.
- כשל מקומי אחד וכשל שירות אחד, עם דרך אבחון ותיקון.
- הסבר למה המפתח אינו נמצא במאגר ולמה תשובת מודל אינה בהכרח עובדה.
- הסבר ההבדל בין האפליקציה, ה־SDK והמודל.

שמור את הקוד ואת ההסבר כתיעוד של העבודה שביצעת. סימון שהתרגיל נבנה באתר מתעד את התרגול בלבד. אפשר לצרף את התיעוד לבדיקה המעשית שמתחת לשיעור. המחוון מציג את הקריטריונים להערכה. לאחר ההגשה, העבודה ממתינה לבדיקה; ההגשה אינה נבדקת באופן אוטומטי ואינה מקנה אישור שליטה בנושא (Mastery).

## מקורות

התחל מהמקורות הראשוניים:

- [Python Tutorial](https://docs.python.org/3/tutorial/) — מפרש, סביבות, תחביר ושליטה בזרימה.
- [OpenAI quickstart](https://developers.openai.com/api/docs/quickstart) — התקנת SDK, הגדרת מפתח וקריאת Responses.
- [Pro Git](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) — ניהול גרסאות ומאגר מקומי.

דפוס קריאת ה־API נבדק מול ה־quickstart בזמן הפיתוח, אך לא בוצעה הרצה בתשלום ולא אומת כל תוכן השיעור מקצה לקצה. לכן השיעור מסומן כטרם אומת. שמור אצלך את מזהה המודל וגרסת החבילה; בדוק מחדש את זמינות המודל ואת התאמתו לפני שימוש עתידי.

## מה כדאי לתעד

כתוב בהערות שמתחת לשיעור: מה בנית, מה נכשל, למה זה קרה, איזו החלטה קיבלת, אילו עלויות או מגבלות קיבלת על עצמך, ומה תשנה בניסוי הבא. צרף תוצאה שאפשר לבדוק, למשל הודעת שגיאה ללא מידע סודי. ההערות נשמרות בחשבון שלך במסד הנתונים של האפליקציה וניתנות לייצוא.


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
- [[02_CURRICULUM/2.2.0/exercises/W01D01_FIRST_AI_PROGRAM|התרגול: תוכנית ה־AI הראשונה שלך]] — תרגול מתוך השיעור
- [[02_CURRICULUM/2.2.0/lessons/FND_01|מפת עולם ה־AI]] — סדר לימוד
- [[02_CURRICULUM/2.2.0/lessons/FND_01|מפת עולם ה־AI]] — תלות בין שיעורים
- [[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|Python לבוני סוכנים · חלק א׳]] — סדר לימוד
- [[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|Python לבוני סוכנים · חלק א׳]] — תלות בין שיעורים
- [[02_CURRICULUM/2.2.0/modules/CORE|פרק 1: יסודות · פרק חובה]] — שיעור בפרק
- [[02_CURRICULUM/2.2.0/skills/GIT|Git]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/skills/HTTP_APIS|HTTP/APIs]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/skills/PYTHON|Python]] — מיומנות בשיעור
- [[02_CURRICULUM/2.2.0/sources/GIT_BOOK|Pro Git]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/OPENAI_QUICKSTART|OpenAI quickstart]] — מקור לשיעור
- [[02_CURRICULUM/2.2.0/sources/PYTHON_TUTORIAL|Python tutorial]] — מקור לשיעור
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/QUIZ_W01D01_FIRST_AI_PROGRAM|בדיקת הבנה: מה תפקידו של ה־SDK בתוכנית app.py שבשיעור?]] — בדיקת הבנה
- [[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP|לפני שמגישים · שאלה קצרה לתרגול]] — תרגול לפני הגשה
- [[03_PRACTICAL_PROOFS/2.2.0/rubrics/ASSESS_FIRST_AI_PROGRAM|מתיקייה ריקה לתוכנית עובדת]] — הוכחה מעשית
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_CHANGELOG|OpenAI API changelog]] — שיעור קשור למעקב
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_MODELS|OpenAI model catalog]] — שיעור קשור למעקב
- [[04_AUTOMATIONS_AND_APIS/knowledge-sources/OPENAI_NEWS|OpenAI News]] — שיעור קשור למעקב
- [[04_AUTOMATIONS_AND_APIS/technologies/OPENAI_API|OpenAI API and models]] — טכנולוגיה בשיעור
