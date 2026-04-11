import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { MultiSelect } from './MultiSelect';
import type { MultiSelectOption } from './MultiSelect';

// ---------------------------------------------------------------------------
// Option sets (FinTech domain)
// ---------------------------------------------------------------------------

const accountTypeOptions: MultiSelectOption[] = [
  { value: 'checking', label: 'Checking Account' },
  { value: 'savings', label: 'Savings Account' },
  { value: 'money-market', label: 'Money Market' },
  { value: 'cd', label: 'Certificate of Deposit' },
  { value: 'ira', label: 'IRA' },
  { value: 'brokerage', label: 'Brokerage' },
];

const currencyOptions: MultiSelectOption[] = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'AUD', label: 'AUD - Australian Dollar' },
  { value: 'SGD', label: 'SGD - Singapore Dollar' },
];

const paymentMethodOptions: MultiSelectOption[] = [
  { value: 'ach', label: 'ACH Transfer' },
  { value: 'wire', label: 'Wire Transfer' },
  { value: 'check', label: 'Check' },
  { value: 'debit', label: 'Debit Card' },
  { value: 'credit', label: 'Credit Card' },
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'paypal', label: 'PayPal' },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Inputs/Multi Select',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'MultiSelect — multi-value select with removable tag chips and a dropdown checkbox list. ' +
          'Built for financial interfaces: account-type filters, currency multi-pickers, and payment-method selectors.\n\n' +
          'Accessibility:\n' +
          '- Full WAI-ARIA combobox pattern: `role="combobox"` on the control, `role="listbox"` with `aria-multiselectable="true"` on the dropdown\n' +
          '- Each dropdown option has `role="option"` with `aria-selected` reflecting checked state\n' +
          '- Tag remove buttons include `aria-label="Remove {label}"` for screen readers\n' +
          '- Arrow key navigation cycles through options; Enter/Space toggles selection\n' +
          '- Escape closes the dropdown; Backspace removes the last selected tag\n' +
          '- Home/End keys jump to the first and last option\n' +
          '- `aria-activedescendant` tracks the currently focused option\n' +
          '- Click-outside dismisses the dropdown',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the height preset and tag sizing.',
    },
    error: {
      control: 'boolean',
      description: 'Renders a red border to signal a validation error.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the control and prevents interaction.',
    },
    maxDisplayedTags: {
      control: 'number',
      description: 'Maximum tag chips to show before collapsing into a "+N more" badge.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when no values are selected.',
    },
  },
  args: {
    size: 'md',
    error: false,
    disabled: false,
    placeholder: 'Select...',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, minHeight: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: function DefaultStory() {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <MultiSelect
        options={accountTypeOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Select account types..."
      />
    );
  },
};

export const WithPreselected: Story = {
  name: 'With Preselected',
  render: function PreselectedStory() {
    const [selected, setSelected] = React.useState<string[]>([
      'USD',
      'EUR',
      'GBP',
    ]);
    return (
      <MultiSelect
        options={currencyOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Select currencies..."
      />
    );
  },
};

export const MaxDisplayedTags: Story = {
  name: 'Max Displayed Tags',
  render: function MaxTagsStory() {
    const [selected, setSelected] = React.useState<string[]>([
      'ach',
      'wire',
      'check',
      'debit',
      'credit',
    ]);
    return (
      <MultiSelect
        options={paymentMethodOptions}
        value={selected}
        onChange={setSelected}
        maxDisplayedTags={2}
        placeholder="Select payment methods..."
      />
    );
  },
};

export const Small: Story = {
  render: function SmallStory() {
    const [selected, setSelected] = React.useState<string[]>(['checking']);
    return (
      <MultiSelect
        options={accountTypeOptions}
        value={selected}
        onChange={setSelected}
        size="sm"
        placeholder="Select accounts..."
      />
    );
  },
};

export const Large: Story = {
  render: function LargeStory() {
    const [selected, setSelected] = React.useState<string[]>(['USD', 'EUR']);
    return (
      <MultiSelect
        options={currencyOptions}
        value={selected}
        onChange={setSelected}
        size="lg"
        placeholder="Select currencies..."
      />
    );
  },
};

export const WithError: Story = {
  name: 'With Error',
  render: function ErrorStory() {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <MultiSelect
        options={paymentMethodOptions}
        value={selected}
        onChange={setSelected}
        error
        placeholder="Select at least one method..."
      />
    );
  },
};

export const Disabled: Story = {
  render: function DisabledStory() {
    return (
      <MultiSelect
        options={accountTypeOptions}
        value={['checking', 'savings']}
        disabled
        placeholder="Locked..."
      />
    );
  },
};
