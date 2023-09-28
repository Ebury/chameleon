import { VueWrapper } from '@vue/test-utils';

export interface CVueWrapper extends VueWrapper {
  findByDataTest: (string) => CVueWrapper
  findAllByDataTest: (string) => CVueWrapper[]
  findComponentByDataTest: (string) => CVueWrapper
  findAllComponentsByDataTest: (string) => CVueWrapper[]
}
