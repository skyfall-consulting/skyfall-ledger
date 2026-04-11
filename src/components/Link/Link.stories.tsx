import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Link } from './Link';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamily, fontSize, fontWeight as fontWeightTokens, tracking } from '../../tokens/typography';

/**
 * Navigation / Link
 *
 * Styled anchor primitive for inline and standalone navigation in
 * Skyfall Ledger. Supports three variants, three sizes, external link
 * handling, and a disabled state.
 */
const meta: Meta<typeof Link> = {
  title: 'Components/Navigation/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Anchor element with default, subtle, and standalone variants. Uses scoped CSS custom properties for theme-aware hover/focus transitions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'subtle', 'standalone'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    external: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    size: 'md',
    external: false,
    disabled: false,
    children: 'View account details',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

// ---------- Variants ----------

export const Default: Story = {};

export const Subtle: Story = {
  args: { variant: 'subtle', children: 'Transaction history' },
};

export const Standalone: Story = {
  args: { variant: 'standalone', children: 'View all transactions' },
};

// ---------- Sizes ----------

export const Small: Story = {
  args: { size: 'sm', children: 'Terms & conditions' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'View account details' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Open portfolio dashboard' },
};

// ---------- External ----------

export const ExternalLink: Story = {
  args: {
    external: true,
    children: 'SEC filing (external)',
    href: 'https://example.com',
  },
};

export const ExternalStandalone: Story = {
  args: {
    variant: 'standalone',
    external: true,
    children: 'Regulatory disclosures',
    href: 'https://example.com',
  },
};

// ---------- Disabled ----------

export const Disabled: Story = {
  args: { disabled: true, children: 'Pending verification' },
};

// ---------- In-context ----------

export const InlineInText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A link inline within body copy, matching surrounding text size.',
      },
    },
  },
  render: () => (
    <p
      style={{
        fontFamily: fontFamily.sans,
        fontSize: fontSize['body-md'],
        color: 'var(--ledger-color-text-primary)',
        lineHeight: '20px',
        maxWidth: 520,
      }}
    >
      Your monthly statement for March 2026 is ready.{' '}
      <Link href="#">Download statement</Link> or{' '}
      <Link href="#" variant="subtle">view transaction history</Link>.
    </p>
  ),
};

// ---------- Grid cell helper ----------

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
        fontWeight: fontWeightTokens.semibold,
        color: 'var(--ledger-color-text-muted)',
      }}
    >
      {label}
    </div>
    <div style={{ display: 'flex', gap: space[5], alignItems: 'center', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

// ---------- All variants ----------

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Every variant at every size, including external and disabled states.',
      },
    },
  },
  render: () => {
    const variants = ['default', 'subtle', 'standalone'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: space[5],
        }}
      >
        {variants.map((variant) => (
          <GridCell key={variant} label={variant}>
            {sizes.map((size) => (
              <Link key={size} href="#" variant={variant} size={size}>
                {size.toUpperCase()}
              </Link>
            ))}
          </GridCell>
        ))}
        <GridCell label="external">
          {variants.map((variant) => (
            <Link key={variant} href="https://example.com" variant={variant} external>
              {variant}
            </Link>
          ))}
        </GridCell>
        <GridCell label="disabled">
          {variants.map((variant) => (
            <Link key={variant} href="#" variant={variant} disabled>
              {variant}
            </Link>
          ))}
        </GridCell>
      </div>
    );
  },
};

// ---------- FinTech examples ----------

export const FinTechNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world fintech link patterns across a dashboard context.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5], maxWidth: 480 }}>
      <GridCell label="Account actions">
        <Link href="#">View account details</Link>
        <Link href="#">Download statement</Link>
        <Link href="#" external>Open in banking portal</Link>
      </GridCell>

      <GridCell label="Transaction context">
        <Link href="#" variant="subtle" size="sm">REF-2026-03-0847</Link>
        <Link href="#" variant="subtle" size="sm">Matched rule: Auto-categorize</Link>
      </GridCell>

      <GridCell label="Navigation">
        <Link href="#" variant="standalone">Transaction history</Link>
        <Link href="#" variant="standalone">Portfolio overview</Link>
        <Link href="#" variant="standalone" external>Regulatory disclosures</Link>
      </GridCell>

      <GridCell label="Disabled (pending)">
        <Link href="#" disabled>Approve wire transfer</Link>
        <Link href="#" variant="standalone" disabled>Generate tax report</Link>
      </GridCell>
    </div>
  ),
};
