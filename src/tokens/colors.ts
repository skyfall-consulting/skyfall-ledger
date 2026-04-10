/**
 * Skyfall Ledger — Color tokens
 *
 * Identity: "Obsidian & Lucid Teal"
 *  - Obsidian neutral spine carries the surface system in both light and dark modes.
 *  - Lucid Teal is the single signal/action color.
 *  - Mint / Coral / Amber are the financial semantic palette (positive / negative / watch).
 *  - Horizon Blue + Violet are restrained secondary accents reserved for data-viz and identity.
 *
 * Numeric scales follow the Skyfall convention (50 → 950) so they line up with Aegis.
 */

/** Neutral spine — Obsidian */
export const obsidian = {
  0: '#FFFFFF',
  50: '#F7F8FA',
  100: '#EEF1F5',
  200: '#DDE3EC',
  300: '#BDC6D3',
  400: '#8994A5',
  500: '#5B6779',
  600: '#3B4556',
  700: '#232B3A',
  800: '#161C28',
  900: '#0B1018',
  950: '#05080E',
} as const;

/** Primary accent — Lucid Teal (the one signal color) */
export const teal = {
  50: '#E6FBF6',
  100: '#C8F6EC',
  200: '#9AEFDD',
  300: '#6FF5E1',
  400: '#2EE6C6',
  500: '#14C8AA',
  600: '#0FA48C',
  700: '#0B7D6B',
  800: '#0A5B4F',
  900: '#083F37',
} as const;

/** Secondary accent — Horizon Blue (linked accounts, info, identity) */
export const horizon = {
  50: '#EAF3FF',
  100: '#D2E5FF',
  200: '#A8CBFF',
  300: '#7DAEFF',
  400: '#5AA8FF',
  500: '#2E7FE8',
  600: '#1C5BBA',
  700: '#143F85',
  800: '#0E2E63',
} as const;

/** Tertiary accent — Violet Index (used sparingly for data-viz differentiation) */
export const violet = {
  50: '#F1EEFF',
  100: '#E3DCFF',
  200: '#C9BCFF',
  300: '#B0A0FF',
  400: '#9B8CFF',
  500: '#6E5BE6',
  600: '#5142B5',
  700: '#372D80',
} as const;

/** Positive / Income / Up — Mint */
export const mint = {
  50: '#E8F8EE',
  100: '#CDEFD8',
  200: '#9CDFB1',
  300: '#6BCF8B',
  400: '#3FBF6E',
  500: '#29C26A',
  600: '#1E9954',
  700: '#16703D',
} as const;

/** Negative / Spend / Down — Coral */
export const coral = {
  50: '#FDECEC',
  100: '#FAD2D2',
  200: '#F4A6A6',
  300: '#EE7A7A',
  400: '#E85959',
  500: '#E54B4B',
  600: '#B83434',
  700: '#852424',
} as const;

/** Warning / Watch — Amber */
export const amber = {
  50: '#FFF6E5',
  100: '#FFE9BF',
  200: '#FFD680',
  300: '#FFC247',
  400: '#FBB024',
  500: '#F5A524',
  600: '#C47C0F',
  700: '#8C5708',
} as const;

/** Sky — soft accent for backgrounds and data-viz */
export const sky = {
  100: '#E6F4FF',
  200: '#C6E6FF',
  300: '#9CD2FF',
  400: '#6FBAF5',
  500: '#3E9EE0',
} as const;

/** Semantic role aliases — these are what most components should consume */
export const semantic = {
  positive: mint[500],
  positiveSubtle: mint[50],
  negative: coral[500],
  negativeSubtle: coral[50],
  warning: amber[500],
  warningSubtle: amber[50],
  info: horizon[500],
  infoSubtle: horizon[50],
  pending: obsidian[400],
  accent: teal[400],
} as const;

/** Light-mode aliases (default theme) */
export const light = {
  text: {
    primary: obsidian[900],
    secondary: obsidian[600],
    muted: obsidian[500],
    inverse: obsidian[0],
    accent: teal[600],
  },
  surface: {
    canvas: obsidian[50],
    default: obsidian[0],
    raised: obsidian[0],
    sunken: obsidian[100],
    overlay: 'rgba(11, 16, 24, 0.45)',
  },
  border: {
    subtle: obsidian[100],
    default: obsidian[200],
    strong: obsidian[300],
    accent: teal[400],
  },
} as const;

/** Dark-mode aliases (hero theme — Obsidian) */
export const dark = {
  text: {
    primary: obsidian[0],
    secondary: obsidian[300],
    muted: obsidian[400],
    inverse: obsidian[900],
    accent: teal[300],
  },
  surface: {
    canvas: obsidian[900],
    default: obsidian[800],
    raised: obsidian[700],
    sunken: obsidian[950],
    overlay: 'rgba(5, 8, 14, 0.7)',
  },
  border: {
    subtle: obsidian[700],
    default: obsidian[600],
    strong: obsidian[500],
    accent: teal[400],
  },
} as const;

/**
 * Data-visualization palette — perceptually ordered, colorblind-checked.
 * Used by `chartPalette.ts` to seed Recharts series colors.
 */
export const dataVis = [
  teal[400],
  horizon[500],
  violet[500],
  mint[500],
  amber[500],
  coral[500],
  sky[300],
  obsidian[400],
] as const;

export type ColorScale = typeof obsidian;
