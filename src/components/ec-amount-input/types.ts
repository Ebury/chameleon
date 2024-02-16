import type { InputFieldProps } from '../ec-input-field/types';

export interface AmountInputProps extends Omit<InputFieldProps, 'modelValue'> {
  modelValue?: number | string | null,
  isMasked?: boolean,
  locale?: string,
  currency?: string,
}
