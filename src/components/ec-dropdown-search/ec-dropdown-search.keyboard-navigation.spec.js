import { mount } from '@vue/test-utils';
import EcDropdownSearch from './ec-dropdown-search.vue';

describe('EcDropdownSearch - Keyboard navigation', () => {
  const items = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4', disabled: true },
    { id: 5, text: 'Item 5' },
    { id: 6, text: 'Item 6', disabled: true },
    { id: 7, text: 'Item 7' },
    { id: 8, text: 'Item 8' },
  ];

  describe('when dropdown is closed and the arrow down key is pressed', () => {
    it('should select the first item when no item is selected yet', async () => {
      const expectedItem = items[0];
      const wrapper = mountDropdownSearch({ items });

      expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBeFalsy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should select the next item when another is already selected', async () => {
      const selected = items[1];
      const expectedItem = items[2];
      const wrapper = mountDropdownSearch({ items, selected });

      expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should skip those items that are disabled', async () => {
      const selected = items[2];
      const expectedItem = items[4];
      const wrapper = mountDropdownSearch({ items, selected });

      expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should not do anything if is multi-selectable', async () => {
      const wrapper = mountDropdownSearch({ items, isMultiple: true });
      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('open')).toBeUndefined();
      expect(wrapper.emitted('change')).toBeUndefined();
    });
  });

  describe('when dropdown is open and the arrow down key is pressed', () => {
    describe('when is not multi-selectable', () => {
      it('should select the first item when no item is selected yet', async () => {
        const expectedItem = items[0];
        const wrapper = mountDropdownSearch({ items });
        await openDropdown(wrapper);

        expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBeFalsy();
        expect(wrapper.emitted('change')).toBeUndefined();

        wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      });

      it('should select the next item when another is already selected', async () => {
        const selected = items[1];
        const expectedItem = items[2];
        const wrapper = mountDropdownSearch({ items, selected });
        await openDropdown(wrapper);

        expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();
        expect(wrapper.emitted('change')).toBeUndefined();

        wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      });

      it('should skip those items that are disabled', async () => {
        const selected = items[2];
        const expectedItem = items[4];
        const wrapper = mountDropdownSearch({ items, selected });
        await openDropdown(wrapper);

        expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();
        expect(wrapper.emitted('change')).toBeUndefined();

        wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      });

      it('should not do anything if there is no items', async () => {
        const wrapper = mountDropdownSearch({ items: [] });
        await openDropdown(wrapper);

        wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('change')).toBeUndefined();
      });

      it('should not do anything if there is no selectable items', async () => {
        const allItemsDisabled = [
          { id: 1, text: 'Item 1', disabled: true },
          { id: 2, text: 'Item 2' },
          { id: 3, text: 'Item 3', disabled: true },
        ];
        const wrapper = mountDropdownSearch({ items: allItemsDisabled, selected: allItemsDisabled[1] });
        await openDropdown(wrapper);

        expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();

        wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('change')).toBeUndefined();
      });
    });

    describe('when is multi-selectable', () => {
      it('should highlight the first item when no item is highlighted yet', async () => {
        const wrapper = mountDropdownSearch({ items, isMultiple: true });
        const updateSpy = jest.spyOn(wrapper.findByDataTest('ec-popover-dropdown-search').vm, 'update');
        await openDropdown(wrapper);

        expect(wrapper.find('.ec-dropdown-search__item--is-highlighted').exists()).toBeFalsy();

        wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
        await wrapper.vm.$nextTick();

        expect(wrapper.findByDataTest('ec-dropdown-search__item--0').classes('ec-dropdown-search__item--is-highlighted')).toBeTruthy();
        expect(updateSpy).toHaveBeenCalledTimes(1);
        updateSpy.mockRestore();
      });

      it('should highlight the next item when another is already highlighted', async () => {
        const lastHighlightedItem = items[1];
        const wrapper = mountDropdownSearch({ items, isMultiple: true }, {
          data() {
            return { lastHighlightedItem };
          },
        });
        const updateSpy = jest.spyOn(wrapper.findByDataTest('ec-popover-dropdown-search').vm, 'update');
        await openDropdown(wrapper);

        expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-highlighted')).toBeTruthy();

        wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
        await wrapper.vm.$nextTick();

        expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-highlighted')).toBeTruthy();
        expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-highlighted')).toBeFalsy();
        expect(updateSpy).toHaveBeenCalledTimes(1);
        updateSpy.mockRestore();
      });

      it('should skip those items that are disabled', async () => {
        const lastHighlightedItem = items[2];
        const wrapper = mountDropdownSearch({ items, isMultiple: true }, {
          data() {
            return { lastHighlightedItem };
          },
        });
        const updateSpy = jest.spyOn(wrapper.findByDataTest('ec-popover-dropdown-search').vm, 'update');
        await openDropdown(wrapper);

        expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-highlighted')).toBeTruthy();

        wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
        await wrapper.vm.$nextTick();

        expect(wrapper.findByDataTest('ec-dropdown-search__item--4').classes('ec-dropdown-search__item--is-highlighted')).toBeTruthy();
        expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-highlighted')).toBeFalsy();
        expect(updateSpy).toHaveBeenCalledTimes(1);
        updateSpy.mockRestore();
      });
    });
  });

  describe('when dropdown is closed and the arrow up key is pressed', () => {
    it('should select the first item when no item is selected yet', async () => {
      const expectedItem = items[0];
      const wrapper = mountDropdownSearch({ items });

      expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBeFalsy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should select the previous item when another is already selected', async () => {
      const selected = items[2];
      const expectedItem = items[1];
      const wrapper = mountDropdownSearch({ items, selected });

      expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should skip those items that are disabled', async () => {
      const selected = items[4];
      const expectedItem = items[2];
      const wrapper = mountDropdownSearch({ items, selected });

      expect(wrapper.findByDataTest('ec-dropdown-search__item--4').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should not do anything if is multi-selectable', async () => {
      const wrapper = mountDropdownSearch({ items, isMultiple: true });
      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('open')).toBeUndefined();
      expect(wrapper.emitted('change')).toBeUndefined();
    });
  });

  describe('when dropdown is open and the arrow up key is pressed', () => {
    it('should select the first item when no item is selected yet', async () => {
      const expectedItem = items[0];
      const wrapper = mountDropdownSearch({ items });
      await openDropdown(wrapper);

      expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBeFalsy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
    });

    it('should select the previous item when another is already selected', async () => {
      const selected = items[2];
      const expectedItem = items[1];
      const wrapper = mountDropdownSearch({ items, selected });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
    });

    it('should skip those items that are disabled', async () => {
      const selected = items[4];
      const expectedItem = items[2];
      const wrapper = mountDropdownSearch({ items, selected });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--4').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')[0]).toEqual([expectedItem]);
    });

    it('should not do anything if there is no items', async () => {
      const wrapper = mountDropdownSearch({ items: [] });
      await openDropdown(wrapper);

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')).toBeUndefined();
    });

    it('should not do anything if there is no selectable items', async () => {
      const allItemsDisabled = [
        { id: 1, text: 'Item 1', disabled: true },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3', disabled: true },
      ];
      const wrapper = mountDropdownSearch({ items: allItemsDisabled, selected: allItemsDisabled[1] });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-selected')).toBeTruthy();

      wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('change')).toBeUndefined();
    });
  });

  describe('when the tab or esc key is pressed over the dropdown', () => {
    it.each([
      ['tab'],
      ['esc'],
    ])('should close it if is open (by %s key)', async (key) => {
      const wrapper = mountDropdownSearch({ items });
      await openDropdown(wrapper);

      wrapper.findByDataTest('ec-dropdown-search').trigger(`keydown.${key}`);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('close').length).toBeTruthy();
    });

    it.each([
      ['tab'],
      ['esc'],
    ])('should not do anything if is closed (by %s key)', async (key) => {
      const wrapper = mountDropdownSearch({ items });
      wrapper.findByDataTest('ec-dropdown-search').trigger(`keydown.${key}`);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('close')).toBeUndefined();
    });
  });

  describe('when dropdown is closed and the enter or space key is pressed', () => {
    it.each([
      ['enter'],
      ['space'],
    ])('should be open (by %s key)', async (key) => {
      const wrapper = mountDropdownSearch({ items });
      expect(wrapper.emitted('change')).toBeUndefined();

      wrapper.findByDataTest('ec-dropdown-search').trigger(`keydown.${key}`);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('open').length).toBeTruthy();
    });
  });

  describe('when dropdown is open and the enter or space key is pressed', () => {
    describe('when the search feature is not active', () => {
      it.each([
        ['enter'],
        ['space'],
      ])('should be closed if it is not multi-selectable (by %s key)', async (key) => {
        const wrapper = mountDropdownSearch({
          items,
          selected: items[0],
          isSearchEnabled: false,
          isMultiple: false,
        });
        await openDropdown(wrapper);

        wrapper.findByDataTest('ec-dropdown-search').trigger(`keydown.${key}`);
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('close').length).toBeTruthy();
      });

      it.each([
        ['enter'],
        ['space'],
      ])('should be closed if it is multi-selectable but there is not selected item (by %s key)', async (key) => {
        const wrapper = mountDropdownSearch({
          items,
          isSearchEnabled: false,
          isMultiple: true,
        });
        await openDropdown(wrapper);

        wrapper.findByDataTest('ec-dropdown-search').trigger(`keydown.${key}`);
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('close').length).toBeTruthy();
      });

      it.each([
        ['enter'],
        ['space'],
      ])('should select an item if it is multi-selectable (by %s key)', async (key) => {
        const item = items[0];
        const wrapper = mountDropdownSearch({
          items,
          isSearchEnabled: false,
          isMultiple: true,
        }, {
          data() {
            return { lastHighlightedItem: item };
          },
        });
        await openDropdown(wrapper);

        wrapper.findByDataTest('ec-dropdown-search').trigger(`keydown.${key}`);
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('change')[0]).toEqual([item]);
      });
    });

    describe('when the search feature is active (only enter key case)', () => {
      it('should be closed and the focus should be regained by the field that originally had it', async () => {
        const wrapper = mountDropdownSearch({
          items,
          selected: items[0],
          isSearchEnabled: true,
          isMultiple: false,
        });
        const focus = jest.fn();
        jest.spyOn(wrapper.findByDataTest('ec-popover-dropdown-search').element, 'querySelector')
          .mockImplementation(() => ({ localName: 'input', focus }));
        await openDropdown(wrapper);

        wrapper.findByDataTest('ec-dropdown-search__search-input').trigger('keydown.enter');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('close').length).toBeTruthy();
        expect(focus).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when the popover inside the dropdown is resized', () => {
    it('should gain the focus the search input field', async () => {
      const wrapper = mountDropdownSearch({ items });
      const focusSpy = jest.spyOn(wrapper.findByDataTest('ec-dropdown-search__search-input').element, 'focus');
      await openDropdown(wrapper);

      wrapper.findByDataTest('ec-popover-dropdown-search').vm.$emit('resize');
      await wrapper.vm.$nextTick();

      expect(focusSpy).toHaveBeenCalledTimes(1);
      focusSpy.mockRestore();
    });
  });

  describe('scrollTop', () => {
    beforeAll(() => {
      const itemHeight = 50;
      const visibleWindowHeight = 200;
      const options = {
        offsetTop: 0,
        offsetHeight: itemHeight,
        clientHeight: visibleWindowHeight,
      };
      mockHtmlElementPosition(options);
    });

    it('should not scroll if there is not selected item', async () => {
      const wrapper = mountDropdownSearch({ items });

      await openDropdown(wrapper);
      wrapper.vm.popperOptions.onUpdate();

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(0);
    });

    it.each([
      [1, 0, 0],
      [2, 50, 0],
      [3, 100, 0],
      [4, 150, 0],
    ])('should not scroll down if the selected item is visible (Item position: %d)', async (itemPosition, offsetTop, expectedScrollTop) => {
      const itemIndex = itemPosition - 1;
      const wrapper = mountDropdownSearch({ items, selected: items[itemIndex - 1] });

      mockElementOffsetTop(wrapper, itemIndex, offsetTop);
      await openDropdown(wrapper);
      wrapper.vm.popperOptions.onUpdate();

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(expectedScrollTop);
    });

    it.each([
      [5, 200, 50],
      [6, 250, 100],
      [7, 300, 150],
      [8, 350, 200],
    ])('should scroll down if the selected item is below the visible ones (Item position: %d)', async (itemPosition, offsetTop, expectedScrollTop) => {
      const itemIndex = itemPosition - 1;
      const wrapper = mountDropdownSearch({ items, selected: items[itemIndex] });

      mockElementOffsetTop(wrapper, itemIndex, offsetTop);
      await openDropdown(wrapper);
      wrapper.vm.popperOptions.onUpdate();

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(expectedScrollTop);
    });

    it.each([
      [8, 350, 200],
      [7, 300, 200],
      [6, 250, 200],
      [5, 200, 200],
    ])('should not scroll up if the selected item is visible (Item position: %d)', async (itemPosition, offsetTop, expectedScrollTop) => {
      const visibleWindow = { top: 200, bottom: 400 };
      const itemIndex = itemPosition - 1;
      const wrapper = mountDropdownSearch({ items, selected: items[itemIndex] }, {
        data() {
          return { visibleWindow };
        },
      });

      mockElementOffsetTop(wrapper, itemIndex, offsetTop);
      await openDropdown(wrapper);
      wrapper.vm.popperOptions.onUpdate();

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(expectedScrollTop);
    });

    it.each([
      [4, 150, 150],
      [3, 100, 100],
      [2, 50, 50],
      [1, 0, 0],
    ])('should scroll up if the selected item is above the visible ones (Item position: %d)', async (itemPosition, offsetTop, expectedScrollTop) => {
      const visibleWindow = { top: 200, bottom: 400 };
      const itemIndex = itemPosition - 1;
      const wrapper = mountDropdownSearch({ items, selected: items[itemIndex] }, {
        data() {
          return { visibleWindow };
        },
      });

      mockElementOffsetTop(wrapper, itemIndex, offsetTop);
      await openDropdown(wrapper);
      wrapper.vm.popperOptions.onUpdate();

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(expectedScrollTop);
    });

    it('should scroll fully up if the selected item is the first one and there is some non-selectable item above it', async () => {
      const visibleWindow = { top: 200, bottom: 400 };
      const itemIndex = 0;
      const wrapper = mountDropdownSearch(
        {
          items,
          selected: items[itemIndex],
          isSearchEnabled: true,
        }, {
          data() {
            return { visibleWindow };
          },
        },
      );

      mockElementOffsetTop(wrapper, itemIndex, 100);
      await openDropdown(wrapper);
      wrapper.vm.popperOptions.onUpdate();

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(0);
    });

    it('should scroll fully up if the selected item is the first one', async () => {
      const visibleWindow = { top: 200, bottom: 400 };
      const itemIndex = 0;
      const wrapper = mountDropdownSearch(
        {
          items,
          selected: items[itemIndex],
          isSearchEnabled: false,
        }, {
          data() {
            return { visibleWindow };
          },
        },
      );
      await openDropdown(wrapper);
      wrapper.vm.popperOptions.onUpdate();

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(0);
    });
  });
});

function mountDropdownSearch(props, mountOpts) {
  return mount(EcDropdownSearch, {
    propsData: { ...props },
    ...mountOpts,
  });
}

function mockElementOffsetTop(wrapper, index, value) {
  jest.spyOn(wrapper.findByDataTest(`ec-dropdown-search__item--${index}`).element, 'offsetTop', 'get').mockReturnValueOnce(value);
}

function mockHtmlElementPosition(options) {
  Object.defineProperties(global.HTMLElement.prototype, {
    offsetTop: {
      get() { return (options && options.offsetTop) || 0; },
    },
    offsetHeight: {
      get() { return (options && options.offsetHeight) || 50; },
    },
    clientHeight: {
      get() { return (options && options.clientHeight) || 200; },
    },
  });
}

async function openDropdown(wrapper) {
  expect(wrapper.emitted('open')).toBeUndefined();
  wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.enter');
  await wrapper.vm.$nextTick();
  expect(wrapper.emitted('open').length).toBeTruthy();
}
