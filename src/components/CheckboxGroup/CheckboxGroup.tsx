import * as React from 'react';
import { cn } from '../../utils/cn';
import { Checkbox } from '../Checkbox';
import { fontFamily, fontWeight, fontSize } from '../../tokens/typography';
import { space } from '../../tokens/spacing';

export interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Group label rendered as fieldset legend */
  label: string;
  /** Shared name attribute */
  name: string;
  /** Checkbox options */
  options: CheckboxGroupOption[];
  /** Currently selected values */
  value?: string[];
  /** Change handler */
  onChange?: (value: string[]) => void;
  /** Error message */
  error?: string;
  /** Layout direction */
  orientation?: 'vertical' | 'horizontal';
  /** Disabled state for all checkboxes */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * CheckboxGroup — group of checkboxes with fieldset/legend.
 */
export function CheckboxGroup({ label, name, options, value = [], onChange, error, orientation = 'vertical', disabled = false, className }: CheckboxGroupProps) {
  const handleChange = React.useCallback((optValue: string, checked: boolean) => {
    if (!onChange) return;
    const next = checked ? [...value, optValue] : value.filter((v) => v !== optValue);
    onChange(next);
  }, [value, onChange]);

  return (
    <fieldset className={cn(className)} disabled={disabled} style={{ border: 'none', margin: 0, padding: 0, opacity: disabled ? 0.5 : undefined }}>
      <legend style={{ display: 'block', fontFamily: fontFamily.sans, fontSize: fontSize.label, fontWeight: fontWeight.medium, lineHeight: '1.5', color: 'var(--ledger-color-text-primary)', marginBottom: space[3], padding: 0 }}>{label}</legend>
      <div style={{ display: 'flex', flexDirection: orientation === 'vertical' ? 'column' : 'row', gap: orientation === 'vertical' ? space[3] : space[5], flexWrap: orientation === 'horizontal' ? 'wrap' : undefined }}>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            name={name}
            label={opt.label}
            checked={value.includes(opt.value)}
            onChange={(checked: boolean) => handleChange(opt.value, checked)}
            disabled={opt.disabled || disabled}
          />
        ))}
      </div>
      {error && <p role="alert" style={{ margin: `${space[2]} 0 0`, fontFamily: fontFamily.sans, fontSize: fontSize['body-sm'], color: 'var(--ledger-color-negative)' }}>{error}</p>}
    </fieldset>
  );
}
