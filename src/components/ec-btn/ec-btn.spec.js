import { mount, createLocalVue } from '@vue/test-utils';
import EcBtn from './ec-btn.vue';

describe('EcBtn', () => {
  function mountBtn(props, mountOpts) {
    const localVue = createLocalVue();

    return mount(EcBtn, {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it('should render a <button> element by default', () => {
    const wrapper = mountBtn();

    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it.each([
      ['ec-btn--sm', 'sm'],
      ['ec-btn--md', 'md'],
    ])('should render a <button> element with class "%s" when size is set to %s', (expectedClass, size) => {
      const wrapper = mountBtn({
        size,
      });

      expect(wrapper.classes(expectedClass)).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render an <a> element when we define the "href" prop', () => {
      const wrapper = mountBtn({
        href: 'https://ebury.com/',
      });

      expect(wrapper.is('a')).toBe(true);
      expect(wrapper.attributes('href')).toBe('https://ebury.com/');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a router link when we define the "to" prop', () => {
      const wrapper = mountBtn({
        to: 'trade-finance',
      },
      {
        stubs: ['router-link'],
      });

      expect(wrapper.attributes('to')).toBe('trade-finance');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a router link with a custom tag when we define the "tag option"', () => {
      const wrapper = mountBtn({
        to: 'trade-finance',
        tag: 'ebury',
      },
      {
        stubs: ['ebury'],
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a disabled button when "isDisabled" is set to true', () => {
      const wrapper = mountBtn({
        isDisabled: true,
      });

      expect(wrapper.attributes('disabled')).toBe('disabled');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with only an icon when the "icon" is defined but not the slots', () => {
      const wrapper = mountBtn({
        icon: 'simple-check',
      });

      expect(wrapper.classes('ec-btn--icon-only')).toBe(true);
      expect(wrapper.findByDataTest('ec-btn__icon').classes('ec-btn__icon')).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with only a loading spinner when loading is set to true and no slots are passed', () => {
      const wrapper = mountBtn({
        isLoading: true,
      });

      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a rounded button when the "isRounded" is set to true', () => {
      const wrapper = mountBtn({
        isRounded: true,
      });

      expect(wrapper.classes('ec-btn--rounded')).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with an outline when "isOutline" is set to true', () => {
      const wrapper = mountBtn({
        isOutline: true,
      });

      expect(wrapper.classes('ec-btn--outline')).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a full width button when "isFullWidth" prop is set to true', () => {
      const wrapper = mountBtn({
        isFullWidth: true,
      });

      expect(wrapper.classes('ec-btn--full-width')).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it.each(['primary', 'secondary', 'success', 'error', 'warning'])('should render a button with category "%s" when category "prop" is set', (category) => {
      const wrapper = mountBtn({
        category,
      });

      expect(wrapper.classes(`ec-btn--${category}`)).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it.each(['primary', 'secondary', 'success', 'error', 'warning'])('should render a reversed button for the "%s" category when "isReverse" prop is set to true', (category) => {
      const wrapper = mountBtn({
        isReverse: true,
        category,
      });

      expect(wrapper.classes(`ec-btn--${category}-reverse`)).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with a spinner loader if loading is set to true', () => {
      const wrapper = mountBtn({
        isLoading: true,
      });

      expect(wrapper.attributes('disabled')).toBe('disabled');
      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with type submit if submit is set to true', () => {
      const wrapper = mountBtn({
        submit: true,
      });

      expect(wrapper.attributes('type')).toBe('submit');
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':slots', () => {
    it('should render a button with "Click me!" text', () => {
      const wrapper = mountBtn(
        {},
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
          icon: 'simple-check',
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
          isLoading: true,
        },
        {
          slots: {
            default: 'Click Me!',
          },
        },
      );

      expect(wrapper.attributes('disabled')).toBe('disabled');
      expect(wrapper.findByDataTest('ec-btn__loading-text').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__text').classes('ec-btn__text-is-loading')).toBe(true);
      expect(wrapper.findByDataTest('ec-btn__loading-spinner').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a custom loading text instead of a spinner when "text-loader" is set', () => {
      const wrapper = mountBtn(
        { isLoading: true },
        {
          slots: {
            'loading-text': 'Loading...',
          },
        },
      );
      expect(wrapper.find('.ec-btn__loading-spinner').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__text').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__loading-text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
