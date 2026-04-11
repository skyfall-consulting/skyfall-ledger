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
  title: 'Components/Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Banner -- Full-width page-level message bar for system-wide announcements, compliance notices, and critical status updates. Renders at the top of content areas with a bottom accent border, status icon, and optional dismiss control.\n\n### Accessibility\n- Uses `role="alert"` for `error` and `warning` statuses (assertive announcement) and `role="status"` for `success` and `info` (polite announcement).\n- Dismiss button provides `aria-label="Dismiss banner"` and supports keyboard interaction with a visible focus ring.\n- Status icons are `aria-hidden="true"` to prevent redundant screen-reader output.\n- Full-width layout ensures the banner remains visible and does not obscure interactive content.',
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Visual status variant that controls the background color, accent border, and default icon.',
    },
    dismissible: {
      control: 'boolean',
      description: 'When `true`, renders a dismiss button at the trailing edge of the banner.',
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Interactive dismiss flow. The banner can be re-shown after dismissal to demonstrate the `onDismiss` callback.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'All four status variants stacked to show the full color and icon range.',
      },
    },
  },
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
