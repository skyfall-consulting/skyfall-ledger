import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Textarea } from './Textarea';
import { FormField } from '../FormField';
import { space } from '../../tokens/spacing';

/**
 * Components / Textarea
 *
 * Multi-line text input primitive. Renders inside `.ledger-input-wrap` for
 * interactive border/focus transitions handled by primitives.css.
 * Reads FormField context to auto-wire IDs and accessibility attributes.
 */
const meta: Meta<typeof Textarea> = {
  title: 'Components/Inputs/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Multi-line text input with three sizes, configurable resize, and automatic FormField context integration.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    resize: 'vertical',
    rows: 3,
    invalid: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ---------- Stories ----------

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const TransactionNotes: Story = {
  name: 'Transaction Notes',
  args: {
    placeholder: 'Add notes for this transaction (e.g. invoice number, purpose)...',
    rows: 4,
  },
};

export const PaymentDescription: Story = {
  name: 'Payment Description',
  args: {
    placeholder: 'Describe the purpose of this payment...',
    rows: 3,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: 'Description exceeds 500 characters...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Wire transfer - Q4 settlement adjustment for account #4821.',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Quick note...',
    rows: 2,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Detailed description...',
    rows: 5,
  },
};

export const NoResize: Story = {
  name: 'No Resize',
  args: {
    resize: 'none',
    placeholder: 'Fixed-size textarea',
    rows: 3,
  },
};

export const ResizeBoth: Story = {
  name: 'Resize Both',
  args: {
    resize: 'both',
    placeholder: 'Resizable in both directions',
    rows: 4,
  },
};

export const WithFormField: Story = {
  name: 'Composed with FormField',
  parameters: {
    docs: {
      description: {
        story: 'Textarea auto-wires IDs and aria attributes from FormField context.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <FormField
        label="Transaction Notes"
        helperText="Optional memo attached to this transaction."
      >
        <Textarea placeholder="e.g. Office supplies for Q1" rows={3} />
      </FormField>
      <FormField
        label="Payment Description"
        errorText="Description is required for wire transfers over $10,000."
      >
        <Textarea rows={4} />
      </FormField>
      <FormField label="Internal Memo" disabled>
        <Textarea defaultValue="Settlement processed per SOX compliance review." rows={2} />
      </FormField>
    </div>
  ),
};
