/* eslint no-underscore-dangle: "off" */
import type { DirectiveBinding, ObjectDirective } from 'vue';

import defaultOptions from './options';
import type { AmountDirectiveOptions } from './types';
import { format, setCursor } from './utils';

export interface EcAmountInputElement extends HTMLInputElement {
  __amountOptions?: AmountDirectiveOptions,
  __preventHandlingNextInputEvent?: boolean,
  __inputHandler?: () => void,
  __keydownHandler?: () => void,
  __previousFormattedValue?: string,
  __previousCursorPosition?: number,
}

function getNumberOfSeparators(value: string, endIndex: number, separator: string): number {
  const matches = value.substring(0, endIndex).match(new RegExp(`\\${separator}`, 'g'));
  return matches ? matches.length : 0;
}

function updateOptions(el: EcAmountInputElement, binding: DirectiveBinding<AmountDirectiveOptions>) {
  const options = (binding && binding.value) ? binding.value : {};

  const opts: AmountDirectiveOptions = {
    ...defaultOptions,
    ...options,
  };

  el.__amountOptions = opts;
}

function getOptions(el: EcAmountInputElement): AmountDirectiveOptions {
  return /* c8 ignore next */ el.__amountOptions || defaultOptions;
}

const EcAmountDirective: ObjectDirective<EcAmountInputElement, AmountDirectiveOptions> = {
  updated(el: EcAmountInputElement, binding: DirectiveBinding<AmountDirectiveOptions>) {
    updateOptions(el, binding);
  },

  beforeMount(el: EcAmountInputElement, binding: DirectiveBinding<AmountDirectiveOptions>) {
    /* eslint no-param-reassign: "off" */
    // v-ec-amount used on a component that's not an input
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
      [el] = el.getElementsByTagName('input');
    }
    if (el === undefined) {
      throw new TypeError('v-ec-amount requires 1 input');
    }

    updateOptions(el, binding);

    el.__inputHandler = function inputHandler() {
      if (el.__preventHandlingNextInputEvent) {
        el.__preventHandlingNextInputEvent = false;
        return;
      }

      const options = getOptions(el);

      /* c8 ignore next */
      let positionFromStart = el.selectionStart ?? 0;
      const numberOfSeparatorsBefore = getNumberOfSeparators(el.value, positionFromStart, options.groupingSeparator);
      const prevValue = el.__previousFormattedValue;
      const newValue = format(el.value, options);

      if (prevValue !== newValue) {
        const numberOfSeparatorsAfter = getNumberOfSeparators(newValue, positionFromStart, options.groupingSeparator);
        positionFromStart += numberOfSeparatorsAfter - numberOfSeparatorsBefore;
      } else {
        positionFromStart = el.__previousCursorPosition ?? 0;
      }

      el.value = newValue;
      el.__previousFormattedValue = newValue;

      setCursor(el, positionFromStart);

      // because we changed the el.value in the middle of the input event, we have to re-trigger it
      // using the event('input') so the event.target.value will be the new value.
      // the problem is that this directive listens for the input event too, so it will
      // run an infinite loop. To prevent that, let's signal we want to skip next input event
      // by setting __preventHandlingNextInputEvent to true.
      el.__preventHandlingNextInputEvent = true;
      el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    };

    el.addEventListener('input', el.__inputHandler);

    el.__keydownHandler = function keydownHandler() {
      /* c8 ignore next */
      el.__previousCursorPosition = el.selectionStart ?? 0;
    };
    el.addEventListener('keydown', el.__keydownHandler);
  },

  beforeUnmount(el) {
    if (el.__inputHandler) {
      el.removeEventListener('input', el.__inputHandler);
    }
    if (el.__keydownHandler) {
      el.removeEventListener('keydown', el.__keydownHandler);
    }

    delete el.__inputHandler;
    delete el.__keydownHandler;
    delete el.__previousCursorPosition;
    delete el.__previousFormattedValue;
    delete el.__amountOptions;
    delete el.__preventHandlingNextInputEvent;
  },
};

export default EcAmountDirective;
