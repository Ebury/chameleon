import type { IconName } from '../ec-icon/types';

export interface OptionCardProps {
  isDisabled?: boolean,
  isSubmit?: boolean,
  title: string,
  caption?: string,
  iconName?: IconName,
  type?: OptionCardType,
  to?: string,
  href?: string,
}

export enum OptionCardType {
  OPTION_CARD_ACCENT = 'accent',
  OPTION_CARD_DANGER = 'danger',
}

export enum OptionCardEvent {
  OPTION_CARD_CLICK = 'click'
}

export interface OptionCardEvents {
  [OptionCardEvent.OPTION_CARD_CLICK]: undefined
}

export interface OptionCardTypeEmits {
  (click: OptionCardEvent.OPTION_CARD_CLICK): void
}
