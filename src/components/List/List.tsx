/**
 * Skyfall Ledger -- <List /> & <ListItem />
 *
 * A structured list for displaying repeated content rows, with
 * optional leading icons, trailing actions, interactive states,
 * and a dense sizing mode.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// List types
// ---------------------------------------------------------------------------
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  /** Reduce vertical padding for compact layouts. @default false */
  dense?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// ListItem types
// ---------------------------------------------------------------------------
export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  /** Optional leading icon or avatar. */
  icon?: React.ReactNode;
  /** Optional trailing action area (buttons, badges, etc.). */
  secondaryAction?: React.ReactNode;
  /** Click handler -- makes the item interactive. */
  onClick?: () => void;
  /** Disables interaction and dims the item. @default false */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Context -- dense flag
// ---------------------------------------------------------------------------
const ListContext = React.createContext<{ dense: boolean }>({ dense: false });

// ---------------------------------------------------------------------------
// List component
// ---------------------------------------------------------------------------
export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ children, dense = false, className, style, ...rest }, ref) => {
    const listStyle: React.CSSProperties = {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      ...style,
    };

    return (
      <ListContext.Provider value={{ dense }}>
        <ul ref={ref} className={className} style={listStyle} {...rest}>
          {children}
        </ul>
      </ListContext.Provider>
    );
  },
);

List.displayName = 'List';

// ---------------------------------------------------------------------------
// ListItem component
// ---------------------------------------------------------------------------
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      children,
      icon,
      secondaryAction,
      onClick,
      disabled = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const { dense } = React.useContext(ListContext);

    const [hovered, setHovered] = React.useState(false);

    const isInteractive = !!onClick && !disabled;

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--ledger-space-4)',
      padding: dense
        ? 'var(--ledger-space-2) var(--ledger-space-5)'
        : 'var(--ledger-space-4) var(--ledger-space-5)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: 'var(--ledger-font-size-body-md)',
      color: disabled
        ? 'var(--ledger-color-text-muted)'
        : 'var(--ledger-color-text-primary)',
      cursor: isInteractive ? 'pointer' : undefined,
      background: isInteractive && hovered
        ? 'var(--ledger-color-surface-sunken)'
        : 'transparent',
      transition: `background var(--ledger-duration-micro) var(--ledger-easing-settle)`,
      opacity: disabled ? 0.5 : 1,
      userSelect: isInteractive ? 'none' : undefined,
      ...style,
    };

    return (
      <li
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        className={className}
        style={itemStyle}
        onClick={disabled ? undefined : onClick}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...rest}
      >
        {icon && (
          <span
            style={{
              display: 'inline-flex',
              flexShrink: 0,
              color: disabled
                ? 'var(--ledger-color-text-muted)'
                : 'var(--ledger-color-text-secondary)',
            }}
          >
            {icon}
          </span>
        )}
        <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
        {secondaryAction && (
          <span style={{ display: 'inline-flex', flexShrink: 0 }}>
            {secondaryAction}
          </span>
        )}
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';
