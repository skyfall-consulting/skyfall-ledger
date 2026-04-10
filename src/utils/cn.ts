/**
 * Skyfall Ledger — `cn` className joiner
 *
 * Tiny tagged-class joiner. Skips falsy entries. Used by every component
 * to compose static class names + conditional state classes.
 */
export type ClassValue = string | number | null | undefined | false;

export const cn = (...values: ClassValue[]): string =>
  values.filter((v): v is string | number => Boolean(v)).join(' ');
