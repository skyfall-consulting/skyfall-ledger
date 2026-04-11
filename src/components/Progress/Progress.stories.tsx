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
  title: 'Components/Data Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Progress -- A linear progress bar supporting determinate (0-100) and indeterminate modes. Color-coded by semantic tone for status-aware loading, file uploads, and completion indicators in financial workflows.\n\nAccessibility:\n- Renders with `role="progressbar"` and `aria-valuemin` / `aria-valuemax` attributes.\n- In determinate mode, `aria-valuenow` reflects the clamped percentage (0-100).\n- In indeterminate mode, `aria-valuenow` is omitted so assistive technology announces an indeterminate state.\n- The `label` prop maps to `aria-label`, providing a meaningful description for screen readers (e.g. "Uploading document").',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value 0-100. Omit for indeterminate mode.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Bar height preset: sm (4px) or md (8px).',
    },
    tone: {
      control: { type: 'select' },
      options: ['accent', 'positive', 'negative', 'warning'],
      description: 'Semantic color tone for the progress fill.',
    },
    label: {
      control: 'text',
      description: 'Accessible label describing what the progress bar represents.',
    },
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
