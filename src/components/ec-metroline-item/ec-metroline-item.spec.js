import { mount } from '@vue/test-utils';
import { withMockedConsole } from '../../../tests/utils/console';
import EcMetrolineItem from './ec-metroline-item.vue';
import * as STATUS from '../../enums/metroline-status';

function mountEcMetrolineItem(props, mountOpts) {
  return mount(EcMetrolineItem, {
    propsData: {
      itemIndex: '1',
      ...props,
    },
    ...mountOpts,
  });
}

const slots = {
  heading: '<span>Payee information</span>',
  'sub-heading': '<span>Amount fully allocated</span>',
  'header-cta': '<a href="#>Edit</a>',
  main: '<p> Lorem ipsum dolor sit amet, voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! </p>',
  'footer-cta': '<a href="#>Continue</a>',
};

describe('EcMetrolineItem', () => {
  it('should throw an error when we pass a non valid status', () => {
    withMockedConsole((errorSpy) => {
      mountEcMetrolineItem({ status: 'a non valid status' });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "status"');
    });
  });
  it('it should render properly when status is "next"', () => {
    const wrapper = mountEcMetrolineItem(
      {
        status: STATUS.NEXT,
      },
      {
        slots,
      },
    );
    expect(wrapper.findByDataTest('ec-metroline-item__status-disk-enumeration').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__status-disk-completed').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-metroline-item__header-heading').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__header-sub-heading').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-metroline-item__status-bar').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__header-cta').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-metroline-item__main').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-metroline-item__footer').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly when status is "active"', () => {
    const wrapper = mountEcMetrolineItem(
      {
        status: STATUS.ACTIVE,
      },
      {
        slots,
      },
    );

    expect(wrapper.findByDataTest('ec-metroline-item__status-disk-enumeration').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__status-disk-completed').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-metroline-item__header-heading').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__header-sub-heading').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-metroline-item__status-bar').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__header-cta').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-metroline-item__main').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__footer').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should properly when status is "completed"', () => {
    const wrapper = mountEcMetrolineItem(
      {
        status: STATUS.COMPLETED,
      },
      {
        slots,
      },
    );

    expect(wrapper.findByDataTest('ec-metroline-item__status-disk-enumeration').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-metroline-item__status-disk-completed').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__header-heading').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__header-sub-heading').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__status-bar').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__header-cta').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__main').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-metroline-item__footer').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each([STATUS.NEXT, STATUS.ACTIVE, STATUS.COMPLETED])('should render properly when is the last item and status is "%s"', (status) => {
    const wrapper = mountEcMetrolineItem(
      {
        status,
        isLastItem: true,
      },
      {
        slots,
      },
    );

    expect(wrapper.findByDataTest('ec-metroline-item__status-bar').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });
});
