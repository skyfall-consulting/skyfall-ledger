import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { EmptyState } from './EmptyState';

/**
 * Feedback / Empty State
 *
 * `<EmptyState />` is a placeholder for empty data views, guiding
 * users with an icon, title, description, and optional action.
 */
const meta: Meta<typeof EmptyState> = {
  title: 'Components/Feedback/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'EmptyState -- Centered placeholder for empty data views such as zero-transaction tables, empty watchlists, and first-run onboarding screens. Displays an icon, heading, optional description, and an optional action slot to guide users toward their next step.\n\n### Accessibility\n- Uses an `<h3>` heading for semantic hierarchy; ensure surrounding context uses appropriate heading levels.\n- Default icon is marked `aria-hidden="true"` to avoid redundant announcements.\n- Action slot accepts any interactive element -- ensure buttons or links within it have accessible labels.\n- Centered layout with `maxWidth` constraint keeps content readable on wide viewports.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Primary heading text displayed below the icon.',
    },
    description: {
      control: 'text',
      description: 'Optional supporting text rendered below the heading.',
    },
  },
  args: {
    title: 'No transactions yet',
    description: 'Once you make your first transaction, it will appear here.',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ---------- Default ----------

export const Default: Story = {};

// ---------- With action ----------

export const WithAction: Story = {
  args: {
    title: 'No accounts found',
    description: 'Get started by creating your first account to begin tracking balances and transactions.',
    action: (
      <button
        type="button"
        style={{
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: 'var(--ledger-font-size-body-md)',
          fontWeight: 500,
          color: '#fff',
          background: 'var(--ledger-color-teal-500)',
          border: 'none',
          borderRadius: 'var(--ledger-radius-sm)',
          padding: 'var(--ledger-space-3) var(--ledger-space-6)',
          cursor: 'pointer',
        }}
      >
        Create Account
      </button>
    ),
  },
};

// ---------- With custom icon ----------

export const WithCustomIcon: Story = {
  args: {
    title: 'No notifications',
    description: 'You are all caught up. New notifications will appear here.',
    icon: (
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <path
          d="M24 6C17.373 6 12 11.373 12 18V28L8 34H40L36 28V18C36 11.373 30.627 6 24 6Z"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <path
          d="M20 34C20 36.209 21.791 38 24 38C26.209 38 28 36.209 28 34"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
};

// ---------- No description ----------

export const NoDescription: Story = {
  args: {
    title: 'No results',
    description: undefined,
  },
};

// ---------- In card ----------

export const InCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'EmptyState rendered inside a raised card container, demonstrating usage within dashboard widgets and data panels.',
      },
    },
  },
  render: () => (
    <div
      style={{
        background: 'var(--ledger-color-surface-raised)',
        boxShadow: 'var(--ledger-shadow-2)',
        borderRadius: 'var(--ledger-radius-md)',
        maxWidth: 480,
      }}
    >
      <EmptyState
        title="No recent activity"
        description="Transactions from the last 30 days will be displayed here."
        action={
          <button
            type="button"
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: 'var(--ledger-font-size-body-md)',
              fontWeight: 500,
              color: 'var(--ledger-color-text-primary)',
              background: 'transparent',
              border: '1px solid var(--ledger-color-border-default)',
              borderRadius: 'var(--ledger-radius-sm)',
              padding: 'var(--ledger-space-3) var(--ledger-space-5)',
              cursor: 'pointer',
            }}
          >
            View all transactions
          </button>
        }
      />
    </div>
  ),
};
