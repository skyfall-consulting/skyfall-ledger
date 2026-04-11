import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/Inputs/OTP Input',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'OTPInput — one-time passcode input with individual digit boxes that auto-advance. Essential for two-factor authentication and transaction verification flows.\n\nAccessibility:\n- Each digit input has a positional `aria-label` (e.g., "Digit 1 of 6")\n- Keyboard navigation: Backspace moves to previous, ArrowLeft/Right between inputs\n- Paste support fills all boxes at once\n- `aria-invalid` signals error state\n- `inputMode="numeric"` for mobile keyboards\n- `autoComplete="one-time-code"` for autofill support',
      },
    },
  },
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 }, description: 'Number of digit boxes.' },
    error: { control: 'boolean', description: 'Applies error border styling to all inputs.' },
    disabled: { control: 'boolean', description: 'Disables all inputs.' },
    autoFocus: { control: 'boolean', description: 'Auto-focus the first input on mount.' },
  },
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  render: function DefaultOTP() {
    const [val, setVal] = React.useState('');
    return <OTPInput value={val} onChange={setVal} autoFocus />;
  },
};

export const FourDigit: Story = {
  render: function FourDigitOTP() {
    const [val, setVal] = React.useState('');
    return <OTPInput value={val} onChange={setVal} length={4} />;
  },
};

export const WithError: Story = {
  render: function ErrorOTP() {
    const [val, setVal] = React.useState('123456');
    return <OTPInput value={val} onChange={setVal} error />;
  },
};

export const Disabled: Story = {
  args: { value: '482901', disabled: true },
};
