import type { InputHTMLAttributes } from 'vue';

import type { InputFieldProps } from '../ec-input-field/types';

export interface TextFilterProps {
  modelValue?: InputFieldProps['modelValue']
  inputProps?: InputFieldProps & InputHTMLAttributes
  debounceTime?: number
}

export enum TextFilterEvent {
  UPDATE_MODEL_VALUE = 'update:modelValue',
  CHANGE = 'change',
}

export interface TextFilterEvents {
  [TextFilterEvent.UPDATE_MODEL_VALUE]: InputFieldProps['modelValue']
  [TextFilterEvent.CHANGE]: InputFieldProps['modelValue']
}
