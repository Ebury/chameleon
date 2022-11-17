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

  describe('icon', () => {
    it('should render with the given "icon" prop', () => {
      const wrapper = mountSummaryInfo({ iconName: 'simple-sell' });
      expect(wrapper.findByDataTest('ec-summary-info__main-icon').exists()).toBe(true);
      expect(wrapper.findByDataTest('ec-summary-info__main-icon__simple-sell').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not render with the not given "icon" prop', () => {
      const wrapper = mountSummaryInfo();
      expect(wrapper.findByDataTest('ec-summary-info__main-icon').exists()).toBe(false);
    });
  });

  describe('lineItems', () => {
    it('should render with the given "lineItems" prop', () => {
      const wrapper = mountSummaryInfo({
        lineItems: [
          {
            stylePreset: 'title',
            text: 'The title',
          },
          {
            stylePreset: 'description',
            text: 'Some text',
            iconName: 'simple-info',
            tooltipText: 'Some tooltip text',
          },
          {
            stylePreset: 'help',
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
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-title').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-description').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-description').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-help').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-help').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    describe('title', () => {
      describe('when the title is present', () => {
        it('should render the title', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'title',
                text: 'testing the title',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-title').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-title').text()).toBe('testing the title');
        });
      });
    });

    describe('description', () => {
      describe('when the description text is present', () => {
        it('should render the description text', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'description',
                text: 'testing the description',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-description').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-description').text()).toBe('testing the description');
        });
      });

      describe('when the description icon is present', () => {
        it('should render the description icon', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'description',
                iconName: 'simple-info',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-description').exists()).toBe(true);
        });
      });

      describe('when the tooltip is present on the icon', () => {
        it('should render with the tooltip', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'description',
                iconName: 'simple-info',
                tooltipText: 'Some tooltip text',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-tooltip-mock').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-tooltip-mock')).toMatchSnapshot();
        });
      });
    });

    describe('help', () => {
      describe('when the help text is present', () => {
        it('should render the help text', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'help',
                text: 'testing the help text',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-help').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-text-help').text()).toBe('testing the help text');
        });
      });

      describe('when the help icon is present', () => {
        it('should render the help icon', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'help',
                iconName: 'simple-info',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-help').exists()).toBe(true);
        });
      });

      describe('when the tooltip is present on the icon', () => {
        it('should render with the tooltip', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'help',
                iconName: 'simple-info',
                tooltipText: 'Some tooltip text',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-tooltip-mock').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-tooltip-mock')).toMatchSnapshot();
        });
      });
    });
  });

  describe('slots', () => {
    it('should render with the default slot given', () => {
      const wrapper = mountSummaryInfo({ iconName: 'simple-sell' }, {
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
