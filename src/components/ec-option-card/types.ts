import type { IconName } from '../ec-icon/types';

export interface OptionCardProps {
  isDisabled?: boolean,
  isSubmit?: boolean,
  optionTitle: string,
  optionCaption?: string,
  optionCardIconName?: IconName,
  optionCardType?: OptionCardType,
  to?: string,
  href?: string,
}

export enum OptionCardType {
  OPTION_CARD_ACCENT = 'accent',
  OPTION_CARD_DANGER = 'danger',
}
