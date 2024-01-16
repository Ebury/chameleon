import { mount } from '@vue/test-utils';

import useEcConfig, { CHAMELEON_CONFIG_KEY } from './use-ec-config';

describe('useEcConfig', () => {
  function mountUseEcConfig(mountOpts = {}) {
    const Component = {
      setup() {
        const config = useEcConfig();
        return { config };
      },
      template: '<div>{{ config }}</div>',
    };

    return mount(Component, {
      global: {
        provide: {
          [CHAMELEON_CONFIG_KEY]: 'mockedValue',
        },
      },
      ...mountOpts,
    });
  }

  it('should retrieve the config', () => {
    const wrapper = mountUseEcConfig();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should retrieve default config if not provided', () => {
    const wrapper = mountUseEcConfig({
      global: {},
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
