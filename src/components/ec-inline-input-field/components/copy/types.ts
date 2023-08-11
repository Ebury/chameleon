import type { InlineInputProps } from '../../types';

export interface InlineInputCopyProps {
  value?: InlineInputProps['value'],
  isSensitive?: InlineInputProps['isSensitive'],
  tooltipTextSuccess: InlineInputProps['tooltipTextSuccess'],
  tooltipTextError: InlineInputProps['tooltipTextError'],
  isBtnRightAligned?: InlineInputProps['isBtnRightAligned'],
}
