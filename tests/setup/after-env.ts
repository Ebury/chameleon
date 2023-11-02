import { BaseWrapper, config, VueWrapper } from '@vue/test-utils';

import '@testing-library/jest-dom';

// [data-test]
function findByDataTest<T extends Element | Node>(this: BaseWrapper<Node>, dataTest: string) {
  return this.find<T>(`[data-test~=${dataTest}]`);
}

function findAllByDataTest<T extends Element>(this: BaseWrapper<Node>, dataTest: string) {
  return this.findAll<T>(`[data-test~=${dataTest}]`);
}

function findComponentByDataTest<T = never>(this: BaseWrapper<Node>, dataTest: string) {
  return this.findComponent(`[data-test~=${dataTest}]`) as VueWrapper<T>; // .findComponent() returns WrapperLike which can't be extended, VueWrapper has the same shape
}

function findAllComponentsByDataTest<T = never>(this: BaseWrapper<Node>, dataTest: string) {
  return this.findAllComponents(`[data-test~=${dataTest}]`) as VueWrapper<T>[]; // .findAllComponents() returns WrapperLike[] which can't be extended, VueWrapper has the same shape
}

BaseWrapper.prototype.findByDataTest = findByDataTest;
BaseWrapper.prototype.findAllByDataTest = findAllByDataTest;
BaseWrapper.prototype.findComponentByDataTest = findComponentByDataTest;
BaseWrapper.prototype.findAllComponentsByDataTest = findAllComponentsByDataTest;

// @vue/compiler-sfc
const customElements = new Set(['ec-stub']);

config.global.config.compilerOptions = {
  whitespace: 'condense',
  isCustomElement: tag => customElements.has(tag),
  comments: false,
};
