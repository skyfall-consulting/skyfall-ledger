/**
 * Skyfall Ledger — <Sparkline />
 *
 * Layer-3 public chart. The smallest possible time-series surface — a single
 * line, no axes, no tooltip. Used inline in cards, table rows, KPI tiles, and
 * anywhere a "trend at a glance" needs to live next to a number.
 *
 * Architecture (post chart-refactor):
 *  - Imports raw `recharts` components directly. The `src/charts/**` folder is
 *    the recharts boundary; ESLint blocks recharts imports anywhere else.
 *  - Reads tokens via `useChartTheme()` (never imports them directly).
 *  - Uses `getLineSeriesProps()` from `_internal/rechartsConfig` for the
 *    themed defaults, then overrides what it needs (color, dot off).
 *  - Renders inside `ThemedResponsiveContainer` for layout-shift-free sizing.
 *  - Honors `prefers-reduced-motion` via `useReducedMotion()`.
 *
 * Tone resolution:
 *  - `auto` (default): up if last >= first, down otherwise.
 *  - `accent` / `positive` / `negative` / `neutral`: explicit override.
 *
 * Accessibility:
 *  - Wrapper has `role="figure"` and an `aria-label` consumers must provide.
 *  - The path itself is decorative.
 */
import * as React from 'react';
import { LineChart, Line } from 'recharts';
import { ThemedResponsiveContainer } from './_internal/ThemedResponsiveContainer';
import { useChartTheme } from './_internal/useChartTheme';
import { useReducedMotion } from './_internal/useReducedMotion';
import { getLineSeriesProps } from './_internal/rechartsConfig';

export type SparklineTone = 'auto' | 'accent' | 'positive' | 'negative' | 'neutral';

export interface SparklineDatum {
  /** Optional x label — not rendered, but useful for downstream tooling. */
  x?: string | number;
  /** The numeric value plotted at this point. */
  y: number;
}

export interface SparklineProps {
  /**
   * Series data. Either a flat number array (most common) or an array of
   * `{ x, y }` objects when consumers want to label points.
   */
  data: number[] | SparklineDatum[];
  /** Pixel height of the sparkline. Defaults to 36. */
  height?: number;
  /** Pixel width of the sparkline. Defaults to `'100%'` so it fills its container. */
  width?: number | string;
  /** Color/role. `'auto'` derives from first→last delta. */
  tone?: SparklineTone;
  /** Stroke width override. Defaults to 2 (1.5 for height < 28). */
  strokeWidth?: number;
  /** Disable the entry animation. Always disabled when `prefers-reduced-motion`. */
  animate?: boolean;
  /**
   * Required accessible label, e.g. `"Account balance trend, last 30 days, +4.2%"`.
   * The chart is rendered as a `figure` so this label is essential.
   */
  ariaLabel: string;
  /** Optional class name on the wrapper. */
  className?: string;
}

const normalize = (data: SparklineProps['data']): Array<{ x: number; y: number }> => {
  if (data.length === 0) return [];
  if (typeof data[0] === 'number') {
    return (data as number[]).map((y, i) => ({ x: i, y }));
  }
  return (data as SparklineDatum[]).map((d, i) => ({
    x: typeof d.x === 'number' ? d.x : i,
    y: d.y,
  }));
};

const resolveAutoTone = (
  tone: SparklineTone,
  values: number[],
): Exclude<SparklineTone, 'auto'> => {
  if (tone !== 'auto') return tone;
  if (values.length < 2) return 'accent';
  const first = values[0];
  const last = values[values.length - 1];
  if (last > first) return 'positive';
  if (last < first) return 'negative';
  return 'neutral';
};

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  height = 36,
  width = '100%',
  tone = 'auto',
  strokeWidth,
  animate = true,
  ariaLabel,
  className,
}) => {
  const theme = useChartTheme();
  const reducedMotion = useReducedMotion();

  const normalized = React.useMemo(() => normalize(data), [data]);
  const values = React.useMemo(() => normalized.map((d) => d.y), [normalized]);
  const resolvedTone = resolveAutoTone(tone, values);

  const stroke = strokeWidth ?? (height < 28 ? 1.5 : 2);
  const isAnimated = animate && !reducedMotion;
  const isEmpty = normalized.length === 0;

  // Pull themed defaults from the prop-builder, then override what we need.
  // Sparkline is intentionally bare: no resting dots, no hover dot, no
  // tooltip — the chart is decorative; the value lives in the adjacent <Amount>.
  const lineProps = React.useMemo(
    () =>
      getLineSeriesProps(theme, {
        tone: resolvedTone,
        strokeWidth: stroke,
        animate: isAnimated,
      }),
    [theme, resolvedTone, stroke, isAnimated],
  );

  return (
    <figure
      role="figure"
      aria-label={ariaLabel}
      className={className}
      style={{
        margin: 0,
        width,
        height,
        display: 'block',
      }}
    >
      {isEmpty ? (
        <div
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            borderBottom: `1px dashed ${theme.colors.grid}`,
          }}
        />
      ) : (
        <ThemedResponsiveContainer width="100%" height="100%" minHeight={height}>
          <LineChart data={normalized} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Line {...lineProps} dataKey="y" activeDot={false} />
          </LineChart>
        </ThemedResponsiveContainer>
      )}
    </figure>
  );
};
