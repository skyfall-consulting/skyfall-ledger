/**
 * Skyfall Ledger -- <Backdrop />
 *
 * Full-viewport overlay primitive used behind Modal, Drawer, and Dialog.
 * Handles body scroll locking, click-to-dismiss, and opacity transitions.
 * All styling is inline via CSS custom properties -- no .module.css files.
 *
 * Accessibility:
 * - aria-hidden="true" -- the backdrop itself carries no interactive content
 * - Focus management is the responsibility of the surface component
 *   (Modal, Drawer, etc.) that renders on top
 * - Body scroll lock prevents background content from scrolling under the overlay
 */
import * as React from 'react';
import { cn } from '../../utils/cn';
import { zIndex } from '../../tokens/zIndex';

// ---------------------------------------------------------------------------
// Keyframes -- injected once for fade-in transition
// ---------------------------------------------------------------------------
if (typeof document !== 'undefined' && !document.getElementById('ledger-backdrop-keyframes')) {
  const style = document.createElement('style');
  style.id = 'ledger-backdrop-keyframes';
  style.textContent = '@keyframes ledger-backdrop-in{from{opacity:0}to{opacity:1}}';
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type BackdropVariant = 'default' | 'light' | 'opaque';

export interface BackdropProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Whether the backdrop is visible. */
  open: boolean;
  /** Called when the backdrop area itself is clicked (not children). */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** When true, clicks on the backdrop are ignored (e.g. mandatory dialogs). */
  disableClick?: boolean;
  /** Whether to lock body scroll while open. @default true */
  lockScroll?: boolean;
  /** Visual intensity of the overlay. @default 'default' */
  variant?: BackdropVariant;
}

// ---------------------------------------------------------------------------
// Variant styles
// ---------------------------------------------------------------------------
const VARIANT_STYLES: Record<BackdropVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--ledger-color-surface-overlay, rgba(0, 0, 0, 0.5))',
  },
  light: {
    backgroundColor: 'var(--ledger-color-surface-overlay, rgba(0, 0, 0, 0.25))',
    // Override with a lighter tint when using the default fallback
    opacity: 0.6,
  },
  opaque: {
    backgroundColor: 'var(--ledger-color-surface-overlay, rgba(0, 0, 0, 0.85))',
  },
};

// Reset opacity for light variant when the token exists (opacity is baked into the token)
// We rely on the fallback rgba for when the token is absent.

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      open,
      onClick,
      disableClick = false,
      lockScroll = true,
      variant = 'default',
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    // --- Scroll lock ---
    React.useEffect(() => {
      if (!lockScroll || !open) return;

      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prev;
      };
    }, [open, lockScroll]);

    if (!open) return null;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableClick) return;
      // Only fire when the backdrop itself is clicked, not children
      if (e.target === e.currentTarget) {
        onClick?.(e);
      }
    };

    const variantStyle = VARIANT_STYLES[variant];

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn('ledger-backdrop', `ledger-backdrop--${variant}`, className)}
        onClick={handleClick}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: zIndex.modal,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'ledger-backdrop-in 150ms ease-out',
          ...variantStyle,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Backdrop.displayName = 'Backdrop';
