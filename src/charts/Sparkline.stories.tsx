import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Sparkline } from './Sparkline';
import { Amount } from '../components/Amount';
import { space } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { fontFamily, fontSize, fontWeight, tracking } from '../tokens/typography';

/**
 * Charts / Sparkline
 *
 * The smallest possible chart in Skyfall Ledger. One line, no axes, no
 * tooltip — meant to live next to a number, not replace it.
 */
const meta: Meta<typeof Sparkline> = {
  title: 'Ledger X/Charts/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sparkline -- The smallest possible chart in Ledger. A single line with no axes and no tooltip, designed to live inline next to a number in cards, table rows, and KPI tiles. Built on Recharts and themed via `useChartTheme()`.\n\nAccessibility:\n- Wrapper renders as `<figure>` with `role="figure"` -- consumers must provide a descriptive `ariaLabel` (e.g. "Account balance trend, last 30 days, +4.2%")\n- Honors `prefers-reduced-motion` via `useReducedMotion()` -- entry animation is automatically disabled\n- The line path is purely decorative; the numeric value should live in an adjacent `<Amount>` or text element\n\nUsage:\n- Pass a flat `number[]` for the simplest case, or `{ x, y }[]` when points need labels\n- `tone="auto"` (default) derives color from the first-to-last value delta: positive trend = green, negative = red\n- Renders inside `ThemedResponsiveContainer` for layout-shift-free sizing',
      },
    },
  },
  argTypes: {
    height: {
      control: { type: 'number', min: 16, max: 200, step: 4 },
      description: 'Pixel height of the sparkline.',
    },
    tone: {
      control: { type: 'select' },
      options: ['auto', 'accent', 'positive', 'negative', 'neutral'],
      description: 'Color/role. `auto` derives from first-to-last delta.',
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 4, step: 0.5 },
      description: 'Stroke width override. Defaults to 2 (1.5 for height < 28).',
    },
    animate: {
      control: 'boolean',
      description: 'Disable the entry animation. Always disabled when `prefers-reduced-motion` is active.',
    },
    ariaLabel: {
      description: 'Required accessible label for the `<figure>` wrapper.',
    },
  },
  args: {
    ariaLabel: 'Account balance trend, last 30 days',
    height: 48,
    tone: 'auto',
    animate: true,
  },
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

// ---------- Sample series ----------

const upward = [12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 26, 28];
const downward = [28, 26, 27, 24, 22, 23, 20, 18, 19, 16, 14, 12];
const flat = [20, 21, 19, 20, 20, 21, 19, 20, 21, 20, 19, 20];
const volatile = [10, 18, 12, 22, 8, 24, 14, 28, 16, 30, 12, 26, 18, 32];

// ---------- Layout helper ----------

const Frame: React.FC<{ width?: number; children: React.ReactNode }> = ({
  width = 280,
  children,
}) => <div style={{ width }}>{children}</div>;

// ---------- Stories ----------

export const AutoUp: Story = {
  args: { data: upward },
  render: (args) => (
    <Frame>
      <Sparkline {...args} />
    </Frame>
  ),
};

export const AutoDown: Story = {
  args: { data: downward },
  render: (args) => (
    <Frame>
      <Sparkline {...args} />
    </Frame>
  ),
};

export const Flat: Story = {
  args: { data: flat },
  render: (args) => (
    <Frame>
      <Sparkline {...args} />
    </Frame>
  ),
};

export const Accent: Story = {
  args: { data: upward, tone: 'accent' },
  render: (args) => (
    <Frame>
      <Sparkline {...args} />
    </Frame>
  ),
};

export const Positive: Story = {
  args: { data: volatile, tone: 'positive' },
  render: (args) => (
    <Frame>
      <Sparkline {...args} />
    </Frame>
  ),
};

export const Negative: Story = {
  args: { data: volatile, tone: 'negative' },
  render: (args) => (
    <Frame>
      <Sparkline {...args} />
    </Frame>
  ),
};

export const Small: Story = {
  args: { data: upward, height: 20 },
  render: (args) => (
    <Frame width={120}>
      <Sparkline {...args} />
    </Frame>
  ),
};

export const Large: Story = {
  args: { data: volatile, height: 96, tone: 'accent' },
  render: (args) => (
    <Frame width={420}>
      <Sparkline {...args} />
    </Frame>
  ),
};

export const Empty: Story = {
  args: { data: [], ariaLabel: 'No data available' },
  render: (args) => (
    <Frame>
      <Sparkline {...args} />
    </Frame>
  ),
};

// ---------- Composition with Amount ----------

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 320,
      padding: space[7],
      borderRadius: radius.lg,
      border: '1px solid var(--ledger-color-border-subtle)',
      background: 'var(--ledger-color-surface-raised)',
      display: 'flex',
      flexDirection: 'column',
      gap: space[5],
    }}
  >
    {children}
  </div>
);

export const InsideCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'How the sparkline is meant to live in the wild — composed beside an `<Amount />` inside a card. The trend line carries the story; the figure carries the value.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: space[7], flexWrap: 'wrap' }}>
      <Card>
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: fontSize.label,
            fontWeight: fontWeight.semibold,
            textTransform: 'uppercase',
            letterSpacing: tracking.label,
            color: 'var(--ledger-color-text-muted)',
          }}
        >
          Checking
        </div>
        <Amount value={12_840.52} size="xl" />
        <Sparkline data={upward} ariaLabel="Checking balance trend, +11% over 30 days" />
      </Card>
      <Card>
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: fontSize.label,
            fontWeight: fontWeight.semibold,
            textTransform: 'uppercase',
            letterSpacing: tracking.label,
            color: 'var(--ledger-color-text-muted)',
          }}
        >
          Spending
        </div>
        <Amount value={-2_184.18} size="xl" tone="auto" />
        <Sparkline data={downward} ariaLabel="Spending trend, -8% over 30 days" />
      </Card>
    </div>
  ),
};
