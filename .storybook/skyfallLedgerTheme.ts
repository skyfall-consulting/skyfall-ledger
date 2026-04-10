import { create } from '@storybook/theming/create';

/**
 * Skyfall Ledger — Storybook chrome theme
 *
 * Built directly from Ledger's identity: Obsidian surfaces, Lucid Teal accent.
 * The story preview itself uses the real `LedgerThemeProvider`; this theme
 * only controls the Storybook UI chrome (sidebar, toolbar, docs).
 */
export default create({
  base: 'dark',

  brandTitle: 'Skyfall Ledger',
  brandUrl: 'https://skyfall.consulting',
  brandTarget: '_self',

  // Lucid Teal accent
  colorPrimary: '#2EE6C6',
  colorSecondary: '#2EE6C6',

  // Obsidian chrome
  appBg: '#0B1018',
  appContentBg: '#161C28',
  appPreviewBg: '#0B1018',
  appBorderColor: '#232B3A',
  appBorderRadius: 8,

  // Text
  textColor: '#FFFFFF',
  textInverseColor: '#0B1018',
  textMutedColor: '#8994A5',

  // Toolbar
  barTextColor: '#8994A5',
  barHoverColor: '#2EE6C6',
  barSelectedColor: '#2EE6C6',
  barBg: '#0B1018',

  // Inputs
  inputBg: '#161C28',
  inputBorder: '#232B3A',
  inputTextColor: '#FFFFFF',
  inputBorderRadius: 6,

  // Booleans
  booleanBg: '#161C28',
  booleanSelectedBg: '#2EE6C6',

  // Buttons
  buttonBg: '#161C28',
  buttonBorder: '#232B3A',

  // Grid
  gridCellSize: 8,
});
