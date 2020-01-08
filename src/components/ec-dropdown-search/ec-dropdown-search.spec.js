import Vue from 'vue';
import { mount, createLocalVue } from '@vue/test-utils';
import EcDropdownSearch from './ec-dropdown-search.vue';

describe('EcDropdownSearch', () => {
  const MockedEcTooltipDirective = {
    bind(el, { value }) {
      if (value.content) {
        el.setAttribute('mocked-tooltip-content', value.content);
        el.setAttribute('mocked-tooltip-placement', value.placement || '');
      }
    },
  };

  function mountDropdownSearch(props, mountOpts) {
    const localVue = createLocalVue();
    localVue.directive('ec-tooltip', MockedEcTooltipDirective);

    return mount(EcDropdownSearch, {
      localVue,
      propsData: { ...props },
      stubs: { EcPopover: true },
      ...mountOpts,
    });
  }

  function mountAsTemplate(template, props, mountOpts) {
    const localVue = createLocalVue();
    localVue.directive('ec-tooltip', MockedEcTooltipDirective);

    const Component = localVue.extend({
      components: { EcDropdownSearch },
      template,
    });

    return mount(Component, {
      localVue,
      propsData: { ...props },
      stubs: { EcPopover: true },
      ...mountOpts,
    });
  }

  const items = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    {
      id: 4, text: 'Item 4', disabled: true, disabledReason: 'Random text',
    },
    { id: 5, text: 'Item 5' },
  ];

  it('should render as expected', () => {
    const wrapper = mountDropdownSearch();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given default slot', () => {
    const wrapper = mountDropdownSearch({}, {
      slots: {
        default: '<a href="#" @click.prevent>Open me</a>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given items slot', () => {
    const wrapper = mountDropdownSearch({
      items,
    }, {
      scopedSlots: {
        items: '<li>Items: <pre>{{ props }}</pre></li>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given item slot', () => {
    const wrapper = mountDropdownSearch({
      items,
    }, {
      scopedSlots: {
        item: `
          <div><strong>{{ props.index }}.</strong>{{ props.item.text }}</div>
        `,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render all given items', () => {
    const wrapper = mountDropdownSearch({ items });
    expect(wrapper.find('.ec-dropdown-search__item-list').element).toMatchSnapshot();
  });

  it('should render the search by default', () => {
    const wrapper = mountDropdownSearch();
    expect(wrapper.find('.ec-dropdown-search__search-area').element).toMatchSnapshot();
  });

  it('should not render the search if isSearchEnabled is set to false', () => {
    const wrapper = mountDropdownSearch({ isSearchEnabled: false });
    expect(wrapper.find('.ec-dropdown-search__search-area').element).toMatchSnapshot();
  });

  it('should use the placeholder for search input if given', () => {
    const wrapper = mountDropdownSearch({ placeholder: 'Random text' });
    expect(wrapper.find('.ec-dropdown-search__search-area').element).toMatchSnapshot();
  });

  it('should use and update the v-model', () => {
    const selectedItem = items[0];
    const changeSpy = jest.fn();

    const wrapper = mountAsTemplate(
      '<ec-dropdown-search v-model="selectedItem" :items="items" @change="changeSpy" />',
      {},
      {
        data() {
          return {
            selectedItem,
            items,
          };
        },
        methods: {
          changeSpy,
        },
      },
    );

    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();
    expect(changeSpy).not.toHaveBeenCalled();
    wrapper.findAll('.ec-dropdown-search__item').wrappers[2].trigger('click');
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(items[2]);
    expect(wrapper.vm.selectedItem).toEqual(items[2]);
  });

  it('should not select disabled item', () => {
    const wrapper = mountDropdownSearch({ items });
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();

    const disabledItem = wrapper.find('.ec-dropdown-search__item--is-disabled');
    expect(disabledItem.exists()).toBe(true);

    disabledItem.trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();
  });

  it('should add a tooltip for any disabled item', () => {
    const wrapper = mountDropdownSearch({ items });

    expect(wrapper.find('.ec-dropdown-search__item-list').element).toMatchSnapshot();

    wrapper.findAll('.ec-dropdown-search__item').wrappers.forEach((itemWrapper) => {
      if (itemWrapper.classes('ec-dropdown-search__item--is-disabled')) {
        expect(itemWrapper.attributes('mocked-tooltip-content')).toBe('Random text');
      } else {
        expect(itemWrapper.attributes('mocked-tooltip-content')).toBeUndefined();
      }
    });
  });

  it('should merge given tooltipOptions and item.tooltip prop', () => {
    const disabledItem = {
      text: 'Random Item',
      disabled: true,
      disabledReason: 'This reason should not be seen because it\'s overridden by tooltip.content.',
    };

    const overriddenItem = {
      ...disabledItem,
      tooltip: {
        content: 'Content overridden by item',
      },
    };

    const defaultWrapper = mountDropdownSearch({ items: [disabledItem] });
    const customizedWrapper = mountDropdownSearch({
      items: [overriddenItem],
      tooltipOptions: {
        placement: 'top',
      },
    });

    expect(defaultWrapper.element).toMatchDiffSnapshot(customizedWrapper.element);
  });

  it('should merge given popoverOptions', () => {
    const defaultWrapper = mountDropdownSearch({});
    const customizedWrapper = mountDropdownSearch({
      popoverOptions: {
        placement: 'top',
        offset: 16,
      },
    });

    expect(defaultWrapper.element).toMatchDiffSnapshot(customizedWrapper.element);
  });

  describe('filtering', () => {
    const itemsToFilter = [
      { text: 'Item ABC' },
      { text: 'Item BCD' },
      { text: 'Item cdf' },
    ];

    function getItemTexts(wrapper) {
      return wrapper.findAll('.ec-dropdown-search__item').wrappers.map(itemWrapper => itemWrapper.text());
    }

    it('should filter items', () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter });
      expect(wrapper.findAll('.ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      wrapper.find('.ec-dropdown-search__search-input').setValue('B');
      expect(getItemTexts(wrapper)).toEqual(['Item ABC', 'Item BCD']);
    });

    it('should filter items using case insensitive', () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter });
      expect(wrapper.findAll('.ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      wrapper.find('.ec-dropdown-search__search-input').setValue('D');
      expect(getItemTexts(wrapper)).toEqual(['Item BCD', 'Item cdf']);
    });

    it('should trim the search text', () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter });
      expect(wrapper.findAll('.ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      wrapper.find('.ec-dropdown-search__search-input').setValue('\t f\n');
      expect(getItemTexts(wrapper)).toEqual(['Item cdf']);
    });

    it('should remove the diacritics', () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter.map(item => ({ text: item.text.replace('C', 'Č') })) });
      expect(wrapper.findAll('.ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      wrapper.find('.ec-dropdown-search__search-input').setValue('č');
      expect(getItemTexts(wrapper)).toEqual(['Item ABČ', 'Item BČD', 'Item cdf']);
    });
  });

  describe('events', () => {
    // .find('stub').trigger('event') does nothing, so we need to emit the event from inside of the stubbed
    // component using .vm.$emit('event');

    it('should propagate show and hide events from popover to the parent', () => {
      const wrapper = mountDropdownSearch();

      wrapper.find('ecpopover-stub').vm.$emit('show');
      expect(wrapper.emitted('open').length).toBe(1);

      wrapper.find('ecpopover-stub').vm.$emit('hide');
      expect(wrapper.emitted('close').length).toBe(1);
    });

    it('should focus the search box after the popover has been opened', async () => {
      const wrapper = mountDropdownSearch({}, {
        attachToDocument: true,
      });

      expect(document.activeElement).toBe(document.body);
      wrapper.find('ecpopover-stub').vm.$emit('show');
      wrapper.find('ecpopover-stub').vm.$emit('apply-show');

      await Vue.nextTick();

      expect(document.activeElement).toBe(wrapper.find('.ec-dropdown-search__search-input').element);

      wrapper.destroy(); // because we attached the wrapper to document
    });
  });
});
