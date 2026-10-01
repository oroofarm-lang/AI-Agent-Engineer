import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const project=process.cwd(),vault=path.join(project,'Volt'),source=path.join(project,'content/curriculum');
const curriculum=JSON.parse(fs.readFileSync(path.join(source,'curriculum.json'),'utf8'));
const manifestPath=path.join(vault,'.course-export.json');
const previous=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{files:{}};
const files=new Map(),base=`קורס/${curriculum.version}`;
const hash=value=>createHash('sha256').update(value).digest('hex');
const sections={Mission:'המשימה', 'Build First':'קודם מתרגלים',Concepts:'המושגים', 'Mental Model':'איך זה עובד', 'Deep Dive':'להעמקה', 'Failure Lab':'מנסים, שוברים ומתקנים',Challenge:'אתגר עצמאי','Mastery Check':'בדיקת הבנה',Documentation:'מקורות', 'Engineering Notes':'מה כדאי לתעד'};
function convert(body){
 body=body.replace(/^## (.+)$/gm,(_line,section)=>`## ${sections[section]||section}`);
 return body.replace(/```learning-flow\n([\s\S]*?)\n```/g,(_block,text)=>{
  const data=JSON.parse(text);const nodes=data.steps.map((step,index)=>`  N${index}["${step.label.replaceAll('"',"'")}"]`);
  const arrows=data.steps.slice(1).map((_step,index)=>`  N${index} --> N${index+1}`);
  return `### ${data.title}\n\n\`\`\`mermaid\nflowchart TD\n${[...nodes,...arrows].join('\n')}\n\`\`\`\n\n${data.steps.map((step,index)=>`**${index+1}. ${step.label}**\n\n${step.detail}\n\nבדוגמה: ${step.example}`).join('\n\n')}\n\n${data.conclusion}`;
 });
}
const link=lesson=>`[[${base}/שיעורים/${lesson.id}|${lesson.title}]]`;
for(const lesson of curriculum.lessons.filter(l=>l.publicationStatus==='published')){
 const chapter=curriculum.modules.find(m=>m.lessonIds.includes(lesson.id));const index=chapter.lessonIds.indexOf(lesson.id);
 const navigation=[index>0?`הקודם: ${link(curriculum.lessons.find(l=>l.id===chapter.lessonIds[index-1]))}`:'',`[[${base}/פרקים/${chapter.id}|לפרק ${chapter.title}]]`,index<chapter.lessonIds.length-1?`הבא: ${link(curriculum.lessons.find(l=>l.id===chapter.lessonIds[index+1]))}`:''].filter(Boolean).join(' · ');
 files.set(`${base}/שיעורים/${lesson.id}.md`,`---\nlesson_id: ${lesson.id}\ncurriculum_version: ${curriculum.version}\n---\n\n# ${lesson.title}\n\n${navigation}\n\n${convert(fs.readFileSync(path.join(source,'lessons',`${lesson.id}.md`),'utf8'))}\n\n${navigation}\n`);
}
for(const chapter of curriculum.modules){
 files.set(`${base}/פרקים/${chapter.id}.md`,`# ${chapter.title}\n\n${chapter.description}\n\n## מה בונים?\n\n${chapter.outcome}\n\n## השיעורים לפי הסדר\n\n${chapter.lessonIds.map((id,index)=>`${index+1}. ${link(curriculum.lessons.find(l=>l.id===id))}`).join('\n')}\n\n[[${base}/תוכנית הקורס|לתוכנית הקורס]]\n`);
}
files.set(`${base}/תוכנית הקורס.md`,`# תוכנית הקורס\n\nמתחילים בפרק החובה של היסודות, ואז בוחרים התמחות. תרגול, הגשת ראיות והערכת שליטה הם שלבים נפרדים.\n\n${curriculum.modules.map((m,i)=>`${i+1}. [[${base}/פרקים/${m.id}|${m.title}]] — ${m.lessonIds.length} יחידות`).join('\n')}\n\n[לאפליקציית הלמידה המקומית](http://127.0.0.1:3000/)\n`);
files.set('התחלה כאן.md',`# סביבת הלמידה שלך\n\n[[${base}/תוכנית הקורס|לכל הפרקים והשיעורים]]\n\n- [[תבניות/סיכום שיעור|תבנית לסיכום שיעור]]\n- [[תבניות/תיעוד תקלה|תבנית לתיעוד תקלה]]\n- [[מחברת/המחברת שלי|המחברת האישית]]\n- [לאפליקציה](http://127.0.0.1:3000/)\n\n## איך עובדים?\n\nפתח שיעור מהתוכנית וכתוב את הסיכום שלך במחברת. חומר הקורס כאן הוא עותק לקריאה של גרסה ${curriculum.version}. השמירה ב־Obsidian אינה משנה ציונים או התקדמות באפליקציה. הפקודה \`npm run vault:sync\` מעדכנת את חומר הלימוד מהגרסה הפעילה ושומרת גרסאות קודמות. היא אינה דורסת קובץ ששינית בעצמך.\n\nכדי לפתוח את התיקייה: ב־Obsidian בחר **Open folder as vault**, ואז בחר את התיקייה \`Volt\` שבפרויקט. [הוראות רשמיות](https://obsidian.md/help/manage-vaults).\n`);
const starterFiles={
 'מחברת/המחברת שלי.md':'# המחברת שלי\n\nכאן שומרים סיכומים, שאלות והחלטות. אפשר להעתיק תבנית מתיקיית תבניות ולהתחיל רשומה חדשה.\n',
 'תבניות/סיכום שיעור.md':'# סיכום שיעור\n\nשיעור:\nתאריך:\n\n## הרעיון במילים שלי\n\n## דוגמה שהבנתי\n\n## מה תרגלתי?\n\n## מה עדיין לא ברור?\n\n## בדיקה ותוצאה בפועל\n\n## הצעד הבא\n',
 'תבניות/תיעוד תקלה.md':'# תיעוד תקלה\n\nשיעור:\nתאריך:\n\n## מה ציפיתי שיקרה?\n\n## מה קרה בפועל?\n\n## מה גרם לתקלה, או מה ההשערה?\n\n## מה שיניתי?\n\n## איזו בדיקה הרצתי שוב?\n\n## איך אמנע את חזרת התקלה?\n',
 '.obsidian/app.json':JSON.stringify({alwaysUpdateLinks:true,newFileLocation:'folder',newFileFolderPath:'מחברת',attachmentFolderPath:'קבצים'},null,2)+'\n',
};
// Preflight all generated files before any writes; learner-authored edits are never lost.
for(const [relative,body] of files){const target=path.join(vault,relative);if(fs.existsSync(target)){const old=fs.readFileSync(target,'utf8');if(old!==body&&previous.files[relative]!==hash(old))throw new Error(`Refusing to overwrite your edited note: ${relative}`);}}
for(const [relative,body] of files){const target=path.join(vault,relative);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,body);previous.files[relative]=hash(body);}
for(const [relative,body] of Object.entries(starterFiles)){const target=path.join(vault,relative);if(!fs.existsSync(target)){fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,body);}}
fs.writeFileSync(manifestPath,JSON.stringify({version:curriculum.version,files:previous.files},null,2)+'\n');
console.log(`Volt ready: ${curriculum.lessons.length} lessons, ${curriculum.modules.length} chapters; active curriculum ${curriculum.version}. Existing personal notes preserved.`);
