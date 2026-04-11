/**
 * Skyfall Ledger -- <ErrorState />
 *
 * Placeholder for error states with an optional retry action.
 * Displays a centered error icon, title, optional description,
 * and an optional retry button for recoverable failures.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ErrorStateProps {
  /** Custom icon element. Overrides the default error icon. */
  icon?: React.ReactNode;
  /** Error heading. @default 'Something went wrong' */
  title?: string;
  /** Optional supporting description text. */
  description?: string;
  /** Callback for the retry button. When provided, shows a retry button. */
  onRetry?: () => void;
  /** Label for the retry button. @default 'Try again' */
  retryLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Default icon (circle with exclamation, 48x48)
// ---------------------------------------------------------------------------
const DefaultErrorIcon = () => (
  <svg width={48} height={48} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx={24} cy={24} r={20} stroke="currentColor" strokeWidth={1.5} />
    <path d="M24 16V28" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <circle cx={24} cy={33} r={1.5} fill="currentColor" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      icon,
      title = 'Something went wrong',
      description,
      onRetry,
      retryLabel = 'Try again',
      className,
      style,
    },
    ref,
  ) => {
    const rootStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--ledger-space-10) var(--ledger-space-5)',
      fontFamily: 'var(--ledger-font-sans)',
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      width: 48,
      height: 48,
      color: 'var(--ledger-color-negative)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'var(--ledger-space-5)',
    };

    const titleStyle: React.CSSProperties = {
      fontSize: 'var(--ledger-font-size-title-sm)',
      fontWeight: 600,
      color: 'var(--ledger-color-text-primary)',
      margin: 0,
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: 'var(--ledger-font-size-body-md)',
      color: 'var(--ledger-color-text-muted)',
      margin: 0,
      marginTop: 'var(--ledger-space-3)',
      maxWidth: 360,
      lineHeight: 1.5,
    };

    const retryStyle: React.CSSProperties = {
      marginTop: 'var(--ledger-space-6)',
      background: 'transparent',
      border: '1px solid var(--ledger-color-border-default)',
      borderRadius: 'var(--ledger-radius-sm)',
      padding: 'var(--ledger-space-3) var(--ledger-space-5)',
      cursor: 'pointer',
      color: 'var(--ledger-color-text-primary)',
      fontSize: 'var(--ledger-font-size-body-md)',
      fontFamily: 'var(--ledger-font-sans)',
      fontWeight: 500,
    };

    return (
      <div ref={ref} className={className} style={rootStyle}>
        <div style={iconStyle}>
          {icon !== undefined ? icon : <DefaultErrorIcon />}
        </div>

        <h3 style={titleStyle}>{title}</h3>

        {description && (
          <p style={descriptionStyle}>{description}</p>
        )}

        {onRetry && (
          <button
            type="button"
            className="ledger-focus-ring"
            style={retryStyle}
            onClick={onRetry}
          >
            {retryLabel}
          </button>
        )}
      </div>
    );
  },
);

ErrorState.displayName = 'ErrorState';
