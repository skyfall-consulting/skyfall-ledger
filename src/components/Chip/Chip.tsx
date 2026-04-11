/**
 * Skyfall Ledger -- <Chip />
 *
 * Compact element for filters, tags, and categories. Optionally interactive
 * (clickable) and dismissible. Uses the `.ledger-chip` CSS class from
 * primitives.css for hover/selected/disabled state transitions.
 */
import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ChipSize = 'sm' | 'md';

export interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Whether the chip is in a selected state. */
  selected?: boolean;
  /** Whether the chip is disabled. */
  disabled?: boolean;
  /** When provided, shows a dismiss button. */
  onDismiss?: () => void;
  /** When provided, the chip becomes interactive (rendered as a button). */
  onClick?: () => void;
  /** Size preset. @default 'md' */
  size?: ChipSize;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  height: number;
  fontSize: number;
  padding: string;
  gap: number;
}

const SIZE_MAP: Record<ChipSize, SizeSpec> = {
  sm: { height: 24, fontSize: 12, padding: '0 8px', gap: 4 },
  md: { height: 32, fontSize: 13, padding: '0 12px', gap: 6 },
};

// ---------------------------------------------------------------------------
// Dismiss icon (inline SVG, 12px)
// ---------------------------------------------------------------------------
const DismissIcon: React.FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    style={{ display: 'block' }}
  >
    <path
      d="M9 3L3 9M3 3l6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      children,
      selected = false,
      disabled = false,
      onDismiss,
      onClick,
      size = 'md',
      className,
      style,
      ...rest
    },
    ref,
  ) => {
  const sizeSpec = SIZE_MAP[size];
  const isInteractive = !!onClick;
  const Tag = isInteractive ? 'button' : 'span';

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    height: sizeSpec.height,
    padding: sizeSpec.padding,
    gap: sizeSpec.gap,
    borderRadius: 'var(--ledger-radius-pill)',
    fontFamily: 'var(--ledger-font-sans)',
    fontSize: sizeSpec.fontSize,
    fontWeight: 500,
    lineHeight: '1',
    whiteSpace: 'nowrap',
    // Reset button styles when interactive
    ...(isInteractive
      ? { cursor: 'pointer', outline: 'none' }
      : undefined),
    ...style,
  } as React.CSSProperties;

  const classes = cn(
    'ledger-chip',
    isInteractive && 'ledger-focus-ring',
    className,
  );

  const dataAttrs: Record<string, string | undefined> = {};
  if (isInteractive) dataAttrs['data-interactive'] = '';
  if (selected) dataAttrs['data-selected'] = '';
  if (disabled) dataAttrs['data-disabled'] = '';

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss?.();
  };

  return (
    <Tag
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      ref={ref as any}
      className={classes}
      style={chipStyle}
      onClick={isInteractive && !disabled ? onClick : undefined}
      disabled={isInteractive ? disabled : undefined}
      type={isInteractive ? 'button' : undefined}
      {...dataAttrs}
      {...rest}
    >
      {children}
      {onDismiss && !disabled && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={handleDismiss}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: 2,
            borderRadius: '50%',
            lineHeight: 0,
            flexShrink: 0,
            transition: 'background var(--ledger-duration-short) var(--ledger-easing-settle)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'var(--ledger-color-surface-sunken)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'none';
          }}
        >
          <DismissIcon />
        </button>
      )}
    </Tag>
  );
  },
);

Chip.displayName = 'Chip';
