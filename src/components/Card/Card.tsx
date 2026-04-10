/**
 * Skyfall Ledger -- <Card />
 *
 * A container surface for content grouping. The dominant container
 * in fintech UI, supporting raised, outlined, and flat variants
 * with configurable padding and polymorphic element rendering.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type CardVariant = 'raised' | 'outlined' | 'flat';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardAs = 'div' | 'section' | 'article';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual treatment. @default 'raised' */
  variant?: CardVariant;
  /** Inner padding preset. @default 'md' */
  padding?: CardPadding;
  /** Polymorphic root element. @default 'div' */
  as?: CardAs;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Padding map
// ---------------------------------------------------------------------------
const PADDING_MAP: Record<CardPadding, string> = {
  none: '0',
  sm: 'var(--ledger-space-5)',   // 16px
  md: 'var(--ledger-space-7)',   // 24px
  lg: 'var(--ledger-space-8)',   // 32px
};

// ---------------------------------------------------------------------------
// Variant style resolver
// ---------------------------------------------------------------------------
const variantStyles = (variant: CardVariant): React.CSSProperties => {
  switch (variant) {
    case 'raised':
      return {
        background: 'var(--ledger-color-surface-raised)',
        boxShadow: 'var(--ledger-shadow-2)',
        borderRadius: 'var(--ledger-radius-md)',
      };
    case 'outlined':
      return {
        background: 'var(--ledger-color-surface-default)',
        border: '1px solid var(--ledger-color-border-subtle)',
        borderRadius: 'var(--ledger-radius-md)',
      };
    case 'flat':
      return {
        background: 'var(--ledger-color-surface-default)',
        borderRadius: 'var(--ledger-radius-md)',
      };
  }
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      variant = 'raised',
      padding = 'md',
      as: Tag = 'div',
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const mergedStyle: React.CSSProperties = {
      ...variantStyles(variant),
      padding: PADDING_MAP[padding],
      ...style,
    };

    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={className}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Card.displayName = 'Card';
