import * as React from 'react';
import type { Preview } from '@storybook/react';
import { LedgerThemeProvider, type LedgerThemeMode } from '../src/theme';
import skyfallLedgerTheme from './skyfallLedgerTheme';
import '../src/tokens/ledger-tokens.css';
import '../src/components/primitives.css';
import './storybook.css';

/**
 * Skyfall Ledger — Storybook preview
 *
 * - Wraps every story in `<LedgerThemeProvider>` so tokens, theme, and the
 *   chart `useChartTheme` hook all resolve correctly.
 * - Exposes a global `theme` toolbar to flip between dark (default) and light.
 * - Sets background swatches that match Ledger's surface tokens so dark
 *   stories never leak through Storybook's white canvas.
 * - Charts opt into a `parameters.layout = 'chart'` wrapper that gives
 *   `ResponsiveContainer` a deterministic min-height.
 */

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: skyfallLedgerTheme,
    },
    a11y: {
      test: 'error',
    },
    backgrounds: {
      default: 'Obsidian',
      values: [
        { name: 'Obsidian', value: '#0B1018' }, // dark canvas
        { name: 'Surface (dark)', value: '#161C28' },
        { name: 'Paper', value: '#F7F8FA' }, // light canvas
        { name: 'White', value: '#FFFFFF' },
      ],
    },
    layout: 'centered',
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Ledger theme mode',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark (Obsidian)' },
          { value: 'light', title: 'Light (Paper)' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, ctx) => {
      const mode = (ctx.globals.theme ?? 'dark') as LedgerThemeMode;
      const isChartLayout = ctx.parameters?.layout === 'chart';

      return (
        <LedgerThemeProvider mode={mode}>
          <div
            className="ledger-sb-surface"
            style={{
              minHeight: isChartLayout ? 320 : undefined,
              minWidth: isChartLayout ? 480 : undefined,
              padding: '24px',
            }}
          >
            <Story />
          </div>
        </LedgerThemeProvider>
      );
    },
  ],
};

export default preview;
