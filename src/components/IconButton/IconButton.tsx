/**
 * Skyfall Ledger — <IconButton />
 *
 * A square, icon-only action surface. Restricted to `ghost` and `secondary`
 * variants — primary and danger call-to-actions should always use a labeled
 * <Button> for clarity. Requires `aria-label` at the type level.
 */
import * as React from 'react';
import { controlHeight } from '../../tokens/sizing';
import { radius } from '../../tokens/radius';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Spinner (same visual as Button)
// ---------------------------------------------------------------------------
const Spinner: React.FC<{ size: number }> = ({ size }) => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'ledger-spin 600ms linear infinite',
      flexShrink: 0,
    }}
  />
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type IconButtonVariant = 'secondary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** The icon element to render. */
  icon: React.ReactNode;
  /** Accessible label — required for icon-only buttons. */
  'aria-label': string;
  /** Visual treatment. @default 'ghost' */
  variant?: IconButtonVariant;
  /** Control height preset. @default 'md' */
  size?: IconButtonSize;
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
  /** Additional CSS class names. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Size map — square buttons
// ---------------------------------------------------------------------------
interface SizeSpec {
  dimension: string;
  iconSize: number;
}

const SIZE_MAP: Record<IconButtonSize, SizeSpec> = {
  sm: { dimension: controlHeight.sm, iconSize: 16 },
  md: { dimension: controlHeight.md, iconSize: 20 },
  lg: { dimension: controlHeight.lg, iconSize: 24 },
};

// ---------------------------------------------------------------------------
// Variant color map
// ---------------------------------------------------------------------------
interface VariantColors {
  '--_bg': string;
  '--_color': string;
  '--_border': string;
  '--_bg-hover': string;
  '--_bg-active': string;
  '--_border-hover': string;
}

const VARIANT_MAP: Record<IconButtonVariant, VariantColors> = {
  secondary: {
    '--_bg': 'transparent',
    '--_color': 'var(--ledger-color-text-primary)',
    '--_border': 'var(--ledger-color-border-default)',
    '--_bg-hover': 'var(--ledger-color-surface-sunken)',
    '--_bg-active': 'var(--ledger-color-surface-sunken)',
    '--_border-hover': 'var(--ledger-color-border-strong)',
  },
  ghost: {
    '--_bg': 'transparent',
    '--_color': 'var(--ledger-color-text-secondary)',
    '--_border': 'transparent',
    '--_bg-hover': 'var(--ledger-color-surface-sunken)',
    '--_bg-active': 'var(--ledger-color-surface-sunken)',
    '--_border-hover': 'transparent',
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      'aria-label': ariaLabel,
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled = false,
      className,
      style,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const sizeSpec = SIZE_MAP[size];
    const variantColors = VARIANT_MAP[variant];
    const isDisabled = disabled || loading;

    const mergedStyle: React.CSSProperties = {
      ...variantColors,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeSpec.dimension,
      height: sizeSpec.dimension,
      padding: 0,
      borderRadius: radius.sm,
      flexShrink: 0,
      ...style,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={cn('ledger-btn', 'ledger-focus-ring', className)}
        style={mergedStyle}
        {...rest}
      >
        {loading ? (
          <Spinner size={sizeSpec.iconSize} />
        ) : (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: sizeSpec.iconSize,
              height: sizeSpec.iconSize,
            }}
          >
            {icon}
          </span>
        )}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
