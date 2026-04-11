import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Select } from './Select';
import { FormField } from '../FormField';
import { space } from '../../tokens/spacing';

/**
 * Components / Select
 *
 * Native dropdown select primitive. Renders inside `.ledger-input-wrap` with
 * a custom chevron icon. Reads FormField context to auto-wire IDs and
 * accessibility attributes.
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Select — Native dropdown select primitive with a custom chevron icon. Built for account-type pickers, currency selectors, and payment-method dropdowns in financial interfaces.\n\n' +
          'Accessibility:\n' +
          '- Renders a native `<select>` element, inheriting full browser keyboard and screen-reader support\n' +
          '- Supports `aria-invalid` and `aria-describedby` auto-wired from FormField context\n' +
          '- Chevron icon is marked `aria-hidden="true"` to avoid redundant announcements\n' +
          '- Disabled state sets `cursor: not-allowed` and propagates to the native element\n' +
          '- Forwards ref to the underlying `<select>` for imperative access',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the height preset of the select.',
    },
    invalid: {
      control: 'boolean',
      description: 'Renders a red border and focus ring to signal a validation error.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select and prevents interaction.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the select to fill its parent container width.',
    },
  },
  args: {
    size: 'md',
    invalid: false,
    disabled: false,
    fullWidth: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

// ---------- Stories ----------

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="">Select an option</option>
        <option value="checking">Checking</option>
        <option value="savings">Savings</option>
        <option value="investment">Investment</option>
      </>
    ),
  },
};

export const AccountType: Story = {
  name: 'Account Type',
  args: {
    children: (
      <>
        <option value="">Choose account type</option>
        <option value="checking">Checking Account</option>
        <option value="savings">Savings Account</option>
        <option value="money-market">Money Market</option>
        <option value="cd">Certificate of Deposit</option>
        <option value="ira">IRA</option>
      </>
    ),
  },
};

export const Currency: Story = {
  args: {
    children: (
      <>
        <option value="">Select currency</option>
        <option value="USD">USD - US Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - British Pound</option>
        <option value="JPY">JPY - Japanese Yen</option>
        <option value="CHF">CHF - Swiss Franc</option>
      </>
    ),
  },
};

export const PaymentMethod: Story = {
  name: 'Payment Method',
  args: {
    children: (
      <>
        <option value="">Select payment method</option>
        <option value="ach">ACH Transfer</option>
        <option value="wire">Wire Transfer</option>
        <option value="check">Check</option>
        <option value="card">Debit Card</option>
      </>
    ),
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    children: (
      <>
        <option value="">Select account</option>
        <option value="checking">Checking</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <option value="locked">Locked Account</option>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <>
        <option value="">Small select</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: (
      <>
        <option value="">Large select</option>
        <option value="personal">Personal</option>
        <option value="business">Business</option>
        <option value="trust">Trust</option>
      </>
    ),
  },
};

export const FullWidth: Story = {
  name: 'Full Width',
  args: {
    fullWidth: true,
    children: (
      <>
        <option value="">Full width select</option>
        <option value="q1">Q1 2026</option>
        <option value="q2">Q2 2026</option>
        <option value="q3">Q3 2026</option>
        <option value="q4">Q4 2026</option>
      </>
    ),
  },
};

export const WithFormField: Story = {
  name: 'Composed with FormField',
  parameters: {
    docs: {
      description: {
        story: 'Select auto-wires IDs and aria attributes from FormField context.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <FormField label="Account Type" helperText="Choose the type of account to open." required>
        <Select>
          <option value="">Select type</option>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
          <option value="investment">Investment</option>
        </Select>
      </FormField>
      <FormField label="Currency" errorText="Currency is required.">
        <Select>
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </Select>
      </FormField>
      <FormField label="Settlement Period" disabled>
        <Select>
          <option value="t1">T+1</option>
        </Select>
      </FormField>
    </div>
  ),
};
