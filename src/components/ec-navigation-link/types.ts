import type { MaybeRefOrGetter } from 'vue';

import type { IconName } from '../ec-icon/icon-names';

export interface NavigationLinkProps {
  text: string,
  iconName: IconName,
  iconSize?: number,
  url: string,
  isRouterLink?: boolean,
  isActive?: MaybeRefOrGetter<boolean>,
  isCollapsed?: boolean,
  isCompact?: boolean,
  target?: string,
  isInLightMode?: boolean,
}
