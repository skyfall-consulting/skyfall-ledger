/**
 * Skyfall Ledger — <ErrorText />
 *
 * Validation error message rendered below a form control. Carries
 * `role="alert"` so screen readers announce changes immediately.
 */
import * as React from 'react';

export interface ErrorTextProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ErrorText: React.FC<ErrorTextProps> = ({
  children,
  id,
  className,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--ledger-font-sans)',
    fontSize: 'var(--ledger-font-size-label)',
    lineHeight: '16px',
    color: 'var(--ledger-color-negative)',
    margin: 0,
    ...style,
  };

  return (
    <p id={id} role="alert" className={className} style={baseStyle}>
      {children}
    </p>
  );
};

ErrorText.displayName = 'ErrorText';
