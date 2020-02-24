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

  describe(':props', () => {
    it('should render a <button> element by default', () => {
      const wrapper = mountBtn();

      expect(wrapper.find('.ec-btn').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a <button> element with class ".ec-btn--sm" when size is set to "sm"', () => {
      const wrapper = mountBtn({
        size: 'sm',
      });

      expect(wrapper.find('.ec-btn--md').exists()).toBe(false);
      expect(wrapper.find('.ec-btn--sm').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a <button> element with class ".ec-btn--md" when size is set to "md"', () => {
      const wrapper = mountBtn({
        size: 'md',
      });

      expect(wrapper.find('.ec-btn--sm').exists()).toBe(false);
      expect(wrapper.find('.ec-btn--md').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render an <a> element when we define the "href" prop', () => {
      const wrapper = mountBtn({
        href: 'https://ebury.com/',
      });

      expect(wrapper.attributes().href).toBe('https://ebury.com/');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a router link when we define the "to" prop', () => {
      const wrapper = mountBtn({
        to: 'trade-finance',
      },
      {
        stubs: ['router-link'],
      });

      expect(wrapper.attributes().to).toBe('trade-finance');
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

    it('should render a disabled button when disabled is set to true', () => {
      const wrapper = mountBtn({
        disabled: true,
      });

      expect(wrapper.attributes().disabled).toBe('disabled');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with an icon when the icon prop is defined', () => {
      const wrapper = mountBtn({
        icon: 'simple-check',
      });

      expect(wrapper.find('.ec-btn__icon').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with an outline when "outline" prop is set to true', () => {
      const wrapper = mountBtn({
        outline: true,
      });

      expect(wrapper.find('.ec-btn--outline').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a full width button when "fullWidth" prop is set to true', () => {
      const wrapper = mountBtn({
        fullWidth: true,
      });

      expect(wrapper.find('.ec-btn--full-width').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it.each(['primary', 'secondary', 'success', 'error', 'warning'])('should render a button with type "%s" when type prop is set', (type) => {
      const wrapper = mountBtn({
        type,
      });

      expect(wrapper.find(`.ec-btn--${type}`).exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a reverse button when reverse is set to true', () => {
      const wrapper = mountBtn({
        reverse: true,
      });

      expect(wrapper.find('.ec-btn--reverse').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with a spinner loader if loading is set to true', () => {
      const wrapper = mountBtn({
        loading: true,
      });

      expect(wrapper.attributes().disabled).toBe('disabled');
      expect(wrapper.find('.ec-btn__spinner').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a button with type submit if submit is set to true', () => {
      const wrapper = mountBtn({
        submit: true,
      });

      expect(wrapper.attributes().type).toBe('submit');
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
      expect(wrapper.find('.ec-btn__spinner').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__text-loader-slot').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__default-slot').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a loading button with a spinner loader and a "Click me!" text set to invisble', () => {
      const wrapper = mountBtn(
        {
          loading: true,
        },
        {
          slots: {
            default: 'Click Me!',
          },
        },
      );

      expect(wrapper.attributes().disabled).toBe('disabled');
      expect(wrapper.findByDataTest('ec-btn__text-loader-slot').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__default-slot').classes('ec-btn__content-invisible')).toBe(true);
      expect(wrapper.find('.ec-btn__spinner').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a custom loading text instead of a spinner when "text-loader" is set', () => {
      const wrapper = mountBtn(
        { loading: true },
        {
          slots: {
            'text-loader': 'Loading...',
          },
        },
      );
      expect(wrapper.find('.ec-btn__spinner').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__default-slot').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-btn__text-loader-slot').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
