export default {
  compatConfig: {
    MODE: 3,
  },
  mounted(el, binding, vnode) {
    let startX;
    let oldTransform;

    binding.handleStart = function handleStart(e) {
      const touchObj = e.changedTouches[0];
      startX = touchObj.pageX;

      el.classList.add('ec-toaster__item--swipe-active');
      oldTransform = el.style.transform;
    };

    binding.handleEnd = function handleEnd(e) {
      const touchObj = e.changedTouches[0];
      const distX = touchObj.pageX - startX;
      if (distX > binding.value.minDistance) {
        vnode.el.dispatchEvent(new CustomEvent('ec-toaster-touch-remove'));
        el.classList.add('ec-toaster__item--removed-by-swipe');
      }

      el.style.transform = oldTransform;
      el.classList.remove('ec-toaster__item--swipe-active');
    };

    binding.handleMove = function handleMove(e) {
      const touchObj = e.changedTouches[0];
      const distX = touchObj.pageX - startX;
      if (distX > 0) {
        el.style.transform = `translateX(${distX}px)`;
      }
    };

    binding.handleCancel = function handleCancel() {
      el.style.transform = oldTransform;
      el.classList.remove('ec-toaster__item--swipe-active');
    };

    el.addEventListener('touchstart', binding.handleStart, false);
    el.addEventListener('touchend', binding.handleEnd, false);
    el.addEventListener('touchmove', binding.handleMove, false);
    el.addEventListener('touchcancel', binding.handleCancel, false);
  },
  beforeUnmount(el, binding) {
    el.removeEventListener('touchstart', binding.handleStart, false);
    el.removeEventListener('touchend', binding.handleEnd, false);
    el.removeEventListener('touchmove', binding.handleMove, false);
    el.removeEventListener('touchcancel', binding.handleCancel, false);
  },
};
