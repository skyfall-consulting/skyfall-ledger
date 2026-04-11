/**
 * Skyfall Ledger -- <Modal />
 *
 * An overlay dialog surface for focused interactions. Uses the native
 * <dialog> element for built-in focus trapping and Escape key handling.
 * Supports four max-width presets, a scrollable body, optional footer
 * slot, backdrop dismiss, and body scroll-lock.
 *
 * Accessibility:
 * - Native <dialog> provides focus trapping and Escape dismissal
 * - aria-labelledby links to the rendered title
 * - Backdrop click dismisses (target === dialog element)
 * - Body scroll is locked while open to prevent background interaction
 * - In financial workflows, always pair destructive modals with clear
 *   confirmation language and danger-variant action buttons
 *
 * Primitives.css additions required for animations:
 * ```css
 * .ledger-modal::backdrop {
 *   background: var(--ledger-color-surface-overlay);
 *   animation: ledger-fade-in var(--ledger-duration-normal) var(--ledger-easing-settle);
 * }
 * .ledger-modal[open] {
 *   animation: ledger-modal-in var(--ledger-duration-normal) var(--ledger-easing-settle);
 * }
 * @keyframes ledger-fade-in { from { opacity: 0; } }
 * @keyframes ledger-modal-in { from { opacity: 0; transform: translateY(8px) scale(0.98); } }
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
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  /** Whether the modal is visible. Controls showModal()/close() calls. */
  open: boolean;
  /** Called when the modal should close (backdrop click, Escape, or X button). */
  onClose: () => void;
  /** Modal title rendered in the header bar. */
  title: React.ReactNode;
  /** Max-width preset. @default 'md' */
  size?: ModalSize;
  /** Optional footer content (actions, buttons, etc.). */
  footer?: React.ReactNode;
  /** Additional className applied to the <dialog> element. */
  className?: string;
  /** Modal body content. */
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Size map — maxWidth values
// ---------------------------------------------------------------------------
const SIZE_MAP: Record<ModalSize, string> = {
  sm: '400px',
  md: '560px',
  lg: '720px',
  xl: '960px',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      size = 'md',
      footer,
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

    // Scroll-lock body while modal is open
    React.useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    // Backdrop click — dismiss when clicking outside the content box
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
      zIndex: zIndex.modal,
      maxWidth: SIZE_MAP[size],
      width: '90vw',
      maxHeight: '85vh',
      padding: 0,
      margin: 'auto',
      border: `1px solid var(--ledger-color-border-default)`,
      borderRadius: radius.lg,
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

    const footerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '8px',
      padding: '16px 20px',
      borderTop: '1px solid var(--ledger-color-border-default)',
      flexShrink: 0,
    };

    return (
      <dialog
        ref={dialogRef as React.RefObject<HTMLDialogElement>}
        className={cn('ledger-modal', className)}
        aria-labelledby={titleId}
        onClick={handleBackdropClick}
        style={dialogStyle}
      >
        <header style={headerStyle}>
          <h2 id={titleId} style={titleStyle}>
            {title}
          </h2>
          <button
            className="ledger-focus-ring"
            onClick={onClose}
            aria-label="Close dialog"
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

        <div style={bodyStyle}>{children}</div>

        {footer && <footer style={footerStyle}>{footer}</footer>}
      </dialog>
    );
  },
);

Modal.displayName = 'Modal';
