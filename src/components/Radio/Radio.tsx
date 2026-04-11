/**
 * Skyfall Ledger — <RadioGroup /> & <Radio />
 *
 * A radio group with individual radio items. Supports controlled and
 * uncontrolled selection, vertical/horizontal layout, and optional
 * FormField context integration.
 *
 * Visual styling delegates to `.ledger-radio` in primitives.css for
 * hover and checked-state transitions. The inner dot is rendered via
 * a CSS `::after` pseudo-element on `.ledger-radio__dot[data-checked]`.
 */
import * as React from 'react';
import { useFormField } from '../FormField/FormFieldContext';
import { cn } from '../../utils/cn';
import { fontFamily } from '../../tokens/typography';
import { focus } from '../../tokens/focus';
import { space } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface RadioGroupContextValue {
  name: string | undefined;
  value: string | undefined;
  disabled: boolean;
  onChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

const useRadioGroup = (): RadioGroupContextValue | null => {
  return React.useContext(RadioGroupContext);
};

// ---------------------------------------------------------------------------
// RadioGroup types
// ---------------------------------------------------------------------------
export interface RadioGroupProps {
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value (uncontrolled). */
  defaultValue?: string;
  /** Called when the selected radio changes. */
  onChange?: (value: string) => void;
  /** Shared `name` attribute for all radios in the group. */
  name?: string;
  /** Disable all radios in the group. */
  disabled?: boolean;
  /** Layout direction. @default 'vertical' */
  direction?: 'vertical' | 'horizontal';
  /** Gap between radio items. @default 'var(--ledger-space-4)' */
  gap?: string;
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      name,
      disabled: disabledProp = false,
      direction = 'vertical',
      gap = 'var(--ledger-space-4)',
      children,
      className,
      style,
    },
    ref,
  ) => {
    // ---- FormField integration (optional) ---------------------------------
    const field = useFormField();
    const disabled = disabledProp || (field?.disabled ?? false);

    // ---- Internal state ---------------------------------------------------
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = React.useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        onChange?.(nextValue);
      },
      [isControlled, onChange],
    );

    const ctx = React.useMemo<RadioGroupContextValue>(
      () => ({ name, value: currentValue, disabled, onChange: handleChange }),
      [name, currentValue, disabled, handleChange],
    );

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap,
      ...style,
    };

    return (
      <RadioGroupContext.Provider value={ctx}>
        <div
          ref={ref}
          role="radiogroup"
          className={className}
          style={containerStyle}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

// ---------------------------------------------------------------------------
// Radio types
// ---------------------------------------------------------------------------
export interface RadioProps {
  /** The value this radio option represents. */
  value: string;
  /** Text or element rendered beside the radio. */
  label?: React.ReactNode;
  /** Disable this specific radio. */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Radio
// ---------------------------------------------------------------------------
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ value, label, disabled: disabledProp = false, className, style }, ref) => {
    const group = useRadioGroup();

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

    if (!group) {
      return null;
    }

    const isChecked = group.value === value;
    const disabled = disabledProp || group.disabled;

    const handleChange = () => {
      if (!disabled) {
        group.onChange(value);
      }
    };

    // ---- Data attributes --------------------------------------------------
    const dataAttrs: Record<string, string> = {};
    if (isChecked) dataAttrs['data-checked'] = '';
    if (disabled) dataAttrs['data-disabled'] = '';

    // ---- Styles -----------------------------------------------------------
    const rootStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: space[3],
      ...style,
    };

    const dotStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      borderRadius: '50%',
      flexShrink: 0,
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
        className={cn('ledger-radio', className)}
        style={rootStyle}
        {...dataAttrs}
      >
        <input
          ref={ref}
          type="radio"
          className="ledger-sr-input"
          name={group.name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span className="ledger-radio__dot" style={dotStyle} />
        {label != null && <span style={labelStyle}>{label}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
