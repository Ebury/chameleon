import { mount } from '@vue/test-utils';

import { EcTooltipDirectiveMock } from '../../../tests/mocks/ec-tooltip.mock';
import type { CVueWrapper } from '../../../tests/utils/global';
import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcTag from './ec-tag.vue';
import type { TagProps } from './types';

describe('EcTag', () => {
  function mountTag(props?: TagProps) {
    return mount(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EcTag as any,
      {
        props,
        global: {
          mocks: {
            vEcTooltip: EcTooltipDirectiveMock,
          },
        },
      },
    ) as CVueWrapper;
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
        iconName: IconName.RoundedCheck,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as expected when passing the icon type', () => {
      const wrapper = mountTag({
        text: 'Trusted',
        iconName: IconName.RoundedCheck,
        iconType: IconType.SUCCESS,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as expected when we set "is-icon-rounded" to be true', () => {
      const wrapper = mountTag({
        text: 'Trusted',
        iconName: IconName.CurrencyAed,
        isIconRounded: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('should render with a tooltip', () => {
    const text = 'Trusted';

    const wrapper = mountTag({
      text,
    });

    expect(wrapper.findByDataTest('ec-tag').attributes('data-ec-tooltip-mock-content')).toBe(text);
    expect(wrapper.element).toMatchSnapshot();
  });
});
