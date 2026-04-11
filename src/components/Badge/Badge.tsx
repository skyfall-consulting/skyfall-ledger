/**
 * Skyfall Ledger -- <Badge />
 *
 * Small inline label for status or category information. Renders a
 * subtle-background + stronger-text pairing driven by semantic tone.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type BadgeTone = 'neutral' | 'positive' | 'negative' | 'warning' | 'info' | 'accent';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color tone. @default 'neutral' */
  tone?: BadgeTone;
  /** Badge height preset. @default 'md' */
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Tone color map
// ---------------------------------------------------------------------------
interface ToneColors {
  background: string;
  color: string;
}

const TONE_MAP: Record<BadgeTone, ToneColors> = {
  neutral: {
    background: 'var(--ledger-color-surface-sunken)',
    color: 'var(--ledger-color-text-secondary)',
  },
  positive: {
    background: 'var(--ledger-color-positive-subtle)',
    color: 'var(--ledger-color-positive)',
  },
  negative: {
    background: 'var(--ledger-color-negative-subtle)',
    color: 'var(--ledger-color-negative)',
  },
  warning: {
    background: 'var(--ledger-color-warning-subtle)',
    color: 'var(--ledger-color-warning)',
  },
  info: {
    background: 'var(--ledger-color-info-subtle)',
    color: 'var(--ledger-color-info)',
  },
  accent: {
    background: 'var(--ledger-color-teal-900)',
    color: 'var(--ledger-color-teal-300)',
  },
};

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  height: number;
  fontSize: number;
  padding: string;
  textTransform?: 'uppercase';
}

const SIZE_MAP: Record<BadgeSize, SizeSpec> = {
  sm: { height: 20, fontSize: 11, padding: '0 6px', textTransform: 'uppercase' },
  md: { height: 24, fontSize: 12, padding: '0 8px' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = 'neutral',
      size = 'md',
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const toneColors = TONE_MAP[tone];
    const sizeSpec = SIZE_MAP[size];

    const badgeStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      height: sizeSpec.height,
      padding: sizeSpec.padding,
      borderRadius: 'var(--ledger-radius-xs)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: sizeSpec.fontSize,
      fontWeight: 500,
      letterSpacing: '0.02em',
      textTransform: sizeSpec.textTransform,
      whiteSpace: 'nowrap',
      background: toneColors.background,
      color: toneColors.color,
      ...style,
    };

    return (
      <span ref={ref} className={className} style={badgeStyle} {...rest}>
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
