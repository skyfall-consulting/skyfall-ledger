/**
 * Skyfall Ledger -- <DescriptionList />
 *
 * Semantic key-value display using <dl> / <dt> / <dd>.
 * Supports vertical, horizontal, and grid layouts with
 * optional dividers and two size modes.
 *
 * FinTech note: ideal for transaction details, account info,
 * invoice line items, and KYC panels.
 */
import * as React from 'react';
import { fontSize, lineHeight, fontWeight } from '../../tokens/typography';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DescriptionListItem {
  /** Key / label */
  term: React.ReactNode;
  /** Value / definition */
  description: React.ReactNode;
}

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement> {
  /** Array of term-description pairs to render. */
  items: DescriptionListItem[];
  /** Layout mode.
   *  - `vertical` (default): dt stacked above dd.
   *  - `horizontal`: dt left, dd right in a row.
   *  - `grid`: CSS grid with label column and value column.
   */
  layout?: 'vertical' | 'horizontal' | 'grid';
  /** Spacing & font density. @default 'md' */
  size?: 'sm' | 'md';
  /** Show a 1 px divider between items. @default false */
  dividers?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Spacing helpers
// ---------------------------------------------------------------------------

const GAP: Record<'sm' | 'md', string> = {
  sm: 'var(--ledger-space-3)',
  md: 'var(--ledger-space-5)',
};

const ITEM_PAD: Record<'sm' | 'md', string> = {
  sm: 'var(--ledger-space-3) 0',
  md: 'var(--ledger-space-4) 0',
};

const TERM_FONT: Record<'sm' | 'md', { size: string; line: string }> = {
  sm: { size: fontSize.label, line: lineHeight.label },
  md: { size: fontSize['body-sm'], line: lineHeight['body-sm'] },
};

const DESC_FONT: Record<'sm' | 'md', { size: string; line: string }> = {
  sm: { size: fontSize['body-sm'], line: lineHeight['body-sm'] },
  md: { size: fontSize['body-md'], line: lineHeight['body-md'] },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const DescriptionList = React.forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(
  (
    {
      items,
      layout = 'vertical',
      size = 'md',
      dividers = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    // ---- root <dl> styles ----
    const dlStyle: React.CSSProperties = {
      margin: 0,
      padding: 0,
      fontFamily: 'var(--ledger-font-sans)',
      ...(layout === 'grid' && {
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        columnGap: 'var(--ledger-space-6)',
        rowGap: dividers ? '0' : GAP[size],
      }),
      ...style,
    };

    // ---- per-item wrapper ----
    const itemBaseStyle = (isLast: boolean): React.CSSProperties => {
      const base: React.CSSProperties = {};

      if (layout === 'vertical') {
        base.padding = ITEM_PAD[size];
      }

      if (layout === 'horizontal') {
        base.display = 'flex';
        base.alignItems = 'baseline';
        base.gap = 'var(--ledger-space-4)';
        base.padding = ITEM_PAD[size];
      }

      if (layout === 'grid') {
        // In grid, each item renders dt + dd directly — no wrapper div.
        // Padding is applied on the dt/dd instead.
        base.display = 'contents';
      }

      if (dividers && !isLast && layout !== 'grid') {
        base.borderBottom =
          '1px solid var(--ledger-color-border-default)';
      }

      return base;
    };

    // ---- <dt> term ----
    const termStyle = (isLast: boolean): React.CSSProperties => {
      const base: React.CSSProperties = {
        margin: 0,
        padding: 0,
        fontSize: TERM_FONT[size].size,
        lineHeight: TERM_FONT[size].line,
        fontWeight: fontWeight.medium,
        color: 'var(--ledger-color-text-secondary)',
      };

      if (layout === 'horizontal') {
        base.flexShrink = 0;
        base.width = 160;
      }

      if (layout === 'grid') {
        base.padding = ITEM_PAD[size];
        if (dividers && !isLast) {
          base.borderBottom =
            '1px solid var(--ledger-color-border-default)';
        }
      }

      return base;
    };

    // ---- <dd> description ----
    const descStyle = (isLast: boolean): React.CSSProperties => {
      const base: React.CSSProperties = {
        margin: 0,
        padding: 0,
        fontSize: DESC_FONT[size].size,
        lineHeight: DESC_FONT[size].line,
        fontWeight: fontWeight.regular,
        color: 'var(--ledger-color-text-primary)',
      };

      if (layout === 'vertical') {
        base.marginTop = 'var(--ledger-space-1)';
      }

      if (layout === 'horizontal') {
        base.flex = 1;
        base.minWidth = 0;
      }

      if (layout === 'grid') {
        base.padding = ITEM_PAD[size];
        if (dividers && !isLast) {
          base.borderBottom =
            '1px solid var(--ledger-color-border-default)';
        }
      }

      return base;
    };

    return (
      <dl
        ref={ref}
        className={cn('ledger-description-list', className)}
        style={dlStyle}
        {...rest}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          if (layout === 'grid') {
            // Grid: render dt and dd as direct children so they
            // participate in the 2-column grid.
            return (
              <React.Fragment key={i}>
                <dt
                  className="ledger-description-list__term"
                  style={termStyle(isLast)}
                >
                  {item.term}
                </dt>
                <dd
                  className="ledger-description-list__description"
                  style={descStyle(isLast)}
                >
                  {item.description}
                </dd>
              </React.Fragment>
            );
          }

          return (
            <div
              key={i}
              className="ledger-description-list__item"
              style={itemBaseStyle(isLast)}
            >
              <dt
                className="ledger-description-list__term"
                style={termStyle(isLast)}
              >
                {item.term}
              </dt>
              <dd
                className="ledger-description-list__description"
                style={descStyle(isLast)}
              >
                {item.description}
              </dd>
            </div>
          );
        })}
      </dl>
    );
  },
);

DescriptionList.displayName = 'DescriptionList';
