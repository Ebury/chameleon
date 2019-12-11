import { mount } from '@vue/test-utils';
import EcLoading from './ec-loading.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcLoading', () => {
  function mountLoading(props, mountOpts) {
    return mount(EcLoading, {
      propsData: {
        show: true,
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcLoading);
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "show"');
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

  it('should render the given slot', () => {
    const wrapper = mountLoading({}, {
      slots: {
        default: '<p>Random text</p>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
