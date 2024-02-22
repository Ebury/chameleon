import type { TooltipOptions } from '../../directives/ec-tooltip/types';
import type { IconName, IconType } from '../ec-icon/types';
import type { PopoverProps } from '../ec-popover/types';

export interface InlineActionItem {
  text: string,
  name?: string,
  href?: string,
  disabled?: boolean,
  download?: string,
  action?: () => void,
  tooltip?: string | TooltipOptions,
  icon?: IconName,
  iconType?: IconType
}

export interface InlineActionsProps {
  items: InlineActionItem[][],
  popoverOptions?: PopoverProps,
}
