import { mount } from '@vue/test-utils';
import EcDonut from './ec-donut.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcAlert', () => {
  function mountDonut(props, mountOpts) {
    return mount(EcDonut, {
      propsData: {
        used: 20,
        amount: 100,
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcDonut);
      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "amount"');
      expect(errorSpy.mock.calls[1][0]).toContain('Missing required prop: "used"');
    });
  });

  it('should display only with a the used amount and currency are given', () => {
    const wrapper = mountDonut();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with the half used', () => {
    const wrapper = mountDonut({ used: 50 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with the empty used', () => {
    const wrapper = mountDonut({ used: 0 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with the full used', () => {
    const wrapper = mountDonut({ used: 100 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should get the correct computed properties', () => {
    const wrapper = mountDonut();
    const circumference = 2 * Math.PI * wrapper.vm.radius;
    expect(wrapper.vm.percentageUsed).toBe(20);
    const offset = circumference * (1 - wrapper.vm.percentageUsed / 100);
    expect(wrapper.vm.dashArray).toBe(circumference);
    expect(wrapper.vm.offset).toBe(offset);
  });

  it('should render slots as expected', () => {
    const wrapper = mount(
      EcDonut,
      {
        propsData: {
          used: 20,
          amount: 100,
        },
        scopedSlots: {
          'reminder-legend': '<p>Reminder legend</p>',
          'used-legend': '<p>Used legend</p>',
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });
});
