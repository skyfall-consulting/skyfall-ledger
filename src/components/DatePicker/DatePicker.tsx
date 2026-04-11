import * as React from 'react';
import { cn } from '../../utils/cn';
import { controlHeight } from '../../tokens/sizing';
import { fontFamily } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Minimum date (YYYY-MM-DD) */
  min?: string;
  /** Maximum date (YYYY-MM-DD) */
  max?: string;
}

/**
 * DatePicker — styled native date input.
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ size = 'md', error = false, fullWidth = false, className, min, max, style, ...props }, ref) => {
    const sizeMap = {
      sm: { height: controlHeight.sm, padding: `0 calc(${space[4]} + 20px) 0 ${space[4]}`, fontSize: '13px' },
      md: { height: controlHeight.md, padding: `0 calc(${space[5]} + 20px) 0 ${space[5]}`, fontSize: '14px' },
      lg: { height: controlHeight.lg, padding: `0 calc(${space[5]} + 22px) 0 ${space[5]}`, fontSize: '16px' },
    };
    const s = sizeMap[size];

    return (
      <div className={cn('ledger-datepicker', className)} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', width: fullWidth ? '100%' : 'auto', ...style }}>
        <input
          ref={ref}
          type="date"
          className={cn('ledger-datepicker-input', 'ledger-focus-ring')}
          min={min} max={max}
          aria-invalid={error || undefined}
          style={{
            display: 'block', width: '100%',
            height: s.height, padding: s.padding, fontSize: s.fontSize,
            fontFamily: fontFamily.sans, color: 'var(--ledger-color-text-primary)',
            backgroundColor: 'var(--ledger-color-surface-raised)',
            border: `1px solid ${error ? 'var(--ledger-color-negative)' : 'var(--ledger-color-border-default)'}`,
            borderRadius: radius.md,
          }}
          {...props}
        />
        <svg style={{ position: 'absolute', right: space[4], color: 'var(--ledger-color-text-muted)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="12" height="11" rx="1" /><path d="M5 1v3M11 1v3M2 7h12" />
        </svg>
      </div>
    );
  },
);
DatePicker.displayName = 'DatePicker';
