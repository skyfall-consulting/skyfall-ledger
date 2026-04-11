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
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alert -- Dismissible status banner for surfacing contextual feedback such as transaction confirmations, validation errors, and compliance warnings. Supports `info`, `positive`, `negative`, and `warning` tones with a left accent border, optional bold title, custom icon override, and an optional dismiss control.\n\n### Accessibility\n- Renders with `role="alert"`, which implicitly sets `aria-live="assertive"` so content is announced immediately by screen readers.\n- Dismiss button includes `aria-label="Dismiss"` and is keyboard-focusable with visible focus ring.\n- Default tone icons are marked `aria-hidden="true"` to avoid redundant announcements.\n- Use clear, concise copy -- screen readers will announce the full alert text on render.',
      },
    },
  },
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: ['info', 'positive', 'negative', 'warning'],
      description: 'Semantic color tone that controls the accent border, background, and default icon.',
    },
    dismissible: {
      control: 'boolean',
      description: 'When `true`, renders a dismiss button at the trailing edge of the alert.',
    },
    title: {
      control: 'text',
      description: 'Optional bold heading rendered above the body text.',
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Interactive dismiss flow. The alert can be re-shown after dismissal to demonstrate the `onDismiss` callback.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'All four tone variants rendered together for visual comparison.',
      },
    },
  },
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
