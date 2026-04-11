/**
 * Skyfall Ledger -- <Divider />
 *
 * A horizontal or vertical separator line for visually dividing
 * sections of content. Supports subtle, default, and strong
 * border variants with configurable spacing.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'subtle' | 'default' | 'strong';

export interface DividerProps {
  /** Direction of the separator. @default 'horizontal' */
  orientation?: DividerOrientation;
  /** Visual weight of the border. @default 'default' */
  variant?: DividerVariant;
  /** Spacing token key (0-13) applied as margin around the divider. @default 0 */
  spacing?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Variant color map
// ---------------------------------------------------------------------------
const VARIANT_COLOR: Record<DividerVariant, string> = {
  subtle: 'var(--ledger-color-border-subtle)',
  default: 'var(--ledger-color-border-default)',
  strong: 'var(--ledger-color-border-strong)',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'default',
      spacing = 0,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const borderColor = VARIANT_COLOR[variant];
    const spacingVar = `var(--ledger-space-${spacing})`;

    if (orientation === 'vertical') {
      const verticalStyle: React.CSSProperties = {
        display: 'inline-block',
        width: 1,
        alignSelf: 'stretch',
        minHeight: '1em',
        border: 'none',
        background: borderColor,
        marginLeft: spacingVar,
        marginRight: spacingVar,
        ...style,
      };

      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={className}
          style={verticalStyle}
          {...rest}
        />
      );
    }

    const horizontalStyle: React.CSSProperties = {
      border: 'none',
      borderTop: `1px solid ${borderColor}`,
      margin: 0,
      marginTop: spacingVar,
      marginBottom: spacingVar,
      ...style,
    };

    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        role="separator"
        aria-orientation="horizontal"
        className={className}
        style={horizontalStyle}
        {...rest}
      />
    );
  },
);

Divider.displayName = 'Divider';
