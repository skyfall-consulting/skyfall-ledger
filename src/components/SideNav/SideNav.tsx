/**
 * Skyfall Ledger — <SideNav />
 *
 * Vertical sidebar navigation for dashboard layouts. Supports nested items,
 * collapsible icon-only mode, and active-page highlighting.
 *
 * Adapted from Aegis — CSS Modules replaced with inline styles + primitives.css.
 *
 * Primitives.css additions:
 * ```css
 * .ledger-sidenav__item {
 *   cursor: pointer;
 *   user-select: none;
 *   transition:
 *     background var(--ledger-duration-short) var(--ledger-easing-settle),
 *     color var(--ledger-duration-short) var(--ledger-easing-settle);
 * }
 * .ledger-sidenav__item:hover:not([data-disabled]) {
 *   background: var(--ledger-color-surface-sunken);
 * }
 * .ledger-sidenav__item[data-active] {
 *   background: var(--ledger-color-surface-sunken);
 * }
 * .ledger-sidenav__item[data-disabled] {
 *   opacity: 0.5;
 *   cursor: not-allowed;
 * }
 * ```
 */
import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontSize, lineHeight, fontWeight } from '../../tokens/typography';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface SideNavItem {
  /** Unique identifier for the item. */
  id: string;
  /** Display label. */
  label: string;
  /** Optional URL — renders as <a> instead of <button>. */
  href?: string;
  /** Click handler. */
  onClick?: () => void;
  /** Optional icon element. */
  icon?: React.ReactNode;
  /** Nested child items. */
  children?: SideNavItem[];
  /** Whether this item is disabled. */
  disabled?: boolean;
}

export interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation items. */
  items: SideNavItem[];
  /** ID of the currently active item. */
  activeId?: string;
  /** Whether the sidebar is collapsed to icon-only mode. @default false */
  collapsed?: boolean;
  /** Callback when collapse state changes. */
  onCollapse?: (collapsed: boolean) => void;
  /** Additional className. */
  className?: string;
  /** Additional style. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Nav width
// ---------------------------------------------------------------------------
const WIDTH_EXPANDED = 240;
const WIDTH_COLLAPSED = 56;

// ---------------------------------------------------------------------------
// Internal NavItem
// ---------------------------------------------------------------------------
function NavItemInner({
  item,
  activeId,
  collapsed,
  depth = 0,
}: {
  item: SideNavItem;
  activeId?: string;
  collapsed?: boolean;
  depth?: number;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.id === activeId;
  const isChildActive = item.children?.some((c) => c.id === activeId) ?? false;

  // Auto-expand if a child is active
  React.useEffect(() => {
    if (isChildActive) setExpanded(true);
  }, [isChildActive]);

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? 0 : 'var(--ledger-space-3)',
    width: '100%',
    padding: collapsed ? '8px 0' : `8px ${12 + depth * 12}px`,
    border: 'none',
    borderLeft: isActive ? '2px solid var(--ledger-color-teal-500)' : '2px solid transparent',
    borderRadius: 0,
    background: 'transparent',
    color: isActive
      ? 'var(--ledger-color-text-primary)'
      : 'var(--ledger-color-text-secondary)',
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-md'],
    lineHeight: lineHeight['body-md'],
    fontWeight: isActive ? fontWeight.medium : fontWeight.regular,
    textDecoration: 'none',
    textAlign: 'left',
    justifyContent: collapsed ? 'center' : 'flex-start',
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
  };

  const iconStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    flexShrink: 0,
    color: isActive
      ? 'var(--ledger-color-teal-500)'
      : 'var(--ledger-color-text-muted)',
  };

  const chevronStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: 'auto',
    transition: 'transform var(--ledger-duration-short) var(--ledger-easing-settle)',
    transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
    color: 'var(--ledger-color-text-muted)',
  };

  const handleClick = () => {
    if (item.disabled) return;
    if (hasChildren && !collapsed) {
      setExpanded((prev) => !prev);
    }
    item.onClick?.();
  };

  const content = (
    <>
      {item.icon && (
        <span style={iconStyle} aria-hidden="true">
          {item.icon}
        </span>
      )}
      {!collapsed && (
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
          }}
        >
          {item.label}
        </span>
      )}
      {hasChildren && !collapsed && (
        <span style={chevronStyle} aria-hidden="true">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 2 8 6 4 10" />
          </svg>
        </span>
      )}
    </>
  );

  const dataAttrs: Record<string, string> = {};
  if (isActive) dataAttrs['data-active'] = '';
  if (item.disabled) dataAttrs['data-disabled'] = '';

  return (
    <li style={{ listStyle: 'none' }}>
      {item.href && !item.disabled ? (
        <a
          href={item.href}
          onClick={handleClick}
          className={cn('ledger-sidenav__item', 'ledger-focus-ring')}
          style={itemStyle}
          {...(isActive ? { 'aria-current': 'page' as const } : {})}
          {...(collapsed ? { title: item.label } : {})}
          {...dataAttrs}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={item.disabled}
          className={cn('ledger-sidenav__item', 'ledger-focus-ring')}
          style={itemStyle}
          {...(isActive ? { 'aria-current': 'page' as const } : {})}
          {...(collapsed ? { title: item.label } : {})}
          {...dataAttrs}
        >
          {content}
        </button>
      )}
      {hasChildren && !collapsed && expanded && (
        <ul style={{ margin: 0, padding: 0 }}>
          {item.children!.map((child) => (
            <NavItemInner
              key={child.id}
              item={child}
              activeId={activeId}
              collapsed={collapsed}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  (
    {
      items,
      activeId,
      collapsed = false,
      onCollapse,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const navStyle: React.CSSProperties = {
      width: collapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--ledger-color-surface-default)',
      borderRight: '1px solid var(--ledger-color-border-default)',
      fontFamily: fontFamily.sans,
      transition: 'width var(--ledger-duration-medium) var(--ledger-easing-settle)',
      overflow: 'hidden',
      ...style,
    };

    const collapseButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '12px 0',
      border: 'none',
      borderBottom: '1px solid var(--ledger-color-border-default)',
      background: 'transparent',
      color: 'var(--ledger-color-text-muted)',
      cursor: 'pointer',
    };

    return (
      <nav
        ref={ref}
        aria-label="Side navigation"
        className={cn('ledger-sidenav', className)}
        style={navStyle}
        {...rest}
      >
        {onCollapse && (
          <button
            type="button"
            className={cn('ledger-sidenav__collapse', 'ledger-focus-ring')}
            style={collapseButtonStyle}
            onClick={() => onCollapse(!collapsed)}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {collapsed ? (
                <polyline points="8 4 14 10 8 16" />
              ) : (
                <polyline points="12 4 6 10 12 16" />
              )}
            </svg>
          </button>
        )}
        <ul style={{ margin: 0, padding: 'var(--ledger-space-2) 0', flex: 1, overflow: 'auto' }}>
          {items.map((item) => (
            <NavItemInner
              key={item.id}
              item={item}
              activeId={activeId}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>
    );
  },
);

SideNav.displayName = 'SideNav';
