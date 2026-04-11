/**
 * Skyfall Ledger -- <Box />
 *
 * A generic polymorphic container with shorthand style props for the
 * most common layout needs: padding, margin, background, border, and
 * display. Intentionally NOT a full styled-system -- just the essentials.
 */
import * as React from 'react';
import type { SpaceToken } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type BoxAs =
  | 'div' | 'span' | 'section' | 'article' | 'aside'
  | 'header' | 'footer' | 'main' | 'nav' | 'figure'
  | 'ul' | 'ol' | 'li' | 'p';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** Polymorphic root element. @default 'div' */
  as?: BoxAs;
  /** All-sides padding (space token key 0-13). */
  padding?: SpaceToken;
  /** Horizontal padding (space token key 0-13). */
  paddingX?: SpaceToken;
  /** Vertical padding (space token key 0-13). */
  paddingY?: SpaceToken;
  /** All-sides margin (space token key 0-13). */
  margin?: SpaceToken;
  /** Background color -- CSS var or raw value. */
  background?: string;
  /** Border radius -- CSS var or raw value. */
  borderRadius?: string;
  /** Border shorthand -- CSS var or raw value. */
  border?: string;
  /** CSS display value. */
  display?: React.CSSProperties['display'];
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const spaceVar = (token: SpaceToken): string => `var(--ledger-space-${token})`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Tag = 'div',
      padding,
      paddingX,
      paddingY,
      margin,
      background,
      borderRadius,
      border,
      display,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const mergedStyle: React.CSSProperties = {
      ...(padding != null && { padding: spaceVar(padding) }),
      ...(paddingX != null && {
        paddingLeft: spaceVar(paddingX),
        paddingRight: spaceVar(paddingX),
      }),
      ...(paddingY != null && {
        paddingTop: spaceVar(paddingY),
        paddingBottom: spaceVar(paddingY),
      }),
      ...(margin != null && { margin: spaceVar(margin) }),
      ...(background != null && { background }),
      ...(borderRadius != null && { borderRadius }),
      ...(border != null && { border }),
      ...(display != null && { display }),
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

Box.displayName = 'Box';
