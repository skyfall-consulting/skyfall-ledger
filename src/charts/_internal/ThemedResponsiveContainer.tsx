/**
 * Skyfall Ledger — ThemedResponsiveContainer
 *
 * The ONE Recharts wrapper that is safe to keep as a JSX component:
 * `ResponsiveContainer` is a layout primitive, not a child of any chart
 * container. Recharts never inspects it via reference identity, so wrapping
 * it does not break the chart tree.
 *
 * It exists because every Ledger chart needs the same layout defaults
 * (full width, deterministic min-height) and we'd rather centralize them
 * than repeat them in every public chart component.
 *
 * Direct `recharts` imports are allowed anywhere inside `src/charts/**`.
 */
import * as React from 'react';
import { ResponsiveContainer, type ResponsiveContainerProps } from 'recharts';

export interface ThemedResponsiveContainerProps
  extends Omit<ResponsiveContainerProps, 'children'> {
  children: React.ReactElement;
}

export const ThemedResponsiveContainer: React.FC<ThemedResponsiveContainerProps> = ({
  width = '100%',
  height = 280,
  minHeight = 160,
  children,
  ...rest
}) => {
  return (
    <ResponsiveContainer width={width} height={height} minHeight={minHeight} {...rest}>
      {children}
    </ResponsiveContainer>
  );
};
