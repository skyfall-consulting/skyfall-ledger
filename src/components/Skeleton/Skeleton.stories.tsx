import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Skeleton } from './Skeleton';

/**
 * Data Display / Skeleton
 *
 * `<Skeleton />` is a loading placeholder with a shimmer animation.
 * Compose multiple skeletons to mirror final layouts during loading.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Data Display/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Loading placeholder with shimmer animation. Supports text, rectangular, and circular variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'rectangular', 'circular'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: { type: 'number', min: 1, max: 10 } },
  },
  args: {
    variant: 'text',
    lines: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// ---------- Text ----------

export const Text: Story = {
  args: {
    variant: 'text',
    width: 260,
  },
};

// ---------- MultipleLines ----------

export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 4,
    width: 320,
  },
};

// ---------- Rectangular ----------

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 320,
    height: 160,
  },
};

// ---------- Circular ----------

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
};

// ---------- CardSkeleton ----------

export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--ledger-color-surface-raised)',
        boxShadow: 'var(--ledger-shadow-2)',
        borderRadius: 'var(--ledger-radius-md)',
        padding: 'var(--ledger-space-7)',
        maxWidth: 380,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ledger-space-5)',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ledger-space-4)' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-2)' }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      {/* Body */}
      <Skeleton variant="rectangular" width="100%" height={120} />
      {/* Footer lines */}
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};
