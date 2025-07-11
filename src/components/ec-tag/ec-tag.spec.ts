import { mount } from '@vue/test-utils';

import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcTag from './ec-tag.vue';
import type { TagProps } from './types';

describe('EcTag', () => {
  function mountTag(props?: TagProps) {
    return mount(
      EcTag,
      {
        props,
      },
    );
  }

  describe(':props', () => {
    it('should render as expected when passing the text prop', () => {
      const wrapper = mountTag({
        text: 'Trusted',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as expected when passing the icon name', () => {
      const wrapper = mountTag({
        text: 'Trusted',
        iconName: IconName.ROUNDED_CHECK,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as expected when passing the icon type', () => {
      const wrapper = mountTag({
        text: 'Trusted',
        iconName: IconName.ROUNDED_CHECK,
        iconType: IconType.SUCCESS,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as expected when we set "is-icon-rounded" to be true', () => {
      const wrapper = mountTag({
        text: 'Trusted',
        iconName: IconName.CURRENCY_AED,
        isIconRounded: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('should render with a tooltip and use text as content', () => {
    const text = 'Trusted';

    const wrapper = mountTag({
      text,
    });

    expect(wrapper.findByDataTest('ec-tag').attributes('data-ec-tooltip-mock-content')).toBe(text);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with a tooltip that has a different content', () => {
    const text = 'Trusted';
    const tooltipContent = 'Tooltip text';

    const wrapper = mountTag({
      text,
      tooltipOptions: { content: tooltipContent },
    });

    expect(wrapper.findByDataTest('ec-tag').attributes('data-ec-tooltip-mock-content')).toBe(tooltipContent);
    expect(wrapper.element).toMatchSnapshot();
  });
});
