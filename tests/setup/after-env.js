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
