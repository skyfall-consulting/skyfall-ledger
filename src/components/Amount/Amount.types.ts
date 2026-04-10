/**
 * Skyfall Ledger — <Amount /> types
 *
 * `<Amount />` is the lowest-level monetary primitive in the system. Every
 * surface that renders money — balance heroes, table rows, transaction lists,
 * delta indicators — eventually composes through it. Keeping its prop surface
 * focused makes the rest of the system predictable.
 */
import type { CSSProperties } from 'react';

/** Visual size token for `<Amount />`. */
export type AmountSize = 'sm' | 'md' | 'lg' | 'xl' | 'hero';

/**
 * Color/role of the figure.
 *  - `auto`     — derive from sign (positive→positive, negative→negative, zero→neutral).
 *  - `neutral`  — primary text color regardless of sign (default for tables).
 *  - `positive` / `negative` — force a specific color.
 *  - `accent`   — Lucid Teal accent (used by hero/empty-state callouts).
 *  - `muted`    — secondary text color.
 */
export type AmountTone = 'auto' | 'neutral' | 'positive' | 'negative' | 'accent' | 'muted';

/**
 * How sign is rendered.
 *  - `auto`     — `-` only on negatives (Intl default).
 *  - `always`   — `+` and `-` on every non-zero value (delta indicators).
 *  - `never`    — strip the sign entirely (use only with explicit context).
 *  - `accounting` — wrap negatives in parentheses, drop the leading `-`.
 */
export type AmountSign = 'auto' | 'always' | 'never' | 'accounting';

/**
 * Decimal rendering strategy.
 *  - number     — fixed digits (e.g. 2 → `1,240.56`).
 *  - `'auto'`   — locale + currency default (USD → 2, JPY → 0).
 *  - `'hide'`   — drop the fractional part entirely.
 */
export type AmountDecimals = number | 'auto' | 'hide';

export type AmountWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface AmountProps {
  /** Numeric value in major units (dollars, euros, yen — never cents). */
  value: number;
  /** ISO 4217 currency code. Defaults to `USD`. */
  currency?: string;
  /** BCP 47 locale tag. Defaults to `en-US`. */
  locale?: string;
  /** Visual size. Defaults to `md`. */
  size?: AmountSize;
  /** Color/role. Defaults to `neutral`. */
  tone?: AmountTone;
  /** Sign rendering strategy. Defaults to `auto`. */
  sign?: AmountSign;
  /** Decimal rendering strategy. Defaults to `auto`. */
  decimals?: AmountDecimals;
  /** Compact notation: $1.2k, $4.6M. Defaults to `false`. */
  compact?: boolean;
  /** Font weight override. Defaults vary by size. */
  weight?: AmountWeight;
  /** When true, the fractional digits render in a muted color. */
  dimDecimals?: boolean;
  /** When true, the currency symbol renders in a muted color. */
  dimSymbol?: boolean;
  /** Optional class name for the wrapper element. */
  className?: string;
  /** Optional inline style for the wrapper element. */
  style?: CSSProperties;
  /**
   * Override the auto-generated screen-reader label. Most consumers should
   * leave this alone — `<Amount />` already builds a spelled-out label via
   * `srMoney`.
   */
  ariaLabel?: string;
}
