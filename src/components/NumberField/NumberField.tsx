/**
 * Skyfall Ledger — <NumberField />
 *
 * Specialized text field for numeric and currency input. Uses
 * `inputMode="decimal"` instead of `type="number"` to avoid browser
 * spinner UX issues. Applies tabular numerals for column-aligned figures.
 *
 * Composes FormField + Input internally — same accessibility wiring as
 * TextField, with added prefix/suffix slot support for currency symbols.
 */
import * as React from 'react';
import { FormField } from '../FormField';
import { Input } from '../Input';
import type { InputSize } from '../Input';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface NumberFieldProps {
  /** Current value (controlled). */
  value?: number | string;
  /** Called with the parsed number (or `undefined` if empty) and the raw event. */
  onChange?: (
    value: number | undefined,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
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
  /** Text displayed in the left slot (e.g. "$"). */
  prefix?: string;
  /** Text displayed in the right slot (e.g. "USD"). */
  suffix?: string;
  /** Minimum value (informational — not enforced on keystrokes). */
  min?: number;
  /** Maximum value (informational — not enforced on keystrokes). */
  max?: number;
  /** Step increment (set on the underlying input for accessibility). */
  step?: number;
  /** Placeholder text. */
  placeholder?: string;
  /** Disables the input. */
  disabled?: boolean;
  /** Class name applied to the outer FormField wrapper. */
  className?: string;
  /** Inline styles applied to the outer FormField wrapper. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Slot styling
// ---------------------------------------------------------------------------
const affixStyle: React.CSSProperties = {
  color: 'var(--ledger-color-text-muted)',
  fontFeatureSettings: '"tnum", "lnum"',
  fontVariantNumeric: 'tabular-nums lining-nums',
  userSelect: 'none',
  lineHeight: 1,
};

// ---------------------------------------------------------------------------
// Tabular numeral style applied to the input wrapper
// ---------------------------------------------------------------------------
const tabularStyle: React.CSSProperties = {
  fontFeatureSettings: '"tnum", "lnum"',
  fontVariantNumeric: 'tabular-nums lining-nums',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      value,
      onChange,
      label,
      helperText,
      errorText,
      size = 'md',
      required,
      invalid,
      prefix,
      suffix,
      min,
      max,
      step,
      placeholder,
      disabled,
      className,
      style,
    },
    ref,
  ) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return;
        const raw = e.target.value;
        if (raw === '' || raw === '-') {
          onChange(undefined, e);
          return;
        }
        const parsed = Number(raw);
        onChange(Number.isNaN(parsed) ? undefined : parsed, e);
      },
      [onChange],
    );

    const leftSlot = prefix ? (
      <span style={affixStyle}>{prefix}</span>
    ) : undefined;

    const rightSlot = suffix ? (
      <span style={affixStyle}>{suffix}</span>
    ) : undefined;

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
          type="text"
          inputMode="decimal"
          size={size}
          leftSlot={leftSlot}
          rightSlot={rightSlot}
          value={value !== undefined ? String(value) : undefined}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          style={tabularStyle}
        />
      </FormField>
    );
  },
);

NumberField.displayName = 'NumberField';
