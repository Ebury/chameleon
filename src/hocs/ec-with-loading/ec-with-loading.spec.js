import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import withLoading from './ec-with-loading';

describe('EcWithLoading', () => {
  function mountEcWithLoading(props, mountOpts, wrapperComponentOpts) {
    const Component = defineComponent({
      props: {
        customProp: {
          type: Number,
          default: 1,
        },
      },
      render() {
        return h('div', { 'data-custom': this.customProp });
      },
      ...wrapperComponentOpts,
    });

    const hocWrapper = mount(withLoading(Component), {
      props,
      ...mountOpts,
    });

    return hocWrapper;
  }

  describe(':props', () => {
    it('should throw an error when isLoading prop is not set', () => {
      withMockedConsole((errorSpy, warnSpy) => {
        mountEcWithLoading();
        expect(warnSpy).toHaveBeenCalledTimes(5);
        expect(warnSpy.mock.calls[3][0]).toContain('Invalid prop: type check failed for prop "show"');
      });
    });

    it('should show loading when isLoading prop is set to true', () => {
      const hocWrapper = mountEcWithLoading({ isLoading: true });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should hide loading when isLoading prop is set to false', () => {
      const hocWrapper = mountEcWithLoading({ isLoading: false });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should render transparent by default', () => {
      const hocWrapper = mountEcWithLoading({ isLoading: true, isLoadingTransparent: undefined });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should render transparent when isLoadingTransparent is set to true', () => {
      const hocWrapper = mountEcWithLoading({ isLoading: true, isLoadingTransparent: true });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should not render transparent when isLoadingTransparent is set to false', () => {
      const hocWrapper = mountEcWithLoading({ isLoading: true, isLoadingTransparent: false });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should use iconSize prop', () => {
      const hocWrapper = mountEcWithLoading({ isLoading: true, loadingIconSize: 64 });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should pass rest of the props to the wrapped component', () => {
      const hocWrapper = mountEcWithLoading({ isLoading: true, customProp: 2 });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should pass slots', () => {
      const hocWrapper = mountEcWithLoading({ isLoading: true, customProp: 2 }, {
        slots: {
          default({ slotProp }) {
            return h('div', `Prop value: ${slotProp}`);
          },
        },
      }, {
        template: '<div><slot v-bind="{ slotProp: customProp }"></slot></div>',
        render: null,
      });
      expect(hocWrapper.element).toMatchSnapshot();
    });
  });
});
