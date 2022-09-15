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
    @keydown.enter.space.prevent="onEnterOrSpaceKeyDown"
    @keydown.up.prevent="onArrowUpKeyDown"
    @keydown.down.prevent="onArrowDownKeyDown"
    @keydown.esc="closeViaKeyboardNavigation"
  >
    <ec-popover
      v-bind="{
        shown: isOpen,
        disabled: disabled,
        placement: 'bottom-start',
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
      @apply-show="afterShow"
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
                name="simple-search"
              />
              <input
                ref="searchInput"
                v-model.trim="filterText"
                autocomplete="off"
                :placeholder="placeholder"
                class="ec-dropdown-search__search-input"
                data-test="ec-dropdown-search__search-input"
                @keydown.enter="onEnterOrSpaceKeyDown"
                @focus="isSearchInputFocused = true"
                @blur="isSearchInputFocused = false"
              >
            </li>
            <li
              ref="ctaAreaWrapper"
              v-if="hasCta()"
              v-ec-tooltip.left="{ content: !!tooltipCta ? tooltipCta : null }"
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
                  placement: 'right',
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
              >
                {{ item.text }}
              </slot>
              </li>
            </slot>
          </ul>
        </div>
      </template>
    </ec-popover>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  ref,
  toRaw,
  useSlots,
} from 'vue';

import config from '../../config';
import VEcTooltip from '../../directives/ec-tooltip';
import { ARROW_DOWN, ARROW_UP } from '../../enums/key-code';
import { removeDiacritics } from '../../utils/diacritics';
import EcIcon from '../ec-icon';
import EcLoading from '../ec-loading';
import EcPopover from '../ec-popover';

const emit = defineEmits(['update:modelValue', 'change', 'close', 'open', 'after-close', 'after-open']);

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  level: {
    type: String,
    validator(value) {
      return ['notification', 'modal', 'tooltip', 'level-1', 'level-2', 'level-3'].includes(value);
    },
  },
  isSearchEnabled: {
    type: Boolean,
    default: true,
  },
  isSensitive: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => ([]),
  },
  modelValue: {
    type: [Object, Array],
    default: null,
  },
  popoverOptions: {
    type: Object,
    default: null,
  },
  popoverStyle: {
    type: [Object, Function],
    default: null,
  },
  tooltipOptions: {
    type: Object,
    default: null,
  },
  maxVisibleItems: {
    type: Number,
    default: 4,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  noResultsText: {
    type: String,
    default: 'No results found',
  },
  tooltipCta: {
    type: String,
    default: '',
  },
});

// popover styles
function getPopoverStyle() {
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
const popoverWrapper = ref(null);
const initialFocusedElement = ref(null);

function hide() {
  if (isOpen.value) {
    isOpen.value = false;
    emit('close');
  }
}

function show() {
  if (!isOpen.value) {
    initialFocusedElement.value = popoverWrapper.value.querySelector(':focus');
    blurCta();
    isOpen.value = true;
    emit('open');
  }
}

async function afterShow() {
  setOverflowHeight();

  emit('after-open');

  if (props.isSearchEnabled) {
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });
    });

    focusSearch();
  }

  updateScroll();
}

// search
const filterText = ref('');
const isSearchInputFocused = ref(false);
const searchInput = ref(null);

const filteredItems = computed(() => {
  const sanitisedText = removeDiacritics(filterText.value.toLowerCase());
  if (!sanitisedText) {
    return props.items;
  }

  return props.items.filter((item) => {
    const itemText = removeDiacritics(item.text.trim().toLowerCase());
    return itemText.includes(sanitisedText);
  });
});

const isEmpty = computed(() => props.isSearchEnabled && filteredItems.value.length === 0);

function canFocusSearch() {
  return props.isSearchEnabled && !isSearchInputFocused.value && !isCtaAreaFocused.value;
}

function focusSearch() {
  if (isOpen.value && props.isSearchEnabled && searchInput.value) {
    searchInput.value.focus();
  }
}

// selecting items
const popoverRef = ref(null);

function select(item, options) {
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
    popoverRef.value.update();
  }
}

function isItemSelected(item) {
  return toRaw(item) === toRaw(props.modelValue);
}

const selectedItemIndex = computed(() => filteredItems.value.indexOf(toRaw(props.modelValue)));

// CTA
const isCtaAreaFocused = ref(false);

function blurCta() {
  if (hasCta() && isCtaAreaFocused.value) {
    isCtaAreaFocused.value = false;
  }
}

function focusCta() {
  isCtaAreaFocused.value = true;
}

function canFocusCta() {
  return hasCta() && !isCtaAreaFocused.value;
}

// popover overflow (max-height and scroll position)
const itemsOverflowContainer = ref(null);
const itemElements = ref([]);
const searchAreaWrapper = ref(null);
const ctaAreaWrapper = ref(null);
const isFirstItemSelectable = computed(() => props.isSearchEnabled || hasCta());

function updateScroll() {
  const overflowContainer = itemsOverflowContainer.value;
  if (!overflowContainer) {
    return;
  }

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

function setOverflowHeight() {
  const overflowContainer = itemsOverflowContainer.value;
  if (!overflowContainer) {
    return;
  }
  const items = itemElements.value;
  if (items && items.length > props.maxVisibleItems) {
    let finalHeight = 0;
    if (searchAreaWrapper.value) {
      finalHeight += searchAreaWrapper.value.offsetHeight;
    }
    if (ctaAreaWrapper.value) {
      finalHeight += ctaAreaWrapper.value.offsetHeight;
    }

    const visibleItems = Array.prototype.slice.call(items, 0, props.maxVisibleItems);
    finalHeight = visibleItems.reduce((sum, curr) => sum + curr.offsetHeight, finalHeight);
    overflowContainer.style.maxHeight = `${finalHeight}px`;
  } else {
    overflowContainer.style.maxHeight = 'auto';
  }
}

// keyboard navigation (UP, DOWN arrows)
function onArrowUpKeyDown() {
  onArrowKey(ARROW_UP);
}

function onArrowDownKeyDown() {
  onArrowKey(ARROW_DOWN);
}

function onArrowKey(key) {
  let nextItem;

  if (selectedItemIndex.value >= 0) {
    if (key === ARROW_DOWN) {
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
function onTabKeyDown(event) {
  if (isOpen.value) {
    if (canFocusSearch()) {
      event.preventDefault();
      focusSearch();
      blurCta();
    } else if (canFocusCta()) {
      event.preventDefault();
      const ctaAreaElementFocusable = ctaAreaWrapper.value.querySelector(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      );
      if (ctaAreaElementFocusable) {
        ctaAreaElementFocusable.focus();
        focusCta();
      } else {
        closeViaKeyboardNavigation();
      }
    } else {
      closeViaKeyboardNavigation();
    }
  }
}

// keyboard navigation (ESC or space bar)
function onEnterOrSpaceKeyDown() {
  if (isOpen.value) {
    closeViaKeyboardNavigation();
  } else {
    show();
  }
}

function closeViaKeyboardNavigation() {
  if (isOpen.value) {
    hide();
    loseFocus();
    if (props.isSearchEnabled) {
      const elementToFocus = initialFocusedElement.value;
      if (elementToFocus && typeof elementToFocus.focus === 'function') {
        elementToFocus.focus();
        initialFocusedElement.value = null;
      }
    }
  }
}

function loseFocus() {
  if (isSearchInputFocused.value) {
    // if the search is active the focus is lost from the trigger, then it must regain the focus
    searchInput.value.blur();
  } else if (isCtaAreaFocused.value) {
    blurCta();
    const ctaAreaElementFocusable = ctaAreaWrapper.value.querySelector(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    );
    ctaAreaElementFocusable.blur();
  }
}
</script>

<script>
export default {
  name: 'EcDropdownSearch',
  compatConfig: {
    MODE: 3,
  },
  inheritAttrs: false,
};
</script>

<style>
@import '../../styles/tools/ec-dropdown';

:root {
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
