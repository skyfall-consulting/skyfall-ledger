/**
 * Skyfall Ledger — <HelperText />
 *
 * Descriptive guidance rendered below a form control. Connected to the
 * control via `aria-describedby` when used inside a FormField.
 */
import * as React from 'react';

export interface HelperTextProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const HelperText: React.FC<HelperTextProps> = ({
  children,
  id,
  className,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--ledger-font-sans)',
    fontSize: 'var(--ledger-font-size-label)',
    lineHeight: '16px',
    color: 'var(--ledger-color-text-muted)',
    margin: 0,
    ...style,
  };

  return (
    <p id={id} className={className} style={baseStyle}>
      {children}
    </p>
  );
};

HelperText.displayName = 'HelperText';
