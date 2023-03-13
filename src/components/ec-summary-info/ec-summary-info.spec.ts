import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { IconName } from '../ec-icon/types';
import EcSummaryInfo from './ec-summary-info.vue';
import type { SummaryProps } from './types';

describe('EcSummaryInfo', () => {
  function mountSummaryInfo(props?: Partial<SummaryProps>, mountOpts?: MountingOptions<SummaryProps>) {
    return mount(EcSummaryInfo as any, // eslint-disable-line 
      {
        props: {
          lineItems: [],
          ...props,
        },
        ...mountOpts,
      },
    ) as CVueWrapper;
  }

  describe('icon', () => {
    it('should render with the given "icon" prop', () => {
      const wrapper = mountSummaryInfo({ iconName: IconName.SimpleSell });
      expect(wrapper.findByDataTest('ec-summary-info__main-icon').exists()).toBe(true);
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
            stylePreset: 'label',
            text: 'The label',
          },
          {
            stylePreset: 'text',
            text: 'Some text',
            tooltipText: 'Some tooltip text',
          },
          {
            stylePreset: 'description',
            text: 'Another text',
          },
        ],
      });
      expect(wrapper.findByDataTest('ec-summary-info__content').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with the not given "lineItems" prop', () => {
      const wrapper = mountSummaryInfo();
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-label').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-text').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-text').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-description').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-description').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with default stylePresets', () => {
      const wrapper = mountSummaryInfo({
        lineItems: [
          {
            text: 'label',
          },
          {
            text: 'text',
            tooltipText: 'Some tooltip text',
          },
          {
            text: 'description',
          },
          {
            text: 'some extra text',
          },
        ],
      });

      expect(wrapper.findByDataTest('ec-summary-info__content').element.children[0].children[0]).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-summary-info__content').element.children[1].children[0]).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-summary-info__content').element.children[2].children[0]).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-summary-info__content').element.children[3].children[0]).toMatchSnapshot();
    });

    describe('label', () => {
      describe('when the label is present', () => {
        it('should render the label', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'label',
                text: 'testing the label',
              },
            ],
          });

          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-label').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-label').text()).toBe('testing the label');
        });
      });
    });

    describe('text', () => {
      describe('when the text is present', () => {
        it('should render the text', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'text',
                text: 'testing the text',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-text').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-text').text()).toBe('testing the text');
        });
      });

      describe('when the text has a tooltip', () => {
        it('should render with a tooltip', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'text',
                tooltipText: 'Some tooltip text',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-tooltip-mock').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-tooltip-mock')).toMatchSnapshot();
        });

        it('should render an info icon', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'text',
                tooltipText: 'Some tooltip text',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-text').exists()).toBe(true);
        });
      });
    });

    describe('description', () => {
      describe('when the description is present', () => {
        it('should render the description', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'description',
                text: 'testing the description',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-description').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-content-description').text()).toBe('testing the description');
        });
      });

      describe('when the description has a tooltip', () => {
        it('should render with a tooltip', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'description',
                tooltipText: 'Some tooltip text',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-tooltip-mock').exists()).toBe(true);
          expect(wrapper.findByDataTest('ec-tooltip-mock')).toMatchSnapshot();
        });

        it('should render an info icon', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'description',
                tooltipText: 'Some tooltip text',
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-description').exists()).toBe(true);
        });
      });

      describe('when the description isSensitive', () => {
        it('should render description and tooltip with a sensitive class', () => {
          const wrapper = mountSummaryInfo({
            lineItems: [
              {
                stylePreset: 'description',
                tooltipText: 'Some tooltip text',
                text: 'Some text',
                isSensitive: true,
              },
            ],
          });
          expect(wrapper.findByDataTest('ec-tooltip-mock').classes('my-sensitive-content-test-class')).toBe(true);
          expect(wrapper.findByDataTest('ec-summary-info__content-line-item-icon-description').classes('my-sensitive-content-test-class')).toBe(true);
          expect(wrapper.findByDataTest('ec-tooltip-mock')).toMatchSnapshot();
        });
      });
    });
  });

  describe('slots', () => {
    it('should render with the default slot given', () => {
      const wrapper = mountSummaryInfo({ iconName: IconName.SimpleSell }, {
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
