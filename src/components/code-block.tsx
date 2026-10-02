'use client';
import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
export function CodeBlock({ children }: { children: React.ReactNode }) {
  const pre = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="code-block" dir="ltr">
      <div className="code-toolbar">
        <span>CODE / TERMINAL</span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(pre.current?.textContent ?? '');
              setCopied(true);
              setFailed(false);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              setCopied(false);
              setFailed(true);
            }
          }}
          aria-label="העתקת קוד"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'הועתק' : 'העתקה'}
        </button>
      </div>
      <pre ref={pre} tabIndex={0}>
        {children}
      </pre>
      {failed && (
        <p role="status" dir="rtl">
          ההעתקה האוטומטית לא הצליחה. אפשר לבחור את הקוד ולהעתיק ידנית.
        </p>
      )}
    </div>
  );
}
