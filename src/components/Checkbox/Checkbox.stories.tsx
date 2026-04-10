import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Checkbox } from './Checkbox';
import { space } from '../../tokens/spacing';

/**
 * Components / Checkbox
 *
 * A toggle for boolean values with optional indeterminate state.
 * Supports controlled and uncontrolled modes, FormField integration,
 * and full keyboard accessibility.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Checkbox with optional indeterminate state. Uses CSS transitions from primitives.css for hover and checked styling.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    disabled: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ---------- Basic ----------

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const WithLabel: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Unavailable option' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: 'Locked selection' },
};

// ---------- Group ----------

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes in a vertical list, each independently controlled.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      <Checkbox label="Checking accounts" defaultChecked />
      <Checkbox label="Savings accounts" />
      <Checkbox label="Investment portfolios" />
      <Checkbox label="Credit lines" disabled />
    </div>
  ),
};
