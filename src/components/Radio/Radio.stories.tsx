import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { RadioGroup, Radio } from './Radio';

/**
 * Components / Radio
 *
 * A radio group with individual radio items for single-selection lists.
 * Supports vertical and horizontal layouts, controlled and uncontrolled
 * modes, and FormField integration.
 */
const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'RadioGroup + Radio for single selection. Checked state and inner dot are handled by CSS transitions in primitives.css.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    direction: 'vertical',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// ---------- Basic ----------

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} name="account-type" defaultValue="checking">
      <Radio value="checking" label="Checking account" />
      <Radio value="savings" label="Savings account" />
      <Radio value="investment" label="Investment portfolio" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} name="period" direction="horizontal" defaultValue="monthly">
      <Radio value="daily" label="Daily" />
      <Radio value="weekly" label="Weekly" />
      <Radio value="monthly" label="Monthly" />
      <Radio value="yearly" label="Yearly" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} name="disabled-group" disabled defaultValue="a">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
      <Radio value="c" label="Option C" />
    </RadioGroup>
  ),
};

export const Preselected: Story = {
  render: (args) => (
    <RadioGroup {...args} name="preselected" defaultValue="wire">
      <Radio value="ach" label="ACH Transfer" />
      <Radio value="wire" label="Wire Transfer" />
      <Radio value="internal" label="Internal Transfer" />
    </RadioGroup>
  ),
};

export const WithLabels: Story = {
  render: (args) => (
    <RadioGroup {...args} name="currency" defaultValue="usd">
      <Radio value="usd" label="USD - United States Dollar" />
      <Radio value="eur" label="EUR - Euro" />
      <Radio value="gbp" label="GBP - British Pound" />
      <Radio value="jpy" label="JPY - Japanese Yen" />
    </RadioGroup>
  ),
};
