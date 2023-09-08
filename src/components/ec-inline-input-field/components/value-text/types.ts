import type { InlineInputProps } from '../../types';

export interface InlineInputValueTextProps {
  value?: InlineInputProps['value'],
  isSensitive?: InlineInputProps['isSensitive'],
  isBtnRightAligned?: InlineInputProps['isBtnRightAligned'],
}

export enum InlineInputValueTextEvent {
  EDIT = 'edit',
}
