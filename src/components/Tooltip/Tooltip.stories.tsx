import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Tooltip } from './Tooltip';

/**
 * Data Display / Tooltip
 *
 * `<Tooltip />` renders a hover/focus tooltip positioned relative
 * to its trigger element via a portal.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A hover/focus tooltip with configurable placement, delay, and rich content support.',
      },
    },
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: { type: 'number', min: 0, max: 2000, step: 50 } },
    content: { control: 'text' },
  },
  args: {
    placement: 'top',
    delay: 200,
    content: 'Tooltip text',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ---------- Default ----------

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <span
        style={{
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: 'var(--ledger-font-size-body-md)',
          color: 'var(--ledger-color-text-primary)',
          textDecoration: 'underline dotted',
          cursor: 'default',
        }}
      >
        Hover me
      </span>
    </Tooltip>
  ),
};

// ---------- Placements ----------

export const Placements: Story = {
  render: () => {
    const triggerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--ledger-space-3) var(--ledger-space-5)',
      background: 'var(--ledger-color-surface-sunken)',
      borderRadius: 'var(--ledger-radius-sm)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: 'var(--ledger-font-size-body-sm)',
      color: 'var(--ledger-color-text-secondary)',
      cursor: 'default',
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--ledger-space-7)',
          padding: 'var(--ledger-space-11)',
        }}
      >
        <Tooltip content="Placed on top" placement="top">
          <span style={triggerStyle}>Top</span>
        </Tooltip>
        <div style={{ display: 'flex', gap: 'var(--ledger-space-11)' }}>
          <Tooltip content="Placed on left" placement="left">
            <span style={triggerStyle}>Left</span>
          </Tooltip>
          <Tooltip content="Placed on right" placement="right">
            <span style={triggerStyle}>Right</span>
          </Tooltip>
        </div>
        <Tooltip content="Placed on bottom" placement="bottom">
          <span style={triggerStyle}>Bottom</span>
        </Tooltip>
      </div>
    );
  },
};

// ---------- WithDelay ----------

export const WithDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ledger-space-5)' }}>
      <Tooltip content="No delay" delay={0}>
        <span
          style={{
            padding: 'var(--ledger-space-3) var(--ledger-space-5)',
            background: 'var(--ledger-color-surface-sunken)',
            borderRadius: 'var(--ledger-radius-sm)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 'var(--ledger-font-size-body-sm)',
            color: 'var(--ledger-color-text-secondary)',
            cursor: 'default',
          }}
        >
          0ms
        </span>
      </Tooltip>
      <Tooltip content="200ms delay (default)" delay={200}>
        <span
          style={{
            padding: 'var(--ledger-space-3) var(--ledger-space-5)',
            background: 'var(--ledger-color-surface-sunken)',
            borderRadius: 'var(--ledger-radius-sm)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 'var(--ledger-font-size-body-sm)',
            color: 'var(--ledger-color-text-secondary)',
            cursor: 'default',
          }}
        >
          200ms
        </span>
      </Tooltip>
      <Tooltip content="500ms delay" delay={500}>
        <span
          style={{
            padding: 'var(--ledger-space-3) var(--ledger-space-5)',
            background: 'var(--ledger-color-surface-sunken)',
            borderRadius: 'var(--ledger-radius-sm)',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 'var(--ledger-font-size-body-sm)',
            color: 'var(--ledger-color-text-secondary)',
            cursor: 'default',
          }}
        >
          500ms
        </span>
      </Tooltip>
    </div>
  ),
};

// ---------- RichContent ----------

export const RichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div style={{ whiteSpace: 'normal', maxWidth: 200 }}>
          <div style={{ fontWeight: 600, marginBottom: 'var(--ledger-space-1)' }}>
            Account Balance
          </div>
          <div style={{ color: 'var(--ledger-color-text-secondary)', fontSize: 'var(--ledger-font-size-label)' }}>
            Your total available balance across all linked accounts.
          </div>
        </div>
      }
      placement="bottom"
    >
      <span
        style={{
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: 'var(--ledger-font-size-body-md)',
          color: 'var(--ledger-color-text-primary)',
          textDecoration: 'underline dotted',
          cursor: 'help',
        }}
      >
        Total Balance
      </span>
    </Tooltip>
  ),
};

// ---------- OnButton ----------

export const OnButton: Story = {
  render: () => (
    <Tooltip content="Send a payment" placement="top">
      <button
        type="button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 36,
          padding: '0 var(--ledger-space-5)',
          background: 'var(--ledger-color-teal-400)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--ledger-radius-sm)',
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: 'var(--ledger-font-size-body-md)',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Send Payment
      </button>
    </Tooltip>
  ),
};
