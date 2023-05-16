import { VueWrapper } from '@vue/test-utils';

export interface CVueWrapper extends VueWrapper {
  findByDataTest: (string) => CVueWrapper
}
