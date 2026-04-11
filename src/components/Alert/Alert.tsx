/**
 * Skyfall Ledger -- <Alert />
 *
 * Dismissible status banner for surfacing contextual feedback.
 * Supports info, positive, negative, and warning tones with a
 * left accent border, optional icon, and optional dismiss control.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type AlertTone = 'info' | 'positive' | 'negative' | 'warning';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic color tone. @default 'info' */
  tone?: AlertTone;
  /** Optional bold title rendered above the body text. */
  title?: string;
  /** Body content of the alert. */
  children: React.ReactNode;
  /** Custom icon element. Overrides the default tone icon. */
  icon?: React.ReactNode;
  /** Whether to show a dismiss button. @default false */
  dismissible?: boolean;
  /** Callback when the dismiss button is clicked. */
  onDismiss?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Tone color map
// ---------------------------------------------------------------------------
interface ToneColors {
  background: string;
  borderLeft: string;
}

const TONE_MAP: Record<AlertTone, ToneColors> = {
  info: {
    background: 'var(--ledger-color-info-subtle)',
    borderLeft: 'var(--ledger-color-info)',
  },
  positive: {
    background: 'var(--ledger-color-positive-subtle)',
    borderLeft: 'var(--ledger-color-positive)',
  },
  negative: {
    background: 'var(--ledger-color-negative-subtle)',
    borderLeft: 'var(--ledger-color-negative)',
  },
  warning: {
    background: 'var(--ledger-color-warning-subtle)',
    borderLeft: 'var(--ledger-color-warning)',
  },
};

// ---------------------------------------------------------------------------
// Default tone icons (inline SVGs, 20x20)
// ---------------------------------------------------------------------------
const InfoIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={1.5} />
    <text
      x={10}
      y={14.5}
      textAnchor="middle"
      fontSize={12}
      fontWeight={600}
      fontFamily="var(--ledger-font-sans)"
      fill="currentColor"
    >
      i
    </text>
  </svg>
);

const PositiveIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={1.5} />
    <path d="M6.5 10.5L9 13L13.5 7.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NegativeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={1.5} />
    <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2.5L18.5 17.5H1.5L10 2.5Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <text
      x={10}
      y={15}
      textAnchor="middle"
      fontSize={11}
      fontWeight={700}
      fontFamily="var(--ledger-font-sans)"
      fill="currentColor"
    >
      !
    </text>
  </svg>
);

const DEFAULT_ICONS: Record<AlertTone, React.ReactNode> = {
  info: <InfoIcon />,
  positive: <PositiveIcon />,
  negative: <NegativeIcon />,
  warning: <WarningIcon />,
};

// ---------------------------------------------------------------------------
// Dismiss X icon (inline SVG)
// ---------------------------------------------------------------------------
const DismissIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      tone = 'info',
      title,
      children,
      icon,
      dismissible = false,
      onDismiss,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const toneColors = TONE_MAP[tone];
    const renderedIcon = icon !== undefined ? icon : DEFAULT_ICONS[tone];

    const rootStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 'var(--ledger-space-4)',
      padding: 'var(--ledger-space-5)',
      borderRadius: 'var(--ledger-radius-sm)',
      borderLeft: `4px solid ${toneColors.borderLeft}`,
      background: toneColors.background,
      fontFamily: 'var(--ledger-font-sans)',
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      flexShrink: 0,
      color: toneColors.borderLeft,
      display: 'flex',
      alignItems: 'center',
      marginTop: '1px',
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
    };

    const titleStyle: React.CSSProperties = {
      fontWeight: 600,
      fontSize: 'var(--ledger-font-size-body-md)',
      color: 'var(--ledger-color-text-primary)',
      margin: 0,
      marginBottom: children ? 'var(--ledger-space-1)' : undefined,
    };

    const bodyStyle: React.CSSProperties = {
      fontSize: 'var(--ledger-font-size-body-sm)',
      color: 'var(--ledger-color-text-secondary)',
      margin: 0,
      lineHeight: 1.5,
    };

    const dismissStyle: React.CSSProperties = {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      padding: 0,
      background: 'transparent',
      border: 'none',
      borderRadius: 'var(--ledger-radius-xs)',
      cursor: 'pointer',
      color: 'var(--ledger-color-text-muted)',
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={className}
        style={rootStyle}
        {...rest}
      >
        {renderedIcon && (
          <span style={iconStyle}>{renderedIcon}</span>
        )}

        <div style={contentStyle}>
          {title && <p style={titleStyle}>{title}</p>}
          <div style={bodyStyle}>{children}</div>
        </div>

        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            className="ledger-focus-ring"
            style={dismissStyle}
            onClick={onDismiss}
          >
            <DismissIcon />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
