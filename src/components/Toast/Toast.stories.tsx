import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Toast } from './Toast';

/**
 * Feedback / Toast
 *
 * `<Toast />` is an auto-dismissing notification popup anchored to the
 * bottom-right of the viewport. Supports success, error, warning, and
 * info statuses with hover-pause behaviour.
 */
const meta: Meta<typeof Toast> = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Toast -- Auto-dismissing notification popup for transient feedback such as payment confirmations, transfer failures, and balance warnings. Fixed to the bottom-right of the viewport with a slide-in animation. Timer pauses on hover and resumes on mouse leave.\n\n### Accessibility\n- Uses `role="alert"` for `error` and `warning` statuses (assertive, immediate announcement) and `role="status"` for `success` and `info` (polite announcement).\n- Dismiss button includes `aria-label="Dismiss notification"` and is keyboard-focusable with a visible focus ring.\n- Status icons are `aria-hidden="true"` to prevent redundant screen-reader output.\n- Auto-dismiss defaults to 5 000 ms; set `duration` to `0` for persistent toasts that require manual dismissal.',
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Visual status variant controlling the background, border color, and icon.',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss delay in milliseconds. Set to `0` to disable auto-dismiss.',
    },
    open: {
      control: 'boolean',
      description: 'Controls visibility of the toast.',
    },
    title: {
      control: 'text',
      description: 'Bold heading rendered at the top of the toast.',
    },
    description: {
      control: 'text',
      description: 'Optional body text rendered below the title.',
    },
  },
  args: {
    status: 'success',
    open: true,
    duration: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ---------- Success ----------

export const PaymentSent: Story = {
  args: {
    status: 'success',
    title: 'Payment sent',
    description: '$2,450.00 was successfully transferred to Acme Corp.',
  },
};

// ---------- Error ----------

export const TransferFailed: Story = {
  args: {
    status: 'error',
    title: 'Transfer failed',
    description: 'Insufficient funds. Please top up your account and try again.',
  },
};

// ---------- Warning ----------

export const LowBalance: Story = {
  args: {
    status: 'warning',
    title: 'Low balance warning',
    description: 'Your checking account balance is below the $500 threshold.',
  },
};

// ---------- Info ----------

export const AccountVerified: Story = {
  args: {
    status: 'info',
    title: 'Account verified',
    description: 'Your identity verification has been approved.',
  },
};

// ---------- Title only ----------

export const TitleOnly: Story = {
  args: {
    status: 'success',
    title: 'Invoice #1042 marked as paid',
  },
};

// ---------- Auto-dismiss ----------

export const AutoDismiss: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the 5-second auto-dismiss timer. Hover over the toast to pause the countdown; move away to resume.',
      },
    },
  },
  render: function AutoDismissStory() {
    const [open, setOpen] = React.useState(true);

    if (!open) {
      return (
        <div style={{ padding: 24 }}>
          <button
            type="button"
            onClick={() => setOpen(true)}
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
            Show toast again
          </button>
        </div>
      );
    }

    return (
      <Toast
        status="success"
        title="Payment sent"
        description="$1,200.00 transferred to savings. This toast auto-dismisses in 5 seconds."
        open={open}
        duration={5000}
        onClose={() => setOpen(false)}
      />
    );
  },
};

// ---------- All statuses ----------

export const AllStatuses: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All four status variants stacked vertically to compare color, icon, and layout.',
      },
    },
  },
  render: () => (
    <div style={{ position: 'relative', height: 500 }}>
      {(['success', 'error', 'warning', 'info'] as const).map((status, i) => (
        <div
          key={status}
          style={{
            position: 'absolute',
            bottom: 24 + i * 100,
            right: 24,
          }}
        >
          <Toast
            status={status}
            title={`${status.charAt(0).toUpperCase() + status.slice(1)} toast`}
            description={`This is a ${status} notification example.`}
            open
            duration={0}
            onClose={() => {}}
            style={{ position: 'static' }}
          />
        </div>
      ))}
    </div>
  ),
};
