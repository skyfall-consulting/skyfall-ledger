/**
 * Skyfall Ledger — z-index scale
 *
 * Reserved bands so layers never collide:
 *   0–10   default content
 *   100s   sticky / nav
 *   1000s  overlays / dropdowns
 *   2000s  modals / drawers
 *   3000s  toasts / critical
 */
export const zIndex = {
  base: 0,
  raised: 1,
  sticky: 100,
  header: 200,
  dropdown: 1000,
  popover: 1100,
  tooltip: 1200,
  modal: 2000,
  drawer: 2100,
  toast: 3000,
  critical: 3100,
} as const;
