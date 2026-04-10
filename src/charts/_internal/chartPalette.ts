/**
 * Skyfall Ledger — Categorical chart palette
 *
 * Perceptually ordered, colorblind-checked. Recharts series colors are
 * assigned from this palette in order. The first index is always the
 * Lucid Teal accent so the most-emphasized series matches the system signal color.
 */
import { dataVis } from '../../tokens/colors';

export const chartPalette = [...dataVis] as const;

export const getChartColor = (index: number): string =>
  chartPalette[index % chartPalette.length];
