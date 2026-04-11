/**
 * Skyfall Ledger -- <Stack />
 *
 * A flex-based layout primitive for vertical or horizontal stacking
 * with consistent gap control via Ledger spacing tokens. Supports
 * polymorphic rendering for semantic HTML and optional wrapping.
 */
import * as React from 'react';
import type { SpaceToken } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type StackDirection = 'vertical' | 'horizontal';
export type StackAs = 'div' | 'section' | 'nav' | 'ul' | 'ol';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /** Stack direction. @default 'vertical' */
  direction?: StackDirection;
  /** Gap between children, maps to space token key (0-13). @default 5 */
  gap?: SpaceToken;
  /** Cross-axis alignment. */
  align?: React.CSSProperties['alignItems'];
  /** Main-axis alignment. */
  justify?: React.CSSProperties['justifyContent'];
  /** Polymorphic root element. @default 'div' */
  as?: StackAs;
  /** Whether children should wrap. @default false */
  wrap?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 5,
      align,
      justify,
      as: Tag = 'div',
      wrap = false,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const mergedStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap: `var(--ledger-space-${gap})`,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : undefined,
      ...style,
    };

    return (
      <Tag
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        ref={ref as any}
        className={className}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Stack.displayName = 'Stack';
