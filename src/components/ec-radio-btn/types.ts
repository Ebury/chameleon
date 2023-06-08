export enum RadioButtonEvent {
  UPDATE_MODEL_VALUE = 'update:modelValue',
}

export interface RadioButtonEvents {
  [RadioButtonEvent.UPDATE_MODEL_VALUE]: RadioButtonProps['modelValue']
}

export interface RadioButtonProps {
  value: string,
  modelValue?: string,
  label?: string,
  description?: string,
  isDisabled?: boolean,
  isTextInline?: boolean,
  name?: string,
  errorMessage?: string,
  hasError?: boolean
}
