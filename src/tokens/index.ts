/**
 * Skyfall Ledger — Token barrel
 *
 * Re-exports every token module so consumers can import from a single place:
 *   import { obsidian, teal, space, radius, focus } from '@skyfall_ai/ledger/tokens';
 *
 * The CSS-variable counterpart lives at `src/tokens/ledger-tokens.css`
 * and is published via the `./tokens` subpath export.
 */
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './sizing';
export * from './radius';
export * from './borders';
export * from './shadows';
export * from './motion';
export * from './opacity';
export * from './zIndex';
export * from './layout';
export * from './focus';

/**
 * `tokens` namespace — handy when a consumer wants the entire system as one object
 * (used internally by `rechartsTheme.ts` so chart theming can read tokens by category).
 */
import * as colors from './colors';
import * as typography from './typography';
import * as spacing from './spacing';
import * as sizing from './sizing';
import * as radiusTokens from './radius';
import * as borders from './borders';
import * as shadows from './shadows';
import * as motion from './motion';
import * as opacityTokens from './opacity';
import * as zIndexTokens from './zIndex';
import * as layout from './layout';
import * as focusTokens from './focus';

export const tokens = {
  obsidian: colors.obsidian,
  teal: colors.teal,
  horizon: colors.horizon,
  violet: colors.violet,
  mint: colors.mint,
  coral: colors.coral,
  amber: colors.amber,
  sky: colors.sky,
  semantic: colors.semantic,
  light: colors.light,
  dark: colors.dark,
  dataVis: colors.dataVis,
  fontFamily: typography.fontFamily,
  fontWeight: typography.fontWeight,
  fontSize: typography.fontSize,
  lineHeight: typography.lineHeight,
  tracking: typography.tracking,
  numeric: typography.numeric,
  space: spacing.space,
  controlHeight: sizing.controlHeight,
  iconSize: sizing.iconSize,
  minTouchTarget: sizing.minTouchTarget,
  radius: radiusTokens.radius,
  borderWidth: borders.borderWidth,
  borderStyle: borders.borderStyle,
  shadowLight: shadows.shadowLight,
  shadowDark: shadows.shadowDark,
  duration: motion.duration,
  easing: motion.easing,
  opacity: opacityTokens.opacity,
  zIndex: zIndexTokens.zIndex,
  breakpoint: layout.breakpoint,
  containerMaxWidth: layout.containerMaxWidth,
  gridGutter: layout.gridGutter,
  focus: focusTokens.focus,
} as const;

export type LedgerTokens = typeof tokens;
