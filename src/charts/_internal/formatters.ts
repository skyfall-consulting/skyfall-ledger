/**
 * Skyfall Ledger — Chart formatters
 *
 * Locale + currency aware formatters used for axis ticks, tooltips, and
 * the screen-reader table sibling. Centralized so charts and money utils
 * never disagree on how an amount is rendered.
 */

export interface CurrencyFormatOptions {
  /** Render compact ($1.2k, $4.6M) instead of full precision. */
  compact?: boolean;
  /** Force the number of fraction digits. Default: 2 for full, 1 for compact. */
  fractionDigits?: number;
  /** Show explicit sign even on positive values. Default: false. */
  signed?: boolean;
}

export const formatCurrency = (
  currency: string = 'USD',
  locale: string = 'en-US',
  options: CurrencyFormatOptions = {},
) => {
  const { compact = false, fractionDigits, signed = false } = options;

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits: fractionDigits ?? (compact ? 0 : 2),
    maximumFractionDigits: fractionDigits ?? (compact ? 1 : 2),
    signDisplay: signed ? 'exceptZero' : 'auto',
  });

  return (value: number | string | null | undefined): string => {
    const numeric = typeof value === 'number' ? value : Number(value ?? 0);
    if (!Number.isFinite(numeric)) return '—';
    return formatter.format(numeric);
  };
};

export const formatPercent = (locale: string = 'en-US', fractionDigits: number = 1) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return (value: number | string | null | undefined): string => {
    const numeric = typeof value === 'number' ? value : Number(value ?? 0);
    if (!Number.isFinite(numeric)) return '—';
    return formatter.format(numeric);
  };
};

export const formatNumber = (locale: string = 'en-US', compact: boolean = false) => {
  const formatter = new Intl.NumberFormat(locale, {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  });
  return (value: number | string | null | undefined): string => {
    const numeric = typeof value === 'number' ? value : Number(value ?? 0);
    if (!Number.isFinite(numeric)) return '—';
    return formatter.format(numeric);
  };
};

/** Short month + day formatter for X-axis ticks: "Mar 12", "Apr 9". */
export const formatDateShort = (locale: string = 'en-US') => {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });
  return (value: string | number | Date | null | undefined): string => {
    if (value == null) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return formatter.format(date);
  };
};

/** Long, statement-style date for tooltips: "Tue, Mar 12, 2026". */
export const formatDateLong = (locale: string = 'en-US') => {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return (value: string | number | Date | null | undefined): string => {
    if (value == null) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return formatter.format(date);
  };
};
