import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { DataGrid } from './DataGrid';
import type { DataGridColumn, SortDirection } from './DataGrid';
import { Badge } from '../Badge';

/**
 * Data Display / Data Grid
 *
 * `<DataGrid />` is a composable data grid built on the `<Table />`
 * compound primitives. It provides sorting, row selection, density
 * presets, and loading / empty states out of the box.
 */
const meta: Meta<typeof DataGrid> = {
  title: 'Components/Data Display/Data Grid',
  component: DataGrid,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 960 }}><Story /></div>],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'DataGrid -- A composable data grid built on the Table compound primitives. Supports column sorting, row selection with select-all / indeterminate state, three density presets, sticky headers, striped rows, loading skeletons, and empty states.\n\nAccessibility:\n- Built on semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements for inherent row/column semantics.\n- Sortable column headers expose `aria-sort` (ascending / descending / none).\n- Selection checkboxes include `aria-label` for each row and the select-all control.\n- The select-all checkbox supports the HTML `indeterminate` state for partial selection.\n- Loading state is announced to assistive technology via `aria-busy`.',
      },
    },
  },
  argTypes: {
    density: {
      control: { type: 'select' },
      options: ['compact', 'default', 'comfortable'],
      description: 'Row density preset controlling cell padding.',
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Alternate row backgrounds for improved scan-ability.',
    },
    stickyHeader: {
      control: { type: 'boolean' },
      description: 'Pin the header row while scrolling.',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading skeleton rows.',
    },
  },
  args: {
    density: 'default',
    striped: false,
    stickyHeader: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// ---------------------------------------------------------------------------
// Sample fintech data
// ---------------------------------------------------------------------------

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: string;
  status: string;
  statusTone: 'positive' | 'negative' | 'warning' | 'neutral' | 'info';
}

const transactions: Transaction[] = [
  { id: 'TXN-9201', date: 'Apr 11, 2026', description: 'Wire Transfer - Acme Corp', category: 'Wire Transfer', amount: '+$45,000.00', status: 'Settled', statusTone: 'positive' },
  { id: 'TXN-9200', date: 'Apr 10, 2026', description: 'ACH Payment - Payroll Q1', category: 'ACH Payment', amount: '-$128,450.00', status: 'Settled', statusTone: 'positive' },
  { id: 'TXN-9199', date: 'Apr 10, 2026', description: 'Card Charge - AWS Infrastructure', category: 'Card Payment', amount: '-$6,312.47', status: 'Pending', statusTone: 'warning' },
  { id: 'TXN-9198', date: 'Apr 9, 2026', description: 'Wire Transfer - Globex Industries', category: 'Wire Transfer', amount: '+$92,750.00', status: 'Settled', statusTone: 'positive' },
  { id: 'TXN-9197', date: 'Apr 9, 2026', description: 'ACH Payment - Office Lease', category: 'ACH Payment', amount: '-$18,500.00', status: 'Settled', statusTone: 'positive' },
  { id: 'TXN-9196', date: 'Apr 8, 2026', description: 'Reversal - Duplicate Charge', category: 'Reversal', amount: '+$2,400.00', status: 'Reversed', statusTone: 'negative' },
  { id: 'TXN-9195', date: 'Apr 8, 2026', description: 'Wire Transfer - Stark Ventures', category: 'Wire Transfer', amount: '+$34,000.00', status: 'Processing', statusTone: 'info' },
  { id: 'TXN-9194', date: 'Apr 7, 2026', description: 'Card Charge - Datadog Monitoring', category: 'Card Payment', amount: '-$1,847.00', status: 'Settled', statusTone: 'positive' },
  { id: 'TXN-9193', date: 'Apr 7, 2026', description: 'ACH Payment - Insurance Premium', category: 'ACH Payment', amount: '-$4,200.00', status: 'Failed', statusTone: 'negative' },
  { id: 'TXN-9192', date: 'Apr 6, 2026', description: 'Wire Transfer - Wayne Enterprises', category: 'Wire Transfer', amount: '+$67,500.00', status: 'Settled', statusTone: 'positive' },
];

const transactionColumns: DataGridColumn<Transaction>[] = [
  {
    key: 'date',
    header: 'Date',
    sortable: true,
    width: 120,
  },
  {
    key: 'description',
    header: 'Description',
    sortable: true,
  },
  {
    key: 'category',
    header: 'Category',
    sortable: true,
    width: 130,
  },
  {
    key: 'amount',
    header: 'Amount',
    sortable: true,
    width: 140,
    align: 'right',
    render: (v) => (
      <span
        style={{
          fontFamily: 'var(--ledger-font-mono)',
          fontWeight: 500,
          color: (v as string).startsWith('+')
            ? 'var(--ledger-color-positive)'
            : 'var(--ledger-color-text-primary)',
        }}
      >
        {v as string}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    width: 120,
    render: (_v, row) => (
      <Badge tone={row.statusTone} size="sm">
        {row.status}
      </Badge>
    ),
  },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const TransactionList: Story = {
  name: 'Transaction List',
  render: () => (
    <DataGrid columns={transactionColumns} data={transactions} striped />
  ),
};

export const SortableColumns: Story = {
  name: 'Sortable Columns',
  render: function SortableColumnsStory() {
    const [sortCol, setSortCol] = React.useState<string>('date');
    const [sortDir, setSortDir] = React.useState<SortDirection>('desc');

    const sorted = React.useMemo(() => {
      return [...transactions].sort((a, b) => {
        const aVal = a[sortCol as keyof Transaction] ?? '';
        const bVal = b[sortCol as keyof Transaction] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }, [sortCol, sortDir]);

    return (
      <DataGrid
        columns={transactionColumns}
        data={sorted}
        sortColumn={sortCol}
        sortDirection={sortDir}
        onSort={(col, dir) => {
          setSortCol(col);
          setSortDir(dir);
        }}
        striped
      />
    );
  },
};

export const SelectableRows: Story = {
  name: 'Selectable Rows',
  render: function SelectableRowsStory() {
    const [selected, setSelected] = React.useState<number[]>([]);
    return (
      <div>
        <p
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 13,
            color: 'var(--ledger-color-text-muted)',
            marginBottom: 8,
          }}
        >
          {selected.length} of {transactions.length} transaction(s) selected
        </p>
        <DataGrid
          columns={transactionColumns}
          data={transactions}
          selectable
          selectedRows={selected}
          onSelectionChange={setSelected}
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  name: 'Loading State',
  render: () => (
    <DataGrid columns={transactionColumns} data={[]} loading striped />
  ),
};

export const EmptyState: Story = {
  name: 'Empty State',
  render: () => (
    <DataGrid
      columns={transactionColumns}
      data={[]}
      emptyMessage="No transactions match your filter criteria"
    />
  ),
};

export const CompactDensity: Story = {
  name: 'Compact Density',
  render: () => (
    <DataGrid
      columns={transactionColumns}
      data={transactions}
      density="compact"
      striped
    />
  ),
};

export const ComfortableDensity: Story = {
  name: 'Comfortable Density',
  render: () => (
    <DataGrid
      columns={transactionColumns}
      data={transactions.slice(0, 5)}
      density="comfortable"
    />
  ),
};

export const ClickableRows: Story = {
  name: 'Clickable Rows',
  render: function ClickableRowsStory() {
    const [clicked, setClicked] = React.useState<string | null>(null);
    return (
      <div>
        {clicked && (
          <p
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: 13,
              color: 'var(--ledger-color-text-secondary)',
              marginBottom: 8,
            }}
          >
            Clicked: {clicked}
          </p>
        )}
        <DataGrid
          columns={transactionColumns}
          data={transactions}
          onRowClick={(row) => setClicked(`${row.id} -- ${row.description}`)}
          striped
        />
      </div>
    );
  },
};
