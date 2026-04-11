/**
 * Skyfall Ledger -- <Portal />
 *
 * Renders children into a DOM node outside the parent React
 * component hierarchy using `React.createPortal`. Defaults to
 * `document.body` but accepts a custom container via the
 * `container` prop.
 *
 * Use for overlays, tooltips, modals, and other floating content
 * that needs to escape stacking context or overflow constraints.
 *
 * Falls back to inline rendering during SSR or when `disabled`.
 *
 * Accessibility:
 * - Portal does not affect the accessibility tree
 * - Focus management is the responsibility of the portal content
 * - Ensure ARIA relationships (`aria-describedby`, `aria-labelledby`)
 *   still work across the portal boundary
 */
import * as React from 'react';
import { createPortal } from 'react-dom';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PortalProps {
  /** Content to render in the portal. */
  children: React.ReactNode;
  /** Target container element. @default document.body */
  container?: Element | null;
  /** When `true`, renders children inline instead of portalling. @default false */
  disabled?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Portal: React.FC<PortalProps> = ({
  children,
  container,
  disabled = false,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // SSR-safe: render inline until the component mounts on the client.
  if (disabled || !mounted) {
    return <>{children}</>;
  }

  return createPortal(children, container ?? document.body);
};

Portal.displayName = 'Portal';
