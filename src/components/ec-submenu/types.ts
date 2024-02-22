import type { RouteLocationRaw } from 'vue-router';

export interface SubmenuItem {
  headerTitle: string,
  route?: RouteLocationRaw,
  slotName?: string,
}

export interface SubmenuProps {
  submenu: SubmenuItem[],
  activeIndex?: number,
  isFullWidth?: boolean,
  hasHeaderGap?: boolean,
}
