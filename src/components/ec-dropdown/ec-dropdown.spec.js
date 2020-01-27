import Vue from 'vue';
import { mount, createLocalVue } from '@vue/test-utils';
import EcDropdown from './ec-dropdown.vue';

describe('EcDropdown', () => {
  const MockedEcPopover = Vue.extend({
    methods: {
      update: jest.fn(),
    },
    template: '<div data-popover-stub><slot /><slot name="popover" /></div>',
  });

  function mountDropdown(props, mountOpts) {
    const localVue = createLocalVue();

    return mount(EcDropdown, {
      localVue,
      propsData: { ...props },
      stubs: { EcPopover: MockedEcPopover },
      ...mountOpts,
    });
  }

  function mountDropdownSingleValue(props, mountOpts) {
    return mountDropdown({
      multiple: false,
      ...props,
    }, mountOpts);
  }

  function mountDropdownMultipleValue(props, mountOpts) {
    return mountDropdown({
      multiple: true,
      ...props,
    }, mountOpts);
  }

  function mountAsTemplate(template, props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcDropdown },
      template,
    });

    return mount(Component, {
      localVue,
      propsData: { ...props },
      stubs: { EcPopover: MockedEcPopover },
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

  describe('single value', () => {
    it('should render as expected', () => {
      const wrapper = mountDropdownSingleValue();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render readonly input as a trigger', () => {
      const wrapper = mountDropdownSingleValue();
      expect(wrapper.find('.ec-input-field__input').element).toMatchSnapshot();
    });

    it('should not enable searching by default', () => {
      const wrapper = mountDropdownSingleValue();
      expect(wrapper.find('.ec-dropdown-search__search-area').exists()).toBe(false);
    });

    describe(':props', () => {
      it('should not render any label if prop is not given', () => {
        const wrapper = mountDropdownSingleValue({ label: '' });
        expect(wrapper.find('.ec-input-field__label').exists()).toBe(false);
      });

      it('should pass label prop to the triggering input', () => {
        const wrapper = mountDropdownSingleValue({ label: 'Random label' });
        expect(wrapper.find('.ec-input-field__label').element).toMatchSnapshot();
      });

      it('should not render any error message if prop is not given', () => {
        const wrapper = mountDropdownSingleValue({ errorMessage: '' });
        expect(wrapper.find('.ec-input-field__error-text').exists()).toBe(false);
      });

      it('should pass errorMessage prop to the triggering input', () => {
        const wrapper = mountDropdownSingleValue({ error: 'Random error' });
        expect(wrapper.find('.ec-input-field__error-text').element).toMatchSnapshot();
      });

      it('should enable search when isSearchEnabled is set to true', () => {
        const wrapper = mountDropdownSingleValue({ isSearchEnabled: true });
        expect(wrapper.find('.ec-dropdown-search__search-area').element).toMatchSnapshot();
      });

      it('should use placeholder prop', () => {
        const wrapper = mountDropdownSingleValue({ placeholder: 'Random placeholder' });
        expect(wrapper.find('.ec-input-field__input').element).toMatchSnapshot();
      });

      it('should use searchPlaceholder prop if search is enabled', () => {
        const wrapper = mountDropdownSingleValue({ searchPlaceholder: 'Random search placeholder', isSearchEnabled: true });
        expect(wrapper.find('.ec-dropdown-search__search-area').element).toMatchSnapshot();
      });

      it('should get disabled when disabled prop is set', () => {
        const wrapper = mountDropdownSingleValue({ disabled: true });
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('#slots', () => {
      it('should forward item slot', () => {
        const wrapper = mountDropdownSingleValue({
          items,
        }, {
          scopedSlots: {
            item: '<div>({{ props.index }}) {{ props.item.text }}</div>',
          },
        });
        expect(wrapper.find('.ec-dropdown-search__item-list').element).toMatchSnapshot();
      });

      it('should forward CTA slot', () => {
        const wrapper = mountDropdownSingleValue({}, {
          scopedSlots: {
            cta: '<button>My CTA</button>',
          },
        });
        expect(wrapper.find('.ec-dropdown-search__cta-area').element).toMatchSnapshot();
      });
    });

    describe('v-model', () => {
      it('should use the v-model', () => {
        const wrapper = mountAsTemplate(
          '<ec-dropdown :items="items" v-model="selected" />',
          {},
          {
            data() {
              return { items, selected: null };
            },
          },
        );

        expect(wrapper.vm.selected).toBe(null);
        selectItem(wrapper, 0);
        expect(wrapper.vm.selected).toBe(items[0]);
        selectItem(wrapper, 1);
        expect(wrapper.vm.selected).toBe(items[1]);
      });

      it('should display selected text in the readonly input', () => {
        const wrapper = mountDropdownSingleValue({ items, selected: items[0] });
        expect(wrapper.find('.ec-input-field__input').element.value).toBe(items[0].text);
      });

      it('should display selectedText instead of selected item text if the prop is given', () => {
        const wrapper = mountDropdownSingleValue({ items, selected: items[0], selectedText: 'Random text' });
        expect(wrapper.find('.ec-input-field__input').element.value).toBe('Random text');
      });

      it('should display empty text in the readonly input when nothing is selected', () => {
        const wrapper = mountDropdownSingleValue({ items, selected: null });
        expect(wrapper.find('.ec-input-field__input').element.value).toBe('');
      });
    });

    describe('@events', () => {
      it('should emit change event when an item is selected', () => {
        const wrapper = mountDropdownSingleValue({ items });
        selectItem(wrapper, 1);

        expect(wrapper.emitted('change').length).toEqual(1);
        expect(wrapper.emitted('change')[0]).toEqual([items[1]]);
      });
    });
  });

  describe('multiple value', () => {
    it('should render as expected', () => {
      const wrapper = mountDropdownMultipleValue();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render readonly input as a trigger', () => {
      const wrapper = mountDropdownMultipleValue();
      expect(wrapper.find('.ec-input-field__input').element).toMatchSnapshot();
    });

    it('should not enable searching by default', () => {
      const wrapper = mountDropdownMultipleValue();
      expect(wrapper.find('.ec-dropdown-search__search-area').exists()).toBe(false);
    });

    it('should render checkbox for each item', () => {
      const wrapper = mountDropdownMultipleValue({ items });
      expect(wrapper.find('.ec-dropdown-search__item-list').element).toMatchSnapshot();
    });

    it('should render preselected checkbox for each selected item', () => {
      const wrapper1 = mountDropdownMultipleValue({ items, selected: [] });
      const wrapper2 = mountDropdownMultipleValue({ items, selected: items });

      expect(wrapper1.element).toMatchDiffSnapshot(wrapper2.element);
    });

    describe(':props', () => {
      it('should not render any label if prop is not given', () => {
        const wrapper = mountDropdownMultipleValue({ label: '' });
        expect(wrapper.find('.ec-input-field__label').exists()).toBe(false);
      });

      it('should pass label prop to the triggering input', () => {
        const wrapper = mountDropdownMultipleValue({ label: 'Random label' });
        expect(wrapper.find('.ec-input-field__label').element).toMatchSnapshot();
      });

      it('should not render any error message if prop is not given', () => {
        const wrapper = mountDropdownMultipleValue({ errorMessage: '' });
        expect(wrapper.find('.ec-input-field__error-text').exists()).toBe(false);
      });

      it('should pass errorMessage prop to the triggering input', () => {
        const wrapper = mountDropdownMultipleValue({ error: 'Random error' });
        expect(wrapper.find('.ec-input-field__error-text').element).toMatchSnapshot();
      });

      it('should enable search when isSearchEnabled is set to true', () => {
        const wrapper = mountDropdownMultipleValue({ isSearchEnabled: true });
        expect(wrapper.find('.ec-dropdown-search__search-area').element).toMatchSnapshot();
      });

      it('should use placeholder prop', () => {
        const wrapper = mountDropdownMultipleValue({ placeholder: 'Random placeholder' });
        expect(wrapper.find('.ec-input-field__input').element).toMatchSnapshot();
      });

      it('should use searchPlaceholder prop if search is enabled', () => {
        const wrapper = mountDropdownMultipleValue({ searchPlaceholder: 'Random search placeholder', isSearchEnabled: true });
        expect(wrapper.find('.ec-dropdown-search__search-area').element).toMatchSnapshot();
      });

      it('should get disabled when disabled prop is set', () => {
        const wrapper = mountDropdownMultipleValue({ disabled: true });
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('#slots', () => {
      it('should forward item slot', () => {
        const wrapper = mountDropdownMultipleValue({
          items,
        }, {
          scopedSlots: {
            item: '<div>({{ props.index }}) {{ props.item.text }}</div>',
          },
        });
        expect(wrapper.find('.ec-dropdown-search__item-list').element).toMatchSnapshot();
      });

      it('should forward CTA slot', () => {
        const wrapper = mountDropdownMultipleValue({}, {
          scopedSlots: {
            cta: '<button>My CTA</button>',
          },
        });
        expect(wrapper.find('.ec-dropdown-search__cta-area').element).toMatchSnapshot();
      });
    });

    describe('v-model', () => {
      it('should use the v-model', () => {
        const wrapper = mountAsTemplate(
          '<ec-dropdown multiple :items="items" v-model="selected" />',
          {},
          {
            data() {
              return { items, selected: [] };
            },
          },
        );

        expect(wrapper.vm.selected).toEqual([]);
        selectItem(wrapper, 0);
        expect(wrapper.vm.selected).toEqual([items[0]]);
        selectItem(wrapper, 1);
        expect(wrapper.vm.selected).toEqual([items[0], items[1]]);
      });

      it('should select and deselect items', () => {
        const wrapper = mountAsTemplate(
          '<ec-dropdown multiple :items="items" v-model="selected" />',
          {},
          {
            data() {
              return { items, selected: [items[0]] };
            },
          },
        );

        expect(wrapper.vm.selected).toEqual([items[0]]);
        selectItem(wrapper, 1);
        expect(wrapper.vm.selected).toEqual([items[0], items[1]]);
        selectItem(wrapper, 0);
        expect(wrapper.vm.selected).toEqual([items[1]]);
        selectItem(wrapper, 0);
        expect(wrapper.vm.selected).toEqual([items[1], items[0]]);
      });

      it('should display selected text in the readonly input', () => {
        const wrapper = mountDropdownMultipleValue({ items, selected: [items[0]] });
        expect(wrapper.find('.ec-input-field__input').element.value).toBe(items[0].text);
      });

      it('should display selectedText instead of selected item text if the prop is given', () => {
        const wrapper = mountDropdownMultipleValue({ items, selected: [items[0]], selectedText: 'Random text' });
        expect(wrapper.find('.ec-input-field__input').element.value).toBe('Random text');
      });

      it('should display empty text in the readonly input when nothing is selected', () => {
        const wrapper = mountDropdownMultipleValue({ items, selected: [] });
        expect(wrapper.find('.ec-input-field__input').element.value).toBe('');
      });

      it('should join the selected items in selected text', () => {
        const wrapper = mountDropdownMultipleValue({ items, selected: [...items] });
        expect(wrapper.find('.ec-input-field__input').element.value).toBe(items.map(item => item.text).join(', '));
      });
    });

    describe('@events', () => {
      it('should emit change event when an item is selected', () => {
        const wrapper = mountDropdownMultipleValue({ items });
        selectItem(wrapper, 1);

        expect(wrapper.emitted('change').length).toEqual(1);
        expect(wrapper.emitted('change')[0]).toEqual([[items[1]]]);
      });
    });
  });
});

function selectItem(wrapper, index) {
  wrapper.findAll('.ec-dropdown-search__item').at(index).trigger('click');
}
