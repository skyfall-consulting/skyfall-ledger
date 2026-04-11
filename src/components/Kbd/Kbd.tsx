import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Size variant */
  size?: 'sm' | 'md';
}

/**
 * Kbd — keyboard shortcut indicator.
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ size = 'md', className, children, style, ...props }, ref) => {
    const sizeStyles: React.CSSProperties = size === 'sm'
      ? { minWidth: 18, height: 18, padding: '0 4px', fontSize: '11px' }
      : { minWidth: 22, height: 22, padding: '0 6px', fontSize: '12px' };

    return (
      <kbd
        ref={ref}
        className={cn(className)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fontFamily.sans,
          fontWeight: fontWeight.medium,
          color: 'var(--ledger-color-text-secondary)',
          backgroundColor: 'var(--ledger-color-surface-sunken)',
          border: '1px solid var(--ledger-color-border-default)',
          borderBottomWidth: 2,
          borderRadius: radius.sm,
          whiteSpace: 'nowrap',
          lineHeight: 1,
          ...sizeStyles,
          ...style,
        }}
        {...props}
      >
        {children}
      </kbd>
    );
  },
);
Kbd.displayName = 'Kbd';
