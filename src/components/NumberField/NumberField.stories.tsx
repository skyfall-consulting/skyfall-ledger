import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { NumberField } from './NumberField';
import { space } from '../../tokens/spacing';

/**
 * Components / NumberField
 *
 * Specialized text field for numeric and currency input. Uses tabular
 * numerals and `inputMode="decimal"` for clean numeric entry without
 * browser spinner artifacts.
 */
const meta: Meta<typeof NumberField> = {
  title: 'Components/Inputs/Number Field',
  component: NumberField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'NumberField -- a specialized text field for numeric and currency input. Uses `inputMode="decimal"` instead of `type="number"` to avoid browser spinner UX issues while retaining a numeric soft keyboard on mobile devices. Applies tabular numerals (`tnum`, `lnum`) for column-aligned figures in financial tables.\n\nAccessibility:\n- Composes FormField and Input internally, inheriting full label, helper text, and error message wiring via `aria-describedby`.\n- Sets `aria-invalid` automatically when `errorText` is present.\n- Prefix and suffix slots (e.g. "$", "USD") are rendered as inert text with `user-select: none`, keeping the accessible value clean.\n- Supports `min`, `max`, and `step` attributes for assistive technology hints.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Control height preset.',
    },
    required: { control: 'boolean', description: 'Marks the field as required.' },
    disabled: { control: 'boolean', description: 'Prevents interaction and dims the field.' },
    label: { control: 'text', description: 'Renders a label above the input.' },
    helperText: { control: 'text', description: 'Descriptive text below the input.' },
    errorText: { control: 'text', description: 'Error message that replaces helper text when present.' },
    prefix: { control: 'text', description: 'Text in the left slot (e.g. "$").' },
    suffix: { control: 'text', description: 'Text in the right slot (e.g. "USD").' },
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
type Story = StoryObj<typeof NumberField>;

// ---------- Stories ----------

export const Default: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Transfer Amount',
    prefix: '$',
    placeholder: '0.00',
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Balance',
    suffix: 'USD',
    placeholder: '0.00',
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Payment',
    prefix: '$',
    suffix: 'USD',
    placeholder: '0.00',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Monthly Payment',
    helperText: 'Enter the amount you wish to pay each month.',
    prefix: '$',
    placeholder: '0.00',
  },
};

export const WithError: Story = {
  args: {
    label: 'Withdrawal',
    prefix: '$',
    errorText: 'Amount exceeds available balance.',
    defaultValue: '15000.00',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Locked Amount',
    prefix: '$',
    disabled: true,
    value: '5000.00',
    helperText: 'This amount is locked for the current period.',
  },
};

export const MinMax: Story = {
  name: 'Min / Max',
  args: {
    label: 'Contribution',
    prefix: '$',
    min: 25,
    max: 10000,
    step: 25,
    placeholder: '25.00',
    helperText: 'Min $25 — Max $10,000.',
  },
};

export const Controlled: Story = {
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a controlled NumberField with live value display.',
      },
    },
  },
  render: function ControlledStory() {
    const [value, setValue] = React.useState<number | undefined>(250);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
        <NumberField
          label="Transfer Amount"
          prefix="$"
          suffix="USD"
          value={value ?? ''}
          onChange={(v) => setValue(v)}
          placeholder="0.00"
        />
        <div
          style={{
            fontFamily: 'var(--ledger-font-mono)',
            fontSize: 12,
            color: 'var(--ledger-color-text-muted)',
          } as React.CSSProperties}
        >
          Parsed value: {value === undefined ? 'undefined' : value}
        </div>
      </div>
    );
  },
};
