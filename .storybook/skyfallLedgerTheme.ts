import { create } from '@storybook/theming/create';

/**
 * Skyfall Ledger — Storybook chrome theme
 *
 * Premium FinTech identity: Obsidian surfaces, warm gold accent from the
 * Ledger feather emblem, Lucid Teal reserved for interactive states.
 *
 * This theme controls the Storybook UI chrome (sidebar, toolbar, docs).
 * The story preview itself uses the real `LedgerThemeProvider`.
 */
export default create({
  base: 'dark',

  // Brand
  brandTitle: 'Skyfall Ledger',
  brandUrl: 'https://skyfall.consulting',
  brandTarget: '_self',
  brandImage: './ledger-logo.png',

  // Warm gold accent (from the logo emblem)
  colorPrimary: '#C9A84C',
  colorSecondary: '#C9A84C',

  // Obsidian chrome — deep, premium surfaces
  appBg: '#080C14',
  appContentBg: '#0E1420',
  appPreviewBg: '#0B1018',
  appBorderColor: '#1C2433',
  appBorderRadius: 6,

  // Text — high contrast with warm undertones
  textColor: '#E8ECF2',
  textInverseColor: '#080C14',
  textMutedColor: '#6B7A8D',

  // Toolbar — clean, restrained
  barTextColor: '#7A8899',
  barHoverColor: '#C9A84C',
  barSelectedColor: '#C9A84C',
  barBg: '#0A0F18',

  // Inputs — recessed, subtle
  inputBg: '#0E1420',
  inputBorder: '#1C2433',
  inputTextColor: '#E8ECF2',
  inputBorderRadius: 4,

  // Booleans
  booleanBg: '#0E1420',
  booleanSelectedBg: '#C9A84C',

  // Buttons
  buttonBg: '#141C2A',
  buttonBorder: '#1C2433',

  // Grid
  gridCellSize: 8,

  // Typography — use Inter to match Ledger
  fontBase: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
});
