export enum RadioButtonEvent {
    UPDATE_MODEL_VALUE = 'update:modelValue',
  }

export interface RadioButtonEvents {
    [RadioButtonEvent.UPDATE_MODEL_VALUE]: RadioButtonProps['modelValue']
  }

export interface RadioButtonOption {
    label: string,
    value: string,
    description?: string
  }

export interface RadioButtonProps {
    options: RadioButtonOption[],
    modelValue?: string,
    label?: string,
    errorMessage?: string,
    isDisabled?: boolean,
    isGroupInline?: boolean,
    isTextInline?: boolean
  }

