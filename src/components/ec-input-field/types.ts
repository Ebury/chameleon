export enum InputType {
  TEXT = 'text',
  DATE = 'date',
  NUMBER = 'number',
  TEL = 'tel'
}

export interface InputFieldProps {
  type?: InputType,
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
