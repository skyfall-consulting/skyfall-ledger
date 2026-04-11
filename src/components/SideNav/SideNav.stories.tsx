import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SideNav, type SideNavItem } from './SideNav';

const meta: Meta<typeof SideNav> = {
  title: 'Navigation/SideNav',
  component: SideNav,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof SideNav>;

// Placeholder icons (inline SVGs)
const DashboardIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="11" y="3" width="6" height="6" rx="1" />
    <rect x="3" y="11" width="6" height="6" rx="1" />
    <rect x="11" y="11" width="6" height="6" rx="1" />
  </svg>
);

const AccountsIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="16" height="10" rx="2" />
    <path d="M2 9h16" />
  </svg>
);

const TransactionsIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h12M4 10h12M4 13h8" />
  </svg>
);

const InvestmentsIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 14 8 10 12 12 16 6" />
  </svg>
);

const SettingsIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="3" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" />
  </svg>
);

const dashboardItems: SideNavItem[] = [
  { id: 'overview', label: 'Overview', icon: DashboardIcon, href: '#' },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: AccountsIcon,
    children: [
      { id: 'checking', label: 'Checking', href: '#' },
      { id: 'savings', label: 'Savings', href: '#' },
      { id: 'credit', label: 'Credit Card', href: '#' },
    ],
  },
  { id: 'transactions', label: 'Transactions', icon: TransactionsIcon, href: '#' },
  { id: 'investments', label: 'Investments', icon: InvestmentsIcon, href: '#' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, href: '#' },
];

// --- Default ---
export const Default: Story = {
  args: {
    items: dashboardItems,
    activeId: 'overview',
  },
  decorators: [
    (Story) => (
      <div style={{ height: 400, display: 'flex' }}>
        <Story />
        <div style={{ flex: 1, padding: 24, color: 'var(--ledger-color-text-secondary)' }}>
          Main content area
        </div>
      </div>
    ),
  ],
};

// --- With Nested Active ---
export const NestedActive: Story = {
  args: {
    items: dashboardItems,
    activeId: 'savings',
  },
  decorators: Default.decorators,
};

// --- Collapsible ---
export const Collapsible: Story = {
  render: function CollapsibleStory() {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ height: 400, display: 'flex' }}>
        <SideNav
          items={dashboardItems}
          activeId="transactions"
          collapsed={collapsed}
          onCollapse={setCollapsed}
        />
        <div style={{ flex: 1, padding: 24, color: 'var(--ledger-color-text-secondary)' }}>
          Main content area — sidebar is {collapsed ? 'collapsed' : 'expanded'}
        </div>
      </div>
    );
  },
};

// --- Collapsed ---
export const Collapsed: Story = {
  args: {
    items: dashboardItems,
    activeId: 'transactions',
    collapsed: true,
  },
  decorators: Default.decorators,
};

// --- With Disabled Item ---
export const WithDisabledItem: Story = {
  args: {
    items: [
      ...dashboardItems.slice(0, 4),
      { id: 'settings', label: 'Settings', icon: SettingsIcon, disabled: true },
    ],
    activeId: 'overview',
  },
  decorators: Default.decorators,
};
