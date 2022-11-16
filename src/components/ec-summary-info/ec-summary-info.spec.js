import { mount } from '@vue/test-utils';

import EcSummaryInfo from './ec-summary-info.vue';

describe('EcSummaryInfo', () => {
  function mountSummaryInfo(props, mountOpts) {
    return mount(EcSummaryInfo, {
      props: {
        ...props,
      },
      ...mountOpts,
    });
  }

  describe('title', () => {
    it('should render with the given "title" prop', () => {
      const wrapper = mountSummaryInfo({ title: 'Default title' });
      expect(wrapper.findByDataTest('ec-summary-info__title').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not render with not given "title" prop', () => {
      const wrapper = mountSummaryInfo();
      expect(wrapper.findByDataTest('ec-summary-info__title').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('icon', () => {
    it('should render with the given "icon" prop', () => {
      const wrapper = mountSummaryInfo({ iconName: 'simple-sell' });
      expect(wrapper.findByDataTest('ec-summary-info__icon').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not render with the not given "icon" prop', () => {
      const wrapper = mountSummaryInfo();
      expect(wrapper.findByDataTest('ec-summary-info__icon').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('lineItems', () => {
    it('should render with the given "lineItems" prop', () => {
      const wrapper = mountSummaryInfo({
        lineItems: [
          {
            text: 'Some text',
            cssClasses: ['tw-text-gray-4', 'tw-uppercase'],
            iconCssClasses: ['tw-h-16'],
            iconName: 'simple-info',
            tooltipText: 'Some tooltip text',
          },
          {
            text: 'Another text',
          },
        ],
      });
      expect(wrapper.findByDataTest('ec-summary-info__content-lines').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with the not given "lineItems" prop', () => {
      const wrapper = mountSummaryInfo();
      expect(wrapper.findByDataTest('ec-summary-info__content-lines').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slots', () => {
    it('should render with the default slot given', () => {
      const wrapper = mountSummaryInfo({ title: 'The title' }, {
        slots: {
          default: `<div data-test="default-slot">
            <span>
              Some text from a slot
            </span>
          </div>`,
        },
      });
      expect(wrapper.findByDataTest('default-slot').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
