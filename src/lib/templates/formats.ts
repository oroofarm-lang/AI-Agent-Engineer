import {
  MAX_DOCUMENT_BYTES,
  MAX_ROWS,
  MAX_COLUMNS,
  validateTemplateDocument,
  templateCompletion,
  type TemplateDefinition,
  type TemplateDocument,
} from './schema';

function boundedInput(text: string) {
  if (new TextEncoder().encode(text).byteLength > MAX_DOCUMENT_BYTES)
    throw new Error('IMPORT_TOO_LARGE');
}
export function importTemplateJSON(text: string, definition: TemplateDefinition) {
  boundedInput(text);
  return validateTemplateDocument(JSON.parse(text.replace(/^\uFEFF/, '')), definition);
}
export function exportTemplateJSON(raw: unknown, definition: TemplateDefinition) {
  return JSON.stringify(validateTemplateDocument(raw, definition), null, 2) + '\n';
}

/** Safe spreadsheet export. JSON retains exact source values; CSV protects executable prefixes. */
export function exportTemplateCSV(raw: unknown, definition: TemplateDefinition) {
  const document = validateTemplateDocument(raw, definition);
  if (!document.table) throw new Error('TABLE_REQUIRED');
  const quote = (value: string) => {
    const safe = /^(?:\s*[=+\-@]|[\t\r])/.test(value) ? `'${value}` : value;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  return (
    [document.table.columns.map((column) => column.label), ...document.table.rows]
      .map((row) => row.map(quote).join(','))
      .join('\r\n') + '\r\n'
  );
}

/** Strict bounded CSV: commas, escaped quotes, embedded newlines and CRLF; no guessed columns. */
export function readCSV(text: string): string[][] {
  boundedInput(text);
  const input = text.replace(/^\uFEFF/, '');
  const rows: string[][] = [];
  let row: string[] = [],
    field = '',
    quoted = false,
    closed = false;
  function endField() {
    row.push(field);
    if (row.length > MAX_COLUMNS) throw new Error('TOO_MANY_COLUMNS');
    field = '';
    closed = false;
  }
  function endRow() {
    endField();
    rows.push(row);
    row = [];
    if (rows.length > MAX_ROWS + 1) throw new Error('TOO_MANY_ROWS');
  }
  for (let i = 0; i < input.length; i++) {
    const character = input[i];
    if (quoted) {
      if (character === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
          closed = true;
        }
      } else field += character;
    } else if (character === ',') endField();
    else if (character === '\n' || character === '\r') {
      if (character === '\r' && input[i + 1] === '\n') i++;
      endRow();
    } else if (character === '"') {
      if (field || closed) throw new Error('INVALID_CSV_QUOTE');
      quoted = true;
    } else {
      if (closed) throw new Error('INVALID_CSV_TRAILER');
      field += character;
    }
    if (field.length > 4000) throw new Error('CELL_TOO_LARGE');
  }
  if (quoted) throw new Error('UNCLOSED_CSV_QUOTE');
  if (row.length || field || closed) endRow();
  if (!rows.length) throw new Error('EMPTY_CSV');
  const width = rows[0].length;
  if (rows.some((values) => values.length !== width)) throw new Error('INVALID_ROW_WIDTH');
  return rows;
}
export function importTemplateCSV(
  text: string,
  raw: unknown,
  definition: TemplateDefinition,
): TemplateDocument {
  const document = validateTemplateDocument(raw, definition);
  if (!document.table) throw new Error('TABLE_REQUIRED');
  const [headers, ...rows] = readCSV(text);
  if (
    headers.length !== document.table.columns.length ||
    headers.some((label, i) => label !== document.table!.columns[i].label)
  )
    throw new Error('CSV_COLUMNS_MISMATCH');
  return validateTemplateDocument(
    {
      ...document,
      table: { ...document.table, rows },
    },
    definition,
  );
}

function markdownCell(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\r\n|\r|\n/g, ' ⏎ ');
}
export function templateMarkdown(raw: unknown, definition: TemplateDefinition) {
  const document = validateTemplateDocument(raw, definition);
  if (!document.table) return document.notes;
  const table = document.table;
  const lines = [
    '| ' + table.columns.map((column) => markdownCell(column.label)).join(' | ') + ' |',
    '| ' + table.columns.map(() => '---').join(' | ') + ' |',
    ...table.rows.map((row) => '| ' + row.map(markdownCell).join(' | ') + ' |'),
  ];
  return lines.join('\n') + (document.notes ? '\n\n' + document.notes : '');
}

/** Existing assessment evidence limits still apply; filled formatting alone cannot qualify. */
export function templateSubmission(raw: unknown, definition: TemplateDefinition) {
  const document = validateTemplateDocument(raw, definition);
  if (!templateCompletion(document, definition).ready) throw new Error('TEMPLATE_INCOMPLETE');
  const text = templateMarkdown(document, definition);
  if (text.length > 12000) throw new Error('TEMPLATE_EVIDENCE_TOO_LONG');
  return { document, text };
}
