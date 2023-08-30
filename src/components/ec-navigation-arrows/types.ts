export enum NavigationArrowsEvent {
  RIGHT_ARROW_CLICK = 'right-arrow-click',
  LEFT_ARROW_CLICK = 'left-arrow-click',
}

export interface NavigationArrowsEvents {
  [NavigationArrowsEvent.RIGHT_ARROW_CLICK]: undefined
  [NavigationArrowsEvent.LEFT_ARROW_CLICK]: undefined
}

export interface NavigationArrowsProps {
  isRightArrowDisabled?: boolean
  isLeftArrowDisabled?: boolean
}
