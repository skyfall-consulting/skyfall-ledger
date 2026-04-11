import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Inputs/Checkbox Group',
  component: CheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CheckboxGroup — grouped checkboxes with semantic fieldset/legend for multi-select form patterns.\n\nAccessibility:\n- Uses `<fieldset>` and `<legend>` for semantic grouping\n- Error messages use `role="alert"` for immediate announcements\n- Each checkbox is individually focusable\n- Supports vertical and horizontal layouts',
      },
    },
  },
  argTypes: {
    orientation: { control: { type: 'select' }, options: ['vertical', 'horizontal'], description: 'Layout direction.' },
    disabled: { control: 'boolean', description: 'Disables all checkboxes in the group.' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: function DefaultGroup() {
    const [val, setVal] = React.useState<string[]>(['wire']);
    return (
      <CheckboxGroup
        label="Payment Methods"
        name="payment"
        value={val}
        onChange={setVal}
        options={[
          { value: 'wire', label: 'Wire Transfer' },
          { value: 'ach', label: 'ACH' },
          { value: 'check', label: 'Check' },
          { value: 'crypto', label: 'Cryptocurrency', disabled: true },
        ]}
      />
    );
  },
};

export const Horizontal: Story = {
  render: function HorizontalGroup() {
    const [val, setVal] = React.useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Account Types"
        name="accounts"
        value={val}
        onChange={setVal}
        orientation="horizontal"
        options={[
          { value: 'checking', label: 'Checking' },
          { value: 'savings', label: 'Savings' },
          { value: 'money-market', label: 'Money Market' },
        ]}
      />
    );
  },
};

export const WithError: Story = {
  render: function ErrorGroup() {
    const [val, setVal] = React.useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Required Documents"
        name="docs"
        value={val}
        onChange={setVal}
        error="At least one document type must be selected"
        options={[
          { value: 'id', label: 'Government ID' },
          { value: 'address', label: 'Proof of Address' },
          { value: 'income', label: 'Proof of Income' },
        ]}
      />
    );
  },
};
