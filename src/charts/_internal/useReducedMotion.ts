/**
 * Skyfall Ledger — useReducedMotion
 *
 * Read `prefers-reduced-motion`. Used to gate chart animations and the
 * digit-roll number tick. Defaults to `false` during SSR.
 */
import * as React from 'react';

export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return reduced;
};
