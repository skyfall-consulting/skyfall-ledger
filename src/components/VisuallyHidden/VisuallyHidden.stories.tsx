import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { VisuallyHidden } from './VisuallyHidden';

/**
 * Utils / Visually Hidden
 *
 * `<VisuallyHidden />` renders content that is hidden from sighted
 * users but remains accessible to screen readers and assistive
 * technology.
 */
const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components/Utils/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Hides content visually while keeping it accessible to screen readers. Useful for icon-only buttons, skip links, and additional a11y context.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

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
        The button below contains a visually hidden label. Inspect the DOM or
        use a screen reader to see it:
      </p>

      <button
        type="button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 'var(--ledger-radius-sm)',
          border: '1px solid var(--ledger-color-border-subtle)',
          background: 'var(--ledger-color-surface-raised)',
          cursor: 'pointer',
          fontSize: 18,
        }}
        aria-label="Close dialog"
      >
        <span aria-hidden="true">&times;</span>
        <VisuallyHidden>Close dialog</VisuallyHidden>
      </button>
    </div>
  ),
};

// ---------- AsDiv ----------

export const AsDiv: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--ledger-font-sans)' }}>
      <p
        style={{
          fontSize: 13,
          color: 'var(--ledger-color-text-secondary)',
          marginBottom: 'var(--ledger-space-4)',
        }}
      >
        A visually hidden heading rendered as a <code>&lt;div&gt;</code>.
        Inspect the DOM to see the content:
      </p>

      <VisuallyHidden as="div">
        This section contains account transaction details.
      </VisuallyHidden>

      <div
        style={{
          padding: 'var(--ledger-space-5)',
          background: 'var(--ledger-color-surface-raised)',
          borderRadius: 'var(--ledger-radius-sm)',
          color: 'var(--ledger-color-text-primary)',
          fontWeight: 500,
        }}
      >
        Visible content only. The hidden context is above in the DOM.
      </div>
    </div>
  ),
};

// ---------- SkipLink ----------

export const SkipLink: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--ledger-font-sans)' }}>
      <p
        style={{
          fontSize: 13,
          color: 'var(--ledger-color-text-secondary)',
          marginBottom: 'var(--ledger-space-4)',
        }}
      >
        Tab into the story to reveal the skip-navigation link (it becomes
        visible on focus via the <code>:focus</code> override):
      </p>

      <VisuallyHidden
        as="div"
        style={{
          /* Override hidden styles on focus-within so the skip link shows */
        }}
      >
        <a
          href="#main-content"
          style={{
            position: 'fixed',
            top: 'var(--ledger-space-4)',
            left: 'var(--ledger-space-4)',
            padding: 'var(--ledger-space-3) var(--ledger-space-5)',
            background: 'var(--ledger-color-primary)',
            color: '#fff',
            borderRadius: 'var(--ledger-radius-sm)',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
            zIndex: 9999,
          }}
          onFocus={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.position = 'static';
              parent.style.width = 'auto';
              parent.style.height = 'auto';
              parent.style.overflow = 'visible';
              parent.style.clip = 'auto';
              parent.style.whiteSpace = 'normal';
            }
          }}
          onBlur={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.position = 'absolute';
              parent.style.width = '1px';
              parent.style.height = '1px';
              parent.style.overflow = 'hidden';
              parent.style.clip = 'rect(0, 0, 0, 0)';
              parent.style.whiteSpace = 'nowrap';
            }
          }}
        >
          Skip to main content
        </a>
      </VisuallyHidden>

      <div id="main-content" />
    </div>
  ),
};
