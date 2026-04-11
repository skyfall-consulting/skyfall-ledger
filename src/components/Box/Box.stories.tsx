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
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Box -- Generic polymorphic container with shorthand style props for padding, margin, background, border, and display. Maps spacing values to Ledger design tokens via CSS custom properties.\n\nUsage:\n- Use as a foundational layout building block for composing card layouts, section wrappers, and spacing containers\n- Supports polymorphic rendering via the `as` prop for semantic HTML (`section`, `article`, `nav`, etc.)\n- Spacing props accept token keys (0--13) that resolve to `--ledger-space-*` CSS variables',
      },
    },
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'Polymorphic root element tag. Defaults to `div`.',
    },
    padding: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      description: 'All-sides padding mapped to a Ledger space token (0--13).',
    },
    paddingX: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      description: 'Horizontal padding (left + right) mapped to a Ledger space token.',
    },
    paddingY: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      description: 'Vertical padding (top + bottom) mapped to a Ledger space token.',
    },
    margin: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      description: 'All-sides margin mapped to a Ledger space token.',
    },
    background: {
      control: 'text',
      description: 'Background color -- CSS variable or raw value.',
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius -- CSS variable or raw value.',
    },
    border: {
      control: 'text',
      description: 'CSS border shorthand.',
    },
    display: {
      control: { type: 'select' },
      options: ['block', 'flex', 'inline-flex', 'grid', 'inline', 'none'],
      description: 'CSS display value.',
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
  parameters: {
    docs: {
      description: {
        story: 'Nested Box composition with inner paddingX override inside an outer Box.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Polymorphic rendering as a `<section>` element for semantic HTML.',
      },
    },
  },
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
