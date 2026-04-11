/**
 * Skyfall Ledger -- <Menu />
 *
 * A dropdown action-menu surface. Composes MenuItem, MenuDivider,
 * and MenuGroup as compound children. Opens on trigger click, closes
 * on item click, Escape, or click outside. Fully WAI-ARIA compliant
 * with arrow-key, Home/End navigation.
 *
 * All styling is driven by inline styles consuming var(--ledger-*)
 * CSS custom properties. The companion primitives.css classes provide
 * hover / disabled transitions:
 *
 *   .ledger-menu-item {
 *     cursor: pointer;
 *     transition: background var(--ledger-duration-short) var(--ledger-easing-settle);
 *   }
 *   .ledger-menu-item:hover:not([data-disabled]) {
 *     background: var(--ledger-color-surface-sunken);
 *   }
 *   .ledger-menu-item[data-disabled] {
 *     opacity: 0.5;
 *     cursor: not-allowed;
 *   }
 */
import * as React from 'react';
import { zIndex } from '../../tokens/zIndex';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// MenuItem
// ---------------------------------------------------------------------------

export interface MenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Leading icon. */
  icon?: React.ReactNode;
  /** Trailing content (shortcut hint, badge, etc.). */
  trailing?: React.ReactNode;
  /** Disabled state. */
  disabled?: boolean;
  /** Destructive / danger styling. */
  danger?: boolean;
  /** Click handler. */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      icon,
      trailing,
      disabled = false,
      danger = false,
      onClick,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const itemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--ledger-space-3)',
      padding: 'var(--ledger-space-2) var(--ledger-space-4)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: 'var(--ledger-font-size-body-sm)',
      lineHeight: 1.4,
      color: danger
        ? 'var(--ledger-color-negative)'
        : 'var(--ledger-color-text-primary)',
      borderRadius: 'var(--ledger-radius-xs)',
      userSelect: 'none',
      outline: 'none',
      ...style,
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        className={cn('ledger-menu-item', className)}
        style={itemStyle}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        {...props}
      >
        {icon && (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              width: 16,
              height: 16,
              color: danger
                ? 'var(--ledger-color-negative)'
                : 'var(--ledger-color-text-secondary)',
            }}
          >
            {icon}
          </span>
        )}
        <span style={{ flex: 1 }}>{children}</span>
        {trailing && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 'var(--ledger-font-size-label)',
              color: 'var(--ledger-color-text-muted)',
            }}
          >
            {trailing}
          </span>
        )}
      </div>
    );
  },
);

MenuItem.displayName = 'MenuItem';

// ---------------------------------------------------------------------------
// MenuDivider
// ---------------------------------------------------------------------------

export const MenuDivider: React.FC = () => (
  <div
    role="separator"
    style={{
      height: 1,
      margin: 'var(--ledger-space-2) 0',
      background: 'var(--ledger-color-border-subtle)',
    }}
  />
);

MenuDivider.displayName = 'MenuDivider';

// ---------------------------------------------------------------------------
// MenuGroup
// ---------------------------------------------------------------------------

export interface MenuGroupProps {
  /** Group label rendered above the items. */
  label: string;
  children: React.ReactNode;
}

export const MenuGroup: React.FC<MenuGroupProps> = ({ label, children }) => (
  <div role="group" aria-label={label}>
    <div
      style={{
        padding: 'var(--ledger-space-2) var(--ledger-space-4)',
        fontFamily: 'var(--ledger-font-sans)',
        fontSize: 'var(--ledger-font-size-label)',
        fontWeight: 600,
        color: 'var(--ledger-color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        userSelect: 'none',
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

MenuGroup.displayName = 'MenuGroup';

// ---------------------------------------------------------------------------
// Menu (root)
// ---------------------------------------------------------------------------

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The trigger element -- rendered as-is inside a wrapper. */
  trigger: React.ReactNode;
  /** Horizontal alignment of the dropdown relative to the trigger. @default 'start' */
  align?: 'start' | 'end';
  /** Explicit width for the dropdown panel, or `'trigger'` to match trigger width. */
  width?: number | 'trigger';
}

/**
 * Menu -- dropdown action-menu surface.
 *
 * Composes `MenuItem`, `MenuDivider`, and `MenuGroup` as children.
 *
 * Accessibility:
 * - `role="menu"` on the dropdown, `role="menuitem"` on each item
 * - Arrow-key (Up/Down) + Home/End navigation
 * - Escape closes the menu; focus returns to trigger
 * - Click outside closes the menu
 *
 * FinTech note: ideal for account-row actions, transaction context menus,
 * and settings dropdowns.
 */
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ trigger, align = 'start', width, className, children, style, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const close = React.useCallback(() => {
      setOpen(false);
      triggerRef.current
        ?.querySelector<HTMLElement>('[tabindex], button, a')
        ?.focus();
    }, []);

    // Close on outside click
    React.useEffect(() => {
      if (!open) return;

      const handleClick = (e: Event) => {
        if (
          !menuRef.current?.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          close();
        }
      };

      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [open, close]);

    // Focus first enabled item on open
    React.useEffect(() => {
      if (open) {
        const firstItem = menuRef.current?.querySelector<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled])',
        );
        firstItem?.focus();
      }
    }, [open]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      const items = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled])',
        ) || [],
      );
      const current = document.activeElement as HTMLElement;
      const idx = items.indexOf(current);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const next = idx < items.length - 1 ? idx + 1 : 0;
          items[next]?.focus();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prev = idx > 0 ? idx - 1 : items.length - 1;
          items[prev]?.focus();
          break;
        }
        case 'Home': {
          e.preventDefault();
          items[0]?.focus();
          break;
        }
        case 'End': {
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;
        }
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'Tab':
          close();
          break;
      }
    };

    // Dropdown panel styles
    const menuPanelStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      ...(align === 'start' ? { left: 0 } : { right: 0 }),
      marginTop: 'var(--ledger-space-1)',
      zIndex: zIndex.dropdown,
      minWidth: width === 'trigger' ? '100%' : 180,
      width: typeof width === 'number' ? width : undefined,
      background: 'var(--ledger-color-surface-default)',
      border: '1px solid var(--ledger-color-border-default)',
      borderRadius: 'var(--ledger-radius-md)',
      boxShadow: 'var(--ledger-shadow-3)',
      padding: 'var(--ledger-space-2)',
      outline: 'none',
    };

    return (
      <div
        ref={ref}
        className={cn('ledger-menu', className)}
        style={{ position: 'relative', display: 'inline-block', ...style }}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Trigger wrapper */}
        <div
          ref={triggerRef}
          className="ledger-menu-trigger"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={open}
          style={{ display: 'inline-flex' }}
        >
          {trigger}
        </div>

        {/* Dropdown panel */}
        {open && (
          <div
            ref={menuRef}
            role="menu"
            className="ledger-menu-content"
            style={menuPanelStyle}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

Menu.displayName = 'Menu';
