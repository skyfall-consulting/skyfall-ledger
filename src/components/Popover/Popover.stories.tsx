import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Popover } from './Popover';

/**
 * Surfaces / Popover
 *
 * `<Popover />` renders a click-triggered overlay panel anchored to a
 * trigger element. Supports placement, alignment, and controlled / uncontrolled
 * modes. Closes on Escape and click-outside.
 */
const meta: Meta<typeof Popover> = {
  title: 'Components/Surfaces/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Popover -- a click-triggered positioned overlay panel anchored to a trigger element.\n\n' +
          'Supports four placements (top/bottom/left/right) with three alignment options (start/center/end), ' +
          'plus controlled and uncontrolled modes. In financial workflows, use popovers for account quick-view panels, ' +
          'filter options, or contextual detail overlays.\n\n' +
          'Accessibility:\n' +
          '- Trigger has `role="button"`, `aria-expanded`, and `aria-haspopup="dialog"`\n' +
          '- Content panel has `role="dialog"` for screen reader announcement\n' +
          '- Escape key closes the popover\n' +
          '- Click outside the popover dismisses it\n' +
          '- Focus is moved to the first focusable element inside the popover on open\n' +
          '- Trigger is keyboard-accessible via Enter and Space keys',
      },
    },
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Placement relative to the trigger element.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alignment along the placement axis.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Uncontrolled default open state.',
    },
    open: {
      description: 'Controlled open state. When provided, the component is fully controlled.',
    },
    onOpenChange: {
      description: 'Callback when the open state changes.',
    },
  },
  args: {
    placement: 'bottom',
    alignment: 'start',
    defaultOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const triggerButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
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
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ledger-font-sans)',
  fontSize: 'var(--ledger-font-size-label)',
  fontWeight: 600,
  color: 'var(--ledger-color-text-muted)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
  marginBottom: 'var(--ledger-space-2)',
};

const valueStyle: React.CSSProperties = {
  fontFamily: 'var(--ledger-font-sans)',
  fontSize: 'var(--ledger-font-size-body-md)',
  color: 'var(--ledger-color-text-primary)',
};

const monoValueStyle: React.CSSProperties = {
  fontFamily: 'var(--ledger-font-mono)',
  fontSize: 'var(--ledger-font-size-mono-md)',
  color: 'var(--ledger-color-text-primary)',
  fontFeatureSettings: '"tnum","lnum"',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 'var(--ledger-space-2) 0',
};

const dividerStyle: React.CSSProperties = {
  height: 1,
  background: 'var(--ledger-color-border-subtle)',
  margin: 'var(--ledger-space-3) 0',
};

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: (args) => (
    <Popover
      {...args}
      trigger={<span style={triggerButtonStyle}>Open Popover</span>}
    >
      <div style={{ padding: 'var(--ledger-space-2)', minWidth: 200 }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 'var(--ledger-font-size-body-md)',
            color: 'var(--ledger-color-text-primary)',
          }}
        >
          Popover content goes here.
        </p>
      </div>
    </Popover>
  ),
};

// ---------------------------------------------------------------------------
// AccountQuickView — FinTech example
// ---------------------------------------------------------------------------

export const AccountQuickView: Story = {
  name: 'Account Quick View',
  parameters: {
    docs: {
      description: {
        story: 'Account quick-view panel triggered by an inline link. Displays balances and account details on hover drill-down.',
      },
    },
  },
  render: () => (
    <Popover
      placement="bottom"
      alignment="start"
      trigger={
        <span
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 'var(--ledger-font-size-body-md)',
            color: 'var(--ledger-color-teal-400)',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Checking ****4821
        </span>
      }
    >
      <div style={{ minWidth: 260 }}>
        <div style={{ marginBottom: 'var(--ledger-space-3)' }}>
          <div style={labelStyle}>Account</div>
          <div style={valueStyle}>Premium Checking</div>
          <div
            style={{
              fontFamily: 'var(--ledger-font-mono)',
              fontSize: 'var(--ledger-font-size-label)',
              color: 'var(--ledger-color-text-muted)',
              marginTop: 2,
            }}
          >
            ****4821
          </div>
        </div>
        <div style={dividerStyle} />
        <div style={rowStyle}>
          <span style={{ ...valueStyle, color: 'var(--ledger-color-text-muted)' }}>
            Available
          </span>
          <span style={monoValueStyle}>$12,450.00</span>
        </div>
        <div style={rowStyle}>
          <span style={{ ...valueStyle, color: 'var(--ledger-color-text-muted)' }}>
            Current
          </span>
          <span style={monoValueStyle}>$13,220.75</span>
        </div>
        <div style={rowStyle}>
          <span style={{ ...valueStyle, color: 'var(--ledger-color-text-muted)' }}>
            Pending
          </span>
          <span style={{ ...monoValueStyle, color: 'var(--ledger-color-amber-500)' }}>
            -$770.75
          </span>
        </div>
      </div>
    </Popover>
  ),
};

// ---------------------------------------------------------------------------
// FilterOptionsPanel — FinTech example
// ---------------------------------------------------------------------------

export const FilterOptionsPanel: Story = {
  name: 'Filter Options Panel',
  parameters: {
    docs: {
      description: {
        story: 'Filter popover with radio groups for date range and transaction type. Demonstrates interactive form content inside a popover.',
      },
    },
  },
  render: function FilterOptionsPanelStory() {
    const [dateRange, setDateRange] = React.useState('last30');
    const [type, setType] = React.useState('all');

    const radioLabelStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--ledger-space-3)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: 'var(--ledger-font-size-body-md)',
      color: 'var(--ledger-color-text-primary)',
      cursor: 'pointer',
      padding: 'var(--ledger-space-1) 0',
    };

    return (
      <Popover
        placement="bottom"
        alignment="end"
        trigger={
          <span style={{ ...triggerButtonStyle, background: 'var(--ledger-color-surface-sunken)', color: 'var(--ledger-color-text-primary)', border: '1px solid var(--ledger-color-border-default)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line x1="2" y1="4" x2="14" y2="4" />
              <line x1="4" y1="8" x2="12" y2="8" />
              <line x1="6" y1="12" x2="10" y2="12" />
            </svg>
            Filters
          </span>
        }
      >
        <div style={{ minWidth: 240 }}>
          <div style={labelStyle}>Date Range</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-2)', marginBottom: 'var(--ledger-space-4)' }}>
            {[
              { value: 'last7', label: 'Last 7 days' },
              { value: 'last30', label: 'Last 30 days' },
              { value: 'last90', label: 'Last 90 days' },
              { value: 'ytd', label: 'Year to date' },
            ].map((opt) => (
              <label key={opt.value} style={radioLabelStyle}>
                <input
                  type="radio"
                  name="dateRange"
                  value={opt.value}
                  checked={dateRange === opt.value}
                  onChange={() => setDateRange(opt.value)}
                  style={{ accentColor: 'var(--ledger-color-teal-500)' }}
                />
                {opt.label}
              </label>
            ))}
          </div>

          <div style={dividerStyle} />

          <div style={labelStyle}>Transaction Type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-2)' }}>
            {[
              { value: 'all', label: 'All transactions' },
              { value: 'credits', label: 'Credits only' },
              { value: 'debits', label: 'Debits only' },
            ].map((opt) => (
              <label key={opt.value} style={radioLabelStyle}>
                <input
                  type="radio"
                  name="type"
                  value={opt.value}
                  checked={type === opt.value}
                  onChange={() => setType(opt.value)}
                  style={{ accentColor: 'var(--ledger-color-teal-500)' }}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      </Popover>
    );
  },
};

// ---------------------------------------------------------------------------
// Placements
// ---------------------------------------------------------------------------

export const Placements: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All four placement options (top, bottom, left, right) centered along the placement axis.',
      },
    },
  },
  render: () => {
    const placementTrigger: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--ledger-space-3) var(--ledger-space-5)',
      background: 'var(--ledger-color-surface-sunken)',
      borderRadius: 'var(--ledger-radius-sm)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: 'var(--ledger-font-size-body-sm)',
      color: 'var(--ledger-color-text-secondary)',
      cursor: 'pointer',
    };

    const panelContent = (label: string) => (
      <div
        style={{
          fontFamily: 'var(--ledger-font-sans)',
          fontSize: 'var(--ledger-font-size-body-sm)',
          color: 'var(--ledger-color-text-secondary)',
          minWidth: 140,
        }}
      >
        Popover placed on {label}.
      </div>
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--ledger-space-9)',
          padding: 'var(--ledger-space-11)',
        }}
      >
        <Popover placement="top" alignment="center" trigger={<span style={placementTrigger}>Top</span>}>
          {panelContent('top')}
        </Popover>
        <div style={{ display: 'flex', gap: 'var(--ledger-space-11)' }}>
          <Popover placement="left" alignment="center" trigger={<span style={placementTrigger}>Left</span>}>
            {panelContent('left')}
          </Popover>
          <Popover placement="right" alignment="center" trigger={<span style={placementTrigger}>Right</span>}>
            {panelContent('right')}
          </Popover>
        </div>
        <Popover placement="bottom" alignment="center" trigger={<span style={placementTrigger}>Bottom</span>}>
          {panelContent('bottom')}
        </Popover>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled popover with external state management. The open/closed state is displayed below the trigger.',
      },
    },
  },
  render: function ControlledStory() {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ledger-space-5)' }}>
        <Popover
          open={open}
          onOpenChange={setOpen}
          placement="bottom"
          alignment="center"
          trigger={<span style={triggerButtonStyle}>{open ? 'Close' : 'Open'}</span>}
        >
          <div
            style={{
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: 'var(--ledger-font-size-body-md)',
              color: 'var(--ledger-color-text-primary)',
              minWidth: 180,
            }}
          >
            This popover is controlled externally.
          </div>
        </Popover>
        <span
          style={{
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: 'var(--ledger-font-size-body-sm)',
            color: 'var(--ledger-color-text-muted)',
          }}
        >
          State: {open ? 'open' : 'closed'}
        </span>
      </div>
    );
  },
};
