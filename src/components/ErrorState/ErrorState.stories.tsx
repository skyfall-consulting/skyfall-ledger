import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ErrorState } from './ErrorState';

/**
 * Feedback / Error State
 *
 * `<ErrorState />` is a placeholder for error states with an optional
 * retry action. Guides users when a recoverable failure occurs.
 */
const meta: Meta<typeof ErrorState> = {
  title: 'Components/Feedback/Error State',
  component: ErrorState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Placeholder for error states with an error icon, title, optional description, and optional retry button.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    retryLabel: { control: 'text' },
  },
  args: {
    title: 'Something went wrong',
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

// ---------- Default ----------

export const Default: Story = {};

// ---------- With retry ----------

export const WithRetry: Story = {
  args: {
    title: 'Failed to load transactions',
    description: 'We could not retrieve your recent transactions. Please try again.',
    onRetry: () => {
      console.log('Retry clicked');
    },
  },
};

// ---------- With description ----------

export const WithDescription: Story = {
  args: {
    title: 'Connection lost',
    description: 'Please check your internet connection and refresh the page.',
  },
};

// ---------- Custom title ----------

export const CustomTitle: Story = {
  args: {
    title: 'Unable to process payment',
    description: 'Your bank declined the transaction. Please verify your payment details or contact your bank.',
    onRetry: () => {
      console.log('Retry clicked');
    },
    retryLabel: 'Retry payment',
  },
};

// ---------- In card ----------

export const InCard: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--ledger-color-surface-raised)',
        boxShadow: 'var(--ledger-shadow-2)',
        borderRadius: 'var(--ledger-radius-md)',
        maxWidth: 480,
      }}
    >
      <ErrorState
        title="Failed to load chart"
        description="There was an error rendering your portfolio performance data."
        onRetry={() => {
          console.log('Retry clicked');
        }}
      />
    </div>
  ),
};
