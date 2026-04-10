/**
 * Skyfall Ledger — Public icon barrel
 *
 * Subpath export: `@skyfall_ai/ledger/icons`.
 *
 *   import { Wallet, CardFreeze, Icon } from '@skyfall_ai/ledger/icons';
 *
 * Two import patterns are supported:
 *
 *   1. Direct named imports (preferred — best tree-shaking):
 *        import { Wallet } from '@skyfall_ai/ledger/icons';
 *
 *   2. The `<Icon name="…" />` facade (for dynamic / config-driven cases):
 *        import { Icon } from '@skyfall_ai/ledger/icons';
 *        <Icon name="card-freeze" sizeToken="md" tone="accent" />
 *
 * Direct `lucide-react` imports outside this folder are blocked by ESLint.
 */

// Curated Lucide whitelist
export * from './lucide';

// Custom Ledger finance glyphs
export * from './custom';

// Facade + types + registry helpers
export { Icon } from './Icon';
export type { IconFacadeProps } from './Icon';
export { iconRegistry, getIcon } from './registry';
export type { IconName, IconComponent } from './registry';
export { resolveIconProps } from './iconProps';
export type {
  LedgerIconProps,
  LedgerIconSizeToken,
  LedgerIconTone,
} from './iconProps';
