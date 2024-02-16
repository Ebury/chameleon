import { type ComponentMountingOptions, mount, VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent, h } from 'vue';
import type { ComponentExposed } from 'vue-component-type-helpers';

import EcDropdown from './ec-dropdown.vue';
import type { DropdownItem, DropdownProps } from './types';

type EcDropdownExposed = ComponentExposed<typeof EcDropdown>;

describe('EcDropdown', () => {
  function mountDropdown(props?: DropdownProps, mountOpts?: ComponentMountingOptions<EcDropdownExposed>) {
    return mount<EcDropdownExposed>(EcDropdown, {
      props,
      ...mountOpts,
    });
  }

  const items: DropdownItem<never>[] = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    {
      id: 4, text: 'Item 4', disabled: true, disabledReason: 'Random text',
    },
    { id: 5, text: 'Item 5' },
  ];

  it('should render as expected', () => {
    const wrapper = mountDropdown();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render readonly input as a trigger', () => {
    const wrapper = mountDropdown();
    expect(wrapper.findByDataTest('ec-input-field__input').element).toMatchSnapshot();
  });

  it('should not enable searching by default', () => {
    const wrapper = mountDropdown();
    expect(wrapper.findByDataTest('ec-dropdown-search__search-area').exists()).toBe(false);
  });

  it('should use custom attributes', () => {
    const wrapper = mountDropdown({}, {
      attrs: {
        'data-test': 'my-data-test',
        id: 'my-id',
        class: 'my-class',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use given list-data-test attribute', () => {
    const wrapper = mountDropdown({ items }, {
      attrs: {
        'list-data-test': 'my-test-list',
      },
    });
    expect(wrapper.findByDataTest('my-test-list').element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should not render any label if prop is not given', () => {
      const wrapper = mountDropdown({ label: '' });
      expect(wrapper.findByDataTest('ec-input-field__label').exists()).toBe(false);
    });

    it('should pass label prop to the triggering input', () => {
      const wrapper = mountDropdown({ label: 'Random label' });
      expect(wrapper.findByDataTest('ec-input-field__label').element).toMatchSnapshot();
    });

    it('should not render any error message if prop is not given', () => {
      const wrapper = mountDropdown({ errorMessage: '' });
      expect(wrapper.findByDataTest('ec-input-field__error-text').exists()).toBe(false);
    });

    it('should pass errorMessage prop to the triggering input', () => {
      const wrapper = mountDropdown({ errorMessage: 'Random error' });
      expect(wrapper.findByDataTest('ec-input-field__error-text').element).toMatchSnapshot();
    });

    it('should enable search when isSearchEnabled is set to true', () => {
      const wrapper = mountDropdown({ isSearchEnabled: true });
      expect(wrapper.findByDataTest('ec-dropdown-search__search-area').element).toMatchSnapshot();
    });

    it('should use placeholder prop', () => {
      const wrapper = mountDropdown({ placeholder: 'Random placeholder' });
      expect(wrapper.findByDataTest('ec-input-field__input').element).toMatchSnapshot();
    });

    it('should use searchPlaceholder prop if search is enabled', () => {
      const wrapper = mountDropdown({ searchPlaceholder: 'Random search placeholder', isSearchEnabled: true });
      expect(wrapper.findByDataTest('ec-dropdown-search__search-area').element).toMatchSnapshot();
    });

    it('should get disabled when disabled prop is set', () => {
      const wrapper = mountDropdown({ disabled: true });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not show the items when the loading is set to true', () => {
      const wrapper = mountDropdown({ items, isLoading: true });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a sensitive class when isSensitive prop is set to true', () => {
      const wrapper = mountDropdown({ isSensitive: true });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render properly when the labelTooltip prop is set', () => {
      const wrapper = mountDropdown({ labelTooltip: 'Testing the labelTooltip prop' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render given popover style', () => {
      const wrapper = mountDropdown({ popoverStyle: { width: '1234px' } });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render given popover style when it is a function', () => {
      const wrapper = mountDropdown({ popoverStyle: () => ({ width: '1234px' }) });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('#slots', () => {
    it('should forward item slot', () => {
      const wrapper = mountDropdown({
        items,
        modelValue: items[2],
      }, {
        slots: {
          item: ({ item, index, isSelected }: { item: DropdownItem<never>, index: number, isSelected: boolean }) => h('div', `(${index}) ${item.text} - ${isSelected}`),
        },
      });
      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element).toMatchSnapshot();
    });

    it('should forward CTA slot', () => {
      const wrapper = mountDropdown({}, {
        slots: {
          cta: '<button>My CTA</button>',
        },
      });
      expect(wrapper.findByDataTest('ec-dropdown-search__cta-area').element).toMatchSnapshot();
    });

    it('should forward CTA slot with tooltip', () => {
      const wrapper = mountDropdown({
        tooltipCta: 'Random tooltip',
      }, {
        slots: {
          cta: '<button>My CTA</button>',
        },
      });
      expect(wrapper.findByDataTest('ec-dropdown-search__cta-area').element).toMatchSnapshot();
    });
  });

  describe('v-model', () => {
    it('should use the v-model', async () => {
      const Component = defineComponent({
        components: { EcDropdown },
        data() {
          return { items, selected: null };
        },
        template: '<ec-dropdown :items="items" v-model="selected" />',
      });

      const wrapper = mount(Component);

      await openDropdown(wrapper);
      expect(wrapper.vm.selected).toEqual(null);
      await selectItem(wrapper, 0);
      expect(wrapper.vm.selected).toEqual(items[0]);
      await selectItem(wrapper, 1);
      expect(wrapper.vm.selected).toEqual(items[1]);
    });

    it('should display selected text in the readonly input', () => {
      const wrapper = mountDropdown({ items, modelValue: items[0] });
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element.value).toBe(items[0].text);
    });

    it('should display selectedText instead of selected item text if the prop is given', () => {
      const wrapper = mountDropdown({ items, modelValue: items[0], selectedText: 'Random text' });
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element.value).toBe('Random text');
    });

    it('should display empty text in the readonly input when nothing is selected', () => {
      const wrapper = mountDropdown({ items, modelValue: undefined });
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element.value).toBe('');
    });
  });

  describe('@events', () => {
    it('should emit a focus event when opened', async () => {
      const wrapper = mountDropdown({ items });
      await openDropdown(wrapper);
      expect(wrapper.emitted('focus')?.length).toEqual(1);
    });

    it('should emit a blur event when blurred', async () => {
      const wrapper = mountDropdown({ items });
      await openDropdown(wrapper);
      await wrapper.findByDataTest('ec-dropdown__input').trigger('blur');
      expect(wrapper.emitted('blur')?.length).toEqual(1);
    });

    it('should propagate an after-open event', () => {
      const wrapper = mountDropdown({ items });
      wrapper.findComponentByDataTest('ec-popover-dropdown-search').vm.$emit('apply-show');
      expect(wrapper.emitted('after-open')?.length).toEqual(1);
    });

    it('should propagate an after-close event', () => {
      const wrapper = mountDropdown({ items });
      wrapper.findComponentByDataTest('ec-popover-dropdown-search').vm.$emit('apply-hide');
      expect(wrapper.emitted('after-close')?.length).toEqual(1);
    });

    it('should emit change event when an item is selected', async () => {
      const wrapper = mountDropdown({ items });
      await openDropdown(wrapper);
      await selectItem(wrapper, 1);

      expect(wrapper.emitted('change')?.length).toEqual(1);
      expect(wrapper.emitted('change')?.[0]).toEqual([items[1]]);
    });

    it('should emit open event when the input is clicked (click mock)', () => {
      const wrapper = mountDropdown({ items });

      wrapper.findComponentByDataTest('ec-popover-dropdown-search').vm.$emit('show');
      expect(wrapper.emitted('open')?.length).toBe(1);
    });

    it('should emit close event when the input looses focus (focus mock)', () => {
      const wrapper = mountDropdown({ items });

      // open the dropdown search first, otherwise the hide event won't do anything
      wrapper.findComponentByDataTest('ec-popover-dropdown-search').vm.$emit('show');

      wrapper.findComponentByDataTest('ec-popover-dropdown-search').vm.$emit('hide');
      expect(wrapper.emitted('close')?.length).toBe(1);
    });

    it('should not return focus back to readonly input if it already has it', async () => {
      const focusSpy = vi.fn();

      const wrapper = mountDropdown({ items }, {
        attrs: {
          onFocus: focusSpy,
        },
      });
      await openDropdown(wrapper);
      expect(focusSpy).toHaveBeenCalledTimes(1);
      await selectItem(wrapper, 1);
      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.emitted('change')?.[0]).toEqual([items[1]]);

      await selectItem(wrapper, 2);
      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.emitted('change')?.[1]).toEqual([items[2]]);
    });
  });
});

async function openDropdown(wrapper: VueWrapper) {
  await wrapper.findByDataTest<HTMLInputElement>('ec-dropdown__input').trigger('mousedown');
  await wrapper.findByDataTest<HTMLInputElement>('ec-dropdown__input').trigger('click');
  await wrapper.findByDataTest<HTMLInputElement>('ec-dropdown__input').trigger('focus');
}

async function selectItem(wrapper: VueWrapper, index: number) {
  await wrapper.findByDataTest<HTMLLIElement>(`ec-dropdown-search__item--${index}`).trigger('click');
}
