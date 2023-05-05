import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';
import type { RouteLocationNamedRaw } from 'vue-router';

import type { CVueWrapper } from '../../../tests/utils/global';
import { IconName } from '../ec-icon/iconNames';
import EcBtn from './ec-btn.vue';
import type { ButtonProps } from './types';
import { ButtonCategory, ButtonSize } from './types';

describe('EcBtn', () => {
  function mountBtn(props?: ButtonProps, mountOpts?: MountingOptions<ButtonProps>) {
    return mount(EcBtn as any,  // eslint-disable-line
      {
        props,
        ...mountOpts,
      },
    ) as CVueWrapper;
  }

  it('should render a <button> element by default', () => {
    const wrapper = mountBtn({
      category: ButtonCategory.Primary,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it.each([
      ['ec-btn--sm', ButtonSize.Sm],
      ['ec-btn--md', ButtonSize.Md],
    ])('should render a <button> element with class "%s" when size is set to %s', (expectedClass, size) => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        size,
      });

      expect(wrapper.classes(expectedClass)).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render an <a> element when we define the "href" prop', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        href: 'https://ebury.com/',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a router link when we define the "to" prop', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        to: 'trade-finance',
      });

      expect(wrapper.attributes('to')).toBe('trade-finance');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a router link with route object', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        to: {
          name: 'trade-finance',
          toString() { return `Route with name '${this.name as string}'`; },
        } as RouteLocationNamedRaw,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a router link with a custom tag when we define the "tag option"', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        to: 'trade-finance',
        tag: 'ebury',
      }, {
        global: {
          stubs: ['ebury'],
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a disabled button when "isDisabled" is set to true', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        isDisabled: true,
      });

      expect(wrapper.attributes('disabled')).toBe('');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with only an icon when the "icon" is defined but not the slots', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        icon: IconName.SimpleCheck,
      });

      expect(wrapper.classes('ec-btn--icon-only')).toBe(true);
      expect(wrapper.findByDataTest('ec-btn__icon').classes('ec-btn__icon')).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with only a loading spinner when loading is set to true and no slots are passed', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        isLoading: true,
      });

      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a rounded button when the "isRounded" is set to true', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        isRounded: true,
      });

      expect(wrapper.classes('ec-btn--rounded')).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with an outline when "isOutline" is set to true', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        isOutline: true,
      });

      expect(wrapper.classes('ec-btn--outline')).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a full width button when "isFullWidth" prop is set to true', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        isFullWidth: true,
      });

      expect(wrapper.classes('ec-btn--full-width')).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it.each([
      ButtonCategory.Primary,
      ButtonCategory.Secondary,
      ButtonCategory.Success,
      ButtonCategory.Error,
      ButtonCategory.Warning,
    ])('should render a button with category "%s" when category "prop" is set', (category) => {
      const wrapper = mountBtn({
        category,
      });

      expect(wrapper.classes(`ec-btn--${category}`)).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it.each([
      ButtonCategory.Primary,
      ButtonCategory.Secondary,
      ButtonCategory.Success,
      ButtonCategory.Error,
      ButtonCategory.Warning,
    ])('should render a reversed button for the "%s" category when "isReverse" prop is set to true', (category) => {
      const wrapper = mountBtn({
        isReverse: true,
        category,
      });

      expect(wrapper.classes(`ec-btn--${category}-reverse`)).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with a spinner loader if loading is set to true', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        isLoading: true,
      });

      expect(wrapper.attributes('disabled')).toBe('');
      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with type submit if submit is set to true', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        isSubmit: true,
      });

      expect(wrapper.attributes('type')).toBe('submit');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with type button if submit is set to false', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        isSubmit: false,
      });

      expect(wrapper.attributes('type')).toBe('button');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render given HTML attributes', () => {
      const wrapper = mountBtn({
        category: ButtonCategory.Primary,
        formtarget: 'my-form',
        name: 'test-name',
      } as ButtonProps);

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':slots', () => {
    it('should render a button with "Click me!" text', () => {
      const wrapper = mountBtn(
        {
          category: ButtonCategory.Primary,
        },
        {
          slots: {
            default: 'Click Me!',
          },
        },
      );
      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__loading-text').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with "Click me!" text and an icon', () => {
      const wrapper = mountBtn(
        {
          category: ButtonCategory.Primary,
          icon: IconName.SimpleCheck,
        },
        {
          slots: {
            default: 'Click Me!',
          },
        },
      );
      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__loading-text').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__icon').exists()).toBe(true);
      expect(wrapper.findByDataTest('ec-btn__text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with a loading-text and a loading spinner when "isLoading" is set to true and we set the default slot', () => {
      const wrapper = mountBtn(
        {
          category: ButtonCategory.Primary,
          isLoading: true,
        },
        {
          slots: {
            default: 'Click Me!',
          },
        },
      );

      expect(wrapper.attributes('disabled')).toBe('');
      expect(wrapper.findByDataTest('ec-btn__loading-text').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__text').classes('ec-btn__text--is-loading')).toBe(true);
      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a custom loading text instead of a spinner when "text-loader" is set', () => {
      const wrapper = mountBtn(
        {
          category: ButtonCategory.Primary,
          isLoading: true,
        },
        {
          slots: {
            'loading-text': 'Loading...',
          },
        },
      );
      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__text').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__loading-text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':attrs', () => {
    it('should pass custom attributes', () => {
      const wrapper = mountBtn(
        {
          category: ButtonCategory.Primary,
          id: 'my-button',
          'data-test': 'my-custom-button',
        } as ButtonProps,
      );

      expect(wrapper.attributes('id')).toBe('my-button');
      expect(wrapper.attributes('data-test')).toBe('my-custom-button ec-btn');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass a custom event handler', () => {
      const clickSpy = jest.fn();
      const wrapper = mountBtn(
        {
          category: ButtonCategory.Primary,
          onClick: clickSpy,
        } as ButtonProps,
      );

      wrapper.findByDataTest('ec-btn').trigger('click');
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(wrapper?.emitted('click')?.length).toBe(1);
    });
  });
});
