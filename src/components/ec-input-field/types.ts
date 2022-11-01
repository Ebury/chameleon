import type { Ref } from 'vue';

import type { Maybe } from '../../../global';

export interface InputFieldExpose {
  focus: ()=> void
  inputRef: Ref<Maybe<HTMLInputElement>>
}

export enum InputFieldType {
  TEXT = 'text',
  DATE = 'date',
  NUMBER = 'number',
  TEL = 'tel'
}

export enum InputFieldEvent {
  UPDATE_MODEL_VALUE='update:modelValue',
  ICON_CLICK='icon-click'
}

export interface InputFieldEvents {
  [InputFieldEvent.UPDATE_MODEL_VALUE]: InputFieldProps['modelValue']
  [InputFieldEvent.ICON_CLICK]: InputFieldProps['modelValue']
}

export interface InputFieldProps {
  type?: InputFieldType,
  modelValue?: number | string | Date,
  label?: string,
  labelTooltip?: string,
  note?: string,
  bottomNote?: string,
  errorMessage?: string,
  icon?: string,
  iconSize?: number,
  isInGroup?: string,
  id?: string,
  errorId?: string,
  isLoading?: boolean,
  isSensitive?: boolean,
  isWarning?: boolean,
  autocomplete?: string,
}
