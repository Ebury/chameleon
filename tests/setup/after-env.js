import { Wrapper, WrapperArray } from '@vue/test-utils';

require('snapshot-diff/extend-expect');

Wrapper.prototype.findByDataTest = function findByDataTest(dataTest) {
  return this.find(`[data-test~=${dataTest}]`);
};
WrapperArray.prototype.findAllByDataTest = function findAllByDataTest(dataTest) {
  return this.findAll(`[data-test~=${dataTest}]`);
};
