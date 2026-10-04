'use client';
import NextLink from 'next/link';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';

type Check = () => boolean;
function createGuard() {
  const checks = new Set<Check>();
  return {
    register(check: Check) {
      checks.add(check);
      return () => {
        checks.delete(check);
      };
    },
    pending: () => [...checks].some((check) => check()),
  };
}
const Context = createContext<ReturnType<typeof createGuard> | null>(null);
export function WorkspaceNavigation({ children }: { children: ReactNode }) {
  const [guard] = useState(createGuard);
  useEffect(() => {
    function warn(event: BeforeUnloadEvent) {
      if (!guard.pending()) return;
      event.preventDefault();
      event.returnValue = '';
    }
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [guard]);
  return <Context value={guard}>{children}</Context>;
}
export function useWorkspaceNavigation() {
  const guard = useContext(Context);
  if (!guard) throw new Error('WorkspaceNavigation provider is required.');
  return guard;
}
/** Check live save receipts, including hidden workspaces, without collecting their contents. */
export default function GuardedLink({ onNavigate, ...props }: ComponentProps<typeof NextLink>) {
  const guard = useWorkspaceNavigation();
  return (
    <NextLink
      {...props}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (
          guard.pending() &&
          !window.confirm(
            'יש עבודה שעדיין לא התקבל אישור לשמירתה. מעבר לעמוד אחר עלול לגרום לאובדן שינויים. לעבור בכל זאת?',
          )
        )
          event.preventDefault();
      }}
    />
  );
}
