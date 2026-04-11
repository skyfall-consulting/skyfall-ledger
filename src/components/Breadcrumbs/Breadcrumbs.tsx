/**
 * Skyfall Ledger — <Breadcrumbs />
 *
 * Navigational aid showing the current location within a hierarchy.
 * Supports collapsible middle items via `maxItems`, link/button rendering
 * for ancestor crumbs, and plain-text rendering for the current page.
 *
 * All styling is driven by inline styles with CSS custom properties;
 * hover transitions on links use the `.ledger-link` primitive from
 * primitives.css.
 *
 * Accessibility:
 * - Wrapped in `<nav>` with `aria-label="Breadcrumb"`
 * - Uses semantic `<ol>`/`<li>` list structure
 * - Last item has `aria-current="page"` to indicate current location
 * - Separators are `aria-hidden` so screen readers skip them
 */
import * as React from 'react';
import { fontSize, lineHeight, fontFamily, fontWeight } from '../../tokens/typography';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Optional URL — renders an anchor tag */
  href?: string;
  /** Optional click handler */
  onClick?: () => void;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb path items (ordered from root to current page) */
  items: BreadcrumbItem[];
  /** Maximum number of visible items before the middle collapses to "..." @default Infinity */
  maxItems?: number;
  /** Additional className */
  className?: string;
}

// ---------------------------------------------------------------------------
// Chevron separator (inline SVG, ">")
// ---------------------------------------------------------------------------
const ChevronSeparator: React.FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <polyline points="4.5 2.5 8 6 4.5 9.5" />
  </svg>
);

// ---------------------------------------------------------------------------
// Collapse visible items when maxItems is exceeded
// ---------------------------------------------------------------------------
function collapseItems(items: BreadcrumbItem[], maxItems: number): (BreadcrumbItem | 'ellipsis')[] {
  if (items.length <= maxItems) return items;

  // Always show first item + last item(s). Remaining budget goes to tail.
  // Pattern: [first] ... [tail items]
  const headCount = 1;
  const tailCount = Math.max(maxItems - headCount - 1, 1); // -1 for ellipsis slot

  const head = items.slice(0, headCount);
  const tail = items.slice(items.length - tailCount);

  return [...head, 'ellipsis' as const, ...tail];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, maxItems = Infinity, className, style, ...rest }, ref) => {
    const visibleItems = collapseItems(items, maxItems);

    const navStyle: React.CSSProperties = {
      fontFamily: fontFamily.sans,
      fontSize: fontSize['body-sm'],
      lineHeight: lineHeight['body-sm'],
      ...style,
    };

    const listStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      flexWrap: 'wrap',
      gap: '4px',
    };

    const separatorStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'var(--ledger-color-text-muted)',
      userSelect: 'none',
    };

    const linkStyle: React.CSSProperties = {
      '--_color': 'var(--ledger-color-text-secondary)',
      '--_color-hover': 'var(--ledger-color-text-primary)',
      color: 'var(--ledger-color-text-secondary)',
      textDecoration: 'none',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
      font: 'inherit',
    } as React.CSSProperties;

    const currentStyle: React.CSSProperties = {
      color: 'var(--ledger-color-text-primary)',
      fontWeight: fontWeight.medium,
    };

    const ellipsisStyle: React.CSSProperties = {
      color: 'var(--ledger-color-text-muted)',
      letterSpacing: '0.1em',
      userSelect: 'none',
      padding: '0 2px',
    };

    const itemStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
    };

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('ledger-breadcrumbs', className)}
        style={navStyle}
        {...rest}
      >
        <ol style={listStyle}>
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;

            if (item === 'ellipsis') {
              return (
                <li key="ellipsis" style={itemStyle}>
                  <span style={separatorStyle} aria-hidden="true">
                    <ChevronSeparator />
                  </span>
                  <span style={ellipsisStyle} role="presentation">
                    &hellip;
                  </span>
                </li>
              );
            }

            return (
              <li key={index} style={itemStyle}>
                {index > 0 && (
                  <span style={separatorStyle} aria-hidden="true">
                    <ChevronSeparator />
                  </span>
                )}
                {isLast ? (
                  <span style={currentStyle} aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className={cn('ledger-link', 'ledger-focus-ring')}
                    style={linkStyle}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={cn('ledger-link', 'ledger-focus-ring')}
                    style={linkStyle}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';
