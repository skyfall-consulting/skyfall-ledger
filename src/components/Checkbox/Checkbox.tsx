/**
 * Skyfall Ledger — <Checkbox />
 *
 * A controlled or uncontrolled checkbox with optional indeterminate state.
 * Supports standalone use and integration with FormField context for
 * automatic id / disabled / required wiring.
 *
 * Visual styling delegates to `.ledger-checkbox` in primitives.css for
 * hover and checked-state transitions. Layout and sizing are inline.
 */
import * as React from 'react';
import { useFormField } from '../FormField/FormFieldContext';
import { fontFamily } from '../../tokens/typography';
import { focus } from '../../tokens/focus';
import { space } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const CheckIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M11.5 4L5.5 10L2.5 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M3 7h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'checked' | 'defaultChecked'> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Show the indeterminate (minus) mark instead of the check. */
  indeterminate?: boolean;
  /** Called when the user toggles the checkbox. */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disable the checkbox. */
  disabled?: boolean;
  /** Text or element rendered beside the checkbox. */
  label?: React.ReactNode;
  /** Additional class names on the root label. */
  className?: string;
  /** Additional inline styles on the root label. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      onChange,
      disabled: disabledProp = false,
      label,
      className,
      style,
      id: idProp,
      name,
      value,
      required: requiredProp,
      ...rest
    },
    ref,
  ) => {
    // ---- FormField integration (optional) ---------------------------------
    const field = useFormField();
    const id = idProp ?? field?.id;
    const disabled = disabledProp || (field?.disabled ?? false);
    const required = requiredProp ?? field?.required ?? false;

    // ---- Internal state ---------------------------------------------------
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    // ---- Focus-visible tracking -------------------------------------------
    const [focusVisible, setFocusVisible] = React.useState(false);

    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      try {
        if (e.target.matches(':focus-visible')) {
          setFocusVisible(true);
        }
      } catch {
        // :focus-visible not supported — fall back to always showing
        setFocusVisible(true);
      }
    }, []);

    const handleBlur = React.useCallback(() => {
      setFocusVisible(false);
    }, []);

    // ---- Change handler ---------------------------------------------------
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.checked;
        if (!isControlled) {
          setInternalChecked(next);
        }
        onChange?.(next, e);
      },
      [isControlled, onChange],
    );

    // ---- Indeterminate ref sync -------------------------------------------
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Merge forwarded ref with our internal ref
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref],
    );

    // ---- Data attributes for CSS ------------------------------------------
    const dataAttrs: Record<string, string> = {};
    if (isChecked && !indeterminate) dataAttrs['data-checked'] = '';
    if (indeterminate) dataAttrs['data-indeterminate'] = '';
    if (disabled) dataAttrs['data-disabled'] = '';

    // ---- Styles -----------------------------------------------------------
    const rootStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: space[3],
      ...style,
    };

    const boxStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      borderRadius: 'var(--ledger-radius-xs)',
      flexShrink: 0,
      color: isChecked || indeterminate ? '#fff' : 'transparent',
      ...(focusVisible && {
        outline: focus.outline,
        outlineOffset: focus.outlineOffset,
      }),
    };

    const labelStyle: React.CSSProperties = {
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--ledger-color-text-primary)',
      fontFamily: fontFamily.sans,
    };

    return (
      <label
        className={['ledger-checkbox', className].filter(Boolean).join(' ')}
        style={rootStyle}
        {...dataAttrs}
      >
        <input
          ref={mergedRef}
          type="checkbox"
          className="ledger-sr-input"
          checked={isChecked}
          disabled={disabled}
          id={id}
          name={name}
          value={value}
          required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        <span className="ledger-checkbox__box" style={boxStyle}>
          {indeterminate ? <IndeterminateIcon /> : isChecked ? <CheckIcon /> : null}
        </span>
        {label != null && <span style={labelStyle}>{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
