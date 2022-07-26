import { config, DOMWrapper, VueWrapper } from '@vue/test-utils';
import { configureCompat } from 'vue';

import '@testing-library/jest-dom';

require('snapshot-diff/extend-expect');

// [data-test]
function findByDataTest(dataTest) {
  return this.find(`[data-test~=${dataTest}]`);
}

function findAllByDataTest(dataTest) {
  return this.findAll(`[data-test~=${dataTest}]`);
}

function findComponentByDataTest(dataTest) {
  return this.findComponent(`[data-test~=${dataTest}]`);
}

function findAllComponentsByDataTest(dataTest) {
  return this.findAllComponents(`[data-test~=${dataTest}]`);
}

VueWrapper.prototype.findByDataTest = findByDataTest;
DOMWrapper.prototype.findByDataTest = findByDataTest;

VueWrapper.prototype.findAllByDataTest = findAllByDataTest;
DOMWrapper.prototype.findAllByDataTest = findAllByDataTest;

VueWrapper.prototype.findComponentByDataTest = findComponentByDataTest;
DOMWrapper.prototype.findComponentByDataTest = findComponentByDataTest;

VueWrapper.prototype.findAllComponentsByDataTest = findAllComponentsByDataTest;
DOMWrapper.prototype.findAllComponentsByDataTest = findAllComponentsByDataTest;

// @vue/compiler-sfc
const customElements = new Set(['ec-stub']);

config.global.config.compilerOptions = {
  whitespace: 'condense',
  isCustomElement: tag => customElements.has(tag),
  comments: false,
  compatConfig: {
    MODE: 3,
    RENDER_FUNCTION: false,
  },
};

// @vue/compat
configureCompat({
  MODE: 2,
  RENDER_FUNCTION: true,
  COMPONENT_V_MODEL: false,
});
