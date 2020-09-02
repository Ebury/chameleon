import { mount } from '@vue/test-utils';
import EcFocusTrap from './ec-focus-trap';

jest.mock('focus-trap', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    activate: jest.fn(),
    deactivate: jest.fn(),
  })),
}));

const focusTrap = require('focus-trap').default;

describe('EcFocusTrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function mountTemplate(template, opts, mountOpts) {
    const Wrapper = {
      directives: { EcFocusTrap },
      template,
      ...opts,
    };

    return mount(Wrapper, { ...mountOpts });
  }

  it('should initialize itself', () => {
    const wrapper = mountTemplate('<div v-ec-focus-trap class="focus-trap-container" />');
    expect(focusTrap).toHaveBeenCalledTimes(1);
    expect(focusTrap).toHaveBeenCalledWith(wrapper.find('.focus-trap-container').element, undefined);
  });

  it('should initialize itself with given options', () => {
    const wrapper = mountTemplate('<div v-ec-focus-trap="{ prop1: true }" class="focus-trap-container" />');
    expect(focusTrap).toHaveBeenCalledTimes(1);
    expect(focusTrap).toHaveBeenCalledWith(wrapper.find('.focus-trap-container').element, { prop1: true });
  });

  it('should activate itself when attached to DOM', () => {
    mountTemplate('<div v-ec-focus-trap />');
    const focusTrapInstance = focusTrap.mock.results[0].value;
    expect(focusTrapInstance).not.toBeUndefined();
    expect(focusTrapInstance.activate).toHaveBeenCalledTimes(1);
  });

  it('should deactivate itself when removed from DOM', () => {
    const wrapper = mountTemplate('<div v-ec-focus-trap />');
    const focusTrapInstance = focusTrap.mock.results[0].value;
    expect(focusTrapInstance).not.toBeUndefined();

    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(0);
    wrapper.destroy();
    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(1);
  });

  it.each(['escapeDeactivates', 'clickOutsideDeactivates'])('should reinitialize itself if %s changes', async (propName) => {
    const wrapper = mountTemplate('<div v-ec-focus-trap="{ ...options }" />', {
      data() {
        return { options: { [propName]: true } };
      },
    });

    expect(focusTrap).toHaveBeenCalledTimes(1);
    const focusTrapInstance = focusTrap.mock.results[0].value;
    expect(focusTrapInstance.activate).toHaveBeenCalledTimes(1);
    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(0);

    focusTrap.mockClear();
    await wrapper.setData({ options: { [propName]: false } });

    expect(focusTrap).toHaveBeenCalledTimes(1);
    const newFocusTrapInstance = focusTrap.mock.results[0].value;
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

    expect(focusTrap).toHaveBeenCalledTimes(1);
    const focusTrapInstance = focusTrap.mock.results[0].value;
    expect(focusTrapInstance.activate).toHaveBeenCalledTimes(1);
    expect(focusTrapInstance.deactivate).toHaveBeenCalledTimes(0);

    focusTrap.mockClear();
    wrapper.setData({ options: { customProp: false } });

    expect(focusTrap).not.toHaveBeenCalled();
  });
});
