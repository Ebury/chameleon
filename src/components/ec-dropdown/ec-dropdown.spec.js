import Vue from 'vue';
import { mount, createLocalVue } from '@vue/test-utils';
import EcDropdown from './ec-dropdown.vue';
import { withMockedConsole } from '../../../tests/utils/console';

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

  describe(':props', () => {
    it('should not render any label if prop is not given', () => {
      const wrapper = mountDropdown({ label: '' });
      expect(wrapper.findByDataTest('ec-input-field__label').exists()).toBe(false);
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
          mountDropdown({ items, level: str });
          expect(errorSpy).toHaveBeenCalledTimes(2);
          // this is the test for the dropdown
          expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "level"');
          // this is the test for the
          expect(errorSpy.mock.calls[1][0]).toContain('Invalid prop: custom validator check failed for prop "level"');
        });
      } else {
        const wrapper = mountDropdown({ items, level: str });
        expect(wrapper.findByDataTest('ec-popover-dropdown-search').attributes('level')).toBe(str);
      }
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
      const wrapper = mountDropdown({ error: 'Random error' });
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
  });

  describe('#slots', () => {
    it('should forward item slot', () => {
      const wrapper = mountDropdown({
        items,
        selected: items[2],
      }, {
        scopedSlots: {
          item: '<div>({{ props.index }}) {{ props.item.text }} - {{ props.isSelected }}</div>',
        },
      });
      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element).toMatchSnapshot();
    });

    it('should forward CTA slot', () => {
      const wrapper = mountDropdown({}, {
        scopedSlots: {
          cta: '<button>My CTA</button>',
        },
      });
      expect(wrapper.findByDataTest('ec-dropdown-search__cta-area').element).toMatchSnapshot();
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
      const wrapper = mountDropdown({ items, selected: items[0] });
      expect(wrapper.findByDataTest('ec-input-field__input').element.value).toBe(items[0].text);
    });

    it('should display selectedText instead of selected item text if the prop is given', () => {
      const wrapper = mountDropdown({ items, selected: items[0], selectedText: 'Random text' });
      expect(wrapper.findByDataTest('ec-input-field__input').element.value).toBe('Random text');
    });

    it('should display empty text in the readonly input when nothing is selected', () => {
      const wrapper = mountDropdown({ items, selected: null });
      expect(wrapper.findByDataTest('ec-input-field__input').element.value).toBe('');
    });
  });

  describe('@events', () => {
    it('should emit change event when an item is selected', () => {
      const wrapper = mountDropdown({ items });
      selectItem(wrapper, 1);

      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('change')[0]).toEqual([items[1]]);
    });

    it('should emit open event when the input is clicked(click mock)', () => {
      const wrapper = mountDropdown({ items });

      wrapper.findByDataTest('ec-popover-dropdown-search').vm.$emit('show');
      expect(wrapper.emitted('open').length).toBe(1);
    });

    it('should not return focus back to readonly input if it already has it', () => {
      const wrapper = mountDropdown({ items });
      const focusSpy = jest.spyOn(wrapper.find({ ref: 'trigger' }).element, 'querySelector')
        .mockImplementation(() => true);
      selectItem(wrapper, 1);

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.emitted('change')[0]).toEqual([items[1]]);
      focusSpy.mockRestore();
    });
  });
});

function selectItem(wrapper, index) {
  wrapper.findByDataTest('ec-dropdown__input').trigger('mousedown');
  wrapper.findByDataTest('ec-dropdown__input').trigger('click');
  wrapper.findAll('.ec-dropdown-search__item').at(index).trigger('click');
}
