import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { space } from '../../tokens/spacing';
import { fontFamily, fontSize, fontWeight as fontWeightTokens, lineHeight } from '../../tokens/typography';

/**
 * Surfaces / Modal
 *
 * Overlay dialog for focused interactions. Uses the native <dialog> element
 * for built-in focus trapping and Escape handling. Supports four max-width
 * sizes, scrollable body, optional footer, backdrop dismiss, and scroll-lock.
 */
const meta: Meta<typeof Modal> = {
  title: 'Components/Surfaces/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal -- an overlay dialog surface for focused interactions such as transfer confirmations, account settings, and transaction details.\n\n' +
          'Built on the native `<dialog>` element with four max-width presets (sm/md/lg/xl), a scrollable body, and an optional footer slot for action buttons. ' +
          'In financial workflows, always pair destructive modals with clear confirmation language and danger-variant action buttons.\n\n' +
          'Accessibility:\n' +
          '- Native `<dialog>` provides built-in focus trapping and Escape key dismissal\n' +
          '- `aria-labelledby` links to the rendered title heading\n' +
          '- Close button has `aria-label="Close dialog"` for screen readers\n' +
          '- Backdrop click dismisses the modal (click target === dialog element)\n' +
          '- Body scroll is locked while open to prevent background interaction',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is visible. Controls `showModal()`/`close()` calls.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Max-width preset: sm (400px), md (560px), lg (720px), xl (960px).',
    },
    title: {
      control: 'text',
      description: 'Modal title rendered in the header bar.',
    },
    footer: {
      description: 'Optional footer content (action buttons, etc.) rendered below the body.',
    },
  },
  args: {
    open: false,
    size: 'md',
    title: 'Modal Title',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wrapper that adds an "Open" trigger button and manages open state. */
const ModalDemo: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title: string;
  footer?: (close: () => void) => React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  triggerLabel?: string;
}> = ({ size = 'md', title, footer, children, triggerLabel = 'Open Modal' }) => {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={title}
        size={size}
        footer={footer?.(close)}
      >
        {children(close)}
      </Modal>
    </>
  );
};

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <ModalDemo title="Default Modal">
      {() => (
        <p style={{ margin: 0, color: 'var(--ledger-color-text-secondary)' }}>
          This is a default modal with no footer. Click the backdrop or press
          Escape to close.
        </p>
      )}
    </ModalDemo>
  ),
};

// ---------------------------------------------------------------------------
// Transfer Confirmation
// ---------------------------------------------------------------------------

const LabelValue: React.FC<{ label: string; value: string; mono?: boolean }> = ({
  label,
  value,
  mono,
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
    <span
      style={{
        fontFamily: fontFamily.sans,
        fontSize: fontSize['body-sm'],
        color: 'var(--ledger-color-text-muted)',
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: mono ? fontFamily.mono : fontFamily.sans,
        fontSize: fontSize['body-md'],
        fontWeight: fontWeightTokens.medium,
        color: 'var(--ledger-color-text-primary)',
      }}
    >
      {value}
    </span>
  </div>
);

export const TransferConfirmation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Confirm an outbound wire transfer. Displays key details in a label-value layout with primary and ghost action buttons.',
      },
    },
  },
  render: () => (
    <ModalDemo
      title="Confirm Transfer"
      size="sm"
      triggerLabel="Open Transfer Modal"
      footer={(close) => (
        <>
          <Button variant="ghost" onClick={close}>
            Cancel
          </Button>
          <Button variant="primary" onClick={close}>
            Send $12,500.00
          </Button>
        </>
      )}
    >
      {() => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: space[1],
          }}
        >
          <LabelValue label="Recipient" value="Acme Corp LLC" />
          <LabelValue label="Account" value="****4829" mono />
          <LabelValue label="Routing" value="021000021" mono />
          <LabelValue label="Amount" value="$12,500.00" mono />
          <LabelValue label="Memo" value="Invoice #INV-2024-0193" />
          <div
            style={{
              marginTop: space[3],
              padding: space[4],
              borderRadius: '8px',
              background: 'var(--ledger-color-surface-sunken)',
              fontSize: fontSize['body-sm'],
              lineHeight: lineHeight['body-sm'],
              color: 'var(--ledger-color-text-secondary)',
            }}
          >
            Transfers initiated after 4:00 PM ET will be processed on the next
            business day.
          </div>
        </div>
      )}
    </ModalDemo>
  ),
};

// ---------------------------------------------------------------------------
// Account Settings
// ---------------------------------------------------------------------------

export const AccountSettings: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Account settings modal at large size. Demonstrates scrollable body content with form-like layout.',
      },
    },
  },
  render: () => (
    <ModalDemo
      title="Account Settings"
      size="lg"
      triggerLabel="Open Settings"
      footer={(close) => (
        <>
          <Button variant="ghost" onClick={close}>
            Discard
          </Button>
          <Button variant="primary" onClick={close}>
            Save Changes
          </Button>
        </>
      )}
    >
      {() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: space[6] }}>
          {/* Section: Notifications */}
          <div>
            <h3
              style={{
                margin: `0 0 ${space[3]}`,
                fontWeight: fontWeightTokens.semibold,
                fontSize: fontSize['title-sm'],
                color: 'var(--ledger-color-text-primary)',
              }}
            >
              Notifications
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: fontSize['body-md'],
                lineHeight: lineHeight['body-md'],
                color: 'var(--ledger-color-text-secondary)',
              }}
            >
              Choose how you receive alerts for transactions, security events,
              and account updates. Email alerts are always enabled for
              high-value transfers exceeding your daily threshold.
            </p>
          </div>

          {/* Section: Security */}
          <div>
            <h3
              style={{
                margin: `0 0 ${space[3]}`,
                fontWeight: fontWeightTokens.semibold,
                fontSize: fontSize['title-sm'],
                color: 'var(--ledger-color-text-primary)',
              }}
            >
              Two-Factor Authentication
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: fontSize['body-md'],
                lineHeight: lineHeight['body-md'],
                color: 'var(--ledger-color-text-secondary)',
              }}
            >
              2FA is currently enabled via authenticator app. You can switch to
              SMS verification or add a hardware security key as a backup method.
            </p>
          </div>

          {/* Section: Limits */}
          <div>
            <h3
              style={{
                margin: `0 0 ${space[3]}`,
                fontWeight: fontWeightTokens.semibold,
                fontSize: fontSize['title-sm'],
                color: 'var(--ledger-color-text-primary)',
              }}
            >
              Transfer Limits
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: fontSize['body-md'],
                lineHeight: lineHeight['body-md'],
                color: 'var(--ledger-color-text-secondary)',
              }}
            >
              Daily limit: $50,000. Per-transaction limit: $25,000. Contact
              your relationship manager to request a temporary or permanent
              limit increase.
            </p>
          </div>
        </div>
      )}
    </ModalDemo>
  ),
};

// ---------------------------------------------------------------------------
// Transaction Details
// ---------------------------------------------------------------------------

export const TransactionDetails: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Read-only transaction detail modal. Demonstrates a modal without footer actions — close via X or backdrop.',
      },
    },
  },
  render: () => (
    <ModalDemo
      title="Transaction Details"
      size="md"
      triggerLabel="View Transaction"
    >
      {() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: space[1] }}>
          <LabelValue label="Transaction ID" value="TXN-2024-08-29-00471" mono />
          <LabelValue label="Date" value="Aug 29, 2024 at 2:14 PM ET" />
          <LabelValue label="Type" value="ACH Credit" />
          <LabelValue label="Status" value="Settled" />
          <LabelValue label="Amount" value="+$3,250.00" mono />
          <LabelValue label="From" value="Payroll Services Inc." />
          <LabelValue label="To Account" value="Checking ****7231" mono />
          <LabelValue label="Reference" value="PAY-AUG-2024-BIWEEKLY" mono />
        </div>
      )}
    </ModalDemo>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All four modal size presets: sm (400px), md (560px), lg (720px), xl (960px).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: space[4], flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <ModalDemo
          key={size}
          title={`Size: ${size}`}
          size={size}
          triggerLabel={size.toUpperCase()}
          footer={(close) => (
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
          )}
        >
          {() => (
            <p style={{ margin: 0, color: 'var(--ledger-color-text-secondary)' }}>
              This modal uses the <strong>{size}</strong> size preset.
            </p>
          )}
        </ModalDemo>
      ))}
    </div>
  ),
};
