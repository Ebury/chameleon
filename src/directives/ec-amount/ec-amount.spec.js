/* eslint no-underscore-dangle: "off" */
import { mount } from '@vue/test-utils';

import EcAmount from './ec-amount';

describe('EcAmount', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // setCursor uses setTimeout but it is just a fix for android, we don't need that during tests so just fake the timers
  });

  function mountTemplate(template, opts, mountOpts) {
    const Wrapper = {
      directives: { EcAmount },
      template,
      ...opts,
    };

    const wrapper = mount(Wrapper, { ...mountOpts });
    return { input: wrapper.findByDataTest('amount-input'), wrapper };
  }

  it('should format the given number using default locale', () => {
    const { input } = mountTemplate('<input v-ec-amount data-test="amount-input" />');
    input.setValue(2222.22);
    expect(input.element.value).toBe('2,222.22');
  });

  it('should not add separators if the input value is smaller than 1000', () => {
    const { input } = mountTemplate('<input v-ec-amount data-test="amount-input" />');
    input.setValue(222);
    expect(input.element.value).toBe('222');
  });

  it('should add a separator with the default character', () => {
    const { input } = mountTemplate('<input v-ec-amount data-test="amount-input" />');
    setValue(input, '222222');
    expect(input.element.value).toBe('222,222');
  });

  it('should add multiple separators with the default character', () => {
    const { input } = mountTemplate('<input v-ec-amount data-test="amount-input" />');
    setValue(input, '2222222');
    expect(input.element.value).toBe('2,222,222');
  });

  it('should destroy the directive and unbind the methods', () => {
    const { wrapper, input } = mountTemplate('<input v-ec-amount data-test="amount-input" />');
    const spy = jest.spyOn(input.element, 'removeEventListener');

    wrapper.unmount();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should throw an error if the directive is not attached to an input', () => {
    expect(() => mountTemplate('<div v-ec-amount="{}"></div>')).toThrow(new TypeError('v-ec-amount requires 1 input'));
  });

  it('should ignore letters and only keep the numbers and the cursor position does not change', () => {
    const { input } = mountTemplate('<input v-ec-amount data-test="amount-input" />');
    setValue(input, '222222');
    expect(input.element.value).toBe('222,222');

    setValue(input, '222222a');
    expect(input.element.value).toBe('222,222');

    setValue(input, '22');
    expect(input.element.selectionStart).toBe(2);
    setValue(input, 'a22');
    expect(input.element.selectionStart).toBe(2);
  });

  it('should remember the previous position of the cursor', () => {
    const { input } = mountTemplate('<input v-ec-amount data-test="amount-input" />');
    setValue(input, '222222');
    expect(input.element.__previousCursorPosition).toBe(6);

    moveCursorToPosition(input, 2);
    expect(input.element.__previousCursorPosition).toBe(2);
  });

  it('should move cursor if a decimal separator was added', () => {
    const { input } = mountTemplate('<input v-ec-amount data-test="amount-input" />');

    setValue(input, '222');
    expect(input.element.selectionStart).toBe(3);

    setValue(input, '2222');
    expect(input.element.selectionStart).toBe(5);
  });
});

function setValue(input, value) {
  input.element.focus();
  input.element.value = value;
  moveCursorToPosition(input, input.element.value.length); // move the cursor to the end (simulate the behaviour from the browser. JSDOM puts it at the start of the input)
  expect(input.element.selectionStart).toBe(value.length);
  input.trigger('input');
}

function moveCursorToPosition(input, position) {
  input.element.setSelectionRange(position, position);
  input.trigger('keydown'); // remember the position of the cursor
}
