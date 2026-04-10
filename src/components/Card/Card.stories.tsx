import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Card } from './Card';
import { Amount } from '../Amount';

/**
 * Components / Card
 *
 * `<Card />` is the dominant container surface in Skyfall Ledger, used to
 * group related content with raised, outlined, or flat treatments.
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A container surface for content grouping with raised, outlined, and flat variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['raised', 'outlined', 'flat'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article'],
    },
  },
  args: {
    variant: 'raised',
    padding: 'md',
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ---------- Default (raised) ----------

export const Default: Story = {
  args: {
    children: (
      <span style={{ color: 'var(--ledger-color-text-primary)', fontFamily: 'var(--ledger-font-sans)' }}>
        Default raised card with medium padding.
      </span>
    ),
  },
};

// ---------- Outlined ----------

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <span style={{ color: 'var(--ledger-color-text-primary)', fontFamily: 'var(--ledger-font-sans)' }}>
        Outlined card with a subtle border, no shadow.
      </span>
    ),
  },
};

// ---------- Flat ----------

export const Flat: Story = {
  args: {
    variant: 'flat',
    children: (
      <span style={{ color: 'var(--ledger-color-text-primary)', fontFamily: 'var(--ledger-font-sans)' }}>
        Flat card -- no border, no shadow.
      </span>
    ),
  },
};

// ---------- Padding variations ----------

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div
        style={{
          color: 'var(--ledger-color-text-primary)',
          fontFamily: 'var(--ledger-font-sans)',
          padding: 'var(--ledger-space-5)',
          borderBottom: '1px solid var(--ledger-color-border-subtle)',
        }}
      >
        Content manages its own padding when Card padding is &ldquo;none&rdquo;.
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: (
      <span style={{ color: 'var(--ledger-color-text-primary)', fontFamily: 'var(--ledger-font-sans)' }}>
        Small padding (16px).
      </span>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: (
      <span style={{ color: 'var(--ledger-color-text-primary)', fontFamily: 'var(--ledger-font-sans)' }}>
        Large padding (32px).
      </span>
    ),
  },
};

// ---------- Nested ----------

export const Nested: Story = {
  render: () => (
    <Card variant="raised" padding="md">
      <div
        style={{
          color: 'var(--ledger-color-text-primary)',
          fontFamily: 'var(--ledger-font-sans)',
          marginBottom: 'var(--ledger-space-5)',
        }}
      >
        Outer raised card
      </div>
      <Card variant="outlined" padding="sm">
        <span
          style={{
            color: 'var(--ledger-color-text-secondary)',
            fontFamily: 'var(--ledger-font-sans)',
          }}
        >
          Inner outlined card nested inside the outer card.
        </span>
      </Card>
    </Card>
  ),
};

// ---------- Composition Example ----------

export const CompositionExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A realistic composition showing a card with a heading, description text, and an Amount component.',
      },
    },
  },
  render: () => (
    <Card variant="raised" padding="lg" as="article" style={{ maxWidth: 380 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-4)' }}>
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--ledger-color-text-primary)',
          }}
        >
          Total Balance
        </h3>
        <Amount value={48_291.64} size="xl" tone="neutral" dimDecimals />
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '13px',
            color: 'var(--ledger-color-text-muted)',
          }}
        >
          Across 3 accounts as of today.
        </p>
      </div>
    </Card>
  ),
};
