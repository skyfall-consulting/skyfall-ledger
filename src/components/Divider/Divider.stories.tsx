import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Divider } from './Divider';

/**
 * Data Display / Divider
 *
 * `<Divider />` renders a horizontal or vertical separator line
 * to visually divide sections of content.
 */
const meta: Meta<typeof Divider> = {
  title: 'Components/Data Display/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A horizontal or vertical separator line with subtle, default, and strong variants.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['subtle', 'default', 'strong'],
    },
    spacing: {
      control: { type: 'number', min: 0, max: 13 },
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'default',
    spacing: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ---------- Default ----------

export const Default: Story = {};

// ---------- Subtle ----------

export const Subtle: Story = {
  args: {
    variant: 'subtle',
  },
};

// ---------- Strong ----------

export const Strong: Story = {
  args: {
    variant: 'strong',
  },
};

// ---------- Vertical ----------

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 40, fontFamily: 'var(--ledger-font-sans)', color: 'var(--ledger-color-text-primary)' }}>
      <span>Section A</span>
      <Divider orientation="vertical" spacing={5} />
      <span>Section B</span>
      <Divider orientation="vertical" spacing={5} />
      <span>Section C</span>
    </div>
  ),
};

// ---------- WithSpacing ----------

export const WithSpacing: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--ledger-font-sans)', color: 'var(--ledger-color-text-primary)' }}>
      <p style={{ margin: 0 }}>Content above the divider.</p>
      <Divider spacing={5} />
      <p style={{ margin: 0 }}>Content below the divider with spacing applied.</p>
    </div>
  ),
};

// ---------- InCard ----------

export const InCard: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--ledger-color-surface-raised)',
        boxShadow: 'var(--ledger-shadow-2)',
        borderRadius: 'var(--ledger-radius-md)',
        padding: 'var(--ledger-space-7)',
        maxWidth: 380,
        fontFamily: 'var(--ledger-font-sans)',
        color: 'var(--ledger-color-text-primary)',
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Account Summary</h3>
      <Divider spacing={4} variant="subtle" />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <span>Checking</span>
        <span style={{ fontWeight: 500 }}>$12,450.00</span>
      </div>
      <Divider spacing={3} variant="subtle" />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <span>Savings</span>
        <span style={{ fontWeight: 500 }}>$35,841.64</span>
      </div>
    </div>
  ),
};
