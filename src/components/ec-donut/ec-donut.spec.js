import { mount } from '@vue/test-utils';

import { withMockedConsole } from '../../../tests/utils/console';
import EcDonut from './ec-donut.vue';

describe('EcDonut', () => {
  function mountDonut(props, mountOpts) {
    return mount(EcDonut, {
      props: {
        used: 20,
        amount: 100,
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mount(EcDonut);
      expect(warnSpy).toHaveBeenCalledTimes(2);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "amount"');
      expect(warnSpy.mock.calls[1][0]).toContain('Missing required prop: "used"');
    });
  });

  it('should render with custom attributes', () => {
    const wrapper = mountDonut({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display only with a the used and amount are given', () => {
    const wrapper = mountDonut();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display empty with minus number in the used prop', () => {
    const wrapper = mountDonut({ used: -10, amount: 100 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with the half used', () => {
    const wrapper = mountDonut({ used: 50, amount: 100 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with the empty used', () => {
    const wrapper = mountDonut({ used: 0 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with the full used', () => {
    const wrapper = mountDonut({ used: 100, amount: 100 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with the full used when is more used than amount', () => {
    const wrapper = mountDonut({ used: 120, amount: 100 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slots as expected', () => {
    const wrapper = mountDonut({}, {
      slots: {
        'reminder-legend': '<p>Reminder legend</p>',
        'used-legend': '<p>Used legend</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
