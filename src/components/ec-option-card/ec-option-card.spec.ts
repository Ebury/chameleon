import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { IconName } from '../ec-icon/iconNames';
import EcOptionCard from './ec-option-card.vue';
import type { OptionCardProps } from './types';
import { OptionCardType } from './types';

describe('EcOptionCard', () => {
  function mountEcOptionCard(props?: OptionCardProps, mountOpts?: MountingOptions<OptionCardProps>): CVueWrapper {
    return mount(
      EcOptionCard as any, // eslint-disable-line
      {
        props: {
          optionTitle: 'Test Option Card',
          ...props,
        },
        ...mountOpts,
      },
    ) as CVueWrapper;
  }

  it('renders properly with the required optionTitle prop', () => {
    const wrapper = mountEcOptionCard();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly when an Icon is passed', () => {
    const wrapper = mountEcOptionCard({ optionCardIconName: IconName.SimpleEye, optionTitle: 'Test option card with Icon' });
    expect(wrapper.findByDataTest('ec-option-card__title-img').exists()).toBe(true);
  });

  it('renders properly when an Icon and Title and Caption is passed', () => {
    const wrapper = mountEcOptionCard({ optionCardIconName: IconName.SimpleEye, optionTitle: 'Test option card with Icon and caption', optionCaption: 'Test Caption' });
    expect(wrapper.findByDataTest('ec-option-card__title-img').exists()).toBe(true);
  });

  it.each([OptionCardType.OPTION_CARD_ACCENT, OptionCardType.OPTION_CARD_DANGER])('should render the Option card with the classes related to the type "%s" when optionCardType prop is set', (cardType) => {
    const wrapper = mountEcOptionCard({
      optionCardIconName: IconName.SimpleInfo,
      optionCardType: cardType,
      optionTitle: 'Test title',
      optionCaption: 'Test Caption',
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-option-card').classes(`ec-option-card--${cardType}`)).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__title-img').classes(`ec-option-card__title-img--${cardType}`)).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes(`ec-option-card__caption--${cardType}`)).toBe(true);
  });

  it('renders the Option Card disabled if the isDisabled prop is set to true', () => {
    const wrapper = mountEcOptionCard({
      isDisabled: true, optionCardIconName: IconName.SimpleEye, optionTitle: 'Test option card with Icon and caption', optionCaption: 'Test Caption',
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-option-card').classes('ec-option-card--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__title-img').classes('ec-option-card__title-img--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes('ec-option-card__caption--disabled')).toBe(true);
  });

  it('renders the Option Card as a button', () => {
    const wrapper = mountEcOptionCard();

    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('button');
    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('type="button"');
  });

  it('should emit the click event when the Option card is a button', async () => {
    const wrapper = mountEcOptionCard();

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted('click')?.length).toBe(1);
  });

  it('should emit the click event when the Option card is a Submit button', async () => {
    const wrapper = mountEcOptionCard({ optionTitle: 'Test option card with anchor', isSubmit: true });

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted('submit')?.length).toBe(1);
  });

  it('should emit the click event when the Option card button is disabled', async () => {
    const wrapper = mountEcOptionCard({ isDisabled: true, optionTitle: 'Test title disabled' });

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted('click')?.length).toBe(undefined);
  });

  it('should not emit the click event when the Option card is an href', async () => {
    const wrapper = mountEcOptionCard({ optionTitle: 'Test click with anchor', href: '/test-link' });

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted('click')?.length).toBe(undefined);
  });

  it('should not emit the click event when the Option card is a router link', async () => {
    const wrapper = mountEcOptionCard({ optionTitle: 'Test click with router', to: '/route-test' });

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted('click')?.length).toBe(undefined);
  });

  it('renders the Option Card as a submit button', () => {
    const wrapper = mountEcOptionCard({ optionTitle: 'Test option card with anchor', isSubmit: true });

    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('button');
    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('type="submit"');
  });

  it('renders the Option Card as an anchor', () => {
    const wrapper = mountEcOptionCard({ optionTitle: 'Test option card with anchor', href: '/test-link' });

    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('href="/test-link"');
    expect(wrapper.findByDataTest('ec-option-card').html()).not.toContain('type="button"');
  });

  it('renders the Option Card as with a router link', () => {
    const wrapper = mountEcOptionCard({ optionTitle: 'Test option card with router link', to: 'test-route' });

    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('router-link');
    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('to="test-route"');
    expect(wrapper.findByDataTest('ec-option-card').html()).not.toContain('type="button"');
  });
});
