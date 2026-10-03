import { expect, it } from 'vitest';
import { codeTokens, formatMarkdown } from '../src/lib/templates/markdown-edit';
it('formats only the selected content and returns its editing selection', () => {
  expect(formatMarkdown('before hello after', 7, 12, 'bold')).toEqual({
    text: 'before **hello** after',
    start: 9,
    end: 14,
  });
  expect(formatMarkdown('one\ntwo', 0, 7, 'list').text).toBe('- one\n- two');
  expect(formatMarkdown('x', 1, 1, 'code').text).toBe('x\n```\n\n```\n');
});
it('rejects invalid selection and oversized formatting without altering source', () => {
  expect(() => formatMarkdown('text', -1, 2, 'bold')).toThrow('INVALID_SELECTION');
  expect(() => formatMarkdown('text', 2, 5, 'bold')).toThrow('INVALID_SELECTION');
  expect(() => formatMarkdown('x'.repeat(12000), 0, 0, 'bold')).toThrow('NOTES_TOO_LONG');
});
it('preserves all source characters and identifies display tokens without executing input', () => {
  const source = 'const value = 12; return "<script>throw 1</script>"; // עברית';
  const tokens = codeTokens(source);
  expect(tokens.map((token) => token.text).join('')).toBe(source);
  expect(tokens.find((token) => token.text === 'const')?.kind).toBe('keyword');
  expect(tokens.find((token) => token.text === '12')?.kind).toBe('number');
  expect(tokens.find((token) => token.text.startsWith('"<script>'))?.kind).toBe('string');
  expect(codeTokens('')).toEqual([]);
});
