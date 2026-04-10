import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import * as Lucide from './lucide';
import * as Custom from './custom';
import { Icon } from './Icon';
import type { LedgerIconSizeToken, LedgerIconTone } from './iconProps';
import { Receipt, Shield, ArrowLeftRight, FileText, Building2 } from './lucide';
import { fontFamily, fontSize, fontWeight, lineHeight, tracking } from '../tokens/typography';
import { space } from '../tokens/spacing';
import { radius } from '../tokens/radius';

/**
 * Foundations / Icons
 *
 * Skyfall Ledger uses Lucide as its base icon set, plus a small custom
 * finance-glyph extension. Both share the same prop API and can be imported
 * directly or via the `<Icon name="…" />` facade.
 */
const meta: Meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Curated Lucide whitelist + small custom finance set. Both honor the `LedgerIconProps` API: `sizeToken` and `tone` map to design tokens, all other props pass through to Lucide.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ---------- Helpers ----------

const Section: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section
    style={{
      padding: `${space[8]} ${space[10]}`,
      borderBottom: '1px solid var(--ledger-color-border-subtle)',
    }}
  >
    <header style={{ marginBottom: space[7] }}>
      <h2
        style={{
          margin: 0,
          fontFamily: fontFamily.display,
          fontSize: fontSize['title-lg'],
          lineHeight: lineHeight['title-lg'],
          fontWeight: fontWeight.semibold,
          letterSpacing: tracking.tight,
          color: 'var(--ledger-color-text-primary)',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            margin: `${space[2]} 0 0`,
            fontFamily: fontFamily.sans,
            fontSize: fontSize['body-md'],
            lineHeight: lineHeight['body-md'],
            color: 'var(--ledger-color-text-secondary)',
            maxWidth: 720,
          }}
        >
          {description}
        </p>
      )}
    </header>
    {children}
  </section>
);

const IconTile: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: space[3],
      padding: space[5],
      borderRadius: radius.md,
      background: 'var(--ledger-color-surface-raised)',
      border: '1px solid var(--ledger-color-border-subtle)',
      color: 'var(--ledger-color-text-primary)',
      minHeight: 96,
    }}
  >
    {children}
    <div
      style={{
        fontFamily: fontFamily.mono,
        fontSize: fontSize['mono-sm'],
        color: 'var(--ledger-color-text-muted)',
        textAlign: 'center',
        wordBreak: 'break-word',
      }}
    >
      {name}
    </div>
  </div>
);

const Grid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: space[4],
    }}
  >
    {children}
  </div>
);

// ---------- Lucide gallery ----------

export const LucideGallery: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The full curated Lucide whitelist. Each icon is named, tree-shakable, and addressable both via direct import and via the `<Icon name="kebab-case" />` facade.',
      },
    },
  },
  render: () => {
    const entries = Object.entries(Lucide) as Array<
      [string, React.ComponentType<{ size?: number }>]
    >;
    return (
      <Section
        title={`Lucide whitelist · ${entries.length} icons`}
        description="The base set every Ledger surface draws from. Add to `src/icons/lucide.ts` to extend."
      >
        <Grid>
          {entries.map(([name, Component]) => (
            <IconTile key={name} name={name}>
              <Component size={24} />
            </IconTile>
          ))}
        </Grid>
      </Section>
    );
  },
};

// ---------- Custom gallery ----------

export const CustomGallery: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Finance-native concepts Lucide does not cover. Built with `createLucideIcon` so they share the Lucide API exactly.',
      },
    },
  },
  render: () => {
    const entries = Object.entries(Custom) as Array<
      [string, React.ComponentType<{ size?: number }>]
    >;
    return (
      <Section
        title="Custom finance glyphs"
        description="Wave 0 starter set. New custom icons must address a finance-native concept Lucide does not cover and ship with a parity story."
      >
        <Grid>
          {entries.map(([name, Component]) => (
            <IconTile key={name} name={name}>
              <Component size={32} />
            </IconTile>
          ))}
        </Grid>
      </Section>
    );
  },
};

// ---------- Sizes ----------

const SIZE_TOKENS: LedgerIconSizeToken[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '`sizeToken` maps to the Ledger sizing scale and overrides the numeric `size` prop on Lucide. Use tokens; reach for raw `size` only as an escape hatch.',
      },
    },
  },
  render: () => (
    <Section title="Sizes" description="xs · sm · md · lg · xl size tokens.">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: space[8], flexWrap: 'wrap' }}>
        {SIZE_TOKENS.map((token) => (
          <div key={token} style={{ textAlign: 'center' }}>
            <Icon name="wallet" sizeToken={token} />
            <div
              style={{
                marginTop: space[3],
                fontFamily: fontFamily.mono,
                fontSize: fontSize['mono-sm'],
                color: 'var(--ledger-color-text-muted)',
              }}
            >
              {token}
            </div>
          </div>
        ))}
      </div>
    </Section>
  ),
};

// ---------- Tones ----------

const TONES: LedgerIconTone[] = [
  'default',
  'muted',
  'positive',
  'negative',
  'warning',
  'info',
  'accent',
];

export const Tones: Story = {
  parameters: {
    docs: {
      description: {
        story: '`tone` maps to semantic color tokens. Default and accent are the workhorses; positive/negative/warning/info should track the status they describe.',
      },
    },
  },
  render: () => (
    <Section title="Tones" description="Semantic color mapping driven by the design tokens.">
      <div style={{ display: 'flex', gap: space[8], flexWrap: 'wrap' }}>
        {TONES.map((tone) => (
          <div key={tone} style={{ textAlign: 'center' }}>
            <Icon name="trending-up" sizeToken="lg" tone={tone} />
            <div
              style={{
                marginTop: space[3],
                fontFamily: fontFamily.mono,
                fontSize: fontSize['mono-sm'],
                color: 'var(--ledger-color-text-muted)',
              }}
            >
              {tone}
            </div>
          </div>
        ))}
      </div>
    </Section>
  ),
};

// ---------- Parity check ----------

const ParityRow: React.FC<{
  customName: string;
  Custom: React.ComponentType<{ size?: number }>;
  lucideName: string;
  Lucide: React.ComponentType<{ size?: number }>;
}> = ({ customName, Custom, lucideName, Lucide }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: space[5],
      padding: space[5],
      borderRadius: radius.md,
      border: '1px solid var(--ledger-color-border-subtle)',
      background: 'var(--ledger-color-surface-raised)',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: space[3] }}>
      <Custom size={32} />
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: fontSize['mono-sm'],
          color: 'var(--ledger-color-text-primary)',
        }}
      >
        Custom · {customName}
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: space[3] }}>
      <Lucide size={32} />
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: fontSize['mono-sm'],
          color: 'var(--ledger-color-text-muted)',
        }}
      >
        Lucide · {lucideName}
      </div>
    </div>
  </div>
);

export const ParityCheck: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Each custom icon next to its closest Lucide peer. Stroke width, cap, and grid must match so the two sets feel like one family.',
      },
    },
  },
  render: () => (
    <Section
      title="Parity check"
      description="Custom finance glyphs visually compared against their nearest Lucide cousin."
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: space[5],
        }}
      >
        <ParityRow
          customName="CardFreeze"
          Custom={Custom.CardFreeze}
          lucideName="Shield"
          Lucide={Shield}
        />
        <ParityRow
          customName="FraudShield"
          Custom={Custom.FraudShield}
          lucideName="Shield"
          Lucide={Shield}
        />
        <ParityRow
          customName="ReceiptLong"
          Custom={Custom.ReceiptLong}
          lucideName="Receipt"
          Lucide={Receipt}
        />
        <ParityRow
          customName="Split"
          Custom={Custom.Split}
          lucideName="ArrowLeftRight"
          Lucide={ArrowLeftRight}
        />
        <ParityRow customName="Iban" Custom={Custom.Iban} lucideName="FileText" Lucide={FileText} />
        <ParityRow
          customName="Iban"
          Custom={Custom.Iban}
          lucideName="Building2"
          Lucide={Building2}
        />
      </div>
    </Section>
  ),
};
