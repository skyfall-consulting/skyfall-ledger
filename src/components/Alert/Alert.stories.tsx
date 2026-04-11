import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Alert } from './Alert';

/**
 * Feedback / Alert
 *
 * `<Alert />` is a dismissible status banner for surfacing contextual
 * feedback. Supports info, positive, negative, and warning tones.
 */
const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Dismissible status banner with info, positive, negative, and warning tones. Supports optional title, custom icon, and dismiss control.',
      },
    },
  },
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: ['info', 'positive', 'negative', 'warning'],
    },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    tone: 'info',
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// ---------- Info (default) ----------

export const Info: Story = {
  args: {
    children: 'Your account verification is in progress. This typically takes 1-2 business days.',
  },
};

// ---------- Positive ----------

export const Positive: Story = {
  args: {
    tone: 'positive',
    children: 'Payment of $2,450.00 was successfully processed.',
  },
};

// ---------- Negative ----------

export const Negative: Story = {
  args: {
    tone: 'negative',
    children: 'Transaction failed. Please check your payment method and try again.',
  },
};

// ---------- Warning ----------

export const Warning: Story = {
  args: {
    tone: 'warning',
    children: 'Your account balance is below the minimum threshold.',
  },
};

// ---------- With title ----------

export const WithTitle: Story = {
  args: {
    tone: 'info',
    title: 'Scheduled maintenance',
    children: 'Services will be temporarily unavailable on Saturday, March 15 from 2:00 AM to 4:00 AM EST.',
  },
};

// ---------- Dismissible ----------

export const Dismissible: Story = {
  render: function DismissibleStory() {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <button
          type="button"
          onClick={() => setVisible(true)}
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 'var(--ledger-font-size-body-md)',
            color: 'var(--ledger-color-text-primary)',
            background: 'transparent',
            border: '1px solid var(--ledger-color-border-default)',
            borderRadius: 'var(--ledger-radius-sm)',
            padding: 'var(--ledger-space-3) var(--ledger-space-5)',
            cursor: 'pointer',
          }}
        >
          Show alert again
        </button>
      );
    }

    return (
      <Alert
        tone="positive"
        title="Transfer complete"
        dismissible
        onDismiss={() => setVisible(false)}
      >
        $5,000.00 has been transferred to your savings account.
      </Alert>
    );
  },
};

// ---------- Custom icon ----------

export const CustomIcon: Story = {
  args: {
    tone: 'info',
    title: 'New feature available',
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={1.5} />
        <path d="M10 6V10.5L13 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    children: 'Recurring payments are now available. Set up automatic transfers from your dashboard.',
  },
};

// ---------- All tones ----------

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-5)' }}>
      <Alert tone="info" title="Information">
        Your account verification is in progress.
      </Alert>
      <Alert tone="positive" title="Success">
        Payment of $2,450.00 was successfully processed.
      </Alert>
      <Alert tone="negative" title="Error">
        Transaction failed. Please check your payment method.
      </Alert>
      <Alert tone="warning" title="Warning">
        Your account balance is below the minimum threshold.
      </Alert>
    </div>
  ),
};
