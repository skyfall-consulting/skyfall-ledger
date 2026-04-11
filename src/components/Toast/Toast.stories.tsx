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
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Auto-dismissing notification popup fixed to the bottom-right. Timer pauses on hover, resumes on leave. Set duration to 0 to disable auto-dismiss.',
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    duration: { control: 'number' },
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
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
