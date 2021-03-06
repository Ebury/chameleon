<template>
  <div
    ref="popperWidthReference"
    class="ec-dropdown-search"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-dropdown-search` : 'ec-dropdown-search',
      'list-data-test': null,
    }"
    @keydown.tab="onTabKeyDown"
    @keydown.enter.space.prevent="onEnterOrSpaceKeyDown"
    @keydown.up.prevent="onArrowUpKeyDown"
    @keydown.down.prevent="onArrowDownKeyDown"
    @keydown.esc="closeViaKeyboardNavigation"
  >
    <ec-popover
      ref="popover"
      class="ec-dropdown-search__trigger"
      data-test="ec-popover-dropdown-search"
      v-bind="{
        open: isOpen,
        disabled: disabled,
        placement: 'bottom',
        offset: 8,
        popoverInnerClass: 'ec-dropdown-search__popover',
        popperOptions,
        level: level,
        ...popoverOptions,
      }"
      @hide="hide"
      @show="show"
      @apply-show="afterShow"
      @resize="resize"
    >
      <slot />
      <div slot="popover">
        <ul
          ref="itemsOverflowContainer"
          :class="listClasses"
          :data-test="`ec-dropdown-search__item-list ${$attrs['list-data-test'] || ''}`.trim()"
          @keydown.tab="onTabKeyDown"
          @keydown.up.prevent="onArrowUpKeyDown"
          @keydown.down.prevent="onArrowDownKeyDown"
          @keydown.esc="closeViaKeyboardNavigation"
        >
          <li
            ref="searchArea"
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
            ref="ctaArea"
            v-if="hasCta()"
            v-ec-tooltip.left="{ content: !!tooltipCta ? tooltipCta : null }"
            class="ec-dropdown-search__cta-area"
            :class="{
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
              class="ec-dropdown-search__item"
              :data-test="`ec-dropdown-search__item ec-dropdown-search__item--${index}`"
              :class="{
                'ec-dropdown-search__item--is-selected': item === selected,
                'ec-dropdown-search__item--is-disabled': item.disabled,
              }"
              @click="!item.disabled && select(item)"
            ><slot
              name="item"
              v-bind="{ item, index, isSelected: item === selected }"
            >{{ item.text }}</slot></li>
          </slot>
        </ul>
      </div>
    </ec-popover>
  </div>
</template>

<script>
import { ARROW_UP, ARROW_DOWN } from '../../enums/key-code';
import EcIcon from '../ec-icon';
import EcPopover from '../ec-popover';
import EcLoading from '../ec-loading';
import EcTooltip from '../../directives/ec-tooltip';
import { removeDiacritics } from '../../utils/diacritics';
import config from '../../config';

export default {
  name: 'EcDropdownSearch',
  components: { EcPopover, EcIcon, EcLoading },
  directives: { EcTooltip },
  inheritAttrs: false,
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
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
    selected: {
      type: [Object, Array],
      default: null,
    },
    popoverOptions: {
      type: Object,
      default: null,
    },
    tooltipOptions: {
      type: Object,
      default: null,
    },
    popperModifiers: {
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
  },
  data() {
    return {
      isOpen: false,
      filterText: '',
      initialFocusedElement: null,
      isSearchInputFocused: false,
      isCtaAreaFocused: false,
      popperOptions: {
        modifiers: {
          // https://popper.js.org/popper-documentation.html#modifiers..preventOverflow.priority
          preventOverflow: {
            priority: ['bottom', 'top'],
          },
          setPopperWidth: {
            // Problem:
            // The width of the popover should match the width of the dropdown-search root.
            // There is no easy way how to configure it in popover or popper.js. There is an option to set
            // boundaries element which popover should not escape, unfortunately, these boundaries are applied for
            // both axis (x and y), but we want to limit it only the horizontal, e.g. if you have div, we don't
            // want the popover to have width bigger than div, but we don't care about the height of the div and we
            // want the popover to overflow the div by escaping from it via bottom or top edge.
            //
            // Solution: https://github.com/FezVrasta/popper.js/issues/794
            // Popper.js has modifiers for extending its functionality. We just need to give proper order and execute
            // function that will calculate new width for the popover. For the reference width, we will use
            // the root element of the component. Without setting this, the width would be 100% of the boundariesElement,
            // which is viewport.
            enabled: true,
            order: 840,
            fn: /* istanbul ignore next */ (data) => {
              data.styles.width = this.$refs.popperWidthReference.offsetWidth;
              return data;
            },
          },
          setOverflowHeight: {
            enabled: true,
            order: 845,
            fn: /* istanbul ignore next */ (data) => {
              const overflowContainer = this.$refs.itemsOverflowContainer;
              const items = this.$refs.itemElements;
              if (items && items.length > this.maxVisibleItems) {
                let finalHeight = 0;
                if (this.$refs.searchArea) {
                  finalHeight += this.$refs.searchArea.offsetHeight;
                }
                if (this.$refs.ctaArea) {
                  finalHeight += this.$refs.ctaArea.offsetHeight;
                }

                const visibleItems = Array.prototype.slice.call(items, 0, this.maxVisibleItems);
                finalHeight = visibleItems.reduce((sum, curr) => sum + curr.offsetHeight, finalHeight);
                overflowContainer.style.maxHeight = `${finalHeight}px`;
              } else {
                overflowContainer.style.maxHeight = 'auto';
              }
              return data;
            },
          },
          ...this.popperModifiers,
        },
        onUpdate: () => {
          // updating the scroll here rather than immediately after selecting an item as the popover is updated when
          // an item is selected, and this can cause its dimensions to change when their items are dynamically sized
          this.updateScroll();
        },
      },
    };
  },
  computed: {
    listClasses() {
      const classes = ['ec-dropdown-search__item-list'];

      if (this.isSensitive) {
        classes.push(config.sensitiveClass);
      }

      return classes;
    },
    filteredItems() {
      const filterText = removeDiacritics(this.filterText.toLowerCase());
      if (!filterText) {
        return this.items;
      }

      return this.items.filter((item) => {
        const itemText = removeDiacritics(item.text.trim().toLowerCase());
        return itemText.includes(filterText);
      });
    },
    isEmpty() {
      return this.isSearchEnabled && this.filteredItems.length === 0;
    },
    isFirstItemSelectable() {
      return this.isSearchEnabled || this.hasCta();
    },
  },
  methods: {
    hide() {
      if (this.isOpen) {
        this.isOpen = false;
        this.$emit('close');
      }
    },
    show() {
      /* istanbul ignore else */
      if (!this.isOpen) {
        // necessary to regain the focus after tab/enter keyboard event if search feature is active
        this.initialFocusedElement = this.$refs.popover.$el.querySelector(':focus');
        this.blurCta();
        this.isOpen = true;
        this.$emit('open');
      }
    },
    focusSearch() {
      this.$nextTick(() => {
        /* istanbul ignore else */
        if (this.isOpen && this.isSearchEnabled) {
          this.$refs.searchInput.focus();
        }
      });
    },
    afterShow() {
      this.$emit('after-open');
      this.focusSearch();
    },
    resize() {
      // the first time the VPopover component is opened, after emitting the `apply-show`
      // event, the component resizes and the focus on the search input field is lost, so
      // the input field must regain the focus after this happens
      this.focusSearch();
    },
    select(item, options) {
      this.$emit('change', item);
      if (!options || !options.keyboardNavigation) {
        this.hide();
      } else {
        // selecting an item might affect the position of the popover,
        // e.g. new item moves the trigger down
        this.$refs.popover.update();
      }
    },
    hasCta() {
      return !!this.$scopedSlots.cta;
    },
    onArrowKey(key) {
      const selectedItemIndex = this.filteredItems.indexOf(this.selected);
      let nextItem;

      if (selectedItemIndex >= 0) {
        if (key === ARROW_DOWN) {
          nextItem = this.filteredItems.find((item, i) => !item.disabled && i > selectedItemIndex);
        } else {
          const reversedItems = this.filteredItems.slice(0, selectedItemIndex).reverse();
          nextItem = reversedItems.find(item => !item.disabled);
        }
      } else {
        nextItem = this.filteredItems.find(item => !item.disabled);
      }

      if (nextItem) {
        this.select(nextItem, { keyboardNavigation: true });
      }

      this.loseFocus();
    },
    blurCta() {
      if (this.hasCta() && this.isCtaAreaFocused) {
        this.isCtaAreaFocused = false;
      }
    },
    focusCta() {
      this.isCtaAreaFocused = true;
    },
    canFocusCta() {
      return this.hasCta() && !this.isCtaAreaFocused;
    },
    canFocusSearch() {
      return this.isSearchEnabled && !this.isSearchInputFocused && !this.isCtaAreaFocused;
    },
    onTabKeyDown(event) {
      if (this.isOpen) {
        if (this.canFocusSearch()) {
          event.preventDefault();
          this.focusSearch();
          this.blurCta();
        } else if (this.canFocusCta()) {
          event.preventDefault();
          const ctaAreaElementFocusable = this.$refs.ctaArea.querySelector(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
          );
          if (ctaAreaElementFocusable) {
            ctaAreaElementFocusable.focus();
            this.focusCta();
          } else {
            this.closeViaKeyboardNavigation();
          }
        } else {
          this.closeViaKeyboardNavigation();
        }
      }
    },
    onArrowUpKeyDown() {
      this.onArrowKey(ARROW_UP);
    },
    onArrowDownKeyDown() {
      this.onArrowKey(ARROW_DOWN);
    },
    onEnterOrSpaceKeyDown() {
      if (this.isOpen) {
        this.closeViaKeyboardNavigation();
      } else {
        this.show();
      }
    },
    closeViaKeyboardNavigation() {
      if (this.isOpen) {
        this.hide();
        this.loseFocus();
        if (this.isSearchEnabled) {
          // if the search is active the focus is lost from the trigger, then it must regain the focus
          if (this.initialFocusedElement) {
            this.initialFocusedElement.focus();
            this.initialFocusedElement = null;
          }
        }
      }
    },
    updateScroll() {
      const containerHeight = this.$refs.itemsOverflowContainer.clientHeight;
      const containerScrollHeight = this.$refs.itemsOverflowContainer.scrollHeight;

      if (containerHeight < containerScrollHeight) {
        const selectedItemIndex = this.filteredItems.indexOf(this.selected);
        const $elItems = this.$refs.itemElements;

        if ($elItems && $elItems.length && selectedItemIndex >= 0) {
          const itemTopEdge = $elItems[selectedItemIndex].offsetTop;
          const itemBottomEdge = itemTopEdge + $elItems[selectedItemIndex].clientHeight;
          const containerTopEdge = this.$refs.itemsOverflowContainer.scrollTop;
          const containerBottomEdge = containerTopEdge + containerHeight;

          if (itemBottomEdge > containerBottomEdge) {
            this.$refs.itemsOverflowContainer.scrollTop = itemBottomEdge - containerHeight;
          } else if (this.isFirstItemSelectable && selectedItemIndex === 0) {
            this.$refs.itemsOverflowContainer.scrollTop = 0;
          } else if (itemTopEdge < containerTopEdge) {
            this.$refs.itemsOverflowContainer.scrollTop = itemTopEdge;
          }
        }
      }
    },
    loseFocus() {
      if (this.isSearchInputFocused) {
        // if the search is active the focus is lost from the trigger, then it must regain the focus
        this.$refs.searchInput.blur();
      } else if (this.isCtaAreaFocused) {
        this.blurCta();
        const ctaAreaElementFocusable = this.$refs.ctaArea.querySelector(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        );
        ctaAreaElementFocusable.blur();
      }
    },
  },
};
</script>

<style>
@import '../../styles/tools/ec-dropdown';

:root {
  --ec-dropddown-search-icon-margin-right: theme('margin.8');
  --ec-dropdown-search-icon-size: theme('spacing.16');
  --ec-dropdown-search-item-height: theme('spacing.40');
  --ec-dropdown-search-item-delimiter-size: theme('spacing.1');
  --ec-dropdown-search-item-horizontal-padding: theme('padding.8');
  --ec-dropdown-search-item-vertical-padding: theme('padding.16');
}

.ec-dropdown-search {
  &__popover {
    @apply tw-shadow-level-1;
    @apply tw-body-text;
    @apply tw-bg-gray-8;
    @apply tw-border-gray-6;
  }

  &__trigger {
    /* this bit is not configurable in v-tooltip and it's very annoying to deal with
       for context:
       https://github.com/Akryum/v-tooltip/issues/160
       https://github.com/Akryum/v-tooltip/issues/363

       the issue is fixed in v3 alpha, we will remove this hack after updating
    */
    .trigger {
      @apply tw-block !important;
    }
  }

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

    padding-left: calc(var(--ec-dropdown-search-item-vertical-padding) + var(--ec-dropdown-search-icon-size) + var(--ec-dropddown-search-icon-margin-right));
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
