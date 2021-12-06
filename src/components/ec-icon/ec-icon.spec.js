import { mount } from '@vue/test-utils';
import EcIcon from './ec-icon.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcIcon', () => {
  function mountEcIcon(props, mountOpts) {
    return mount(EcIcon, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mountEcIcon();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "name"');
    });
  });

  it('should throw if svg sprite does not exist', () => {
    withMockedConsole((errorSpy) => {
      expect(() => {
        mountEcIcon({ name: 'random-icon' });
      }).toThrowError('The sprite "random" doesn\'t exist');
      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy.mock.calls[0][0]).toContain('The sprite "random" doesn\'t exist');
      expect(errorSpy.mock.calls[1][0]).toEqual(new Error('The sprite "random" doesn\'t exist.'));
    });
  });

  it('should throw if sprite cannot be determined from the icon\'s name', () => {
    withMockedConsole((errorSpy) => {
      expect(() => {
        mountEcIcon({ name: 'random' });
      }).toThrowError('Unable to determine the source of SVG sprite for icon with name: random');
      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy.mock.calls[0][0]).toContain('Unable to determine the source of SVG sprite for icon with name: random');
      expect(errorSpy.mock.calls[1][0]).toEqual(new Error('Unable to determine the source of SVG sprite for icon with name: random'));
    });
  });

  it('should render properly when a name was given', () => {
    const wrapper = mount(EcIcon, { propsData: { name: 'simple-random-icon' } });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given size prop', () => {
    const wrapper = mountEcIcon({ name: 'simple-random-icon', size: 16 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(['error', 'info', 'success', 'warning'])('should use the type "%s"', (type) => {
    const wrapper = mountEcIcon({ name: 'simple-random-icon', type });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if type is not valid', () => {
    withMockedConsole((errorSpy) => {
      mountEcIcon({ name: 'simple-random-icon', type: 'invalid-value' });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "type"');
    });
  });

  it('should allow to use icon from inline sprite', () => {
    const wrapper = mountEcIcon({ name: 'random-icon', spriteSource: 'inline' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should allow to use any sprite url', () => {
    const wrapper = mountEcIcon({ name: 'random-icon', spriteSource: '/custom/sprite.svg' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(['simple', 'rounded', 'currency'])('should use the icon from the sprite "%s"', (sprite) => {
    const wrapper = mountEcIcon({ name: `${sprite}-random-icon` });
    expect(wrapper.element).toMatchSnapshot();
  });
});
