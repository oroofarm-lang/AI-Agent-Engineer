"""Explicit pre-release enrichment. Reviewed prose is preserved, not regenerated."""
import json
import os
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
OUT = Path(os.environ['CURRICULUM_OUTPUT']).resolve()
if OUT == (ROOT/'content/curriculum').resolve():
    raise ValueError('Finalize staged content, never the live registered release')
c = json.loads((OUT/'curriculum.json').read_text())
sources = json.loads((OUT/'sources.json').read_text())
additional = [
 ('OPENAI_WEBRTC','OpenAI WebRTC','https://developers.openai.com/api/docs/guides/voice-webrtc','OpenAI'),
 ('N8N_WEBHOOK','n8n webhook credentials','https://docs.n8n.io/integrations/builtin/credentials/webhook','n8n'),
 ('WCAG','WCAG 2.2','https://www.w3.org/TR/WCAG22/','W3C'),
]
for sid,title,url,vendor in additional:
    if not any(s['id']==sid for s in sources):
        sources.append(dict(id=sid,title=title,url=url,vendor=vendor,type='specification' if sid=='WCAG' else 'official-docs',lastVerified=None,lessonIds=[],technologyIds=[]))
corrections = {
 5:['OPENAI_TOOLS','PYTHON_TUTORIAL'],
 'AUT_01':['N8N_WEBHOOK','N8N_APPROVALS'], 'AUT_02':['N8N_WEBHOOK','HUBSPOT_WEBHOOKS'],
 'AUT_03':['OPENAI_SCHEMA','N8N_APPROVALS'], 'AUT_04':['STRIPE_WEBHOOKS','POSTGRES_TRANSACTIONS'],
 'AUT_05':['N8N_APPROVALS'], 'AUT_06':['MAKE_AGENTS','N8N_EVALS'],
 'MKT_04':['OPENAI_QUICKSTART','GOOGLE_AI_CONTENT'], 'MKT_05':['OPENAI_SCHEMA','GOOGLE_AI_CONTENT'],
 'MKT_06':['OPENAI_IMAGE'], 'MKT_07':['OPENAI_VIDEO'], 'MKT_08':['OPENAI_AUDIO'],
 'MKT_09':['GOOGLE_AI_CONTENT','N8N_APPROVALS'],
 'CRM_04':['POSTGRES_TRANSACTIONS','OPENAI_SCHEMA'],
 'CRM_05':['TWILIO_SANDBOX','HUBSPOT_WEBHOOKS'],
 'CRM_06':['SEARCH_SECURITY','OWASP_GENAI'], 'CRM_07':['POSTGRES_TRANSACTIONS','STRIPE_WEBHOOKS'],
 'WEB_02':['WCAG','REACT'], 'WEB_04':['FASTAPI','HUBSPOT_WEBHOOKS'],
 'WEB_05':['WCAG','DOCKER'], 'VOI_04':['OPENAI_WEBRTC','OPENAI_AUDIO'],
 'VOI_05':['OPENAI_AUDIO','HUBSPOT_WEBHOOKS'], 'DAT_01':['PYTHON_SQLITE','POSTGRES_TRANSACTIONS'],
 'BIZ_04':['OPENAI_DATA','OWASP_GENAI'],
}
smap={s['id']:s for s in sources}
for lesson in c['lessons']:
    key=lesson.get('day',lesson['id'])
    if key in corrections:
        lesson['sourceIds']=corrections[key]
        path=OUT/'lessons'/f"{lesson['id']}.md"
        text=path.read_text()
        start=text.index('## Documentation\n')+len('## Documentation\n')
        end=text.index('\nאלה מקורות ראשוניים',start)
        refs='\n'+'\n'.join(f"- [{smap[s]['title']}]({smap[s]['url']})" for s in lesson['sourceIds'])+'\n'
        text=text[:start]+refs+text[end:]
        path.write_text(text)
    if key in [2,3,4,13]:
        lesson['verification']['execution']='local-tested'
        lesson['verification']['command']="python3 -m unittest discover -s content/labs -p 'test_*.py' -v"
        lesson['verification']['limitations']=['בדיקות המעבדה של הדוגמה המקומית עברו בהצלחה. הרחבות שתבנה דורשות בדיקות משלהן.', 'לא בוצעה הרצה עם מודל חיצוני או שירות בתשלום.']
for s in sources:
    s['lessonIds']=[l['id'] for l in c['lessons'] if s['id'] in l['sourceIds']]
voice=next(m for m in c['modules'] if m['id']=='VOICE')
voice['title']='קול ושירות לקוחות'
voice['description']='מתמלל דיבור ובונה עוזר קולי שמטפל בזמני תגובה, בהפסקת דבריו ובהעברת הטיפול לאדם.'
voice['outcome']='עוזר קולי עם תיעוד שלבי הריצה, מגבלות פעולה ובדיקות של מקרי שגיאה.'
for l in c['lessons']:
    if l['id'].startswith('VOI_'):
        p=OUT/'lessons'/f"{l['id']}.md"
        p.write_text(p.read_text().replace('קול ומסמכים','קול ושירות לקוחות').replace('עוזר קולי או תהליך מסמכים עם עקבות ומבחני שגיאות.',voice['outcome']))
# Shared study notes are reviewed once and inserted consistently into each workbook.
handbooks=json.loads((ROOT/'content/authoring/topic-handbooks.json').read_text())
for topic in c['modules']:
    for lid in topic['lessonIds']:
        lesson=next(l for l in c['lessons'] if l['id']==lid)
        if lesson.get('day')==1: continue
        path=OUT/'lessons'/f'{lid}.md'
        text=path.read_text()
        if handbooks[topic['id']] not in text:
            start=text.index('## Deep Dive\n')+len('## Deep Dive\n')
            end=text.index('\nחקור החלטה אחת לעומק:',start)
            text=text[:start]+'\n'+handbooks[topic['id']]+'\n'+text[end:]
            path.write_text(text)
# The depth source is reviewed separately before applying this utility.
depth=json.loads((ROOT/'content/authoring/depth.json').read_text())
for lesson in c['lessons']:
    data=depth.get(str(lesson.get('day',lesson['id'])))
    if not data: continue
    p=OUT/'lessons'/f"{lesson['id']}.md"
    text=p.read_text()
    for key,section,next_section in [('concepts','Concepts','Mental Model'),('build','Build First','Concepts')]:
        if key in data and data[key] not in text:
            marker=f'\n## {next_section}\n'
            text=text.replace(marker,'\n'+data[key]+'\n'+marker,1)
    p.write_text(text)
(OUT/'curriculum.json').write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n')
(OUT/'sources.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2)+'\n')
print('Applied corrected primary references, lab execution evidence, and reviewed core depth.')
