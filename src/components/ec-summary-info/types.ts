import type { IconName } from '../ec-icon/types';

export interface Item {
  text?: string,
  tooltipText?: string,
  stylePreset?: string,
  isSensitive?: boolean
}

export interface SummaryProps {
    iconName?: IconName,
    lineItems: Item[]
  }
