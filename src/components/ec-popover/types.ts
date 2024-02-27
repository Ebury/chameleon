import type { ZIndexLevel } from '../../enums';

export enum PopoverPlacement {
  AUTO = 'auto',
  AUTO_START = 'auto-start',
  AUTO_END = 'auto-end',
  TOP = 'top',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  RIGHT = 'right',
  RIGHT_START = 'right-start',
  RIGHT_END = 'right-end',
  BOTTOM = 'bottom',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
  LEFT = 'left',
  LEFT_START = 'left-start',
  LEFT_END = 'left-end',
}

export enum PopoverTrigger {
  HOVER = 'hover',
  CLICK = 'click',
  MANUAL = 'manual',
}

export type PopoverDelay = number | {
  show?: number,
  hide?: number,
};

export interface PopoverProps {
  shown?: boolean,
  distance?: number,
  skidding?: number,
  disabled?: boolean,
  autoHide?: boolean,
  level?: ZIndexLevel,
  delay?: PopoverDelay,
  popperClass?: string,
  placement?: PopoverPlacement,
  triggers?: PopoverTrigger[],
  shift?: boolean,
  autoSize?: boolean | 'min' | 'max',
  preventOverflow?: boolean,
  overflowPadding?: number,
}
