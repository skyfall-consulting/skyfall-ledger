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

// ---------------------------------------------------------------------------
// Inject attached-mode CSS once (border-radius overrides via child position)
// ---------------------------------------------------------------------------
if (typeof document !== 'undefined' && !document.getElementById('ledger-btn-group-css')) {
  const style = document.createElement('style');
  style.id = 'ledger-btn-group-css';
  style.textContent = [
    /* Horizontal attached */
    '.ledger-btn-group--attached-horizontal > *:not(:first-child) { margin-left: -1px; }',
    '.ledger-btn-group--attached-horizontal > * { border-radius: 0; }',
    '.ledger-btn-group--attached-horizontal > *:first-child { border-top-left-radius: var(--ledger-radius-sm); border-bottom-left-radius: var(--ledger-radius-sm); }',
    '.ledger-btn-group--attached-horizontal > *:last-child { border-top-right-radius: var(--ledger-radius-sm); border-bottom-right-radius: var(--ledger-radius-sm); }',
    /* Vertical attached */
    '.ledger-btn-group--attached-vertical > *:not(:first-child) { margin-top: -1px; }',
    '.ledger-btn-group--attached-vertical > * { border-radius: 0; }',
    '.ledger-btn-group--attached-vertical > *:first-child { border-top-left-radius: var(--ledger-radius-sm); border-top-right-radius: var(--ledger-radius-sm); }',
    '.ledger-btn-group--attached-vertical > *:last-child { border-bottom-left-radius: var(--ledger-radius-sm); border-bottom-right-radius: var(--ledger-radius-sm); }',
    /* Hover z-index so overlapping borders look correct */
    '.ledger-btn-group--attached-horizontal > *:hover, .ledger-btn-group--attached-vertical > *:hover { position: relative; z-index: 1; }',
    '.ledger-btn-group--attached-horizontal > *:focus-visible, .ledger-btn-group--attached-vertical > *:focus-visible { position: relative; z-index: 2; }',
  ].join('\n');
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ButtonGroupDirection = 'horizontal' | 'vertical';
export type ButtonGroupSpacing = 'attached' | 'spaced';

export interface ButtonGroupProps {
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
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  direction = 'horizontal',
  spacing = 'spaced',
  children,
  className,
  style,
}) => {
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
      role="group"
      className={[attachedClass, className].filter(Boolean).join(' ') || undefined}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';
