export interface SwitchProps {
  modelValue?: boolean,
  label?: string,
  errorMessage?: string,
  disabled?: boolean,
}

export enum SwitchEvent {
  UPDATE_MODEL_VALUE = 'update:modelValue',
}

export interface SwitchEvents {
  [SwitchEvent.UPDATE_MODEL_VALUE]: SwitchProps['modelValue']
}
