/**
 * Skyfall Ledger -- <Drawer />
 *
 * A slide-in side panel surface for contextual detail views, forms, and
 * settings. Uses the native <dialog> element for built-in focus trapping
 * and Escape key handling.
 *
 * Accessibility:
 * - Native <dialog> provides focus trapping and Escape dismissal
 * - aria-labelledby links to the rendered title
 * - Backdrop click dismisses (target === dialog element)
 * - Body scroll is locked while open to prevent background interaction
 * - In financial workflows, use drawers for transaction detail panels,
 *   account settings, and notification centers that don't require a
 *   full-page navigation change
 *
 * Primitives.css additions required for animations:
 * ```css
 * .ledger-drawer::backdrop {
 *   background: var(--ledger-color-surface-overlay);
 *   animation: ledger-fade-in var(--ledger-duration-normal) var(--ledger-easing-settle);
 * }
 * .ledger-drawer[open] {
 *   animation: ledger-drawer-in var(--ledger-duration-normal) var(--ledger-easing-settle);
 * }
 * .ledger-drawer[data-position='right'][open] {
 *   animation: ledger-slide-left var(--ledger-duration-normal) var(--ledger-easing-settle);
 * }
 * .ledger-drawer[data-position='left'][open] {
 *   animation: ledger-slide-right var(--ledger-duration-normal) var(--ledger-easing-settle);
 * }
 * @keyframes ledger-slide-left { from { transform: translateX(100%); } }
 * @keyframes ledger-slide-right { from { transform: translateX(-100%); } }
 * ```
 */
import * as React from 'react';
import { zIndex } from '../../tokens/zIndex';
import { radius } from '../../tokens/radius';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../tokens/typography';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type DrawerSize = 'sm' | 'md' | 'lg';
export type DrawerPosition = 'left' | 'right';

export interface DrawerProps {
  /** Whether the drawer is visible. Controls showModal()/close() calls. */
  open: boolean;
  /** Called when the drawer should close (backdrop click, Escape, or X button). */
  onClose: () => void;
  /** Which edge of the viewport the drawer slides from. @default 'right' */
  position?: DrawerPosition;
  /** Width preset. @default 'md' */
  size?: DrawerSize;
  /** Optional drawer title rendered in the header bar. */
  title?: React.ReactNode;
  /** Additional className applied to the <dialog> element. */
  className?: string;
  /** Drawer body content. */
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Size map -- fixed width values
// ---------------------------------------------------------------------------
const SIZE_MAP: Record<DrawerSize, string> = {
  sm: '320px',
  md: '420px',
  lg: '560px',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Drawer = React.forwardRef<HTMLDialogElement, DrawerProps>(
  (
    {
      open,
      onClose,
      position = 'right',
      size = 'md',
      title,
      className,
      children,
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLDialogElement>(null);
    const dialogRef = (ref as React.RefObject<HTMLDialogElement>) ?? innerRef;

    // Sync imperative showModal/close with the open prop
    React.useEffect(() => {
      const dialog = (dialogRef as React.RefObject<HTMLDialogElement>).current;
      if (!dialog) return;

      if (open && !dialog.open) {
        dialog.showModal();
      } else if (!open && dialog.open) {
        dialog.close();
      }
    }, [open, dialogRef]);

    // Listen for native close event (Escape key triggers this)
    React.useEffect(() => {
      const dialog = (dialogRef as React.RefObject<HTMLDialogElement>).current;
      if (!dialog) return;

      const handleClose = () => onClose();
      dialog.addEventListener('close', handleClose);
      return () => dialog.removeEventListener('close', handleClose);
    }, [onClose, dialogRef]);

    // Scroll-lock body while drawer is open
    React.useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    // Backdrop click -- dismiss when clicking outside the content box
    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === (dialogRef as React.RefObject<HTMLDialogElement>).current) {
        onClose();
      }
    };

    // Unique id for aria-labelledby
    const titleId = React.useId();

    // -- Styles ---------------------------------------------------------------

    const dialogStyle: React.CSSProperties = {
      position: 'fixed',
      zIndex: zIndex.drawer,
      width: SIZE_MAP[size],
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      padding: 0,
      margin: 0,
      top: 0,
      ...(position === 'right' ? { right: 0 } : { left: 0 }),
      border: 'none',
      borderRadius: 0,
      background: 'var(--ledger-color-surface-default)',
      boxShadow: 'var(--ledger-shadow-4)',
      color: 'var(--ledger-color-text-primary)',
      fontFamily: fontFamily.sans,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      borderBottom: '1px solid var(--ledger-color-border-default)',
      flexShrink: 0,
    };

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontFamily: fontFamily.sans,
      fontWeight: fontWeight.semibold,
      fontSize: fontSize['title-md'],
      lineHeight: lineHeight['title-md'],
      color: 'var(--ledger-color-text-primary)',
    };

    const closeButtonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      padding: 0,
      border: 'none',
      borderRadius: radius.sm,
      background: 'transparent',
      color: 'var(--ledger-color-text-muted)',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'color 150ms ease, background 150ms ease',
    };

    const bodyStyle: React.CSSProperties = {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      fontSize: fontSize['body-md'],
      lineHeight: lineHeight['body-md'],
    };

    return (
      <dialog
        ref={dialogRef as React.RefObject<HTMLDialogElement>}
        className={cn('ledger-drawer', className)}
        data-position={position}
        aria-labelledby={title ? titleId : undefined}
        onClick={handleBackdropClick}
        style={dialogStyle}
      >
        {title && (
          <header style={headerStyle}>
            <h2 id={titleId} style={titleStyle}>
              {title}
            </h2>
            <button
              className="ledger-focus-ring"
              onClick={onClose}
              aria-label="Close drawer"
              style={closeButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--ledger-color-text-primary)';
                e.currentTarget.style.background = 'var(--ledger-color-surface-sunken)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--ledger-color-text-muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="5" y1="5" x2="15" y2="15" />
                <line x1="15" y1="5" x2="5" y2="15" />
              </svg>
            </button>
          </header>
        )}

        {!title && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 12px 0', flexShrink: 0 }}>
            <button
              className="ledger-focus-ring"
              onClick={onClose}
              aria-label="Close drawer"
              style={closeButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--ledger-color-text-primary)';
                e.currentTarget.style.background = 'var(--ledger-color-surface-sunken)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--ledger-color-text-muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="5" y1="5" x2="15" y2="15" />
                <line x1="15" y1="5" x2="5" y2="15" />
              </svg>
            </button>
          </div>
        )}

        <div style={bodyStyle}>{children}</div>
      </dialog>
    );
  },
);

Drawer.displayName = 'Drawer';
