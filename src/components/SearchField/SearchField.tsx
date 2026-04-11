/**
 * Skyfall Ledger — <SearchField />
 *
 * Search-specialized input with a magnifying glass icon on the left and an
 * optional clear (X) button on the right. Renders inside `.ledger-input-wrap`
 * for interactive border/focus transitions handled by primitives.css.
 * Reads FormFieldContext to auto-wire IDs and accessibility attributes.
 */
import * as React from 'react';
import { useFormField } from '../FormField/FormFieldContext';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SearchFieldSize = 'sm' | 'md' | 'lg';

export interface SearchFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type'
  > {
  /** Control height preset. @default 'md' */
  size?: SearchFieldSize;
  /** Renders a red border and ring. */
  invalid?: boolean;
  /** Callback when the clear button is clicked. */
  onClear?: () => void;
  /** Whether to display the clear button when the input has a value. @default true */
  showClearButton?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Size map (matches Input exactly)
// ---------------------------------------------------------------------------
interface SizeSpec {
  height: string;
  padding: string;
  fontSize: string;
}

const SIZE_MAP: Record<SearchFieldSize, SizeSpec> = {
  sm: { height: '32px', padding: '0 8px', fontSize: '13px' },
  md: { height: '40px', padding: '0 12px', fontSize: '14px' },
  lg: { height: '48px', padding: '0 12px', fontSize: '16px' },
};

// ---------------------------------------------------------------------------
// Icon styles
// ---------------------------------------------------------------------------
const searchIconStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  color: 'var(--ledger-color-text-muted)',
};

const clearButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: 0,
  margin: 0,
  border: 'none',
  background: 'transparent',
  color: 'var(--ledger-color-text-muted)',
  cursor: 'pointer',
  borderRadius: 'var(--ledger-radius-xs, 4px)',
  outline: 'none',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      size = 'md',
      invalid,
      onClear,
      showClearButton = true,
      className,
      style,
      value,
      defaultValue,
      onChange,
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

    // Internal ref for uncontrolled mode clear support
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref],
    );

    // Track value for showing/hiding the clear button
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? '',
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = Boolean(currentValue);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange],
    );

    const handleClear = React.useCallback(() => {
      if (!isControlled && innerRef.current) {
        // Trigger a native-like change so React picks it up
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value',
        )?.set;
        nativeInputValueSetter?.call(innerRef.current, '');
        const event = new Event('input', { bubbles: true });
        innerRef.current.dispatchEvent(event);
        setInternalValue('');
      }
      onClear?.();
      innerRef.current?.focus();
    }, [isControlled, onClear]);

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
        {/* Magnifying glass icon */}
        <span style={searchIconStyle} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="7"
              cy="7"
              r="4.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10.5 10.5 14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <input
          ref={combinedRef}
          type="search"
          role="searchbox"
          id={id}
          disabled={isDisabled}
          required={isRequired}
          value={isControlled ? (value as string) : undefined}
          defaultValue={!isControlled ? (defaultValue as string) : undefined}
          onChange={handleChange}
          aria-invalid={ariaInvalidProp ?? (isInvalid ? true : undefined)}
          aria-describedby={describedBy}
          {...rest}
        />

        {/* Clear button — visible only when there is a value */}
        {showClearButton && hasValue && (
          <button
            type="button"
            style={clearButtonStyle}
            onClick={handleClear}
            aria-label="Clear search"
            tabIndex={-1}
            disabled={isDisabled}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

SearchField.displayName = 'SearchField';
