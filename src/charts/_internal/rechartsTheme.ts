/**
 * Skyfall Ledger — Recharts theme bridge
 *
 * THE single point where Ledger tokens become Recharts theme values. Every
 * prop-builder helper in `rechartsConfig.ts` reads from this via `useChartTheme`.
 *
 * If you find yourself reaching for a token inside a primitive or a public
 * chart component, add it here instead. This keeps theming honest: a token
 * change ripples through every chart automatically.
 */
import { tokens } from '../../tokens';
import type { LedgerThemeMode } from '../../theme';
import { chartPalette } from './chartPalette';

export interface RechartsThemeColors {
  axis: string;
  grid: string;
  text: string;
  textStrong: string;
  textMuted: string;
  surface: string;
  tooltipBg: string;
  tooltipBorder: string;
  cursor: string;
}

export interface RechartsThemeSeries {
  primary: string;
  positive: string;
  negative: string;
  warning: string;
  neutral: string;
  categorical: readonly string[];
}

export interface RechartsTheme {
  mode: LedgerThemeMode;
  colors: RechartsThemeColors;
  series: RechartsThemeSeries;
  typography: {
    fontFamily: string;
    fontFamilyMono: string;
    axisSize: number;
    axisWeight: number;
    tickFeatures: string;
  };
  radii: { tooltip: string; bar: string };
  strokes: { default: number; thin: number; axis: number; grid: number };
  dot: { r: number; activeR: number };
}

export const getRechartsTheme = (mode: LedgerThemeMode): RechartsTheme => {
  const isDark = mode === 'dark';

  return {
    mode,
    colors: {
      axis: isDark ? tokens.obsidian[500] : tokens.obsidian[400],
      grid: isDark ? tokens.obsidian[700] : tokens.obsidian[100],
      text: isDark ? tokens.obsidian[300] : tokens.obsidian[600],
      textStrong: isDark ? tokens.obsidian[0] : tokens.obsidian[900],
      textMuted: isDark ? tokens.obsidian[400] : tokens.obsidian[500],
      surface: isDark ? tokens.obsidian[800] : tokens.obsidian[0],
      tooltipBg: isDark ? tokens.obsidian[900] : tokens.obsidian[0],
      tooltipBorder: isDark ? tokens.obsidian[700] : tokens.obsidian[200],
      cursor: isDark ? tokens.obsidian[600] : tokens.obsidian[200],
    },
    series: {
      primary: tokens.teal[400],
      positive: tokens.mint[500],
      negative: tokens.coral[500],
      warning: tokens.amber[500],
      neutral: tokens.obsidian[400],
      categorical: chartPalette,
    },
    typography: {
      fontFamily: tokens.fontFamily.sans,
      fontFamilyMono: tokens.fontFamily.mono,
      axisSize: 12,
      axisWeight: tokens.fontWeight.medium,
      tickFeatures: tokens.numeric.tabular,
    },
    radii: {
      tooltip: tokens.radius.md,
      bar: tokens.radius.xs,
    },
    strokes: {
      default: 2,
      thin: 1,
      axis: 1,
      grid: 1,
    },
    dot: {
      r: 0, // No resting dots — the chart line carries the story.
      activeR: 4, // Hover/focus point only.
    },
  };
};
