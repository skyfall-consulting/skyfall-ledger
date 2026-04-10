/**
 * Skyfall Ledger — Typography tokens
 *
 * Two faces, one numeric style:
 *  - sans  → Inter (UI, body, headings)
 *  - mono  → JetBrains Mono (timestamps, codes, ledger references)
 *  - the sans face must always render with `font-feature-settings: "tnum","lnum"`
 *    when displaying money (handled by the <Amount> component and `mono*` styles).
 */

export const fontFamily = {
  sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: '"Inter Display", "Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", "IBM Plex Mono", Consolas, monospace',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Type scale (px). Each entry is documented with its intended use so we
 * keep typography decisions centralized rather than hard-coded in components.
 */
export const fontSize = {
  'display-xl': '56px', // Balance hero, onboarding
  'display-lg': '40px', // Page headers
  'display-md': '32px', // Section headers
  'title-lg': '24px', // Card titles
  'title-md': '20px', // Modal titles
  'title-sm': '18px', // Row titles
  'body-lg': '16px', // Body default
  'body-md': '14px', // Dense UI, tables
  'body-sm': '13px', // Meta, captions
  label: '12px', // Labels, eyebrows
  'mono-lg': '20px', // Monetary hero
  'mono-md': '14px', // Monetary rows, tables
  'mono-sm': '12px', // Timestamps, reference codes
} as const;

export const lineHeight = {
  'display-xl': '60px',
  'display-lg': '48px',
  'display-md': '40px',
  'title-lg': '32px',
  'title-md': '28px',
  'title-sm': '24px',
  'body-lg': '24px',
  'body-md': '20px',
  'body-sm': '18px',
  label: '16px',
  'mono-lg': '28px',
  'mono-md': '20px',
  'mono-sm': '16px',
} as const;

export const tracking = {
  tight: '-0.02em',
  normal: '0em',
  wide: '0.01em',
  label: '0.04em',
} as const;

/**
 * Tabular numerics — toggled on for any monetary or ledger surface.
 * Components that show money should set this on the element OR rely
 * on the `font-mono*` styles which set it for them.
 */
export const numeric = {
  tabular: '"tnum", "lnum"',
  proportional: '"pnum", "lnum"',
} as const;
