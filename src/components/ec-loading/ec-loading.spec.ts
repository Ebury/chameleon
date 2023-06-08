import { mount, type MountingOptions } from '@vue/test-utils';

import { withMockedConsole } from '../../../tests/utils/console';
import EcLoading from './ec-loading.vue';
import type { LoadingProps } from './types';

describe('EcLoading', () => {
  function mountLoading(props?: Partial<LoadingProps>, mountOpts: MountingOptions<LoadingProps> = {}) {
    return mount<LoadingProps>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EcLoading as any,
      {
        props: {
          show: true,
          ...props,
        },
        ...mountOpts,
      },
    );
  }

  it('should throw if no props were given', () => {
    withMockedConsole((_errorSpy: jest.SpyInstance, warnSpy: jest.SpyInstance) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mount(EcLoading as any);
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "show"');
    });
  });

  it('should render as expected', () => {
    const wrapper = mountLoading();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render the loading if the show prop is set to false', () => {
    const wrapper = mountLoading({ show: false });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the loading without the content visible if the transparent prop is set to false', () => {
    const wrapper = mountLoading({ transparent: false });
    expect(wrapper.find('.ec-loading__content--is-transparent').exists()).toBe(false);
    expect(wrapper.find('.ec-loading__backdrop--is-transparent').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the loading with visible content if the transparent prop is set to false and the show is set to false', () => {
    const wrapper = mountLoading({ transparent: false, show: false });
    expect(wrapper.find('.ec-loading__content--is-transparent').exists()).toBe(true);
    expect(wrapper.find('.ec-loading__backdrop--is-transparent').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the loading with a given icon size when the prop size is set to not 48', () => {
    const wrapper = mountLoading({ size: 30 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the given slot', () => {
    const wrapper = mountLoading({}, {
      slots: {
        default: '<p>Random text</p>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
