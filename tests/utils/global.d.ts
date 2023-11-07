import { DOMWrapper, VueWrapper } from '@vue/test-utils';

declare module '@vue/test-utils' {
  interface BaseWrapper {
    findByDataTest<T extends Element = Element>(selector: string): DOMWrapper<T>;
    findByDataTest<T extends Node = Node>(selector: string | RefSelector): DOMWrapper<T>;
    findAllByDataTest<T extends Element>(selector: string): DOMWrapper<T>[];
    findComponentByDataTest<T extends Element>(selector: string): VueWrapper<T>;
    findComponentByDataTest(selector: string): WrapperLike;
    findAllComponentsByDataTest<T extends Element>(selector: string): VueWrapper<T>[];
  }
}
