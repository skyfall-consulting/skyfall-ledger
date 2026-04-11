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
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Connects a label, helper/error text, and form control via auto-generated IDs and React context. Controls inside read context to auto-wire accessibility attributes.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
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
