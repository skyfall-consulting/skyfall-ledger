import * as React from 'react';
import { cn } from '../../utils/cn';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variant affecting padding */
  size?: 'sm' | 'md';
  /** Visual variant */
  variant?: 'default' | 'outlined';
  /** Toolbar content */
  children: React.ReactNode;
}

export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ToolbarDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ size = 'md', variant = 'default', className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      className={cn('ledger-toolbar', className)}
      style={{
        display: 'flex', alignItems: 'center', gap: space[2],
        fontFamily: 'var(--ledger-font-sans)',
        background: 'var(--ledger-color-surface-raised)',
        borderRadius: radius.md,
        padding: size === 'sm' ? space[2] : space[3],
        flexWrap: 'wrap',
        border: variant === 'outlined' ? '1px solid var(--ledger-color-border-default)' : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
Toolbar.displayName = 'Toolbar';

export const ToolbarGroup = React.forwardRef<HTMLDivElement, ToolbarGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} role="group" className={cn(className)} style={{ display: 'flex', alignItems: 'center', gap: space[2] }} {...props}>
      {children}
    </div>
  ),
);
ToolbarGroup.displayName = 'ToolbarGroup';

export const ToolbarDivider = React.forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation="vertical"
      className={cn(className)}
      style={{ width: 1, alignSelf: 'stretch', minHeight: 20, background: 'var(--ledger-color-border-default)', margin: `0 ${space[2]}` }}
      {...props}
    />
  ),
);
ToolbarDivider.displayName = 'ToolbarDivider';
