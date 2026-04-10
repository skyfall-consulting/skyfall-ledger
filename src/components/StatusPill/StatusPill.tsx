/**
 * Skyfall Ledger -- <StatusPill />
 *
 * Pill-shaped status indicator with a colored dot. Used for transaction
 * and account statuses throughout Ledger surfaces. The "processing"
 * status dot pulses to convey ongoing activity.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Pulse keyframes -- injected once at module level
// ---------------------------------------------------------------------------
if (typeof document !== 'undefined' && !document.getElementById('ledger-pulse-keyframes')) {
  const style = document.createElement('style');
  style.id = 'ledger-pulse-keyframes';
  style.textContent = '@keyframes ledger-pulse{0%,100%{opacity:1}50%{opacity:0.4}}';
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type StatusPillStatus =
  | 'active'
  | 'pending'
  | 'settled'
  | 'failed'
  | 'cancelled'
  | 'processing';

export type StatusPillSize = 'sm' | 'md';

export interface StatusPillProps {
  /** The transaction/account status to display. */
  status: StatusPillStatus;
  /** Size preset. @default 'md' */
  size?: StatusPillSize;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------
interface StatusConfig {
  label: string;
  dotColor: string;
  textColor: string;
}

const STATUS_MAP: Record<StatusPillStatus, StatusConfig> = {
  active: {
    label: 'Active',
    dotColor: 'var(--ledger-color-positive)',
    textColor: 'var(--ledger-color-positive)',
  },
  pending: {
    label: 'Pending',
    dotColor: 'var(--ledger-color-warning)',
    textColor: 'var(--ledger-color-warning)',
  },
  settled: {
    label: 'Settled',
    dotColor: 'var(--ledger-color-text-accent)',
    textColor: 'var(--ledger-color-text-accent)',
  },
  failed: {
    label: 'Failed',
    dotColor: 'var(--ledger-color-negative)',
    textColor: 'var(--ledger-color-negative)',
  },
  cancelled: {
    label: 'Cancelled',
    dotColor: 'var(--ledger-color-text-muted)',
    textColor: 'var(--ledger-color-text-muted)',
  },
  processing: {
    label: 'Processing',
    dotColor: 'var(--ledger-color-info)',
    textColor: 'var(--ledger-color-info)',
  },
};

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  height: number;
  fontSize: number;
  dotSize: number;
  padding: string;
  gap: number;
}

const SIZE_MAP: Record<StatusPillSize, SizeSpec> = {
  sm: { height: 24, fontSize: 11, dotSize: 6, padding: '0 8px', gap: 6 },
  md: { height: 28, fontSize: 12, dotSize: 8, padding: '0 10px', gap: 6 },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  size = 'md',
  className,
  style,
}) => {
  const config = STATUS_MAP[status];
  const sizeSpec = SIZE_MAP[size];

  const pillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    height: sizeSpec.height,
    padding: sizeSpec.padding,
    gap: sizeSpec.gap,
    borderRadius: 'var(--ledger-radius-pill)',
    background: 'var(--ledger-color-surface-sunken)',
    fontFamily: 'var(--ledger-font-sans)',
    fontSize: sizeSpec.fontSize,
    fontWeight: 500,
    color: config.textColor,
    whiteSpace: 'nowrap',
    ...style,
  };

  const dotStyle: React.CSSProperties = {
    width: sizeSpec.dotSize,
    height: sizeSpec.dotSize,
    borderRadius: '50%',
    background: config.dotColor,
    flexShrink: 0,
    ...(status === 'processing'
      ? { animation: 'ledger-pulse 1.5s ease-in-out infinite' }
      : undefined),
  };

  return (
    <span className={className} style={pillStyle}>
      <span aria-hidden="true" style={dotStyle} />
      {config.label}
    </span>
  );
};
