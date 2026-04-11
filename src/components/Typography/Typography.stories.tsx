import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Typography, type TypographyVariant } from './Typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamily, fontSize, fontWeight, tracking } from '../../tokens/typography';

/**
 * Foundations / Typography
 *
 * Text rendering primitive for Skyfall Ledger. Maps to the full type scale
 * and supports polymorphic rendering, truncation, line clamping, and mono
 * variants for tabular financial data.
 */
const meta: Meta<typeof Typography> = {
  title: 'Components/Foundations/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typography primitive with display, title, body, label, and mono variants. Mono variants use tabular numerals for aligned financial figures.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'display-xl',
        'display-lg',
        'display-md',
        'title-lg',
        'title-md',
        'title-sm',
        'body-lg',
        'body-md',
        'body-sm',
        'label',
        'mono-lg',
        'mono-md',
        'mono-sm',
      ],
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'muted',
        'inverse',
        'positive',
        'negative',
        'warning',
        'info',
        'inherit',
      ],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    truncate: { control: 'boolean' },
    lineClamp: { control: { type: 'number', min: 1, max: 10 } },
  },
  args: {
    variant: 'body-md',
    color: 'primary',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: fontFamily.sans,
      fontSize: fontSize.label,
      fontWeight: fontWeight.semibold,
      letterSpacing: tracking.label,
      textTransform: 'uppercase',
      color: 'var(--ledger-color-text-muted)',
      marginBottom: space[2],
    }}
  >
    {children}
  </div>
);

const Card: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div
    style={{
      padding: space[5],
      borderRadius: radius.md,
      border: '1px solid var(--ledger-color-border-subtle)',
      background: 'var(--ledger-color-surface-raised)',
      display: 'flex',
      flexDirection: 'column',
      gap: space[3],
    }}
  >
    <SectionLabel>{label}</SectionLabel>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {};

// ---------------------------------------------------------------------------
// All Variants
// ---------------------------------------------------------------------------

const allVariants: { variant: TypographyVariant; sample: string }[] = [
  { variant: 'display-xl', sample: '$2,847,392.54' },
  { variant: 'display-lg', sample: 'Portfolio Overview' },
  { variant: 'display-md', sample: 'Account Summary' },
  { variant: 'title-lg', sample: 'Investment Holdings' },
  { variant: 'title-md', sample: 'Recent Transactions' },
  { variant: 'title-sm', sample: 'Wire Transfer Details' },
  { variant: 'body-lg', sample: 'Your portfolio has gained 12.4% this quarter, outperforming the benchmark by 3.2 percentage points.' },
  { variant: 'body-md', sample: 'Transfer scheduled for March 15, 2026. Funds will be available within 1-2 business days.' },
  { variant: 'body-sm', sample: 'Last updated: Apr 10, 2026 at 4:32 PM EST. Data may be delayed up to 15 minutes.' },
  { variant: 'label', sample: 'AVAILABLE BALANCE' },
  { variant: 'mono-lg', sample: '$1,284,567.89' },
  { variant: 'mono-md', sample: '$42,891.23' },
  { variant: 'mono-sm', sample: 'REF-20260410-7X9K2' },
];

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Every typographic variant with fintech-appropriate sample text.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      {allVariants.map(({ variant, sample }) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: space[1] }}>
          <SectionLabel>{variant}</SectionLabel>
          <Typography variant={variant}>{sample}</Typography>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Display Variants
// ---------------------------------------------------------------------------

export const DisplayVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Display-level typography for hero balances and page headers.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <Card label="display-xl - Balance Hero">
        <Typography variant="display-xl">$2,847,392.54</Typography>
      </Card>
      <Card label="display-lg - Page Header">
        <Typography variant="display-lg">Portfolio Overview</Typography>
      </Card>
      <Card label="display-md - Section Header">
        <Typography variant="display-md">Account Summary</Typography>
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Mono Variants (Financial Figures)
// ---------------------------------------------------------------------------

export const MonoVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Monospaced variants with tabular numerals for aligned financial data. Numbers align vertically in columns.',
      },
    },
  },
  render: () => (
    <Card label="Tabular Numerics">
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[3] }}>
        <div>
          <SectionLabel>mono-lg - Hero Amount</SectionLabel>
          <Typography variant="mono-lg">$1,284,567.89</Typography>
        </div>
        <div>
          <SectionLabel>mono-md - Table Amounts</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: space[1] }}>
            <Typography variant="mono-md">$  42,891.23</Typography>
            <Typography variant="mono-md">$ 128,004.50</Typography>
            <Typography variant="mono-md">$   1,337.00</Typography>
            <Typography variant="mono-md">$     892.45</Typography>
          </div>
        </div>
        <div>
          <SectionLabel>mono-sm - Reference Codes</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: space[1] }}>
            <Typography variant="mono-sm">REF-20260410-7X9K2</Typography>
            <Typography variant="mono-sm">TXN-20260409-3M8P1</Typography>
            <Typography variant="mono-sm">ACH-20260408-5R2W6</Typography>
          </div>
        </div>
      </div>
    </Card>
  ),
};

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Semantic color options for conveying status and hierarchy.',
      },
    },
  },
  render: () => (
    <Card label="Color Tokens">
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[2] }}>
        <Typography variant="body-md" color="primary">Primary - Account holder name</Typography>
        <Typography variant="body-md" color="secondary">Secondary - Transaction description</Typography>
        <Typography variant="body-md" color="muted">Muted - Timestamp or metadata</Typography>
        <Typography variant="body-md" color="positive">Positive - +$1,240.00 deposit</Typography>
        <Typography variant="body-md" color="negative">Negative - -$892.50 withdrawal</Typography>
        <Typography variant="body-md" color="warning">Warning - Pending verification</Typography>
        <Typography variant="body-md" color="info">Info - Processing within 24 hours</Typography>
        <div style={{ background: 'var(--ledger-color-obsidian-900)', padding: space[3], borderRadius: radius.sm }}>
          <Typography variant="body-md" color="inverse">Inverse - On dark surface</Typography>
        </div>
      </div>
    </Card>
  ),
};

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------

export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Text alignment options. Right-align is common for monetary figures in tables.',
      },
    },
  },
  render: () => (
    <Card label="Text Alignment">
      <Typography variant="body-md" align="left">Left-aligned: Account Name</Typography>
      <Typography variant="body-md" align="center">Center-aligned: Page Title</Typography>
      <Typography variant="mono-md" align="right">Right-aligned: $42,891.23</Typography>
    </Card>
  ),
};

// ---------------------------------------------------------------------------
// Truncation
// ---------------------------------------------------------------------------

export const Truncation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single-line ellipsis truncation for constrained layouts like table cells and card rows.',
      },
    },
  },
  render: () => (
    <Card label="Single-line Truncation">
      <div style={{ maxWidth: 280 }}>
        <Typography variant="body-md" truncate>
          Wire transfer to Acme Corporation International Holdings Ltd - Invoice #INV-2026-04-1087
        </Typography>
      </div>
      <div style={{ maxWidth: 200 }}>
        <Typography variant="mono-sm" truncate>
          REF-20260410-7X9K2-ABCDEFGHIJKLMNOP
        </Typography>
      </div>
    </Card>
  ),
};

// ---------------------------------------------------------------------------
// Line Clamp
// ---------------------------------------------------------------------------

export const LineClamp: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multi-line clamping for transaction notes and descriptions.',
      },
    },
  },
  render: () => (
    <Card label="Multi-line Clamp">
      <div style={{ maxWidth: 360 }}>
        <SectionLabel>2-line clamp</SectionLabel>
        <Typography variant="body-md" lineClamp={2}>
          Monthly subscription payment for premium analytics dashboard.
          Includes advanced portfolio tracking, real-time market data,
          and personalized investment recommendations based on your
          risk profile and financial goals.
        </Typography>
      </div>
      <div style={{ maxWidth: 360 }}>
        <SectionLabel>3-line clamp</SectionLabel>
        <Typography variant="body-sm" lineClamp={3} color="secondary">
          This transaction was flagged for review due to an unusual
          amount pattern. Our fraud detection system identified this
          as a potential anomaly based on your historical spending.
          Please confirm whether this transaction is legitimate by
          contacting our support team or using the in-app verification flow.
        </Typography>
      </div>
    </Card>
  ),
};

// ---------------------------------------------------------------------------
// Polymorphic `as` Prop
// ---------------------------------------------------------------------------

export const PolymorphicAs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Override the rendered HTML element with the `as` prop while keeping variant styling.',
      },
    },
  },
  render: () => (
    <Card label="Polymorphic Rendering">
      <Typography variant="title-lg" as="div">
        title-lg rendered as a div
      </Typography>
      <Typography variant="body-md" as="span">
        body-md rendered as a span (inline)
      </Typography>
      <Typography variant="label" as="label" htmlFor="demo-input">
        label rendered as a label element
      </Typography>
    </Card>
  ),
};

// ---------------------------------------------------------------------------
// Financial Dashboard Composition
// ---------------------------------------------------------------------------

export const FinancialDashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic composition showing typography in a fintech dashboard context.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[6] }}>
      {/* Page header */}
      <div>
        <Typography variant="label" color="muted" style={{ textTransform: 'uppercase' }}>
          Total Portfolio Value
        </Typography>
        <Typography variant="display-xl">$2,847,392.54</Typography>
        <Typography variant="body-md" color="positive">
          +$34,521.80 (+1.23%) today
        </Typography>
      </div>

      {/* Account cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: space[4],
        }}
      >
        {[
          { name: 'Checking', balance: '$24,891.23', acct: '****4521' },
          { name: 'Savings', balance: '$128,004.50', acct: '****7832' },
          { name: 'Investment', balance: '$2,694,497.81', acct: '****1190' },
        ].map((account) => (
          <div
            key={account.name}
            style={{
              padding: space[5],
              borderRadius: radius.md,
              border: '1px solid var(--ledger-color-border-subtle)',
              background: 'var(--ledger-color-surface-raised)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: space[2] }}>
              <Typography variant="title-sm">{account.name}</Typography>
              <Typography variant="mono-sm" color="muted">{account.acct}</Typography>
            </div>
            <Typography variant="mono-lg">{account.balance}</Typography>
          </div>
        ))}
      </div>

      {/* Transaction list */}
      <div>
        <Typography variant="title-md" style={{ marginBottom: space[3] }}>
          Recent Transactions
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--ledger-color-border-subtle)',
            borderRadius: radius.md,
            overflow: 'hidden',
          }}
        >
          {[
            { desc: 'Payroll Deposit - Acme Corp', amount: '+$8,450.00', date: 'Apr 10', color: 'positive' as const },
            { desc: 'AWS Infrastructure - Monthly', amount: '-$2,341.87', date: 'Apr 9', color: 'negative' as const },
            { desc: 'Wire Transfer to Savings', amount: '-$5,000.00', date: 'Apr 8', color: 'negative' as const },
            { desc: 'Client Payment - Invoice #1087', amount: '+$12,500.00', date: 'Apr 7', color: 'positive' as const },
          ].map((txn, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `${space[3]} ${space[4]}`,
                borderBottom: i < 3 ? '1px solid var(--ledger-color-border-subtle)' : 'none',
                background: 'var(--ledger-color-surface-raised)',
              }}
            >
              <div style={{ flex: 1, minWidth: 0, marginRight: space[4] }}>
                <Typography variant="body-md" truncate>{txn.desc}</Typography>
                <Typography variant="body-sm" color="muted">{txn.date}</Typography>
              </div>
              <Typography variant="mono-md" color={txn.color} align="right">
                {txn.amount}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
