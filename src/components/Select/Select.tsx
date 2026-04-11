/**
 * Skyfall Ledger — <Select />
 *
 * Native dropdown select primitive. Renders inside `.ledger-input-wrap` for
 * interactive border/focus transitions handled by primitives.css.
 * Reads FormFieldContext to auto-wire IDs and accessibility attributes.
 */
import * as React from 'react';
import { useFormField } from '../FormField/FormFieldContext';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Control height preset. @default 'md' */
  size?: SelectSize;
  /** Renders a red border and ring. */
  invalid?: boolean;
  /** Stretch to fill parent width. */
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  height: string;
  padding: string;
  fontSize: string;
}

const SIZE_MAP: Record<SelectSize, SizeSpec> = {
  sm: { height: '32px', padding: '0 8px', fontSize: '13px' },
  md: { height: '40px', padding: '0 12px', fontSize: '14px' },
  lg: { height: '48px', padding: '0 12px', fontSize: '16px' },
};

// ---------------------------------------------------------------------------
// Chevron icon
// ---------------------------------------------------------------------------
const chevronStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
  color: 'var(--ledger-color-text-muted)',
  flexShrink: 0,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'md',
      invalid,
      fullWidth = false,
      className,
      style,
      children,
      id: idProp,
      disabled: disabledProp,
      required: requiredProp,
      'aria-describedby': ariaDescribedByProp,
      'aria-invalid': ariaInvalidProp,
      ...rest
    },
    ref,
  ) => {
    const ctx = useFormField();
    const spec = SIZE_MAP[size];

    // Resolve props from context, allowing explicit overrides
    const id = idProp ?? ctx?.id;
    const isDisabled = disabledProp ?? ctx?.disabled ?? false;
    const isRequired = requiredProp ?? ctx?.required ?? false;
    const isInvalid = invalid ?? ctx?.invalid ?? false;

    // Build aria-describedby from context helper/error IDs
    const describedBy =
      ariaDescribedByProp ??
      (ctx
        ? [ctx.invalid ? ctx.errorId : ctx.helperId]
            .filter(Boolean)
            .join(' ') || undefined
        : undefined);

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--ledger-space-3)',
      height: spec.height,
      padding: spec.padding,
      borderRadius: 'var(--ledger-radius-sm)',
      background: 'var(--ledger-color-surface-default)',
      color: 'var(--ledger-color-text-primary)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: spec.fontSize,
      ...(fullWidth ? { width: '100%' } : {}),
      ...style,
    } as React.CSSProperties;

    return (
      <div
        className={cn('ledger-input-wrap', className)}
        style={wrapperStyle}
        {...(isInvalid ? { 'data-invalid': '' } : {})}
        {...(isDisabled ? { 'data-disabled': '' } : {})}
      >
        <select
          ref={ref}
          id={id}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={ariaInvalidProp ?? (isInvalid ? true : undefined)}
          aria-describedby={describedBy}
          style={{ appearance: 'none', cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          {...rest}
        >
          {children}
        </select>
        <span style={chevronStyle} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </div>
    );
  },
);

Select.displayName = 'Select';
