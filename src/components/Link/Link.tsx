/**
 * Skyfall Ledger — <Link />
 *
 * Styled anchor primitive for inline and standalone navigation. Supports
 * three variants (default, subtle, standalone), three sizes, external link
 * handling, and a disabled state. All styling is driven by inline styles
 * with CSS custom properties; pseudo-state transitions live in primitives.css.
 *
 * PRIMITIVES_CSS:
 * ================================================================
 *   LINK
 *   ================================================================
 *   .ledger-link {
 *     text-decoration: none;
 *     transition:
 *       color var(--ledger-duration-short) var(--ledger-easing-settle);
 *   }
 *   .ledger-link:hover:not([data-disabled]) {
 *     text-decoration: underline;
 *     color: var(--_color-hover, var(--_color));
 *   }
 *   .ledger-link[data-disabled] {
 *     opacity: 0.5;
 *     cursor: not-allowed;
 *     pointer-events: none;
 *   }
 */
import * as React from 'react';
import { fontSize, lineHeight, fontFamily } from '../../tokens/typography';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type LinkVariant = 'default' | 'subtle' | 'standalone';
export type LinkSize = 'sm' | 'md' | 'lg';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual treatment. @default 'default' */
  variant?: LinkVariant;
  /** Typography size preset. @default 'md' */
  size?: LinkSize;
  /** Adds target="_blank" with rel="noopener noreferrer" and optional external icon. @default false */
  external?: boolean;
  /** Prevents interaction without removing from tab order. @default false */
  disabled?: boolean;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// External link icon (arrow pointing up-right)
// ---------------------------------------------------------------------------
const ExternalIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ marginLeft: 2, flexShrink: 0 }}
  >
    <path d="M9 3L3 9" />
    <path d="M4 3h5v5" />
  </svg>
);

// ---------------------------------------------------------------------------
// Standalone arrow indicator (right-pointing chevron)
// ---------------------------------------------------------------------------
const ArrowIndicator: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ marginLeft: 4, flexShrink: 0 }}
  >
    <path d="M4.5 2.5L8 6l-3.5 3.5" />
  </svg>
);

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  fontSize: string;
  lineHeight: string;
  iconSize: number;
}

const SIZE_MAP: Record<LinkSize, SizeSpec> = {
  sm: { fontSize: fontSize['body-sm'], lineHeight: lineHeight['body-sm'], iconSize: 11 },
  md: { fontSize: fontSize['body-md'], lineHeight: lineHeight['body-md'], iconSize: 12 },
  lg: { fontSize: fontSize['body-lg'], lineHeight: lineHeight['body-lg'], iconSize: 14 },
};

// ---------------------------------------------------------------------------
// Variant color map — values are CSS custom properties consumed by .ledger-link
// ---------------------------------------------------------------------------
interface VariantColors {
  '--_color': string;
  '--_color-hover': string;
  textDecoration?: string;
}

const VARIANT_MAP: Record<LinkVariant, VariantColors> = {
  default: {
    '--_color': 'var(--ledger-color-teal-500)',
    '--_color-hover': 'var(--ledger-color-teal-400)',
    textDecoration: 'underline',
  },
  subtle: {
    '--_color': 'var(--ledger-color-text-secondary)',
    '--_color-hover': 'var(--ledger-color-text-primary)',
  },
  standalone: {
    '--_color': 'var(--ledger-color-teal-500)',
    '--_color-hover': 'var(--ledger-color-teal-400)',
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      size = 'md',
      external = false,
      disabled = false,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const sizeSpec = SIZE_MAP[size];
    const variantColors = VARIANT_MAP[variant];

    const mergedStyle: React.CSSProperties = {
      '--_color': variantColors['--_color'],
      '--_color-hover': variantColors['--_color-hover'],
      color: variantColors['--_color'],
      fontFamily: fontFamily.sans,
      fontSize: sizeSpec.fontSize,
      lineHeight: sizeSpec.lineHeight,
      textDecoration: variantColors.textDecoration ?? 'none',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
    } as React.CSSProperties;

    return (
      <a
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        data-disabled={disabled || undefined}
        data-variant={variant}
        className={cn('ledger-link', 'ledger-focus-ring', className)}
        style={mergedStyle}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(disabled ? { onClick: (e: React.MouseEvent) => e.preventDefault() } : {})}
        {...rest}
      >
        {children}
        {external && <ExternalIcon size={sizeSpec.iconSize} />}
        {variant === 'standalone' && !external && <ArrowIndicator size={sizeSpec.iconSize} />}
      </a>
    );
  },
);

Link.displayName = 'Link';
