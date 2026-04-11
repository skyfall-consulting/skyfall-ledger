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
  title: 'Components/Inputs/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'RadioGroup + Radio -- a single-selection control for choosing one option from a set. Supports vertical and horizontal layouts, controlled and uncontrolled modes, and FormField context integration.\n\nAccessibility:\n- RadioGroup renders with `role="radiogroup"` for proper grouping semantics.\n- Each Radio uses a native `<input type="radio">` (visually hidden via `.ledger-sr-input`), providing built-in keyboard navigation (arrow keys cycle within the group).\n- Focus-visible tracking applies the focus ring only on keyboard navigation, not on pointer clicks.\n- Shares a `name` attribute across all radios in the group for correct form serialization.\n- Wraps each radio in a `<label>` element for an enlarged click target.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout axis of the radio items.',
    },
    disabled: { control: 'boolean', description: 'Disables all radios in the group.' },
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
  parameters: {
    docs: {
      description: {
        story: 'A group with a pre-selected default value, typical for transfer-method selection flows.',
      },
    },
  },
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
