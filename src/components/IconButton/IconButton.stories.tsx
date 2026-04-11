import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { IconButton } from './IconButton';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamily, fontSize, fontWeight, tracking } from '../../tokens/typography';

// ---------------------------------------------------------------------------
// Sample icons (inline SVG)
// ---------------------------------------------------------------------------
const CloseIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

const SearchIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 6h18M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Components / IconButton
 *
 * A square, icon-only action surface. Supports ghost and secondary variants.
 * Always requires an `aria-label` for accessibility.
 */
const meta: Meta<typeof IconButton> = {
  title: 'Inputs/Icon Button',
  component: IconButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Square icon-only button restricted to ghost and secondary variants. Requires aria-label for accessibility.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['ghost', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'ghost',
    size: 'md',
    loading: false,
    disabled: false,
    'aria-label': 'Close',
    icon: <CloseIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// ---------- Variants ----------

export const Default: Story = {};

export const Ghost: Story = {
  args: { variant: 'ghost', icon: <MoreIcon />, 'aria-label': 'More options' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', icon: <SearchIcon />, 'aria-label': 'Search' },
};

// ---------- Sizes ----------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: space[4], alignItems: 'center' }}>
      <IconButton size="sm" icon={<CloseIcon />} aria-label="Close (small)" />
      <IconButton size="md" icon={<CloseIcon />} aria-label="Close (medium)" />
      <IconButton size="lg" icon={<CloseIcon />} aria-label="Close (large)" />
    </div>
  ),
};

// ---------- States ----------

export const Disabled: Story = {
  args: { disabled: true, icon: <FilterIcon />, 'aria-label': 'Filter (disabled)' },
};

export const Loading: Story = {
  args: { loading: true, 'aria-label': 'Loading' },
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
    <div style={{ display: 'flex', gap: space[3], alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Ghost and secondary variants across all sizes, including loading and disabled states.',
      },
    },
  },
  render: () => {
    const variants = ['ghost', 'secondary'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    const icons = [<CloseIcon key="close" />, <MoreIcon key="more" />, <SearchIcon key="search" />, <FilterIcon key="filter" />];
    const labels = ['Close', 'More', 'Search', 'Filter'];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: space[5],
        }}
      >
        {variants.map((variant) => (
          <GridCell key={variant} label={variant}>
            {sizes.map((size, i) => (
              <IconButton
                key={size}
                variant={variant}
                size={size}
                icon={icons[i]}
                aria-label={`${labels[i]} (${variant} ${size})`}
              />
            ))}
          </GridCell>
        ))}
        <GridCell label="loading">
          {variants.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              loading
              icon={<CloseIcon />}
              aria-label={`Loading (${variant})`}
            />
          ))}
        </GridCell>
        <GridCell label="disabled">
          {variants.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              disabled
              icon={<CloseIcon />}
              aria-label={`Disabled (${variant})`}
            />
          ))}
        </GridCell>
      </div>
    );
  },
};
