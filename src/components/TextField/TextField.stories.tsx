import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TextField } from './TextField';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

/**
 * Components / TextField
 *
 * Composed convenience component combining FormField + Input. Supports label,
 * helper/error text, sizes, slots, and all standard HTML input attributes.
 */
const meta: Meta<typeof TextField> = {
  title: 'Components/Inputs/Text Field',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'TextField — Fully-assembled labeled text field that composes FormField + Input into a single drop-in component. Ideal for account-opening forms, payment details, and KYC data entry.\n\n' +
          'Accessibility:\n' +
          '- Auto-generates matching `id`, `htmlFor`, and `aria-describedby` via FormField context\n' +
          '- Error text replaces helper text and sets `aria-invalid` on the underlying input\n' +
          '- Required fields render an asterisk in the label and set the native `required` attribute\n' +
          '- Supports `leftSlot` and `rightSlot` for icons marked `aria-hidden` in consuming code\n' +
          '- Forwards ref to the underlying `<input>` element for imperative focus management',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the height preset of the input.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required with an asterisk and native attribute.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input and dims the entire field.',
    },
    label: {
      control: 'text',
      description: 'Renders a Label element above the input.',
    },
    helperText: {
      control: 'text',
      description: 'Descriptive text rendered below the input.',
    },
    errorText: {
      control: 'text',
      description: 'Error message that replaces helper text and triggers the invalid state.',
    },
  },
  args: {
    size: 'md',
    required: false,
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
type Story = StoryObj<typeof TextField>;

// ---------- Icons ----------

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="3.5" y="7" width="9" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ---------- Stories ----------

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Jane Doe',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Routing Number',
    helperText: 'Nine-digit number at the bottom of your check.',
    placeholder: '021000021',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    errorText: 'Please enter a valid email address.',
    defaultValue: 'invalid@',
  },
};

export const Required: Story = {
  args: {
    label: 'Account Holder',
    required: true,
    placeholder: 'Full legal name',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account Number',
    disabled: true,
    defaultValue: '****-****-1234',
    helperText: 'Contact support to update.',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <TextField
        label="Search"
        placeholder="Search transactions..."
        leftSlot={<SearchIcon />}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Enter password"
        rightSlot={<LockIcon />}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <TextField label="Small" size="sm" placeholder="sm (32px)" />
      <TextField label="Medium" size="md" placeholder="md (40px)" />
      <TextField label="Large" size="lg" placeholder="lg (48px)" />
    </div>
  ),
};

export const Form: Story = {
  name: 'Form Composition',
  parameters: {
    docs: {
      description: {
        story: 'Multiple TextFields composed into a typical form layout.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: space[5],
        padding: space[6],
        borderRadius: radius.md,
        border: '1px solid var(--ledger-color-border-subtle)',
        background: 'var(--ledger-color-surface-raised)',
      } as React.CSSProperties}
    >
      <TextField
        label="Account Name"
        required
        placeholder="e.g. Primary Checking"
        helperText="A friendly name for this account."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: space[4] }}>
        <TextField label="First Name" required placeholder="Jane" />
        <TextField label="Last Name" required placeholder="Doe" />
      </div>
      <TextField
        label="Email"
        type="email"
        required
        placeholder="jane@example.com"
      />
      <TextField
        label="Routing Number"
        placeholder="021000021"
        helperText="Nine-digit ABA routing number."
      />
    </div>
  ),
};
