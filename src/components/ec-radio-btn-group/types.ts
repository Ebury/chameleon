export interface RadioButtonOption {
  label: string,
  value: string,
  description?: string
}

export interface RadioButtonGroupProps {
  options: RadioButtonOption[],
  name: string,
  modelValue?: string,
  label?: string,
  errorMessage?: string,
  isDisabled?: boolean,
  isTextInline?: boolean,
  isGroupInline?: boolean,
}
