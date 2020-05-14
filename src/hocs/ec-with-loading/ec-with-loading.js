import { createHOC, createRenderFn } from 'vue-hoc';
import EcLoading from '../../components/ec-loading';

const withLoading = (Component, options = {}, renderOptions = {}) => createHOC(Component, {
  ...options,
  name: 'EcWithLoading',
  functional: true,
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isLoadingTransparent: {
      type: Boolean,
      default: true,
    },
    loadingIconSize: {
      type: Number,
    },
    ...options.props,
  },
  render(h, context) {
    const { props } = context;
    const {
      isLoading, isLoadingTransparent, loadingIconSize, ...componentProps
    } = props;
    return (
      <EcLoading show={isLoading} transparent={isLoadingTransparent} size={loadingIconSize}>
        {createRenderFn(Component, renderOptions).call(this, h, { ...context, props: componentProps })}
      </EcLoading>
    );
  },
});

export default withLoading;
