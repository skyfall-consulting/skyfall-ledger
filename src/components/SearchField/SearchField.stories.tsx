import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SearchField } from './SearchField';
import { FormField } from '../FormField';
import { space } from '../../tokens/spacing';

/**
 * Inputs / SearchField
 *
 * Search-specialized input with a magnifying glass icon and an optional
 * clear button. Ideal for filtering tables, searching transactions,
 * and finding accounts in FinTech dashboards.
 */
const meta: Meta<typeof SearchField> = {
  title: 'Components/Inputs/SearchField',
  component: SearchField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Search input with magnifying glass icon, clear button, three sizes, and FormField context integration.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
  },
  args: {
    size: 'md',
    invalid: false,
    disabled: false,
    showClearButton: true,
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
type Story = StoryObj<typeof SearchField>;

// ---------- Stories ----------

/** Default search field with placeholder. */
export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

/** Search transactions — a common FinTech use case. */
export const SearchTransactions: Story = {
  args: {
    placeholder: 'Search transactions...',
  },
};

/** Find accounts by name or number. */
export const FindAccounts: Story = {
  args: {
    placeholder: 'Find accounts...',
  },
};

/** Filter payments list. */
export const FilterPayments: Story = {
  args: {
    placeholder: 'Filter payments...',
  },
};

/** Small size for compact toolbars. */
export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Quick search...',
  },
};

/** Large size for prominent search areas. */
export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Search all records...',
  },
};

/** Invalid state signals a search error. */
export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: '???',
    placeholder: 'Search...',
  },
};

/** Disabled state. */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search unavailable',
  },
};

/** Controlled with clear button. */
export const Controlled: Story = {
  name: 'Controlled with Clear',
  render: function ControlledStory() {
    const [value, setValue] = React.useState('ACH-20240312');
    return (
      <SearchField
        placeholder="Search transactions..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
};

/** Uncontrolled with default value. */
export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'Wire transfer',
    placeholder: 'Search...',
  },
};

/** All three sizes side by side. */
export const AllSizes: Story = {
  name: 'All Sizes',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      <SearchField size="sm" placeholder="Small — quick filter" />
      <SearchField size="md" placeholder="Medium — default" />
      <SearchField size="lg" placeholder="Large — prominent search" />
    </div>
  ),
};

/** Composed with FormField for label and helper text. */
export const WithFormField: Story = {
  name: 'Composed with FormField',
  parameters: {
    docs: {
      description: {
        story:
          'SearchField auto-wires IDs and aria attributes from FormField context.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <FormField label="Transaction Search" helperText="Search by reference, amount, or payee.">
        <SearchField placeholder="e.g. ACH-2024-03" />
      </FormField>
      <FormField label="Account Lookup" errorText="No matching accounts found.">
        <SearchField defaultValue="ACCT-9999" />
      </FormField>
    </div>
  ),
};
