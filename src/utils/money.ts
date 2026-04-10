/**
 * Skyfall Ledger — Money utilities
 *
 * Locale + currency aware money helpers. Used by the upcoming `<Amount>`
 * primitive, table cells, and chart formatters. The chart layer has its
 * own thin formatter wrapper in `src/charts/_internal/formatters.ts`
 * that delegates here.
 */

export interface FormatMoneyOptions {
  currency?: string;
  locale?: string;
  /** Force a sign even on positive amounts (e.g., for delta indicators). */
  signed?: boolean;
  /** Render in compact notation: $1.2k, $4.6M. */
  compact?: boolean;
  /** Override fraction digits. Default: 2 for full, 1 for compact. */
  fractionDigits?: number;
}

export const formatMoney = (
  value: number,
  options: FormatMoneyOptions = {},
): string => {
  const {
    currency = 'USD',
    locale = 'en-US',
    signed = false,
    compact = false,
    fractionDigits,
  } = options;

  if (!Number.isFinite(value)) return '—';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits: fractionDigits ?? (compact ? 0 : 2),
    maximumFractionDigits: fractionDigits ?? (compact ? 1 : 2),
    signDisplay: signed ? 'exceptZero' : 'auto',
  }).format(value);
};

/**
 * Permissive money parser — accepts user input that might contain currency
 * symbols, thousands separators, and trailing/leading whitespace.
 *   "$1,240.56" → 1240.56
 *   "1.240,56"  → 1240.56  (when locale is "de-DE", future enhancement)
 *
 * Returns NaN if no numeric value can be extracted. Form components are
 * responsible for treating NaN as a validation error.
 */
export const parseMoney = (input: string): number => {
  if (typeof input !== 'string') return NaN;
  const cleaned = input.replace(/[^\d.-]/g, '');
  if (!cleaned) return NaN;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : NaN;
};

/**
 * Sign descriptor for delta indicators. Always pair color with this so
 * positive/negative is never communicated by color alone (a11y rule).
 */
export type Sign = 'positive' | 'negative' | 'zero';

export const signOf = (value: number): Sign => {
  if (!Number.isFinite(value) || value === 0) return 'zero';
  return value > 0 ? 'positive' : 'negative';
};
