import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { NoSSR } from './NoSSR';

/**
 * Utils / No SSR
 *
 * `<NoSSR />` defers rendering of its children until the component
 * mounts on the client, preventing hydration mismatches from
 * browser-only APIs like `window` or `navigator`.
 */
const meta: Meta<typeof NoSSR> = {
  title: 'Components/Utils/No SSR',
  component: NoSSR,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'NoSSR -- Client-only rendering utility that defers children until the component has mounted on the client. Prevents hydration mismatches caused by browser-only APIs (`window`, `navigator`, `localStorage`).\n\nUsage:\n- Wrap content that depends on browser-only APIs to prevent SSR hydration errors\n- Provide an optional `fallback` prop to render a placeholder (e.g. skeleton) during server-side rendering\n- Uses `useEffect` mount detection -- zero runtime cost after initial render',
      },
    },
  },
  argTypes: {
    fallback: {
      description: 'Optional placeholder rendered during SSR / before mount.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NoSSR>;

// ---------- Default ----------

export const Default: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--ledger-font-sans)' }}>
      <p
        style={{
          fontSize: 13,
          color: 'var(--ledger-color-text-secondary)',
          marginBottom: 'var(--ledger-space-4)',
        }}
      >
        The viewport width below is read from <code>window.innerWidth</code>,
        which does not exist on the server:
      </p>

      <NoSSR>
        <div
          style={{
            padding: 'var(--ledger-space-5)',
            background: 'var(--ledger-color-surface-raised)',
            borderRadius: 'var(--ledger-radius-sm)',
            color: 'var(--ledger-color-text-primary)',
            fontWeight: 500,
          }}
        >
          Viewport width: {window.innerWidth}px
        </div>
      </NoSSR>
    </div>
  ),
};

// ---------- WithFallback ----------

export const WithFallback: Story = {
  render: () => {
    const skeletonStyle: React.CSSProperties = {
      height: 48,
      borderRadius: 'var(--ledger-radius-sm)',
      background: 'var(--ledger-color-surface-sunken)',
      animation: 'pulse 1.5s ease-in-out infinite',
    };

    return (
      <div style={{ fontFamily: 'var(--ledger-font-sans)' }}>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>

        <p
          style={{
            fontSize: 13,
            color: 'var(--ledger-color-text-secondary)',
            marginBottom: 'var(--ledger-space-4)',
          }}
        >
          A skeleton placeholder is shown until the client mounts:
        </p>

        <NoSSR fallback={<div style={skeletonStyle} />}>
          <div
            style={{
              padding: 'var(--ledger-space-5)',
              background: 'var(--ledger-color-surface-raised)',
              borderRadius: 'var(--ledger-radius-sm)',
              boxShadow: 'var(--ledger-shadow-2)',
              color: 'var(--ledger-color-text-primary)',
              fontWeight: 500,
            }}
          >
            Client-only content loaded. User agent:{' '}
            <span style={{ color: 'var(--ledger-color-text-secondary)', fontWeight: 400 }}>
              {navigator.userAgent.split(' ')[0]}
            </span>
          </div>
        </NoSSR>
      </div>
    );
  },
};
