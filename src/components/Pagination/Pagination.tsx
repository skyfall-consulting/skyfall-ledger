/**
 * Skyfall Ledger — <Pagination />
 *
 * Compact page navigation for paginated data sets (transaction lists,
 * audit logs, statement history). Renders a smart page range with
 * ellipsis, Previous/Next arrows, and teal highlight on the current page.
 *
 * All styling is driven by inline styles with CSS custom properties;
 * page buttons use the `.ledger-btn` primitive from primitives.css for
 * consistent hover/active states.
 *
 * Accessibility:
 * - Wrapped in `<nav>` with `aria-label="Pagination"`
 * - Current page indicated with `aria-current="page"`
 * - Previous/Next buttons disabled at boundaries
 * - Each page button has `aria-label="Page N"`
 */
import * as React from 'react';
import { fontSize, lineHeight, fontFamily, fontWeight } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current active page (1-based) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onChange: (page: number) => void;
  /** Number of sibling pages to show on each side of current @default 1 */
  siblings?: number;
}

// ---------------------------------------------------------------------------
// Page range algorithm
// ---------------------------------------------------------------------------
function getPageRange(
  current: number,
  total: number,
  siblings: number,
): (number | 'ellipsis-left' | 'ellipsis-right')[] {
  // siblings on each side + current + 2 boundary pages
  const totalNumbers = siblings * 2 + 3;
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis slots

  if (total <= totalBlocks) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis-right', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightCount }, (_, i) => total - rightCount + i + 1);
    return [1, 'ellipsis-left', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, 'ellipsis-left', ...middleRange, 'ellipsis-right', total];
}

// ---------------------------------------------------------------------------
// Arrow icons
// ---------------------------------------------------------------------------
const ChevronLeft: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="10 4 6 8 10 12" />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 4 10 8 6 12" />
  </svg>
);

// ---------------------------------------------------------------------------
// Shared style constants
// ---------------------------------------------------------------------------
const BUTTON_SIZE = '32px';

const baseButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  padding: 0,
  fontFamily: fontFamily.sans,
  fontSize: fontSize['body-sm'],
  lineHeight: lineHeight['body-sm'],
  fontWeight: fontWeight.medium,
  borderRadius: radius.xs,
  whiteSpace: 'nowrap',
  userSelect: 'none',
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ page, totalPages, onChange, siblings = 1, className, style, ...rest }, ref) => {
    const pages = getPageRange(page, totalPages, siblings);

    if (totalPages <= 1) return null;

    const navStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: fontFamily.sans,
      fontSize: fontSize['body-sm'],
      lineHeight: lineHeight['body-sm'],
      ...style,
    };

    const navButtonStyle: React.CSSProperties = {
      ...baseButtonStyle,
      '--_bg': 'transparent',
      '--_color': 'var(--ledger-color-text-secondary)',
      '--_border': 'transparent',
      '--_bg-hover': 'var(--ledger-color-surface-sunken)',
      '--_bg-active': 'var(--ledger-color-surface-sunken)',
    } as React.CSSProperties;

    const pageButtonStyle: React.CSSProperties = {
      ...baseButtonStyle,
      '--_bg': 'transparent',
      '--_color': 'var(--ledger-color-text-secondary)',
      '--_border': 'transparent',
      '--_bg-hover': 'var(--ledger-color-surface-sunken)',
      '--_bg-active': 'var(--ledger-color-surface-sunken)',
    } as React.CSSProperties;

    const activePageStyle: React.CSSProperties = {
      ...baseButtonStyle,
      '--_bg': 'var(--ledger-color-teal-500)',
      '--_color': 'var(--ledger-color-obsidian-950)',
      '--_border': 'transparent',
      '--_bg-hover': 'var(--ledger-color-teal-400)',
      '--_bg-active': 'var(--ledger-color-teal-600)',
    } as React.CSSProperties;

    const ellipsisStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      color: 'var(--ledger-color-text-muted)',
      userSelect: 'none',
      fontSize: fontSize['body-sm'],
      letterSpacing: '0.1em',
    };

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn('ledger-pagination', className)}
        style={navStyle}
        {...rest}
      >
        {/* Previous */}
        <button
          type="button"
          className={cn('ledger-btn', 'ledger-focus-ring')}
          style={navButtonStyle}
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {/* Page numbers */}
        {pages.map((p) =>
          typeof p === 'string' ? (
            <span key={p} style={ellipsisStyle} aria-hidden="true">
              &hellip;
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cn('ledger-btn', 'ledger-focus-ring')}
              style={p === page ? activePageStyle : pageButtonStyle}
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          className={cn('ledger-btn', 'ledger-focus-ring')}
          style={navButtonStyle}
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
