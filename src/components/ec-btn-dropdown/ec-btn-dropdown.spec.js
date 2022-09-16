import { mount } from '@vue/test-utils';

import EcBtnDropdown from './ec-btn-dropdown.vue';

describe('EcBtnDropdown', () => {
  console.log('prova');
  function mountBtnDropdown(props, mountOpts) {
    return mount(EcBtnDropdown, {
      props: {
        buttonText: 'Convert & Pay',
        ...props,
      },
      ...mountOpts,
    });
  }

  const items = [
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
});
