'use client';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { codeTokens, formatMarkdown, type MarkdownFormat } from '@/lib/templates/markdown-edit';

export function MarkdownPreview({ text }: { text: string }) {
  return (
    <div className="template-preview" dir="auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          table: ({ children }) => (
            <div
              className="template-table-scroll"
              role="region"
              tabIndex={0}
              aria-label="תצוגת הטבלה — אפשר לגלול לרוחב"
            >
              <table>{children}</table>
            </div>
          ),
          // Links remain readable text here: preview never navigates away from unsaved work.
          a: ({ children }) => <span className="text-link">{children}</span>,
          img: ({ alt }) => <span>{alt || 'תמונה'}</span>,
          code: ({ children, className }) => (
            <code className={className}>
              {codeTokens(String(children)).map((token, i) => (
                <span key={i} className={`code-token-${token.kind}`}>
                  {token.text}
                </span>
              ))}
            </code>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
export function MarkdownEditor({
  id,
  value,
  onChange,
  disabled = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const editor = useRef<HTMLTextAreaElement>(null);
  const [formatError, setFormatError] = useState('');
  function applyFormat(format: MarkdownFormat) {
    const element = editor.current;
    if (!element || disabled) return;
    try {
      const change = formatMarkdown(value, element.selectionStart, element.selectionEnd, format);
      onChange(change.text);
      setFormatError('');
      requestAnimationFrame(() => {
        element.focus();
        element.setSelectionRange(change.start, change.end);
      });
    } catch {
      setFormatError(
        'העיצוב לא הוחל כי הוא חורג ממגבלת 12,000 התווים. הטקסט שלך לא השתנה. קצר מעט את הטקסט ונסה שוב.',
      );
      element.focus();
    }
  }
  const formats: [MarkdownFormat, string][] = [
    ['bold', 'הדגשה'],
    ['italic', 'כתב נטוי'],
    ['heading', 'כותרת'],
    ['list', 'רשימה'],
    ['code', 'קטע קוד'],
  ];
  return (
    <div className="template-markdown-editor">
      <label htmlFor={id}>הסבר, תוצאות ומה למדתי</label>
      <div className="template-toolbar" role="group" aria-label="עיצוב הטקסט">
        {formats.map(([format, label]) => (
          <button
            type="button"
            key={format}
            onClick={() => applyFormat(format)}
            aria-keyshortcuts={
              format === 'bold'
                ? 'Control+b Meta+b'
                : format === 'italic'
                  ? 'Control+i Meta+i'
                  : undefined
            }
            disabled={disabled}
          >
            {label}
          </button>
        ))}
      </div>
      <textarea
        id={id}
        ref={editor}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setFormatError('');
        }}
        onKeyDown={(event) => {
          if (
            !(event.ctrlKey || event.metaKey) ||
            event.altKey ||
            event.shiftKey ||
            event.nativeEvent.isComposing
          )
            return;
          const key = event.key.toLowerCase();
          if (key !== 'b' && key !== 'i') return;
          event.preventDefault();
          applyFormat(key === 'b' ? 'bold' : 'italic');
        }}
        aria-describedby={`${id}-format-help ${id}-format-error`}
        maxLength={12000}
        rows={8}
        disabled={disabled}
        dir="auto"
      />
      <p id={`${id}-format-help`} className="muted">
        אפשר לעצב טקסט מסומן באמצעות הכפתורים. קיצורי מקלדת: Ctrl או ⌘ עם B להדגשה ועם I לכתב נטוי.
      </p>
      <p id={`${id}-format-error`} role="status" className="form-error">
        {formatError}
      </p>
      <span className="muted">{value.length.toLocaleString('he-IL')} מתוך 12,000 תווים</span>
    </div>
  );
}
