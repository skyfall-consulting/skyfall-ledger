/**
 * Skyfall Ledger — Public chart barrel
 *
 * Subpath export: `@skyfall_ai/ledger/charts`.
 *
 * Public chart components live next to this file (e.g., `LedgerLineChart.tsx`)
 * and are added here as they ship. The `_internal/` folder is private and
 * intentionally NOT re-exported — it holds the theme bridge, prop-builder
 * helpers, formatters, and the one safe Recharts wrapper
 * (`ThemedResponsiveContainer`).
 *
 * Selected internal types are re-exported here so consumers can describe
 * data shapes for the public chart components.
 */

// ---------- Public chart components ----------
export { Sparkline } from './Sparkline';
export type { SparklineProps, SparklineDatum, SparklineTone } from './Sparkline';

// ---------- Public chart types ----------
export type { ChartDatum, ChartSeries, ChartRange, ChartA11y } from './_internal/types';
