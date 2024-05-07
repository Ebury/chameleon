import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcLetterIcon from './ec-letter-icon.vue';
import type { LetterIconProps } from './types';

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

    const svgText = wrapper.findByDataTest('ec-letter-icon__svg__text');
    expect(svgText.text()).toBe('T');
  });

  it('should apply new width and height if "size" prop is set', () => {
    const wrapper = mountLetterIcon({
      text: 'Test',
      size: 48,
    });

    const svg = wrapper.findByDataTest('ec-letter-icon__svg');
    expect(svg.attributes().width).toBe('48');
    expect(svg.attributes().height).toBe('48');
  });

  it('should use button element and add clickable class if "isClickable" prop is set', () => {
    const wrapper = mountLetterIcon({
      text: 'Test',
      isClickable: true,
    });

    const svgContainer = wrapper.findByDataTest('ec-letter-icon');
    expect(svgContainer.element.tagName).toContain('BUTTON');
    expect(svgContainer.classes()).toContain('ec-letter-icon--clickable');
  });
});
