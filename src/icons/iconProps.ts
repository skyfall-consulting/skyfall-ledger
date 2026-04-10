/**
 * Skyfall Ledger — Shared icon prop type
 *
 * Lucide icons and Ledger custom icons share the same prop API. The custom
 * set is built with `createLucideIcon` from `lucide-react`, which inherits
 * `LucideProps` automatically. Token-aware extensions (`sizeToken`, `tone`)
 * live here so consumers can opt into Ledger semantics without losing the
 * Lucide escape hatch.
 */
import type { LucideProps } from 'lucide-react';
import { iconSize } from '../tokens/sizing';

export type LedgerIconSizeToken = keyof typeof iconSize; // 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type LedgerIconTone =
  | 'default'
  | 'muted'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'accent';

export interface LedgerIconProps extends LucideProps {
  /** Semantic size token. When provided, overrides the numeric `size` prop. */
  sizeToken?: LedgerIconSizeToken;
  /** Semantic tone token. When provided, overrides the `color` prop. */
  tone?: LedgerIconTone;
}

const sizeMap: Record<LedgerIconSizeToken, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const toneMap: Record<LedgerIconTone, string> = {
  default: 'var(--ledger-color-text-primary)',
  muted: 'var(--ledger-color-text-muted)',
  positive: 'var(--ledger-color-positive)',
  negative: 'var(--ledger-color-negative)',
  warning: 'var(--ledger-color-warning)',
  info: 'var(--ledger-color-info)',
  accent: 'var(--ledger-color-text-accent)',
};

/**
 * Resolve `sizeToken` / `tone` to raw Lucide props. Used by `<Icon>` and
 * any wrapper that wants to forward token-aware props to a Lucide icon.
 */
export const resolveIconProps = (
  props: LedgerIconProps,
): LucideProps => {
  const { sizeToken, tone, size, color, ...rest } = props;
  return {
    ...rest,
    size: sizeToken ? sizeMap[sizeToken] : size,
    color: tone ? toneMap[tone] : color,
  };
};
