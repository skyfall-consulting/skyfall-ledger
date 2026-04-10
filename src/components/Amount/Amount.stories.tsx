import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Amount } from './Amount';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamily, fontSize, fontWeight, tracking } from '../../tokens/typography';

/**
 * Primitives / Amount
 *
 * `<Amount />` is the lowest-level monetary primitive in Skyfall Ledger.
 * Every higher-level money component eventually composes through it.
 */
const meta: Meta<typeof Amount> = {
  title: 'Primitives/Amount',
  component: Amount,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Locale + currency aware money primitive with tabular numerals, sign-driven semantic color, screen-reader-friendly labels, and differential styling for the currency symbol and decimal portion.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'number', step: 0.01 } },
    currency: { control: 'text' },
    locale: { control: 'text' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg', 'xl', 'hero'] },
    tone: {
      control: { type: 'select' },
      options: ['auto', 'neutral', 'positive', 'negative', 'accent', 'muted'],
    },
    sign: { control: { type: 'select' }, options: ['auto', 'always', 'never', 'accounting'] },
    decimals: { control: { type: 'select' }, options: ['auto', 'hide', 0, 2, 4] },
    compact: { control: 'boolean' },
    weight: {
      control: { type: 'select' },
      options: [undefined, 'regular', 'medium', 'semibold', 'bold'],
    },
    dimDecimals: { control: 'boolean' },
    dimSymbol: { control: 'boolean' },
  },
  args: {
    value: 1284.52,
    currency: 'USD',
    locale: 'en-US',
    size: 'md',
    tone: 'neutral',
    sign: 'auto',
    decimals: 'auto',
    compact: false,
    dimDecimals: false,
    dimSymbol: false,
  },
};

export default meta;
type Story = StoryObj<typeof Amount>;

// ---------- Default ----------

export const Default: Story = {};

// ---------- Tones ----------

export const Positive: Story = {
  args: { value: 248.9, tone: 'auto', sign: 'always' },
};

export const Negative: Story = {
  args: { value: -83.45, tone: 'auto', sign: 'auto' },
};

export const Zero: Story = {
  args: { value: 0, tone: 'auto' },
};

export const Accent: Story = {
  args: { value: 5_280, tone: 'accent', size: 'lg' },
};

export const Muted: Story = {
  args: { value: 12.0, tone: 'muted' },
};

// ---------- Hero treatment ----------

export const Hero: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The hero size — used by `BalanceHero` and onboarding surfaces. Pair with `dimDecimals` for the de-emphasized cents treatment.',
      },
    },
  },
  args: {
    value: 12_840.52,
    size: 'hero',
    tone: 'neutral',
    dimDecimals: true,
  },
};

// ---------- Locales / currencies ----------

export const Euro: Story = {
  args: { value: 1284.52, currency: 'EUR', locale: 'de-DE', size: 'lg' },
};

export const Yen: Story = {
  args: { value: 128_452, currency: 'JPY', locale: 'ja-JP', size: 'lg' },
};

export const Pound: Story = {
  args: { value: 1284.52, currency: 'GBP', locale: 'en-GB', size: 'lg' },
};

// ---------- Compact / decimals ----------

export const Compact: Story = {
  args: { value: 1_284_902, compact: true, size: 'lg' },
};

export const WithoutDecimals: Story = {
  args: { value: 1284.52, decimals: 'hide' },
};

export const FourDecimals: Story = {
  args: { value: 0.0142, decimals: 4 },
};

// ---------- Sign treatments ----------

export const SignAlways: Story = {
  args: { value: 248.9, sign: 'always', tone: 'auto', size: 'lg' },
};

export const Accounting: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Accounting-style negatives wrap the figure in parentheses and drop the leading minus.',
      },
    },
  },
  args: { value: -1284.52, sign: 'accounting', tone: 'auto', size: 'lg' },
};

// ---------- Invalid ----------

export const Invalid: Story = {
  args: { value: NaN },
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
      gap: space[3],
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

export const Grid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A snapshot of every prominent treatment side-by-side.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: space[5],
      }}
    >
      <GridCell label="md · neutral">
        <Amount value={1284.52} />
      </GridCell>
      <GridCell label="lg · positive · always">
        <Amount value={248.9} size="lg" tone="auto" sign="always" />
      </GridCell>
      <GridCell label="lg · negative">
        <Amount value={-83.45} size="lg" tone="auto" />
      </GridCell>
      <GridCell label="xl · accent">
        <Amount value={5280} size="xl" tone="accent" />
      </GridCell>
      <GridCell label="hero · dim decimals">
        <Amount value={12840.52} size="hero" dimDecimals />
      </GridCell>
      <GridCell label="EUR · de-DE">
        <Amount value={1284.52} currency="EUR" locale="de-DE" size="lg" />
      </GridCell>
      <GridCell label="JPY · ja-JP">
        <Amount value={128452} currency="JPY" locale="ja-JP" size="lg" />
      </GridCell>
      <GridCell label="compact">
        <Amount value={1_284_902} compact size="lg" />
      </GridCell>
      <GridCell label="accounting">
        <Amount value={-1284.52} sign="accounting" tone="auto" size="lg" />
      </GridCell>
      <GridCell label="invalid">
        <Amount value={NaN} size="lg" />
      </GridCell>
    </div>
  ),
};
