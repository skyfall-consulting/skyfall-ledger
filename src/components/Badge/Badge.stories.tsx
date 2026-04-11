import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Badge } from './Badge';
import { Card } from '../Card';

/**
 * Components / Badge
 *
 * `<Badge />` is a small inline label for status or category information,
 * with semantic tone coloring and two size presets.
 */
const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Small inline label for status or category information with subtle-background + stronger-text tone pairing.',
      },
    },
  },
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: ['neutral', 'positive', 'negative', 'warning', 'info', 'accent'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
  args: {
    tone: 'neutral',
    size: 'md',
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ---------- Default ----------

export const Default: Story = {};

// ---------- All Tones ----------

export const AllTones: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six tone variants displayed side by side.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ledger-space-3)', alignItems: 'center' }}>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="positive">Positive</Badge>
      <Badge tone="negative">Negative</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="accent">Accent</Badge>
    </div>
  ),
};

// ---------- Small ----------

export const Small: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ledger-space-3)', alignItems: 'center' }}>
      <Badge tone="neutral" size="sm">Neutral</Badge>
      <Badge tone="positive" size="sm">Completed</Badge>
      <Badge tone="negative" size="sm">Overdue</Badge>
      <Badge tone="warning" size="sm">Due Soon</Badge>
      <Badge tone="info" size="sm">New</Badge>
      <Badge tone="accent" size="sm">Premium</Badge>
    </div>
  ),
};

// ---------- Large (md is the larger size) ----------

export const Large: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ledger-space-3)', alignItems: 'center' }}>
      <Badge tone="positive" size="md">Approved</Badge>
      <Badge tone="negative" size="md">Declined</Badge>
      <Badge tone="accent" size="md">VIP</Badge>
    </div>
  ),
};

// ---------- In Context ----------

export const InContext: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badges used inside a Card alongside other content.',
      },
    },
  },
  render: () => (
    <Card variant="raised" padding="md" style={{ maxWidth: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--ledger-color-text-primary)',
            }}
          >
            Wire Transfer #4821
          </span>
          <Badge tone="positive">Completed</Badge>
        </div>
        <div style={{ display: 'flex', gap: 'var(--ledger-space-3)' }}>
          <Badge tone="accent" size="sm">Priority</Badge>
          <Badge tone="info" size="sm">Domestic</Badge>
        </div>
        <span
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '13px',
            color: 'var(--ledger-color-text-muted)',
          }}
        >
          Processed on Apr 8, 2026
        </span>
      </div>
    </Card>
  ),
};
