import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Container } from './Container';
import { Card } from '../Card';

/**
 * Layout / Container
 *
 * `<Container />` provides a max-width centered wrapper with responsive
 * horizontal padding, sized via `containerMaxWidth` layout tokens.
 */
const meta: Meta<typeof Container> = {
  title: 'Components/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Container -- Max-width centered wrapper with responsive horizontal padding. Sizes map to `containerMaxWidth` layout tokens and serve as the top-level page constraint in dashboard and detail layouts.\n\nUsage:\n- Use as the outermost content wrapper to enforce consistent max-width across pages\n- Supports polymorphic rendering (`div`, `section`, `main`) for semantic HTML\n- Set `center={false}` for full-width layouts that still need consistent horizontal padding',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Max-width preset from `containerMaxWidth` layout tokens.',
    },
    padding: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      description: 'Horizontal padding mapped to a Ledger space token (0--13).',
    },
    center: {
      control: 'boolean',
      description: 'Whether to center the container with auto margins.',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'main'],
      description: 'Polymorphic root element tag.',
    },
  },
  args: {
    size: 'lg',
    padding: 7,
    center: true,
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

// -- Helpers -----------------------------------------------------------------

const Outline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      border: '2px dashed var(--ledger-color-border-subtle)',
      borderRadius: 'var(--ledger-radius-sm)',
      padding: 'var(--ledger-space-5)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: '14px',
      color: 'var(--ledger-color-text-primary)',
    }}
  >
    {children}
  </div>
);

// ---------- Default ----------

export const Default: Story = {
  args: {
    children: (
      <Outline>
        Default container (lg -- max-width 1024px) centered with padding=7 (24px).
      </Outline>
    ),
  },
};

// ---------- Sizes ----------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-6)' }}>
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
        <Container key={s} size={s}>
          <Outline>size=&quot;{s}&quot;</Outline>
        </Container>
      ))}
    </div>
  ),
};

// ---------- WithContent ----------

export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic dashboard layout using Container as the page wrapper with Card children.',
      },
    },
  },
  render: () => (
    <Container size="xl" as="main" padding={8}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-6)' }}>
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--ledger-color-text-primary)',
          }}
        >
          Dashboard
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ledger-space-5)' }}>
          <Card variant="raised" padding="md">
            <span
              style={{
                fontFamily: 'var(--ledger-font-sans)',
                fontSize: '14px',
                color: 'var(--ledger-color-text-primary)',
              }}
            >
              Total Revenue
            </span>
          </Card>
          <Card variant="raised" padding="md">
            <span
              style={{
                fontFamily: 'var(--ledger-font-sans)',
                fontSize: '14px',
                color: 'var(--ledger-color-text-primary)',
              }}
            >
              Active Accounts
            </span>
          </Card>
          <Card variant="raised" padding="md">
            <span
              style={{
                fontFamily: 'var(--ledger-font-sans)',
                fontSize: '14px',
                color: 'var(--ledger-color-text-primary)',
              }}
            >
              Pending Transfers
            </span>
          </Card>
        </div>
      </div>
    </Container>
  ),
};

// ---------- FullWidth ----------

export const FullWidth: Story = {
  args: {
    center: false,
    padding: 5,
    children: (
      <Outline>
        Full-width container (center=false) -- spans entire parent width with padding=5.
      </Outline>
    ),
  },
};
