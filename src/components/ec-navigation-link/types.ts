import type { Ref } from 'vue';

import type { IconName } from '../ec-icon/icon-names';

export interface NavigationLinkProps {
  text: string,
  iconName: IconName,
  iconSize?: number,
  url: string,
  isRouterLink?: boolean,
  isActive?: boolean | Ref<boolean>,
  isCollapsed?: boolean,
  isCompact?: boolean,
  target?: string,
}
