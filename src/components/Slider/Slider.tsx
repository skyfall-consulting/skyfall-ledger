import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight, fontSize as fontSizeTokens } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
// radius import removed — not used by Slider

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'value'> {
  /** Current value */
  value?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Accessible label text */
  label?: string;
  /** Show current value readout */
  showValue?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Slider — range input with custom track and thumb styling.
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onChange, min = 0, max = 100, step = 1, disabled = false, size = 'md', label, showValue = false, className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const current = value ?? min;
    const percentage = ((current - min) / (max - min)) * 100;

    return (
      <div
        className={cn('ledger-slider', className)}
        style={{
          display: 'flex', flexDirection: 'column', gap: space[2], width: '100%',
          opacity: disabled ? 0.5 : undefined, pointerEvents: disabled ? 'none' : undefined,
        }}
      >
        {label && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor={inputId} style={{ fontFamily: fontFamily.sans, fontSize: fontSizeTokens.label, fontWeight: fontWeight.medium, color: 'var(--ledger-color-text-primary)' }}>
              {label}
            </label>
            {showValue && <span aria-hidden="true" style={{ fontFamily: fontFamily.sans, fontSize: fontSizeTokens['body-sm'], fontWeight: fontWeight.medium, color: 'var(--ledger-color-text-muted)', minWidth: '2ch', textAlign: 'right' }}>{current}</span>}
          </div>
        )}
        {!label && showValue && <span aria-hidden="true" style={{ fontFamily: fontFamily.sans, fontSize: fontSizeTokens['body-sm'], fontWeight: fontWeight.medium, color: 'var(--ledger-color-text-muted)', minWidth: '2ch', textAlign: 'right' }}>{current}</span>}
        <input
          ref={ref}
          id={inputId}
          type="range"
          className={cn('ledger-slider-input', size === 'sm' ? 'ledger-slider-sm' : 'ledger-slider-md')}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          min={min} max={max} step={step}
          disabled={disabled}
          style={{ '--slider-fill': `${percentage}%` } as React.CSSProperties}
          {...props}
        />
      </div>
    );
  },
);
Slider.displayName = 'Slider';
