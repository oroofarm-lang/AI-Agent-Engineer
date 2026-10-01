/** Shared by navigation and the CSS companion; respects OS and explicit user preference. */
export function reducedMotion() {
  return (
    document.documentElement.dataset.motion === 'reduce' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
