/**
 * Skyfall Ledger -- <Banner />
 *
 * Full-width page-level message bar for system-wide announcements,
 * warnings, and status updates. Renders at the top of content areas
 * (not fixed positioned).
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type BannerStatus = 'success' | 'error' | 'warning' | 'info';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual status variant. @default 'info' */
  status?: BannerStatus;
  /** Message content. */
  children: React.ReactNode;
  /** Show a dismiss button. @default false */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** Custom icon element. Overrides the default status icon. */
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Status color map
// ---------------------------------------------------------------------------
interface StatusColors {
  background: string;
  accent: string;
}

const STATUS_MAP: Record<BannerStatus, StatusColors> = {
  success: {
    background: 'var(--ledger-color-positive-subtle, #E8F8EE)',
    accent: 'var(--ledger-color-positive, #29C26A)',
  },
  error: {
    background: 'var(--ledger-color-negative-subtle, #FDECEC)',
    accent: 'var(--ledger-color-negative, #E54B4B)',
  },
  warning: {
    background: 'var(--ledger-color-warning-subtle, #FFF6E5)',
    accent: 'var(--ledger-color-warning, #F5A524)',
  },
  info: {
    background: 'var(--ledger-color-info-subtle, #EAF3FF)',
    accent: 'var(--ledger-color-info, #2E7FE8)',
  },
};

// ---------------------------------------------------------------------------
// Default status icons (inline SVGs, 20x20)
// ---------------------------------------------------------------------------
const SuccessIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={1.5} />
    <path
      d="M6.5 10.5L9 13L13.5 7.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={1.5} />
    <path
      d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 2.5L18.5 17.5H1.5L10 2.5Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
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

const DEFAULT_ICONS: Record<BannerStatus, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

// ---------------------------------------------------------------------------
// Dismiss X icon
// ---------------------------------------------------------------------------
const DismissIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 4L12 12M12 4L4 12"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      status = 'info',
      children,
      dismissible = false,
      onDismiss,
      icon,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const colors = STATUS_MAP[status];
    const renderedIcon = icon !== undefined ? icon : DEFAULT_ICONS[status];
    const isUrgent = status === 'error' || status === 'warning';

    // ---- styles ----
    const rootStyle: React.CSSProperties = {
      width: '100%',
      background: colors.background,
      borderBottom: `1px solid ${colors.accent}`,
      fontFamily: 'var(--ledger-font-sans)',
      ...style,
    };

    const innerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 'var(--ledger-space-4, 16px)',
      padding: 'var(--ledger-space-4, 16px) var(--ledger-space-6, 24px)',
      maxWidth: 1200,
      margin: '0 auto',
    };

    const iconStyle: React.CSSProperties = {
      flexShrink: 0,
      color: colors.accent,
      display: 'flex',
      alignItems: 'center',
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      fontSize: 'var(--ledger-font-size-body-md, 14px)',
      color: 'var(--ledger-color-text-primary)',
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
      borderRadius: 'var(--ledger-radius-xs, 4px)',
      cursor: 'pointer',
      color: 'var(--ledger-color-text-muted)',
    };

    return (
      <div
        ref={ref}
        role={isUrgent ? 'alert' : 'status'}
        className={className}
        style={rootStyle}
        {...rest}
      >
        <div style={innerStyle}>
          {renderedIcon && <span style={iconStyle}>{renderedIcon}</span>}
          <div style={contentStyle}>{children}</div>
          {dismissible && (
            <button
              type="button"
              aria-label="Dismiss banner"
              className="ledger-focus-ring"
              style={dismissStyle}
              onClick={onDismiss}
            >
              <DismissIcon />
            </button>
          )}
        </div>
      </div>
    );
  },
);

Banner.displayName = 'Banner';
