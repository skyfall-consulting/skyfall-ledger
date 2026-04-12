/**
 * Skyfall Ledger -- <DataGrid />
 *
 * Composable data grid built on the Table compound primitives.
 * Provides sorting, row selection, density presets, and loading /
 * empty states out of the box -- designed for transaction ledgers,
 * account lists, and other structured financial data views.
 *
 * Accessibility:
 * - Built on semantic Table sub-components (table/thead/tbody/tr/th/td)
 * - Sortable columns expose `aria-sort`
 * - Selection checkboxes carry accessible labels
 * - Loading state is announced via `aria-busy`
 * - Select-all checkbox supports indeterminate state
 */
import * as React from 'react';
import { fontFamily, fontSize, fontWeight } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { cn } from '../../utils/cn';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '../Table';
import { Skeleton } from '../Skeleton';
import { EmptyState } from '../EmptyState';

// DataGrid CSS classes are defined in primitives.css

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Column definition for the DataGrid. */
export interface DataGridColumn<T = Record<string, unknown>> {
  /** Unique key used as the data accessor. Supports dot-notation for nested values. */
  key: string;
  /** Column header label. */
  header: React.ReactNode;
  /** Custom render function for cell content. */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  /** Whether this column is sortable. */
  sortable?: boolean;
  /** Column width (CSS value). */
  width?: string | number;
  /** Text alignment. @default 'left' */
  align?: 'left' | 'center' | 'right';
}

/** Sort direction for DataGrid columns. */
export type SortDirection = 'asc' | 'desc';

/** Props for the DataGrid component. */
export interface DataGridProps<T = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Column definitions. */
  columns: DataGridColumn<T>[];
  /** Data array -- each item represents a row. */
  data: T[];
  /** Enable row selection with checkboxes. @default false */
  selectable?: boolean;
  /** Callback when selection changes; receives array of selected row indices. */
  onSelectionChange?: (selectedIndices: number[]) => void;
  /** Currently selected row indices (controlled). */
  selectedRows?: number[];
  /** Current sort column key. */
  sortColumn?: string;
  /** Current sort direction. */
  sortDirection?: SortDirection;
  /** Callback when a sortable column header is clicked. */
  onSort?: (column: string, direction: SortDirection) => void;
  /** Show loading skeleton. @default false */
  loading?: boolean;
  /** Message shown when data is empty. @default 'No data available' */
  emptyMessage?: string;
  /** Row density preset. @default 'default' */
  density?: 'default' | 'compact' | 'comfortable';
  /** Pin the header row while scrolling. @default false */
  stickyHeader?: boolean;
  /** Alternate row backgrounds for scan-ability. @default false */
  striped?: boolean;
  /** Callback when a row is clicked. */
  onRowClick?: (row: T, index: number) => void;
}

// ---------------------------------------------------------------------------
// Sort direction SVG icons
// ---------------------------------------------------------------------------
const SortAscIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="4 8 7 5 10 8" />
  </svg>
);

const SortDescIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="4 6 7 9 10 6" />
  </svg>
);

const SortNeutralIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity={0.3}
    aria-hidden="true"
  >
    <polyline points="4 5 7 3 10 5" />
    <polyline points="4 9 7 11 10 9" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * DataGrid -- composable data grid built on Table primitives.
 *
 * Designed for transaction ledgers, account lists, invoice tables,
 * and other structured financial data views within Skyfall Ledger.
 */
export function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  onSelectionChange,
  selectedRows = [],
  sortColumn,
  sortDirection,
  onSort,
  loading = false,
  emptyMessage = 'No data available',
  density = 'default',
  stickyHeader = false,
  striped = false,
  onRowClick,
  className,
  style,
  ...props
}: DataGridProps<T>) {
  // -- Selection helpers --------------------------------------------------
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  const handleSelectAll = React.useCallback(() => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((_, i) => i));
    }
  }, [allSelected, data, onSelectionChange]);

  const handleSelectRow = React.useCallback(
    (index: number) => {
      if (!onSelectionChange) return;
      if (selectedRows.includes(index)) {
        onSelectionChange(selectedRows.filter((i) => i !== index));
      } else {
        onSelectionChange([...selectedRows, index]);
      }
    },
    [selectedRows, onSelectionChange],
  );

  // -- Sort helpers -------------------------------------------------------
  const handleSort = React.useCallback(
    (key: string) => {
      if (!onSort) return;
      const newDirection: SortDirection =
        sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(key, newDirection);
    },
    [sortColumn, sortDirection, onSort],
  );

  const getAriaSort = (
    key: string,
  ): 'ascending' | 'descending' | 'none' | undefined => {
    if (sortColumn !== key) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  // -- Dot-notation accessor ----------------------------------------------
  const getValue = (row: T, key: string): unknown => {
    return key.split('.').reduce<unknown>((obj, k) => {
      if (obj && typeof obj === 'object') return (obj as Record<string, unknown>)[k];
      return undefined;
    }, row);
  };

  // -- Density mapping ----------------------------------------------------
  // Table accepts 'compact' | 'default' | 'comfortable'.
  // When density is 'comfortable' we pass 'default' to Table and apply
  // extra padding via inline styles on cells.
  const tableDensity = density === 'comfortable' ? 'default' : density;

  const comfortablePadding: React.CSSProperties | undefined =
    density === 'comfortable'
      ? { padding: `${space[5]} ${space[6]}` }
      : undefined;

  // -- Sticky header style ------------------------------------------------
  const stickyStyle: React.CSSProperties | undefined = stickyHeader
    ? {
        position: 'sticky' as const,
        top: 0,
        zIndex: 2,
        background: 'var(--ledger-color-surface-default)',
      }
    : undefined;

  // -- Sort button style --------------------------------------------------
  const sortButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space[1],
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
    font: 'inherit',
    color: 'inherit',
    fontFamily: fontFamily.sans,
    fontSize: fontSize.label,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  };

  // -- Checkbox style -----------------------------------------------------
  const checkboxStyle: React.CSSProperties = {
    width: 16,
    height: 16,
    cursor: 'pointer',
    accentColor: 'var(--ledger-color-teal-500)',
  };

  // -- Loading skeleton ---------------------------------------------------
  const LOADING_ROWS = 5;

  // -- Container style ----------------------------------------------------
  const containerStyle: React.CSSProperties = {
    width: '100%',
    ...style,
  };

  return (
    <div
      className={className}
      style={containerStyle}
      aria-busy={loading}
      {...props}
    >
      <Table density={tableDensity} striped={striped}>
        <TableHead style={stickyStyle}>
          <TableRow>
            {selectable && (
              <TableHeaderCell style={{ width: 44, ...comfortablePadding }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                  style={checkboxStyle}
                />
              </TableHeaderCell>
            )}
            {columns.map((col) => (
              <TableHeaderCell
                key={col.key}
                style={{
                  width: col.width,
                  textAlign: col.align,
                  ...comfortablePadding,
                }}
                aria-sort={col.sortable ? getAriaSort(col.key) : undefined}
              >
                {col.sortable ? (
                  <button
                    className="ledger-datagrid-sort-btn"
                    onClick={() => handleSort(col.key)}
                    style={{
                      ...sortButtonStyle,
                      textAlign: col.align,
                    }}
                  >
                    {col.header}
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {sortColumn === col.key ? (
                        sortDirection === 'asc' ? (
                          <SortAscIcon />
                        ) : (
                          <SortDescIcon />
                        )
                      ) : (
                        <SortNeutralIcon />
                      )}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: LOADING_ROWS }, (_, rowIdx) => (
              <TableRow key={`skeleton-${rowIdx}`}>
                {selectable && (
                  <TableCell style={comfortablePadding}>
                    <Skeleton variant="rectangular" width={16} height={16} />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key} style={comfortablePadding}>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)}>
                <EmptyState title={emptyMessage} />
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => {
              const isSelected = selectedRows.includes(rowIdx);
              return (
                <TableRow
                  key={rowIdx}
                  className={cn(
                    isSelected && 'ledger-datagrid-row-selected',
                    onRowClick && 'ledger-datagrid-row-clickable',
                  )}
                  onClick={onRowClick ? () => onRowClick(row, rowIdx) : undefined}
                >
                  {selectable && (
                    <TableCell style={comfortablePadding}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectRow(rowIdx);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${rowIdx + 1}`}
                        style={checkboxStyle}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => {
                    const value = getValue(row, col.key);
                    return (
                      <TableCell
                        key={col.key}
                        style={{ textAlign: col.align, ...comfortablePadding }}
                      >
                        {col.render
                          ? col.render(value, row, rowIdx)
                          : (value as React.ReactNode)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
