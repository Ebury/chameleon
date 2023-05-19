export enum TooltipPopperClass {
  EC_TOOLTIP = 'ec-tooltip',
  EC_TOOLTIP_TOOLTIP = 'ec-tooltip--tooltip',
  EC_TOOLTIP_MODAL = 'ec-tooltip--modal',
  EC_TOOLTIP_LEVEL_1 = 'ec-tooltip--level-1',
  EC_TOOLTIP_LEVEL_2 ='ec-tooltip--level-2',
  EC_TOOLTIP_LEVEL_3 = 'ec-tooltip--level-3',
  EC_TOOLTIP_BG_BRIGHT = 'ec-tooltip--bg-bright',
  EC_TOOLTIP_BG_SUCCESS = 'ec-tooltip--bg-success',
  EC_TOOLTIP_BG_ERROR = 'ec-tooltip--bg-error',
  EC_TOOLTIP_NOTIFICATION = 'ec-tooltip--notification',
  EC_TOOLTIP_INVALID = 'ec-tooltip--invalid'
}

export enum TooltipTrigger {
  HOVER = 'hover',
  CLICK = 'click',
  MANUAL = 'manual'
}

export enum TooltipPlacement {
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left'
}

export interface TooltipOptions {
  popperClass?: TooltipPopperClass[];
  container?: HTMLElement;
  placement?: TooltipPlacement,
  triggers?: TooltipTrigger[],
  shown?: boolean,
  content?: string | boolean,
  ariaId?: string,
  delay?: number,
  distance?: number,
  skidding?: number,
  autoHide?: boolean,
}
