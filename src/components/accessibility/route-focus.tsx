'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { reducedMotion } from '@/lib/domain/motion';
export function RouteFocus() {
  const pathname = usePathname(),
    previous = useRef(pathname);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    // Preserve explicit anchor navigation such as skill dependencies.
    if (location.hash) return;
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'instant' : 'smooth' });
  }, [pathname]);
  return null;
}
