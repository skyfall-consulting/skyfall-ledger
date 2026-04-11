import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Button } from './Button';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamily, fontSize, fontWeight as fontWeightTokens, tracking } from '../../tokens/typography';

/**
 * Components / Button
 *
 * The primary action surface in Skyfall Ledger. Supports four variants,
 * three sizes, loading state, and full-width layout.
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Button -- the primary interactive action surface in Skyfall Ledger. Supports four variants (primary, secondary, ghost, danger), three sizes, a loading state with an animated spinner, and full-width layout.\n\nAccessibility:\n- Renders a native `<button>` element, inheriting full keyboard operability.\n- Sets `aria-busy` when in the loading state so assistive technology can announce pending operations.\n- The loading spinner is marked `aria-hidden` to prevent redundant announcements.\n- Uses the `.ledger-focus-ring` utility for a consistent, high-contrast focus indicator.\n- Defaults to `type="button"` to prevent accidental form submissions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual treatment of the button.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Control height preset.',
    },
    loading: { control: 'boolean', description: 'Shows a spinner and disables interaction.' },
    disabled: { control: 'boolean', description: 'Prevents interaction and dims the button.' },
    fullWidth: { control: 'boolean', description: 'Stretches the button to fill its container width.' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ---------- Variants ----------

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Confirm Transfer' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'View Details' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete Account' },
};

// ---------- Sizes ----------

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

// ---------- States ----------

export const Loading: Story = {
  args: { loading: true, children: 'Processing...' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Unavailable' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width Action' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

// ---------- With Icons ----------

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Buttons paired with inline SVG icons for common financial actions.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: space[4], flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">
        <PlusIcon /> Add Account
      </Button>
      <Button variant="secondary">
        Continue <ArrowIcon />
      </Button>
      <Button variant="ghost" size="sm">
        <PlusIcon /> Add Filter
      </Button>
      <Button variant="danger">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Remove
      </Button>
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
    <div style={{ display: 'flex', gap: space[3], alignItems: 'center', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Every variant at every size, including loading and disabled states.',
      },
    },
  },
  render: () => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'] as const;
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
              <Button key={size} variant={variant} size={size}>
                {size.toUpperCase()}
              </Button>
            ))}
          </GridCell>
        ))}
        <GridCell label="loading">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} loading>
              Loading
            </Button>
          ))}
        </GridCell>
        <GridCell label="disabled">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              Disabled
            </Button>
          ))}
        </GridCell>
      </div>
    );
  },
};
