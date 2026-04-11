/**
 * Skyfall Ledger -- <Table /> compound components
 *
 * Semantic HTML table with compound sub-components for composable data
 * display. Uses React Context to pass density from the root <Table>
 * down to cells.
 *
 * Primitives.css additions (include alongside existing primitives):
 * ```css
 * .ledger-table { border-collapse: collapse; width: 100%; }
 * .ledger-table-row:hover { background: var(--ledger-color-surface-sunken); }
 * ```
 */
import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type TableDensity = 'compact' | 'default' | 'comfortable';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Row density preset. @default 'default' */
  density?: TableDensity;
  /** Alternate row backgrounds for scan-ability. @default false */
  striped?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  style?: React.CSSProperties;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  style?: React.CSSProperties;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  style?: React.CSSProperties;
}

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  style?: React.CSSProperties;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Density context
// ---------------------------------------------------------------------------
interface TableContextValue {
  density: TableDensity;
  striped: boolean;
}

const TableContext = React.createContext<TableContextValue>({
  density: 'default',
  striped: false,
});

function useTableContext() {
  return React.useContext(TableContext);
}

// ---------------------------------------------------------------------------
// Density padding map
// ---------------------------------------------------------------------------
const DENSITY_PADDING: Record<TableDensity, string> = {
  compact:     '4px 8px',
  default:     '8px 12px',
  comfortable: '12px 16px',
};

// ---------------------------------------------------------------------------
// Table (root)
// ---------------------------------------------------------------------------
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      density = 'default',
      striped = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const ctxValue = React.useMemo<TableContextValue>(
      () => ({ density, striped }),
      [density, striped],
    );

    const tableStyle: React.CSSProperties = {
      borderCollapse: 'collapse',
      width: '100%',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: 14,
      color: 'var(--ledger-color-text-primary)',
      ...style,
    };

    return (
      <TableContext.Provider value={ctxValue}>
        <div style={{ overflowX: 'auto' }}>
          <table
            ref={ref}
            className={cn('ledger-table', className)}
            style={tableStyle}
            {...rest}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  },
);

Table.displayName = 'Table';

// ---------------------------------------------------------------------------
// TableHead
// ---------------------------------------------------------------------------
export const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, children, style, ...rest }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn('ledger-table-head', className)}
        style={style}
        {...rest}
      >
        {children}
      </thead>
    );
  },
);

TableHead.displayName = 'TableHead';

// ---------------------------------------------------------------------------
// TableBody
// ---------------------------------------------------------------------------
export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, style, ...rest }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn('ledger-table-body', className)}
        style={style}
        {...rest}
      >
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = 'TableBody';

// ---------------------------------------------------------------------------
// TableRow
// ---------------------------------------------------------------------------
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, style, ...rest }, ref) => {
    const { striped } = useTableContext();

    const rowStyle: React.CSSProperties = {
      borderBottom: '1px solid var(--ledger-color-border-subtle)',
      transition: 'background 120ms ease',
      ...style,
    };

    return (
      <tr
        ref={ref}
        className={cn(
          'ledger-table-row',
          striped && 'ledger-table-row--striped',
          className,
        )}
        style={rowStyle}
        {...rest}
      >
        {children}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';

// ---------------------------------------------------------------------------
// TableHeaderCell
// ---------------------------------------------------------------------------
export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, children, style, ...rest }, ref) => {
    const { density } = useTableContext();

    const thStyle: React.CSSProperties = {
      padding: DENSITY_PADDING[density],
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--ledger-color-text-muted)',
      textAlign: 'left',
      borderBottom: '2px solid var(--ledger-color-border-subtle)',
      whiteSpace: 'nowrap',
      ...style,
    };

    return (
      <th
        ref={ref}
        scope="col"
        className={cn('ledger-table-header-cell', className)}
        style={thStyle}
        {...rest}
      >
        {children}
      </th>
    );
  },
);

TableHeaderCell.displayName = 'TableHeaderCell';

// ---------------------------------------------------------------------------
// TableCell
// ---------------------------------------------------------------------------
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, style, ...rest }, ref) => {
    const { density } = useTableContext();

    const tdStyle: React.CSSProperties = {
      padding: DENSITY_PADDING[density],
      verticalAlign: 'middle',
      ...style,
    };

    return (
      <td
        ref={ref}
        className={cn('ledger-table-cell', className)}
        style={tdStyle}
        {...rest}
      >
        {children}
      </td>
    );
  },
);

TableCell.displayName = 'TableCell';
