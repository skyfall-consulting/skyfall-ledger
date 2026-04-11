/**
 * Skyfall Ledger -- <VisuallyHidden />
 *
 * Renders content that is hidden visually but remains accessible to
 * screen readers and other assistive technology. Uses the standard
 * screen-reader-only CSS technique (position: absolute, clip,
 * overflow: hidden) to keep content in the document flow for
 * assistive tech while hiding it from sighted users.
 *
 * Use for:
 * - Labels for icon-only buttons
 * - Additional context for screen readers
 * - Skip navigation links
 * - Form labels that are visually unnecessary but needed for a11y
 *
 * Note: `primitives.css` already ships a `.ledger-sr-input` class
 * for hidden radio/checkbox inputs. This component is a more
 * general-purpose wrapper for any content that should be visually
 * hidden while remaining accessible.
 */
import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ElementType = 'span' | 'div' | 'label';

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a different element. @default 'span' */
  as?: ElementType;
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const hiddenStyles: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const VisuallyHidden = React.forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ as: Component = 'span', className, style, children, ...props }, ref) => {
    return (
      <Component
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        ref={ref as any}
        className={cn('ledger-visually-hidden', className)}
        style={{ ...hiddenStyles, ...style }}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

VisuallyHidden.displayName = 'VisuallyHidden';
