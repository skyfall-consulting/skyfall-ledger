/**
 * Skyfall Ledger — Package root
 *
 * Subpath layout:
 *   @skyfall_ai/ledger          → this entry (theme, tokens, hooks, types, utils, components)
 *   @skyfall_ai/ledger/charts   → src/charts/index.ts
 *   @skyfall_ai/ledger/icons    → src/icons/index.ts
 *   @skyfall_ai/ledger/tokens   → src/tokens/ledger-tokens.css (raw CSS variables)
 *   @skyfall_ai/ledger/styles   → dist/index.css (compiled stylesheet)
 *
 * Wave 0 ships foundations only — components are added in Wave 2+.
 * Charts and icons live behind their subpath exports so consumers that
 * never touch them never bundle Recharts or Lucide.
 */

// Theme
export * from './theme';

// Tokens (typed)
export * from './tokens';

// Hooks
export * from './hooks';

// Types
export * from './types';

// Utils
export * from './utils';

// Components — empty in Wave 0, ready to receive Wave 2 work
export * from './components';

/**
 * Package version — kept in sync with package.json by hand for now.
 * A future build step can replace this from `process.env.npm_package_version`.
 */
export const LEDGER_VERSION = '0.0.1';
