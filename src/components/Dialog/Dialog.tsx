/**
 * Skyfall Ledger -- <Dialog />
 *
 * A confirmation-pattern dialog built on the native <dialog> element.
 * Focused on confirm/cancel interactions with default and danger variants.
 * Uses the Ledger Button component internally for action buttons and the
 * Spinner component for the loading state.
 *
 * Accessibility:
 * - Native <dialog> provides focus trapping and Escape dismissal
 * - aria-labelledby links to the title
 * - aria-describedby links to the description
 * - Focus moves to the cancel button on open (safe default)
 * - Backdrop click cancels
 * - In financial workflows, use the danger variant for irreversible
 *   actions (delete account, cancel transfer) with clear language
 *
 * Primitives.css additions required for animations:
 * ```css
 * .ledger-dialog::backdrop {
 *   background: var(--ledger-color-surface-overlay);
 *   animation: ledger-fade-in var(--ledger-duration-normal) var(--ledger-easing-settle);
 * }
 * .ledger-dialog[open] {
 *   animation: ledger-modal-in var(--ledger-duration-normal) var(--ledger-easing-settle);
 * }
 * ```
 */
import * as React from 'react';
import { zIndex } from '../../tokens/zIndex';
import { radius } from '../../tokens/radius';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../tokens/typography';
import { cn } from '../../utils/cn';
import { Button } from '../Button';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type DialogVariant = 'default' | 'danger';

export interface DialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the user confirms the action. */
  onConfirm: () => void;
  /** Called when the user cancels (also triggered by Escape / backdrop). */
  onCancel: () => void;
  /** Dialog title. */
  title: string;
  /** Description text or rich content shown below the title. */
  description: string | React.ReactNode;
  /** Confirm button label. @default 'Confirm' */
  confirmLabel?: string;
  /** Cancel button label. @default 'Cancel' */
  cancelLabel?: string;
  /** Visual variant. @default 'default' */
  variant?: DialogVariant;
  /** Show loading spinner on the confirm button. @default false */
  loading?: boolean;
  /** Additional className applied to the <dialog> element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open,
      onConfirm,
      onCancel,
      title,
      description,
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      variant = 'default',
      loading = false,
      className,
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLDialogElement>(null);
    const dialogRef = (ref as React.RefObject<HTMLDialogElement>) ?? innerRef;
    const cancelRef = React.useRef<HTMLButtonElement>(null);

    // Sync imperative showModal/close with the open prop
    React.useEffect(() => {
      const dialog = (dialogRef as React.RefObject<HTMLDialogElement>).current;
      if (!dialog) return;

      if (open && !dialog.open) {
        dialog.showModal();
        // Focus cancel button as safe default
        cancelRef.current?.focus();
      } else if (!open && dialog.open) {
        dialog.close();
      }
    }, [open, dialogRef]);

    // Listen for native close event (Escape key)
    React.useEffect(() => {
      const dialog = (dialogRef as React.RefObject<HTMLDialogElement>).current;
      if (!dialog) return;

      const handleClose = () => onCancel();
      dialog.addEventListener('close', handleClose);
      return () => dialog.removeEventListener('close', handleClose);
    }, [onCancel, dialogRef]);

    // Scroll-lock body while dialog is open
    React.useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    // Backdrop click cancels
    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === (dialogRef as React.RefObject<HTMLDialogElement>).current) {
        onCancel();
      }
    };

    // Unique ids for aria
    const titleId = React.useId();
    const descId = React.useId();

    // -- Styles ---------------------------------------------------------------

    const dialogStyle: React.CSSProperties = {
      position: 'fixed',
      zIndex: zIndex.modal,
      maxWidth: '400px',
      width: '90vw',
      padding: 0,
      margin: 'auto',
      border: `1px solid var(--ledger-color-border-default)`,
      borderRadius: radius.lg,
      background: 'var(--ledger-color-surface-default)',
      boxShadow: 'var(--ledger-shadow-4)',
      color: 'var(--ledger-color-text-primary)',
      fontFamily: fontFamily.sans,
      overflow: 'hidden',
    };

    const contentStyle: React.CSSProperties = {
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    };

    const dangerIconStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: radius.sm,
      background: 'var(--ledger-color-negative-subtle, rgba(220, 53, 53, 0.1))',
      color: 'var(--ledger-color-negative)',
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

    const descriptionStyle: React.CSSProperties = {
      margin: 0,
      fontFamily: fontFamily.sans,
      fontSize: fontSize['body-md'],
      lineHeight: lineHeight['body-md'],
      color: 'var(--ledger-color-text-secondary)',
    };

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '8px',
      paddingTop: '8px',
    };

    return (
      <dialog
        ref={dialogRef as React.RefObject<HTMLDialogElement>}
        className={cn('ledger-dialog', className)}
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={handleBackdropClick}
        style={dialogStyle}
      >
        <div style={contentStyle}>
          {variant === 'danger' && (
            <div style={dangerIconStyle} aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
                <line
                  x1="12"
                  y1="8"
                  x2="12"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16.5" r="1" fill="currentColor" />
              </svg>
            </div>
          )}

          <h2 id={titleId} style={titleStyle}>
            {title}
          </h2>

          <div id={descId} style={descriptionStyle}>
            {typeof description === 'string' ? <p style={{ margin: 0 }}>{description}</p> : description}
          </div>

          <div style={actionsStyle}>
            <Button
              ref={cancelRef}
              variant="ghost"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={variant === 'danger' ? 'danger' : 'primary'}
              onClick={onConfirm}
              loading={loading}
              disabled={loading}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </dialog>
    );
  },
);

Dialog.displayName = 'Dialog';
