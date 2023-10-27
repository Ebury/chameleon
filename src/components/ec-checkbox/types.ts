export interface CheckboxProps {
  modelValue?: boolean,
  indeterminate?: boolean,
  label?: string,
  errorMessage?: string,
  disabled?: boolean,
  isSingleLine?: boolean,
}

export enum CheckboxEvent {
  UPDATE_MODEL_VALUE = 'update:modelValue',
}

export interface CheckboxEvents {
  [CheckboxEvent.UPDATE_MODEL_VALUE]: CheckboxProps['modelValue']
}
