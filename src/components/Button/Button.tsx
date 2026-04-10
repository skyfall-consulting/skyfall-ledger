/**
 * Skyfall Ledger — <Button />
 *
 * The primary interactive action surface. Supports four variants (primary,
 * secondary, ghost, danger), three sizes, a loading state with a spinner,
 * and full-width layout. All styling is driven by scoped CSS custom properties
 * consumed by `.ledger-btn` in primitives.css.
 */
import * as React from 'react';
import { controlHeight } from '../../tokens/sizing';
import { fontFamily, fontWeight } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

// ---------------------------------------------------------------------------
// Spinner keyframes — injected once at module level
// ---------------------------------------------------------------------------
if (typeof document !== 'undefined' && !document.getElementById('ledger-btn-keyframes')) {
  const style = document.createElement('style');
  style.id = 'ledger-btn-keyframes';
  style.textContent = '@keyframes ledger-spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// Spinner
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
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. @default 'primary' */
  variant?: ButtonVariant;
  /** Control height preset. @default 'md' */
  size?: ButtonSize;
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
  /** Stretch to fill container width. */
  fullWidth?: boolean;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  height: string;
  fontSize: string;
  padding: string;
  gap: number;
  spinnerSize: number;
}

const SIZE_MAP: Record<ButtonSize, SizeSpec> = {
  sm: { height: controlHeight.sm, fontSize: '13px', padding: '0 12px', gap: 6, spinnerSize: 14 },
  md: { height: controlHeight.md, fontSize: '14px', padding: '0 16px', gap: 8, spinnerSize: 16 },
  lg: { height: controlHeight.lg, fontSize: '16px', padding: '0 20px', gap: 8, spinnerSize: 18 },
};

// ---------------------------------------------------------------------------
// Variant color map — values are CSS custom properties consumed by .ledger-btn
// ---------------------------------------------------------------------------
interface VariantColors {
  '--_bg': string;
  '--_color': string;
  '--_border': string;
  '--_bg-hover': string;
  '--_bg-active': string;
  '--_border-hover': string;
}

const VARIANT_MAP: Record<ButtonVariant, VariantColors> = {
  primary: {
    '--_bg': 'var(--ledger-color-teal-500)',
    '--_color': 'var(--ledger-color-obsidian-950)',
    '--_border': 'transparent',
    '--_bg-hover': 'var(--ledger-color-teal-400)',
    '--_bg-active': 'var(--ledger-color-teal-600)',
    '--_border-hover': 'transparent',
  },
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
  danger: {
    '--_bg': 'var(--ledger-color-negative)',
    '--_color': '#fff',
    '--_border': 'transparent',
    '--_bg-hover': '#c83838',
    '--_bg-active': '#b83434',
    '--_border-hover': 'transparent',
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      children,
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
      display: fullWidth ? 'flex' : 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizeSpec.gap,
      height: sizeSpec.height,
      padding: sizeSpec.padding,
      width: fullWidth ? '100%' : undefined,
      fontFamily: fontFamily.sans,
      fontWeight: fontWeight.medium,
      fontSize: sizeSpec.fontSize,
      lineHeight: '1',
      borderRadius: radius.sm,
      whiteSpace: 'nowrap',
      userSelect: 'none',
      ...style,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={['ledger-btn', 'ledger-focus-ring', className]
          .filter(Boolean)
          .join(' ')}
        style={mergedStyle}
        {...rest}
      >
        {loading && <Spinner size={sizeSpec.spinnerSize} />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
