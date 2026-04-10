# Changelog

All notable changes to `@skyfall_ai/ledger` will be documented here.
This project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- **Wave 0 — Scaffolding**
  - Package skeleton: subpath exports (`.`, `./charts`, `./icons`, `./styles`, `./tokens`).
  - tsup dual CJS/ESM builds with `splitting`, `treeshake`, `"use client"` banner, and externals for React / Recharts / Lucide.
  - tsconfig with strict mode, bundler resolution, and react-jsx.
  - ESLint guardrails: `recharts` and `lucide-react` blocked outside their designated folders.
  - Storybook 8 + react-vite host with Obsidian chrome theme, theme toolbar, and a11y addon.
- **Wave 0 — Tokens**
  - Color (Obsidian, Lucid Teal, Mint, Coral, Amber, Horizon, Violet, Sky), typography (Inter / Inter Display / JetBrains Mono with tabular numerics), spacing, radius, shadows (light + dark dialects), motion (`settle` curve), focus, layout, opacity, z-index.
  - CSS-variable counterpart at `src/tokens/ledger-tokens.css` with light/dark scopes.
- **Wave 0 — Theme**
  - `LedgerThemeProvider` (controlled + uncontrolled), `useLedgerTheme()` (throws), `useLedgerThemeSafe()` (returns null). Defaults to dark.
- **Wave 0 — Icons**
  - Curated Lucide whitelist (~85 icons) and 5 custom finance glyphs (`CardFreeze`, `FraudShield`, `ReceiptLong`, `Split`, `Iban`) built with `createLucideIcon`.
  - String-keyed registry and `<Icon name="…" />` facade with `sizeToken` / `tone` extensions.
- **Wave 0 — Chart architecture**
  - Token → Recharts theme bridge (`rechartsTheme.ts`).
  - `useChartTheme` hook, `useReducedMotion` hook, Intl-based formatters.
- **Wave 1 — Foundation stories**
  - `Foundations/Tokens` (colors, typography, spacing, radius, shadows, motion, focus).
  - `Foundations/Theme` (toggle demo + side-by-side dark/light).
  - `Foundations/Icons` (Lucide gallery, custom gallery, sizes, tones, parity check).
- **Wave 1 — Amount primitive**
  - `<Amount />` with `Intl.NumberFormat.formatToParts` walk, tabular lining numerals, sign-driven semantic color, accounting parens, screen-reader-friendly `srMoney` label.
  - Sizes: `sm` / `md` / `lg` / `xl` / `hero`. Tones: `auto` / `neutral` / `positive` / `negative` / `accent` / `muted`. Sign: `auto` / `always` / `never` / `accounting`.
  - 16 stories incl. Hero, Euro/Yen/Pound, Compact, Accounting, Invalid, Grid.
- **Wave 1 — Sparkline**
  - `<Sparkline />` minimal inline trend line. Auto/accent/positive/negative/neutral tone, reduced-motion gate, `figure` role with required `ariaLabel`.
  - 11 stories incl. `InsideCard` composing with `<Amount />`.

### Changed
- **Chart architecture refactor (post Wave 1).** Removed `_primitives/` folder. Recharts wrapping in JSX broke Recharts' internal child-registration. Replaced with prop-builder helpers in `src/charts/_internal/rechartsConfig.ts`. Public chart components now compose raw Recharts directly inside the `src/charts/**` boundary; ESLint enforces the boundary at the chart-folder level. `ThemedResponsiveContainer` is the only retained wrapper because `ResponsiveContainer` is a layout primitive that Recharts never inspects by reference.

### Notes
- This is the initial scaffold + foundations release. No public component contract is stable yet. Expect breaking changes until 0.1.0.
