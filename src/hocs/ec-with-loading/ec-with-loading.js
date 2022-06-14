import { h } from 'vue';

import EcLoading from '../../components/ec-loading';
import { createHOC } from '../hoc';

const withLoading = Component => createHOC(Component, {
  name: 'EcWithLoading',
  compatConfig: {
    MODE: 3,
    INSTANCE_SCOPED_SLOTS: true,
  },
  props: {
    isLoading: {},
    isLoadingTransparent: {},
    loadingIconSize: {},
  },
  render() {
    const {
      isLoading, isLoadingTransparent, loadingIconSize, ...componentProps
    } = this.$props;

    return h(EcLoading, {
      show: isLoading,
      transparent: isLoadingTransparent,
      size: loadingIconSize,
    }, h(Component, {
      ...this.$attrs,
      ...componentProps,
    }, this.$scopedSlots));
  },
});

export default withLoading;
