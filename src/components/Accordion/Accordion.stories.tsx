import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Accordion, type AccordionItem } from './Accordion';

/**
 * Surfaces / Accordion
 *
 * `<Accordion />` provides expandable/collapsible sections for grouping
 * related content. Supports single and multiple open modes with
 * controlled and uncontrolled usage patterns.
 */
const meta: Meta<typeof Accordion> = {
  title: 'Components/Surfaces/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Multi-panel expandable sections with single or multiple open modes, controlled/uncontrolled state, and smooth CSS grid animation.',
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
  },
  args: {
    mode: 'single',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const textStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ledger-font-sans)',
  fontSize: '14px',
  lineHeight: 1.6,
  color: 'var(--ledger-color-text-secondary)',
};

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

const defaultItems: AccordionItem[] = [
  { id: 'item-1', title: 'What is Skyfall Ledger?', content: 'Skyfall Ledger is a design system purpose-built for fintech products, providing consistent and accessible UI components.' },
  { id: 'item-2', title: 'How do I get started?', content: 'Install the package via npm and import the components you need. Each component supports CSS custom properties for theming.' },
  { id: 'item-3', title: 'Is it accessible?', content: 'Yes. Every component follows WAI-ARIA patterns with proper roles, states, and keyboard navigation support.' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

// ---------------------------------------------------------------------------
// FAQ Section
// ---------------------------------------------------------------------------

const faqItems: AccordionItem[] = [
  {
    id: 'faq-1',
    title: 'How long do wire transfers take?',
    content: 'Domestic wire transfers typically settle within 1 business day. International wires may take 3-5 business days depending on the destination country and intermediary banks involved.',
  },
  {
    id: 'faq-2',
    title: 'What are the transaction limits?',
    content: 'Standard accounts have a daily transfer limit of $25,000 and a monthly limit of $100,000. Premium accounts can request higher limits through the settings panel.',
  },
  {
    id: 'faq-3',
    title: 'How do I dispute a charge?',
    content: 'Navigate to the transaction in your activity feed, select the overflow menu, and choose "Dispute this charge." Our team will review the claim within 2 business days.',
  },
  {
    id: 'faq-4',
    title: 'Is two-factor authentication required?',
    content: 'Two-factor authentication is required for all accounts. You can choose between SMS verification, authenticator app, or a hardware security key in your security settings.',
  },
];

export const FAQSection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A typical FAQ section for banking or fintech support pages.',
      },
    },
  },
  args: {
    items: faqItems,
    mode: 'single',
  },
};

// ---------------------------------------------------------------------------
// Account Details (multiple mode)
// ---------------------------------------------------------------------------

const accountItems: AccordionItem[] = [
  {
    id: 'acc-checking',
    title: 'Checking Account -- 4821',
    defaultOpen: true,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
          <span>Available balance</span>
          <span style={{ fontFamily: 'var(--ledger-font-mono)', fontWeight: 600, color: 'var(--ledger-color-text-primary)' }}>$12,485.32</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
          <span>Pending transactions</span>
          <span style={{ fontFamily: 'var(--ledger-font-mono)' }}>3 items</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
          <span>Routing number</span>
          <span style={{ fontFamily: 'var(--ledger-font-mono)' }}>021000021</span>
        </div>
      </div>
    ),
  },
  {
    id: 'acc-savings',
    title: 'High-Yield Savings -- 7903',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
          <span>Available balance</span>
          <span style={{ fontFamily: 'var(--ledger-font-mono)', fontWeight: 600, color: 'var(--ledger-color-text-primary)' }}>$84,210.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
          <span>APY</span>
          <span style={{ fontFamily: 'var(--ledger-font-mono)' }}>4.25%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
          <span>Interest earned (YTD)</span>
          <span style={{ fontFamily: 'var(--ledger-font-mono)', color: 'var(--ledger-color-positive)' }}>+$1,842.50</span>
        </div>
      </div>
    ),
  },
  {
    id: 'acc-investment',
    title: 'Investment Account -- 3157',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
          <span>Portfolio value</span>
          <span style={{ fontFamily: 'var(--ledger-font-mono)', fontWeight: 600, color: 'var(--ledger-color-text-primary)' }}>$31,755.18</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
          <span>Today&apos;s change</span>
          <span style={{ fontFamily: 'var(--ledger-font-mono)', color: 'var(--ledger-color-positive)' }}>+$245.60 (0.78%)</span>
        </div>
      </div>
    ),
  },
];

export const AccountDetails: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple account panels that can all be open simultaneously, showing account balances and details.',
      },
    },
  },
  args: {
    items: accountItems,
    mode: 'multiple',
    defaultValue: ['acc-checking'],
  },
};

// ---------------------------------------------------------------------------
// Transaction Categories
// ---------------------------------------------------------------------------

const categoryItems: AccordionItem[] = [
  {
    id: 'cat-income',
    title: 'Income',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-2)' }}>
        {[
          { label: 'Salary - Acme Corp', amount: '+$5,200.00' },
          { label: 'Freelance - Widget Co', amount: '+$1,800.00' },
          { label: 'Dividend - VOO', amount: '+$142.30' },
        ].map((tx) => (
          <div key={tx.label} style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
            <span>{tx.label}</span>
            <span style={{ fontFamily: 'var(--ledger-font-mono)', color: 'var(--ledger-color-positive)' }}>{tx.amount}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'cat-housing',
    title: 'Housing & Utilities',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-2)' }}>
        {[
          { label: 'Rent - 123 Main St', amount: '-$2,100.00' },
          { label: 'Electric - City Power', amount: '-$87.42' },
          { label: 'Internet - FiberCo', amount: '-$69.99' },
        ].map((tx) => (
          <div key={tx.label} style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
            <span>{tx.label}</span>
            <span style={{ fontFamily: 'var(--ledger-font-mono)', color: 'var(--ledger-color-negative)' }}>{tx.amount}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'cat-food',
    title: 'Food & Dining',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-2)' }}>
        {[
          { label: 'Grocery Mart', amount: '-$142.87' },
          { label: 'Coffee House', amount: '-$24.50' },
          { label: 'Restaurant - Trattoria', amount: '-$68.00' },
        ].map((tx) => (
          <div key={tx.label} style={{ display: 'flex', justifyContent: 'space-between', ...textStyle }}>
            <span>{tx.label}</span>
            <span style={{ fontFamily: 'var(--ledger-font-mono)', color: 'var(--ledger-color-negative)' }}>{tx.amount}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'cat-subscriptions',
    title: 'Subscriptions',
    disabled: true,
    content: (
      <span style={textStyle}>No subscription transactions this period.</span>
    ),
  },
];

export const TransactionCategories: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Transaction breakdown grouped by spending category. The Subscriptions panel is disabled.',
      },
    },
  },
  args: {
    items: categoryItems,
    mode: 'single',
  },
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------

function ControlledDemo() {
  const [openIds, setOpenIds] = React.useState<string[]>(['ctrl-1']);

  const items: AccordionItem[] = [
    { id: 'ctrl-1', title: 'Panel One', content: 'First panel content.' },
    { id: 'ctrl-2', title: 'Panel Two', content: 'Second panel content.' },
    { id: 'ctrl-3', title: 'Panel Three', content: 'Third panel content.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-5)' }}>
      <div style={{ fontFamily: 'var(--ledger-font-mono)', fontSize: '12px', color: 'var(--ledger-color-text-muted)' }}>
        Open panels: [{openIds.join(', ')}]
      </div>
      <Accordion
        items={items}
        mode="multiple"
        value={openIds}
        onChange={setOpenIds}
      />
      <button
        type="button"
        onClick={() => setOpenIds([])}
        style={{
          alignSelf: 'flex-start',
          padding: 'var(--ledger-space-2) var(--ledger-space-4)',
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: '13px',
          background: 'var(--ledger-color-surface-sunken)',
          border: '1px solid var(--ledger-color-border-default)',
          borderRadius: 'var(--ledger-radius-sm)',
          color: 'var(--ledger-color-text-primary)',
          cursor: 'pointer',
        }}
      >
        Collapse all
      </button>
    </div>
  );
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled accordion with external state management. The "Collapse all" button demonstrates programmatic control.',
      },
    },
  },
  render: () => <ControlledDemo />,
};
