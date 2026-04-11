import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight, fontSize } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { controlHeight } from '../../tokens/sizing';

export interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current tag values */
  value?: string[];
  /** Called when tags change */
  onChange?: (tags: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label */
  label?: string;
  /** Maximum number of tags */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Characters that trigger tag creation */
  separators?: string[];
  /** Whether duplicates are allowed */
  allowDuplicates?: boolean;
}

const RemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
    <line x1="3" y1="3" x2="9" y2="9" /><line x1="9" y1="3" x2="3" y2="9" />
  </svg>
);

/**
 * TagInput — multi-value text input that creates tag chips.
 */
export const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  ({ value = [], onChange, placeholder = 'Add a tag…', label, max, size = 'md', disabled = false, error = false, separators = ['Enter', ','], allowDuplicates = false, className, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const addTag = React.useCallback((raw: string) => {
      const tag = raw.trim();
      if (!tag) return;
      if (!allowDuplicates && value.includes(tag)) return;
      if (max && value.length >= max) return;
      onChange?.([...value, tag]);
      setInputValue('');
    }, [value, onChange, allowDuplicates, max]);

    const removeTag = React.useCallback((index: number) => { onChange?.(value.filter((_, i) => i !== index)); }, [value, onChange]);

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (separators.includes(e.key)) { e.preventDefault(); addTag(inputValue); }
      else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) removeTag(value.length - 1);
    }, [separators, inputValue, addTag, removeTag, value.length]);

    const handlePaste = React.useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
      const text = e.clipboardData.getData('text');
      if (separators.includes(',') && text.includes(',')) {
        e.preventDefault();
        let updated = [...value];
        for (const part of text.split(',')) {
          const tag = part.trim();
          if (!tag) continue;
          if (!allowDuplicates && updated.includes(tag)) continue;
          if (max && updated.length >= max) break;
          updated = [...updated, tag];
        }
        onChange?.(updated);
      }
    }, [value, onChange, separators, allowDuplicates, max]);

    const atLimit = max !== undefined && value.length >= max;
    const containerPadding = size === 'sm' ? `${space[1]} ${space[3]}` : `${space[2]} ${space[4]}`;
    const containerMinHeight = size === 'sm' ? controlHeight.sm : controlHeight.md;
    const tagFontSize = size === 'sm' ? '11px' : fontSize['body-sm'];

    return (
      <div ref={ref} className={cn(className)} style={{ display: 'flex', flexDirection: 'column', gap: space[2], fontFamily: fontFamily.sans, opacity: disabled ? 0.5 : undefined, pointerEvents: disabled ? 'none' : undefined }} {...props}>
        {label && <span style={{ fontSize: fontSize['body-sm'], fontWeight: fontWeight.medium, color: 'var(--ledger-color-text-primary)' }}>{label}</span>}
        <div
          className={cn('ledger-tag-input-container', error && 'ledger-tag-input-error')}
          onClick={() => inputRef.current?.focus()}
          role="presentation"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: space[2], border: `1px solid ${error ? 'var(--ledger-color-negative)' : 'var(--ledger-color-border-default)'}`, borderRadius: radius.md, backgroundColor: 'var(--ledger-color-surface-raised)', cursor: 'text', padding: containerPadding, minHeight: containerMinHeight }}
        >
          {value.map((tag, i) => (
            <span key={`${tag}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: space[1], background: 'var(--ledger-color-surface-sunken)', borderRadius: radius.full, padding: `2px ${space[3]}`, fontSize: tagFontSize, color: 'var(--ledger-color-text-primary)', maxWidth: 200 }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tag}</span>
              {!disabled && <button type="button" onClick={(e) => { e.stopPropagation(); removeTag(i); }} aria-label={`Remove ${tag}`} tabIndex={-1} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, border: 'none', background: 'transparent', color: 'var(--ledger-color-text-muted)', cursor: 'pointer', borderRadius: radius.full, flexShrink: 0 }}><RemoveIcon /></button>}
            </span>
          ))}
          {!atLimit && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={value.length === 0 ? placeholder : ''}
              disabled={disabled}
              aria-label={label ?? 'Add tag'}
              style={{ flex: 1, minWidth: 80, border: 'none', background: 'transparent', outline: 'none', fontFamily: fontFamily.sans, fontSize: tagFontSize, color: 'var(--ledger-color-text-primary)' }}
            />
          )}
        </div>
        {max !== undefined && <span style={{ fontSize: '11px', color: 'var(--ledger-color-text-muted)', alignSelf: 'flex-end' }} aria-live="polite">{value.length}/{max}</span>}
      </div>
    );
  },
);
TagInput.displayName = 'TagInput';
