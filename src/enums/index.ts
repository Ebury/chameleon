export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortDirectionCycle {
  LOWEST_FIRST = 1,
  HIGHEST_FIRST = 2,
}

/**
 * @deprecated
 * KeyCode enum is deprecated use KeyboardKey instead
 * docs: [MDN Reference](https://developer.mozilla.org/docs/Web/API/KeyboardEvent/keyCode)
 */
export enum KeyCode {
  ARROW_UP = 38,
  ARROW_DOWN = 40,
}

// see full list: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
export enum KeyboardKey {
  ESCAPE = 'Escape',
}

export enum ZIndexLevel {
  NOTIFICATION = 'notification',
  MODAL = 'modal',
  TOOLTIP = 'tooltip',
  LEVEL1 = 'level-1',
  LEVEL2 = 'level-2',
  LEVEL3 = 'level-3',
}
