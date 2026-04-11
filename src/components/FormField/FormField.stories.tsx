import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormField } from './FormField';
import { Label } from './Label';
import { space } from '../../tokens/spacing';

/**
 * Components / FormField
 *
 * Structural wrapper that composes Label, helper/error text, and a form
 * control. Also exports Label, HelperText, and ErrorText for standalone use.
 */
const meta: Meta<typeof FormField> = {
  title: 'Components/Layout/Form Field',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'FormField -- Structural wrapper that composes Label, HelperText/ErrorText, and a form control. Generates stable IDs with `React.useId()` and distributes them through `FormFieldContext` so child controls auto-wire `id`, `aria-describedby`, and `aria-invalid`.\n\nAccessibility:\n- Automatically links `<label>` to the control via a generated `htmlFor`/`id` pair\n- Wires `aria-describedby` to helper or error text so assistive technology announces contextual guidance\n- Sets `aria-invalid` on the control when `errorText` is present or `invalid` is explicitly `true`\n- Marks both label and control as `required`/`disabled` through context propagation',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Renders a Label above the control.',
    },
    helperText: {
      control: 'text',
      description: 'Renders HelperText below the control.',
    },
    errorText: {
      control: 'text',
      description: 'Renders ErrorText below the control (replaces helperText when present).',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field and label as required.',
    },
    disabled: {
      control: 'boolean',
      description: 'Marks the field and label as disabled.',
    },
    invalid: {
      control: 'boolean',
      description: 'Marks the field as invalid. Derived from `!!errorText` when not set explicitly.',
    },
  },
  args: {
    label: 'Account Name',
    children: null as unknown as React.ReactNode,
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
type Story = StoryObj<typeof FormField>;

/**
 * Minimal placeholder input that reads FormField context.
 * (The real Input component lives in its own directory.)
 */
const PlaceholderInput: React.FC = () => {
  return (
    <div
      className="ledger-input-wrap"
      style={{
        height: 40,
        borderRadius: 'var(--ledger-radius-sm)',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--ledger-color-surface-default)',
        fontFamily: 'var(--ledger-font-sans)',
        fontSize: 14,
        color: 'var(--ledger-color-text-primary)',
      } as React.CSSProperties}
    >
      <input placeholder="Enter value..." />
    </div>
  );
};

// ---------- Stories ----------

export const Default: Story = {
  args: {
    label: 'Account Name',
    children: <PlaceholderInput />,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Routing Number',
    helperText: 'Nine-digit number found at the bottom of your check.',
    children: <PlaceholderInput />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    errorText: 'Please enter a valid email address.',
    children: <PlaceholderInput />,
  },
};

export const Required: Story = {
  args: {
    label: 'Full Legal Name',
    required: true,
    helperText: 'As it appears on your government-issued ID.',
    children: <PlaceholderInput />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account Number',
    disabled: true,
    helperText: 'Contact support to change your account number.',
    children: <PlaceholderInput />,
  },
};

export const CustomLabel: Story = {
  name: 'Standalone Label',
  parameters: {
    docs: {
      description: {
        story: 'The Label component used standalone, outside of FormField.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[3] }}>
      <Label>Default Label</Label>
      <Label required>Required Label</Label>
      <Label disabled>Disabled Label</Label>
      <Label required disabled>
        Required + Disabled
      </Label>
    </div>
  ),
};
