import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Chip } from './Chip';

/**
 * Components / Chip
 *
 * `<Chip />` is a compact element for filters, tags, and categories.
 * Optionally interactive (clickable) and dismissible.
 */
const meta: Meta<typeof Chip> = {
  title: 'Data Display/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compact element for filters, tags, and categories. Optionally interactive and dismissible.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    selected: false,
    disabled: false,
    children: 'Filter',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// ---------- Default ----------

export const Default: Story = {};

// ---------- Selected ----------

export const Selected: Story = {
  args: {
    selected: true,
    children: 'Selected',
    onClick: () => {},
  },
};

// ---------- With Dismiss ----------

export const WithDismiss: Story = {
  args: {
    children: 'Dismissible',
    onDismiss: () => {},
  },
};

// ---------- Interactive ----------

export const Interactive: Story = {
  args: {
    children: 'Clickable',
    onClick: () => {},
  },
};

// ---------- Disabled ----------

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    onClick: () => {},
  },
};

// ---------- Sizes ----------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-3)', alignItems: 'center' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
    </div>
  ),
};

// ---------- Chip Group ----------

export const ChipGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multiple chips in a filter-like layout. Click to toggle selection.',
      },
    },
  },
  render: function ChipGroupStory() {
    const categories = ['All', 'Deposits', 'Withdrawals', 'Transfers', 'Fees'];
    const [selected, setSelected] = React.useState('All');

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ledger-space-3)' }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            selected={selected === cat}
            onClick={() => setSelected(cat)}
            size="md"
          >
            {cat}
          </Chip>
        ))}
      </div>
    );
  },
};
