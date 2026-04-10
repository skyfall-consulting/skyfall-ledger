/**
 * Skyfall Ledger — Focus tokens
 *
 * Focus rings are non-negotiable. They are always visible during keyboard
 * navigation, instant (no transition), and use the Lucid Teal accent.
 */
import { teal } from './colors';

export const focus = {
  ringWidth: '2px',
  ringOffset: '2px',
  ringColor: teal[400],
  ringStyle: 'solid',
  ringRadius: '6px', // applied via outline-offset; component radius wins where it exists
  outline: `2px solid ${teal[400]}`,
  outlineOffset: '2px',
} as const;
