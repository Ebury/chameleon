import { type ComponentMountingOptions, mount, VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';
import { h } from 'vue';
import type { ComponentExposed } from 'vue-component-type-helpers';

import EcDropdownSearch from './ec-dropdown-search.vue';
import type { DropdownItem, DropdownSearchProps } from './types';

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

  beforeEach(() => {
    if (document.activeElement && 'blur' in document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    // We need to clean the activeElement because of the jsdom bug.
    // jsdom preserves activeElement between tests even if the element has already been removed from the body
    document.body.innerHTML = '';
  });

  describe('when dropdown is closed and the arrow down key is pressed', () => {
    it('should select the first item when no item is selected yet', async () => {
      const expectedItem = items[0];
      const wrapper = mountDropdownSearch({ items });

      expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBe(false);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should select the next item when another is already selected', async () => {
      const modelValue = items[1];
      const expectedItem = items[2];
      const wrapper = mountDropdownSearch({ items, modelValue });

      expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-selected')).toBe(true);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should skip those items that are disabled', async () => {
      const modelValue = items[2];
      const expectedItem = items[4];
      const wrapper = mountDropdownSearch({ items, modelValue });

      expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-selected')).toBe(true);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });
  });

  describe('when dropdown is open and the arrow down key is pressed', () => {
    it('should select the first item when no item is selected yet', async () => {
      const expectedItem = items[0];
      const wrapper = mountDropdownSearch({ items });
      await openDropdown(wrapper);

      expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBe(false);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
    });

    it('should select the next item when another is already selected', async () => {
      const modelValue = items[1];
      const expectedItem = items[2];
      const wrapper = mountDropdownSearch({ items, modelValue });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-selected')).toBe(true);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
    });

    it('should skip those items that are disabled', async () => {
      const modelValue = items[2];
      const expectedItem = items[4];
      const wrapper = mountDropdownSearch({ items, modelValue });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-selected')).toBe(true);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
    });

    it('should not do anything if there is no items', async () => {
      const wrapper = mountDropdownSearch({ items: [] });
      await openDropdown(wrapper);

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');

      expect(wrapper.emitted('change')).toBeUndefined();
    });

    it('should not do anything if there is no selectable items', async () => {
      const allItemsDisabled = [
        { id: 1, text: 'Item 1', disabled: true },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3', disabled: true },
      ];
      const wrapper = mountDropdownSearch({ items: allItemsDisabled, modelValue: allItemsDisabled[1] });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-selected')).toBe(true);

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');

      expect(wrapper.emitted('change')).toBeUndefined();
    });
  });

  describe('when dropdown is closed and the arrow up key is pressed', () => {
    it('should select the first item when no item is selected yet', async () => {
      const expectedItem = items[0];
      const wrapper = mountDropdownSearch({ items });

      expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBe(false);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should select the previous item when another is already selected', async () => {
      const modelValue = items[2];
      const expectedItem = items[1];
      const wrapper = mountDropdownSearch({ items, modelValue });

      expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-selected')).toBe(true);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });

    it('should skip those items that are disabled', async () => {
      const modelValue = items[4];
      const expectedItem = items[2];
      const wrapper = mountDropdownSearch({ items, modelValue });

      expect(wrapper.findByDataTest('ec-dropdown-search__item--4').classes('ec-dropdown-search__item--is-selected')).toBe(true);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
      expect(wrapper.emitted('open')).toBeUndefined();
    });
  });

  describe('when dropdown is open and the arrow up key is pressed', () => {
    it('should select the first item when no item is selected yet', async () => {
      const expectedItem = items[0];
      const wrapper = mountDropdownSearch({ items });
      await openDropdown(wrapper);

      expect(wrapper.find('.ec-dropdown-search__item--is-selected').exists()).toBe(false);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
    });

    it('should select the previous item when another is already selected', async () => {
      const modelValue = items[2];
      const expectedItem = items[1];
      const wrapper = mountDropdownSearch({ items, modelValue });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--2').classes('ec-dropdown-search__item--is-selected')).toBe(true);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
    });

    it('should skip those items that are disabled', async () => {
      const modelValue = items[4];
      const expectedItem = items[2];
      const wrapper = mountDropdownSearch({ items, modelValue });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--4').classes('ec-dropdown-search__item--is-selected')).toBe(true);
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');

      expect(wrapper.emitted('change')?.[0]).toEqual([expectedItem]);
    });

    it('should not do anything if there is no items', async () => {
      const wrapper = mountDropdownSearch({ items: [] });
      await openDropdown(wrapper);

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');

      expect(wrapper.emitted('change')).toBeUndefined();
    });

    it('should not do anything if there is no selectable items', async () => {
      const allItemsDisabled = [
        { id: 1, text: 'Item 1', disabled: true },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3', disabled: true },
      ];
      const wrapper = mountDropdownSearch({ items: allItemsDisabled, modelValue: allItemsDisabled[1] });
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item--1').classes('ec-dropdown-search__item--is-selected')).toBe(true);

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.up');

      expect(wrapper.emitted('change')).toBeUndefined();
    });
  });

  describe('when dropdown is open and ESC key is pressed', () => {
    it('should close it if is open', async () => {
      const wrapper = mountDropdownSearch({ items });
      await openDropdown(wrapper);

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.esc');

      expect(wrapper.emitted('close')?.length).toBe(1);
    });

    it('should close and do nothing', async () => {
      const wrapper = mountDropdownSearch({ items });
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.esc');

      expect(wrapper.emitted('close')).toBeUndefined();
    });
  });

  describe('when dropdown is open and TAB key is pressed', () => {
    it('should focus the cta if cta is enabled', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const wrapper = mountDropdownSearch({ items, isSearchEnabled: false, trapFocus: true }, {
        slots: {
          cta: '<a href="#" data-test="cta-data-test">My CTA</a>',
        },
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);

      await openDropdown(wrapper);
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.tab');

      expect(document.activeElement).toBe(wrapper.findByDataTest('cta-data-test').element);
    });

    it('should focus the cta if cta is enabled and an item is selected', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items, isSearchEnabled: false, trapFocus: true }, {
        slots: {
          cta: '<a href="#" data-test="cta-data-test">My CTA</a>',
        },
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
      await openDropdown(wrapper);
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.tab');

      expect(document.activeElement).toBe(wrapper.findByDataTest('cta-data-test').element);
      expect(document.activeElement).toMatchSnapshot();
    });

    it('should lose the focus and close if search is enabled', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items, isSearchEnabled: true }, {
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await openDropdown(wrapper);

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.tab');
      expect(document.activeElement).toBe(document.body);
    });

    it('should focus the search if search is enabled and an item is selected', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items, isSearchEnabled: true }, {
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await openDropdown(wrapper);

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);
    });

    it('should focus the cta if search and cta are enabled', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items, isSearchEnabled: true }, {
        slots: {
          cta: '<a href="#" data-test="cta-data-test">My CTA</a>',
        },
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await openDropdown(wrapper);

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.tab');

      expect(document.activeElement).toBe(wrapper.findByDataTest('cta-data-test').element);
    });

    it('should focus the body if search and cta are enabled and cta is focused', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items, isSearchEnabled: true }, {
        slots: {
          cta: '<a href="#" data-test="cta-data-test">My CTA</a>',
        },
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await openDropdown(wrapper);

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.tab');
      expect(document.activeElement).toBe(wrapper.findByDataTest('cta-data-test').element);

      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.tab');
      expect(document.activeElement).toBe(document.body);
    });

    it('should focus the search if search and cta are enabled and an item is selected', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items, isSearchEnabled: true }, {
        slots: {
          cta: '<a href="#" data-test="cta-data-test">My CTA</a>',
        },
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await openDropdown(wrapper);

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.down');
      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);
    });

    it('should not focus the search if search and cta are enabled but the dropdown is not open', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items, isSearchEnabled: true }, {
        slots: {
          cta: '<a href="#" data-test="cta-data-test">My CTA</a>',
        },
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.tab');

      expect(document.activeElement).toBe(document.body);
    });

    it('should not focus the cta if cta is not focusable', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountDropdownSearch({ items, isSearchEnabled: true }, {
        slots: {
          cta: '<div data-test="cta-data-test">My CTA</div>',
        },
        attachTo: elem,
      });

      expect(document.activeElement).toBe(document.body);
      await openDropdown(wrapper);

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-dropdown-search__search-input').element);
      await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.tab');

      expect(document.activeElement).toBe(document.body);
    });

    describe('when some items are disabled', () => {
      it('should focus on the first enabled item', async () => {
        const itemsWithFirstItemDisabled = [
          { id: 1, text: 'Item 1', disabled: true },
          { id: 2, text: 'Item 2' },
          { id: 3, text: 'Item 3' },
        ];
        const elem = document.createElement('div');
        document.body.appendChild(elem);
        const wrapper = mountDropdownSearch({
          items: itemsWithFirstItemDisabled,
          isSearchEnabled: false,
          trapFocus: true,
        }, {
          slots: {
            item: ({ index, item }: { index: number, item: DropdownItem<never> }) => h('a', { 'data-test': `item-link--${index + 1}`, href: '#' }, `${item.text}`),
          },
          attachTo: elem,
        });

        expect(document.activeElement).toBe(document.body);
        await openDropdown(wrapper);
        expect(document.activeElement).toBe(wrapper.findByDataTest('item-link--2').element);
      });
    });
  });

  describe('when dropdown is closed and the enter or space key is pressed', () => {
    it.each([
      ['enter'],
      ['space'],
    ])('should be open (by %s key)', async (key) => {
      const wrapper = mountDropdownSearch({ items });
      expect(wrapper.emitted('change')).toBeUndefined();

      await wrapper.findByDataTest('ec-dropdown-search').trigger(`keydown.${key}`);

      expect(wrapper.emitted('open')?.length).toBe(1);
    });
  });

  describe('when dropdown is open and the enter or space key is pressed', () => {
    describe('when the search feature is not active', () => {
      it.each([
        ['enter'],
      ])('should be closed (by %s key)', async (key) => {
        const wrapper = mountDropdownSearch({
          items,
          modelValue: items[0],
          isSearchEnabled: false,
        });
        await openDropdown(wrapper);

        await wrapper.findByDataTest('ec-dropdown-search').trigger(`keydown.${key}`);

        expect(wrapper.emitted('close')?.length).toBe(1);
      });
    });

    describe('when the search feature is active (only enter key case)', () => {
      it('should be closed and the focus should be regained by the field that originally had it', async () => {
        const wrapper = mountDropdownSearch({
          items,
          modelValue: items[0],
          isSearchEnabled: true,
        });

        const focus = vi.spyOn(HTMLElement.prototype, 'focus');
        await openDropdown(wrapper);

        await wrapper.findByDataTest('ec-dropdown-search__search-input').trigger('keydown.enter');

        expect(focus).toHaveBeenCalledTimes(1);
        expect(wrapper.emitted('close')?.length).toBe(1);
      });
    });
  });

  describe('scrollTop', () => {
    beforeEach(() => {
      mockHtmlElementPosition();
    });

    it('should not scroll if there is not selected item', async () => {
      const wrapper = mountDropdownSearch({ items });

      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(0);
    });

    it.each([
      [1, 0, 0],
      [2, 50, 0],
      [3, 100, 0],
      [4, 150, 0],
    ])('should not scroll down if the selected item is visible (Item position: %d)', async (itemPosition, offsetTop, expectedScrollTop) => {
      const itemIndex = itemPosition - 1;
      const wrapper = mountDropdownSearch({ items, modelValue: items[itemIndex - 1] });

      mockElementOffsetTop(wrapper, itemIndex, offsetTop);
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(expectedScrollTop);
    });

    it.each([
      [5, 200, 50],
      [6, 250, 100],
      [7, 300, 150],
      [8, 350, 200],
    ])('should scroll down if the selected item is below the visible ones (Item position: %d)', async (itemPosition, offsetTop, expectedScrollTop) => {
      const itemIndex = itemPosition - 1;
      const wrapper = mountDropdownSearch({ items, modelValue: items[itemIndex] });

      mockElementOffsetTop(wrapper, itemIndex, offsetTop);
      await openDropdown(wrapper);

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element.scrollTop).toBe(expectedScrollTop);
    });

    it.each([
      [8, 350],
      [7, 300],
      [6, 250],
      [5, 200],
    ])('should not scroll up if the selected item is visible (Item position: %d)', async (itemPosition, offsetTop) => {
      const itemIndex = itemPosition - 1;
      const wrapper = mountDropdownSearch({ items, modelValue: items[itemIndex] });
      const setScrollTopSpy = vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'set');
      vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'get').mockReturnValueOnce(200);

      mockElementOffsetTop(wrapper, itemIndex, offsetTop);
      await openDropdown(wrapper);

      expect(setScrollTopSpy).toHaveBeenCalledTimes(0);
      setScrollTopSpy.mockRestore();
    });

    it.each([
      [4, 150, 150],
      [3, 100, 100],
      [2, 50, 50],
      [1, 0, 0],
    ])('should scroll up if the selected item is above the visible ones (Item position: %d)', async (itemPosition, offsetTop, expectedScrollTop) => {
      const itemIndex = itemPosition - 1;
      const wrapper = mountDropdownSearch({ items, modelValue: items[itemIndex] });
      const setScrollTopSpy = vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'set');
      vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'get').mockReturnValueOnce(200);

      mockElementOffsetTop(wrapper, itemIndex, offsetTop);
      await openDropdown(wrapper);

      expect(setScrollTopSpy).toHaveBeenCalledTimes(1);
      expect(setScrollTopSpy).toHaveBeenCalledWith(expectedScrollTop);
      setScrollTopSpy.mockRestore();
    });

    it('should scroll fully up if the selected item is the first one and there is some non-selectable item above it', async () => {
      const itemIndex = 0;
      const wrapper = mountDropdownSearch({ items, modelValue: items[itemIndex], isSearchEnabled: true });
      const setScrollTopSpy = vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'set');
      vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'get').mockReturnValueOnce(200);

      mockElementOffsetTop(wrapper, itemIndex, 100);
      await openDropdown(wrapper);

      expect(setScrollTopSpy).toHaveBeenCalledTimes(1);
      expect(setScrollTopSpy).toHaveBeenCalledWith(0);
      setScrollTopSpy.mockRestore();
    });

    it('should scroll fully up if the selected item is the first one', async () => {
      const itemIndex = 0;
      const wrapper = mountDropdownSearch({ items, modelValue: items[itemIndex], isSearchEnabled: false });
      const setScrollTopSpy = vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'set');
      vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'get').mockReturnValueOnce(200);

      await openDropdown(wrapper);

      expect(setScrollTopSpy).toHaveBeenCalledTimes(1);
      expect(setScrollTopSpy).toHaveBeenCalledWith(0);
      setScrollTopSpy.mockRestore();
    });

    it.each([
      ['"higher than" case', 200, 100],
      ['"equal to" case', 100, 100],
    ])('should not do anything if container\'s clientHeight is greater than or equal to container\'s scrollHeight (%s)', async (title, scrollHeight, clientHeight) => {
      mockHtmlElementPosition({
        scrollHeight,
        clientHeight,
      });
      const wrapper = mountDropdownSearch({ items });
      const setScrollTopSpy = vi.spyOn(wrapper.findByDataTest('ec-dropdown-search__item-list').element, 'scrollTop', 'set');

      await openDropdown(wrapper);

      expect(setScrollTopSpy).toHaveBeenCalledTimes(0);
      setScrollTopSpy.mockRestore();
    });
  });
});

type EcDropdownSearchExposed = ComponentExposed<typeof EcDropdownSearch>;

function mountDropdownSearch<TValue = string, TDropdownItem extends DropdownItem<TValue> = DropdownItem<TValue>>(props?: DropdownSearchProps<TValue, TDropdownItem>, mountOpts?: ComponentMountingOptions<EcDropdownSearchExposed>) {
  return mount<ComponentExposed<EcDropdownSearchExposed>>(EcDropdownSearch, {
    props,
    ...mountOpts,
  });
}

function mockElementOffsetTop(wrapper: VueWrapper, index: number, value: number) {
  vi.spyOn(wrapper.findByDataTest<HTMLLIElement>(`ec-dropdown-search__item--${index}`).element, 'offsetTop', 'get').mockReturnValueOnce(value);
}

function mockHtmlElementPosition(options?: { offsetHeight?: number, offsetTop?: number, scrollHeight?: number, clientHeight?: number, containerClientHeight?: number }) {
  vi.spyOn(global.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function mockClientHeight(this: HTMLElement) {
    if (this.className.includes('ec-dropdown-search__item-list')) {
      return (options && options.containerClientHeight) || 200;
    }
    return (options && options.clientHeight) || 50;
  });

  vi.spyOn(global.HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(() => (options && options.offsetHeight) || 50);

  vi.spyOn(global.HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(() => (options && options.offsetTop) || 0);

  vi.spyOn(global.HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => (options && options.scrollHeight) || 400);
}

async function openDropdown(wrapper: VueWrapper) {
  expect(wrapper.emitted('open')).toBeUndefined();
  await wrapper.findByDataTest('ec-dropdown-search').trigger('keydown.enter');
  await wrapper.findComponentByDataTest('ec-popover-stub').vm.$emit('apply-show');
  expect(wrapper.emitted('open')?.length).toBeGreaterThan(0);
  await waitOnAfterOpenFocus();
}

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
