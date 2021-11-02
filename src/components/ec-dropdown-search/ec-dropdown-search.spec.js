import { enableAutoDestroy, mount, createLocalVue } from '@vue/test-utils';
import EcDropdownSearch from './ec-dropdown-search.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcDropdownSearch', () => {
  function mountDropdownSearch(props, mountOpts) {
    return mount(EcDropdownSearch, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  function mountAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcDropdownSearch },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      localVue,
      propsData: { ...props },
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

  enableAutoDestroy(afterEach);

  it('should render as expected', () => {
    const wrapper = mountDropdownSearch();
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each([
    ['modal', false],
    ['tooltip', false],
    ['notification', false],
    ['level-1', false],
    ['level-2', false],
    ['level-3', false],
    ['random', true],
  ])('should validate if the level prop("%s") is on the allowed array of strings', (str, error) => {
    if (error) {
      withMockedConsole((errorSpy) => {
        mountDropdownSearch({ items, level: str });
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "level"');
      });
    } else {
      const wrapper = mountDropdownSearch({ items, level: str });
      expect(wrapper.findByDataTest('ec-popover-dropdown-search').attributes('level')).toBe(str);
    }
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

  it('should pass information whether an item is selected to the item slot', () => {
    const wrapper = mountDropdownSearch({
      items,
      selected: items[2],
    }, {
      scopedSlots: {
        item: `
          <div>{{ props.index }} - {{ props.selected }}</div>
        `,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given cta slot', () => {
    const wrapper = mountDropdownSearch({
      items,
    }, {
      scopedSlots: {
        cta: '<button>My CTA</button>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given cta slot with a tooltip', () => {
    const wrapper = mountDropdownSearch({
      items,
      tooltipCta: 'Random tooltip',
    }, {
      scopedSlots: {
        cta: '<button>My CTA</button>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render all given items', () => {
    const wrapper = mountDropdownSearch({ items });
    expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element).toMatchSnapshot();
  });

  it('should render the search by default', () => {
    const wrapper = mountDropdownSearch();
    expect(wrapper.findByDataTest('ec-dropdown-search__search-area').element).toMatchSnapshot();
  });

  it('should not show the items when the loading is set to true', () => {
    const wrapper = mountDropdownSearch({ items, isLoading: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render the search if isSearchEnabled is set to false', () => {
    const wrapper = mountDropdownSearch({ isSearchEnabled: false });
    expect(wrapper.findByDataTest('ec-dropdown-search__search-area').element).toMatchSnapshot();
  });

  it('should use the placeholder for search input if given', () => {
    const wrapper = mountDropdownSearch({ placeholder: 'Random text' });
    expect(wrapper.findByDataTest('ec-dropdown-search__search-area').element).toMatchSnapshot();
  });

  it('should disable the popover when disabled is set', () => {
    const wrapper = mountDropdownSearch({ disabled: true });
    expect(wrapper.findByDataTest('ec-popover-stub').element).toMatchSnapshot();
  });

  it('should use and update the v-model', async () => {
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
    await wrapper.findAllByDataTest('ec-dropdown-search__item').wrappers[2].trigger('click');
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(items[2]);
    expect(wrapper.vm.selectedItem).toEqual(items[2]);
  });

  it('should not select disabled item', async () => {
    const wrapper = mountDropdownSearch({ items });
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();

    const disabledItem = wrapper.find('.ec-dropdown-search__item--is-disabled');
    expect(disabledItem.exists()).toBe(true);

    await disabledItem.trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();
  });

  it('should add a tooltip for any disabled item', () => {
    const wrapper = mountDropdownSearch({ items });

    expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element).toMatchSnapshot();

    expect(wrapper.findByDataTest('ec-dropdown-search__item--0').attributes('data-ec-tooltip-mock-content')).toBeUndefined();
    expect(wrapper.findByDataTest('ec-dropdown-search__item--1').attributes('data-ec-tooltip-mock-content')).toBeUndefined();
    expect(wrapper.findByDataTest('ec-dropdown-search__item--2').attributes('data-ec-tooltip-mock-content')).toBeUndefined();
    expect(wrapper.findByDataTest('ec-dropdown-search__item--3').attributes('data-ec-tooltip-mock-content')).toBe('Random text');
    expect(wrapper.findByDataTest('ec-dropdown-search__item--4').attributes('data-ec-tooltip-mock-content')).toBeUndefined();
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

  it('should use given list-data-test attribute', () => {
    const wrapper = mountDropdownSearch({ items }, {
      attrs: {
        'list-data-test': 'my-test-list',
      },
    });
    expect(wrapper.findByDataTest('my-test-list').element).toMatchSnapshot();
  });

  describe('filtering', () => {
    const itemsToFilter = [
      { text: 'Item ABC' },
      { text: 'Item BCD' },
      { text: 'Item cdf' },
    ];

    function getItemTexts(wrapper) {
      return wrapper.findAllByDataTest('ec-dropdown-search__item').wrappers.map(itemWrapper => itemWrapper.text());
    }

    it('should filter items', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('B');
      expect(getItemTexts(wrapper)).toEqual(['Item ABC', 'Item BCD']);
    });

    it('should filter items using case insensitive', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('D');
      expect(getItemTexts(wrapper)).toEqual(['Item BCD', 'Item cdf']);
    });

    it('should trim the search text', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('\t f\n');
      expect(getItemTexts(wrapper)).toEqual(['Item cdf']);
    });

    it('should remove the diacritics', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter.map(item => ({ text: item.text.replace('C', 'Č') })) });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('č');
      expect(getItemTexts(wrapper)).toEqual(['Item ABČ', 'Item BČD', 'Item cdf']);
    });

    it('should display no results message if no item matches', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('dkasldklsakdlsakdlas');
      expect(getItemTexts(wrapper)).toEqual([]);
      expect(wrapper.findByDataTest('ec-dropdown-search__no-items').element).toMatchSnapshot();
    });

    it('should display custom no results message if no item matches', () => {
      const wrapper = mountDropdownSearch({ items: [], noResultsText: 'No custom items have been found' });
      expect(wrapper.findByDataTest('ec-dropdown-search__no-items').element).toMatchSnapshot();
    });

    it('should display custom no results slot if no item matches', () => {
      const wrapper = mountDropdownSearch({
        items: [],
        noResultsText: 'No custom items have been found',
      }, {
        scopedSlots: {
          empty: '<li class="my-slot"><div>Random message - {{ props.noResultsText }}</div></li>',
        },
      });
      expect(wrapper.find('.my-slot').element).toMatchSnapshot();
    });

    it('should not display the filter items if the isLoading prop is set to true', () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter, isLoading: true });
      expect(wrapper.findAll('.ec-dropdown-search__item').length).toBe(0);

      wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('B');
      expect(wrapper.findAll('.ec-dropdown-search__item').length).toBe(0);
    });
  });

  describe('events', () => {
    // .findByDataTest('stub').trigger('event') does nothing, so we need to emit the event from inside of the stubbed
    // component using .vm.$emit('event');

    it('should propagate show and hide events from popover to the parent', () => {
      const wrapper = mountDropdownSearch();

      wrapper.findByDataTest('ec-popover-stub').vm.$emit('show');
      expect(wrapper.emitted('open').length).toBe(1);

      wrapper.findByDataTest('ec-popover-stub').vm.$emit('apply-show');
      expect(wrapper.emitted('after-open').length).toBe(1);

      wrapper.findByDataTest('ec-popover-stub').vm.$emit('hide');
      expect(wrapper.emitted('close').length).toBe(1);
    });

    it('should focus the search box after the popover has been opened', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({}, {
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await wrapper.findByDataTest('ec-popover-stub').vm.$emit('show');
      await wrapper.findByDataTest('ec-popover-stub').vm.$emit('apply-show');

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);
    });

    it('should hide the popover after item has been selected', async () => {
      const wrapper = mountDropdownSearch({ items });
      wrapper.findByDataTest('ec-popover-stub').vm.$emit('show');
      await wrapper.findAllByDataTest('ec-dropdown-search__item').wrappers[1].trigger('click');

      expect(wrapper.emitted('close').length).toBe(1);
    });
  });
});
