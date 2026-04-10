/**
 * Skyfall Ledger — Layout tokens
 *
 * Mobile-first breakpoints. Dashboards collapse 4 → 2 → 1 across `lg → md → sm`.
 */
export const breakpoint = {
  xs: '0px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const containerMaxWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1440px',
} as const;

export const gridGutter = {
  sm: '16px',
  md: '20px',
  lg: '24px',
} as const;

export type BreakpointToken = keyof typeof breakpoint;
