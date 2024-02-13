import type { DirectiveBinding, ObjectDirective } from 'vue';

export interface ToasterTouchDirectiveOptions {
  minDistance: number,
}

interface ToasterDirectiveBinding extends DirectiveBinding<ToasterTouchDirectiveOptions> {
  handleStart?: (ev: TouchEvent) => void,
  handleEnd?: (ev: TouchEvent) => void,
  handleMove?: (ev: TouchEvent) => void,
  handleCancel?: (ev: TouchEvent) => void,
}

const EcToasterTouchDirective: ObjectDirective<HTMLElement, ToasterTouchDirectiveOptions> = {
  mounted(el: HTMLElement, binding: ToasterDirectiveBinding) {
    let startX: number;
    let oldTransform: CSSStyleDeclaration['transform'];

    binding.handleStart = function handleStart(e: TouchEvent) {
      const touchObj = e.changedTouches[0];
      startX = touchObj.pageX;

      el.classList.add('ec-toaster__item--swipe-active');
      oldTransform = el.style.transform;
    };

    binding.handleEnd = function handleEnd(e: TouchEvent) {
      const touchObj = e.changedTouches[0];
      const distX = touchObj.pageX - startX;
      if (distX > binding.value.minDistance) {
        el.dispatchEvent(new CustomEvent('ec-toaster-touch-remove'));
        el.classList.add('ec-toaster__item--removed-by-swipe');
      }

      el.style.transform = oldTransform;
      el.classList.remove('ec-toaster__item--swipe-active');
    };

    binding.handleMove = function handleMove(e: TouchEvent) {
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
  beforeUnmount(el: HTMLElement, binding: ToasterDirectiveBinding) {
    if (binding.handleStart) {
      el.removeEventListener('touchstart', binding.handleStart, false);
    }
    if (binding.handleEnd) {
      el.removeEventListener('touchend', binding.handleEnd, false);
    }
    if (binding.handleMove) {
      el.removeEventListener('touchmove', binding.handleMove, false);
    }
    if (binding.handleCancel) {
      el.removeEventListener('touchcancel', binding.handleCancel, false);
    }
  },
};

export default EcToasterTouchDirective;
