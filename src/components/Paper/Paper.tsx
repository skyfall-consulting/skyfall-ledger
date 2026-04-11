/**
 * Skyfall Ledger -- <Paper />
 *
 * The foundational surface primitive. Paper provides a styled surface
 * (background, border, shadow, radius) without any layout opinions.
 * It is the atom from which Card, Modal content areas, Drawer panels,
 * and other surface components compose.
 *
 * Lower-level than Card -- use Paper when you need granular control
 * over elevation, surface tone, and border presence without preset
 * variant bundles.
 */
import * as React from 'react';
import { cn } from '../../utils/cn';
import { shadowLight } from '../../tokens/shadows';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type PaperElevation = 0 | 1 | 2 | 3 | 4;
export type PaperSurface = 'default' | 'raised' | 'sunken';
export type PaperRadius = 'none' | 'sm' | 'md' | 'lg';
export type PaperPadding = 'none' | 'sm' | 'md' | 'lg';
export type PaperAs = 'div' | 'section' | 'article' | 'aside' | 'main';

export interface PaperProps extends React.HTMLAttributes<HTMLElement> {
  /** Elevation level (shadow depth). @default 0 */
  elevation?: PaperElevation;
  /** Surface background tone. @default 'default' */
  surface?: PaperSurface;
  /** Border radius preset. @default 'md' */
  radius?: PaperRadius;
  /** Whether to render a 1px border. @default false */
  bordered?: boolean;
  /** Padding preset. @default 'none' */
  padding?: PaperPadding;
  /** Polymorphic root element. @default 'div' */
  as?: PaperAs;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Token maps
// ---------------------------------------------------------------------------
const SURFACE_MAP: Record<PaperSurface, string> = {
  default: 'var(--ledger-color-surface-default)',
  raised: 'var(--ledger-color-surface-raised)',
  sunken: 'var(--ledger-color-surface-sunken)',
};

const ELEVATION_MAP: Record<PaperElevation, string> = {
  0: 'none',
  1: shadowLight[1],
  2: shadowLight[2],
  3: shadowLight[3],
  4: shadowLight[4],
};

const RADIUS_MAP: Record<PaperRadius, string> = {
  none: '0',
  sm: 'var(--ledger-radius-sm)',
  md: 'var(--ledger-radius-md)',
  lg: 'var(--ledger-radius-lg)',
};

const PADDING_MAP: Record<PaperPadding, string> = {
  none: '0',
  sm: 'var(--ledger-space-3)',   // 8px
  md: 'var(--ledger-space-5)',   // 16px
  lg: 'var(--ledger-space-7)',   // 24px
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Paper = React.forwardRef<HTMLElement, PaperProps>(
  (
    {
      elevation = 0,
      surface = 'default',
      radius = 'md',
      bordered = false,
      padding = 'none',
      as: Tag = 'div',
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const mergedStyle: React.CSSProperties = {
      background: SURFACE_MAP[surface],
      boxShadow: ELEVATION_MAP[elevation],
      borderRadius: RADIUS_MAP[radius],
      padding: PADDING_MAP[padding],
      ...(bordered && {
        border: '1px solid var(--ledger-color-border-default)',
      }),
      ...style,
    };

    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn('ledger-paper', className)}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Paper.displayName = 'Paper';
