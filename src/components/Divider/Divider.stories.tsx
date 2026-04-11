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
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Divider -- A horizontal or vertical separator line for visually dividing sections of content. Supports subtle, default, and strong border variants with configurable spacing tokens.\n\nAccessibility:\n- Renders with `role="separator"` and the corresponding `aria-orientation` attribute (`horizontal` or `vertical`) for correct screen reader semantics.\n- Horizontal orientation renders as a semantic `<hr>` element; vertical orientation renders as a `<div>` with explicit separator role.\n- Purely decorative by default; assistive technology recognizes it as a content boundary.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Direction of the separator line.',
    },
    variant: {
      control: { type: 'select' },
      options: ['subtle', 'default', 'strong'],
      description: 'Visual weight of the border color.',
    },
    spacing: {
      control: { type: 'number', min: 0, max: 13 },
      description: 'Spacing token key (0-13) applied as margin around the divider.',
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
  parameters: {
    docs: {
      description: {
        story: 'Subtle dividers used inside a raised card to separate account summary line items.',
      },
    },
  },
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
