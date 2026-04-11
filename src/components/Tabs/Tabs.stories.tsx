import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Tabs } from './Tabs';
import { space } from '../../tokens/spacing';

/**
 * Navigation / Tabs
 *
 * Data-driven tabbed interface for switching between content panels.
 * Supports line and enclosed variants, two sizes, per-tab icons, and
 * full WAI-ARIA keyboard navigation.
 */
const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabs -- data-driven tabbed interface for switching between related content panels in fintech dashboards.\n\n' +
          'Supports controlled and uncontrolled modes, two visual variants (**line** with a bottom border indicator, ' +
          '**enclosed** with bordered tab caps), two sizes (sm/md), optional per-tab icons, and disabled tabs.\n\n' +
          'Accessibility:\n' +
          '- Implements the WAI-ARIA Tabs pattern with `role="tablist"`, `role="tab"`, and `role="tabpanel"`\n' +
          '- Active tab indicated with `aria-selected="true"` and `aria-controls` linking to its panel\n' +
          '- Each panel has `aria-labelledby` referencing its tab and `tabIndex={0}` for focus\n' +
          '- Arrow key navigation (Left/Right) with wrapping between enabled tabs\n' +
          '- Home/End keys jump to the first/last enabled tab\n' +
          '- Roving tabindex pattern: only the active tab is in the tab order',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['line', 'enclosed'],
      description: 'Visual variant: line (bottom border indicator) or enclosed (bordered tab caps).',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size preset affecting tab height, font size, and padding.',
    },
    value: {
      description: 'Controlled active tab ID. When provided, the component is fully controlled.',
    },
    defaultValue: {
      description: 'Initial active tab ID for uncontrolled usage. Defaults to the first non-disabled tab.',
    },
    onChange: {
      description: 'Callback fired when the active tab changes.',
    },
  },
  args: {
    variant: 'line',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ---------------------------------------------------------------------------
// Helpers -- placeholder content panels
// ---------------------------------------------------------------------------
const panelStyle: React.CSSProperties = {
  fontFamily: 'var(--ledger-font-sans)',
  fontSize: 13,
  lineHeight: '20px',
  color: 'var(--ledger-color-text-secondary)',
};

const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={panelStyle}>{children}</div>
);

// ---------------------------------------------------------------------------
// Default -- Overview / Transactions / Analytics
// ---------------------------------------------------------------------------
export const Default: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <Panel>
            Account balance, recent activity, and spending breakdown at a glance.
          </Panel>
        ),
      },
      {
        id: 'transactions',
        label: 'Transactions',
        content: (
          <Panel>
            Full transaction history with filters for date range, category, and amount.
          </Panel>
        ),
      },
      {
        id: 'analytics',
        label: 'Analytics',
        content: (
          <Panel>
            Charts and insights on spending patterns, cash flow trends, and budget tracking.
          </Panel>
        ),
      },
    ],
    defaultValue: 'overview',
  },
};

// ---------------------------------------------------------------------------
// Account Details / Settings
// ---------------------------------------------------------------------------
export const AccountTabs: Story = {
  name: 'Account Details / Settings',
  parameters: {
    docs: {
      description: {
        story: 'Two-tab layout for account detail and settings views. Minimal tab count for focused contexts.',
      },
    },
  },
  args: {
    tabs: [
      {
        id: 'details',
        label: 'Account Details',
        content: (
          <Panel>
            Routing number, account number, and account holder information.
          </Panel>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        content: (
          <Panel>
            Notification preferences, statement delivery, and overdraft protection options.
          </Panel>
        ),
      },
    ],
    defaultValue: 'details',
  },
};

// ---------------------------------------------------------------------------
// Enclosed variant
// ---------------------------------------------------------------------------
export const EnclosedVariant: Story = {
  name: 'Enclosed Variant',
  parameters: {
    docs: {
      description: {
        story: 'Enclosed variant with bordered tab caps. The active tab blends into the panel background while inactive tabs remain visually separated.',
      },
    },
  },
  args: {
    variant: 'enclosed',
    tabs: [
      {
        id: 'summary',
        label: 'Summary',
        content: (
          <Panel>
            Portfolio value, allocation breakdown, and daily performance metrics.
          </Panel>
        ),
      },
      {
        id: 'holdings',
        label: 'Holdings',
        content: (
          <Panel>
            Individual positions with current value, cost basis, and gain/loss.
          </Panel>
        ),
      },
      {
        id: 'activity',
        label: 'Activity',
        content: (
          <Panel>
            Dividends received, trades executed, and pending orders.
          </Panel>
        ),
      },
    ],
    defaultValue: 'summary',
  },
};

// ---------------------------------------------------------------------------
// Small size
// ---------------------------------------------------------------------------
export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size preset (36px height) for compact contexts such as transaction status filters.',
      },
    },
  },
  args: {
    size: 'sm',
    tabs: [
      {
        id: 'pending',
        label: 'Pending',
        content: <Panel>Transactions awaiting settlement.</Panel>,
      },
      {
        id: 'completed',
        label: 'Completed',
        content: <Panel>Settled and posted transactions.</Panel>,
      },
      {
        id: 'declined',
        label: 'Declined',
        content: <Panel>Declined or reversed transactions.</Panel>,
      },
    ],
    defaultValue: 'pending',
  },
};

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------
const WalletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs with leading icons for visual identification. Icons scale with the size preset.',
      },
    },
  },
  args: {
    tabs: [
      {
        id: 'wallet',
        label: 'Wallet',
        icon: <WalletIcon />,
        content: <Panel>Connected wallets and balances across accounts.</Panel>,
      },
      {
        id: 'cards',
        label: 'Cards',
        icon: <CreditCardIcon />,
        content: <Panel>Virtual and physical cards with spend limits and controls.</Panel>,
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: <BarChartIcon />,
        content: <Panel>Monthly statements, tax documents, and expense reports.</Panel>,
      },
    ],
    defaultValue: 'wallet',
  },
};

// ---------------------------------------------------------------------------
// With disabled tab
// ---------------------------------------------------------------------------
export const WithDisabledTab: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A tab marked as disabled. Disabled tabs are visually dimmed, excluded from keyboard navigation, and cannot be selected.',
      },
    },
  },
  args: {
    tabs: [
      {
        id: 'balances',
        label: 'Balances',
        content: <Panel>Current and available balances for all linked accounts.</Panel>,
      },
      {
        id: 'transfers',
        label: 'Transfers',
        content: <Panel>Schedule and manage transfers between accounts.</Panel>,
      },
      {
        id: 'investments',
        label: 'Investments',
        disabled: true,
        content: <Panel>Investment features coming soon.</Panel>,
      },
    ],
    defaultValue: 'balances',
  },
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------
export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled tabs with external state. The active tab ID is displayed below to verify programmatic control.',
      },
    },
  },
  render: function ControlledStory(args) {
    const [activeTab, setActiveTab] = React.useState('inflows');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
        <Tabs
          {...args}
          tabs={[
            {
              id: 'inflows',
              label: 'Inflows',
              content: <Panel>Deposits, transfers in, and incoming payments.</Panel>,
            },
            {
              id: 'outflows',
              label: 'Outflows',
              content: <Panel>Withdrawals, bills, and outgoing payments.</Panel>,
            },
            {
              id: 'recurring',
              label: 'Recurring',
              content: <Panel>Subscriptions and scheduled payments.</Panel>,
            },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />
        <div
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 13,
            color: 'var(--ledger-color-text-secondary)',
          }}
        >
          Active tab: <strong>{activeTab}</strong>
        </div>
      </div>
    );
  },
};
