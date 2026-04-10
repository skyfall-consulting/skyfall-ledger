/**
 * Skyfall Ledger — useMediaQuery
 *
 * Tiny SSR-safe matchMedia hook. Used by responsive components and the
 * `useReducedMotion` hook is its specialized cousin in the chart layer.
 */
import * as React from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, [query]);

  return matches;
};
