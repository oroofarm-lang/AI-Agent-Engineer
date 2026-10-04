'use client';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import {
  DraftSaveCoordinator,
  DraftSaveError,
  type SaveView,
} from '@/lib/templates/save-coordinator';
import {
  validateTemplateDocument,
  type TemplateDefinition,
  type TemplateDocument,
} from '@/lib/templates/schema';
import {
  exportTemplateCSV,
  exportTemplateJSON,
  importTemplateCSV,
  importTemplateJSON,
  templateMarkdown,
  templateSubmission,
} from '@/lib/templates/formats';
import { TableEditor } from './table-editor';
import { MarkdownEditor, MarkdownPreview } from './markdown-editor';
import styles from './workspace.module.css';
export type InitialWorkspace = {
  definition: TemplateDefinition;
  definitionHash: string;
  document: TemplateDocument;
  revision: number;
  readOnly: boolean;
};
function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function TemplateWorkspace({
  initial,
  curriculumVersion,
  disabled,
  onUse,
  onSubmissionState,
}: {
  initial: InitialWorkspace;
  curriculumVersion: string;
  disabled: boolean;
  onUse: (text: string) => void;
  onSubmissionState: (id: string, state: { revision: number; ready: boolean }) => void;
}) {
  const [coordinator] = useState(
    () =>
      new DraftSaveCoordinator({
        ...initial,
        curriculumVersion,
        uuid: () => crypto.randomUUID(),
        send: async (input) => {
          const response = await fetch('/api/templates/drafts', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
            signal: AbortSignal.timeout(20000),
          });
          const body = await response.json();
          if (!response.ok)
            throw new DraftSaveError(typeof body.error === 'string' ? body.error : 'SAVE_FAILED');
          return body;
        },
      }),
  );
  const [view, setView] = useState<SaveView>(() => coordinator.view());
  const [local, setLocal] = useState(initial.document);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [invalid, setInvalid] = useState(false),
    [message, setMessage] = useState('');
  const invalidRef = useRef(false);
  const locked = disabled || initial.readOnly || view.status === 'read-only';
  useEffect(() => coordinator.subscribe(() => setView(coordinator.view())), [coordinator]);
  useEffect(() => {
    if (locked || invalid || view.status !== 'unsaved') return;
    const timer = setTimeout(() => {
      void coordinator.flush().catch(() => {});
    }, 700);
    return () => clearTimeout(timer);
  }, [coordinator, invalid, locked, view]);
  useEffect(() => {
    function warn(event: BeforeUnloadEvent) {
      if (invalidRef.current || !['saved', 'read-only'].includes(coordinator.view().status)) {
        event.preventDefault();
        event.returnValue = '';
      }
    }
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [coordinator]);
  function edit(document: TemplateDocument) {
    onSubmissionState(initial.definition.id, { revision: view.revision, ready: false });
    setLocal(document);
    setMessage('');
    try {
      coordinator.edit(document);
      invalidRef.current = false;
      setInvalid(false);
    } catch {
      invalidRef.current = true;
      setInvalid(true);
    }
  }
  let text = '',
    ready = false;
  try {
    text = templateMarkdown(local, initial.definition);
    templateSubmission(local, initial.definition);
    ready = true;
  } catch {
    /* Incomplete/temporarily invalid work remains editable and is never submitted. */
  }
  useEffect(() => {
    onSubmissionState(initial.definition.id, {
      revision: view.revision,
      ready: ready && !invalid && view.status === 'saved' && !initial.readOnly,
    });
  }, [
    onSubmissionState,
    initial.definition.id,
    initial.readOnly,
    view.revision,
    view.status,
    ready,
    invalid,
  ]);
  async function reloadSaved() {
    if (
      !window.confirm('טעינת הטיוטה השמורה תחליף את העבודה המקומית. הורד עותק לפני ההחלפה. להמשיך?')
    )
      return;
    try {
      const response = await fetch(
        `/api/templates/drafts?${new URLSearchParams({ templateId: initial.definition.id, definitionHash: initial.definitionHash })}`,
        { cache: 'no-store' },
      );
      if (!response.ok) throw new Error('LOAD_FAILED');
      const result = z
        .object({
          draft: z.object({
            definitionHash: z.literal(initial.definitionHash),
            revision: z.number().int().nonnegative(),
            readOnly: z.boolean(),
            document: z.unknown(),
          }),
        })
        .parse(await response.json());
      const document = validateTemplateDocument(result.draft.document, initial.definition);
      coordinator.replaceFromServer(document, result.draft.revision, result.draft.readOnly);
      setLocal(document);
      invalidRef.current = false;
      setInvalid(false);
      setMessage('הטיוטה השמורה נטענה.');
    } catch {
      setMessage('הטעינה נכשלה. העבודה המקומית לא הוחלפה.');
    }
  }
  const statuses = {
    saved: 'הטיוטה שמורה בחשבון שלך.',
    unsaved: 'יש שינויים שטרם נשמרו.',
    saving: 'שומר את הטיוטה…',
    failed: 'לא התקבל אישור לשמירת השינויים. העבודה עדיין מוצגת כאן; נסה שוב או הורד עותק.',
    conflict:
      'גרסת הטיוטה או התבנית השתנתה. העבודה המקומית עדיין מוצגת כאן; הורד עותק לפני טעינת הטיוטה השמורה.',
    'read-only': 'הטיוטה הזו זמינה לקריאה בלבד.',
  };
  return (
    <div className={styles.workspace} data-template-workspace={initial.definition.id}>
      <p className="muted">{initial.definition.guidance}</p>
      <p role="status" aria-live="polite">
        {invalid
          ? 'הטיוטה לא נשמרת כרגע. אם זו טבלה, ודא שלכל עמודה יש שם. בדוק גם שהתוכן אינו חורג מהמגבלות.'
          : statuses[view.status]}
      </p>
      <TableEditor
        definition={initial.definition}
        document={local}
        onChange={edit}
        disabled={locked}
      />
      <MarkdownEditor
        id={`${initial.definition.id}-notes`}
        value={local.notes}
        onChange={(notes) => edit({ ...local, notes })}
        disabled={locked}
      />
      <details>
        <summary>תצוגה מקדימה של העבודה</summary>
        <MarkdownPreview text={text || local.notes} />
      </details>
      <div className="template-toolbar">
        {invalid && (
          <button
            type="button"
            className="button secondary"
            onClick={() =>
              download(
                `${initial.definition.id}-local-copy.json`,
                JSON.stringify(local, null, 2),
                'application/json',
              )
            }
          >
            הורדת עותק מקומי לתיקון
          </button>
        )}
        {invalid && (
          <p className="muted">
            העותק כולל את העבודה כפי שהיא כעת. ייתכן שיהיה צורך לתקן אותו לפני ייבוא מחדש.
          </p>
        )}

        <button
          type="button"
          className="button secondary"
          disabled={locked || invalid || view.status !== 'failed'}
          onClick={() => {
            void coordinator.flush(true).catch(() => {});
          }}
        >
          ניסיון שמירה נוסף
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={view.status !== 'conflict'}
          onClick={() => {
            void reloadSaved();
          }}
        >
          טעינת הטיוטה השמורה
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={invalid}
          onClick={() =>
            download(
              `${initial.definition.id}.json`,
              exportTemplateJSON(local, initial.definition),
              'application/json',
            )
          }
        >
          הורדת JSON
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={invalid || exportingPDF}
          onClick={async () => {
            setExportingPDF(true);
            try {
              const { exportTemplatePDF } = await import('@/lib/templates/pdf');
              const blob = await exportTemplatePDF(local, initial.definition);
              const url = URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = `${initial.definition.id}.pdf`;
              anchor.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            } catch {
              setMessage('לא הצלחנו ליצור את קובץ ה־PDF. העבודה עדיין כאן; אפשר לנסות שוב.');
            } finally {
              setExportingPDF(false);
            }
          }}
        >
          {exportingPDF ? 'מכין PDF…' : 'הורדת PDF'}
        </button>
        {local.table && (
          <button
            type="button"
            className="button secondary"
            disabled={invalid}
            onClick={() =>
              download(
                `${initial.definition.id}.csv`,
                exportTemplateCSV(local, initial.definition),
                'text/csv;charset=utf-8',
              )
            }
          >
            הורדת CSV
          </button>
        )}
        <label className="field-label">
          ייבוא עבודה מ־JSON{local.table ? ' או CSV' : ''}
          <input
            type="file"
            accept={local.table ? '.json,.csv' : '.json'}
            disabled={locked}
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (!file) return;
              if (file.size > 180000) {
                setMessage('הקובץ גדול מדי. אפשר לייבא עד 180KB.');
                return;
              }
              try {
                const source = await file.text();
                const next = file.name.toLowerCase().endsWith('.csv')
                  ? importTemplateCSV(source, local, initial.definition)
                  : importTemplateJSON(source, initial.definition);
                if (window.confirm('הייבוא יחליף את העבודה המקומית. להמשיך?')) edit(next);
              } catch {
                setMessage('הייבוא נכשל. בדוק שהקובץ מתאים לתבנית. העבודה הקיימת לא הוחלפה.');
              }
            }}
          />
        </label>
        <button
          type="button"
          className="button primary"
          disabled={locked || invalid || !ready || view.status !== 'saved'}
          onClick={() => {
            if (!window.confirm('תוכן התבנית יחליף את התשובה הקיימת בסעיף הזה. להמשיך?')) return;
            onUse(templateSubmission(local, initial.definition).text);
            setMessage(
              'תוכן התבנית החליף את התשובה בסעיף הזה. בדוק את כל הסעיפים לפני הגשת העבודה.',
            );
          }}
        >
          החלפת התשובה בתוכן התבנית
        </button>
      </div>
      <p role="status">{message}</p>
    </div>
  );
}
