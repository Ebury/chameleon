import type { NavigationLinkProps } from '../ec-navigation-link/types';

export interface MenuLink extends Omit<NavigationLinkProps, 'isCollapsed' | 'isCompact'> {
  dataTest?: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  on?: Record<string, Function>,
}

export interface MenuProps {
  horizontal?: boolean,
  isCollapsed?: boolean,
  links?: MenuLink[],
  isReversed?: boolean,
  isInLightMode?:boolean,
}
