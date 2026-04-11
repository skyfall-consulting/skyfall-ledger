import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight, fontSize } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export type TimelineItemVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface TimelineItem {
  /** Unique identifier */
  id: string;
  /** Event title */
  title: string;
  /** Optional description */
  description?: string;
  /** Timestamp display string */
  timestamp: string;
  /** Optional icon to replace the default dot */
  icon?: React.ReactNode;
  /** Visual variant */
  variant?: TimelineItemVariant;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Timeline items in chronological order */
  items: TimelineItem[];
}

const VARIANT_COLORS: Record<TimelineItemVariant, { dot: string; iconBg: string; iconColor: string }> = {
  default: { dot: 'var(--ledger-color-border-default)', iconBg: 'var(--ledger-color-surface-sunken)', iconColor: 'var(--ledger-color-text-muted)' },
  success: { dot: 'var(--ledger-color-positive)', iconBg: 'rgba(16, 185, 129, 0.12)', iconColor: 'var(--ledger-color-positive)' },
  warning: { dot: 'var(--ledger-color-warning)', iconBg: 'rgba(245, 158, 11, 0.12)', iconColor: 'var(--ledger-color-warning)' },
  error: { dot: 'var(--ledger-color-negative)', iconBg: 'rgba(239, 68, 68, 0.12)', iconColor: 'var(--ledger-color-negative)' },
  info: { dot: 'var(--ledger-color-info)', iconBg: 'rgba(59, 130, 246, 0.12)', iconColor: 'var(--ledger-color-info)' },
};

/**
 * Timeline — vertical timeline for sequential events.
 */
export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ items, className, style, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(className)}
      style={{ listStyle: 'none', margin: 0, padding: 0, fontFamily: fontFamily.sans, ...style }}
      {...props}
    >
      {items.map((item, idx) => {
        const v = VARIANT_COLORS[item.variant ?? 'default'];
        const isLast = idx === items.length - 1;
        return (
          <li key={item.id} style={{ display: 'flex', gap: space[5], position: 'relative', paddingBottom: isLast ? 0 : space[7] }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 24 }} aria-hidden="true">
              {item.icon ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: radius.full, backgroundColor: v.iconBg, color: v.iconColor, flexShrink: 0 }}>{item.icon}</span>
              ) : (
                <span style={{ width: 12, height: 12, borderRadius: radius.full, border: `2px solid ${v.dot}`, backgroundColor: 'var(--ledger-color-surface-raised)', flexShrink: 0 }} />
              )}
              {!isLast && <span style={{ flex: 1, width: 2, backgroundColor: 'var(--ledger-color-border-subtle)', marginTop: space[2] }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: fontSize['body-md'], fontWeight: fontWeight.semibold, lineHeight: '1.5', color: 'var(--ledger-color-text-primary)' }}>{item.title}</p>
              {item.description && <p style={{ margin: `${space[1]} 0 0`, fontSize: fontSize['body-sm'], lineHeight: '1.5', color: 'var(--ledger-color-text-secondary)' }}>{item.description}</p>}
              <time style={{ display: 'block', marginTop: space[1], fontSize: fontSize.label, color: 'var(--ledger-color-text-muted)', lineHeight: '1.5' }}>{item.timestamp}</time>
            </div>
          </li>
        );
      })}
    </ol>
  ),
);
Timeline.displayName = 'Timeline';
