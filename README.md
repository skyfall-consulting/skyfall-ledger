# Skyfall Ledger

> Modern fintech design system. Composed money UI for the next generation of financial products.

`@skyfall_ai/ledger` is the financial-services design system in the Skyfall suite — a premium, modular, scalable UI library for building digital banking, payments, wallet, budgeting, investing, and financial-ops experiences.

It is the sibling of [Skyfall Aegis](../skyfall-aegis), built in the same spirit but tuned for the fintech domain: tabular numerics, calm trust surfaces, action-first money flows, and a clean wrapper architecture for charts and icons.

## Status

**Wave 1 — Foundations + first primitives.** Tokens, theme, icons, the `<Amount />` primitive, and the `<Sparkline />` chart are in. Wider component development resumes in Wave 2.

## Tech stack

- React 18 + TypeScript
- Storybook 8 + Vite
- tsup (CJS + ESM + .d.ts)
- Recharts (charting foundation, wrapped — never used directly)
- Lucide (icon foundation, extended with custom finance glyphs)

## Subpath exports

```ts
import { LedgerThemeProvider } from '@skyfall_ai/ledger';
import { LedgerLineChart } from '@skyfall_ai/ledger/charts';
import { Wallet, CardFreeze } from '@skyfall_ai/ledger/icons';
import '@skyfall_ai/ledger/tokens';
```

## Architecture rules

1. **Charts** are public Ledger components that compose raw Recharts directly inside the `src/charts/**` boundary. Theming flows through prop-builder helpers in `src/charts/_internal/rechartsConfig.ts` (never JSX wrappers around Recharts children — that breaks Recharts' internal child-registration). Direct `recharts` imports are restricted by ESLint to `src/charts/**`.
2. **Icons** come from a curated Lucide whitelist plus a small custom set of fintech-native glyphs. Custom icons are built with Lucide's `createLucideIcon` factory so they share the same prop API. Direct `lucide-react` imports are restricted by ESLint to `src/icons/`.
3. **Tokens** ship in two forms — typed TS modules under `src/tokens/*.ts` and a CSS-variable stylesheet at `src/tokens/ledger-tokens.css`.
4. **Theme** flows through `LedgerThemeProvider` (light / dark) and is consumed by `useLedgerTheme()`.

## Scripts

```bash
npm run dev               # storybook on http://localhost:6007
npm run build             # tsup → dist/
npm run build:storybook   # storybook build → storybook-static/
npm run typecheck         # tsc --noEmit
npm run lint              # eslint src
npm run clean             # rm -rf dist storybook-static
npm run chromatic         # publish storybook to Chromatic (requires CHROMATIC_PROJECT_TOKEN)
```

## Publishing Storybook to Chromatic

Set `CHROMATIC_PROJECT_TOKEN` in your environment (or in the GitHub repo's
Actions secrets) and run:

```bash
npm run chromatic
```

CI is wired in `.github/workflows/`:
- `ci.yml` runs typecheck, lint, build, and Storybook build on every push and PR.
- `chromatic.yml` publishes Storybook to Chromatic on push to `main` and on PRs.

## License

MIT — see [LICENSE](./LICENSE).
