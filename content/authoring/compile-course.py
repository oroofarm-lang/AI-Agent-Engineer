"""Authoring utility. Never run on an already registered release without a version bump.
Builds practice workbooks from reviewed lesson packets; does not verify technical claims.
"""
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(os.environ['CURRICULUM_OUTPUT']).resolve()
RELEASE_VERSION = os.environ['COURSE_RELEASE_VERSION']
if not re.fullmatch(r'\d+\.\d+\.\d+', RELEASE_VERSION):
    raise ValueError('Invalid release version')
if OUT == (ROOT / 'content/curriculum').resolve():
    raise ValueError('Compile into staging, never into the live registered release')
BASE = ROOT / 'content/releases/1.1.0'

def read(name):
    return json.loads((BASE / name).read_text())

def write(name, value):
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')

def packets(name):
    rows = [line.split('|') for line in (ROOT / 'content/authoring' / name).read_text().splitlines() if line]
    if any(len(r) != 6 for r in rows):
        raise ValueError('Expected six fields in ' + name)
    return {r[0]: r[1:] for r in rows}

c = read('curriculum.json')
legacy = packets('legacy-lessons.tsv')
extra = packets('specializations.tsv')
by_day = {l['day']: l['id'] for l in c['lessons']}
def days(*values):
    return [by_day[d] for d in values]
def units(prefix, count):
    return [f'{prefix}_{i:02}' for i in range(1, count+1)]

# Topic ordering is separate from the original 80-day ordering. Stable IDs survive.
module_defs = [
 ('CORE', 'יסודות ובנייה מאפס', 'מכיר את סוגי המודלים ובונה תוכנת AI שמפעילה כלים ושומרת את מצב העבודה, לפני בחירת ספריית פיתוח.', 'ניסוי מצומצם לקליטת פניות, עם הגדרה של הנתונים המותרים, מגבלות ובדיקה של התוצאה המצופה.',
 ['FND_01']+days(1,2,3,4,5,6)+['FND_02']+days(7,8,9)+['FND_03']+days(10,11,12,13,14,15,21,22,31,51,58)+['FND_04'], []),
 ('AGENTS', 'סוכנים ותזמור', 'מבצע מחקר עם מקורות שאפשר לבדוק, משווה סביבות הרצה ובונה סוכנים ותהליכים שיכולים להימשך לאחר תקלה.', 'מערכת מחקר ותפעול שמחלקת משימות, מתעדת את שלבי הריצה, מבקשת אישורים ומתאוששת מתקלות.', days(*range(16,21),*range(36,49))+['AGT_01']+days(49,50,*range(71,76)), ['CORE']),
 ('KNOWLEDGE', 'זיכרון ומערכות ידע', 'בונה מדיניות זיכרון, חילוץ מסמכים וחיפוש המבוסס על מקורות והרשאות.', 'עוזר ידע שמציג קטעים תומכים ומודה כשאין מידע מספק.', days(*range(23,31)), ['CORE']),
 ('AUTOMATION', 'אוטומציה והטמעת מערכות', 'מחבר תהליכים ב־n8n וב־Make ולומד לטפל בכפילויות, אישורים, תקלות ועלויות.', 'תהליך מקבלת פנייה ועד לטיפול בה עם שחזור, יומן ומסירה מסודרת ללקוח.', days(32,33,34,35)+units('AUT',8), ['CORE']),
 ('QUALITY', 'איכות, אבטחה ובקרה', 'יוצר קבוצות של מקרי בדיקה, בוחן תיעוד ריצות ובודק ניסיונות תקיפה, הרשאות ופעולות הדורשות אישור.', 'תיק בדיקות שמציג תוצאות ומגבלות, ובודק שתיקונים אינם מחזירים תקלות שכבר נפתרו.', days(52,53,54,55,56,57,59,60), ['CORE']),
 ('PRODUCT', 'מוצר, שירות ופריסה', 'הופך סוכן לשירות עם API, עבודות רקע, ממשק משתמש, אחסון, ניטור ופריסה.', 'מוצר עם חשבונות, מעקב משימות, בדיקות ונתיב התאוששות.', days(*range(61,71)), ['CORE']),
 ('MARKETING', 'תוכן ושיווק עם AI', 'בונה תהליך מהגדרת מטרת התוכן ועד להכנת קמפיין, עם מקורות, עריכה, אישורים ומדידה.', 'ספריית תכנים וזרימת עבודה מבוקרת שאפשר למסור לצוות שיווק.', units('MKT',10), ['CORE','AUTOMATION']),
 ('ADS', 'פרסום ומדידה', 'מכין קמפיינים וחומרי פרסום, בודק מדידה ומפריד בין הצעה לשינוי לבין פעולה שמוציאה כסף.', 'קמפיין בסביבת בדיקה עם מגבלות תקציב, תצוגה מקדימה ואישור.', units('ADS',6), ['MARKETING']),
 ('CRM', 'מכירות ושירות לקוחות', 'מחבר קליטת פניות למערכת ניהול לקוחות (CRM), להודעות ולשירות, ובודק כפילויות והרשאות.', 'תהליך מקליטת פנייה ועד לטיפול בה, עם אחראי לטיפול, מדדים ויומן פעולות.', units('CRM',8), ['CORE','AUTOMATION']),
 ('WEB', 'אתרים וכלים פנימיים', 'מגדיר מסכים לפי צורך עסקי, בונה אותם ומחבר נתונים, ואז בודק נגישות והעלאה לסביבת הרצה.', 'כלי פנימי עם ממשק שמציג את מצב העבודה האמיתי.', units('WEB',6), ['PRODUCT']),
 ('VOICE', 'קול ומסמכים', 'בונה תמלול, עיבוד מסמכים ועוזר קולי עם השהיה, הפרעות ובקרה אנושית.', 'עוזר קולי או תהליך מסמכים עם עקבות ומבחני שגיאות.', units('VOI',6), ['CORE','AUTOMATION']),
 ('DATA', 'נתונים ומודלים מקומיים', 'משווה שאילתות נתונים, חיזוי ושימוש במודל שפה גדול (LLM), ובודק מתי כדאי להריץ מודל מקומי או להתאים מודל.', 'דוח בחירת פתרון עם נתונים, מדדי איכות ומגבלות משאבים.', units('DAT',4), ['CORE','QUALITY']),
 ('BUSINESS', 'הפיכת הידע לשירות', 'מגדיר ניסוי מצומצם עם לקוח, מתמחר לפי הנחות מפורשות ומכין הצעת עבודה, מסירה ותמיכה.', 'תיק שירות עם הצעת עבודה, גבולות אחריות ומבחני קבלה.', units('BIZ',6), ['CORE']),
 ('CAPSTONE', 'פרויקט גמר לעסק', 'מקבל בעיה עסקית ומנמק את החלטותיו, מהגדרת הצורך ועד להדגמה שכוללת תקלות מתוכננות.', 'פתרון מתועד שניתן לבדיקה עם לקוח, מבחני איכות ותוכנית תחזוקה.', days(76,77,78,79,80), ['BUSINESS','QUALITY','PRODUCT','AUTOMATION']),
]
modules = [dict(id=i,title=t,description=d,outcome=o,lessonIds=ls,prerequisiteModuleIds=ps) for i,t,d,o,ls,ps in module_defs]
assert sum(len(m['lessonIds']) for m in modules) == 139
owner = {lid:m for m in modules for lid in m['lessonIds']}

# Primary references. Dates are deliberately null: linking a document isn't a full audit.
source_defs = [
 ('PYTHON_TUTORIAL','Python tutorial','https://docs.python.org/3/tutorial/','Python'),
 ('PYTHON_JSON','Python JSON module','https://docs.python.org/3/library/json.html','Python'),
 ('PYTHON_SQLITE','Python SQLite module','https://docs.python.org/3/library/sqlite3.html','Python'),
 ('PYTHON_ASYNC','Python asyncio','https://docs.python.org/3/library/asyncio.html','Python'),
 ('OPENAI_QUICKSTART','OpenAI quickstart','https://developers.openai.com/api/docs/quickstart','OpenAI'),
 ('OPENAI_TOOLS','OpenAI function calling','https://developers.openai.com/api/docs/guides/function-calling','OpenAI'),
 ('OPENAI_SCHEMA','OpenAI structured outputs','https://developers.openai.com/api/docs/guides/structured-outputs','OpenAI'),
 ('OPENAI_AGENTS','OpenAI Agents SDK','https://openai.github.io/openai-agents-python/','OpenAI'),
 ('OPENAI_RUNTIME','OpenAI managed agent runtime','https://developers.openai.com/api/docs/guides/agents-api/overview','OpenAI'),
 ('OPENAI_DATA','OpenAI data controls','https://developers.openai.com/api/docs/guides/your-data','OpenAI'),
 ('OPENAI_AUDIO','OpenAI audio guide','https://developers.openai.com/api/docs/guides/audio','OpenAI'),
 ('OPENAI_IMAGE','OpenAI image generation','https://developers.openai.com/api/docs/guides/image-generation','OpenAI'),
 ('OPENAI_VIDEO','OpenAI video generation','https://developers.openai.com/api/docs/guides/video-generation','OpenAI'),
 ('OPENAI_DEPRECATIONS','OpenAI deprecations','https://developers.openai.com/api/docs/deprecations','OpenAI'),
 ('GIT_BOOK','Pro Git','https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control','Git'),
 ('HTTP_OVERVIEW','HTTP overview','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview','Mozilla'),
 ('POSTGRES_TRANSACTIONS','PostgreSQL transactions','https://www.postgresql.org/docs/current/tutorial-transactions.html','PostgreSQL'),
 ('ANTHROPIC_AGENTS','Building effective agents','https://www.anthropic.com/engineering/building-effective-agents','Anthropic'),
 ('ANTHROPIC_EVALS','Demystifying evals for AI agents','https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents','Anthropic'),
 ('MCP_SPEC','MCP specification','https://modelcontextprotocol.io/specification/2026-07-28','MCP'),
 ('A2A_SPEC','A2A specification','https://a2a-protocol.org/latest/specification/','A2A'),
 ('LANGGRAPH_STATE','LangGraph persistence','https://docs.langchain.com/oss/python/langgraph/persistence','LangChain'),
 ('N8N_APPROVALS','n8n human-in-the-loop','https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools','n8n'),
 ('N8N_EVALS','n8n quality metrics','https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality','n8n'),
 ('MAKE_AGENTS','Make AI agents','https://help.make.com/introduction-to-make-ai-agent-new','Make'),
 ('STRIPE_WEBHOOKS','Stripe webhooks','https://docs.stripe.com/webhooks','Stripe'),
 ('PROMPTFOO_TESTS','Promptfoo test cases','https://www.promptfoo.dev/docs/configuration/test-cases/','Promptfoo'),
 ('OWASP_GENAI','OWASP LLM risks','https://genai.owasp.org/llm-top-10/','OWASP'),
 ('SEARCH_SECURITY','Azure search security trimming','https://learn.microsoft.com/en-us/azure/search/search-security-trimming-for-azure-search','Microsoft'),
 ('FASTAPI','FastAPI tutorial','https://fastapi.tiangolo.com/tutorial/','FastAPI'),
 ('REACT','React learn','https://react.dev/learn','React'),
 ('NEXTJS','Next.js App Router','https://nextjs.org/docs/app','Vercel'),
 ('DOCKER','Docker overview','https://docs.docker.com/get-started/docker-overview/','Docker'),
 ('OTEL','OpenTelemetry signals','https://opentelemetry.io/docs/concepts/signals/','OpenTelemetry'),
 ('GOOGLE_ADS_TESTS','Google Ads API testing','https://developers.google.com/google-ads/api/docs/best-practices/testing','Google'),
 ('GOOGLE_AI_CONTENT','Google guidance on AI content','https://developers.google.com/search/docs/fundamentals/using-gen-ai-content','Google'),
 ('HUBSPOT_WEBHOOKS','HubSpot webhooks','https://developers.hubspot.com/docs/apps/developer-platform/add-features/configure-webhooks','HubSpot'),
 ('TWILIO_SANDBOX','WhatsApp sandbox','https://www.twilio.com/docs/whatsapp/sandbox','Twilio'),
 ('GEMINI_DOCUMENTS','Gemini document processing','https://ai.google.dev/gemini-api/docs/document-processing','Google'),
 ('OLLAMA_SCHEMA','Ollama structured outputs','https://docs.ollama.com/capabilities/structured-outputs','Ollama'),
 ('PEFT_LORA','PEFT LoRA','https://huggingface.co/docs/peft/en/package_reference/lora','Hugging Face'),
 ('GOOGLE_ML','Machine Learning Crash Course','https://developers.google.com/machine-learning/crash-course/llm','Google'),
 ('POWER_DLP','Power Platform data policies','https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention','Microsoft'),
 ('COPILOT','Copilot Studio generative actions','https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions','Microsoft'),
]
sources = [dict(id=i,title=t,url=u,type='specification' if i.endswith('_SPEC') else 'official-docs',vendor=v,lastVerified=None,lessonIds=[],technologyIds=[]) for i,t,u,v in source_defs]
smap = {s['id']:s for s in sources}
module_sources = {
 'CORE':['PYTHON_TUTORIAL','ANTHROPIC_AGENTS'], 'AGENTS':['ANTHROPIC_AGENTS','OPENAI_TOOLS'],
 'KNOWLEDGE':['SEARCH_SECURITY','ANTHROPIC_EVALS'], 'AUTOMATION':['N8N_APPROVALS','STRIPE_WEBHOOKS'],
 'QUALITY':['ANTHROPIC_EVALS','OWASP_GENAI'], 'PRODUCT':['FASTAPI','OTEL'],
 'MARKETING':['GOOGLE_AI_CONTENT','OPENAI_SCHEMA'], 'ADS':['GOOGLE_ADS_TESTS','ANTHROPIC_EVALS'],
 'CRM':['HUBSPOT_WEBHOOKS','STRIPE_WEBHOOKS'], 'WEB':['REACT','NEXTJS'],
 'VOICE':['OPENAI_AUDIO','GEMINI_DOCUMENTS'], 'DATA':['GOOGLE_ML','OLLAMA_SCHEMA'],
 'BUSINESS':['ANTHROPIC_AGENTS','ANTHROPIC_EVALS'], 'CAPSTONE':['OWASP_GENAI','ANTHROPIC_EVALS'],
}
specific_sources = {
 1:['PYTHON_TUTORIAL','OPENAI_QUICKSTART','GIT_BOOK'],2:['PYTHON_TUTORIAL'],3:['PYTHON_JSON','PYTHON_TUTORIAL'],
 4:['HTTP_OVERVIEW','PYTHON_JSON'],6:['OPENAI_QUICKSTART','GOOGLE_ML'],7:['OPENAI_QUICKSTART','ANTHROPIC_AGENTS'],
 8:['OPENAI_SCHEMA','PYTHON_JSON'],12:['OPENAI_TOOLS'],13:['OPENAI_TOOLS','ANTHROPIC_AGENTS'],
 21:['PYTHON_SQLITE','POSTGRES_TRANSACTIONS'],22:['PYTHON_SQLITE','LANGGRAPH_STATE'],
 31:['HTTP_OVERVIEW','STRIPE_WEBHOOKS'],33:['MCP_SPEC'],36:['OPENAI_TOOLS','OPENAI_QUICKSTART'],
 37:['OPENAI_AGENTS'],38:['OPENAI_RUNTIME','OPENAI_DEPRECATIONS'],39:['LANGGRAPH_STATE'],
 43:['PYTHON_ASYNC'],44:['LANGGRAPH_STATE','STRIPE_WEBHOOKS'],45:['LANGGRAPH_STATE','STRIPE_WEBHOOKS'],
 52:['ANTHROPIC_EVALS','PROMPTFOO_TESTS'],53:['ANTHROPIC_EVALS','PROMPTFOO_TESTS'],54:['OTEL'],
 58:['SEARCH_SECURITY','OWASP_GENAI'],59:['N8N_APPROVALS','LANGGRAPH_STATE'],
 61:['FASTAPI'],62:['POSTGRES_TRANSACTIONS'],63:['STRIPE_WEBHOOKS','OTEL'],64:['HTTP_OVERVIEW','FASTAPI'],
 66:['REACT','NEXTJS'],67:['REACT','N8N_APPROVALS'],68:['DOCKER','NEXTJS'],69:['OTEL','OPENAI_DATA'],
 71:['ANTHROPIC_AGENTS','OWASP_GENAI'],72:['DOCKER','OWASP_GENAI'],73:['MCP_SPEC','OPENAI_TOOLS'],
 'FND_01':['GOOGLE_ML','ANTHROPIC_AGENTS'],'FND_02':['ANTHROPIC_EVALS','OPENAI_DATA'],
 'FND_03':['GEMINI_DOCUMENTS','OPENAI_AUDIO'],'AGT_01':['MCP_SPEC','A2A_SPEC'],
 'AUT_01':['N8N_APPROVALS'],'AUT_02':['MAKE_AGENTS'],'AUT_03':['STRIPE_WEBHOOKS'],
 'AUT_06':['N8N_EVALS','PROMPTFOO_TESTS'],'AUT_07':['COPILOT','POWER_DLP'],
 'MKT_04':['OPENAI_IMAGE'],'MKT_05':['OPENAI_VIDEO'],'MKT_06':['GOOGLE_AI_CONTENT'],
 'CRM_04':['TWILIO_SANDBOX','HUBSPOT_WEBHOOKS'],'VOI_01':['OPENAI_AUDIO'],
 'VOI_02':['OPENAI_AUDIO'],'VOI_03':['OPENAI_AUDIO'],'VOI_04':['GEMINI_DOCUMENTS'],
 'DAT_03':['OLLAMA_SCHEMA','OPENAI_DATA'],'DAT_04':['PEFT_LORA','ANTHROPIC_EVALS'],
}
new_skills = {
 'AI_FUNDAMENTALS':('יסודות AI','Foundations','הבחנה בין אימון, הפעלה, חיזוי ויצירת תוכן באמצעות משימה ומדידה.'),
 'CONTENT_PIPELINES':('מערכות תוכן','Business applications','בניית תדריך, יצירה, עריכה, אישור ומדידת תוכן לפי מקורות.'),
 'PAID_MEDIA':('פרסום ומדידה','Business applications','הכנת קמפיינים ובדיקת מדידה עם גבולות תקציב ואישור לפני פרסום.'),
 'CRM_OPERATIONS':('CRM ותפעול לקוחות','Business applications','ניהול קליטת לקוחות, כפילויות, פעולות ואחריות אנושית.'),
 'UI_DESIGN':('ממשק ונגישות','Product','בניית מסכים שמציגים את מצב העבודה בפועל, כולל שגיאות, ניווט ואפשרויות נגישות.'),
 'VOICE_SYSTEMS':('קול ומסמכים','Business applications','עיבוד דיבור ומסמכים עם מיקום מקור, מדידה ואימות שגיאות.'),
 'BUSINESS_DISCOVERY':('אפיון ומסירת שירות','Business applications','הגדרת ניסוי מצומצם לפי צורך עסקי, עם מדדים, הצעת עבודה, בדיקת קבלה ומסירה.'),
}
skills = read('skills.json')
for i,(name,domain,desc) in new_skills.items():
    skills.append(dict(id=i,name=name,domain=domain,description=desc,prerequisiteSkillIds=[]))
extra_skills = {'FND':['AI_FUNDAMENTALS','MODEL_SELECTION','EVALS'],'AGT':['MCP','COORDINATION'],
 'AUT':['WORKFLOWS','HTTP_APIS','HUMAN_APPROVAL'],'MKT':['CONTENT_PIPELINES','GROUNDING'],
 'ADS':['PAID_MEDIA','EVALS','HUMAN_APPROVAL'],'CRM':['CRM_OPERATIONS','DATABASE','HTTP_APIS'],
 'WEB':['UI_DESIGN','BACKEND','DEPLOYMENT'],'VOI':['VOICE_SYSTEMS','EVALS'],
 'DAT':['AI_FUNDAMENTALS','DATABASE','EVALS'],'BIZ':['BUSINESS_DISCOVERY','EVALS']}
for lid,packet in extra.items():
    title,concept,build,failure,challenge=packet
    c['lessons'].append(dict(id=lid,title=title,titleEn=lid.replace('_',' '),version=RELEASE_VERSION,
      stability='FOUNDATION' if lid.startswith(('FND_01','BIZ_')) else 'ECOSYSTEM',
      estimatedMinutes=150,skillIds=extra_skills[lid.split('_')[0]],prerequisiteLessonIds=[],
      sourceIds=[],publicationStatus='published',lastVerified=None,outline=build))

# Dependency chains follow each topic, so learning marketing doesn't require finishing all agent units.
for module in modules:
    for index,lid in enumerate(module['lessonIds']):
        lesson=next(l for l in c['lessons'] if l['id']==lid)
        lesson['prerequisiteLessonIds']= [module['lessonIds'][index-1]] if index else ([modules[0]['lessonIds'][-1]] if module['id']!='CORE' else [])
        if index == 0:
            lesson['prerequisiteLessonIds'] += [next(m for m in modules if m['id']==dep)['lessonIds'][-1] for dep in module['prerequisiteModuleIds'] if dep!='CORE']

assessments = read('assessments.json')
for lesson in c['lessons']:
    lid=lesson['id']; key=lesson.get('day',lid); module=owner[lid]
    lesson['sourceIds']=specific_sources.get(key,module_sources[module['id']])
    for sid in lesson['sourceIds']: smap[sid]['lessonIds'].append(lid)
    lesson['version']=RELEASE_VERSION;lesson['publicationStatus']='published'
    lesson['contentStage']='guided-lesson' if key==1 else 'practice-workbook'
    lesson['verification']=dict(sourcesCheckedAt=None,hebrewReviewedAt='2026-10-01',execution='not-run',command=None,
      limitations=['הקישורים למקורות נועדו ללמידה ולהעמקה. לא בוצע אימות טכני מלא של היחידה.', 'חיבורים לשירותים חיצוניים ותרגילים בתשלום לא הורצו במסגרת הכנת היחידה.'])
    if key==1: continue
    title,concept,build,failure,challenge = legacy[str(key)] if isinstance(key,int) else extra[key]
    lesson['title']=title
    code_path=ROOT / 'content/labs' / f'{lid}.py'
    code = '\n\n### דוגמה מקומית\n\nהדוגמה הבאה מציגה את המנגנון בלי לשלוח בקשה למודל. העתק אותה לקובץ `lab.py`, הרץ `python3 lab.py`, ואחר כך בצע את מעבדת הכשל. הפלט הקבוע בדוגמה נכתב לצורך ההדגמה; הוא אינו תשובה שנוצרה בידי מודל.\n\n```python\n'+code_path.read_text()+'```\n' if code_path.exists() else ''
    refs='\n'.join(f"- [{smap[s]['title']}]({smap[s]['url']})" for s in lesson['sourceIds'])
    body=f'''## Mission

בשיעור זה תעסוק בנושא ״{title}״. בנה תוצר שאפשר לבדוק והסבר מדוע בחרת בדרך העבודה שלך. התוצר יצטרף לתיק העבודות שלך בפרק ״{module['title']}״.

**מטרת הבנייה:** {build}

הקצה לתרגול עד {lesson['estimatedMinutes']} דקות. אם נושא בסיסי אינו ברור לך, חזור לשיעור הקודם שנדרש ליחידה זו והשלם את ההבנה לפני הבדיקה. זו חוברת תרגול מעשית: יש בה הסבר תמציתי, משימות ומקורות להעמקה. היא אינה מדריך שמציג את כל שלבי הפתרון או פתרון מוכן להעתקה.

## Build First

{build}

1. פתח תיקיית עבודה נפרדת. כתוב בקובץ ההסבר README מה התהליך מקבל, מה הוא מחזיר ומי רשאי להפעיל אותו.
2. בחר מקרה קטן לתרגול, למשל עסק שמקבל פנייה מלקוח. השתמש בשם בדוי ובנתוני בדיקה. בשלב הבנייה, השאר את המערכת בסביבת תרגול ואל תחבר נתונים של לקוח אמיתי.
3. הגדר את התוצאה המצופה לפני ההרצה: רשומה, מסמך, שינוי מצב או פעולה. הפרד בין תוצאה שמודל הציע לבין פעולה שהקוד ביצע.
4. ממש תחילה מקרה אחד שבו כל השלבים מצליחים. במשימת אפיון, הכן תרשים וטבלת החלטות; אין צורך לכתוב קוד שאינו נדרש למשימה. אם התרגיל דורש שירות חיצוני, בדוק בתיעוד את דרישות הגישה וההרשאות ורשום באיזו גרסת חבילה השתמשת.
5. שמור קלט, פלט ומזהה הרצה. השווה את התוצאה לציפייה והראה היכן היא תואמת והיכן לא.
{code}
**מבחן קבלה:** אדם אחר יכול לעקוב אחר התיעוד, להריץ את התרגיל ולבדוק את התוצר בלי לנחש למה התכוונת. חיבור לשירות חיצוני והפעלת פעולות בתשלום דורשים עבודה בסביבת התרגול שלך; אתר הלמידה אינו מבצע אותם.

## Concepts

{concept}

בדוק כיצד ההסבר מתאים לתוצר שלך. ציין אילו ערכים נקבעו בקוד, אילו נלקחו ממקור ואילו נוצרו או הוערכו בידי מודל. לכל סוג של ערך נדרשת בדיקה מתאימה. גם ערך שמודל כתב בשדה מובנה עלול להיות שגוי.

## Mental Model

```text
Input → Contract check → Work / model proposal → Result check → Evidence
                                    ↓ failure
                             Stop / review / recover
```

התאם את התרשים לתרגיל: כתוב בכל תיבה את שם הרכיב שמבצע את השלב. לפני שינוי במערכת חיצונית, הוסף בדיקת הרשאה; אחרי השינוי, בדוק מה בוצע בפועל. אם אין שינוי במערכת חיצונית, השאר רק את השלבים הדרושים.

## Deep Dive

{concept}

חקור החלטה אחת לעומק: מה תצטרך לשנות אם כמות הנתונים תגדל פי עשרה, אם מקור מידע לא יהיה זמין או אם אדם אחר יקבל אחריות על התהליך? השווה בין שתי דרכי פתרון. לכל דרך כתוב על איזו הנחה היא נשענת, והצע בדיקה שתעזור לבחור ביניהן. מספרים שנבחרו לתרגיל הם הנחות עבודה; הם אינם הבטחה לתוצאות אצל לקוח.

פתח את המקור המקושר וחפש את ההסבר הנוגע להחלטה שלך. רשום מתי קראת אותו, באיזו גרסת תוכנה השתמשת ומה היה שונה בין התיעוד לתוצאה שקיבלת. אם אתה משתמש בשירות חיצוני, בדוק בחשבון שלך שהמודל או התכונה זמינים ומהן מגבלות המסלול שלך.

## Failure Lab

**התקלה שתיצור לצורך הבדיקה:** {failure}

שמור עותק שעובד, ואז צור מקרה אחד שאמור להיכשל. רשום מה הזנת, מה ציפית לקבל, מה קרה בפועל ואיזו הודעת שגיאה הופיעה. מצא את השלב הראשון שבו התוצאה הייתה שונה מהציפייה. אם הבעיה קשורה להרשאה, לרשת או לנתונים, שינוי ההנחיה למודל אינו פותר אותה כשלעצמו.

תקן את הגורם לתקלה והרץ שוב את המקרה שנכשל. בדוק גם שהמקרה שעבד קודם עדיין מצליח. שמור את הבדיקה כדי שתוכל להריץ אותה לאחר שינויים נוספים; זו בדיקת רגרסיה. צרף תוצאה שמראה שהתיקון עבד בפועל.

## Challenge

{challenge}

פתור את האתגר בלי להעתיק את הפתרון הקודם. אפשר להיעזר בתיעוד הרשמי. צרף לתוצר הסבר להחלטה אחת ומקרה אחד שהפתרון שלך עדיין אינו מטפל בו. לפרויקט המסכם אין פתרון מלא להעתקה, כדי שתוכל לתרגל עבודה עצמאית.

## Mastery Check

הכן שלושה סוגי תיעוד לבדיקה המעשית שמתחת לשיעור. המחוון הוא רשימת הקריטריונים שלפיהם בוחנים את העבודה:

- **בנייה:** {build} צרף תוצר, קלט ופלט או טבלת החלטות שאפשר לבדוק.
- **אבחון:** {failure} צרף מה קרה לפני התיקון ומה השתנה אחריו.
- **יישום במקרה חדש:** {challenge} הסבר מדוע הפתרון מתאים ומה עדיין אינו פותר.

שאל את עצמך: האם אני יכול להסביר מה עושה כל רכיב? האם הבדיקה יכולה לזהות טעות גם כשהפלט נראה משכנע? האם אדם אחר יכול לבדוק את התוצאה? סימון שהתרגיל נבנה ושמירת תוצאות הבדיקות מתעדים את העבודה שביצעת. הם אינם ציון מקצועי ואינם מעידים כשלעצמם על שליטה בנושא.

## Documentation

{refs}

אלה מקורות ראשוניים שמסבירים את הכלים והמנגנונים שביחידה. אנחנו בחרנו חלק מהתרגילים והמספרים לצורך הלמידה; המקורות אינם מבטיחים תוצאה עסקית. הקישורים אינם אישור שכל שילוב של שירותים או קוד חיצוני נבדק בהרצה. בראש היחידה מופיע פירוט של הבדיקות שבוצעו ושל אלה שלא בוצעו.

## Engineering Notes

תעד מה בנית, מה מדדת, מה נכשל ואיזה שינוי ביצעת. הפרד בין ממצא מההרצה לבין השערה. לפני מסירה ללקוח, רשום את הגרסה שנבדקה ומגבלה אחת של הפתרון.

ההערות והראיות נשמרות בחשבון שלך במסד הנתונים של האפליקציה וניתנות לייצוא. השאר מפתחות גישה, סיסמאות ומידע אישי של לקוחות מחוץ להערות. התוצר שאליו מכוון הפרק: {module['outcome']}
'''
    (OUT/'lessons'/f'{lid}.md').write_text(body)
    assessments.append(dict(id='ASSESS_'+lid,lessonId=lid,version=RELEASE_VERSION,title='הוכחה מעשית · '+title,
      instructions='צרף תוצר וראיות שאפשר לבדוק. בכל סעיף כתוב הסבר וצרף דוגמה ותוצאה. ההגשה שומרת את העבודה לצורך בדיקה. היא אינה מריצה את הקוד ואינה מחשבת ציון באופן אוטומטי.',
      criteria=[dict(id='BUILD',skillId=lesson['skillIds'][0],prompt=build+' הראה תוצר והסבר כיצד בדקת אותו.',evidenceHint='צרף קלט, פלט, גרסה ופקודת הרצה או מסמך אפיון עם מבחן קבלה.'),
       dict(id='DIAGNOSE',skillId=lesson['skillIds'][-1],prompt=failure+' תעד את האבחון ואת התיקון שבדקת.',evidenceHint='כתוב מה ציפית לקבל. צרף את התוצאה לפני התיקון, את הבדיקה שעזרה למצוא את התקלה ואת התוצאה לאחר התיקון.'),
       dict(id='TRANSFER',skillId=lesson['skillIds'][0],prompt=challenge+' הצג פתרון עצמאי וציין מקרה שהפתרון אינו מטפל בו.',evidenceHint='צרף תוצר חדש, החלטה מנומקת ומקרה שבו הפתרון אינו מספיק.')]))
c.update(version=RELEASE_VERSION,releaseDate='2026-10-01',modules=modules,majorChanges=[
 'Add 14 topic modules and 59 stable-ID specialization units alongside the preserved original 80-day syllabus.',
 'Publish practical workbooks, primary references and evidence rubrics; workbook availability does not certify external execution or mastery.'])
write('curriculum.json',c);write('sources.json',sources);write('skills.json',skills);write('assessments.json',assessments)
changelog=read('changelog.json')+[dict(version=RELEASE_VERSION,date='2026-10-01',changes=c['majorChanges'])]
write('changelog.json',changelog)
print(f"Compiled {len(c['lessons'])} units, {len(modules)} modules, {len(assessments)} rubrics.")
