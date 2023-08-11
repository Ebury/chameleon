import type { IconName } from '../ec-icon/types';

export interface OptionCardProps {
  isDisabled?: boolean,
  title?: string,
  caption?: string,
  iconName?: IconName,
  type?: OptionCardType,
}

export enum OptionCardType {
  ACCENT = 'accent',
  DANGER = 'danger',
}

export enum OptionCardEvent {
  CLICK = 'click',
}

export interface OptionCardEvents {
  [OptionCardEvent.CLICK]: undefined
}
