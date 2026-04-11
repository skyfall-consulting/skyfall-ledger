import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionList } from './DescriptionList';

/**
 * Data Display / DescriptionList
 *
 * Semantic key-value pairs rendered with `<dl>` / `<dt>` / `<dd>`.
 * Use for transaction details, account summaries, invoice metadata,
 * and any two-column label-value layout.
 */
const meta: Meta<typeof DescriptionList> = {
  title: 'Data Display/DescriptionList',
  component: DescriptionList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Semantic key-value list using dl/dt/dd. Supports vertical, horizontal, and grid layouts with optional dividers.',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'grid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    dividers: { control: 'boolean' },
  },
  args: {
    layout: 'vertical',
    size: 'md',
    dividers: false,
  },
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

// ---------------------------------------------------------------------------
// Shared fintech data sets
// ---------------------------------------------------------------------------

const transactionItems = [
  { term: 'Date', description: 'Apr 10, 2026 at 2:34 PM' },
  { term: 'Amount', description: '$1,250.00' },
  { term: 'Status', description: 'Completed' },
  { term: 'Reference', description: 'TXN-2026-04-00384' },
];

const accountItems = [
  { term: 'Account Number', description: '****-****-****-7823' },
  { term: 'Routing Number', description: '021000021' },
  { term: 'Balance', description: '$48,215.63' },
  { term: 'Type', description: 'Business Checking' },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

// ---------- Default (Vertical) ----------

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <DescriptionList {...args} items={transactionItems} />
    </div>
  ),
};

// ---------- Horizontal ----------

export const Horizontal: Story = {
  args: {
    layout: 'horizontal',
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <DescriptionList {...args} items={transactionItems} />
    </div>
  ),
};

// ---------- Grid ----------

export const Grid: Story = {
  args: {
    layout: 'grid',
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <DescriptionList {...args} items={accountItems} />
    </div>
  ),
};

// ---------- With Dividers ----------

export const WithDividers: Story = {
  args: {
    layout: 'horizontal',
    dividers: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <DescriptionList {...args} items={transactionItems} />
    </div>
  ),
};

// ---------- Small Size ----------

export const Small: Story = {
  args: {
    size: 'sm',
    layout: 'horizontal',
    dividers: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <DescriptionList {...args} items={accountItems} />
    </div>
  ),
};

// ---------- Transaction Details (fintech card) ----------

export const TransactionDetails: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 480,
        background: 'var(--ledger-color-surface-raised)',
        boxShadow: 'var(--ledger-shadow-2)',
        borderRadius: 'var(--ledger-radius-md)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: 'var(--ledger-space-5) var(--ledger-space-5) var(--ledger-space-2)',
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: 'var(--ledger-font-size-title-sm)',
          fontWeight: 600,
          color: 'var(--ledger-color-text-primary)',
        }}
      >
        Transaction Details
      </div>
      <div style={{ padding: '0 var(--ledger-space-5) var(--ledger-space-5)' }}>
        <DescriptionList
          layout="horizontal"
          dividers
          items={[
            { term: 'Date', description: 'Apr 10, 2026 at 2:34 PM' },
            { term: 'Amount', description: '$1,250.00' },
            {
              term: 'Status',
              description: (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--ledger-space-2)',
                    color: 'var(--ledger-color-teal-400)',
                    fontWeight: 500,
                  }}
                >
                  Completed
                </span>
              ),
            },
            { term: 'Reference', description: 'TXN-2026-04-00384' },
            { term: 'Merchant', description: 'Cloud Hosting Co.' },
            { term: 'Category', description: 'Infrastructure' },
          ]}
        />
      </div>
    </div>
  ),
};

// ---------- Account Info (fintech card) ----------

export const AccountInfo: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 480,
        background: 'var(--ledger-color-surface-raised)',
        boxShadow: 'var(--ledger-shadow-2)',
        borderRadius: 'var(--ledger-radius-md)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: 'var(--ledger-space-5) var(--ledger-space-5) var(--ledger-space-2)',
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: 'var(--ledger-font-size-title-sm)',
          fontWeight: 600,
          color: 'var(--ledger-color-text-primary)',
        }}
      >
        Account Information
      </div>
      <div style={{ padding: '0 var(--ledger-space-5) var(--ledger-space-5)' }}>
        <DescriptionList
          layout="grid"
          dividers
          items={[
            { term: 'Account Number', description: '****-****-****-7823' },
            { term: 'Routing Number', description: '021000021' },
            {
              term: 'Balance',
              description: (
                <span
                  style={{
                    fontFamily: 'var(--ledger-font-mono)',
                    fontWeight: 600,
                  }}
                >
                  $48,215.63
                </span>
              ),
            },
            { term: 'Type', description: 'Business Checking' },
            { term: 'Status', description: 'Active' },
            { term: 'Opened', description: 'Jan 15, 2024' },
          ]}
        />
      </div>
    </div>
  ),
};

// ---------- Grid Layout with Dividers ----------

export const GridWithDividers: Story = {
  args: {
    layout: 'grid',
    dividers: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <DescriptionList
        {...args}
        items={[
          ...transactionItems,
          { term: 'Merchant', description: 'Cloud Hosting Co.' },
          { term: 'Category', description: 'Infrastructure' },
        ]}
      />
    </div>
  ),
};
