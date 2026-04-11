import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Dialog } from './Dialog';
import { Button } from '../Button';
import { space } from '../../tokens/spacing';

/**
 * Feedback / Dialog
 *
 * Confirmation-pattern dialog for binary decisions (confirm/cancel).
 * Supports default and danger variants, a loading state on the confirm
 * button, and leverages the native <dialog> element for accessibility.
 */
const meta: Meta<typeof Dialog> = {
  title: 'Components/Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dialog -- Confirmation-pattern modal for binary decisions such as payment confirmations, account deletions, and transfer cancellations. Built on the native `<dialog>` element with `default` and `danger` variants.\n\n### Accessibility\n- Native `<dialog>` with `showModal()` provides built-in focus trapping and `Escape` key dismissal.\n- `aria-labelledby` links to the dialog title; `aria-describedby` links to the description.\n- Focus moves to the Cancel button on open as the safe default action.\n- Backdrop click triggers the cancel callback.\n- Body scroll is locked while the dialog is open to prevent background interaction.\n- For irreversible financial actions, use the `danger` variant with explicit, specific copy.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the dialog is visible. Syncs with the native `<dialog>` open state.',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'danger'],
      description: 'Visual variant. Use `danger` for irreversible or destructive actions.',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner on the confirm button and disables both actions to prevent duplicate submissions.',
    },
    title: {
      control: 'text',
      description: 'Dialog heading linked via `aria-labelledby`.',
    },
    description: {
      control: 'text',
      description: 'Body text or rich content linked via `aria-describedby`.',
    },
    confirmLabel: {
      control: 'text',
      description: 'Label for the primary confirm action button.',
    },
    cancelLabel: {
      control: 'text',
      description: 'Label for the secondary cancel action button.',
    },
  },
  args: {
    open: false,
    variant: 'default',
    loading: false,
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wrapper that adds a trigger button and manages open state. */
const DialogDemo: React.FC<{
  variant?: 'default' | 'danger';
  title: string;
  description: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  triggerLabel?: string;
  triggerVariant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  simulateLoading?: boolean;
}> = ({
  variant = 'default',
  title,
  description,
  confirmLabel,
  cancelLabel,
  triggerLabel = 'Open Dialog',
  triggerVariant = 'secondary',
  simulateLoading = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = () => {
    if (simulateLoading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 1500);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant={triggerVariant} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Dialog
        open={open}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        title={title}
        description={description}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        variant={variant}
        loading={loading}
      />
    </>
  );
};

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <DialogDemo
      title="Confirm Action"
      description="Are you sure you want to proceed with this action?"
    />
  ),
};

// ---------------------------------------------------------------------------
// Confirm Payment
// ---------------------------------------------------------------------------

export const ConfirmPayment: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default variant for confirming a scheduled payment. Shows a loading state on the confirm button while the request processes.',
      },
    },
  },
  render: () => (
    <DialogDemo
      title="Confirm Payment"
      description="You are about to send $4,200.00 to Northern Trust Services. This payment will be processed within 1-2 business days and cannot be reversed once initiated."
      confirmLabel="Send Payment"
      cancelLabel="Go Back"
      triggerLabel="Send Payment"
      triggerVariant="primary"
      simulateLoading
    />
  ),
};

// ---------------------------------------------------------------------------
// Delete Account (Danger)
// ---------------------------------------------------------------------------

export const DeleteAccount: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Danger variant for irreversible account deletion. Uses a red confirm button and a warning icon to communicate severity.',
      },
    },
  },
  render: () => (
    <DialogDemo
      variant="danger"
      title="Delete Account"
      description="This will permanently delete your account and all associated data, including transaction history, saved payees, and scheduled transfers. This action cannot be undone."
      confirmLabel="Delete Account"
      cancelLabel="Keep Account"
      triggerLabel="Delete Account"
      triggerVariant="danger"
      simulateLoading
    />
  ),
};

// ---------------------------------------------------------------------------
// Cancel Transfer (Danger)
// ---------------------------------------------------------------------------

export const CancelTransfer: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Danger variant for cancelling a pending transfer. Clear, specific copy helps the user understand the consequences.',
      },
    },
  },
  render: () => (
    <DialogDemo
      variant="danger"
      title="Cancel Transfer"
      description="Are you sure you want to cancel the pending wire transfer of $8,750.00 to Meridian Capital Partners? If the transfer has already been submitted to the network, cancellation may not be possible."
      confirmLabel="Cancel Transfer"
      cancelLabel="Keep Transfer"
      triggerLabel="Cancel Transfer"
      triggerVariant="danger"
    />
  ),
};

// ---------------------------------------------------------------------------
// Loading State
// ---------------------------------------------------------------------------

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the loading prop on the confirm button. Buttons are disabled while loading to prevent duplicate submissions.',
      },
    },
  },
  render: () => (
    <DialogDemo
      title="Processing Request"
      description="Confirm to submit your beneficiary verification request. This typically takes a few seconds."
      confirmLabel="Submit"
      triggerLabel="Show Loading"
      simulateLoading
    />
  ),
};

// ---------------------------------------------------------------------------
// All Variants
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of default and danger dialog variants.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: space[4], flexWrap: 'wrap' }}>
      <DialogDemo
        variant="default"
        title="Enable Notifications"
        description="Allow Ledger to send you real-time alerts for account activity and security events?"
        confirmLabel="Enable"
        cancelLabel="Not Now"
        triggerLabel="Default"
      />
      <DialogDemo
        variant="danger"
        title="Remove Payee"
        description="This will remove Coastal Supply Co. from your saved payees. You will need to re-enter their details for future payments."
        confirmLabel="Remove"
        cancelLabel="Keep"
        triggerLabel="Danger"
        triggerVariant="danger"
      />
    </div>
  ),
};
