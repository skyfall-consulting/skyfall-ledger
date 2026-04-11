import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight, fontSize } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export interface CollapsiblePanelProps {
  /** Panel title */
  title: string;
  /** Open by default (uncontrolled) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback on toggle */
  onToggle?: (open: boolean) => void;
  /** Panel content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * CollapsiblePanel — single collapsible section with animated expand/collapse.
 */
export function CollapsiblePanel({ title, defaultOpen = false, open: controlledOpen, onToggle, children, className }: CollapsiblePanelProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(isOpen ? undefined : 0);

  const panelId = React.useRef(`cp-${Math.random().toString(36).slice(2, 9)}`).current;
  const triggerId = `${panelId}-trigger`;

  React.useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
      const t = setTimeout(() => setHeight(undefined), 200);
      return () => clearTimeout(t);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => { requestAnimationFrame(() => setHeight(0)); });
    }
  }, [isOpen]);

  const toggle = () => {
    const next = !isOpen;
    if (controlledOpen === undefined) setInternalOpen(next);
    onToggle?.(next);
  };

  return (
    <div className={cn(className)} style={{ fontFamily: fontFamily.sans, border: '1px solid var(--ledger-color-border-default)', borderRadius: radius.md, backgroundColor: 'var(--ledger-color-surface-raised)', overflow: 'hidden' }}>
      <button
        type="button"
        id={triggerId}
        className={cn('ledger-collapsible-trigger', 'ledger-focus-ring')}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        style={{
          display: 'flex', alignItems: 'center', gap: space[3], width: '100%',
          padding: `${space[4]} ${space[5]}`,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: fontSize['body-md'], fontWeight: fontWeight.medium,
          lineHeight: '1.5', color: 'var(--ledger-color-text-primary)', textAlign: 'left',
        }}
      >
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          style={{ flexShrink: 0, color: 'var(--ledger-color-text-muted)', transition: 'transform 200ms ease', transform: isOpen ? 'rotate(90deg)' : undefined }}
        >
          <polyline points="8 4 14 10 8 16" />
        </svg>
        <span style={{ flex: 1, minWidth: 0 }}>{title}</span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{ overflow: 'hidden', transition: 'height 200ms ease', height: height !== undefined ? `${height}px` : 'auto' }}
        hidden={!isOpen && height === 0}
      >
        <div ref={contentRef} style={{ padding: `0 ${space[5]} ${space[5]}`, paddingLeft: `calc(${space[5]} + 20px + ${space[3]})`, fontSize: fontSize['body-sm'], lineHeight: '1.5', color: 'var(--ledger-color-text-secondary)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
