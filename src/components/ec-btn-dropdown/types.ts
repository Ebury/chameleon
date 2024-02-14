import type { AnchorHTMLAttributes } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

import type { DropdownItem } from '../ec-dropdown-search/types';

export interface BtnDropdownItem<TValue = string> extends DropdownItem<TValue> {
  href?: string,
  to?: string | RouteLocationRaw,
  attrs?: AnchorHTMLAttributes,
}

export interface BtnDropdownProps<TValue = string, TBtnDropdownItem extends BtnDropdownItem<TValue> = BtnDropdownItem<TValue>> {
  items?: TBtnDropdownItem[],
  isBtnDropdownDisabled?: boolean,
  buttonText: string,
  listDataTest?: string,
  href?: string,
  to?: string | RouteLocationRaw,
}
