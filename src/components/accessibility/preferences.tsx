'use client';
import { containDialogFocus } from '@/lib/client/dialog';
import { useEffect, useRef, useState } from 'react';
import { Accessibility, X } from 'lucide-react';
type Preferences = { contrast: boolean; monochrome: boolean; motion: boolean; size: number };
const defaults: Preferences = { contrast: false, monochrome: false, motion: false, size: 100 };
const key = 'agent-engineer-accessibility-v1';
function apply(p: Preferences) {
  const root = document.documentElement;
  root.dataset.contrast = p.contrast ? 'high' : 'normal';
  root.dataset.monochrome = String(p.monochrome);
  root.dataset.motion = p.motion ? 'reduce' : 'system';
  root.style.setProperty('--font-scale', String(p.size / 100));
}
export function AccessibilityMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [preferences, setPreferences] = useState(defaults);
  function readPreferences(): Preferences {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved)
        return {
          contrast: saved.contrast === true,
          monochrome: saved.monochrome === true,
          motion: saved.motion === true,
          size: [100, 125, 150, 200].includes(saved.size) ? saved.size : 100,
        };
    } catch {}
    return defaults;
  }
  useEffect(() => {
    apply(readPreferences());
  }, []);
  function change(p: Preferences) {
    setPreferences(p);
    apply(p);
    try {
      localStorage.setItem(key, JSON.stringify(p));
    } catch {}
  }
  return (
    <>
      <button
        className="accessibility-toggle button secondary"
        aria-label="פתיחת אפשרויות נגישות"
        aria-haspopup="dialog"
        onClick={() => {
          setPreferences(readPreferences());
          dialog.current?.showModal();
        }}
      >
        <Accessibility aria-hidden="true" size={21} />
        <span>נגישות</span>
      </button>
      <dialog
        onKeyDown={containDialogFocus}
        className="utility-dialog"
        aria-labelledby="accessibility-title"
        ref={dialog}
      >
        <div className="dialog-heading">
          <h2 id="accessibility-title">אפשרויות נגישות</h2>
          <button
            className="icon-button"
            aria-label="סגירת אפשרויות נגישות"
            onClick={() => dialog.current?.close()}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <p>ההעדפות נשמרות בדפדפן הזה. אפשר להשתמש גם בהגדלת התצוגה של הדפדפן (זום).</p>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={preferences.contrast}
            onChange={(e) => change({ ...preferences, contrast: e.target.checked })}
          />
          ניגודיות גבוהה
        </label>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={preferences.monochrome}
            onChange={(e) => change({ ...preferences, monochrome: e.target.checked })}
          />
          גווני אפור
        </label>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={preferences.motion}
            onChange={(e) => change({ ...preferences, motion: e.target.checked })}
          />
          הפחתת תנועה ועצירת אנימציות
        </label>
        <label className="field-label">
          גודל טקסט
          <select
            value={preferences.size}
            onChange={(e) => change({ ...preferences, size: Number(e.target.value) })}
          >
            {[100, 125, 150, 200].map((size) => (
              <option key={size} value={size}>
                {size}%
              </option>
            ))}
          </select>
        </label>
        <button className="button secondary" onClick={() => change(defaults)}>
          איפוס העדפות
        </button>
      </dialog>
    </>
  );
}
