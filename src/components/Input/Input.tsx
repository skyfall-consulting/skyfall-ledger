/**
 * Skyfall Ledger — <Input />
 *
 * Base text input primitive. Renders inside `.ledger-input-wrap` for
 * interactive border/focus transitions handled by primitives.css.
 * Reads FormFieldContext to auto-wire IDs and accessibility attributes.
 */
import * as React from 'react';
import { useFormField } from '../FormField/FormFieldContext';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Control height preset. @default 'md' */
  size?: InputSize;
  /** Renders a red border and ring. */
  invalid?: boolean;
  /** Content rendered before the input (icon, prefix text, etc.). */
  leftSlot?: React.ReactNode;
  /** Content rendered after the input (icon, suffix text, etc.). */
  rightSlot?: React.ReactNode;
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

const SIZE_MAP: Record<InputSize, SizeSpec> = {
  sm: { height: '32px', padding: '0 8px', fontSize: '13px' },
  md: { height: '40px', padding: '0 12px', fontSize: '14px' },
  lg: { height: '48px', padding: '0 12px', fontSize: '16px' },
};

// ---------------------------------------------------------------------------
// Slot wrapper
// ---------------------------------------------------------------------------
const slotStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  color: 'var(--ledger-color-text-muted)',
  flexShrink: 0,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      invalid,
      leftSlot,
      rightSlot,
      className,
      style,
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
      ...style,
    } as React.CSSProperties;

    return (
      <div
        className={cn('ledger-input-wrap', className)}
        style={wrapperStyle}
        {...(isInvalid ? { 'data-invalid': '' } : {})}
        {...(isDisabled ? { 'data-disabled': '' } : {})}
      >
        {leftSlot && <span style={slotStyle}>{leftSlot}</span>}
        <input
          ref={ref}
          id={id}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={
            ariaInvalidProp ?? (isInvalid ? true : undefined)
          }
          aria-describedby={describedBy}
          {...rest}
        />
        {rightSlot && <span style={slotStyle}>{rightSlot}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
