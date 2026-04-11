import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Paper } from './Paper';

/**
 * Surfaces / Paper
 *
 * `<Paper />` is the foundational surface primitive in Skyfall Ledger.
 * It provides background, border, shadow, and radius without layout
 * opinions -- the atom from which higher-level surfaces compose.
 */
const meta: Meta<typeof Paper> = {
  title: 'Components/Surfaces/Paper',
  component: Paper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Paper -- the foundational surface primitive in Skyfall Ledger.\n\n' +
          'Provides background, elevation (shadow depth 0-4), border, and radius tokens without layout opinions. ' +
          'Paper is the atom from which Card, Modal content areas, Drawer panels, and other surface components compose. ' +
          'Use Paper when you need granular control over elevation, surface tone, and border presence without preset variant bundles.\n\n' +
          'Accessibility:\n' +
          '- Presentational surface with no implicit ARIA role\n' +
          '- Use the `as` prop (`section`, `article`, `aside`, `main`) to add semantic landmarks when needed\n' +
          '- Pair with `aria-label` or `aria-labelledby` when rendered as a landmark element',
      },
    },
  },
  argTypes: {
    elevation: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4],
      description: 'Shadow depth level (0 = none, 4 = highest).',
    },
    surface: {
      control: { type: 'select' },
      options: ['default', 'raised', 'sunken'],
      description: 'Background tone mapped to Ledger surface tokens.',
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Border radius preset.',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Inner padding preset.',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'aside', 'main'],
      description: 'Polymorphic root element for semantic HTML landmarks.',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to render a 1px border for visual containment.',
    },
  },
  args: {
    elevation: 0,
    surface: 'default',
    radius: 'md',
    padding: 'md',
    bordered: false,
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Paper>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const textStyle: React.CSSProperties = {
  color: 'var(--ledger-color-text-primary)',
  fontFamily: 'var(--ledger-font-sans)',
  fontSize: '14px',
};

// ---------- Default ----------

export const Default: Story = {
  args: {
    children: (
      <span style={textStyle}>
        Default paper surface with no elevation and medium padding.
      </span>
    ),
  },
};

// ---------- Elevation levels ----------

export const ElevationLevels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All five elevation levels (0-4) rendered side by side.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ledger-space-5)' }}>
      {([0, 1, 2, 3, 4] as const).map((level) => (
        <Paper key={level} elevation={level} padding="md" style={{ minWidth: 140 }}>
          <span style={textStyle}>Elevation {level}</span>
        </Paper>
      ))}
    </div>
  ),
};

// ---------- Surface variants ----------

export const SurfaceVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The three surface tones: default, raised, and sunken.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-5)' }}>
      {(['default', 'raised', 'sunken'] as const).map((s) => (
        <Paper key={s} surface={s} padding="md" bordered style={{ minWidth: 160 }}>
          <span style={textStyle}>Surface: {s}</span>
        </Paper>
      ))}
    </div>
  ),
};

// ---------- Bordered ----------

export const Bordered: Story = {
  args: {
    bordered: true,
    padding: 'md',
    children: (
      <span style={textStyle}>
        Paper with a 1px border for visual containment without elevation.
      </span>
    ),
  },
};

// ---------- Radius variants ----------

export const RadiusVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All border-radius options from sharp to large.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-5)' }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
        <Paper key={r} radius={r} elevation={1} padding="md" bordered>
          <span style={textStyle}>Radius: {r}</span>
        </Paper>
      ))}
    </div>
  ),
};

// ---------- With rich content ----------

export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic fintech composition showing account summary content inside Paper.',
      },
    },
  },
  render: () => (
    <Paper elevation={2} surface="raised" padding="lg" bordered radius="lg" style={{ maxWidth: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-4)' }}>
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--ledger-color-text-primary)',
          }}
        >
          Account Overview
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--ledger-font-mono)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--ledger-color-text-primary)',
          }}
        >
          $128,450.32
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '13px',
            color: 'var(--ledger-color-text-muted)',
          }}
        >
          Available balance across all linked accounts.
        </p>
      </div>
    </Paper>
  ),
};

// ---------- Polymorphic element ----------

export const PolymorphicElement: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Paper rendered as a <section> element for semantic landmark usage.',
      },
    },
  },
  args: {
    as: 'section',
    elevation: 1,
    padding: 'md',
    bordered: true,
    'aria-label': 'Transaction filters',
    children: (
      <span style={textStyle}>
        Rendered as a &lt;section&gt; element with aria-label for landmark navigation.
      </span>
    ),
  },
};
