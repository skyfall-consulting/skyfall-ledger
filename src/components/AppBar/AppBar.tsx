import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight } from '../../tokens/typography';
import { space } from '../../tokens/spacing';

export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo or brand element */
  logo?: React.ReactNode;
  /** Navigation items (center/left area) */
  children?: React.ReactNode;
  /** Action elements on the right (profile, notifications) */
  actions?: React.ReactNode;
}

/**
 * AppBar — horizontal application header bar.
 */
export const AppBar = React.forwardRef<HTMLElement, AppBarProps>(
  ({ logo, children, actions, className, style, ...props }, ref) => (
    <header
      ref={ref}
      className={cn('ledger-appbar', className)}
      style={{
        width: '100%',
        height: 56,
        backgroundColor: 'var(--ledger-color-surface-raised)',
        borderBottom: '1px solid var(--ledger-color-border-default)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        fontFamily: fontFamily.sans,
        ...style,
      }}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: `0 ${space[6]}`, gap: space[7] }}>
        {logo && <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, fontSize: '18px', fontWeight: fontWeight.bold, color: 'var(--ledger-color-text-primary)' }}>{logo}</div>}
        {children && <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: space[2], flex: 1, minWidth: 0 }}>{children}</nav>}
        {actions && <div style={{ display: 'flex', alignItems: 'center', gap: space[4], flexShrink: 0, marginLeft: 'auto' }}>{actions}</div>}
      </div>
    </header>
  ),
);
AppBar.displayName = 'AppBar';
