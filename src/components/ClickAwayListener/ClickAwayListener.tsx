/**
 * Skyfall Ledger -- <ClickAwayListener />
 *
 * Utility wrapper that detects clicks (mousedown / touchstart) outside
 * the wrapped child element and fires the provided callback. Commonly
 * used to dismiss dropdowns, popovers, and modals when the user
 * interacts with the rest of the page.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ClickAwayListenerProps {
  /** Callback fired when a click is detected outside the child element. */
  onClickAway: () => void;
  /** A single React element. A ref will be attached via `cloneElement`. */
  children: React.ReactElement;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  onClickAway,
  children,
}) => {
  const childRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleEvent = (event: MouseEvent | TouchEvent) => {
      if (
        childRef.current &&
        !childRef.current.contains(event.target as Node)
      ) {
        onClickAway();
      }
    };

    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('touchstart', handleEvent);

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    };
  }, [onClickAway]);

  return React.cloneElement(children, { ref: childRef });
};
