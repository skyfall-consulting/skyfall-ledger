import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Autocomplete } from './Autocomplete';
import type { AutocompleteOption } from './Autocomplete';
import { space } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Shared option sets
// ---------------------------------------------------------------------------
const currencyOptions: AutocompleteOption[] = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'AUD', label: 'AUD - Australian Dollar' },
  { value: 'CNY', label: 'CNY - Chinese Yuan' },
  { value: 'HKD', label: 'HKD - Hong Kong Dollar' },
  { value: 'SGD', label: 'SGD - Singapore Dollar' },
];

const paymentMethodOptions: AutocompleteOption[] = [
  { value: 'ach', label: 'ACH Transfer' },
  { value: 'wire', label: 'Wire Transfer' },
  { value: 'swift', label: 'SWIFT Transfer' },
  { value: 'sepa', label: 'SEPA Transfer' },
  { value: 'check', label: 'Check' },
  { value: 'debit', label: 'Debit Card' },
  { value: 'rtp', label: 'Real-Time Payment' },
];

const accountTypeOptions: AutocompleteOption[] = [
  { value: 'checking', label: 'Checking Account' },
  { value: 'savings', label: 'Savings Account' },
  { value: 'money-market', label: 'Money Market' },
  { value: 'cd', label: 'Certificate of Deposit' },
  { value: 'ira', label: 'Individual Retirement Account' },
  { value: 'brokerage', label: 'Brokerage Account' },
  { value: 'trust', label: 'Trust Account' },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

/**
 * Inputs / Autocomplete
 *
 * Combobox input with a filterable dropdown listbox. Supports keyboard
 * navigation, loading states, and WAI-ARIA combobox semantics. Designed for
 * currency pickers, account selectors, and payee search in financial
 * interfaces.
 */
const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Inputs/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Autocomplete — Combobox input with a filterable dropdown listbox. Built for currency pickers, account selectors, and payee search fields in financial interfaces.\n\n' +
          'Accessibility:\n' +
          '- Implements the full WAI-ARIA combobox pattern with `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, and `aria-autocomplete="list"`\n' +
          '- Dropdown uses `role="listbox"` with individual `role="option"` items and `aria-selected` state\n' +
          '- Full keyboard support: Arrow keys navigate, Enter selects, Escape closes\n' +
          '- Error state sets `aria-invalid="true"` on the input\n' +
          '- Click-outside detection closes the dropdown without losing selection\n' +
          '- Focused option scrolls into view automatically',
      },
    },
  },
  argTypes: {
    options: {
      description: 'Array of selectable options displayed in the dropdown.',
      control: false,
    },
    value: {
      description: 'Currently selected value (controlled mode).',
      control: false,
    },
    onChange: {
      description: 'Callback fired when the user selects an option.',
      action: 'changed',
    },
    onInputChange: {
      description: 'Callback fired when the text input value changes.',
      action: 'inputChanged',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the input is empty.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input and prevents interaction.',
    },
    error: {
      control: 'boolean',
      description: 'Renders an error state with `aria-invalid="true"`.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the height preset of the autocomplete.',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading message in the dropdown instead of options.',
    },
    noResultsText: {
      control: 'text',
      description: 'Text displayed when no options match the current input.',
    },
  },
  args: {
    size: 'md',
    disabled: false,
    error: false,
    loading: false,
    placeholder: 'Search...',
    noResultsText: 'No results found',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, minHeight: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// ---------- Stories ----------

/** Default autocomplete with currency options. */
export const Default: Story = {
  args: {
    options: currencyOptions,
    placeholder: 'Search currency...',
  },
};

/** Pre-selected value showing EUR. */
export const WithPreselected: Story = {
  name: 'With Pre-selected Value',
  render: function PreselectedStory() {
    const [value, setValue] = React.useState('EUR');
    return (
      <Autocomplete
        options={currencyOptions}
        value={value}
        onChange={setValue}
        placeholder="Search currency..."
      />
    );
  },
};

/** Small size for compact toolbars and inline filters. */
export const Small: Story = {
  args: {
    size: 'sm',
    options: paymentMethodOptions,
    placeholder: 'Payment method...',
  },
};

/** Large size for prominent form fields. */
export const Large: Story = {
  args: {
    size: 'lg',
    options: accountTypeOptions,
    placeholder: 'Select account type...',
  },
};

/** Loading state while options are being fetched. */
export const Loading: Story = {
  args: {
    loading: true,
    options: [],
    placeholder: 'Searching payees...',
  },
};

/** Error state signalling a validation issue. */
export const WithError: Story = {
  name: 'With Error',
  args: {
    error: true,
    options: currencyOptions,
    placeholder: 'Required field...',
  },
};

/** Disabled state prevents any interaction. */
export const Disabled: Story = {
  args: {
    disabled: true,
    options: currencyOptions,
    placeholder: 'Locked',
  },
};

/** All three sizes displayed together. */
export const AllSizes: Story = {
  name: 'All Sizes',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      <Autocomplete
        size="sm"
        options={paymentMethodOptions}
        placeholder="Small — payment method"
      />
      <Autocomplete
        size="md"
        options={currencyOptions}
        placeholder="Medium — currency"
      />
      <Autocomplete
        size="lg"
        options={accountTypeOptions}
        placeholder="Large — account type"
      />
    </div>
  ),
};

/** Controlled usage with external state management. */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
        <Autocomplete
          options={currencyOptions}
          value={value}
          onChange={setValue}
          placeholder="Search currency..."
        />
        <div
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '13px',
            color: 'var(--ledger-color-text-muted)',
          }}
        >
          Selected: {value || '(none)'}
        </div>
      </div>
    );
  },
};
