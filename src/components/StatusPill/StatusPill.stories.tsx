import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { StatusPill } from './StatusPill';
import { Card } from '../Card';

/**
 * Components / StatusPill
 *
 * `<StatusPill />` is a pill-shaped status indicator with a colored dot,
 * used for transaction and account statuses. The "processing" status dot
 * pulses to convey ongoing activity.
 */
const meta: Meta<typeof StatusPill> = {
  title: 'Ledger X/FinTech/Status Pill',
  component: StatusPill,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pill-shaped status indicator with a dot. Used for transaction/account statuses.',
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['active', 'pending', 'settled', 'failed', 'cancelled', 'processing'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
  args: {
    status: 'active',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof StatusPill>;

// ---------- Default (active) ----------

export const Default: Story = {};

// ---------- All Statuses ----------

export const AllStatuses: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six status variants displayed in a grid.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ledger-space-3)', alignItems: 'center' }}>
      <StatusPill status="active" />
      <StatusPill status="pending" />
      <StatusPill status="settled" />
      <StatusPill status="failed" />
      <StatusPill status="cancelled" />
      <StatusPill status="processing" />
    </div>
  ),
};

// ---------- Small ----------

export const Small: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ledger-space-3)', alignItems: 'center' }}>
      <StatusPill status="active" size="sm" />
      <StatusPill status="pending" size="sm" />
      <StatusPill status="settled" size="sm" />
      <StatusPill status="failed" size="sm" />
      <StatusPill status="cancelled" size="sm" />
      <StatusPill status="processing" size="sm" />
    </div>
  ),
};

// ---------- In Context ----------

export const InContext: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status pills used in a transaction list layout.',
      },
    },
  },
  render: () => {
    const transactions = [
      { id: 'TXN-4821', desc: 'Wire to Acme Corp', amount: '-$12,500.00', status: 'settled' as const },
      { id: 'TXN-4822', desc: 'ACH from Client A', amount: '+$8,200.00', status: 'processing' as const },
      { id: 'TXN-4823', desc: 'Card payment', amount: '-$249.99', status: 'pending' as const },
      { id: 'TXN-4824', desc: 'Failed transfer', amount: '-$1,000.00', status: 'failed' as const },
    ];

    return (
      <Card variant="outlined" padding="none" style={{ maxWidth: 520 }}>
        {transactions.map((tx, i) => (
          <div
            key={tx.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--ledger-space-5)',
              borderBottom:
                i < transactions.length - 1
                  ? '1px solid var(--ledger-color-border-subtle)'
                  : undefined,
              fontFamily: 'var(--ledger-font-sans)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--ledger-color-text-primary)',
                }}
              >
                {tx.desc}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--ledger-color-text-muted)',
                }}
              >
                {tx.id}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ledger-space-4)' }}>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--ledger-color-text-primary)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {tx.amount}
              </span>
              <StatusPill status={tx.status} size="sm" />
            </div>
          </div>
        ))}
      </Card>
    );
  },
};
