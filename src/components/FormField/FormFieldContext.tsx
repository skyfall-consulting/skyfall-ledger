/**
 * Skyfall Ledger — FormField context
 *
 * Connects a label, helper/error text, and a form control via shared IDs
 * and state flags. Controls read this context to auto-wire `id`,
 * `aria-describedby`, `aria-invalid`, `disabled`, and `required`.
 */
import * as React from 'react';

export interface FormFieldContextValue {
  id: string;
  helperId: string;
  errorId: string;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

export const FormFieldProvider = FormFieldContext.Provider;

export const useFormField = (): FormFieldContextValue | null => {
  return React.useContext(FormFieldContext);
};
