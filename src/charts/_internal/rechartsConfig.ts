/**
 * Skyfall Ledger — Recharts prop-builder helpers
 *
 * The chart system avoids JSX wrappers around Recharts CHILD components
 * (`<XAxis>`, `<CartesianGrid>`, `<Tooltip>`, etc.) because Recharts identifies
 * children of its chart containers (`<LineChart>`, `<AreaChart>`, …) by
 * component reference. A JSX wrapper changes that reference and the child
 * silently fails to render.
 *
 * Instead, theming and defaults are centralized as **prop-builder functions**.
 * Public chart components import the raw Recharts components directly and
 * spread the resolved props onto them:
 *
 *   const theme = useChartTheme();
 *   <LineChart data={data}>
 *     <CartesianGrid {...getGridProps(theme)} />
 *     <XAxis dataKey="date" {...getXAxisProps(theme)} />
 *     <YAxis {...getYAxisProps(theme, { format: 'currency' })} />
 *     <Tooltip {...getTooltipProps(theme)} />
 *     <Line {...getLineSeriesProps(theme, { tone: 'accent' })} dataKey="balance" />
 *   </LineChart>
 *
 * This is the single point where Ledger tokens become Recharts props. If you
 * find yourself reaching for a token inside a public chart component, add the
 * helper here instead.
 */
import type {
  CartesianGridProps,
  LegendProps,
  LineProps,
  AreaProps,
  BarProps,
  TooltipProps,
  XAxisProps,
  YAxisProps,
  ReferenceLineProps,
} from 'recharts';
import type { RechartsTheme } from './rechartsTheme';

// ----------------------------------------------------------------------------
// Common option shapes
// ----------------------------------------------------------------------------

export type ChartTone = 'accent' | 'positive' | 'negative' | 'neutral' | 'warning';
export type ChartFormat = 'currency' | 'percent' | 'number' | 'date';

const toneToColor = (theme: RechartsTheme, tone: ChartTone): string => {
  switch (tone) {
    case 'positive':
      return theme.series.positive;
    case 'negative':
      return theme.series.negative;
    case 'warning':
      return theme.series.warning;
    case 'neutral':
      return theme.series.neutral;
    case 'accent':
    default:
      return theme.series.primary;
  }
};

// ----------------------------------------------------------------------------
// Cartesian grid
// ----------------------------------------------------------------------------

export interface GridOptions {
  /** Show vertical gridlines. Defaults to false (horizontal-only). */
  vertical?: boolean;
  /** Show horizontal gridlines. Defaults to true. */
  horizontal?: boolean;
}

export const getGridProps = (
  theme: RechartsTheme,
  options: GridOptions = {},
): Partial<CartesianGridProps> => ({
  stroke: theme.colors.grid,
  strokeWidth: theme.strokes.grid,
  strokeDasharray: '2 4',
  vertical: options.vertical ?? false,
  horizontal: options.horizontal ?? true,
});

// ----------------------------------------------------------------------------
// Axes
// ----------------------------------------------------------------------------

export interface AxisOptions {
  /** Hide the axis line itself but keep ticks/labels. */
  hideAxisLine?: boolean;
  /** Hide tick lines but keep labels. Defaults to true (cleaner default). */
  hideTickLine?: boolean;
  /** Use mono numerals + tabular features (recommended for currency/number axes). */
  tabular?: boolean;
}

const sharedAxisProps = (theme: RechartsTheme, options: AxisOptions) => ({
  stroke: theme.colors.axis,
  strokeWidth: theme.strokes.axis,
  axisLine: options.hideAxisLine === true ? false : { stroke: theme.colors.axis },
  tickLine: options.hideTickLine === false ? { stroke: theme.colors.axis } : false,
  tick: {
    fill: theme.colors.text,
    fontFamily: options.tabular ? theme.typography.fontFamilyMono : theme.typography.fontFamily,
    fontSize: theme.typography.axisSize,
    fontWeight: theme.typography.axisWeight,
  },
  tickMargin: 8,
});

export const getXAxisProps = (
  theme: RechartsTheme,
  options: AxisOptions = {},
): Partial<XAxisProps> => ({
  ...sharedAxisProps(theme, options),
});

export const getYAxisProps = (
  theme: RechartsTheme,
  options: AxisOptions = {},
): Partial<YAxisProps> => ({
  ...sharedAxisProps(theme, { tabular: true, ...options }),
  width: 56,
});

// ----------------------------------------------------------------------------
// Tooltip
// ----------------------------------------------------------------------------

export const getTooltipProps = (
  theme: RechartsTheme,
): Partial<TooltipProps<number, string>> => ({
  cursor: { stroke: theme.colors.cursor, strokeWidth: 1, strokeDasharray: '2 4' },
  contentStyle: {
    background: theme.colors.tooltipBg,
    border: `1px solid ${theme.colors.tooltipBorder}`,
    borderRadius: theme.radii.tooltip,
    color: theme.colors.textStrong,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.axisSize,
    boxShadow: '0 12px 32px rgba(0,0,0,0.32)',
    padding: '8px 12px',
  },
  labelStyle: {
    color: theme.colors.text,
    fontWeight: theme.typography.axisWeight,
    marginBottom: 4,
  },
  itemStyle: {
    color: theme.colors.textStrong,
    fontFeatureSettings: theme.typography.tickFeatures,
  },
});

// ----------------------------------------------------------------------------
// Legend
// ----------------------------------------------------------------------------

export const getLegendProps = (theme: RechartsTheme): Partial<LegendProps> => ({
  iconType: 'circle',
  iconSize: 8,
  wrapperStyle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.axisSize,
    color: theme.colors.text,
    paddingTop: 12,
  },
});

// ----------------------------------------------------------------------------
// Series
// ----------------------------------------------------------------------------

export interface SeriesOptions {
  tone?: ChartTone;
  /** Stroke width override. Defaults to theme.strokes.default. */
  strokeWidth?: number;
  /** Disable entry animation. */
  animate?: boolean;
}

export const getLineSeriesProps = (
  theme: RechartsTheme,
  options: SeriesOptions = {},
): Omit<Partial<LineProps>, 'ref'> => {
  const color = toneToColor(theme, options.tone ?? 'accent');
  return {
    type: 'monotone',
    stroke: color,
    strokeWidth: options.strokeWidth ?? theme.strokes.default,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    dot: false,
    activeDot: { r: theme.dot.activeR, fill: color, stroke: theme.colors.surface, strokeWidth: 2 },
    isAnimationActive: options.animate ?? true,
    animationDuration: 480,
    animationEasing: 'ease-out',
  };
};

export const getAreaSeriesProps = (
  theme: RechartsTheme,
  options: SeriesOptions = {},
): Omit<Partial<AreaProps>, 'ref'> => {
  const color = toneToColor(theme, options.tone ?? 'accent');
  return {
    type: 'monotone',
    stroke: color,
    strokeWidth: options.strokeWidth ?? theme.strokes.default,
    fill: color,
    fillOpacity: 0.16,
    dot: false,
    activeDot: { r: theme.dot.activeR, fill: color, stroke: theme.colors.surface, strokeWidth: 2 },
    isAnimationActive: options.animate ?? true,
    animationDuration: 480,
    animationEasing: 'ease-out',
  };
};

export const getBarSeriesProps = (
  theme: RechartsTheme,
  options: SeriesOptions = {},
): Omit<Partial<BarProps>, 'ref'> => {
  const color = toneToColor(theme, options.tone ?? 'accent');
  return {
    fill: color,
    radius: [4, 4, 0, 0],
    isAnimationActive: options.animate ?? true,
    animationDuration: 480,
    animationEasing: 'ease-out',
  };
};

// ----------------------------------------------------------------------------
// Reference line
// ----------------------------------------------------------------------------

export const getReferenceLineProps = (
  theme: RechartsTheme,
  options: { tone?: ChartTone } = {},
): Partial<ReferenceLineProps> => ({
  stroke: toneToColor(theme, options.tone ?? 'neutral'),
  strokeDasharray: '4 4',
  strokeWidth: 1,
});
