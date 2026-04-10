/**
 * Skyfall Ledger — Spacing tokens
 *
 * 4px base, 8px rhythm. Numeric keys map to multiples of 4px.
 */
export const space = {
  0: '0',
  1: '2px',
  2: '4px',
  3: '8px',
  4: '12px',
  5: '16px',
  6: '20px',
  7: '24px',
  8: '32px',
  9: '40px',
  10: '48px',
  11: '64px',
  12: '80px',
  13: '96px',
} as const;

export type SpaceToken = keyof typeof space;
