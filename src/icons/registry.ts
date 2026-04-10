/**
 * Skyfall Ledger — Icon registry
 *
 * String-keyed map for the optional `<Icon name="…" />` facade. Lets
 * config-driven surfaces (e.g. `QuickActionTile`, category mappings) bind
 * an icon by string instead of importing a component.
 *
 * Direct imports remain the preferred path for tree-shaking — see
 * `src/icons/index.ts`. The registry is convenience, not the primary API.
 */
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';

import * as Lucide from './lucide';
import * as Custom from './custom';

export type IconComponent = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

/**
 * Convert PascalCase Lucide names → kebab-case registry keys
 *   "ArrowUpRight" → "arrow-up-right"
 *   "CardFreeze"   → "card-freeze"
 */
const toKebab = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const lucideEntries = Object.entries(Lucide).map(
  ([name, Component]) => [toKebab(name), Component as IconComponent] as const,
);

const customEntries = Object.entries(Custom).map(
  ([name, Component]) => [toKebab(name), Component as IconComponent] as const,
);

export const iconRegistry: Record<string, IconComponent> = Object.fromEntries([
  ...lucideEntries,
  ...customEntries,
]);

export type IconName = keyof typeof iconRegistry;

export const getIcon = (name: string): IconComponent | undefined => iconRegistry[name];
