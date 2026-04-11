import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { space } from '../../tokens/spacing';
import { fontFamily, fontSize, fontWeight, tracking } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

/**
 * Navigation / Breadcrumbs
 *
 * Hierarchical navigation trail for fintech dashboards. Supports link
 * and button crumbs, collapsible middle items, and accessible markup.
 */
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Breadcrumbs -- navigational trail showing the current location within a fintech dashboard hierarchy.\n\n' +
          'Supports link and button crumbs for ancestor pages, plain-text rendering for the current page, and collapsible ' +
          'middle items via `maxItems` for deep navigation paths.\n\n' +
          'Accessibility:\n' +
          '- Wrapped in `<nav>` with `aria-label="Breadcrumb"` for landmark navigation\n' +
          '- Uses semantic `<ol>`/`<li>` list structure for ordered path representation\n' +
          '- Last item has `aria-current="page"` to indicate the current location\n' +
          '- Chevron separators are `aria-hidden` so screen readers skip them\n' +
          '- Ancestor crumbs render as `<a>` or `<button>` elements with focus-ring styles',
      },
    },
  },
  argTypes: {
    maxItems: {
      control: { type: 'number', min: 2, max: 10, step: 1 },
      description: 'Maximum visible items before collapsing middle items to an ellipsis.',
    },
    items: {
      description: 'Breadcrumb path items ordered from root to current page.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// ---------- Basic ----------

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Accounts', href: '#' },
      { label: 'Checking' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Overview' },
    ],
  },
};

// ---------- FinTech Scenarios ----------

export const TransactionDrilldown: Story = {
  name: 'Transaction Drill-Down',
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Transactions', href: '#' },
      { label: 'TXN-12345' },
    ],
  },
};

export const AccountHierarchy: Story = {
  name: 'Account Hierarchy',
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Accounts', href: '#' },
      { label: 'Savings', href: '#' },
      { label: 'Account Details' },
    ],
  },
};

export const DeepNavigation: Story = {
  name: 'Deep Navigation (5 levels)',
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Business', href: '#' },
      { label: 'Invoices', href: '#' },
      { label: 'Q4 2025', href: '#' },
      { label: 'INV-0042' },
    ],
  },
};

// ---------- Collapsed ----------

export const CollapsedMiddle: Story = {
  name: 'Collapsed (maxItems=3)',
  args: {
    maxItems: 3,
    items: [
      { label: 'Home', href: '#' },
      { label: 'Business', href: '#' },
      { label: 'Invoices', href: '#' },
      { label: 'Q4 2025', href: '#' },
      { label: 'INV-0042' },
    ],
  },
};

export const CollapsedTight: Story = {
  name: 'Collapsed (maxItems=2)',
  args: {
    maxItems: 2,
    items: [
      { label: 'Home', href: '#' },
      { label: 'Accounts', href: '#' },
      { label: 'Checking', href: '#' },
      { label: 'Statements', href: '#' },
      { label: 'March 2026' },
    ],
  },
};

// ---------- With Click Handlers ----------

export const WithOnClick: Story = {
  name: 'With onClick Handlers',
  args: {
    items: [
      { label: 'Dashboard', onClick: () => console.log('Dashboard') },
      { label: 'Payments', onClick: () => console.log('Payments') },
      { label: 'Pay #8831' },
    ],
  },
};

// ---------- Showcase ----------

const ShowcaseCard: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div
    style={{
      padding: space[5],
      borderRadius: radius.md,
      border: '1px solid var(--ledger-color-border-subtle)',
      background: 'var(--ledger-color-surface-raised)',
      display: 'flex',
      flexDirection: 'column',
      gap: space[4],
    }}
  >
    <div
      style={{
        fontFamily: fontFamily.sans,
        fontSize: fontSize.label,
        textTransform: 'uppercase',
        letterSpacing: tracking.label,
        fontWeight: fontWeight.semibold,
        color: 'var(--ledger-color-text-muted)',
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common breadcrumb patterns in a fintech dashboard.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <ShowcaseCard label="Account Navigation">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Accounts', href: '#' },
            { label: 'Checking' },
          ]}
        />
      </ShowcaseCard>

      <ShowcaseCard label="Transaction Detail">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '#' },
            { label: 'Transactions', href: '#' },
            { label: 'TXN-12345' },
          ]}
        />
      </ShowcaseCard>

      <ShowcaseCard label="Deep Path (collapsed)">
        <Breadcrumbs
          maxItems={3}
          items={[
            { label: 'Home', href: '#' },
            { label: 'Business', href: '#' },
            { label: 'Invoices', href: '#' },
            { label: 'Q4 2025', href: '#' },
            { label: 'INV-0042' },
          ]}
        />
      </ShowcaseCard>

      <ShowcaseCard label="Settings">
        <Breadcrumbs
          items={[
            { label: 'Settings', href: '#' },
            { label: 'Security', href: '#' },
            { label: 'Two-Factor Auth' },
          ]}
        />
      </ShowcaseCard>
    </div>
  ),
};
