import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Stack } from './Stack';

/**
 * Layout / Stack
 *
 * `<Stack />` provides a flex-based layout for vertical or horizontal stacking
 * with token-controlled gaps. Supports polymorphic rendering for semantic HTML.
 */
const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flex layout primitive for vertical or horizontal stacking with consistent gap control via spacing tokens.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    gap: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'nav', 'ul', 'ol'],
    },
    wrap: { control: 'boolean' },
  },
  args: {
    direction: 'vertical',
    gap: 5,
    as: 'div',
    wrap: false,
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

// -- Helpers -----------------------------------------------------------------

const Swatch: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      padding: 'var(--ledger-space-5)',
      background: 'var(--ledger-color-surface-raised)',
      border: '1px solid var(--ledger-color-border-subtle)',
      borderRadius: 'var(--ledger-radius-sm)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: '14px',
      color: 'var(--ledger-color-text-primary)',
    }}
  >
    {label}
  </div>
);

// ---------- Default ----------

export const Default: Story = {
  args: {
    children: (
      <>
        <Swatch label="Item 1" />
        <Swatch label="Item 2" />
        <Swatch label="Item 3" />
      </>
    ),
  },
};

// ---------- Horizontal ----------

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    children: (
      <>
        <Swatch label="Left" />
        <Swatch label="Center" />
        <Swatch label="Right" />
      </>
    ),
  },
};

// ---------- WithGap ----------

export const WithGap: Story = {
  render: () => (
    <Stack direction="horizontal" gap={8}>
      <Stack gap={3}>
        <Swatch label="gap=3 A" />
        <Swatch label="gap=3 B" />
      </Stack>
      <Stack gap={8}>
        <Swatch label="gap=8 A" />
        <Swatch label="gap=8 B" />
      </Stack>
    </Stack>
  ),
};

// ---------- Nested ----------

export const Nested: Story = {
  render: () => (
    <Stack gap={7}>
      <Swatch label="Top-level item" />
      <Stack direction="horizontal" gap={5}>
        <Swatch label="Nested H-1" />
        <Swatch label="Nested H-2" />
        <Swatch label="Nested H-3" />
      </Stack>
      <Swatch label="Bottom-level item" />
    </Stack>
  ),
};

// ---------- AsNav ----------

export const AsNav: Story = {
  args: {
    as: 'nav',
    direction: 'horizontal',
    gap: 6,
    children: (
      <>
        <a
          href="#"
          style={{
            color: 'var(--ledger-color-text-primary)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          Dashboard
        </a>
        <a
          href="#"
          style={{
            color: 'var(--ledger-color-text-secondary)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          Transactions
        </a>
        <a
          href="#"
          style={{
            color: 'var(--ledger-color-text-secondary)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          Settings
        </a>
      </>
    ),
  },
};
