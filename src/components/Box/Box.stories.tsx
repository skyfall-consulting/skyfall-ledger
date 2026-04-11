import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Box } from './Box';

/**
 * Layout / Box
 *
 * `<Box />` is a generic polymorphic container with shorthand props for
 * padding, margin, background, border, and display. It covers the most
 * common layout needs without a full styled-system.
 */
const meta: Meta<typeof Box> = {
  title: 'Components/Layout/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A generic polymorphic container with common layout style props for padding, margin, background, border, and display.',
      },
    },
  },
  argTypes: {
    as: { control: 'text' },
    padding: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    paddingX: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    paddingY: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    margin: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    background: { control: 'text' },
    borderRadius: { control: 'text' },
    border: { control: 'text' },
    display: {
      control: { type: 'select' },
      options: ['block', 'flex', 'inline-flex', 'grid', 'inline', 'none'],
    },
  },
  args: {
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

// -- Helpers -----------------------------------------------------------------

const InnerText: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: '14px',
      color: 'var(--ledger-color-text-primary)',
    }}
  >
    {text}
  </span>
);

// ---------- Default ----------

export const Default: Story = {
  args: {
    padding: 5,
    children: <InnerText text="Default Box with padding=5 (16px)." />,
  },
};

// ---------- WithPadding ----------

export const WithPadding: Story = {
  args: {
    padding: 8,
    background: 'var(--ledger-color-surface-raised)',
    borderRadius: 'var(--ledger-radius-md)',
    children: <InnerText text="Box with padding=8 (32px), raised surface, and medium radius." />,
  },
};

// ---------- WithBackground ----------

export const WithBackground: Story = {
  render: () => (
    <Box
      padding={7}
      background="var(--ledger-color-surface-raised)"
      borderRadius="var(--ledger-radius-md)"
      border="1px solid var(--ledger-color-border-subtle)"
    >
      <InnerText text="Box with background, border, and border radius." />
    </Box>
  ),
};

// ---------- Composed ----------

export const Composed: Story = {
  render: () => (
    <Box padding={7} background="var(--ledger-color-surface-default)">
      <Box
        padding={5}
        paddingX={7}
        background="var(--ledger-color-surface-raised)"
        borderRadius="var(--ledger-radius-md)"
        border="1px solid var(--ledger-color-border-subtle)"
      >
        <InnerText text="Inner Box with paddingX=7 override inside an outer Box." />
      </Box>
    </Box>
  ),
};

// ---------- AsSection ----------

export const AsSection: Story = {
  args: {
    as: 'section',
    padding: 8,
    paddingY: 10,
    background: 'var(--ledger-color-surface-raised)',
    borderRadius: 'var(--ledger-radius-lg)',
    children: (
      <div>
        <h3
          style={{
            margin: 0,
            marginBottom: 'var(--ledger-space-4)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--ledger-color-text-primary)',
          }}
        >
          Account Overview
        </h3>
        <InnerText text="Rendered as a <section> element with paddingY=10 and large radius." />
      </div>
    ),
  },
};
