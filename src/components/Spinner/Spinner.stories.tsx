import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Spinner } from './Spinner';

/**
 * Feedback / Spinner
 *
 * `<Spinner />` is a circular loading indicator with four size presets
 * and configurable color. Pair with visible context text in financial
 * workflows so users understand what they are waiting for.
 */
const meta: Meta<typeof Spinner> = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Spinner -- SVG-based circular loading indicator for in-progress states such as transaction processing, data fetching, and account verification. Offers four size presets (`sm`, `md`, `lg`, `xl`) and a configurable color that defaults to `currentColor`.\n\n### Accessibility\n- Renders with `role="status"` and `aria-live="polite"` so loading state is announced without interrupting current screen-reader output.\n- Includes a visually hidden label (defaults to "Loading") for assistive technology.\n- SVG arc is marked `aria-hidden="true"` to avoid announcing decorative content.\n- In financial workflows, always pair with visible context text (e.g. "Processing transaction...") so sighted users also understand the wait.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Diameter preset: `sm` (16px), `md` (24px), `lg` (32px), `xl` (48px).',
    },
    color: {
      control: 'color',
      description: 'Track and arc color. Defaults to `currentColor` so it inherits from the parent.',
    },
    label: {
      control: 'text',
      description: 'Visually hidden text read by screen readers. Defaults to "Loading".',
    },
  },
  args: {
    size: 'md',
    label: 'Loading',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// ---------- Default ----------

export const Default: Story = {};

// ---------- All Sizes ----------

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All four size presets displayed side by side (sm=16, md=24, lg=32, xl=48).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-5)', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ledger-space-2)' }}>
        <Spinner size="sm" />
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 12, color: 'var(--ledger-color-text-muted)' }}>sm</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ledger-space-2)' }}>
        <Spinner size="md" />
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 12, color: 'var(--ledger-color-text-muted)' }}>md</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ledger-space-2)' }}>
        <Spinner size="lg" />
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 12, color: 'var(--ledger-color-text-muted)' }}>lg</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ledger-space-2)' }}>
        <Spinner size="xl" />
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 12, color: 'var(--ledger-color-text-muted)' }}>xl</span>
      </div>
    </div>
  ),
};

// ---------- Custom Colors ----------

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Spinners with custom colors using Ledger design tokens.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-5)', alignItems: 'center' }}>
      <Spinner size="lg" color="var(--ledger-color-teal-500)" />
      <Spinner size="lg" color="var(--ledger-color-positive)" />
      <Spinner size="lg" color="var(--ledger-color-negative)" />
      <Spinner size="lg" color="var(--ledger-color-warning)" />
      <Spinner size="lg" color="var(--ledger-color-info)" />
    </div>
  ),
};

// ---------- Inherit Color ----------

export const InheritColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default `currentColor` inherits from the parent element.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-5)', alignItems: 'center' }}>
      <span style={{ color: 'var(--ledger-color-teal-500)' }}>
        <Spinner size="md" />
      </span>
      <span style={{ color: 'var(--ledger-color-negative)' }}>
        <Spinner size="md" />
      </span>
      <span style={{ color: 'var(--ledger-color-text-muted)' }}>
        <Spinner size="md" />
      </span>
    </div>
  ),
};

// ---------- With Label ----------

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Spinner paired with visible loading text for financial workflows.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ledger-space-3)' }}>
        <Spinner size="sm" label="Processing transaction" />
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 13, color: 'var(--ledger-color-text-secondary)' }}>
          Processing transaction...
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ledger-space-3)' }}>
        <Spinner size="md" label="Loading account data" color="var(--ledger-color-teal-500)" />
        <span style={{ fontFamily: 'var(--ledger-font-sans)', fontSize: 14, color: 'var(--ledger-color-text-secondary)' }}>
          Loading account data...
        </span>
      </div>
    </div>
  ),
};
