/**
 * Skyfall Ledger — <Typography />
 *
 * Text rendering primitive for the Ledger design system. Maps to the Ledger
 * type-scale tokens and provides a consistent API for rendering text at any
 * level of the hierarchy. Supports polymorphic rendering via `as`, single-line
 * ellipsis truncation, multi-line clamping, and tabular-numeric features for
 * mono variants used in financial surfaces.
 *
 * All styling is inline via CSS custom properties — no .module.css files.
 */
import * as React from 'react';
import {
  fontSize,
  lineHeight,
  fontFamily,
  fontWeight,
  tracking,
  numeric,
} from '../../tokens/typography';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TypographyVariant =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'label'
  | 'mono-lg'
  | 'mono-md'
  | 'mono-sm';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'inherit';

export type TypographyAlign = 'left' | 'center' | 'right';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Typographic scale variant. @default 'body-md' */
  variant?: TypographyVariant;
  /** Text color mapped to Ledger semantic color tokens. @default 'primary' */
  color?: TypographyColor;
  /** Text alignment. */
  align?: TypographyAlign;
  /** Render as a specific HTML element (overrides the variant default). */
  as?: React.ElementType;
  /** Truncate to a single line with ellipsis. */
  truncate?: boolean;
  /** Clamp text to N visible lines. */
  lineClamp?: number;
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Variant -> semantic HTML element map
// ---------------------------------------------------------------------------

const variantElementMap: Record<TypographyVariant, React.ElementType> = {
  'display-xl': 'h1',
  'display-lg': 'h1',
  'display-md': 'h2',
  'title-lg': 'h3',
  'title-md': 'h4',
  'title-sm': 'h5',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  label: 'span',
  'mono-lg': 'span',
  'mono-md': 'span',
  'mono-sm': 'span',
};

// ---------------------------------------------------------------------------
// Variant -> style spec map
// ---------------------------------------------------------------------------

interface VariantSpec {
  fontSize: string;
  lineHeight: string;
  fontFamily: string;
  fontWeight: number;
  letterSpacing: string;
  fontFeatureSettings?: string;
}

const variantStyles: Record<TypographyVariant, VariantSpec> = {
  'display-xl': {
    fontSize: fontSize['display-xl'],
    lineHeight: lineHeight['display-xl'],
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.bold,
    letterSpacing: tracking.tight,
  },
  'display-lg': {
    fontSize: fontSize['display-lg'],
    lineHeight: lineHeight['display-lg'],
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.bold,
    letterSpacing: tracking.tight,
  },
  'display-md': {
    fontSize: fontSize['display-md'],
    lineHeight: lineHeight['display-md'],
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.semibold,
    letterSpacing: tracking.tight,
  },
  'title-lg': {
    fontSize: fontSize['title-lg'],
    lineHeight: lineHeight['title-lg'],
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.semibold,
    letterSpacing: tracking.normal,
  },
  'title-md': {
    fontSize: fontSize['title-md'],
    lineHeight: lineHeight['title-md'],
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.semibold,
    letterSpacing: tracking.normal,
  },
  'title-sm': {
    fontSize: fontSize['title-sm'],
    lineHeight: lineHeight['title-sm'],
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    letterSpacing: tracking.normal,
  },
  'body-lg': {
    fontSize: fontSize['body-lg'],
    lineHeight: lineHeight['body-lg'],
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.normal,
  },
  'body-md': {
    fontSize: fontSize['body-md'],
    lineHeight: lineHeight['body-md'],
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.normal,
  },
  'body-sm': {
    fontSize: fontSize['body-sm'],
    lineHeight: lineHeight['body-sm'],
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.wide,
  },
  label: {
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.semibold,
    letterSpacing: tracking.label,
  },
  'mono-lg': {
    fontSize: fontSize['mono-lg'],
    lineHeight: lineHeight['mono-lg'],
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
    letterSpacing: tracking.normal,
    fontFeatureSettings: numeric.tabular,
  },
  'mono-md': {
    fontSize: fontSize['mono-md'],
    lineHeight: lineHeight['mono-md'],
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.normal,
    fontFeatureSettings: numeric.tabular,
  },
  'mono-sm': {
    fontSize: fontSize['mono-sm'],
    lineHeight: lineHeight['mono-sm'],
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.normal,
    fontFeatureSettings: numeric.tabular,
  },
};

// ---------------------------------------------------------------------------
// Color map — Ledger semantic color tokens
// ---------------------------------------------------------------------------

const colorMap: Record<TypographyColor, string | undefined> = {
  primary: 'var(--ledger-color-text-primary)',
  secondary: 'var(--ledger-color-text-secondary)',
  muted: 'var(--ledger-color-text-muted)',
  inverse: 'var(--ledger-color-text-inverse)',
  positive: 'var(--ledger-color-positive)',
  negative: 'var(--ledger-color-negative)',
  warning: 'var(--ledger-color-warning)',
  info: 'var(--ledger-color-info)',
  inherit: undefined, // let color inherit from parent
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body-md',
      color = 'primary',
      align,
      as,
      truncate = false,
      lineClamp,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const Component = as || variantElementMap[variant];
    const spec = variantStyles[variant];
    const resolvedColor = colorMap[color];

    const mergedStyle: React.CSSProperties = {
      fontSize: spec.fontSize,
      lineHeight: spec.lineHeight,
      fontFamily: spec.fontFamily,
      fontWeight: spec.fontWeight,
      letterSpacing: spec.letterSpacing,
      fontFeatureSettings: spec.fontFeatureSettings,
      color: resolvedColor,
      textAlign: align,
      margin: 0,
      // Truncation: single-line ellipsis
      ...(truncate
        ? {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }
        : undefined),
      // Line clamping: multi-line truncation
      ...(lineClamp
        ? {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: lineClamp,
            overflow: 'hidden',
          }
        : undefined),
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={cn('ledger-typography', `ledger-typography-${variant}`, className)}
        data-variant={variant}
        data-truncate={truncate || undefined}
        data-line-clamp={lineClamp || undefined}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = 'Typography';
