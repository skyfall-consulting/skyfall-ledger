import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  LedgerThemeProvider,
  useLedgerTheme,
  type LedgerThemeMode,
} from './LedgerThemeProvider';
import { fontFamily, fontSize, lineHeight, fontWeight, tracking } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { space } from '../tokens/spacing';
import { teal, obsidian } from '../tokens/colors';

/**
 * Foundations / Theme
 *
 * Verifies the Ledger theme provider, the `data-ledger-theme` toggle, and
 * the resolved CSS variables in both modes side-by-side. Dark is the default
 * (and identity-defining) mode for Skyfall Ledger.
 */
const meta: Meta = {
  title: 'Components/Foundations/Theme',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '`<LedgerThemeProvider>` sets `data-ledger-theme` on a wrapper element and exposes `useLedgerTheme()` to children. Dark is the hero mode; light is fully supported.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ---------- Demo card ----------

const DemoCard: React.FC = () => (
  <div
    style={{
      borderRadius: radius.lg,
      border: '1px solid var(--ledger-color-border-default)',
      background: 'var(--ledger-color-surface-raised)',
      padding: space[8],
      color: 'var(--ledger-color-text-primary)',
      fontFamily: fontFamily.sans,
      maxWidth: 360,
    }}
  >
    <div
      style={{
        fontSize: fontSize.label,
        fontWeight: fontWeight.semibold,
        textTransform: 'uppercase',
        letterSpacing: tracking.label,
        color: 'var(--ledger-color-text-muted)',
        marginBottom: space[3],
      }}
    >
      Available balance
    </div>
    <div
      style={{
        fontFamily: fontFamily.display,
        fontSize: fontSize['display-md'],
        lineHeight: lineHeight['display-md'],
        fontWeight: fontWeight.semibold,
        letterSpacing: tracking.tight,
        fontFeatureSettings: '"tnum","lnum"',
      }}
    >
      $12,840.<span style={{ color: 'var(--ledger-color-text-muted)' }}>52</span>
    </div>
    <div
      style={{
        marginTop: space[3],
        fontSize: fontSize['body-sm'],
        color: 'var(--ledger-color-text-secondary)',
      }}
    >
      Updated just now · 4 accounts linked
    </div>
    <div
      style={{
        marginTop: space[7],
        display: 'flex',
        gap: space[4],
      }}
    >
      <button
        style={{
          padding: '10px 16px',
          borderRadius: radius.sm,
          background: teal[500],
          color: obsidian[900],
          border: 'none',
          fontFamily: fontFamily.sans,
          fontSize: fontSize['body-md'],
          fontWeight: fontWeight.semibold,
          cursor: 'pointer',
        }}
      >
        Move money
      </button>
      <button
        style={{
          padding: '10px 16px',
          borderRadius: radius.sm,
          background: 'transparent',
          color: 'var(--ledger-color-text-primary)',
          border: '1px solid var(--ledger-color-border-default)',
          fontFamily: fontFamily.sans,
          fontSize: fontSize['body-md'],
          fontWeight: fontWeight.semibold,
          cursor: 'pointer',
        }}
      >
        Details
      </button>
    </div>
  </div>
);

// ---------- Toggle demo ----------

const ToggleHeader: React.FC = () => {
  const { mode, toggleMode } = useLedgerTheme();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: space[7],
      }}
    >
      <div>
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: fontSize['mono-sm'],
            color: 'var(--ledger-color-text-muted)',
          }}
        >
          data-ledger-theme
        </div>
        <div
          style={{
            fontFamily: fontFamily.display,
            fontSize: fontSize['title-md'],
            fontWeight: fontWeight.semibold,
            color: 'var(--ledger-color-text-primary)',
          }}
        >
          {mode}
        </div>
      </div>
      <button
        onClick={toggleMode}
        style={{
          padding: '8px 14px',
          borderRadius: radius.sm,
          background: teal[500],
          color: obsidian[900],
          border: 'none',
          fontFamily: fontFamily.sans,
          fontSize: fontSize['body-sm'],
          fontWeight: fontWeight.semibold,
          cursor: 'pointer',
        }}
      >
        Toggle theme
      </button>
    </div>
  );
};

export const ToggleDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the button to flip between dark and light. The wrapper updates `data-ledger-theme` and every CSS variable in the subtree resolves to the new scope.',
      },
    },
  },
  render: () => (
    <div style={{ padding: space[10], background: 'var(--ledger-color-surface-canvas)', minHeight: 480 }}>
      <ToggleHeader />
      <DemoCard />
    </div>
  ),
};

// ---------- Side-by-side ----------

const SideBySideMode: React.FC<{ mode: LedgerThemeMode }> = ({ mode }) => (
  <LedgerThemeProvider mode={mode}>
    <div
      style={{
        background: 'var(--ledger-color-surface-canvas)',
        padding: space[9],
        minHeight: 420,
        borderRadius: radius.lg,
        border: '1px solid var(--ledger-color-border-subtle)',
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: fontSize['mono-sm'],
          color: 'var(--ledger-color-text-muted)',
          marginBottom: space[6],
          textTransform: 'uppercase',
          letterSpacing: tracking.label,
        }}
      >
        {mode}
      </div>
      <DemoCard />
    </div>
  </LedgerThemeProvider>
);

export const SideBySide: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Both themes rendered together so we can spot-check parity. Each side is wrapped in its own provider in controlled mode.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: space[7],
        padding: space[7],
      }}
    >
      <SideBySideMode mode="dark" />
      <SideBySideMode mode="light" />
    </div>
  ),
};
