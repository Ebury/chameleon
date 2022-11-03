import { mount } from '@vue/test-utils';

import EcFullScreenOverlay from './ec-full-screen-overlay.vue';

describe('EcFullScreenOverlay', () => {
  function mountFullScreenOverlay(props, mountOpts) {
    return mount(EcFullScreenOverlay, {
      props: {
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountFullScreenOverlay();

    expect(wrapper.element).toMatchSnapshot();
  });
});

