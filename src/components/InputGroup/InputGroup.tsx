import * as React from 'react';
import { cn } from '../../utils/cn';
import { controlHeight } from '../../tokens/sizing';
import { fontFamily } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';

export interface InputGroupProps {
  /** Content before the input (icon, currency symbol) */
  startAddon?: React.ReactNode;
  /** Content after the input (icon, button, unit) */
  endAddon?: React.ReactNode;
  /** Size variant matching Ledger form controls */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Input element */
  children: React.ReactNode;
}

/**
 * InputGroup — prefix/suffix addon wrapper for inputs.
 */
export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ startAddon, endAddon, size = 'md', error = false, disabled = false, className, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('ledger-input-group', error && 'ledger-input-group-error', disabled && 'ledger-input-group-disabled', className)}
      style={{
        display: 'flex', alignItems: 'center',
        borderRadius: radius.md,
        border: `1px solid ${error ? 'var(--ledger-color-negative)' : 'var(--ledger-color-border-default)'}`,
        backgroundColor: 'var(--ledger-color-surface-raised)',
        fontFamily: fontFamily.sans,
        overflow: 'hidden',
        minHeight: controlHeight[size],
        opacity: disabled ? 0.5 : undefined,
        pointerEvents: disabled ? 'none' : undefined,
        ...style,
      }}
      {...props}
    >
      {startAddon && (
        <span style={{ display: 'flex', alignItems: 'center', padding: `0 ${space[4]}`, color: 'var(--ledger-color-text-muted)', backgroundColor: 'var(--ledger-color-surface-sunken)', borderRight: '1px solid var(--ledger-color-border-default)', alignSelf: 'stretch', whiteSpace: 'nowrap', fontSize: 13 }}>
          {startAddon}
        </span>
      )}
      <div className="ledger-input-group-inner" style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {endAddon && (
        <span style={{ display: 'flex', alignItems: 'center', padding: `0 ${space[4]}`, color: 'var(--ledger-color-text-muted)', backgroundColor: 'var(--ledger-color-surface-sunken)', borderLeft: '1px solid var(--ledger-color-border-default)', alignSelf: 'stretch', whiteSpace: 'nowrap', fontSize: 13 }}>
          {endAddon}
        </span>
      )}
    </div>
  ),
);
InputGroup.displayName = 'InputGroup';
