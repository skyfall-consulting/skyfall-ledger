/**
 * Skyfall Ledger -- <Grid /> & <GridItem />
 *
 * CSS Grid layout with token-driven gaps and a companion GridItem
 * for controlling column span and start position. The `columns` prop
 * accepts a number (mapped to `repeat(n, 1fr)`) or a raw CSS string
 * for advanced track definitions.
 */
import * as React from 'react';
import type { SpaceToken } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Grid Types
// ---------------------------------------------------------------------------
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column definition. Number maps to `repeat(n, 1fr)`, string is passed through. @default 12 */
  columns?: number | string;
  /** Gap for both axes (space token key 0-13). @default 5 */
  gap?: SpaceToken;
  /** Row gap override (space token key 0-13). */
  rowGap?: SpaceToken;
  /** Column gap override (space token key 0-13). */
  columnGap?: SpaceToken;
  /** Cross-axis alignment for all items. */
  alignItems?: React.CSSProperties['alignItems'];
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// GridItem Types
// ---------------------------------------------------------------------------
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span. */
  span?: number;
  /** Starting column (1-based). */
  start?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const resolveColumns = (columns: number | string): string =>
  typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;

// ---------------------------------------------------------------------------
// Grid Component
// ---------------------------------------------------------------------------
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 12,
      gap = 5,
      rowGap,
      columnGap,
      alignItems,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const mergedStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: resolveColumns(columns),
      gap: `var(--ledger-space-${gap})`,
      ...(rowGap != null && { rowGap: `var(--ledger-space-${rowGap})` }),
      ...(columnGap != null && { columnGap: `var(--ledger-space-${columnGap})` }),
      ...(alignItems != null && { alignItems }),
      ...style,
    };

    return (
      <div ref={ref} className={className} style={mergedStyle} {...rest}>
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';

// ---------------------------------------------------------------------------
// GridItem Component
// ---------------------------------------------------------------------------
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      span,
      start,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const mergedStyle: React.CSSProperties = {
      ...(span != null && { gridColumn: `span ${span}` }),
      ...(start != null && { gridColumnStart: start }),
      ...style,
    };

    return (
      <div ref={ref} className={className} style={mergedStyle} {...rest}>
        {children}
      </div>
    );
  },
);

GridItem.displayName = 'GridItem';
