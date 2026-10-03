import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import ts from 'typescript';
const root = process.cwd();
const hash = (text) => createHash('sha256').update(text).digest('hex');
function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
    );
}
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, 'content/curriculum/curriculum.json'), 'utf8'),
);
const publicCopy = [];
for (const absolute of walk(path.join(root, 'src')).filter((file) => /\.(ts|tsx)$/.test(file))) {
  const source = fs.readFileSync(absolute, 'utf8'),
    file = path.relative(root, absolute);
  const tree = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const copy = [];
  function visit(node) {
    if (
      ts.isJsxText(node) ||
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node)
    ) {
      const text = node.text.trim();
      if (/[\u0590-\u05ff]/.test(text))
        copy.push({ line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1, text });
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  if (copy.length) publicCopy.push({ file, sha256: hash(source), copy });
}
const lessons = catalog.lessons
  .filter((lesson) => lesson.publicationStatus === 'published')
  .map((lesson) => {
    const file = `content/curriculum/lessons/${lesson.id}.md`,
      body = fs.readFileSync(path.join(root, file), 'utf8');
    return { file, id: lesson.id, title: lesson.title, sha256: hash(body), body };
  });
// Learner-visible rubrics and catalog labels are data, not JSX literals.
// Restrict this collection to public curriculum and agent definitions.
const structuredCopy = [];
for (const file of [
  'content/curriculum/curriculum.json',
  'content/curriculum/assessments.json',
  'content/curriculum/skills.json',
  'content/curriculum/sources.json',
  'content/curriculum/changelog.json',
  'content/agents/registry.json',
  'content/quizzes/system/1.0.0.json',
]) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const copy = [];
  function visit(value, jsonPath) {
    if (typeof value === 'string' && /[\u0590-\u05ff]/.test(value)) {
      copy.push({ jsonPath, text: value });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${jsonPath}[${index}]`));
    } else if (value && typeof value === 'object') {
      for (const [key, item] of Object.entries(value))
        visit(item, `${jsonPath}[${JSON.stringify(key)}]`);
    }
  }
  visit(JSON.parse(source), '$');
  structuredCopy.push({ file, sha256: hash(source), copy });
}
const output = {
  schemaVersion: 2,
  curriculumVersion: catalog.version,
  generatedAt: new Date().toISOString(),
  scope:
    'Source-authored public copy only. No accounts, environment values, personal notes, or database records.',
  publicCopy,
  structuredCopy,
  modules: catalog.modules,
  lessons,
};
fs.mkdirSync(path.join(root, '.data/quality'), { recursive: true });
fs.writeFileSync(
  path.join(root, '.data/quality/public-copy.json'),
  JSON.stringify(output, null, 2) + '\n',
  { mode: 0o600 },
);
console.log(
  `Public-copy inventory: ${lessons.length} published lessons, ${catalog.modules.length} chapters, ${publicCopy.length} UI/source files, ${structuredCopy.reduce((total, item) => total + item.copy.length, 0)} structured text records. Saved to .data/quality/public-copy.json; no AI judgment or browser checks claimed.`,
);
