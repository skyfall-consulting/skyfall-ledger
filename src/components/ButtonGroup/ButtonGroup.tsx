/**
 * Skyfall Ledger — <ButtonGroup />
 *
 * A layout wrapper that arranges Button / IconButton children in either a
 * horizontal or vertical strip. Two spacing modes:
 *
 *  - `spaced` (default) — 8px gap between children.
 *  - `attached` — children sit flush against each other with overlapping
 *    borders and radius adjustments so the group reads as a single control.
 */
import * as React from 'react';
import { space } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

// Attached-mode CSS classes are defined in primitives.css

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ButtonGroupDirection = 'horizontal' | 'vertical';
export type ButtonGroupSpacing = 'attached' | 'spaced';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout axis. @default 'horizontal' */
  direction?: ButtonGroupDirection;
  /** How children are spaced. @default 'spaced' */
  spacing?: ButtonGroupSpacing;
  /** Button or IconButton children. */
  children: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      direction = 'horizontal',
      spacing = 'spaced',
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isAttached = spacing === 'attached';

    const attachedClass = isAttached
      ? `ledger-btn-group--attached-${direction}`
      : undefined;

    const wrapperStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      alignItems: direction === 'vertical' ? 'stretch' : 'center',
      gap: isAttached ? 0 : space[3],
      ...style,
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn(attachedClass, className) || undefined}
        style={wrapperStyle}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
