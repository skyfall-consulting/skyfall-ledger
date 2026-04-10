/**
 * Skyfall Ledger — useChartTheme
 *
 * Reads the active Ledger theme mode and returns a fully resolved
 * `RechartsTheme`. Used by every Layer-2 themed primitive.
 *
 * Falls back to "dark" if the chart is rendered outside a `LedgerThemeProvider`,
 * matching Ledger's hero theme. We deliberately do not throw here so that
 * isolated Storybook stories and tests work without ceremony.
 */
import * as React from 'react';
import { useLedgerThemeSafe } from '../../theme';
import { getRechartsTheme, type RechartsTheme } from './rechartsTheme';

export const useChartTheme = (): RechartsTheme => {
  const ctx = useLedgerThemeSafe();
  const mode = ctx?.mode ?? 'dark';
  return React.useMemo(() => getRechartsTheme(mode), [mode]);
};
