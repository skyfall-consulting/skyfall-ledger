/**
 * Skyfall Ledger — <TextField />
 *
 * Composed convenience component: FormField + Label + Input +
 * HelperText/ErrorText. Forwards a ref to the underlying `<input>`.
 *
 * Use this when you want a fully-assembled labeled text field in one
 * component. For custom layouts, compose FormField and Input directly.
 */
import * as React from 'react';
import { FormField } from '../FormField';
import { Input } from '../Input';
import type { InputSize } from '../Input';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Renders a Label above the input. */
  label?: string;
  /** Renders HelperText below the input. */
  helperText?: string;
  /** Renders ErrorText below the input (replaces helperText when present). */
  errorText?: string;
  /** Control height preset. @default 'md' */
  size?: InputSize;
  /** Marks the field as required. */
  required?: boolean;
  /** Marks the field as invalid. Derived from `!!errorText` when not set explicitly. */
  invalid?: boolean;
  /** Content rendered before the input (icon, prefix text, etc.). */
  leftSlot?: React.ReactNode;
  /** Content rendered after the input (icon, suffix text, etc.). */
  rightSlot?: React.ReactNode;
  /** Class name applied to the outer FormField wrapper. */
  className?: string;
  /** Inline styles applied to the outer FormField wrapper. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = 'md',
      required,
      invalid,
      leftSlot,
      rightSlot,
      className,
      style,
      disabled,
      ...inputProps
    },
    ref,
  ) => {
    return (
      <FormField
        label={label}
        helperText={helperText}
        errorText={errorText}
        required={required}
        disabled={disabled}
        invalid={invalid}
        className={className}
        style={style}
      >
        <Input
          ref={ref}
          size={size}
          leftSlot={leftSlot}
          rightSlot={rightSlot}
          {...inputProps}
        />
      </FormField>
    );
  },
);

TextField.displayName = 'TextField';
