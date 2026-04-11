import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamily, fontSize, fontWeight, tracking } from '../../tokens/typography';

// ---------------------------------------------------------------------------
// Sample icons
// ---------------------------------------------------------------------------
const GridIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ListIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Components / ButtonGroup
 *
 * Layout wrapper that arranges buttons in a horizontal or vertical strip,
 * with optional attached mode for toolbar-style grouping.
 */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Inputs/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'ButtonGroup -- a layout wrapper that arranges Button and IconButton children in a horizontal or vertical strip with spaced or attached spacing modes.\n\nAccessibility:\n- Renders with `role="group"` so assistive technology treats the buttons as a related set.\n- In attached mode, `z-index` management ensures the focus ring of the active button is never clipped by adjacent siblings.\n- Focus-visible outlines are elevated above overlapping borders for clear keyboard navigation.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout axis of the group.',
    },
    spacing: {
      control: { type: 'select' },
      options: ['spaced', 'attached'],
      description: 'Whether children are separated by a gap or sit flush against each other.',
    },
  },
  args: {
    direction: 'horizontal',
    spacing: 'spaced',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// ---------- Default (spaced) ----------

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </ButtonGroup>
  ),
};

// ---------- Attached ----------

export const Attached: Story = {
  args: { spacing: 'attached' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
      <Button variant="secondary">Year</Button>
    </ButtonGroup>
  ),
};

// ---------- Vertical ----------

export const Vertical: Story = {
  args: { direction: 'vertical' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary" fullWidth>Account Settings</Button>
      <Button variant="secondary" fullWidth>Notifications</Button>
      <Button variant="secondary" fullWidth>Security</Button>
    </ButtonGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 260 }}>
        <Story />
      </div>
    ),
  ],
};

// ---------- Vertical Attached ----------

export const VerticalAttached: Story = {
  args: { direction: 'vertical', spacing: 'attached' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary" fullWidth>All</Button>
      <Button variant="secondary" fullWidth>Income</Button>
      <Button variant="secondary" fullWidth>Expenses</Button>
    </ButtonGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
};

// ---------- Mixed variants ----------

export const Mixed: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common real-world pairings: confirm/cancel, destructive actions, and attached icon-button toolbars.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[6] }}>
      <ButtonGroup>
        <Button variant="primary">Confirm</Button>
        <Button variant="ghost">Cancel</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="danger">Delete</Button>
        <Button variant="secondary">Keep</Button>
      </ButtonGroup>

      <ButtonGroup spacing="attached">
        <IconButton variant="secondary" icon={<ChevronLeft />} aria-label="Previous" />
        <IconButton variant="secondary" icon={<ChevronRight />} aria-label="Next" />
      </ButtonGroup>

      <ButtonGroup spacing="attached">
        <IconButton variant="secondary" icon={<GridIcon />} aria-label="Grid view" />
        <IconButton variant="secondary" icon={<ListIcon />} aria-label="List view" />
      </ButtonGroup>
    </div>
  ),
};

// ---------- Grid ----------

const GridCell: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
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
    <div>{children}</div>
  </div>
);

export const AllCombinations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Every direction and spacing combination.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: space[5],
      }}
    >
      <GridCell label="horizontal + spaced">
        <ButtonGroup>
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Discard</Button>
          <Button variant="ghost">Cancel</Button>
        </ButtonGroup>
      </GridCell>
      <GridCell label="horizontal + attached">
        <ButtonGroup spacing="attached">
          <Button variant="secondary">1D</Button>
          <Button variant="secondary">1W</Button>
          <Button variant="secondary">1M</Button>
          <Button variant="secondary">1Y</Button>
          <Button variant="secondary">All</Button>
        </ButtonGroup>
      </GridCell>
      <GridCell label="vertical + spaced">
        <ButtonGroup direction="vertical">
          <Button variant="secondary" fullWidth>Option A</Button>
          <Button variant="secondary" fullWidth>Option B</Button>
          <Button variant="secondary" fullWidth>Option C</Button>
        </ButtonGroup>
      </GridCell>
      <GridCell label="vertical + attached">
        <ButtonGroup direction="vertical" spacing="attached">
          <Button variant="secondary" fullWidth>Top</Button>
          <Button variant="secondary" fullWidth>Middle</Button>
          <Button variant="secondary" fullWidth>Bottom</Button>
        </ButtonGroup>
      </GridCell>
      <GridCell label="icon buttons attached">
        <ButtonGroup spacing="attached">
          <IconButton variant="secondary" icon={<ChevronLeft />} aria-label="Previous" />
          <IconButton variant="secondary" icon={<ChevronRight />} aria-label="Next" />
        </ButtonGroup>
      </GridCell>
      <GridCell label="mixed actions">
        <ButtonGroup>
          <Button variant="danger">Remove</Button>
          <Button variant="ghost">Undo</Button>
        </ButtonGroup>
      </GridCell>
    </div>
  ),
};
