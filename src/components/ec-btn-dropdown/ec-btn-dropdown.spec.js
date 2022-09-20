import { mount } from '@vue/test-utils';

import EcBtnDropdown from './ec-btn-dropdown.vue';

describe('EcBtnDropdown', () => {
  function mountBtnDropdown(props, mountOpts) {
    return mount(EcBtnDropdown, {
      props: {
        buttonText: 'Convert & Pay',
        ...props,
      },
      ...mountOpts,
    });
  }

  let items = [
    { value: 'Spot', text: 'Spot' },
    { value: 'Convert', text: 'Convert' },
  ];

  it('should render as expected', () => {
    const wrapper = mountBtnDropdown();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with a list of options on the dropdown search', () => {
    const wrapper = mountBtnDropdown({ items });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with both buttons disabled', () => {
    const wrapper = mountBtnDropdown({
      isDisabled: true,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use given list-data-test prop', () => {
    const wrapper = mountBtnDropdown({
      items,
      listDataTest: 'my-test-list',
    });

    expect(wrapper.findByDataTest('my-test-list').element).toMatchSnapshot();
  });

  it('should emit the click event when the user clicks on the primary button', async () => {
    const wrapper = mountBtnDropdown();

    await wrapper.findByDataTest('ec-btn-dropdown__btn').trigger('click');
    expect(wrapper.emitted('click').length).toBe(1);
  });

  it('should emit the change event when the user clicks on an item of the dropdown list', async () => {
    const wrapper = mountBtnDropdown({ items });

    await wrapper.findByDataTest('ec-btn-dropdown__dropdown-btn').trigger('click');
    await wrapper.findAllByDataTest('ec-dropdown-search__item').at(0).trigger('click');

    expect(wrapper.emitted('change').length).toBe(1);
    expect(wrapper.emitted('change')[0]).toEqual([items[0]]);
  });

  it('should render with a ctabtnlink slot given', () => {
    const wrapper = mountBtnDropdown({
      slots: {
        ctabtnlink: `
          <template #ctabtnlink="{buttonText}">
          <router-link
            class="ec-btn__text-link"
            :to="items[0].to"
          >{{ buttonText }}
          </router-link>
        </template>`,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with an item slot given', () => {
    items = [
      {
        href: '/trade/drawdown/',
        value: 'drawdown',
        text: 'Drawdown',
        disabled: false,
      },
    ];

    const wrapper = mountBtnDropdown(
      { items },
      {
        slots: {
          item: `
        <template #item="{ item }">
        <a
          class="ec-btn-dropdown__item-link"
          href="convert-and-pay"
        >Convert & Pay</a>
      </template>`,
        },
      },
    );
    expect(wrapper.element).toMatchSnapshot();
  });
});
