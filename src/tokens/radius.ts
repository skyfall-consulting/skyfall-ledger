/**
 * Skyfall Ledger — Radius tokens
 *
 * Medium radius throughout. Primary buttons use `sm`, default cards use `md`,
 * hero surfaces use `lg`–`xl`. Pills are reserved for status, never CTAs.
 */
export const radius = {
  none: '0',
  xs: '4px', // chips, tags, table cells
  sm: '8px', // inputs, buttons
  md: '12px', // cards (default)
  lg: '16px', // hero cards, modals
  xl: '24px', // balance hero, marketing surfaces
  pill: '999px',
  full: '999px',
} as const;

export type RadiusToken = keyof typeof radius;
