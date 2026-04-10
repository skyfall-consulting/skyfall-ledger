/**
 * Skyfall Ledger — <FormField />
 *
 * Structural wrapper that composes Label, HelperText/ErrorText, and a
 * form control. Generates stable IDs with `React.useId()` and provides
 * them (plus state flags) through FormFieldContext so child controls
 * auto-wire `id`, `aria-describedby`, `aria-invalid`, etc.
 */
import * as React from 'react';
import { FormFieldProvider } from './FormFieldContext';
import type { FormFieldContextValue } from './FormFieldContext';
import { Label } from './Label';
import { HelperText } from './HelperText';
import { ErrorText } from './ErrorText';

export interface FormFieldProps {
  /** Renders a Label above the control. */
  label?: string;
  /** Renders HelperText below the control. */
  helperText?: string;
  /** Renders ErrorText below the control (replaces helperText when present). */
  errorText?: string;
  /** Marks the field and label as required. */
  required?: boolean;
  /** Marks the field and label as disabled. */
  disabled?: boolean;
  /** Marks the field as invalid. Derived from `!!errorText` when not set explicitly. */
  invalid?: boolean;
  /** The form control (Input, Select, etc.). */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  helperText,
  errorText,
  required = false,
  disabled = false,
  invalid,
  children,
  className,
  style,
}) => {
  const reactId = React.useId();
  const id = `ledger-field-${reactId}`;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  const isInvalid = invalid ?? !!errorText;

  const ctx: FormFieldContextValue = {
    id,
    helperId,
    errorId,
    invalid: isInvalid,
    disabled,
    required,
  };

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ledger-space-2)',
    ...style,
  } as React.CSSProperties;

  return (
    <FormFieldProvider value={ctx}>
      <div className={className} style={wrapperStyle}>
        {label && (
          <Label htmlFor={id} required={required} disabled={disabled}>
            {label}
          </Label>
        )}
        {children}
        {errorText ? (
          <ErrorText id={errorId}>{errorText}</ErrorText>
        ) : helperText ? (
          <HelperText id={helperId}>{helperText}</HelperText>
        ) : null}
      </div>
    </FormFieldProvider>
  );
};

FormField.displayName = 'FormField';
