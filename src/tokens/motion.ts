/**
 * Skyfall Ledger — Motion tokens
 *
 * Dialect: "Settle, don't bounce."
 * Decelerate-out curves only. Nothing longer than 400ms in functional UI.
 * Spring overshoot is banned for confirmation flows and money-moving actions.
 */

export const duration = {
  micro: '120ms',
  short: '180ms',
  medium: '240ms',
  long: '320ms',
  digitRoll: '480ms', // BalanceHero / monetary count tick
} as const;

export const easing = {
  /** Default Ledger curve — decelerate into place like a coin settling. */
  settle: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  /** Linear escape for exits */
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Plain linear, used by digit-roll number ticks */
  linear: 'linear',
} as const;
