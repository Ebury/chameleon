import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { IconName } from '../ec-icon/iconNames';
import EcOptionCard from './ec-option-card.vue';
import type { OptionCardProps } from './types';
import { OptionCardEvent, OptionCardType } from './types';

describe('EcOptionCard', () => {
  function mountEcOptionCard(props?: OptionCardProps, mountOpts?: MountingOptions<OptionCardProps>): CVueWrapper {
    return mount(
      EcOptionCard as any, // eslint-disable-line
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

  it('renders the Option Card as a button (default)', () => {
    const wrapper = mountEcOptionCard();

    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('button');
    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('type="button"');
  });

  it('renders the Option Card as an anchor when the href prop is passed', () => {
    const wrapper = mountEcOptionCard({ title: 'Test option card with anchor', href: '/test-link' });

    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('href="/test-link"');
    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('a');
    expect(wrapper.findByDataTest('ec-option-card').html()).not.toContain('type="button"');
  });

  it('renders the Option Card as with a router link when the to prop is passed', () => {
    const wrapper = mountEcOptionCard({ title: 'Test option card with router link', to: 'test-route' });

    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('router-link');
    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('to="test-route"');
    expect(wrapper.findByDataTest('ec-option-card').html()).not.toContain('type="button"');
  });

  it('renders the Option Card as with a router link when the to prop is passed with named route', () => {
    const wrapper = mountEcOptionCard({ title: 'Test option card with router link', to: { name: 'named-route' } });

    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('router-link');
    expect(wrapper.findByDataTest('ec-option-card').html()).toContain('to="[object Object]"');
    expect(wrapper.findByDataTest('ec-option-card').html()).not.toContain('type="button"');
  });

  it('renders properly when an Icon is passed', () => {
    const wrapper = mountEcOptionCard({ iconName: IconName.SimpleEye, title: 'Test option card with Icon' });
    expect(wrapper.findByDataTest('ec-option-card__icon').exists()).toBe(true);
  });

  it('renders properly when an Icon and Title and Caption is passed', () => {
    const wrapper = mountEcOptionCard({ iconName: IconName.SimpleEye, title: 'Test option card with Icon and caption', caption: 'Test Caption' });
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
      isDisabled: true, iconName: IconName.SimpleEye, title: 'Test option card with Icon and caption', caption: 'Test Caption',
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-option-card').classes('ec-option-card--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__icon').classes('ec-option-card__icon--disabled')).toBe(true);
    expect(wrapper.findByDataTest('ec-option-card__caption').classes('ec-option-card__caption--disabled')).toBe(true);
  });

  it('renders the Option Card disabled (button) if the isDisabled prop is set to true', () => {
    const wrapper = mountEcOptionCard({
      isDisabled: true, iconName: IconName.SimpleEye, title: 'Test title', caption: 'Test Caption',
    });

    expect(wrapper.findByDataTest('ec-option-card').attributes('disabled')).toBeDefined();
  });

  it('The Option Card button should be rendered with the disabled attribute undefined', () => {
    const wrapper = mountEcOptionCard({
      isDisabled: false, iconName: IconName.SimpleEye, title: 'Test title', caption: 'Test Caption',
    });

    expect(wrapper.findByDataTest('ec-option-card').attributes('disabled')).toBeUndefined();
  });

  it('should emit the click event when the Option card is a button', async () => {
    const wrapper = mountEcOptionCard();

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted(OptionCardEvent.CLICK)?.length).toBe(1);
  });

  it('should not emit the click event when the Option card button is disabled', async () => {
    const wrapper = mountEcOptionCard({ isDisabled: true, title: 'Test title disabled' });

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted(OptionCardEvent.CLICK)?.length).toBe(undefined);
  });

  it('should not emit the click event when the Option card is an href', async () => {
    const wrapper = mountEcOptionCard({ title: 'Test click with anchor', href: '/test-link' });

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted(OptionCardEvent.CLICK)?.length).toBe(undefined);
  });

  it('should not emit the click event when the Option card is a router link', async () => {
    const wrapper = mountEcOptionCard({ title: 'Test click with router', to: 'route-test' });

    await wrapper.findByDataTest('ec-option-card').trigger('click');
    expect(wrapper.emitted(OptionCardEvent.CLICK)?.length).toBe(undefined);
  });
});
