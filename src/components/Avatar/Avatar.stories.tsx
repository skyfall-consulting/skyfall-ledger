import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Avatar } from './Avatar';
import { Card } from '../Card';

/**
 * Data Display / Avatar
 *
 * `<Avatar />` renders a circular user image with an initials fallback
 * and optional status indicator dot. Designed for user profiles,
 * account managers, and team members in FinTech workflows.
 */
const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Circular user image with initials fallback and optional status indicator for financial team and client displays.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'active', 'inactive', 'busy', 'away'],
    },
  },
  args: {
    name: 'Gerardo Vinces',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// ---------- Default (initials fallback) ----------

export const Default: Story = {};

// ---------- With Image ----------

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/128?u=ledger-avatar',
    name: 'Alicia Torres',
    alt: 'Alicia Torres',
    size: 'lg',
  },
};

// ---------- All Sizes ----------

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All five size variants displayed side by side.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-4)', alignItems: 'center' }}>
      <Avatar name="Alice Brown" size="xs" />
      <Avatar name="Bob Chen" size="sm" />
      <Avatar name="Clara Davis" size="md" />
      <Avatar name="David Evans" size="lg" />
      <Avatar name="Eva Flores" size="xl" />
    </div>
  ),
};

// ---------- Status Variants ----------

export const StatusVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status indicator dots for online presence and availability.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-4)', alignItems: 'center' }}>
      <Avatar name="Active User" size="lg" status="active" />
      <Avatar name="Busy User" size="lg" status="busy" />
      <Avatar name="Away User" size="lg" status="away" />
      <Avatar name="Inactive User" size="lg" status="inactive" />
    </div>
  ),
};

// ---------- Image Error Fallback ----------

export const ImageErrorFallback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When the image fails to load, the avatar gracefully falls back to initials derived from the name prop.',
      },
    },
  },
  args: {
    src: 'https://broken-url.example/missing.png',
    name: 'Jordan Mitchell',
    size: 'lg',
  },
};

// ---------- Account Managers (FinTech context) ----------

export const AccountManagers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A team of account managers shown in a compact row, typical of FinTech dashboards.',
      },
    },
  },
  render: () => (
    <Card variant="raised" padding="md" style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-4)' }}>
        <span
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--ledger-color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Account Management Team
        </span>
        <div style={{ display: 'flex', gap: 'var(--ledger-space-3)', alignItems: 'center' }}>
          <Avatar name="Sarah Kim" size="md" status="active" />
          <Avatar name="James Lee" size="md" status="active" />
          <Avatar name="Maria Gonzalez" size="md" status="busy" />
          <Avatar name="Chen Wei" size="md" status="away" />
          <Avatar name="Rachel Adams" size="md" status="inactive" />
        </div>
      </div>
    </Card>
  ),
};

// ---------- User Profile Card ----------

export const UserProfileCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Avatar used in a user profile card with role and status information.',
      },
    },
  },
  render: () => (
    <Card variant="raised" padding="md" style={{ maxWidth: 320 }}>
      <div style={{ display: 'flex', gap: 'var(--ledger-space-4)', alignItems: 'center' }}>
        <Avatar
          name="Elena Rodriguez"
          size="xl"
          status="active"
          src="https://i.pravatar.cc/128?u=ledger-profile"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-1)' }}>
          <span
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--ledger-color-text-primary)',
            }}
          >
            Elena Rodriguez
          </span>
          <span
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: 13,
              color: 'var(--ledger-color-text-muted)',
            }}
          >
            Senior Portfolio Manager
          </span>
        </div>
      </div>
    </Card>
  ),
};

// ---------- Stacked Overlap ----------

export const StackedOverlap: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overlapping avatar stack used to show multiple team members in a compact space.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {['Amir Patel', 'Beth Collins', 'Carlos Ruiz', 'Diana Ng', 'Eli Ford'].map(
        (name, i) => (
          <div
            key={name}
            style={{
              marginLeft: i === 0 ? 0 : -10,
              zIndex: 5 - i,
              position: 'relative',
              border: '2px solid var(--ledger-color-surface-primary)',
              borderRadius: '50%',
            }}
          >
            <Avatar name={name} size="md" />
          </div>
        ),
      )}
    </div>
  ),
};
