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
