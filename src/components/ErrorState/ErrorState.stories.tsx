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
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'ErrorState -- Centered placeholder for recoverable failure states such as failed API calls, network errors, and declined transactions. Displays an error icon, heading, optional description, and an optional retry button.\n\n### Accessibility\n- Uses an `<h3>` heading for semantic hierarchy; ensure the surrounding page context uses appropriate heading levels.\n- Default error icon is `aria-hidden="true"` to prevent redundant announcements.\n- Retry button has a visible focus ring (`ledger-focus-ring`) for keyboard navigation.\n- Pair with a descriptive `title` and `description` so users understand both *what* failed and *how* to recover.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Error heading displayed below the icon. Defaults to "Something went wrong".',
    },
    description: {
      control: 'text',
      description: 'Optional supporting text that explains the error or suggests next steps.',
    },
    retryLabel: {
      control: 'text',
      description: 'Label for the retry button. Defaults to "Try again". Only shown when `onRetry` is provided.',
    },
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
  parameters: {
    docs: {
      description: {
        story: 'ErrorState rendered inside a raised card container, showing how it integrates within dashboard widgets when data fails to load.',
      },
    },
  },
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
