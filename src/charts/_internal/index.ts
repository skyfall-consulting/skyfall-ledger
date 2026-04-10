/**
 * Skyfall Ledger — Chart internal barrel
 *
 * NOTE: this barrel is **private**. It is not re-exported from the package
 * root and ESLint blocks consumers from importing `recharts` outside of
 * `src/charts/**`. Public chart components inside `src/charts/*.tsx` are
 * the only place that should import from this barrel.
 *
 * What lives here:
 *  - types          → ChartDatum, ChartSeries, ChartRange, ChartA11y
 *  - chartPalette   → categorical color palette seeded from tokens
 *  - rechartsTheme  → tokens → resolved theme object (per mode)
 *  - useChartTheme  → React hook returning the resolved theme for the current mode
 *  - useReducedMotion → SSR-safe `prefers-reduced-motion` reader
 *  - formatters     → Intl-based currency/percent/date formatters
 *  - rechartsConfig → prop-builder helpers (the only safe way to theme Recharts CHILDREN)
 *  - ThemedResponsiveContainer → the one safe Recharts wrapper (layout primitive)
 */
export * from './types';
export * from './chartPalette';
export * from './rechartsTheme';
export * from './useChartTheme';
export * from './useReducedMotion';
export * from './formatters';
export * from './rechartsConfig';
export { ThemedResponsiveContainer } from './ThemedResponsiveContainer';
export type { ThemedResponsiveContainerProps } from './ThemedResponsiveContainer';
