/**
 * Skyfall Ledger — Elevation / shadow tokens
 *
 * Two dialects, side-by-side:
 *  - Light mode uses soft, low-chroma drop shadows.
 *  - Dark mode prefers borders + a faint inner highlight over drop shadows
 *    so cards read clearly against an obsidian canvas.
 */

export const shadowLight = {
  none: 'none',
  1: '0 1px 2px rgba(11, 16, 24, 0.04), 0 2px 8px rgba(11, 16, 24, 0.04)',
  2: '0 2px 4px rgba(11, 16, 24, 0.06), 0 8px 16px rgba(11, 16, 24, 0.06)',
  3: '0 4px 8px rgba(11, 16, 24, 0.08), 0 12px 24px rgba(11, 16, 24, 0.08)',
  4: '0 8px 16px rgba(11, 16, 24, 0.10), 0 16px 40px rgba(11, 16, 24, 0.10)',
  5: '0 12px 24px rgba(11, 16, 24, 0.12), 0 24px 56px rgba(11, 16, 24, 0.14)',
} as const;

export const shadowDark = {
  none: 'none',
  1: 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 1px 2px rgba(0, 0, 0, 0.4)',
  2: 'inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 2px 6px rgba(0, 0, 0, 0.5)',
  3: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 6px 16px rgba(0, 0, 0, 0.55)',
  4: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 12px 32px rgba(0, 0, 0, 0.6)',
  5: 'inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 20px 48px rgba(0, 0, 0, 0.65)',
} as const;

export type ElevationToken = keyof typeof shadowLight;
