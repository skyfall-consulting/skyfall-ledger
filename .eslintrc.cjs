/**
 * Skyfall Ledger — ESLint config
 *
 * Two architectural guardrails are enforced here:
 *
 *   1. `recharts` may only be imported from inside `src/charts/**`. Public
 *      chart components inside that folder are free to compose Recharts
 *      directly — wrapping Recharts CHILDREN in JSX breaks Recharts' internal
 *      child-registration, so the boundary lives at the chart-folder level
 *      and theming is centralized via prop-builder helpers in
 *      `src/charts/_internal/rechartsConfig.ts`.
 *
 *   2. `lucide-react` may only be imported from inside `src/icons/**`. Feature
 *      components must import icons from `@skyfall_ai/ledger/icons`.
 *
 * These rules keep theming, accessibility defaults, and bundle hygiene
 * centralized so a single change ripples through the whole library.
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: { version: '18' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'recharts',
            message:
              "Import chart components from '@skyfall_ai/ledger/charts'. Direct `recharts` imports are only allowed inside src/charts/**.",
          },
          {
            name: 'lucide-react',
            message:
              "Import icons from '@skyfall_ai/ledger/icons'. Direct `lucide-react` imports are only allowed inside src/icons/**.",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      // The chart folder is the recharts boundary. Public chart components
      // (Sparkline, future LedgerLineChart, etc.) live directly under
      // src/charts/ and may import recharts. Theming flows through
      // prop-builder helpers in _internal/rechartsConfig.ts — never via
      // JSX wrappers around Recharts children.
      files: ['src/charts/**/*.{ts,tsx}'],
      rules: { 'no-restricted-imports': 'off' },
    },
    {
      // The icon layer is the only place lucide-react may be imported.
      files: ['src/icons/**/*.{ts,tsx}'],
      rules: { 'no-restricted-imports': 'off' },
    },
  ],
  ignorePatterns: ['dist', 'storybook-static', 'node_modules', '*.cjs'],
};
