import { mount, createLocalVue } from '@vue/test-utils';
import EcBtnDropdown from './ec-btn-dropdown.vue';

describe('EcBtnDropdown', () => {
  function mountBtnDropdown(props, mountOpts) {
    const localVue = createLocalVue();

    return mount(EcBtnDropdown, {
      localVue,
      propsData: {
        textButton: 'Convert & Pay',
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
    const wrapper = mountBtnDropdown({
      itemsDropdown: items,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with both buttons disabled', () => {
    const wrapper = mountBtnDropdown({
      isDisabled: true,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit the click event when the user clicks on the primary button', async () => {
    const wrapper = mountBtnDropdown();

    await wrapper.findByDataTest('ec-btn-dropdown__btn').trigger('click');
    expect(wrapper.emitted('click').length).toBe(1);
  });

  it('should emit the change event when the user clicks on an item of the dropdown list', async () => {
    const wrapper = mountBtnDropdown({
      itemsDropdown: items,
    });

    wrapper.findByDataTest('ec-btn-dropdown__dropdown-btn').trigger('click');
    wrapper.findAllByDataTest('ec-dropdown-search__item').at(0).trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('change').length).toBe(1);
    expect(wrapper.emitted('change')[0]).toEqual([items[0]]);
  });
});
