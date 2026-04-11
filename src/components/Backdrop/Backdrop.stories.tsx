import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Backdrop } from './Backdrop';

/**
 * Utils / Backdrop
 *
 * `<Backdrop />` is a full-viewport overlay primitive that powers Modal,
 * Drawer, and Dialog. Supports three visual variants and click-to-dismiss.
 */
const meta: Meta<typeof Backdrop> = {
  title: 'Components/Utils/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-viewport overlay with scroll locking, click-to-dismiss, and opacity variants. Used as the scrim layer behind Modal, Drawer, and Dialog.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'light', 'opaque'],
    },
    disableClick: { control: 'boolean' },
    lockScroll: { control: 'boolean' },
  },
  args: {
    open: true,
    variant: 'default',
    disableClick: false,
    lockScroll: false, // disabled in stories to avoid locking Storybook scroll
  },
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

// ---------- Helpers ----------

const overlayText: React.CSSProperties = {
  fontFamily: 'var(--ledger-font-sans)',
  fontSize: 14,
  fontWeight: 500,
  color: '#fff',
  background: 'rgba(0,0,0,0.4)',
  padding: '12px 24px',
  borderRadius: 'var(--ledger-radius-md, 8px)',
  pointerEvents: 'none',
  userSelect: 'none',
};

// ---------- Default ----------

export const Default: Story = {
  render: function DefaultStory(args) {
    const [open, setOpen] = React.useState(args.open);
    React.useEffect(() => setOpen(args.open), [args.open]);

    return (
      <div style={{ height: 300, position: 'relative' }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 14,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Open Backdrop
        </button>

        <Backdrop {...args} open={open} onClick={() => setOpen(false)}>
          <span style={overlayText}>Click backdrop to dismiss</span>
        </Backdrop>
      </div>
    );
  },
};

// ---------- Variants ----------

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three visual variants: default (semi-transparent), light, and opaque.',
      },
    },
  },
  render: function VariantsStory() {
    const [active, setActive] = React.useState<'default' | 'light' | 'opaque' | null>(null);

    return (
      <div style={{ height: 300, position: 'relative' }}>
        <div style={{ display: 'flex', gap: 'var(--ledger-space-3)' }}>
          {(['default', 'light', 'opaque'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setActive(v)}
              style={{
                fontFamily: 'var(--ledger-font-sans)',
                fontSize: 14,
                padding: '8px 16px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {active && (
          <Backdrop
            open
            variant={active}
            lockScroll={false}
            onClick={() => setActive(null)}
          >
            <span style={overlayText}>
              Variant: {active} -- click to dismiss
            </span>
          </Backdrop>
        )}
      </div>
    );
  },
};

// ---------- Disable Click ----------

export const DisableClick: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With `disableClick`, clicking the backdrop does nothing (e.g. mandatory dialogs). Use the close button inside the overlay.',
      },
    },
  },
  render: function DisableClickStory() {
    const [open, setOpen] = React.useState(true);

    return (
      <div style={{ height: 300, position: 'relative' }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 14,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Open (non-dismissable)
        </button>

        <Backdrop open={open} disableClick lockScroll={false}>
          <div
            style={{
              background: 'var(--ledger-color-surface-raised, #1e1e1e)',
              borderRadius: 'var(--ledger-radius-lg, 12px)',
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--ledger-space-4, 16px)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--ledger-font-sans)',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--ledger-color-text-primary, #fff)',
              }}
            >
              Mandatory confirmation
            </span>
            <span
              style={{
                fontFamily: 'var(--ledger-font-sans)',
                fontSize: 13,
                color: 'var(--ledger-color-text-muted, #999)',
              }}
            >
              Clicking the backdrop is disabled. Use the button below.
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--ledger-font-sans)',
                fontSize: 14,
                padding: '8px 20px',
                cursor: 'pointer',
                background: 'var(--ledger-color-teal-500, #2dd4bf)',
                color: 'var(--ledger-color-obsidian-950, #0a0a0a)',
                border: 'none',
                borderRadius: 'var(--ledger-radius-sm, 6px)',
                fontWeight: 500,
              }}
            >
              Close
            </button>
          </div>
        </Backdrop>
      </div>
    );
  },
};

// ---------- With Spinner ----------

export const WithSpinner: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Backdrop used as a full-screen loading overlay with a Spinner.',
      },
    },
  },
  render: function WithSpinnerStory() {
    const [open, setOpen] = React.useState(true);

    return (
      <div style={{ height: 300, position: 'relative' }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 14,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Show loading overlay
        </button>

        <Backdrop open={open} lockScroll={false} onClick={() => setOpen(false)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--ledger-space-4, 16px)',
            }}
          >
            {/* Inline spinner to avoid circular dependency */}
            <svg
              width={48}
              height={48}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ animation: 'ledger-spin 600ms linear infinite' }}
            >
              <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.2" />
              <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="50" strokeDashoffset="35" />
            </svg>
            <span style={{ ...overlayText, background: 'none' }}>
              Processing transaction...
            </span>
          </div>
        </Backdrop>
      </div>
    );
  },
};
