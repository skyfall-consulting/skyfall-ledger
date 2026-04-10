/**
 * Skyfall Ledger — Chart-internal types
 *
 * The shapes Layer-3 chart components use to describe data without leaking
 * Recharts-specific terminology into consumer code.
 */

export type ChartDatum = Record<string, number | string | null | undefined>;

export interface ChartSeries {
  /** Key into a ChartDatum row */
  key: string;
  /** Display label for legends, tooltips, screen readers */
  label: string;
  /** Optional explicit color override; otherwise palette index is used */
  color?: string;
  /** Display format hint for tooltip and axis */
  format?: 'currency' | 'percent' | 'number';
  /** Optional unit suffix for numeric (e.g., "tx", "users") */
  unit?: string;
}

export type ChartRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'YTD' | 'ALL' | 'CUSTOM';

export interface ChartA11y {
  /** Required label announced by screen readers when the chart receives focus */
  ariaLabel: string;
  /** Optional caption rendered into the visually-hidden <ChartSRTable> */
  srCaption?: string;
}
