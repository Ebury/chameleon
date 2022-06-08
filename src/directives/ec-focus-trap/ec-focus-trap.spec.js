import { mount } from '@vue/test-utils';

import EcFocusTrap from './ec-focus-trap';

jest.mock('focus-trap', () => ({
  __esModule: true,
  createFocusTrap: jest.fn(() => ({
    activate: jest.fn(),
    deactivate: jest.fn(),
  })),
}));

const { createFocusTrap } = require('focus-trap');

describe('EcFocusTrap', () => {
  function mountTemplate(template, opts, mountOpts) {
    const Wrapper = {
      directives: { EcFocusTrap },
      template,
      ...opts,
    };

    return mount(Wrapper, { ...mountOpts });
  }

  it('should initialize itself', () => {
    const wrapper = mountTemplate('<div v-ec-focus-trap data-test="focus-trap-container" />');
    expect(createFocusTrap).toHaveBeenCalledTimes(1);
    expect(createFocusTrap).toHaveBeenCalledWith(wrapper.findByDataTest('focus-trap-container').element, undefined);
  });

  it('should initialize itself with given options', () => {
    const wrapper = mountTemplate('<div v-ec-focus-trap="{ prop1: true }" data-test="focus-trap-container" />');
    expect(createFocusTrap).toHaveBeenCalledTimes(1);
    expect(createFocusTrap).toHaveBeenCalledWith(wrapper.findByDataTest('focus-trap-container').element, { prop1: true });
  });

  it('should activate itself when attached to DOM', () => {
    mountTemplate('<div v-ec-focus-trap />');
    const focusTrapInstance = createFocusTrap.mock.results[0].value;
    expect(focusTrapInstance).not.toBeUndefined();
    expect(focusTrapInstance.activate).toHaveBeenCalledTimes(1);
  });

  it('should deactivate itself when removed from DOM', () => {
    const wrapper = mountTemplate('<div v-ec-focus-trap />');
    const focusTrapInstance = createFocusTrap.mock.results[0].value;
    expect(focusTrapInstance).not.toBeUndefined();

    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(0);
    wrapper.unmount();
    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(1);
  });

  it.each(['escapeDeactivates', 'clickOutsideDeactivates'])('should reinitialize itself if %s changes', async (propName) => {
    const wrapper = mountTemplate('<div v-ec-focus-trap="{ ...options }" />', {
      data() {
        return { options: { [propName]: true } };
      },
    });

    expect(createFocusTrap).toHaveBeenCalledTimes(1);
    const focusTrapInstance = createFocusTrap.mock.results[0].value;
    expect(focusTrapInstance.activate).toHaveBeenCalledTimes(1);
    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(0);

    createFocusTrap.mockClear();
    await wrapper.setData({ options: { [propName]: false } });

    expect(createFocusTrap).toHaveBeenCalledTimes(1);
    const newFocusTrapInstance = createFocusTrap.mock.results[0].value;
    expect(newFocusTrapInstance).not.toBe(focusTrapInstance);

    expect(newFocusTrapInstance.activate).toHaveBeenCalledTimes(1);
    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(1);
  });

  it('should not reinitialize itself when other prop change', () => {
    const wrapper = mountTemplate('<div v-ec-focus-trap="{ ...options }" />', {
      data() {
        return { options: { customProp: true } };
      },
    });

    expect(createFocusTrap).toHaveBeenCalledTimes(1);
    const focusTrapInstance = createFocusTrap.mock.results[0].value;
    expect(focusTrapInstance.activate).toHaveBeenCalledTimes(1);
    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(0);

    createFocusTrap.mockClear();
    wrapper.setData({ options: { customProp: false } });

    expect(createFocusTrap).not.toHaveBeenCalled();
  });
});
