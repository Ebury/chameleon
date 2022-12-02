export enum RadioBtnEvent {
    UPDATE_MODEL_VALUE = 'update:modelValue',
  }

export interface RadioBtnEvents {
    [RadioBtnEvent.UPDATE_MODEL_VALUE]: RadioBtnProps['modelValue']
  }

export interface RadioBtnOption {
    label: string,
    value: string | number | boolean,
    description?: string
  }

export interface RadioBtnProps {
    options: RadioBtnOption[],
    modelValue: string,
    label: string,
    errorMessage: string,
    disabled: boolean,
    isGroupedInline: boolean,
    isTextInline: boolean
  }

