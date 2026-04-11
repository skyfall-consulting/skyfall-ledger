import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ClickAwayListener } from './ClickAwayListener';

/**
 * Utils / Click-Away Listener
 *
 * `<ClickAwayListener />` detects clicks outside its wrapped child element
 * and fires a callback -- useful for dismissing dropdowns, popovers, and
 * modal-like surfaces.
 */
const meta: Meta<typeof ClickAwayListener> = {
  title: 'Components/Utils/Click-Away Listener',
  component: ClickAwayListener,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Detects clicks outside a wrapped element and fires an onClickAway callback.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClickAwayListener>;

// ---------- Default ----------

export const Default: Story = {
  render: function DefaultStory() {
    const [count, setCount] = React.useState(0);

    return (
      <div style={{ fontFamily: 'var(--ledger-font-sans)' }}>
        <p
          style={{
            color: 'var(--ledger-color-text-secondary)',
            fontSize: 13,
            marginBottom: 'var(--ledger-space-4)',
          }}
        >
          Click-away count: <strong>{count}</strong>
        </p>

        <ClickAwayListener onClickAway={() => setCount((c) => c + 1)}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--ledger-space-7)',
              background: 'var(--ledger-color-surface-raised)',
              borderRadius: 'var(--ledger-radius-md)',
              boxShadow: 'var(--ledger-shadow-2)',
              color: 'var(--ledger-color-text-primary)',
              fontWeight: 500,
              userSelect: 'none',
            }}
          >
            Click outside me!
          </div>
        </ClickAwayListener>
      </div>
    );
  },
};

// ---------- WithDropdown ----------

export const WithDropdown: Story = {
  render: function DropdownStory() {
    const [open, setOpen] = React.useState(false);

    return (
      <div
        style={{
          fontFamily: 'var(--ledger-font-sans)',
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          style={{
            padding: 'var(--ledger-space-3) var(--ledger-space-5)',
            background: 'var(--ledger-color-teal-600)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--ledger-radius-sm)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {open ? 'Close dropdown' : 'Open dropdown'}
        </button>

        {open && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + var(--ledger-space-2))',
                left: 0,
                minWidth: 180,
                padding: 'var(--ledger-space-3) 0',
                background: 'var(--ledger-color-surface-raised)',
                borderRadius: 'var(--ledger-radius-md)',
                boxShadow: 'var(--ledger-shadow-3)',
                border: '1px solid var(--ledger-color-border-subtle)',
                zIndex: 10,
              }}
            >
              {['Dashboard', 'Transactions', 'Settings'].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: 'var(--ledger-space-3) var(--ledger-space-5)',
                    fontSize: 14,
                    color: 'var(--ledger-color-text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </ClickAwayListener>
        )}
      </div>
    );
  },
};
