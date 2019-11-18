/* eslint-disable no-param-reassign */
import focusTrap from 'focus-trap';

export default {
  inserted(el, binding) {
    binding.focusTrap = focusTrap(el, {
      ...binding.value,
    });
    binding.focusTrap.activate();
  },
  unbind(el, binding) {
    if (binding.focusTrap) {
      binding.focusTrap.deactivate();
    }
  },
};
