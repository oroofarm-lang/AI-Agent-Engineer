'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
type Task = { kind: 'lesson' | 'assessment'; id: string; title: string };
const Context = createContext<Task | null>(null);
/** Capture explicitly active course UI, never drafts, private files or arbitrary page text. */
export function MentorContext({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [selected, setSelected] = useState<{ pathname: string; task: Task } | null>(null);
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
    <Context value={selected?.pathname === pathname ? selected.task : null}>
      <div
        className="mentor-context-root"
        onFocusCapture={(event) => capture(event.target)}
        onClickCapture={(event) => capture(event.target)}
      >
        {children}
      </div>
    </Context>
  );
}
export const useMentorContext = () => useContext(Context);
