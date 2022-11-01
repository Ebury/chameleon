import type { VueWrapper } from '@vue/test-utils';

export function findByDataTest(wrapper: VueWrapper, dataTest: string) {
  return wrapper.find(`[data-test~=${dataTest}]`);
}
