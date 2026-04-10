import type { StorybookConfig } from '@storybook/react-vite';

/**
 * Skyfall Ledger — Storybook config
 *
 * Stories live alongside source under `src/**`. The story conventions:
 *   - Foundations:  src/tokens/**\/*.stories.tsx
 *   - Theme:        src/theme/**\/*.stories.tsx
 *   - Charts:       src/charts/**\/*.stories.tsx
 *   - Icons:        src/icons/**\/*.stories.tsx
 *   - Components:   src/components/**\/*.stories.tsx
 *
 * Wave 0 ships zero stories — only the host. Story files are added as
 * components and charts come online in subsequent waves.
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['./static'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
