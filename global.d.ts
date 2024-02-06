declare module 'vue' {
  interface ComponentCustomProperties {
    $tooltipContainer?: HTMLElement | DocumentFragment | string;
  }
}

export type Maybe<T> = T | null;
