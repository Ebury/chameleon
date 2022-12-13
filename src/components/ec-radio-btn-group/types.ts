export enum RadioButtonGroupEvent {
  UPDATE_MODEL_VALUE = 'update:modelValue',
}

export interface RadioButtonGroupEvents {
  [RadioButtonGroupEvent.UPDATE_MODEL_VALUE]: RadioButtonGroupProps['modelValue']
}

export interface RadioButtonOption {
  value: string,
  label?: string,
  description?: string
}

export interface RadioButtonGroupProps {
  options: RadioButtonOption[],
  name?: string,
  modelValue?: string,
  label?: string,
  errorMessage?: string,
  isDisabled?: boolean,
  isTextInline?: boolean,
  isGroupInline?: boolean,
}
