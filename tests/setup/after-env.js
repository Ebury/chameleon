import { configureCompat } from 'vue';

import '@testing-library/jest-dom';

import { Wrapper, WrapperArray } from '@vue/test-utils';

require('snapshot-diff/extend-expect');

function findAllByDataTest(dataTest) {
  return this.findAll(`[data-test~=${dataTest}]`);
}

Wrapper.prototype.findByDataTest = function findByDataTest(dataTest) {
  return this.find(`[data-test~=${dataTest}]`);
};
Wrapper.prototype.findAllByDataTest = findAllByDataTest;
WrapperArray.prototype.findAllByDataTest = findAllByDataTest;

// @vue/compiler-sfc
config.global.compilerOptions = {
  ...config.global.compilerOptions,
  whitespace: 'condense',
  comments: false,
};

// @vue/compat
configureCompat({
  MODE: 2,
  RENDER_FUNCTION: true,
});
