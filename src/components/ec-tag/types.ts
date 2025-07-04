import type { TooltipOptions } from '../../directives/ec-tooltip/types';
import type { IconName, IconType } from '../ec-icon/types';

export interface TagProps {
  text: string,
  isIconRounded?: boolean,
  iconName?: IconName,
  iconType?: IconType,
  tooltipOptions?: TooltipOptions,
}
