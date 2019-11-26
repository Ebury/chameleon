import focusTrap from 'focus-trap';

export default {
  inserted(el, binding) {
    binding.focusTrap = focusTrap(el, {
      ...binding.value,
    });
    binding.focusTrap.activate();
  },
  unbind(el, binding) {
    /* istanbul ignore else */
    if (binding.focusTrap) {
      binding.focusTrap.deactivate();
    }
  },
};
