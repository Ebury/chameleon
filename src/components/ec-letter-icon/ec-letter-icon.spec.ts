import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcLetterIcon from './ec-letter-icon.vue';
import { type LetterIconProps, LetterIconSize } from './types';

describe('EcLetterIcon', () => {
  function mountLetterIcon(props: LetterIconProps, mountOpts?: ComponentMountingOptions<typeof EcLetterIcon>) {
    return mount(
      EcLetterIcon,
      {
        props: {
          ...props,
        },
        ...mountOpts,
      },
    );
  }

  it('should render as expected', () => {
    const wrapper = mountLetterIcon({
      text: 'Test',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the first letter of the text we passed through prop', () => {
    const wrapper = mountLetterIcon({
      text: 'Test',
    });

    const text = wrapper.findByDataTest('ec-letter-icon__text');
    expect(text.text()).toBe('T');
  });

  it('should render the letter as uppercase if the text begins with a lowercase character', () => {
    const wrapper = mountLetterIcon({
      text: 'test',
    });

    const text = wrapper.findByDataTest('ec-letter-icon__text');
    expect(text.text()).toBe('T');
  });

  it('should not display the icon if text is an empty string', () => {
    const wrapper = mountLetterIcon({
      text: '',
    });

    const container = wrapper.findByDataTest('ec-letter-icon');
    expect(container.exists()).toBe(false);
  });

  it('should apply corresponding class if "size" prop is set', () => {
    const wrapper = mountLetterIcon({
      text: 'Test',
      size: LetterIconSize.MEDIUM,
    });

    const container = wrapper.findByDataTest('ec-letter-icon');
    expect(container.classes()).toContain('ec-letter-icon--md');
  });

  it('should use button element and add clickable class if "isClickable" prop is set', () => {
    const wrapper = mountLetterIcon({
      text: 'Test',
      isClickable: true,
    });

    const container = wrapper.findByDataTest('ec-letter-icon');
    expect(container.element.tagName).toContain('BUTTON');
    expect(container.classes()).toContain('ec-letter-icon--clickable');
  });

  it('should add hover styles if "isParentHovered" prop is set', () => {
    const wrapper = mountLetterIcon({
      text: 'Test',
      isParentHovered: true,
    });

    const container = wrapper.findByDataTest('ec-letter-icon');
    expect(container.classes()).toContain('ec-letter-icon--hover-styles');
  });
});
