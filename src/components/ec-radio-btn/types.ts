export enum RadioButtonEvent {
    UPDATE_MODEL_VALUE = 'update:modelValue',
  }

export interface RadioButtonEvents {
    [RadioButtonEvent.UPDATE_MODEL_VALUE]: RadioButtonProps['modelValue']
  }
export interface RadioButtonProps {
    modelValue?: string,
    label?: string,
    description?: string,
    isDisabled?: boolean,
    isTextInline?: boolean
    value: string,
    id?: string,
    errorMessage?: string,
    hasError?: boolean,
  }

