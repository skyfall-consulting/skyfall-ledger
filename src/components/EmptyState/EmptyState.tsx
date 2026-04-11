/**
 * Skyfall Ledger -- <EmptyState />
 *
 * Placeholder for empty data views. Displays a centered icon,
 * title, optional description, and an optional action slot for
 * guiding users when no data is available.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface EmptyStateProps {
  /** Custom icon element. Overrides the default empty-document icon. */
  icon?: React.ReactNode;
  /** Primary heading for the empty state. */
  title: string;
  /** Optional supporting description text. */
  description?: string;
  /** Optional action slot (e.g. a button) rendered below the description. */
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Default icon (empty document, 48x48)
// ---------------------------------------------------------------------------
const DefaultEmptyIcon = () => (
  <svg width={48} height={48} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x={10} y={6} width={28} height={36} rx={3} stroke="currentColor" strokeWidth={1.5} />
    <path d="M18 18H30" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M18 24H30" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M18 30H25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
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
      color: 'var(--ledger-color-text-muted)',
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

    const actionStyle: React.CSSProperties = {
      marginTop: 'var(--ledger-space-6)',
    };

    return (
      <div ref={ref} className={className} style={rootStyle}>
        <div style={iconStyle}>
          {icon !== undefined ? icon : <DefaultEmptyIcon />}
        </div>

        <h3 style={titleStyle}>{title}</h3>

        {description && (
          <p style={descriptionStyle}>{description}</p>
        )}

        {action && (
          <div style={actionStyle}>{action}</div>
        )}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';
