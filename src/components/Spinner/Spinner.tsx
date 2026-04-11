/**
 * Skyfall Ledger -- <Spinner />
 *
 * A circular loading indicator. Supports four sizes and a configurable color.
 * Uses an SVG arc with a CSS rotation animation identical to Button's internal
 * spinner. All styling is inline via CSS custom properties.
 *
 * Accessibility:
 * - role="status" with aria-live="polite" so loading state is announced
 *   without interrupting the current screen-reader output
 * - Visually hidden "Loading..." label for assistive technology
 * - In financial workflows, always pair with visible context text
 *   ("Processing transaction...") so users understand the wait
 */
import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Keyframes — injected once at module level (shared with Button spinner)
// ---------------------------------------------------------------------------
if (typeof document !== 'undefined' && !document.getElementById('ledger-btn-keyframes')) {
  const style = document.createElement('style');
  style.id = 'ledger-btn-keyframes';
  style.textContent = '@keyframes ledger-spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// Visually-hidden styles (screen-reader-only)
// ---------------------------------------------------------------------------
const srOnlyStyles: React.CSSProperties = {
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
// Types
// ---------------------------------------------------------------------------
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter preset. @default 'md' */
  size?: SpinnerSize;
  /** Accessible label read by screen readers. @default 'Loading' */
  label?: string;
  /** Track + arc color. @default 'currentColor' */
  color?: string;
}

// ---------------------------------------------------------------------------
// Size map (px)
// ---------------------------------------------------------------------------
const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading', color = 'currentColor', className, style, ...props }, ref) => {
    const px = SIZE_MAP[size];

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn('ledger-spinner', className)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 0,
          ...style,
        }}
        {...props}
      >
        {/* SVG spinner arc */}
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{
            animation: 'ledger-spin 600ms linear infinite',
            flexShrink: 0,
          }}
        >
          {/* Background track */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.2"
          />
          {/* Spinning arc */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="50"
            strokeDashoffset="35"
          />
        </svg>

        {/* Visually hidden label for assistive technology */}
        <span style={srOnlyStyles}>{label}</span>
      </span>
    );
  },
);

Spinner.displayName = 'Spinner';
