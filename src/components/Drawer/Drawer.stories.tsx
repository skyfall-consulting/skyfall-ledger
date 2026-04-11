import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button';
import { space } from '../../tokens/spacing';
import { fontFamily, fontSize, fontWeight as fontWeightTokens, lineHeight } from '../../tokens/typography';

/**
 * Surfaces / Drawer
 *
 * A slide-in side panel for contextual detail views, forms, and settings.
 * Uses the native <dialog> element for built-in focus trapping and Escape
 * handling. Supports left/right positioning, three width presets, scrollable
 * body, backdrop dismiss, and body scroll-lock.
 */
const meta: Meta<typeof Drawer> = {
  title: 'Components/Surfaces/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Drawer -- a slide-in side panel for contextual detail views, forms, and settings in financial workflows.\n\n' +
          'Built on the native `<dialog>` element for robust focus management. Slides from the left or right viewport edge ' +
          'with three width presets (sm/md/lg). Ideal for transaction detail panels, account settings, and notification centers ' +
          'that do not require a full-page navigation change.\n\n' +
          'Accessibility:\n' +
          '- Native `<dialog>` provides built-in focus trapping and Escape key dismissal\n' +
          '- `aria-labelledby` links to the rendered title heading\n' +
          '- Close button has `aria-label="Close drawer"` for screen readers\n' +
          '- Backdrop click dismisses the drawer (click target === dialog element)\n' +
          '- Body scroll is locked while open to prevent background interaction',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the drawer is visible. Controls `showModal()`/`close()` calls.',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Which edge of the viewport the drawer slides from.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Width preset: sm (320px), md (420px), lg (560px).',
    },
    title: {
      control: 'text',
      description: 'Optional drawer title rendered in the header bar.',
    },
  },
  args: {
    open: false,
    position: 'right',
    size: 'md',
    title: 'Drawer Title',
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wrapper that adds a trigger button and manages open state. */
const DrawerDemo: React.FC<{
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  children: (close: () => void) => React.ReactNode;
  triggerLabel?: string;
}> = ({ position = 'right', size = 'md', title, children, triggerLabel = 'Open Drawer' }) => {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Drawer
        open={open}
        onClose={close}
        position={position}
        size={size}
        title={title}
      >
        {children(close)}
      </Drawer>
    </>
  );
};

/** Reusable label-value row for fintech detail panels. */
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

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <DrawerDemo title="Drawer Panel">
      {() => (
        <p style={{ margin: 0, color: 'var(--ledger-color-text-secondary)' }}>
          This is a default drawer sliding in from the right. Click the backdrop
          or press Escape to close.
        </p>
      )}
    </DrawerDemo>
  ),
};

// ---------------------------------------------------------------------------
// Transaction Details Panel
// ---------------------------------------------------------------------------

export const TransactionDetails: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Transaction detail panel sliding from the right. Displays key transaction fields in a label-value layout -- ideal for row-click drill-downs in a transactions table.',
      },
    },
  },
  render: () => (
    <DrawerDemo
      title="Transaction Details"
      size="md"
      position="right"
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
          <div
            style={{
              marginTop: space[5],
              padding: space[4],
              borderRadius: '8px',
              background: 'var(--ledger-color-surface-sunken)',
              fontSize: fontSize['body-sm'],
              lineHeight: lineHeight['body-sm'],
              color: 'var(--ledger-color-text-secondary)',
            }}
          >
            This transaction was automatically categorized as Payroll. You can
            reassign the category from your transaction rules.
          </div>
        </div>
      )}
    </DrawerDemo>
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
          'Account settings panel at large size, sliding from the right. Demonstrates scrollable body content with form-like layout sections.',
      },
    },
  },
  render: () => (
    <DrawerDemo
      title="Account Settings"
      size="lg"
      position="right"
      triggerLabel="Open Settings"
    >
      {(close) => (
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

          {/* Actions */}
          <div style={{ display: 'flex', gap: space[3], justifyContent: 'flex-end', paddingTop: space[4], borderTop: '1px solid var(--ledger-color-border-default)' }}>
            <Button variant="ghost" onClick={close}>
              Discard
            </Button>
            <Button variant="primary" onClick={close}>
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </DrawerDemo>
  ),
};

// ---------------------------------------------------------------------------
// Notification Center
// ---------------------------------------------------------------------------

const notifications = [
  { id: 1, title: 'Wire transfer received', desc: '$12,500.00 from Acme Corp LLC', time: '2 min ago', unread: true },
  { id: 2, title: 'Payment scheduled', desc: 'Invoice #INV-2024-0412 -- $4,200.00', time: '18 min ago', unread: true },
  { id: 3, title: 'Security alert', desc: 'New device login from San Francisco, CA', time: '1 hour ago', unread: false },
  { id: 4, title: 'Statement ready', desc: 'August 2024 statement is available', time: '3 hours ago', unread: false },
  { id: 5, title: 'Limit change approved', desc: 'Daily ACH limit increased to $75,000', time: 'Yesterday', unread: false },
];

export const NotificationCenter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Notification center sliding from the left. Demonstrates a list-style drawer with mixed read/unread states and a compact card layout.',
      },
    },
  },
  render: () => (
    <DrawerDemo
      title="Notifications"
      size="sm"
      position="left"
      triggerLabel="Open Notifications"
    >
      {() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: space[2] }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                padding: space[4],
                borderRadius: '8px',
                background: n.unread
                  ? 'var(--ledger-color-surface-sunken)'
                  : 'transparent',
                cursor: 'pointer',
                transition: 'background 150ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: space[3], marginBottom: space[1] }}>
                {n.unread && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--ledger-color-accent-primary)',
                      flexShrink: 0,
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: fontFamily.sans,
                    fontSize: fontSize['body-md'],
                    fontWeight: n.unread ? fontWeightTokens.semibold : fontWeightTokens.regular,
                    color: 'var(--ledger-color-text-primary)',
                  }}
                >
                  {n.title}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: fontSize['body-sm'],
                  lineHeight: lineHeight['body-sm'],
                  color: 'var(--ledger-color-text-secondary)',
                  paddingLeft: n.unread ? '16px' : 0,
                }}
              >
                {n.desc}
              </p>
              <span
                style={{
                  display: 'block',
                  marginTop: space[2],
                  fontSize: fontSize['body-xs'],
                  color: 'var(--ledger-color-text-muted)',
                  paddingLeft: n.unread ? '16px' : 0,
                }}
              >
                {n.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </DrawerDemo>
  ),
};

// ---------------------------------------------------------------------------
// Positions
// ---------------------------------------------------------------------------

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drawers sliding from left and right edges of the viewport.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: space[4], flexWrap: 'wrap' }}>
      {(['left', 'right'] as const).map((pos) => (
        <DrawerDemo
          key={pos}
          title={`Position: ${pos}`}
          position={pos}
          triggerLabel={pos.charAt(0).toUpperCase() + pos.slice(1)}
        >
          {() => (
            <p style={{ margin: 0, color: 'var(--ledger-color-text-secondary)' }}>
              This drawer slides in from the <strong>{pos}</strong> edge.
            </p>
          )}
        </DrawerDemo>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three drawer size presets: sm (320px), md (420px), lg (560px).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: space[4], flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DrawerDemo
          key={size}
          title={`Size: ${size}`}
          size={size}
          triggerLabel={size.toUpperCase()}
        >
          {() => (
            <p style={{ margin: 0, color: 'var(--ledger-color-text-secondary)' }}>
              This drawer uses the <strong>{size}</strong> size preset.
            </p>
          )}
        </DrawerDemo>
      ))}
    </div>
  ),
};
