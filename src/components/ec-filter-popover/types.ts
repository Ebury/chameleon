import type { PopoverProps } from '../ec-popover/types';

export interface FilterPopoverProps {
  label: string,
  numberOfSelectedFilters: number,
  isFullHeight?: boolean,
  popoverOptions?: PopoverProps,
}
