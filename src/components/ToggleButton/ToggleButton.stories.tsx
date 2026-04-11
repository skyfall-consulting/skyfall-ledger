import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ToggleButton } from './ToggleButton';
import { space } from '../../tokens/spacing';

/**
 * Inputs / Toggle Button
 *
 * A pill-style toggle button group for switching between mutually exclusive
 * views or filters. Supports roving tab index and arrow-key navigation.
 */
const meta: Meta<typeof ToggleButton> = {
  title: 'Components/Inputs/Toggle Button',
  component: ToggleButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toggle button with sm/md sizes and optional full-width layout. Active and hover states are handled by primitives.css.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    fullWidth: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

// ---------- Basic ----------

const periodItems = [
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '1Y', label: '1Y' },
  { value: 'ALL', label: 'All' },
];

export const Default: Story = {
  args: {
    items: periodItems,
    defaultValue: '1M',
  },
};

export const Small: Story = {
  args: {
    items: [
      { value: 'income', label: 'Income' },
      { value: 'expenses', label: 'Expenses' },
      { value: 'net', label: 'Net' },
    ],
    size: 'sm',
    defaultValue: 'income',
  },
};

export const FullWidth: Story = {
  args: {
    items: [
      { value: 'overview', label: 'Overview' },
      { value: 'transactions', label: 'Transactions' },
      { value: 'analytics', label: 'Analytics' },
    ],
    fullWidth: true,
    defaultValue: 'overview',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState('checking');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
        <ToggleButton
          {...args}
          items={[
            { value: 'checking', label: 'Checking' },
            { value: 'savings', label: 'Savings' },
            { value: 'credit', label: 'Credit' },
          ]}
          value={value}
          onChange={setValue}
        />
        <div
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 13,
            color: 'var(--ledger-color-text-secondary)',
          }}
        >
          Selected: <strong>{value}</strong>
        </div>
      </div>
    );
  },
};

export const ManyItems: Story = {
  args: {
    items: periodItems,
    defaultValue: '1M',
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    items: [
      { value: 'list', label: 'List' },
      { value: 'grid', label: 'Grid' },
      { value: 'table', label: 'Table' },
    ],
    disabled: true,
    defaultValue: 'list',
  },
};
