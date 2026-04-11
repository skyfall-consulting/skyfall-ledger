import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight, fontSize } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export interface StepperStep {
  /** Step label */
  label: string;
  /** Optional description */
  description?: string;
}

export interface StepperProps {
  /** Array of step definitions */
  steps: StepperStep[];
  /** Active step index (0-based) */
  activeStep: number;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when a step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Additional CSS class */
  className?: string;
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7l3 3 5-5" />
  </svg>
);

/**
 * Stepper — multi-step progress indicator.
 */
export function Stepper({ steps, activeStep, orientation = 'horizontal', onStepClick, className }: StepperProps) {
  const isClickable = Boolean(onStepClick);

  return (
    <nav className={cn(className)} aria-label="Progress" style={{ width: '100%' }}>
      <ol style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, flexDirection: orientation === 'vertical' ? 'column' : 'row', alignItems: orientation === 'vertical' ? undefined : 'flex-start' }}>
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isCurrent = index === activeStep;
          const isLast = index === steps.length - 1;

          const indicator = (
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32,
              borderRadius: radius.full,
              border: `2px solid ${isCompleted ? 'var(--ledger-color-teal-500)' : isCurrent ? 'var(--ledger-color-teal-500)' : 'var(--ledger-color-border-default)'}`,
              backgroundColor: isCompleted ? 'var(--ledger-color-teal-500)' : 'var(--ledger-color-surface-raised)',
              fontSize: fontSize['body-sm'], fontWeight: fontWeight.medium,
              color: isCompleted ? '#0B1018' : isCurrent ? 'var(--ledger-color-teal-500)' : 'var(--ledger-color-text-muted)',
              flexShrink: 0,
              boxShadow: isCurrent ? '0 1px 3px rgba(0,0,0,0.12)' : undefined,
            }}>
              {isCompleted ? <CheckIcon /> : <span aria-hidden="true">{index + 1}</span>}
            </span>
          );

          const content = (
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: fontFamily.sans, fontSize: fontSize['body-sm'], fontWeight: isCurrent ? fontWeight.semibold : fontWeight.medium, color: isCurrent ? 'var(--ledger-color-text-primary)' : 'var(--ledger-color-text-muted)', lineHeight: '1.4' }}>{step.label}</span>
              {step.description && <span style={{ fontFamily: fontFamily.sans, fontSize: fontSize['body-sm'], color: 'var(--ledger-color-text-muted)', fontWeight: fontWeight.regular, lineHeight: '1.4' }}>{step.description}</span>}
            </span>
          );

          const srOnlyStyle: React.CSSProperties = { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

          const stepInner = (
            <>
              {indicator}
              {content}
              {isCompleted && <span style={srOnlyStyle}>(completed)</span>}
              {isCurrent && <span style={srOnlyStyle}>(current step)</span>}
            </>
          );

          const buttonStyle: React.CSSProperties = {
            border: 'none', background: 'transparent', cursor: isClickable ? 'pointer' : 'default',
            padding: space[2], borderRadius: radius.sm,
            fontFamily: fontFamily.sans,
            display: 'flex',
            flexDirection: orientation === 'horizontal' ? 'column' : 'row',
            alignItems: orientation === 'horizontal' ? 'center' : 'center',
            textAlign: orientation === 'horizontal' ? 'center' : 'left',
            gap: orientation === 'horizontal' ? space[2] : space[4],
          };

          const connector = !isLast ? (
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                background: isCompleted ? 'var(--ledger-color-teal-500)' : 'var(--ledger-color-border-default)',
                ...(orientation === 'horizontal'
                  ? { flex: 1, height: 2, marginTop: 16, marginLeft: space[2], marginRight: space[2] }
                  : { width: 2, height: 24, marginLeft: 15, marginTop: space[1], marginBottom: space[1] }),
              }}
            />
          ) : null;

          return (
            <li key={index} style={{
              display: 'flex',
              ...(orientation === 'horizontal' ? { alignItems: 'flex-start', flex: 1 } : { flexDirection: 'column' }),
            }}>
              {isClickable ? (
                <button type="button" className="ledger-focus-ring" style={buttonStyle} onClick={() => onStepClick?.(index)} aria-current={isCurrent ? 'step' : undefined}>
                  {stepInner}
                </button>
              ) : (
                <div style={buttonStyle} aria-current={isCurrent ? 'step' : undefined}>
                  {stepInner}
                </div>
              )}
              {connector}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
