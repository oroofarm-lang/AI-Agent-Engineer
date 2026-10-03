---
generated: true
schema_version: 1
kind: "asset"
entity_id: "UPLOAD_COMPONENT"
curriculum_version: "2.2.0"
source_path: "src/components/assessment/artifact-picker.tsx"
asset_kind: "ui-code"
source_sha256: "bbf9f27e7bbd2a0669779d5dbe947cc9a0262084beaa32bad7b761ae4d6571e4"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/WEB]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בחירת קבצים ותצוגה מקדימה

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/assessment/artifact-picker.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/assessment/artifact-picker.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';
import { useEffect, useRef, useState } from 'react';
import { FileUp, X, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import {
  artifactAccept,
  artifactExtensions,
  MAX_FILES,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
} from '@/lib/domain/artifacts';
export type SelectedArtifact = { id: string; criterionId: string; file: File };

function FilePreview({ file }: { file: File }) {
  const [preview, setPreview] = useState<{ url?: string; text?: string }>({});
  useEffect(() => {
    let active = true;
    const url = ['image/png', 'image/jpeg'].includes(file.type)
      ? URL.createObjectURL(file)
      : undefined;
    if (url)
      Promise.resolve().then(() => {
        if (active) setPreview({ url });
      });
    else if (!/\.pdf$/i.test(file.name))
      file
        .slice(0, 2400)
        .text()
        .then((text) => {
          if (active) setPreview({ text });
        });
    return () => {
      active = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [file]);
  // Object URLs stay local; Next image optimization would require a remote request.
  return preview.url ? (
    <Image
      unoptimized
      width={400}
      height={240}
      src={preview.url}
      alt={`תצוגה מקדימה של ${file.name}`}
      className="artifact-image"
    />
  ) : preview.text ? (
    <pre className="artifact-code" dir="auto">
      {preview.text}
      {file.size > 2400 ? '\n… תצוגה מקדימה חלקית' : ''}
    </pre>
  ) : (
    <p className="muted">לא מוצגת כרגע תצוגה מקדימה. פרטי הקובץ מופיעים למעלה.</p>
  );
}
export function ArtifactPicker({
  criterionId,
  files,
  onChange,
  disabled,
}: {
  criterionId: string;
  files: SelectedArtifact[];
  onChange: (files: SelectedArtifact[]) => void;
  disabled: boolean;
}) {
  const picker = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(''),
    [dragging, setDragging] = useState(false),
    [replaceId, setReplaceId] = useState<string>();
  function add(newFiles: File[], replacement?: string) {
    const retained = replacement ? files.filter((item) => item.id !== replacement) : files;
    if (
      retained.length + newFiles.length > MAX_FILES ||
      newFiles.some((file) => file.size <= 0 || file.size > MAX_FILE_BYTES) ||
      [...retained.map((item) => item.file), ...newFiles].reduce(
        (sum, file) => sum + file.size,
        0,
      ) > MAX_TOTAL_BYTES
    ) {
      setError('בחר עד 6 קבצים להגשה, עד 3MB לקובץ ועד 8MB בסך הכול. קובץ ריק אינו נתמך.');
      return;
    }
    if (
      newFiles.some(
        (file) =>
          !artifactExtensions.includes(file.name.split('.').pop()?.toLowerCase() || '') ||
          /[\x00-\x1f\x7f/\\]/.test(file.name) ||
          file.name.length > 180,
      )
    ) {
      setError('בחר קובץ קוד או טקסט, PDF, PNG או JPEG.');
      return;
    }
    onChange([
      ...retained,
      ...newFiles.map((file) => ({ id: crypto.randomUUID(), criterionId, file })),
    ]);
    setError('');
  }
  return (
    <div className="artifact-picker">
      <div
        className={`artifact-dropzone ${dragging ? 'is-dragging' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!disabled) add(Array.from(event.dataTransfer.files));
        }}
      >
        <FileUp aria-hidden="true" size={26} />
        <strong>קבצים שתומכים בתשובה שלך</strong>
        <p>גרור לכאן קוד, צילום מסך או PDF, או בחר קובץ מהמחשב.</p>
        <input
          ref={picker}
          type="file"
          className="sr-only"
          tabIndex={-1}
          aria-label={`קבצים לשאלה ${criterionId}`}
          accept={artifactAccept}
          multiple={!replaceId}
          disabled={disabled}
          onChange={(event) => {
            if (event.target.files) add(Array.from(event.target.files), replaceId);
            setReplaceId(undefined);
            event.target.value = '';
          }}
        />
        <button
          type="button"
          className="button secondary"
          disabled={disabled}
          onClick={() => {
            setReplaceId(undefined);
            picker.current?.click();
          }}
        >
          בחירת קבצים
        </button>
        <small>עד 3MB לקובץ · 6 קבצים ו־8MB להגשה · בלי סיסמאות או מידע של לקוחות</small>
      </div>
      <p role="status" className="form-error">
        {error}
      </p>
      <ul className="artifact-list" aria-label="קבצים שנבחרו לשאלה">
        {files
          .filter((item) => item.criterionId === criterionId)
          .map((item) => (
            <li key={item.id}>
              <div className="artifact-heading">
                <strong dir="auto">{item.file.name}</strong>
                <span dir="ltr">{(item.file.size / 1024).toFixed(1)} KB</span>
              </div>
              <FilePreview file={item.file} />
              <div className="artifact-actions">
                <button
                  type="button"
                  className="button subtle"
                  disabled={disabled}
                  aria-label={`החלפת ${item.file.name}`}
                  onClick={() => {
                    setReplaceId(item.id);
                    picker.current?.click();
                  }}
                >
                  <RefreshCw size={14} />
                  החלפה
                </button>
                <button
                  type="button"
                  className="button subtle"
                  disabled={disabled}
                  aria-label={`הסרת ${item.file.name}`}
                  onClick={() => onChange(files.filter((file) => file.id !== item.id))}
                >
                  <X size={14} />
                  הסרה
                </button>
              </div>
              <small className="muted">הקובץ יישמר בחשבון שלך רק בעת ההגשה.</small>
            </li>
          ))}
      </ul>
    </div>
  );
}

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/WEB|אתרים וכלים פנימיים]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
