import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Progress } from './Progress';

/**
 * Data Display / Progress
 *
 * `<Progress />` is a linear progress bar with determinate and
 * indeterminate modes, color-coded by semantic tone.
 */
const meta: Meta<typeof Progress> = {
  title: 'Data Display/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Linear progress bar with determinate and indeterminate modes, sized as sm or md.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    tone: {
      control: { type: 'select' },
      options: ['accent', 'positive', 'negative', 'warning'],
    },
    label: { control: 'text' },
  },
  args: {
    value: 60,
    size: 'md',
    tone: 'accent',
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

// ---------- Default ----------

export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => (
    <div style={{ maxWidth: 400 }}>
      <Progress {...args} />
    </div>
  ),
};

// ---------- Indeterminate ----------

export const Indeterminate: Story = {
  args: {
    value: undefined,
  },
  render: (args) => (
    <div style={{ maxWidth: 400 }}>
      <Progress {...args} />
    </div>
  ),
};

// ---------- AllTones ----------

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-5)', maxWidth: 400 }}>
      <div>
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 'var(--ledger-font-size-label)', color: 'var(--ledger-color-text-secondary)', display: 'block', marginBottom: 'var(--ledger-space-2)' }}>
          Accent
        </span>
        <Progress value={75} tone="accent" />
      </div>
      <div>
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 'var(--ledger-font-size-label)', color: 'var(--ledger-color-text-secondary)', display: 'block', marginBottom: 'var(--ledger-space-2)' }}>
          Positive
        </span>
        <Progress value={100} tone="positive" />
      </div>
      <div>
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 'var(--ledger-font-size-label)', color: 'var(--ledger-color-text-secondary)', display: 'block', marginBottom: 'var(--ledger-space-2)' }}>
          Negative
        </span>
        <Progress value={30} tone="negative" />
      </div>
      <div>
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 'var(--ledger-font-size-label)', color: 'var(--ledger-color-text-secondary)', display: 'block', marginBottom: 'var(--ledger-space-2)' }}>
          Warning
        </span>
        <Progress value={55} tone="warning" />
      </div>
    </div>
  ),
};

// ---------- Sizes ----------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-5)', maxWidth: 400 }}>
      <div>
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 'var(--ledger-font-size-label)', color: 'var(--ledger-color-text-secondary)', display: 'block', marginBottom: 'var(--ledger-space-2)' }}>
          Small (4px)
        </span>
        <Progress value={65} size="sm" />
      </div>
      <div>
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 'var(--ledger-font-size-label)', color: 'var(--ledger-color-text-secondary)', display: 'block', marginBottom: 'var(--ledger-space-2)' }}>
          Medium (8px)
        </span>
        <Progress value={65} size="md" />
      </div>
    </div>
  ),
};

// ---------- WithLabel ----------

export const WithLabel: Story = {
  render: () => (
    <div style={{ maxWidth: 400, fontFamily: 'var(--ledger-font-sans)' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 'var(--ledger-space-2)',
        }}
      >
        <span style={{ fontSize: 'var(--ledger-font-size-body-sm)', color: 'var(--ledger-color-text-primary)' }}>
          Uploading document...
        </span>
        <span style={{ fontSize: 'var(--ledger-font-size-body-sm)', color: 'var(--ledger-color-text-secondary)' }}>
          72%
        </span>
      </div>
      <Progress value={72} label="Uploading document" tone="accent" />
    </div>
  ),
};
