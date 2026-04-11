/**
 * Skyfall Ledger -- <Container />
 *
 * A max-width centered wrapper with responsive horizontal padding.
 * Sizes map to `containerMaxWidth` layout tokens. Used as the
 * top-level page constraint in dashboard and detail layouts.
 */
import * as React from 'react';
import { containerMaxWidth } from '../../tokens/layout';
import type { SpaceToken } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ContainerSize = keyof typeof containerMaxWidth;
export type ContainerAs = 'div' | 'section' | 'main';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Max-width preset from layout tokens. @default 'lg' */
  size?: ContainerSize;
  /** Horizontal padding (space token key 0-13). @default 7 */
  padding?: SpaceToken;
  /** Whether to center with auto margins. @default true */
  center?: boolean;
  /** Polymorphic root element. @default 'div' */
  as?: ContainerAs;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  (
    {
      size = 'lg',
      padding = 7,
      center = true,
      as: Tag = 'div',
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const mergedStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: containerMaxWidth[size],
      paddingLeft: `var(--ledger-space-${padding})`,
      paddingRight: `var(--ledger-space-${padding})`,
      ...(center && { marginLeft: 'auto', marginRight: 'auto' }),
      boxSizing: 'border-box',
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

Container.displayName = 'Container';
