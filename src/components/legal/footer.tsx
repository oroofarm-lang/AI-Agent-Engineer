'use client';
import { containDialogFocus } from '@/lib/client/dialog';
import { useRef, useState } from 'react';
import type { LegalDocument } from '@/lib/legal';
import { X } from 'lucide-react';
export function LegalFooter({
  documents,
  operator,
}: {
  documents: LegalDocument[];
  operator: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(documents[0]);
  return (
    <footer className="page-footer legal-footer">
      <nav className="legal-links" aria-label="מדיניות וזכויות">
        {documents.map((doc) => (
          <button
            key={doc.id}
            aria-haspopup="dialog"
            onClick={() => {
              setSelected(doc);
              dialog.current?.showModal();
            }}
          >
            {doc.title}
          </button>
        ))}
      </nav>
      <span>
        © {new Date().getFullYear()} {operator} · זכויות צדדים שלישיים שמורות.
      </span>
      <span>התוכן הלימודי עשוי להיכתב בעזרת AI. בדוק את המידע לפני שימוש.</span>
      <dialog
        onKeyDown={containDialogFocus}
        ref={dialog}
        className="utility-dialog legal-content"
        aria-labelledby="legal-title"
      >
        <div className="dialog-heading">
          <h2 id="legal-title">{selected.title}</h2>
          <button
            className="icon-button"
            aria-label="סגירת מסמך המדיניות"
            onClick={() => dialog.current?.close()}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        {selected.sections.map((section) => (
          <section key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </section>
        ))}
      </dialog>
    </footer>
  );
}
