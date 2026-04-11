/**
 * Skyfall Ledger -- <Toast />
 *
 * Auto-dismissing notification popup for transient feedback.
 * Fixed to bottom-right of viewport with slide-in animation.
 * Supports success, error, warning, and info statuses.
 *
 * Animation CSS (add to global styles or inject via <style>):
 *
 * @keyframes ledger-toast-in { from { transform: translateX(100%); opacity: 0; } }
 * @keyframes ledger-toast-out { to { transform: translateX(100%); opacity: 0; } }
 */
import * as React from 'react';
import { zIndex } from '../../tokens/zIndex';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual status variant. */
  status?: ToastStatus;
  /** Bold heading rendered above the description. */
  title: string;
  /** Optional body text below the title. */
  description?: string;
  /** Auto-dismiss delay in ms. 0 disables auto-dismiss. @default 5000 */
  duration?: number;
  /** Called when the toast should close. */
  onClose: () => void;
  /** Controls visibility. */
  open: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Status color map
// ---------------------------------------------------------------------------
interface StatusColors {
  background: string;
  icon: string;
}

const STATUS_MAP: Record<ToastStatus, StatusColors> = {
  success: {
    background: 'var(--ledger-color-positive-subtle, #E8F8EE)',
    icon: 'var(--ledger-color-positive, #29C26A)',
  },
  error: {
    background: 'var(--ledger-color-negative-subtle, #FDECEC)',
    icon: 'var(--ledger-color-negative, #E54B4B)',
  },
  warning: {
    background: 'var(--ledger-color-warning-subtle, #FFF6E5)',
    icon: 'var(--ledger-color-warning, #F5A524)',
  },
  info: {
    background: 'var(--ledger-color-info-subtle, #EAF3FF)',
    icon: 'var(--ledger-color-info, #2E7FE8)',
  },
};

// ---------------------------------------------------------------------------
// Status icons (inline SVGs, 20x20)
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

const STATUS_ICONS: Record<ToastStatus, React.ReactNode> = {
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
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      status = 'info',
      title,
      description,
      duration = 5000,
      onClose,
      open,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const remainingRef = React.useRef(duration);
    const startRef = React.useRef(Date.now());

    // ---- auto-dismiss logic ----
    const startTimer = React.useCallback(() => {
      if (duration <= 0 || !open) return;
      startRef.current = Date.now();
      timerRef.current = setTimeout(onClose, remainingRef.current);
    }, [duration, open, onClose]);

    const pauseTimer = React.useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        remainingRef.current -= Date.now() - startRef.current;
        if (remainingRef.current < 0) remainingRef.current = 0;
      }
    }, []);

    React.useEffect(() => {
      if (!open) return;
      remainingRef.current = duration;
      startTimer();
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [open, duration, startTimer]);

    if (!open) return null;

    const colors = STATUS_MAP[status];
    const isUrgent = status === 'error' || status === 'warning';

    // ---- styles ----
    const rootStyle: React.CSSProperties = {
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: zIndex.toast,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 'var(--ledger-space-4, 16px)',
      padding: 'var(--ledger-space-5, 20px)',
      minWidth: 320,
      maxWidth: 420,
      borderRadius: 'var(--ledger-radius-md, 8px)',
      background: colors.background,
      border: `1px solid ${colors.icon}`,
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      fontFamily: 'var(--ledger-font-sans)',
      animation: 'ledger-toast-in 0.3s ease-out',
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      flexShrink: 0,
      color: colors.icon,
      display: 'flex',
      alignItems: 'center',
      marginTop: 1,
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
    };

    const titleStyle: React.CSSProperties = {
      fontWeight: 600,
      fontSize: 'var(--ledger-font-size-body-md, 14px)',
      color: 'var(--ledger-color-text-primary)',
      margin: 0,
      marginBottom: description ? 'var(--ledger-space-1, 4px)' : undefined,
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: 'var(--ledger-font-size-body-sm, 13px)',
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
        onMouseEnter={pauseTimer}
        onMouseLeave={startTimer}
        {...rest}
      >
        <span style={iconStyle}>{STATUS_ICONS[status]}</span>

        <div style={contentStyle}>
          <p style={titleStyle}>{title}</p>
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>

        <button
          type="button"
          aria-label="Dismiss notification"
          className="ledger-focus-ring"
          style={dismissStyle}
          onClick={onClose}
        >
          <DismissIcon />
        </button>
      </div>
    );
  },
);

Toast.displayName = 'Toast';
