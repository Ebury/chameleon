/* eslint-disable no-underscore-dangle */
import { createFocusTrap } from 'focus-trap';

function attachFocusTrap(el, options) {
  /* istanbul ignore if */
  if (el.__focusTrap) {
    // if there is already previous focus-trap on the element, deactivate it.
    el.__focusTrap.deactivate();
  }

  el.__focusTrap = createFocusTrap(el, options);
  el.__focusTrap.activate(options);
}

export default {
  mounted(el, binding) {
    attachFocusTrap(el, binding.value);
  },
  updated(el, { value, oldValue }) {
    /* istanbul ignore else */
    if (value && oldValue) {
      if (value.escapeDeactivates !== oldValue.escapeDeactivates || value.clickOutsideDeactivates !== oldValue.clickOutsideDeactivates) {
        attachFocusTrap(el, value);
      }
    }
  },
  beforeUnmount(el) {
    /* istanbul ignore else */
    if (el.__focusTrap) {
      el.__focusTrap.deactivate();
    }
  },
};
