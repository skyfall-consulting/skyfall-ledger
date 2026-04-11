import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Banner } from './Banner';

/**
 * Feedback / Banner
 *
 * `<Banner />` is a full-width page-level message bar for system
 * announcements, compliance notices, and critical status updates.
 */
const meta: Meta<typeof Banner> = {
  title: 'Feedback/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-width page-level message bar for system announcements, compliance notices, and critical status updates. Supports success, error, warning, and info statuses with optional dismiss control.',
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    dismissible: { control: 'boolean' },
  },
  args: {
    status: 'info',
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

// ---------- Info ----------

export const SystemMaintenance: Story = {
  args: {
    status: 'info',
    children:
      'Scheduled maintenance: Services will be temporarily unavailable on Saturday, April 18 from 2:00 AM to 4:00 AM EST.',
  },
};

// ---------- Warning ----------

export const KYCRequired: Story = {
  args: {
    status: 'warning',
    children:
      'Action required: Complete your KYC verification within 7 days to maintain full account access.',
  },
};

// ---------- Error ----------

export const AccountSuspended: Story = {
  args: {
    status: 'error',
    children:
      'Your account has been temporarily suspended due to unusual activity. Please contact support for assistance.',
  },
};

// ---------- Success ----------

export const VerificationComplete: Story = {
  args: {
    status: 'success',
    children:
      'Your business account has been verified. All transaction limits have been lifted.',
  },
};

// ---------- Dismissible ----------

export const Dismissible: Story = {
  render: function DismissibleStory() {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <div style={{ padding: 24 }}>
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
            Show banner again
          </button>
        </div>
      );
    }

    return (
      <Banner status="info" dismissible onDismiss={() => setVisible(false)}>
        New feature: Recurring payments are now available. Set up automatic transfers from your
        dashboard.
      </Banner>
    );
  },
};

// ---------- Custom icon ----------

export const CustomIcon: Story = {
  args: {
    status: 'info',
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={1.5} />
        <path
          d="M10 6V10.5L13 13"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    children:
      'Trading hours have been updated. Markets now open at 8:00 AM EST.',
  },
};

// ---------- All statuses ----------

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Banner status="info">
        Scheduled maintenance: Services will be temporarily unavailable this Saturday.
      </Banner>
      <Banner status="success">
        All systems operational. Your latest deposit has been processed.
      </Banner>
      <Banner status="warning">
        Complete your KYC verification to maintain full account access.
      </Banner>
      <Banner status="error">
        Account suspended due to unusual activity. Contact support immediately.
      </Banner>
    </div>
  ),
};
