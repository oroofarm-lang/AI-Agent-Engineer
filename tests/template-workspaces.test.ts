import { describe, expect, it } from 'vitest';
import bank from '../content/templates/releases/1.0.0.json';
import rubrics from '../content/releases/2.2.0/assessments.json';
import {
  validateTemplateCatalog,
  templateDefinitionSchema,
  starterDocument,
  validateTemplateDocument,
  templateCompletion,
  MAX_DOCUMENT_BYTES,
  type TemplateDefinition,
} from '../src/lib/templates/schema';
import {
  readCSV,
  exportTemplateCSV,
  importTemplateCSV,
  exportTemplateJSON,
  importTemplateJSON,
  templateMarkdown,
  templateSubmission,
} from '../src/lib/templates/formats';
import { assessmentSchema } from '../src/lib/curriculum/assessment';

const assessments = rubrics.map((assessment) => assessmentSchema.parse(assessment));
const catalog = validateTemplateCatalog(bank, { version: '2.2.0', assessments });
const foundation = catalog.templates.find(
  (definition) => definition.lessonId === 'FND_01' && definition.criterionId === 'BUILD',
)!;
const note = catalog.templates.find((definition) => definition.kind === 'markdown')!;
function filled(definition: TemplateDefinition = foundation) {
  const document = starterDocument(definition);
  document.notes =
    'כתבתי את הבחירות והסברתי מה בדקתי בפועל. זהו טקסט סינתטי של בדיקה, ולא עבודה של לומד אמיתי. '.repeat(
      2,
    );
  if (document.table)
    document.table.rows = document.table.rows.map((row, i) =>
      row.map((_, j) => `תוכן בדיקה ${i + 1},${j + 1}`),
    );
  return document;
}

describe('public exact-bound assignment template catalog', () => {
  it('covers all 139 actual rubrics and 418 exact criteria without altering prompts', () => {
    expect(assessments).toHaveLength(139);
    expect(catalog.templates).toHaveLength(418);
    expect(catalog.templates.filter((definition) => definition.kind === 'table')).toHaveLength(15);
    for (const assessment of assessments)
      for (const criterion of assessment.criteria) {
        const definition = catalog.templates.find(
          (item) => item.assessmentId === assessment.id && item.criterionId === criterion.id,
        )!;
        expect(definition.prompt).toBe(criterion.prompt);
        expect(definition.evidenceHint).toBe(criterion.evidenceHint);
      }
  });
  it('provides the eight required business-needs rows and all specified columns', () => {
    expect(foundation.kind).toBe('table');
    if (foundation.kind !== 'table') throw new Error('fixture');
    expect(foundation.minimumRows).toBe(8);
    expect(foundation.starter.rows).toHaveLength(8);
    expect(foundation.starter.columns.map((column) => column.label)).toEqual([
      'הצורך העסקי',
      'קלט לדוגמה',
      'פתרון אפשרי',
      'התוצאה הרצויה',
      'איך אבדוק את התוצאה',
    ]);
    expect(foundation.starter.rows.flat().every((cell) => cell === '')).toBe(true);
  });
  it('fails on missing, extra, duplicate or changed source bindings and versions', () => {
    expect(() =>
      validateTemplateCatalog(
        { ...bank, templates: bank.templates.slice(1) },
        { version: '2.2.0', assessments },
      ),
    ).toThrow('TEMPLATE_CRITERION_DRIFT');
    expect(() =>
      validateTemplateCatalog(
        { ...bank, templates: [...bank.templates, bank.templates[0]] },
        { version: '2.2.0', assessments },
      ),
    ).toThrow('DUPLICATE_TEMPLATE');
    const changed = structuredClone(assessments);
    changed[0].criteria[0].prompt += ' changed';
    expect(() => validateTemplateCatalog(bank, { version: '2.2.0', assessments: changed })).toThrow(
      'TEMPLATE_CRITERION_DRIFT',
    );
    expect(() => validateTemplateCatalog(bank, { version: '2.3.0', assessments })).toThrow(
      'TEMPLATE_COURSE_DRIFT',
    );
    const changedBank = structuredClone(bank);
    changedBank.templates[0].version = '1.0.1';
    expect(() => validateTemplateCatalog(changedBank, { version: '2.2.0', assessments })).toThrow(
      'TEMPLATE_VERSION_DRIFT',
    );
    const unknown = { ...bank.templates[0], id: 'TEMPLATE_UNKNOWN', assessmentId: 'UNKNOWN' };
    expect(() =>
      validateTemplateCatalog(
        { ...bank, templates: [...bank.templates, unknown] },
        { version: '2.2.0', assessments },
      ),
    ).toThrow('UNKNOWN_TEMPLATE');
  });
});

describe('bounded owned-document inputs and meaningful completion', () => {
  it('keeps starter rows isolated and refuses empty scaffolding despite long labels', () => {
    const a = starterDocument(foundation),
      b = starterDocument(foundation);
    a.table!.rows[0][0] = 'שינוי';
    expect(b.table!.rows[0][0]).toBe('');
    b.table!.columns.forEach((column) => (column.label = 'כותרת '.repeat(10)));
    expect(templateCompletion(b, foundation)).toEqual({
      characters: 0,
      completedRows: 0,
      ready: false,
    });
    expect(() => templateSubmission(b, foundation)).toThrow('TEMPLATE_INCOMPLETE');
  });
  it('requires all eight rows, allows optional columns and label editing, preserves column IDs', () => {
    const document = filled();
    expect(templateSubmission(document, foundation).text).toContain('תוכן בדיקה');
    document.table!.rows[7][1] = '';
    expect(templateCompletion(document, foundation).completedRows).toBe(7);
    expect(() => templateSubmission(document, foundation)).toThrow('TEMPLATE_INCOMPLETE');
    const extra = filled();
    extra.table!.columns[0].label = 'צורך';
    extra.table!.columns.push({ id: 'CUSTOM_1', label: 'הערה נוספת' });
    extra.table!.rows.forEach((row) => row.push(''));
    expect(validateTemplateDocument(extra, foundation)).toEqual(extra);
    extra.table!.columns[0].id = 'REPLACEMENT';
    expect(() => validateTemplateDocument(extra, foundation)).toThrow('REQUIRED_COLUMN_MISSING');
  });
  it('does not count unchanged scaffold task names as learner content', () => {
    const definition = catalog.templates.find(
      (item) => item.lessonId === 'FND_02' && item.criterionId === 'BUILD',
    )!;
    expect(templateCompletion(starterDocument(definition), definition)).toEqual({
      characters: 0,
      completedRows: 0,
      ready: false,
    });
  });
  it('bounds row widths, unique columns, cell bytes, identities and strict JSON properties', () => {
    const document = filled();
    expect(() => validateTemplateDocument({ ...document, userId: 'other' }, foundation)).toThrow();
    expect(() =>
      validateTemplateDocument({ ...document, templateVersion: '9.0.0' }, foundation),
    ).toThrow('STALE_TEMPLATE');
    expect(() => validateTemplateDocument({ ...document, table: undefined }, foundation)).toThrow(
      'TABLE_REQUIRED',
    );
    expect(() =>
      validateTemplateDocument({ ...starterDocument(note), table: document.table }, note),
    ).toThrow('UNEXPECTED_TABLE');
    const duplicate = structuredClone(document);
    duplicate.table!.columns[1].id = duplicate.table!.columns[0].id;
    expect(() => validateTemplateDocument(duplicate, foundation)).toThrow();
    const wrongWidth = structuredClone(document);
    wrongWidth.table!.rows[0].pop();
    expect(() => validateTemplateDocument(wrongWidth, foundation)).toThrow();
    const tooMany = structuredClone(document);
    tooMany.table!.rows = Array.from({ length: 101 }, () => tooMany.table!.rows[0]);
    expect(() => validateTemplateDocument(tooMany, foundation)).toThrow();
    const huge = structuredClone(document);
    huge.table!.rows = Array.from({ length: 100 }, () => Array(5).fill('א'.repeat(1000)));
    expect(() => validateTemplateDocument(huge, foundation)).toThrow('DOCUMENT_TOO_LARGE');
    document.table!.rows[0][0] = '\u0000';
    expect(() => validateTemplateDocument(document, foundation)).toThrow();
  });
  it('supports 12,000 note characters and rejects over-limit serialized submission text', () => {
    const document = starterDocument(note);
    document.notes = 'א'.repeat(12000);
    expect(templateSubmission(document, note).text).toHaveLength(12000);
    document.notes += 'א';
    expect(() => validateTemplateDocument(document, note)).toThrow();
    const table = filled();
    table.notes = 'א'.repeat(12000);
    expect(() => templateSubmission(table, foundation)).toThrow('TEMPLATE_EVIDENCE_TOO_LONG');
  });
});

describe('real import/export boundaries', () => {
  it('parses quoted commas, quotes, multiline cells, BOM and trailing empty cells', () => {
    expect(readCSV('\uFEFF"שם","טקסט"\r\n"א,ב","אמר ""שלום""\nואז חזר"\r\n"סיום",\r\n')).toEqual([
      ['שם', 'טקסט'],
      ['א,ב', 'אמר "שלום"\nואז חזר'],
      ['סיום', ''],
    ]);
  });
  it('rejects malformed quoting, guessed headers, ragged rows and oversize input before replacement', () => {
    for (const value of ['"לא נסגר', 'a"b,c', '"a"tail,b', 'a,b\nc'])
      expect(() => readCSV(value)).toThrow();
    expect(() => readCSV('x'.repeat(MAX_DOCUMENT_BYTES + 1))).toThrow('IMPORT_TOO_LARGE');
    expect(() => readCSV('a\n' + Array(101).fill('b').join('\n'))).toThrow('TOO_MANY_ROWS');
    expect(() => importTemplateCSV('unknown\nvalue\n', filled(), foundation)).toThrow(
      'CSV_COLUMNS_MISMATCH',
    );
    const original = filled();
    expect(original.table!.rows[0][0]).toBe('תוכן בדיקה 1,1');
  });
  it('neutralizes spreadsheet formulas while JSON preserves the exact original data', () => {
    const document = filled();
    document.table!.rows[0] = [
      '=HYPERLINK("https://invalid.example")',
      ' +1+1',
      '-10+20',
      '@SUM(A1)',
      '\t=1+1',
    ];
    document.table!.columns[0].label = '=LABEL';
    const csv = exportTemplateCSV(document, foundation);
    const parsed = readCSV(csv);
    expect(parsed[0][0]).toBe("'=LABEL");
    document.table!.rows[0].forEach((value, i) => expect(parsed[1][i]).toBe("'" + value));
    expect(importTemplateJSON(exportTemplateJSON(document, foundation), foundation)).toEqual(
      document,
    );
  });
  it('round-trips ordinary CSV without losing notes or changing template identity', () => {
    const document = filled();
    document.table!.rows[0][0] = 'שורה\nחדשה עם "מרכאות", ופסיק';
    expect(
      importTemplateCSV(exportTemplateCSV(document, foundation), document, foundation),
    ).toEqual(document);
    expect(() => importTemplateJSON('{"__proto__":{"admin":true}}', foundation)).toThrow();
    expect(() => importTemplateJSON(' '.repeat(MAX_DOCUMENT_BYTES + 1), foundation)).toThrow(
      'IMPORT_TOO_LARGE',
    );
  });
  it('escapes table HTML, separators and line breaks in Markdown without changing source cells', () => {
    const document = filled();
    document.table!.rows[0][0] = '<script>alert(1)</script>|a\nb';
    const markdown = templateMarkdown(document, foundation);
    expect(markdown).not.toContain('<script>');
    expect(markdown).toContain('&lt;script&gt;');
    expect(markdown).toContain('\\|a ⏎ b');
    expect(document.table!.rows[0][0]).toBe('<script>alert(1)</script>|a\nb');
  });
  it('rejects malformed authored starter definitions before they can reach an editor', () => {
    const malformed = { ...foundation, kind: 'table', minimumRows: 10 };
    expect(() => templateDefinitionSchema.parse(malformed)).toThrow('INSUFFICIENT_STARTER_ROWS');
  });
});
