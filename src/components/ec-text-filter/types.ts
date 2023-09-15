import type { InputFieldProps } from '../ec-input-field/types';

export interface TextFilterProps {
  modelValue?: InputFieldProps['modelValue']
  inputProps?: InputFieldProps
}

export enum TextFilterEvent {
  CHANGE = 'change',
}

export interface TextFilterEvents {
  [TextFilterEvent.CHANGE]: InputFieldProps['modelValue']
}
