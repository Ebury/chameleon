export interface InlineInputProps {
  label?: string,
  value?: string,
  isEditable?: boolean,
  isCopiable?: boolean,
  isEditing?: boolean,
  isLoading?: boolean,
  isSensitive?: boolean,
  isBtnRightAligned?: boolean,
  tooltipTextSuccess: string,
  tooltipTextError: string,
  labelTooltip?: string,
  errorMessage?: string,
}

export enum InlineInputEvent {
  CANCEL = 'cancel',
  EDIT = 'edit',
  SUBMIT = 'submit',
}

export interface InlineInputEvents {
  [InlineInputEvent.CANCEL]: undefined
  [InlineInputEvent.EDIT]: undefined
  [InlineInputEvent.SUBMIT]: InlineInputProps['value']
}
