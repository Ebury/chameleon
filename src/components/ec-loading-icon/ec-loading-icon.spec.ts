import { mount } from '@vue/test-utils';

import EcLoadingIcon from './ec-loading-icon.vue';

describe('EcLoadingIcon', () => {
  it('should render properly using the given size prop', () => {
    const wrapper = mount(EcLoadingIcon, { props: { size: 16 } });

    expect(wrapper.element).toMatchSnapshot();
  });
});
