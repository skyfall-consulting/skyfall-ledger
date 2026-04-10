/**
 * Skyfall Ledger — <Label />
 *
 * A form label with optional required indicator. When used inside a
 * FormField the `htmlFor` is connected automatically; standalone usage
 * is also supported.
 */
import * as React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Show a red asterisk and visually-hidden "(required)" text. */
  required?: boolean;
  /** Dims the label when the associated control is disabled. */
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const srOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, disabled, children, className, style, ...rest }, ref) => {
    const baseStyle: React.CSSProperties = {
      fontFamily: 'var(--ledger-font-sans)',
      fontSize: 'var(--ledger-font-size-body-sm)',
      fontWeight: 500,
      lineHeight: '18px',
      color: disabled
        ? 'var(--ledger-color-text-muted)'
        : 'var(--ledger-color-text-primary)',
      ...style,
    };

    return (
      <label ref={ref} className={className} style={baseStyle} {...rest}>
        {children}
        {required && (
          <>
            <span
              aria-hidden="true"
              style={{ color: 'var(--ledger-color-negative)', marginLeft: '2px' }}
            >
              *
            </span>
            <span style={srOnlyStyle}> (required)</span>
          </>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
