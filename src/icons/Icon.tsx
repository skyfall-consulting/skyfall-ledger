/**
 * Skyfall Ledger — <Icon name="…" />
 *
 * Convenience facade for the registry. Direct named imports remain the
 * preferred path for tree-shaking, but `<Icon name="card-freeze" />` is
 * useful for config-driven surfaces.
 *
 *   <Icon name="wallet" sizeToken="md" tone="accent" />
 *
 * Unknown names render nothing. We deliberately avoid a dev-only warning
 * here so the component has zero Node/build-time assumptions — consumers
 * with strict TypeScript get compile-time errors via the `IconName` union.
 */
import * as React from 'react';
import { resolveIconProps, type LedgerIconProps } from './iconProps';
import { getIcon, type IconName } from './registry';

export interface IconFacadeProps extends LedgerIconProps {
  name: IconName | (string & Record<string, never>);
}

export const Icon: React.FC<IconFacadeProps> = ({ name, ...props }) => {
  const Component = getIcon(name);
  if (!Component) return null;
  return <Component {...resolveIconProps(props)} />;
};
