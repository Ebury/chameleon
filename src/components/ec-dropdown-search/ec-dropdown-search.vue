<template>
  <div
    ref="popperWidthReference"
    class="ec-dropdown-search"
    data-test="ec-dropdown-search"
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
    >
      <slot />
      <div slot="popover">
        <ul
          ref="itemsOverflowContainer"
          class="ec-dropdown-search__item-list"
          data-test="ec-dropdown-search__item-list"
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
            >
          </li>
          <li
            ref="ctaArea"
            v-if="hasCta()"
            class="ec-dropdown-search__cta-area"
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
                'ec-dropdown-search__item--is-disabled': item.disabled
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
import EcIcon from '../ec-icon';
import EcPopover from '../ec-popover';
import EcLoading from '../ec-loading';
import EcTooltip from '../../directives/ec-tooltip';
import { removeDiacritics } from '../../utils/diacritics';

export default {
  name: 'EcDropdownSearch',
  components: { EcPopover, EcIcon, EcLoading },
  directives: { EcTooltip },
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
    keepOpen: {
      type: Boolean,
      default: false,
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
  },
  data() {
    return {
      isOpen: false,
      filterText: '',
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
      },
    };
  },
  computed: {
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
  },
  methods: {
    hide() {
      this.isOpen = false;
      this.$emit('close');
    },
    show() {
      this.isOpen = true;
      this.$emit('open');
    },
    focusSearch() {
      this.$nextTick(() => {
        /* istanbul ignore else */
        if (this.isOpen && this.$refs.searchInput) {
          this.$refs.searchInput.focus();
        }
      });
    },
    afterShow() {
      this.$emit('after-open');
      this.focusSearch();
    },
    select(item) {
      this.$emit('change', item);
      if (!this.keepOpen) {
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
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/index';
@import '../../scss/tools/typography';
@import '../../scss/settings/colors/index';

$ec-dropdown-search-background-color: $white !default;
$ec-dropdown-search-background-color-hover: $level-7-backgrounds !default;
$ec-dropdown-search-background-color-selected: $level-4-tech-blue !default;
$ec-dropdown-search-background-color-disabled: $ec-dropdown-search-background-color !default;
$ec-dropdown-search-color: null !default;
$ec-dropdown-search-color-hover: inherit !default;
$ec-dropdown-search-color-selected: $white !default;
$ec-dropdown-search-color-disabled: $level-6-disabled-lines !default;
$ec-dropdown-search-border-color: $level-6-disabled-lines !default;
$ec-dropdown-search-icon-color: currentColor !default;
$ec-dropdown-search-icon-size: 16px !default;
$ec-dropdown-search-item-height: 40px !default;
$ec-dropdown-search-item-delimiter-size: 1px !default;

.ec-dropdown-search {
  $search-icon-margin-right: $ec-dropdown-search-item-horizontal-padding;

  &__popover {
    @include box-shadow-level-1;
    @include body-text;

    border: 1px solid $ec-dropdown-search-border-color;
    background-color: $ec-dropdown-search-background-color;
    color: $ec-dropdown-search-color;
  }

  &__trigger {
    // this bit is not configurable in v-tooltip and it's very annoying to deal with
    // for context:
    // https://github.com/Akryum/v-tooltip/issues/160
    // https://github.com/Akryum/v-tooltip/issues/363
    //
    // the issue is fixed in v3 alpha, we will remove this hack after updating
    .trigger {
      display: block !important;
    }
  }

  &__search-area {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__search-area,
  &__cta-area {
    border-bottom: $ec-dropdown-search-item-delimiter-size solid $ec-dropdown-search-border-color;
  }

  &__cta-area {
    @include ec-dropdown-search-item-hover-effect(
      $background-color: $ec-dropdown-search-background-color-hover,
      $color: $ec-dropdown-search-color-hover,
    );
  }

  &__search-icon {
    position: absolute;
    left: $ec-dropdown-search-item-vertical-padding;
    top: ($ec-dropdown-search-item-height - $ec-dropdown-search-icon-size) / 2;
    width: $ec-dropdown-search-icon-size;
    height: $ec-dropdown-search-icon-size;
    fill: $ec-dropdown-search-icon-color;
  }

  &__search-input {
    @include body-text;

    outline: 0;
    width: 100%;
    border: 0;
    padding: $ec-dropdown-search-item-horizontal-padding $ec-dropdown-search-item-vertical-padding;
    padding-left: $ec-dropdown-search-item-vertical-padding + $ec-dropdown-search-icon-size + $search-icon-margin-right;
  }

  &__no-items {
    @include ellipsis;
    @include ec-dropdown-search-item;
  }

  &__loading {
    height: $ec-dropdown-search-item-height;
  }

  &__item-list {
    overflow-y: auto;
    position: relative;
  }

  &__item {
    @include ellipsis;
    @include ec-dropdown-search-item;
    @include ec-dropdown-search-item-hover-effect(
      $background-color: $ec-dropdown-search-background-color-hover,
      $color: $ec-dropdown-search-color-hover,
    );

    min-height: $ec-dropdown-search-item-height + $ec-dropdown-search-item-delimiter-size;

    & + & {
      border-top: $ec-dropdown-search-item-delimiter-size solid $ec-dropdown-search-border-color;
    }

    &--is-selected,
    &--is-selected:hover {
      background-color: $ec-dropdown-search-background-color-selected;
      color: $ec-dropdown-search-color-selected;
    }

    &--is-disabled,
    &--is-disabled:hover {
      color: $ec-dropdown-search-color-disabled;
      background-color: $ec-dropdown-search-background-color;
      cursor: default;
    }
  }
}
</style>
