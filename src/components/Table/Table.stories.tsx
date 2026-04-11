import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from './Table';
import { Badge } from '../Badge';

/**
 * Data Display / Table
 *
 * `<Table />` is a semantic compound table component for displaying
 * structured financial data such as transaction ledgers, account
 * balances, and invoice lists.
 */
const meta: Meta<typeof Table> = {
  title: 'Components/Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Table -- A compound component system for displaying structured financial data. Composed from `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, and `TableCell` sub-components that map directly to semantic HTML `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements. Supports three density presets and optional striped row backgrounds for improved scan-ability.\n\nAccessibility:\n- Built entirely on native HTML table elements, providing inherent row/column semantics for screen readers and assistive technology.\n- `<th>` elements include `scope="col"` for explicit column header association.\n- Density is propagated via React Context so all cells receive consistent padding.\n- The root table is wrapped in an `overflow-x: auto` container to ensure horizontal scrollability on narrow viewports without breaking layout.',
      },
    },
  },
  argTypes: {
    density: {
      control: { type: 'select' },
      options: ['compact', 'default', 'comfortable'],
      description: 'Row density preset controlling cell padding (compact / default / comfortable).',
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Alternate row backgrounds for improved scan-ability in data-heavy tables.',
    },
  },
  args: {
    density: 'default',
    striped: false,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ---------- Default ----------

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Department</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Sarah Kim</TableCell>
          <TableCell>Portfolio Manager</TableCell>
          <TableCell>Investments</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>James Lee</TableCell>
          <TableCell>Risk Analyst</TableCell>
          <TableCell>Compliance</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Maria Gonzalez</TableCell>
          <TableCell>Operations Lead</TableCell>
          <TableCell>Operations</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// ---------- Transaction Ledger ----------

export const TransactionLedger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A financial transaction ledger showing dates, descriptions, amounts, and statuses.',
      },
    },
  },
  render: () => {
    const transactions = [
      { id: 'TXN-4821', date: 'Apr 8, 2026', desc: 'Wire Transfer - Acme Corp', amount: '+$12,500.00', status: 'Completed', tone: 'positive' as const },
      { id: 'TXN-4820', date: 'Apr 7, 2026', desc: 'ACH Payment - Payroll', amount: '-$84,200.00', status: 'Completed', tone: 'positive' as const },
      { id: 'TXN-4819', date: 'Apr 7, 2026', desc: 'Card Charge - AWS', amount: '-$3,147.82', status: 'Pending', tone: 'warning' as const },
      { id: 'TXN-4818', date: 'Apr 6, 2026', desc: 'Wire Transfer - Globex Inc', amount: '+$45,000.00', status: 'Completed', tone: 'positive' as const },
      { id: 'TXN-4817', date: 'Apr 5, 2026', desc: 'Reversal - Duplicate Charge', amount: '+$1,200.00', status: 'Reversed', tone: 'negative' as const },
    ];

    return (
      <Table density="default" striped>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Transaction ID</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell style={{ textAlign: 'right' }}>Amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell
                style={{
                  fontFamily: 'var(--ledger-font-mono)',
                  fontSize: 13,
                  color: 'var(--ledger-color-text-secondary)',
                }}
              >
                {txn.id}
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{txn.date}</TableCell>
              <TableCell>{txn.desc}</TableCell>
              <TableCell
                style={{
                  textAlign: 'right',
                  fontFamily: 'var(--ledger-font-mono)',
                  fontWeight: 500,
                  color: txn.amount.startsWith('+')
                    ? 'var(--ledger-color-positive)'
                    : 'var(--ledger-color-text-primary)',
                }}
              >
                {txn.amount}
              </TableCell>
              <TableCell>
                <Badge tone={txn.tone} size="sm">
                  {txn.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

// ---------- Account Balances ----------

export const AccountBalances: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compact account balance summary table.',
      },
    },
  },
  render: () => {
    const accounts = [
      { name: 'Operating Account', number: '****4821', type: 'Checking', balance: '$248,312.56', currency: 'USD' },
      { name: 'Payroll Reserve', number: '****7293', type: 'Checking', balance: '$185,000.00', currency: 'USD' },
      { name: 'Tax Escrow', number: '****1054', type: 'Savings', balance: '$92,450.00', currency: 'USD' },
      { name: 'EUR Operating', number: '****6187', type: 'Checking', balance: '\u20AC67,821.30', currency: 'EUR' },
      { name: 'Investment Sweep', number: '****3392', type: 'Money Market', balance: '$1,204,500.00', currency: 'USD' },
    ];

    return (
      <Table density="compact">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Account Name</TableHeaderCell>
            <TableHeaderCell>Account No.</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Currency</TableHeaderCell>
            <TableHeaderCell style={{ textAlign: 'right' }}>Balance</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((acct) => (
            <TableRow key={acct.number}>
              <TableCell style={{ fontWeight: 500 }}>{acct.name}</TableCell>
              <TableCell
                style={{
                  fontFamily: 'var(--ledger-font-mono)',
                  fontSize: 13,
                  color: 'var(--ledger-color-text-muted)',
                }}
              >
                {acct.number}
              </TableCell>
              <TableCell>{acct.type}</TableCell>
              <TableCell>{acct.currency}</TableCell>
              <TableCell
                style={{
                  textAlign: 'right',
                  fontFamily: 'var(--ledger-font-mono)',
                  fontWeight: 600,
                }}
              >
                {acct.balance}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

// ---------- Invoice List ----------

export const InvoiceList: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Invoice list with dates, amounts, and status badges -- comfortable density for readability.',
      },
    },
  },
  render: () => {
    const invoices = [
      { id: 'INV-2026-0041', client: 'Acme Corporation', issued: 'Mar 15, 2026', due: 'Apr 14, 2026', amount: '$18,750.00', status: 'Paid', tone: 'positive' as const },
      { id: 'INV-2026-0042', client: 'Globex Industries', issued: 'Mar 20, 2026', due: 'Apr 19, 2026', amount: '$32,400.00', status: 'Overdue', tone: 'negative' as const },
      { id: 'INV-2026-0043', client: 'Initech Ltd.', issued: 'Mar 28, 2026', due: 'Apr 27, 2026', amount: '$7,200.00', status: 'Pending', tone: 'warning' as const },
      { id: 'INV-2026-0044', client: 'Stark Ventures', issued: 'Apr 1, 2026', due: 'May 1, 2026', amount: '$54,000.00', status: 'Sent', tone: 'info' as const },
      { id: 'INV-2026-0045', client: 'Wayne Enterprises', issued: 'Apr 5, 2026', due: 'May 5, 2026', amount: '$12,600.00', status: 'Draft', tone: 'neutral' as const },
    ];

    return (
      <Table density="comfortable" striped>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Invoice</TableHeaderCell>
            <TableHeaderCell>Client</TableHeaderCell>
            <TableHeaderCell>Issued</TableHeaderCell>
            <TableHeaderCell>Due Date</TableHeaderCell>
            <TableHeaderCell style={{ textAlign: 'right' }}>Amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell
                style={{
                  fontFamily: 'var(--ledger-font-mono)',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {inv.id}
              </TableCell>
              <TableCell style={{ fontWeight: 500 }}>{inv.client}</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{inv.issued}</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{inv.due}</TableCell>
              <TableCell
                style={{
                  textAlign: 'right',
                  fontFamily: 'var(--ledger-font-mono)',
                  fontWeight: 600,
                }}
              >
                {inv.amount}
              </TableCell>
              <TableCell>
                <Badge tone={inv.tone} size="sm">
                  {inv.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

// ---------- Density Comparison ----------

export const DensityComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all three density options.',
      },
    },
  },
  render: () => {
    const rows = [
      { label: 'Q1 Revenue', value: '$1,245,000' },
      { label: 'Q1 Expenses', value: '$892,300' },
      { label: 'Q1 Net Income', value: '$352,700' },
    ];

    const DemoTable = ({ density, title }: { density: 'compact' | 'default' | 'comfortable'; title: string }) => (
      <div style={{ flex: 1 }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--ledger-color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--ledger-space-2)',
          }}
        >
          {title}
        </span>
        <Table density={density}>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Metric</TableHeaderCell>
              <TableHeaderCell style={{ textAlign: 'right' }}>Value</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.label}>
                <TableCell>{r.label}</TableCell>
                <TableCell
                  style={{
                    textAlign: 'right',
                    fontFamily: 'var(--ledger-font-mono)',
                    fontWeight: 500,
                  }}
                >
                  {r.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );

    return (
      <div style={{ display: 'flex', gap: 'var(--ledger-space-6)', flexWrap: 'wrap' }}>
        <DemoTable density="compact" title="Compact" />
        <DemoTable density="default" title="Default" />
        <DemoTable density="comfortable" title="Comfortable" />
      </div>
    );
  },
};
