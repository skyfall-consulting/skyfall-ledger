import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Stepper — multi-step progress indicator for sequential workflows like account onboarding, payment flows, and compliance processes.\n\nAccessibility:\n- Uses `role="navigation"` with `aria-label="Progress"`\n- Active step marked with `aria-current="step"`\n- Completed and current steps announced via screen-reader-only text\n- Steps are clickable buttons when `onStepClick` is provided',
      },
    },
  },
  argTypes: {
    activeStep: { control: { type: 'number', min: 0, max: 4 }, description: 'Index of the currently active step (0-based).' },
    orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'], description: 'Layout direction.' },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const AccountOnboarding: Story = {
  args: {
    activeStep: 1,
    steps: [
      { label: 'Identity', description: 'KYC verification' },
      { label: 'Business', description: 'Company details' },
      { label: 'Banking', description: 'Link accounts' },
      { label: 'Review', description: 'Final confirmation' },
    ],
  },
};

export const Vertical: Story = {
  args: {
    activeStep: 2,
    orientation: 'vertical',
    steps: [
      { label: 'Initiate transfer' },
      { label: 'Verify recipient' },
      { label: 'Authorize payment' },
      { label: 'Confirmation' },
    ],
  },
};

export const Completed: Story = {
  args: {
    activeStep: 4,
    steps: [
      { label: 'Application' },
      { label: 'Verification' },
      { label: 'Approval' },
      { label: 'Activation' },
    ],
  },
};
