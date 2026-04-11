import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export interface OTPInputProps {
  /** Number of OTP digits */
  length?: number;
  /** Current value string */
  value?: string;
  /** Change handler — receives the full OTP string */
  onChange?: (value: string) => void;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Auto-focus first input on mount */
  autoFocus?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * OTPInput — one-time passcode input with auto-advancing digit boxes.
 */
export function OTPInput({ length = 6, value = '', onChange, error = false, disabled = false, autoFocus = false, className }: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (autoFocus && inputRefs.current[0]) inputRefs.current[0].focus();
  }, [autoFocus]);

  const focusInput = React.useCallback((index: number) => {
    if (index >= 0 && index < length) { inputRefs.current[index]?.focus(); inputRefs.current[index]?.select(); }
  }, [length]);

  const updateValue = React.useCallback((v: string) => { onChange?.(v.slice(0, length)); }, [onChange, length]);

  const handleInput = React.useCallback((index: number, digit: string) => {
    if (!/^\d$/.test(digit)) return;
    const chars = value.split('');
    while (chars.length < length) chars.push('');
    chars[index] = digit;
    updateValue(chars.join(''));
    if (index < length - 1) focusInput(index + 1);
  }, [value, length, updateValue, focusInput]);

  const handleKeyDown = React.useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const chars = value.split('');
      while (chars.length < length) chars.push('');
      if (chars[index]) { chars[index] = ''; updateValue(chars.join('')); }
      else if (index > 0) { chars[index - 1] = ''; updateValue(chars.join('')); focusInput(index - 1); }
    } else if (e.key === 'ArrowLeft') { e.preventDefault(); focusInput(index - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); focusInput(index + 1); }
  }, [value, length, updateValue, focusInput]);

  const handlePaste = React.useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasted) { updateValue(pasted); focusInput(Math.min(pasted.length, length - 1)); }
  }, [length, updateValue, focusInput]);

  return (
    <div
      className={cn(className)}
      role="group"
      aria-label="One-time password"
      style={{ display: 'inline-flex', gap: space[3], opacity: disabled ? 0.5 : undefined }}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          className={cn('ledger-otp-digit', 'ledger-focus-ring')}
          value={value[i] || ''}
          onChange={(e) => { const v = e.target.value; if (v.length <= 1) handleInput(i, v); }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={error || undefined}
          style={{
            width: 44, height: 52,
            border: `1px solid ${error ? 'var(--ledger-color-negative)' : 'var(--ledger-color-border-default)'}`,
            borderRadius: radius.md,
            backgroundColor: 'var(--ledger-color-surface-raised)',
            color: 'var(--ledger-color-text-primary)',
            fontFamily: fontFamily.sans,
            fontSize: '18px',
            fontWeight: fontWeight.medium,
            textAlign: 'center',
            caretColor: 'var(--ledger-color-teal-500)',
          }}
        />
      ))}
    </div>
  );
}
