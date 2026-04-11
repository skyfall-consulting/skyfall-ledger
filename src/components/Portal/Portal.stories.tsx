import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Portal } from './Portal';

/**
 * Utils / Portal
 *
 * `<Portal />` renders its children into a DOM node outside the
 * parent React tree (defaults to `document.body`). Useful for
 * tooltips, modals, and floating overlays that need to escape
 * stacking context or overflow constraints.
 */
const meta: Meta<typeof Portal> = {
  title: 'Components/Utils/Portal',
  component: Portal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Portal -- Renders children into a DOM node outside the parent React component hierarchy using `createPortal`. Defaults to `document.body` but accepts a custom container.\n\nUsage:\n- Use for overlays, tooltips, modals, and floating content that needs to escape stacking context or overflow constraints\n- Set `disabled` to render children inline instead of portalling (useful for testing or conditional behavior)\n- SSR-safe -- falls back to inline rendering until the component mounts on the client',
      },
    },
  },
  argTypes: {
    container: {
      description: 'Target container element. Defaults to `document.body`.',
    },
    disabled: {
      description: 'When `true`, renders children inline instead of portalling.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

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
        The blue box below is rendered via a Portal into{' '}
        <code>document.body</code>. Inspect the DOM to confirm it lives
        outside the Storybook iframe root:
      </p>

      <Portal>
        <div
          style={{
            position: 'fixed',
            bottom: 'var(--ledger-space-5)',
            right: 'var(--ledger-space-5)',
            padding: 'var(--ledger-space-4) var(--ledger-space-6)',
            background: 'var(--ledger-color-primary)',
            color: '#fff',
            borderRadius: 'var(--ledger-radius-md)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 14,
            fontWeight: 600,
            boxShadow: 'var(--ledger-shadow-3)',
            zIndex: 9999,
          }}
        >
          Portalled to document.body
        </div>
      </Portal>
    </div>
  ),
};

// ---------- CustomContainer ----------

export const CustomContainer: Story = {
  render: function CustomContainerStory() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
      setReady(true);
    }, []);

    return (
      <div style={{ fontFamily: 'var(--ledger-font-sans)' }}>
        <p
          style={{
            fontSize: 13,
            color: 'var(--ledger-color-text-secondary)',
            marginBottom: 'var(--ledger-space-4)',
          }}
        >
          The content below is portalled into a custom container (the
          bordered box):
        </p>

        <div
          ref={containerRef}
          style={{
            minHeight: 80,
            padding: 'var(--ledger-space-5)',
            border: '2px dashed var(--ledger-color-border-subtle)',
            borderRadius: 'var(--ledger-radius-md)',
            background: 'var(--ledger-color-surface-sunken)',
          }}
        />

        {ready && (
          <Portal container={containerRef.current}>
            <div
              style={{
                padding: 'var(--ledger-space-4)',
                background: 'var(--ledger-color-surface-raised)',
                borderRadius: 'var(--ledger-radius-sm)',
                color: 'var(--ledger-color-text-primary)',
                fontWeight: 500,
              }}
            >
              This content was portalled into the dashed container above.
            </div>
          </Portal>
        )}
      </div>
    );
  },
};

// ---------- Disabled ----------

export const Disabled: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--ledger-font-sans)' }}>
      <p
        style={{
          fontSize: 13,
          color: 'var(--ledger-color-text-secondary)',
          marginBottom: 'var(--ledger-space-4)',
        }}
      >
        When <code>disabled</code> is <code>true</code>, the Portal renders
        its children inline instead of portalling:
      </p>

      <div
        style={{
          padding: 'var(--ledger-space-5)',
          border: '1px solid var(--ledger-color-border-subtle)',
          borderRadius: 'var(--ledger-radius-md)',
          background: 'var(--ledger-color-surface-raised)',
        }}
      >
        <Portal disabled>
          <div
            style={{
              padding: 'var(--ledger-space-4)',
              background: 'var(--ledger-color-surface-sunken)',
              borderRadius: 'var(--ledger-radius-sm)',
              color: 'var(--ledger-color-text-primary)',
              fontWeight: 500,
            }}
          >
            Rendered inline (portal disabled) -- stays inside the parent.
          </div>
        </Portal>
      </div>
    </div>
  ),
};
