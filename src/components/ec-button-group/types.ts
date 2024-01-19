export interface ButtonGroupItem<TValue> {
  id?: string | number,
  value: TValue,
  text: string,
  disabled?: boolean,
}

export interface ButtonGroupProps<TValue> {
  modelValue?: TValue,
  items: ButtonGroupItem<TValue>[],
}
