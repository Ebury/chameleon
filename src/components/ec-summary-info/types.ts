import type { IconName } from '../ec-icon/types';

export enum StylePreset {
  LABEL = 'label',
  DESCRIPTION = 'description',
  TEXT = 'text',
}
export interface Item {
  text?: string,
  tooltipText?: string,
  stylePreset?: StylePreset,
  isSensitive?: boolean
}

export interface SummaryProps {
  iconName?: IconName,
  lineItems: Item[]
}
