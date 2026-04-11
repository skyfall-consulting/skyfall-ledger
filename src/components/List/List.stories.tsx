import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { List, ListItem } from './List';

/**
 * Data Display / List
 *
 * `<List />` and `<ListItem />` provide a structured list with
 * optional icons, trailing actions, and interactive states.
 */
const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A structured list with optional icons, secondary actions, and interactive items.',
      },
    },
  },
  argTypes: {
    dense: { control: 'boolean' },
  },
  args: {
    dense: false,
  },
};

export default meta;
type Story = StoryObj<typeof List>;

// ---------- Default ----------

export const Default: Story = {
  render: (args) => (
    <List {...args} style={{ maxWidth: 380 }}>
      <ListItem>Checking Account</ListItem>
      <ListItem>Savings Account</ListItem>
      <ListItem>Investment Portfolio</ListItem>
    </List>
  ),
};

// ---------- WithIcons ----------

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="22" height="16" x="1" y="4" rx="2" />
    <line x1="1" x2="23" y1="10" y2="10" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <List style={{ maxWidth: 380 }}>
      <ListItem icon={<WalletIcon />}>Wallet</ListItem>
      <ListItem icon={<TrendingUpIcon />}>Investments</ListItem>
      <ListItem icon={<CreditCardIcon />}>Cards</ListItem>
    </List>
  ),
};

// ---------- WithActions ----------

export const WithActions: Story = {
  render: () => (
    <List style={{ maxWidth: 380 }}>
      <ListItem
        secondaryAction={
          <span
            style={{
              fontSize: 'var(--ledger-font-size-label)',
              color: 'var(--ledger-color-teal-400)',
              fontWeight: 500,
            }}
          >
            $12,450.00
          </span>
        }
      >
        Checking Account
      </ListItem>
      <ListItem
        secondaryAction={
          <span
            style={{
              fontSize: 'var(--ledger-font-size-label)',
              color: 'var(--ledger-color-teal-400)',
              fontWeight: 500,
            }}
          >
            $35,841.64
          </span>
        }
      >
        Savings Account
      </ListItem>
      <ListItem
        secondaryAction={
          <span
            style={{
              fontSize: 'var(--ledger-font-size-label)',
              color: 'var(--ledger-color-text-muted)',
              fontWeight: 500,
            }}
          >
            $0.00
          </span>
        }
      >
        Credit Line
      </ListItem>
    </List>
  ),
};

// ---------- Dense ----------

export const Dense: Story = {
  render: () => (
    <List dense style={{ maxWidth: 380 }}>
      <ListItem icon={<WalletIcon />}>Wallet</ListItem>
      <ListItem icon={<TrendingUpIcon />}>Investments</ListItem>
      <ListItem icon={<CreditCardIcon />}>Cards</ListItem>
      <ListItem>Settings</ListItem>
    </List>
  ),
};

// ---------- Interactive ----------

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [selected, setSelected] = React.useState<string | null>(null);
    return (
      <div style={{ maxWidth: 380 }}>
        <List>
          {['Checking', 'Savings', 'Investment'].map((name) => (
            <ListItem
              key={name}
              icon={<WalletIcon />}
              onClick={() => setSelected(name)}
              style={
                selected === name
                  ? { background: 'var(--ledger-color-surface-sunken)' }
                  : undefined
              }
            >
              {name} Account
            </ListItem>
          ))}
          <ListItem icon={<CreditCardIcon />} disabled>
            Credit (disabled)
          </ListItem>
        </List>
        {selected && (
          <p
            style={{
              marginTop: 'var(--ledger-space-4)',
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: 'var(--ledger-font-size-body-sm)',
              color: 'var(--ledger-color-text-secondary)',
            }}
          >
            Selected: {selected}
          </p>
        )}
      </div>
    );
  },
};

// ---------- Composed (inside a Card) ----------

export const Composed: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--ledger-color-surface-raised)',
        boxShadow: 'var(--ledger-shadow-2)',
        borderRadius: 'var(--ledger-radius-md)',
        maxWidth: 380,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: 'var(--ledger-space-5) var(--ledger-space-5) var(--ledger-space-3)',
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--ledger-color-text-primary)',
        }}
      >
        Accounts
      </div>
      <List>
        <ListItem
          icon={<WalletIcon />}
          secondaryAction={
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ledger-color-text-primary)' }}>
              $12,450
            </span>
          }
          onClick={() => {}}
        >
          Checking
        </ListItem>
        <ListItem
          icon={<TrendingUpIcon />}
          secondaryAction={
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ledger-color-text-primary)' }}>
              $35,841
            </span>
          }
          onClick={() => {}}
        >
          Savings
        </ListItem>
        <ListItem
          icon={<CreditCardIcon />}
          secondaryAction={
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ledger-color-text-primary)' }}>
              $8,200
            </span>
          }
          onClick={() => {}}
        >
          Investment
        </ListItem>
      </List>
    </div>
  ),
};
