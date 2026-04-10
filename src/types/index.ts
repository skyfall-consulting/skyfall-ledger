/**
 * Skyfall Ledger — Public types barrel
 *
 * General-purpose types used across components. Component-specific prop
 * types live next to their components and are re-exported through the
 * package root barrel.
 */

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Tone =
  | 'default'
  | 'muted'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'accent';

export type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';

export type Density = 'compact' | 'comfortable' | 'spacious';

/** ISO-4217 currency code (e.g., "USD", "EUR", "GBP"). */
export type CurrencyCode = string;

/** BCP-47 locale tag (e.g., "en-US", "pt-BR"). */
export type LocaleCode = string;

/**
 * Money primitive — the canonical shape for any monetary value passed
 * around the system. Components that accept money should accept this OR
 * a plain number alongside a currency prop.
 */
export interface Money {
  /** Numeric value in major units (e.g., 12.40 = $12.40). */
  value: number;
  /** ISO-4217 currency code. */
  currency: CurrencyCode;
}
