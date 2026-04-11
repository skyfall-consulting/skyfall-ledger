/**
 * Skyfall Ledger -- <Skeleton />
 *
 * A loading placeholder with a shimmer animation. Supports text,
 * rectangular, and circular variants for composing realistic
 * loading states that mirror final layouts.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SkeletonVariant = 'text' | 'rectangular' | 'circular';

export interface SkeletonProps {
  /** Shape of the skeleton. @default 'text' */
  variant?: SkeletonVariant;
  /** Width of the skeleton. Accepts CSS values. */
  width?: string | number;
  /** Height of the skeleton. Accepts CSS values. */
  height?: string | number;
  /** Number of text lines to render (text variant only). @default 1 */
  lines?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Shimmer keyframes injection
// ---------------------------------------------------------------------------
const SHIMMER_KEYFRAMES = `
@keyframes ledger-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}`;

let injected = false;
function injectKeyframes() {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = SHIMMER_KEYFRAMES;
  document.head.appendChild(style);
  injected = true;
}

// ---------------------------------------------------------------------------
// Shared shimmer styles
// ---------------------------------------------------------------------------
const shimmerBackground = {
  background:
    'linear-gradient(90deg, var(--ledger-color-surface-sunken) 25%, var(--ledger-color-surface-default) 50%, var(--ledger-color-surface-sunken) 75%)',
  backgroundSize: '200% 100%',
  animation: 'ledger-shimmer 1.5s infinite',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      lines = 1,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    React.useEffect(() => {
      injectKeyframes();
    }, []);

    if (variant === 'text' && lines > 1) {
      return (
        <div
          ref={ref}
          className={className}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ledger-space-2)',
            ...style,
          }}
          {...rest}
        >
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              style={{
                ...shimmerBackground,
                height: height ?? '1em',
                width:
                  i === lines - 1
                    ? typeof width === 'number'
                      ? width * 0.6
                      : '60%'
                    : width ?? '100%',
                borderRadius: 'var(--ledger-radius-xs)',
              }}
            />
          ))}
        </div>
      );
    }

    const resolvedWidth =
      variant === 'circular'
        ? width ?? 40
        : width ?? (variant === 'text' ? '100%' : undefined);

    const resolvedHeight =
      variant === 'circular'
        ? height ?? width ?? 40
        : height ?? (variant === 'text' ? '1em' : undefined);

    const borderRadius =
      variant === 'circular'
        ? '50%'
        : variant === 'rectangular'
          ? 'var(--ledger-radius-sm)'
          : 'var(--ledger-radius-xs)';

    const skeletonStyle: React.CSSProperties = {
      ...shimmerBackground,
      display: 'block',
      width: resolvedWidth,
      height: resolvedHeight,
      borderRadius,
      ...style,
    };

    return (
      <div ref={ref} className={className} style={skeletonStyle} {...rest} />
    );
  },
);

Skeleton.displayName = 'Skeleton';
