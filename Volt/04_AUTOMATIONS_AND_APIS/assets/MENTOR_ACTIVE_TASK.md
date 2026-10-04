---
generated: true
schema_version: 1
kind: "asset"
entity_id: "MENTOR_ACTIVE_TASK"
curriculum_version: "2.2.0"
source_path: "src/components/learning/mentor-context.tsx"
asset_kind: "ui-code"
source_sha256: "df48674aa0baa7873d0d4ff9a9780c41b127155cfc367b172f2326fdf4505c4f"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בחירת ההקשר הנוכחי בשיעור ובתרגיל

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/learning/mentor-context.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/learning/mentor-context.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';
import { createContext, useContext, useState, useRef, useMemo, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
export type ExplanationLevel = 'eli5' | 'practical' | 'advanced';
export type Task = { kind: 'lesson' | 'assessment'; id: string; title: string };
type Opener = (task: Task, level: ExplanationLevel) => void;
const Actions = createContext<{
  requestHelp: Opener;
  registerOpener: (callback: Opener) => () => void;
} | null>(null);
const Context = createContext<Task | null>(null);
/** Capture explicitly active course UI, never drafts, private files or arbitrary page text. */
export function MentorContext({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const opener = useRef<Opener | null>(null);
  const [selected, setSelected] = useState<{ pathname: string; task: Task } | null>(null);
  const actions = useMemo(
    () => ({
      requestHelp(task: Task, level: ExplanationLevel) {
        setSelected({ pathname, task });
        opener.current?.(task, level);
      },
      registerOpener(callback: Opener) {
        opener.current = callback;
        return () => {
          if (opener.current === callback) opener.current = null;
        };
      },
    }),
    [pathname],
  );
  function capture(target: EventTarget) {
    if (!(target instanceof HTMLElement)) return;
    const section = target.closest<HTMLElement>('[data-mentor-kind][data-mentor-id]');
    if (!section) return;
    const kind = section.dataset.mentorKind,
      id = section.dataset.mentorId;
    if ((kind !== 'lesson' && kind !== 'assessment') || !id) return;
    setSelected({ pathname, task: { kind, id, title: section.dataset.mentorTitle || '' } });
  }
  return (
    <Actions value={actions}>
      <Context value={selected?.pathname === pathname ? selected.task : null}>
        <div
          className="mentor-context-root"
          onFocusCapture={(event) => capture(event.target)}
          onClickCapture={(event) => capture(event.target)}
        >
          {children}
        </div>
      </Context>
    </Actions>
  );
}
export const useMentorContext = () => useContext(Context);

export function useMentorActions() {
  const actions = useContext(Actions);
  if (!actions) throw new Error('MentorContext provider is required.');
  return actions;
}

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/QUALITY|איכות, אבטחה ובקרה]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
