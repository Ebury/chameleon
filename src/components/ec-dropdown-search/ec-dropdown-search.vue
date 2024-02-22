<template>
  <div
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-dropdown-search` : 'ec-dropdown-search',
      'list-data-test': null,
    }"
    ref="popoverWrapper"
    class="ec-dropdown-search"
    @keydown.tab="onTabKeyDown"
    @keydown.enter.prevent="onEnterKeyDown"
    @keydown.space.prevent="onSpaceKeyDown"
    @keydown.up.prevent="onArrowUpKeyDown"
    @keydown.down.prevent="onArrowDownKeyDown"
    @keydown.esc="closeViaKeyboardNavigation"
  >
    <ec-popover
      v-bind="{
        shown: isOpen,
        disabled: disabled,
        placement: PopoverPlacement.BOTTOM_START,
        autoSize: true,
        shift: false,
        distance: 8,
        popperClass: 'ec-dropdown-search__popover',
        level: level,
        ...popoverOptions,
      }"
      ref="popoverRef"
      class="ec-dropdown-search__trigger"
      data-test="ec-popover-dropdown-search"
      @hide="hide"
      @show="show"
      @apply-show="afterShow(); focusAfterShow()"
      @apply-hide="emit('after-close')"
    >
      <slot />
      <template #popper>
        <div :style="getPopoverStyle()">
          <ul
            ref="itemsOverflowContainer"
            :class="{
              'ec-dropdown-search__item-list': true,
              [config.sensitiveClass]: isSensitive,
            }"
            :data-test="`ec-dropdown-search__item-list ${$attrs['list-data-test'] || ''}`.trim()"
            @keydown.tab="onTabKeyDown"
            @keydown.up.prevent="onArrowUpKeyDown"
            @keydown.down.prevent="onArrowDownKeyDown"
            @keydown.esc="closeViaKeyboardNavigation"
          >
            <li
              ref="searchAreaWrapper"
              v-if="isSearchEnabled"
              class="ec-dropdown-search__search-area"
              data-test="ec-dropdown-search__search-area"
            >
              <ec-icon
                class="ec-dropdown-search__search-icon"
                :name="IconName.SIMPLE_SEARCH"
              />
              <input
                ref="searchInput"
                v-model.trim="filterText"
                autocomplete="off"
                :placeholder="placeholder"
                class="ec-dropdown-search__search-input"
                data-test="ec-dropdown-search__search-input"
                @keydown.enter="onEnterKeyDown"
                @focus="isSearchInputFocused = true"
                @blur="isSearchInputFocused = false"
              >
            </li>
            <li
              ref="ctaAreaWrapper"
              v-if="hasCta()"
              v-ec-tooltip.left="{ content: !!tooltipCta ? tooltipCta : undefined }"
              :class="{
                'ec-dropdown-search__cta-area': true,
                'ec-dropdown-search__cta-area--is-focused': isCtaAreaFocused,
              }"
              data-test="ec-dropdown-search__cta-area"
              @click="hide"
            >
              <slot name="cta" />
            </li>

            <li v-if="isLoading">
              <ec-loading
                show
                :size="24"
              >
                <div
                  class="ec-dropdown-search__loading"
                  data-test="ec-dropdown-search__loading"
                />
              </ec-loading>
            </li>

            <slot
              v-else-if="isEmpty"
              name="empty"
              v-bind="{ noResultsText }"
            >
              <li
                class="ec-dropdown-search__no-items"
                data-test="ec-dropdown-search__no-items"
                :title="noResultsText"
              >{{ noResultsText }}</li>
            </slot>

            <slot
              v-else
              name="items"
              v-bind="filteredItems"
            >
              <li
                v-for="(item, index) of filteredItems"
                :key="item.id || index"
                ref="itemElements"
                v-ec-tooltip="{
                  placement: PopoverPlacement.RIGHT,
                  content: item.disabled ? item.disabledReason : '',
                  ...tooltipOptions,
                  ...item.tooltip,
                }"
                :title="item.text"
                :data-test="`ec-dropdown-search__item ec-dropdown-search__item--${index}`"
                :class="{
                  'ec-dropdown-search__item': true,
                  'ec-dropdown-search__item--is-selected': isItemSelected(item),
                  'ec-dropdown-search__item--is-disabled': item.disabled,
                }"
                @click="!item.disabled && select(item)"
              ><slot
                name="item"
                v-bind="{ item, index, isSelected: isItemSelected(item) }"
              >{{ item.text }}</slot></li>
            </slot>
          </ul>
        </div>
      </template>
    </ec-popover>
  </div>
</template>

<script setup lang="ts" generic="TValue, TDropdownSearchItem extends DropdownSearchItem<TValue>">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import type { StyleValue } from 'vue';
import {
  computed, nextTick, ref, toRaw, useSlots, watch,
} from 'vue';

import useConfig from '../../composables/use-ec-config';
import vEcTooltip from '../../directives/ec-tooltip';
import { KeyboardKey } from '../../enums';
import { type Maybe } from '../../main';
import { removeDiacritics } from '../../utils/diacritics';
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import EcLoading from '../ec-loading';
import EcPopover from '../ec-popover';
import { PopoverPlacement } from '../ec-popover/types';
import type { DropdownSearchItem, DropdownSearchProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const config = useConfig();

const props = withDefaults(defineProps<DropdownSearchProps<TValue, TDropdownSearchItem>>(), {
  placeholder: 'Search...',
  noResultsText: 'No results found',
  tooltipCta: '',
  isSearchEnabled: true,
  items: () => [],
  maxVisibleItems: 4,
});

const emit = defineEmits<{
  'update:modelValue': [value: TDropdownSearchItem],
  'change': [value: TDropdownSearchItem],
  'close': [],
  'open': [],
  'after-close': [],
  'after-open': [],
}>();

// popover styles
function getPopoverStyle(): StyleValue | undefined {
  if (typeof props.popoverStyle === 'function') {
    return props.popoverStyle();
  }

  return props.popoverStyle;
}

// slots
const slots = useSlots();

function hasCta() {
  return !!slots.cta;
}

// toggling
const isOpen = ref(false);
const popoverWrapper = ref<Maybe<HTMLDivElement>>();
const initialFocusedElement = ref<Maybe<HTMLElement>>();

function hide() {
  if (isOpen.value) {
    isOpen.value = false;
    emit('close');

    /* c8 ignore start */
    if (props.trapFocus) {
      deactivate(); // deactivate focus trap
    }
    /* c8 ignore stop */
  }
}

function show() {
  if (!isOpen.value && popoverWrapper.value) {
    initialFocusedElement.value = popoverWrapper.value.querySelector<HTMLElement>(':focus');
    blurCta();
    isOpen.value = true;
    emit('open');
  }
}

function afterShow() {
  setOverflowHeight();

  emit('after-open');

  if (props.trapFocus) {
    activate(); // activate focus trap
  }

  updateScroll();
}

// initial focus
function waitForPopoverFocus() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  });
}

/* c8 ignore start */
function findTabbableElement(element: Maybe<ParentNode> | undefined): Maybe<HTMLElement> {
  if (element) {
    return element.querySelector(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    );
  }

  return null;
}
/* c8 ignore stop */

async function focusAfterShow() {
  await waitForPopoverFocus();

  if (props.isSearchEnabled) {
    focusSearch();
  } else if (canFocusCta()) {
    focusCta();
  } else if (props.trapFocus) {
    focusFirstItem();
  } else {
    const triggerElement = findTabbableElement(popoverWrapper.value);
    /* c8 ignore start */
    if (triggerElement) {
      triggerElement.focus();
    }
    /* c8 ignore stop */
  }
}

function focusFirstItem() {
  const nextItemIndex = filteredItems.value.findIndex(item => !item.disabled);
  /* c8 ignore start */
  if (nextItemIndex === -1) {
    return;
  }
  /* c8 ignore stop */

  const tabbableItem = findTabbableElement(itemElements.value[nextItemIndex]);
  if (tabbableItem) {
    tabbableItem.focus();
  }
}

// search
const filterText = ref('');
const isSearchInputFocused = ref(false);
const searchInput = ref<Maybe<HTMLInputElement>>(null);

const indexedItems = computed(() => new WeakMap(props.items.map(item => [item, makeIndexText(item, props.searchFields ?? ['text'])])));

function makeIndexText(item: TDropdownSearchItem, searchFields: ReadonlyArray<keyof TDropdownSearchItem>): string {
  return searchFields.map(searchField => removeDiacritics(`${item[searchField] ?? /* c8 ignore next */ ''}`).toLowerCase()).join('\u00A0');
}

const filteredItems = computed(() => {
  const sanitisedText = removeDiacritics(filterText.value.toLowerCase());
  if (!sanitisedText) {
    return props.items;
  }

  return props.items.filter((item: TDropdownSearchItem) => {
    const indexedText = indexedItems.value.get(item) ?? /* c8 ignore next */ '';
    return indexedText.includes(sanitisedText);
  });
});

const isEmpty = computed(() => props.isSearchEnabled && filteredItems.value.length === 0);

function canFocusSearch(): boolean {
  return props.isSearchEnabled && !isSearchInputFocused.value && !isCtaAreaFocused.value;
}

function focusSearch() {
  if (isOpen.value && props.isSearchEnabled && searchInput.value) {
    searchInput.value.focus();
  }
}

// selecting items
const popoverRef = ref<InstanceType<typeof EcPopover>>();

function select(item: TDropdownSearchItem, options?: { keyboardNavigation: boolean }) {
  emit('update:modelValue', item);
  emit('change', item);
  if (!options || !options.keyboardNavigation) {
    hide();
  } else {
    nextTick(() => {
      updateScroll();
    });
    // selecting an item might affect the position of the popover,
    // e.g. new item moves the trigger down
    popoverRef.value?.update();
  }
}

function isItemSelected(item: TDropdownSearchItem): boolean {
  return toRaw(item) === toRaw(props.modelValue);
}

const selectedItemIndex = computed(() => (props.modelValue ? filteredItems.value.indexOf(toRaw(props.modelValue)) : -1));

// CTA
const itemsOverflowContainer = ref<Maybe<HTMLUListElement>>();
const isCtaAreaFocused = ref(false);
const { deactivate, activate } = useFocusTrap(itemsOverflowContainer, {
  immediate: false,
  escapeDeactivates: true,
  clickOutsideDeactivates: true,
  fallbackFocus: /* c8 ignore next */() => popoverWrapper.value || 'body',
});

function blurCta() {
  if (hasCta() && isCtaAreaFocused.value) {
    isCtaAreaFocused.value = false;
  }
}

function focusCta() {
  const ctaAreaElementFocusable = findTabbableElement(ctaAreaWrapper.value);
  if (ctaAreaElementFocusable) {
    ctaAreaElementFocusable.focus();
    isCtaAreaFocused.value = true;
  }

  return ctaAreaElementFocusable;
}

function canFocusCta() {
  return hasCta() && !isCtaAreaFocused.value;
}

// popover overflow (max-height and scroll position)
const itemElements = ref<HTMLLIElement[]>([]);
const searchAreaWrapper = ref<Maybe<HTMLLIElement>>();
const ctaAreaWrapper = ref<Maybe<HTMLLIElement>>();
const isFirstItemSelectable = computed(() => props.isSearchEnabled || hasCta());

function updateScroll() {
  const overflowContainer = itemsOverflowContainer.value;
  /* c8 ignore start */
  if (!overflowContainer) {
    return;
  }
  /* c8 ignore stop */

  const containerHeight = overflowContainer.clientHeight;
  const containerScrollHeight = overflowContainer.scrollHeight;

  if (containerHeight < containerScrollHeight) {
    if (itemElements.value && itemElements.value.length && selectedItemIndex.value >= 0) {
      const itemTopEdge = itemElements.value[selectedItemIndex.value].offsetTop;
      const itemBottomEdge = itemTopEdge + itemElements.value[selectedItemIndex.value].clientHeight;
      const containerTopEdge = overflowContainer.scrollTop;
      const containerBottomEdge = containerTopEdge + containerHeight;

      if (itemBottomEdge > containerBottomEdge) {
        overflowContainer.scrollTop = itemBottomEdge - containerHeight;
      } else if (isFirstItemSelectable.value && selectedItemIndex.value === 0) {
        overflowContainer.scrollTop = 0;
      } else if (itemTopEdge < containerTopEdge) {
        overflowContainer.scrollTop = itemTopEdge;
      }
    }
  }
}

watch(() => itemElements.value.length, async () => {
  if (isOpen.value) {
    await nextTick();
    setOverflowHeight();
  }
});

function setOverflowHeight() {
  const overflowContainer = itemsOverflowContainer.value;
  /* c8 ignore start */
  if (!overflowContainer) {
    return;
  }
  /* c8 ignore stop */

  const items = itemElements.value;
  if (items && items.length > props.maxVisibleItems) {
    let finalHeight = 0;
    if (searchAreaWrapper.value) {
      finalHeight += searchAreaWrapper.value.offsetHeight;
    }
    if (ctaAreaWrapper.value) {
      finalHeight += ctaAreaWrapper.value.offsetHeight;
    }

    const visibleItems = ([] as HTMLLIElement[]).slice.call(items, 0, props.maxVisibleItems);
    finalHeight = visibleItems.reduce((sum, curr) => sum + curr.offsetHeight, finalHeight);
    overflowContainer.style.maxHeight = `${finalHeight}px`;
  } else {
    overflowContainer.style.maxHeight = 'auto';
  }
}

// keyboard navigation (UP, DOWN arrows)
function onArrowUpKeyDown() {
  onArrowKey(KeyboardKey.ARROW_UP);
}

function onArrowDownKeyDown() {
  onArrowKey(KeyboardKey.ARROW_DOWN);
}

function onArrowKey(key: KeyboardKey) {
  let nextItem: TDropdownSearchItem | undefined;

  if (selectedItemIndex.value >= 0) {
    if (key === KeyboardKey.ARROW_DOWN) {
      nextItem = filteredItems.value.find((item, i) => !item.disabled && i > selectedItemIndex.value);
    } else {
      const reversedItems = filteredItems.value.slice(0, selectedItemIndex.value).reverse();
      nextItem = reversedItems.find(item => !item.disabled);
    }
  } else {
    nextItem = filteredItems.value.find(item => !item.disabled);
  }

  if (nextItem) {
    select(nextItem, { keyboardNavigation: true });
  }
}

// keyboard navigation (tabbing)
function onTabKeyDown(event: KeyboardEvent) {
  if (isOpen.value) {
    /* c8 ignore start */
    if (canFocusSearch()) {
      event.preventDefault();
      focusSearch();
      blurCta();
    } /* c8 ignore stop */ else if (canFocusCta()) {
      event.preventDefault();
      const ctaAreaElementFocusable = focusCta();
      if (!ctaAreaElementFocusable) {
        closeViaKeyboardNavigation();
      }
    } else if (!props.trapFocus) {
      closeViaKeyboardNavigation();
    }
  }
}

// keyboard navigation (enter)
function onEnterKeyDown() {
  if (isOpen.value) {
    closeViaKeyboardNavigation();
  } else {
    show();
  }
}

// keyboard navigation (space bar)
function onSpaceKeyDown() {
  if (!isOpen.value) {
    show();
  }
}

function closeViaKeyboardNavigation() {
  if (isOpen.value) {
    hide();
    loseFocus();
    if (props.isSearchEnabled) {
      const elementToFocus = initialFocusedElement.value;
      /* c8 ignore start */
      if (elementToFocus && typeof elementToFocus.focus === 'function') {
        elementToFocus.focus();
        initialFocusedElement.value = null;
      }
      /* c8 ignore stop */
    }
  }
}

function loseFocus() {
  if (isSearchInputFocused.value) {
    // if the search is active the focus is lost from the trigger, then it must regain the focus
    searchInput.value?.blur();
  } else if (isCtaAreaFocused.value) {
    blurCta();
    const ctaAreaElementFocusable = findTabbableElement(ctaAreaWrapper.value);
    ctaAreaElementFocusable?.blur();
  }
}
</script>

<style>
@import '../../styles/tools/ec-dropdown';

:root,
:host {
  --ec-dropdown-search-icon-margin-right: theme('margin.8');
  --ec-dropdown-search-icon-size: theme('spacing.16');
  --ec-dropdown-search-item-height: theme('spacing.40');
  --ec-dropdown-search-item-delimiter-size: theme('spacing.1');
  --ec-dropdown-search-item-horizontal-padding: theme('padding.8');
  --ec-dropdown-search-item-vertical-padding: theme('padding.16');
}

.ec-dropdown-search {
  /* stylelint-disable selector-max-class */
  &__popover.v-popper--theme-dropdown {
    .v-popper__inner {
      @apply tw-shadow-level-1;
      @apply tw-body-text;
      @apply tw-bg-gray-8;
      @apply tw-border-gray-6;
    }
  }
  /* stylelint-enable */

  &__search-area {
    @apply tw-relative;
    @apply tw-flex tw-items-center;
  }

  &__search-area,
  &__cta-area {
    @apply tw-border-b tw-border-solid tw-border-gray-6;
  }

  &__cta-area {
    @mixin ec-dropdown-search-item-hover-effect;

    &--is-focused {
      @apply tw-bg-gray-7;
    }
  }

  &__search-icon {
    @apply tw-absolute;
    @apply tw-fill-current;

    left: var(--ec-dropdown-search-item-vertical-padding);
    top: calc((var(--ec-dropdown-search-item-height) - var(--ec-dropdown-search-icon-size)) / 2);
    width: var(--ec-dropdown-search-icon-size);
    height: var(--ec-dropdown-search-icon-size);
  }

  &__search-input {
    @apply tw-body-text;
    @apply tw-outline-none;
    @apply tw-border-0;
    @apply tw-px-16 tw-py-8;
    @apply tw-w-full;

    padding-left: calc(var(--ec-dropdown-search-item-vertical-padding) + var(--ec-dropdown-search-icon-size) + var(--ec-dropdown-search-icon-margin-right));
  }

  &__no-items {
    @apply tw-truncate;

    @mixin ec-dropdown-search-item;
  }

  &__loading {
    height: var(--ec-dropdown-search-item-height);
  }

  &__item-list {
    @apply tw-overflow-y-auto;
    @apply tw-relative;
  }

  &__item {
    @apply tw-truncate;
    @apply tw-relative;

    @mixin ec-dropdown-search-item;
    @mixin ec-dropdown-search-item-hover-effect;

    min-height: calc(var(--ec-dropdown-search-item-height) + var(--ec-dropdown-search-item-delimiter-size));

    & + & {
      @apply tw-border-t tw-border-solid tw-border-gray-6;
    }

    &--is-selected,
    &--is-selected:hover {
      @apply tw-bg-key-4;
      @apply tw-text-gray-8;
    }

    &--is-disabled,
    &--is-disabled:hover {
      @apply tw-cursor-default;
      @apply tw-bg-gray-8;
      @apply tw-text-gray-6;
    }
  }
}
</style>
