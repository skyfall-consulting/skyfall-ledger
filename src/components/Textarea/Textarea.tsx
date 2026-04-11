/**
 * Skyfall Ledger — <Textarea />
 *
 * Multi-line text input primitive. Renders inside `.ledger-input-wrap` for
 * interactive border/focus transitions handled by primitives.css.
 * Reads FormFieldContext to auto-wire IDs and accessibility attributes.
 */
import * as React from 'react';
import { useFormField } from '../FormField/FormFieldContext';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Control size preset. @default 'md' */
  size?: TextareaSize;
  /** Renders a red border and ring. */
  invalid?: boolean;
  /** Resize behaviour. @default 'vertical' */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Number of visible text rows. @default 3 */
  rows?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  minHeight: string;
  padding: string;
  fontSize: string;
}

const SIZE_MAP: Record<TextareaSize, SizeSpec> = {
  sm: { minHeight: '32px', padding: '6px 8px', fontSize: '13px' },
  md: { minHeight: '40px', padding: '8px 12px', fontSize: '14px' },
  lg: { minHeight: '48px', padding: '10px 12px', fontSize: '16px' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      invalid,
      resize = 'vertical',
      rows = 3,
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
      height: 'auto',
      minHeight: spec.minHeight,
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
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={ariaInvalidProp ?? (isInvalid ? true : undefined)}
          aria-describedby={describedBy}
          style={{ resize }}
          {...rest}
        />
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
