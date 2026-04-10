/**
 * Skyfall Ledger — Sizing tokens
 *
 * Component dimensions used by interactive surfaces. Touch targets are 44px
 * minimum; AmountField is intentionally larger because money input is the
 * most consequential interaction in the system.
 */
export const controlHeight = {
  xs: '24px',
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '56px', // AmountField on mobile
} as const;

export const minTouchTarget = '44px';

export const iconSize = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
} as const;
