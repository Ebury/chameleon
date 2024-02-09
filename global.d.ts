declare module 'vue' {
  interface ComponentCustomProperties {
    $tooltipContainer?: HTMLElement | DocumentFragment | string;
  }
}

export type Maybe<T> = T | null;

// source: https://github.com/microsoft/TypeScript/issues/43505
export type NumericRange<
  TStart extends number,
  TEnd extends number,
  TArrayLike extends unknown[] = [],
  TAcc extends number = never,
> = TArrayLike['length'] extends TEnd
  ? TAcc | TStart | TEnd
  : NumericRange<TStart, TEnd, [...TArrayLike, 1], TArrayLike[TStart] extends undefined ? TAcc : TAcc | TArrayLike['length']>;
