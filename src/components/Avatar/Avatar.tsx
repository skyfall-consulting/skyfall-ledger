/**
 * Skyfall Ledger -- <Avatar />
 *
 * Circular user image with initials fallback and optional status indicator.
 * Used for user profiles, account managers, and team members in financial
 * workflows.
 */
import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'active' | 'inactive' | 'busy' | 'away';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image source URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Full name used to generate initials fallback. */
  name: string;
  /** Size preset. @default 'md' */
  size?: AvatarSize;
  /** Optional status dot overlay. */
  status?: AvatarStatus;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  container: number;
  fontSize: number;
  statusDot: number;
  statusBorder: number;
}

const SIZE_MAP: Record<AvatarSize, SizeSpec> = {
  xs: { container: 24, fontSize: 10, statusDot: 8,  statusBorder: 2 },
  sm: { container: 32, fontSize: 12, statusDot: 10, statusBorder: 2 },
  md: { container: 40, fontSize: 14, statusDot: 12, statusBorder: 2 },
  lg: { container: 48, fontSize: 16, statusDot: 14, statusBorder: 2 },
  xl: { container: 64, fontSize: 20, statusDot: 16, statusBorder: 3 },
};

// ---------------------------------------------------------------------------
// Status color map
// ---------------------------------------------------------------------------
const STATUS_COLOR_MAP: Record<AvatarStatus, string> = {
  active:   'var(--ledger-color-positive)',
  busy:     'var(--ledger-color-negative)',
  away:     'var(--ledger-color-warning)',
  inactive: 'var(--ledger-color-text-muted)',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      status,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const showImage = src && !imgError;
    const initials = getInitials(name);
    const sizeSpec = SIZE_MAP[size];

    // -- Root container -------------------------------------------------------
    const rootStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeSpec.container,
      height: sizeSpec.container,
      borderRadius: '50%',
      overflow: 'visible',
      flexShrink: 0,
      ...style,
    };

    // -- Initials fallback background -----------------------------------------
    const initialsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: 'var(--ledger-color-teal-500)',
      color: 'var(--ledger-color-obsidian-950)',
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: sizeSpec.fontSize,
      fontWeight: 600,
      lineHeight: 1,
      userSelect: 'none',
    };

    // -- Image ----------------------------------------------------------------
    const imgStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover' as const,
    };

    // -- Status dot -----------------------------------------------------------
    const statusDotStyle: React.CSSProperties | undefined = status
      ? {
          position: 'absolute' as const,
          bottom: 0,
          right: 0,
          width: sizeSpec.statusDot,
          height: sizeSpec.statusDot,
          borderRadius: '50%',
          background: STATUS_COLOR_MAP[status],
          border: `${sizeSpec.statusBorder}px solid var(--ledger-color-surface-primary)`,
          boxSizing: 'border-box' as const,
        }
      : undefined;

    return (
      <span
        ref={ref}
        className={cn('ledger-avatar', className)}
        role="img"
        aria-label={alt ?? name ?? 'Avatar'}
        style={rootStyle}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? 'Avatar'}
            style={imgStyle}
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true" style={initialsStyle}>
            {initials}
          </span>
        )}
        {status && (
          <span
            className="ledger-avatar-status"
            aria-hidden="true"
            style={statusDotStyle}
          >
            <span
              style={{
                position: 'absolute',
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0,0,0,0)',
                whiteSpace: 'nowrap',
                borderWidth: 0,
              }}
            >
              {status}
            </span>
          </span>
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';
