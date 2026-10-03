'use client';
import { useRef } from 'react';
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
            onClick={() => {
              const element = editor.current;
              if (!element) return;
              const change = formatMarkdown(
                value,
                element.selectionStart,
                element.selectionEnd,
                format,
              );
              onChange(change.text);
              requestAnimationFrame(() => {
                element.focus();
                element.setSelectionRange(change.start, change.end);
              });
            }}
            disabled={disabled || value.length > 11980}
          >
            {label}
          </button>
        ))}
      </div>
      <textarea
        id={id}
        ref={editor}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={12000}
        rows={8}
        disabled={disabled}
        dir="auto"
      />
      <span className="muted">{value.length.toLocaleString('he-IL')} מתוך 12,000 תווים</span>
    </div>
  );
}
