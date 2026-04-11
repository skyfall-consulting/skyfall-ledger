/**
 * Skyfall Ledger -- <Progress />
 *
 * A linear progress bar supporting determinate (0-100) and
 * indeterminate modes. Color-coded by semantic tone for
 * status-aware loading and completion indicators.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ProgressSize = 'sm' | 'md';
export type ProgressTone = 'accent' | 'positive' | 'negative' | 'warning';

export interface ProgressProps {
  /** Progress value 0-100. Omit for indeterminate. */
  value?: number;
  /** Bar height preset. @default 'md' */
  size?: ProgressSize;
  /** Semantic color tone. @default 'accent' */
  tone?: ProgressTone;
  /** Accessible label for the progress bar. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Indeterminate keyframes injection
// ---------------------------------------------------------------------------
const INDETERMINATE_KEYFRAMES = `
@keyframes ledger-progress-indeterminate {
  0% { left: -30%; width: 30%; }
  50% { left: 40%; width: 40%; }
  100% { left: 100%; width: 30%; }
}`;

let injected = false;
function injectKeyframes() {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = INDETERMINATE_KEYFRAMES;
  document.head.appendChild(style);
  injected = true;
}

// ---------------------------------------------------------------------------
// Maps
// ---------------------------------------------------------------------------
const TONE_COLOR: Record<ProgressTone, string> = {
  accent: 'var(--ledger-color-teal-400)',
  positive: 'var(--ledger-color-positive)',
  negative: 'var(--ledger-color-negative)',
  warning: 'var(--ledger-color-warning)',
};

const SIZE_HEIGHT: Record<ProgressSize, number> = {
  sm: 4,
  md: 8,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      size = 'md',
      tone = 'accent',
      label,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    React.useEffect(() => {
      injectKeyframes();
    }, []);

    const isIndeterminate = value === undefined || value === null;
    const clampedValue = isIndeterminate
      ? undefined
      : Math.min(100, Math.max(0, value as number));

    const trackStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      height: SIZE_HEIGHT[size],
      background: 'var(--ledger-color-surface-sunken)',
      borderRadius: 'var(--ledger-radius-pill)',
      overflow: 'hidden',
      ...style,
    };

    const barStyle: React.CSSProperties = isIndeterminate
      ? {
          position: 'absolute',
          top: 0,
          height: '100%',
          borderRadius: 'var(--ledger-radius-pill)',
          background: TONE_COLOR[tone],
          animation: 'ledger-progress-indeterminate 1.4s ease infinite',
        }
      : {
          height: '100%',
          width: `${clampedValue}%`,
          borderRadius: 'var(--ledger-radius-pill)',
          background: TONE_COLOR[tone],
          transition: `width var(--ledger-duration-medium) var(--ledger-easing-settle)`,
        };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={className}
        style={trackStyle}
        {...rest}
      >
        <div style={barStyle} />
      </div>
    );
  },
);

Progress.displayName = 'Progress';
