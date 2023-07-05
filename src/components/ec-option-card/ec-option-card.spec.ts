import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { IconName } from '../ec-icon/icon-names';
import EcOptionCard from './ec-option-card.vue';
import type { OptionCardProps } from './types';
import { OptionCardType } from './types';

describe('EcOptionCard', () => {
  function mountEcOptionCard(props?: OptionCardProps, mountOpts?: ComponentMountingOptions<OptionCardProps>): CVueWrapper {
    return mount(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EcOptionCard as any,
      {
        props: {
          title: 'Test Option Card',
          ...props,
        },
        ...mountOpts,
      },
    ) as CVueWrapper;
  }

  it('renders properly with the required title prop', () => {
    const wrapper = mountEcOptionCard();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly when an Icon is passed', () => {
    const wrapper = mountEcOptionCard({
      iconName: IconName.SimpleEye,
      title: 'Test option card with Icon',
    });
    expect(wrapper.findByDataTest('ec-option-card__icon').exists()).toBe(true);
  });

  it('renders properly when an Icon and Title and Caption is passed', () => {
    const wrapper = mountEcOptionCard({
      iconName: IconName.SimpleEye,
      title: 'Test option card with Icon and caption',
      caption: 'Test Caption',
    });
    expect(wrapper.findByDataTest('ec-option-card__icon').exists()).toBe(true);
  });

  it.each([OptionCardType.ACCENT, OptionCardType.DANGER])('should render the Option card with the classes related to the type "%s" when type prop is set', (cardType) => {
    const wrapper = mountEcOptionCard({
      iconName: IconName.SimpleInfo,
      type: cardType,
      title: 'Test title',
      caption: 'Test Caption',
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-option-card').classes(`ec-option-card--${cardType}`)).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__icon').classes(`ec-option-card__icon--${cardType}`)).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes(`ec-option-card__caption--${cardType}`)).toBe(true);
  });

  it('renders the Option Card disabled if the isDisabled prop is set to true', () => {
    const wrapper = mountEcOptionCard({
      isDisabled: true,
      iconName: IconName.SimpleEye,
      title: 'Test option card with Icon and caption',
      caption: 'Test Caption',
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-option-card').classes('ec-option-card--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__icon').classes('ec-option-card__icon--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes('ec-option-card__caption--disabled')).toBe(true);
  });

  it('renders the Option Card disabled and with the classes related to the type "accent" when type prop is set to accent and isDisabled prop is set to true', () => {
    const wrapper = mountEcOptionCard({
      isDisabled: true,
      type: OptionCardType.ACCENT,
      iconName: IconName.SimpleEye,
      title: 'Test option card with Icon and caption',
      caption: 'Test Caption',
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-option-card').classes('ec-option-card--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__icon').classes('ec-option-card__icon--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes('ec-option-card__caption--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card').classes('ec-option-card--accent')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__icon').classes('ec-option-card__icon--accent')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes('ec-option-card__caption--accent')).toBe(true);
  });

  it('renders the Option Card disabled and with the classes related to the type "danger" when type prop is set to accent and isDisabled prop is set to true', () => {
    const wrapper = mountEcOptionCard({
      isDisabled: true,
      type: OptionCardType.DANGER,
      iconName: IconName.SimpleEye,
      title: 'Test option card with Icon and caption',
      caption: 'Test Caption',
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-option-card').classes('ec-option-card--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__icon').classes('ec-option-card__icon--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes('ec-option-card__caption--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card').classes('ec-option-card--danger')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__icon').classes('ec-option-card__icon--danger')).toBe(false);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes('ec-option-card__caption--danger')).toBe(false);
  });
});
