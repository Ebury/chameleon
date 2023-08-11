import type { InlineInputProps } from '../../types';

interface InlineInputEditProps {
  label?: InlineInputProps['label'],
  value?: InlineInputProps['value'],
  isSensitive?: InlineInputProps['isSensitive'],
  labelTooltip?: InlineInputProps['labelTooltip'],
  errorMessage?: InlineInputProps['errorMessage'],
}

export enum InlineInputEditEvent {
  CANCEL = 'cancel',
  SUBMIT = 'submit',
}

export interface InlineInputEditEvents {
    [InlineInputEditEvent.CANCEL]: undefined
    [InlineInputEditEvent.SUBMIT]: { value: InlineInputEditProps['value'] }
}
