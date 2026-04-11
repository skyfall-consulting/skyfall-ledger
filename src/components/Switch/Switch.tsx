/**
 * Skyfall Ledger — <Switch />
 *
 * A toggle switch for binary on/off states. Supports two sizes (sm, md),
 * controlled and uncontrolled modes, and optional FormField integration.
 *
 * Hover and cursor styles come from `.ledger-switch` in primitives.css.
 * Colors and transforms are set inline to support the `size` prop without
 * fighting with hardcoded CSS translate values.
 */
import * as React from 'react';
import { useFormField } from '../FormField/FormFieldContext';
import { cn } from '../../utils/cn';
import { fontFamily } from '../../tokens/typography';
import { focus } from '../../tokens/focus';
import { space } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Size specs
// ---------------------------------------------------------------------------
interface SwitchSizeSpec {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
  translateX: number;
}

const SIZE_MAP: Record<'sm' | 'md', SwitchSizeSpec> = {
  sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16, translateX: 16 },
  md: { trackWidth: 44, trackHeight: 24, thumbSize: 20, translateX: 20 },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'checked' | 'defaultChecked' | 'size'> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Called when toggled. */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disable the switch. */
  disabled?: boolean;
  /** Text or element rendered beside the switch. */
  label?: React.ReactNode;
  /** Switch track size. @default 'md' */
  size?: 'sm' | 'md';
  /** Additional class names. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled: disabledProp = false,
      label,
      size = 'md',
      className,
      style,
      id: idProp,
      name,
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

    // ---- Size specs -------------------------------------------------------
    const spec = SIZE_MAP[size];

    // ---- Data attributes --------------------------------------------------
    const dataAttrs: Record<string, string> = {};
    if (isChecked) dataAttrs['data-checked'] = '';
    if (disabled) dataAttrs['data-disabled'] = '';

    // ---- Styles -----------------------------------------------------------
    const rootStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: space[3],
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      position: 'relative',
      width: spec.trackWidth,
      height: spec.trackHeight,
      borderRadius: 'var(--ledger-radius-pill)',
      flexShrink: 0,
      background: isChecked
        ? 'var(--ledger-color-teal-500)'
        : 'var(--ledger-color-border-strong)',
      transition: 'background var(--ledger-duration-short) var(--ledger-easing-settle)',
      ...(focusVisible && {
        outline: focus.outline,
        outlineOffset: focus.outlineOffset,
      }),
    };

    const thumbStyle: React.CSSProperties = {
      position: 'absolute',
      top: 2,
      left: 2,
      width: spec.thumbSize,
      height: spec.thumbSize,
      borderRadius: '50%',
      background: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      transition: 'transform var(--ledger-duration-short) var(--ledger-easing-settle)',
      transform: isChecked ? `translateX(${spec.translateX}px)` : 'translateX(0)',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--ledger-color-text-primary)',
      fontFamily: fontFamily.sans,
    };

    return (
      <label
        className={cn('ledger-switch', className)}
        style={rootStyle}
        {...dataAttrs}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className="ledger-sr-input"
          checked={isChecked}
          disabled={disabled}
          id={id}
          name={name}
          required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-checked={isChecked}
          {...rest}
        />
        <span style={trackStyle}>
          <span style={thumbStyle} />
        </span>
        {label != null && <span style={labelStyle}>{label}</span>}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
