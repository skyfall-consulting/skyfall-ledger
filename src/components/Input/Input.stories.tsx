import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Input } from './Input';
import { FormField } from '../FormField';
import { space } from '../../tokens/spacing';

/**
 * Components / Input
 *
 * The base text input primitive. Renders inside `.ledger-input-wrap` with
 * optional left/right slots for icons or prefix text. Reads FormField
 * context to auto-wire IDs and accessibility attributes.
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Base text input with three sizes, left/right slots, and automatic FormField context integration.',
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
  },
  args: {
    size: 'md',
    invalid: false,
    disabled: false,
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
type Story = StoryObj<typeof Input>;

// ---------- Icons ----------

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 5l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// ---------- Stories ----------

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: 'Search transactions...',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftSlot: <SearchIcon />,
    placeholder: 'Search...',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightSlot: <MailIcon />,
    placeholder: 'Email address',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: 'bad@',
    placeholder: 'Email',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Read-only value',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

export const WithFormField: Story = {
  name: 'Composed with FormField',
  parameters: {
    docs: {
      description: {
        story: 'Input auto-wires IDs and aria attributes from FormField context.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <FormField label="Account Name" helperText="As it appears on your statement." required>
        <Input placeholder="e.g. Checking" />
      </FormField>
      <FormField label="Routing Number" errorText="Routing number must be 9 digits.">
        <Input defaultValue="1234" />
      </FormField>
      <FormField label="Reference Code" disabled>
        <Input defaultValue="TXN-0042" />
      </FormField>
    </div>
  ),
};
