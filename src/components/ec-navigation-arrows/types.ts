export enum NavigationArrowsEvent {
  NEXT_CLICK = 'next-click',
  PREVIOUS_CLICK = 'previous-click',
}

export interface NavigationArrowsEvents {
  [NavigationArrowsEvent.NEXT_CLICK]: undefined
  [NavigationArrowsEvent.PREVIOUS_CLICK]: undefined
}

export interface NavigationArrowsProps {
  isNextDisabled?: boolean
  isPreviousDisabled?: boolean
}
