export type MarkdownFormat = 'bold' | 'italic' | 'heading' | 'list' | 'code';
/** Pure selection transforms keep editing and keyboard behavior testable without executing code. */
export function formatMarkdown(text: string, start: number, end: number, format: MarkdownFormat) {
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    end < start ||
    end > text.length
  )
    throw new Error('INVALID_SELECTION');
  const selected = text.slice(start, end);
  const wraps: Record<MarkdownFormat, [string, string]> = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    heading: ['## ', ''],
    list: ['- ', ''],
    code: ['\n```\n', '\n```\n'],
  };
  const [prefix, suffix] = wraps[format];
  const replacement =
    format === 'list' && selected.includes('\n')
      ? selected
          .split('\n')
          .map((line) => `- ${line}`)
          .join('\n')
      : prefix + selected + suffix;
  const result = text.slice(0, start) + replacement + text.slice(end);
  if (result.length > 12000) throw new Error('NOTES_TOO_LONG');
  return {
    text: result,
    start: start + prefix.length,
    end: start + replacement.length - suffix.length,
  };
}
/** Display-only tokens: React escapes every value; this is never a runtime or code validator. */
export function codeTokens(text: string) {
  const pattern =
    /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|let|return|function|if|else|import|from|def|class|True|False|None|true|false|null|SELECT|FROM|WHERE|JOIN|AS|AND|OR)\b|\b\d+(?:\.\d+)?\b)/g;
  const tokens: { text: string; kind: 'plain' | 'string' | 'keyword' | 'number' }[] = [];
  let offset = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > offset) tokens.push({ text: text.slice(offset, match.index), kind: 'plain' });
    const value = match[0];
    tokens.push({
      text: value,
      kind: /^["']/.test(value) ? 'string' : /^\d/.test(value) ? 'number' : 'keyword',
    });
    offset = match.index + value.length;
  }
  if (offset < text.length) tokens.push({ text: text.slice(offset), kind: 'plain' });
  return tokens;
}
