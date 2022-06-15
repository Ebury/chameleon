import { mount } from '@vue/test-utils';

import { withMockedConsole } from '../../../tests/utils/console';
import EcIcon from './ec-icon.vue';

describe('EcIcon', () => {
  function mountEcIcon(props, mountOpts) {
    return mount(EcIcon, {
      props,
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcIcon();
      expect(warnSpy).toHaveBeenCalledTimes(2);
      expect(warnSpy.mock.calls[1][0]).toContain('Missing required prop: "name"');
    });
  });

  it('should render properly when a name was given', () => {
    const wrapper = mount(EcIcon, { props: { name: 'random-icon' } });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given size prop', () => {
    const wrapper = mountEcIcon({ name: 'random-icon', size: 16 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(['error', 'info', 'success', 'warning'])('should use the type "%s"', (type) => {
    const wrapper = mountEcIcon({ name: 'random-icon', type });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if type is not valid', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcIcon({ name: 'random-icon', type: 'invalid-value' });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "type"');
    });
  });

  it('should pass custom attributes', () => {
    const wrapper = mountEcIcon({
      name: 'random-icon',
      id: 'my-icon',
      'data-test': 'my-custom-icon',
    });

    expect(wrapper.attributes('id')).toBe('my-icon');
    expect(wrapper.attributes('data-test')).toBe('my-custom-icon');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should pass a custom event handler', () => {
    const clickSpy = jest.fn();
    const wrapper = mountEcIcon({
      name: 'random-icon',
      onClick: clickSpy,
      'data-test': 'my-custom-icon',
    });

    wrapper.findByDataTest('my-custom-icon').trigger('click');
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('click').length).toBe(1);
  });
});
