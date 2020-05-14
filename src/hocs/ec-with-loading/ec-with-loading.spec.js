import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import withLoading from './ec-with-loading';

describe('EcWithLoading', () => {
  function mountEcWithLoading(props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      props: {
        customProp: {
          type: Number,
          default: 1,
        },
      },
      render(h) {
        return h('div', { attrs: { 'data-custom': this.customProp } });
      },
    });

    const hocWrapper = mount(withLoading(Component), {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });

    const componentWrapper = createWrapper(hocWrapper.vm.$children[0].$vnode);

    return { hocWrapper, componentWrapper };
  }

  it('should render properly', () => {
    const { hocWrapper } = mountEcWithLoading();
    expect(hocWrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should hide loading when isLoading prop is not set', () => {
      const { hocWrapper } = mountEcWithLoading({ isLoading: undefined });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should show loading when isLoading prop is set to true', () => {
      const { hocWrapper } = mountEcWithLoading({ isLoading: true });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should hide loading when isLoading prop is set to false', () => {
      const { hocWrapper } = mountEcWithLoading({ isLoading: false });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should render transparent by default', () => {
      const { hocWrapper } = mountEcWithLoading({ isLoading: true, isLoadingTransparent: undefined });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should render transparent when isLoadingTransparent is set to true', () => {
      const { hocWrapper } = mountEcWithLoading({ isLoading: true, isLoadingTransparent: true });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should not render transparent when isLoadingTransparent is set to false', () => {
      const { hocWrapper } = mountEcWithLoading({ isLoading: true, isLoadingTransparent: false });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should use iconSize prop', () => {
      const { hocWrapper } = mountEcWithLoading({ isLoading: true, loadingIconSize: 64 });
      expect(hocWrapper.element).toMatchSnapshot();
    });

    it('should pass rest of the props to the wrapped component', () => {
      const { hocWrapper } = mountEcWithLoading({ isLoading: true, customProp: 2 });
      expect(hocWrapper.element).toMatchSnapshot();
    });
  });
});
