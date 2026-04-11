import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grid, GridItem } from './Grid';
import { Card } from '../Card';

/**
 * Layout / Grid
 *
 * `<Grid />` and `<GridItem />` provide CSS Grid layout with token-driven
 * gaps and helpers for column span / start positioning.
 */
const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CSS Grid layout with token-driven gaps. Use GridItem for column span and start control.',
      },
    },
  },
  argTypes: {
    columns: { control: 'text' },
    gap: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    rowGap: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    columnGap: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    alignItems: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
  args: {
    columns: 12,
    gap: 5,
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// -- Helpers -----------------------------------------------------------------

const Cell: React.FC<{ label: string; height?: string }> = ({ label, height }) => (
  <div
    style={{
      padding: 'var(--ledger-space-5)',
      background: 'var(--ledger-color-surface-raised)',
      border: '1px solid var(--ledger-color-border-subtle)',
      borderRadius: 'var(--ledger-radius-sm)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: '13px',
      color: 'var(--ledger-color-text-primary)',
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {label}
  </div>
);

// ---------- Default ----------

export const Default: Story = {
  render: () => (
    <Grid columns={4} gap={5}>
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
      <Cell label="5" />
      <Cell label="6" />
      <Cell label="7" />
      <Cell label="8" />
    </Grid>
  ),
};

// ---------- ThreeColumn ----------

export const ThreeColumn: Story = {
  render: () => (
    <Grid columns={3} gap={6}>
      <Cell label="Column 1" />
      <Cell label="Column 2" />
      <Cell label="Column 3" />
    </Grid>
  ),
};

// ---------- WithSpan ----------

export const WithSpan: Story = {
  render: () => (
    <Grid columns={12} gap={5}>
      <GridItem span={8}>
        <Cell label="span=8" />
      </GridItem>
      <GridItem span={4}>
        <Cell label="span=4" />
      </GridItem>
      <GridItem span={3}>
        <Cell label="span=3" />
      </GridItem>
      <GridItem span={6}>
        <Cell label="span=6" />
      </GridItem>
      <GridItem span={3}>
        <Cell label="span=3" />
      </GridItem>
      <GridItem span={4} start={5}>
        <Cell label="span=4, start=5" />
      </GridItem>
    </Grid>
  ),
};

// ---------- Dashboard ----------

export const Dashboard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A realistic dashboard layout composing Grid with Card components.',
      },
    },
  },
  render: () => (
    <Grid columns={12} gap={6}>
      <GridItem span={4}>
        <Card variant="raised" padding="md">
          <div
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              color: 'var(--ledger-color-text-primary)',
            }}
          >
            <div style={{ fontSize: '13px', color: 'var(--ledger-color-text-muted)' }}>
              Total Balance
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, marginTop: 'var(--ledger-space-3)' }}>
              $48,291.64
            </div>
          </div>
        </Card>
      </GridItem>
      <GridItem span={4}>
        <Card variant="raised" padding="md">
          <div
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              color: 'var(--ledger-color-text-primary)',
            }}
          >
            <div style={{ fontSize: '13px', color: 'var(--ledger-color-text-muted)' }}>
              Monthly Income
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, marginTop: 'var(--ledger-space-3)' }}>
              $12,840.00
            </div>
          </div>
        </Card>
      </GridItem>
      <GridItem span={4}>
        <Card variant="raised" padding="md">
          <div
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              color: 'var(--ledger-color-text-primary)',
            }}
          >
            <div style={{ fontSize: '13px', color: 'var(--ledger-color-text-muted)' }}>
              Pending
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, marginTop: 'var(--ledger-space-3)' }}>
              $3,120.50
            </div>
          </div>
        </Card>
      </GridItem>
      <GridItem span={8}>
        <Card variant="outlined" padding="lg">
          <div
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: '14px',
              color: 'var(--ledger-color-text-primary)',
              minHeight: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Chart area (span=8)
          </div>
        </Card>
      </GridItem>
      <GridItem span={4}>
        <Card variant="outlined" padding="lg">
          <div
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: '14px',
              color: 'var(--ledger-color-text-primary)',
              minHeight: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Recent activity (span=4)
          </div>
        </Card>
      </GridItem>
    </Grid>
  ),
};

// ---------- Responsive ----------

export const Responsive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates using a CSS string for columns to get responsive behavior via minmax and auto-fit.',
      },
    },
  },
  render: () => (
    <Grid columns="repeat(auto-fit, minmax(200px, 1fr))" gap={5}>
      <Cell label="Auto 1" height="100px" />
      <Cell label="Auto 2" height="100px" />
      <Cell label="Auto 3" height="100px" />
      <Cell label="Auto 4" height="100px" />
      <Cell label="Auto 5" height="100px" />
      <Cell label="Auto 6" height="100px" />
    </Grid>
  ),
};
