import { type ComponentMountingOptions, mount, VueWrapper } from '@vue/test-utils';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { vi } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import type { ComponentExposed } from 'vue-component-type-helpers';

import { TooltipPlacement } from '../../main';
import { PopoverPlacement } from '../ec-popover/types';
import EcDropdownSearch from './ec-dropdown-search.vue';
import type { DropdownSearchItem, DropdownSearchProps } from './types';

type EcDropdownSearchExposed = ComponentExposed<typeof EcDropdownSearch>;

describe('EcDropdownSearch', () => {
  function mountDropdownSearch<TValue = string, TDropdownSearchItem extends DropdownSearchItem<TValue> = DropdownSearchItem<TValue>>(props?: DropdownSearchProps<TValue, TDropdownSearchItem>, mountOpts?: ComponentMountingOptions<EcDropdownSearchExposed>) {
    return mount<EcDropdownSearchExposed>(EcDropdownSearch, {
      props,
      ...mountOpts,
    });
  }

  const items: DropdownSearchItem<never>[] = [
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

  it('should render given custom attributes', () => {
    const wrapper = mountDropdownSearch({}, {
      attrs: {
        'data-test': 'my-data-test',
        id: 'my-id',
        class: 'my-custom-class',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render sensitive class', () => {
    const wrapper = mountDropdownSearch({ isSensitive: true });
    expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element).toMatchSnapshot();
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
      slots: {
        items: (props: DropdownSearchItem<never>[]) => h('li', ['Items: ', h('pre', JSON.stringify(props, null, 2))]),
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given item slot', () => {
    const wrapper = mountDropdownSearch({
      items,
    }, {
      slots: {
        item: ({ index, item }: { index: number, item: DropdownSearchItem<never> }) => h('div', [h('strong', `${index}.`), `${item.text}`]),
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should pass information whether an item is selected to the item slot', () => {
    const wrapper = mountDropdownSearch({
      items,
      modelValue: items[2],
    }, {
      slots: {
        item: ({ index, isSelected }: { index: number, isSelected: boolean }) => h('div', `${index} - ${isSelected}`),
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given cta slot', () => {
    const wrapper = mountDropdownSearch({
      items,
    }, {
      slots: {
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
      slots: {
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
    const wrapper = mountDropdownSearch({ });
    expect(wrapper.findByDataTest('ec-dropdown-search__search-area').element).toMatchSnapshot();
  });

  it('should not show the items when the loading is set to true', () => {
    const wrapper = mountDropdownSearch({ items, isLoading: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render the search if isSearchEnabled is set to false', () => {
    const wrapper = mountDropdownSearch({ isSearchEnabled: false });
    expect(wrapper.findByDataTest('ec-dropdown-search__search-area').exists()).toBe(false);
  });

  it('should use the placeholder for search input if given', () => {
    const wrapper = mountDropdownSearch({ placeholder: 'Random text' });
    expect(wrapper.findByDataTest('ec-dropdown-search__search-area').element).toMatchSnapshot();
  });

  it('should disable the popover when disabled is set', () => {
    const wrapper = mountDropdownSearch({ disabled: true });
    expect(wrapper.findByDataTest('ec-popover-stub').element).toMatchSnapshot();
  });

  it('should render given popover style', () => {
    const wrapper = mountDropdownSearch({ popoverStyle: { width: '1234px' } });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given popover style when it is a function', () => {
    const wrapper = mountDropdownSearch({ popoverStyle: () => ({ width: '1234px' }) });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use and update the v-model', async () => {
    const selectedItem = items[0];
    const changeSpy = vi.fn();

    const Component = defineComponent({
      components: { EcDropdownSearch },
      setup() {
        return {
          changeSpy,
          items,
          selectedItem: ref(selectedItem),
        };
      },
      template: '<ec-dropdown-search v-model="selectedItem" :items="items" @change="changeSpy" />',
    });

    const wrapper = mount(Component);
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();
    expect(changeSpy).not.toHaveBeenCalled();
    await wrapper.findAllByDataTest('ec-dropdown-search__item')[2].trigger('click');
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').element).toMatchSnapshot();
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(items[2]);
    expect(wrapper.vm.selectedItem).toEqual(items[2]);
  });

  it('should not select disabled item', async () => {
    const wrapper = mountDropdownSearch({ items });
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBe(false);

    const disabledItem = wrapper.find('.ec-dropdown-search__item--is-disabled');
    expect(disabledItem.exists()).toBe(true);

    await disabledItem.trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBe(false);
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
    const disabledItem: DropdownSearchItem<never> = {
      text: 'Random Item',
      disabled: true,
      disabledReason: 'This reason should not be seen because it\'s overridden by tooltip.content.',
    };

    const overriddenItem: DropdownSearchItem<never> = {
      ...disabledItem,
      tooltip: {
        content: 'Content overridden by item',
      },
    };

    const defaultWrapper = mountDropdownSearch({ items: [disabledItem] });
    const customisedWrapper = mountDropdownSearch({
      items: [overriddenItem],
      tooltipOptions: {
        placement: TooltipPlacement.TOP,
      },
    });

    expect(defaultWrapper.element).toMatchSnapshot('default');
    expect(customisedWrapper.element).toMatchSnapshot('customised');
  });

  it('should merge given popoverOptions', () => {
    const defaultWrapper = mountDropdownSearch({});
    const customisedWrapper = mountDropdownSearch({
      items: [],
      popoverOptions: {
        placement: PopoverPlacement.TOP,
        distance: 16,
      },
    });

    expect(defaultWrapper.element).toMatchSnapshot('default');
    expect(customisedWrapper.element).toMatchSnapshot('customised');
  });

  it('should use given list-data-test attribute', () => {
    const wrapper = mountDropdownSearch({ items }, {
      attrs: {
        'list-data-test': 'my-test-list',
      },
    });
    expect(wrapper.findByDataTest('my-test-list').element).toMatchSnapshot();
  });

  it('should initialize the "useFocusTrap composable" with mandatory options', () => {
    mountDropdownSearch({ items }, {
      slots: {
        default: '<a href="#" @click.prevent>Open me</a>',
      },
    });
    const options = vi.mocked(useFocusTrap).mock.calls[0][1];
    expect(options?.clickOutsideDeactivates).toBe(true);
    expect(options?.escapeDeactivates).toBe(true);
    expect(options?.immediate).toBe(false);
    expect(options?.fallbackFocus).toBeDefined();
  });

  describe('filtering', () => {
    const itemsToFilter = [
      { text: 'Item ABC' },
      { text: 'Item BCD' },
      { text: 'Item cdf' },
    ];

    function getItemTexts(wrapper: VueWrapper): string[] {
      return wrapper.findAllByDataTest('ec-dropdown-search__item').map(itemWrapper => itemWrapper.text());
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
        slots: {
          empty: ({ noResultsText }: { noResultsText: string }) => h('li', { 'data-test': 'my-slot' }, [h('div', `Random message - ${noResultsText}`)]),
        },
      });
      expect(wrapper.findByDataTest('my-slot').element).toMatchSnapshot();
    });

    it('should not display the filter items if the isLoading prop is set to true', () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter, isLoading: true });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(0);

      wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('B');
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(0);
    });
  });

  describe('filtering complex items', () => {
    interface MyDropdownSearchItem<T> extends DropdownSearchItem<T> {
      category: string,
      language: string,
    }

    const itemsToFilter: MyDropdownSearchItem<never>[] = [
      { text: 'Item ABC', category: 'One', language: 'English' },
      { text: 'Item BCD', category: 'Two', language: 'French' },
      { text: 'Item cdf', category: 'Three', language: 'English' },
    ];

    function getItemTexts(wrapper: VueWrapper): string[] {
      return wrapper.findAllByDataTest('ec-dropdown-search__item').map(itemWrapper => itemWrapper.text());
    }

    it('should filter items with a search field', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter, searchFields: ['category'] });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('One');
      expect(getItemTexts(wrapper)).toEqual(['Item ABC']);
    });

    it('should filter items with multiple search fields', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter, searchFields: ['category', 'language'] });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('English');
      expect(getItemTexts(wrapper)).toEqual(['Item ABC', 'Item cdf']);
    });

    it('should not filter by text if no search field found', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter, searchFields: ['category'] });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('f');
      expect(getItemTexts(wrapper)).toEqual([]);
    });

    it('should filter by text with empty search fields', async () => {
      const searchFields = undefined;
      const wrapper = mountDropdownSearch({ items: itemsToFilter, searchFields });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('f');
      expect(getItemTexts(wrapper)).toEqual(['Item cdf']);
    });

    it('should filter items using case insensitive', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter, searchFields: ['category', 'language'] });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('O');
      expect(getItemTexts(wrapper)).toEqual(['Item ABC', 'Item BCD']);
    });

    it('should trim the search text', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter, searchFields: ['category', 'language'] });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('\t f\n');
      expect(getItemTexts(wrapper)).toEqual(['Item BCD']);
    });

    it('should remove the diacritics', async () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter.map(item => ({ text: item.text, category: item.category.replace('E', 'È'), language: item.language })) });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(itemsToFilter.length);

      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('è');
      expect(getItemTexts(wrapper)).toEqual(['Item ABC', 'Item BCD', 'Item cdf']);
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
        slots: {
          empty: ({ noResultsText }: { noResultsText: string }) => h('li', { 'data-test': 'my-slot' }, [h('div', `Random message - ${noResultsText}`)]),
        },
      });
      expect(wrapper.findByDataTest('my-slot').element).toMatchSnapshot();
    });

    it('should not display the filter items if the isLoading prop is set to true', () => {
      const wrapper = mountDropdownSearch({ items: itemsToFilter, isLoading: true });
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(0);

      wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('B');
      expect(wrapper.findAllByDataTest('ec-dropdown-search__item').length).toBe(0);
    });
  });

  describe('events', () => {
    // .findByDataTest('stub').trigger('event') does nothing, so we need to emit the event from inside of the stubbed
    // component using .vm.$emit('event');

    it('should propagate show and hide events from popover to the parent', () => {
      const wrapper = mountDropdownSearch();

      wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('show');
      expect(wrapper.emitted('open')?.length).toBe(1);

      wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('apply-show');
      expect(wrapper.emitted('after-open')?.length).toBe(1);

      wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('hide');
      expect(wrapper.emitted('close')?.length).toBe(1);

      wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('apply-hide');
      expect(wrapper.emitted('after-close')?.length).toBe(1);
    });

    it('should focus the search box after the popover has been opened', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items }, {
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('show');
      await wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('apply-show');
      await waitOnAfterOpenFocus();

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);
    });

    it('should hide the popover after item has been selected', async () => {
      const wrapper = mountDropdownSearch({ items });
      wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('show');
      await wrapper.findAllByDataTest('ec-dropdown-search__item')[1].trigger('click');

      expect(wrapper.emitted('close')?.length).toBe(1);
    });
  });

  it('should change max height after setting a new items prop', async () => {
    const wrapper = mountDropdownSearch({
      items: [],
    });

    wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('show');

    expect(wrapper.findByDataTest('ec-dropdown-search__item-list').attributes('style')).toBe(undefined);

    await wrapper.setProps({ items });

    expect(wrapper.findByDataTest('ec-dropdown-search__item-list').attributes('style')).toBe('max-height: 0px;');
  });
});

async function waitOnAfterOpenFocus() {
  // see the afterShow and its comment to understand why we do this to wait until the input gets focused:
  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  });
}
