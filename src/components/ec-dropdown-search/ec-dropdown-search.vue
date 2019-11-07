<template>
  <div
    ref="popperWidthReference"
    class="ec-dropdown-search"
  >
    <ec-popover
      v-bind="{
        open: isOpen,
        placement: 'bottom',
        offset: 8,
        popoverInnerClass: 'ec-dropdown-search__popover',
        popperOptions,
        ...popoverOptions,
      }"
      @hide="hide"
      @show="show"
      @apply-show="focus"
    >
      <slot />
      <div slot="popover">
        <ul class="ec-dropdown-search__item-list">
          <li
            v-if="isSearchEnabled"
            class="ec-dropdown-search__search-area"
          >
            <ec-icon
              class="ec-dropdown-search__search-icon"
              name="simple-search"
            />
            <input
              ref="searchInput"
              v-model.trim="filterText"
              autocomplete="off"
              class="ec-dropdown-search__search-input"
              :placeholder="placeholder"
            >
          </li>
          <slot
            name="items"
            v-bind="filteredItems"
          >
            <li
              v-for="(item, index) of filteredItems"
              :key="item.id || index"
              v-ec-tooltip="{
                placement: 'right',
                content: item.disabled ? item.disabledReason : '',
                ...tooltipOptions,
                ...item.tooltip,
              }"
              :title="item.text"
              class="ec-dropdown-search__item"
              :class="{
                'ec-dropdown-search__item--is-selected': item === selected,
                'ec-dropdown-search__item--is-disabled': item.disabled
              }"
              @click="!item.disabled && select(item)"
            >{{ item.text }}</li>
          </slot>
        </ul>
      </div>
    </ec-popover>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';
import EcPopover from '../ec-popover';
import EcTooltip from '../../directives/ec-tooltip';
import { removeDiacritics } from '../../utils/diacritics';

export default {
  name: 'EcDropdownSearch',
  components: { EcPopover, EcIcon },
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
    isSearchEnabled: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    selected: {
      type: Object,
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
            fn: (data) => {
              // eslint-disable-next-line no-param-reassign
              data.styles.width = this.$refs.popperWidthReference.offsetWidth;
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
    focus() {
      this.$nextTick(() => {
        if (this.isOpen && this.$refs.searchInput) {
          this.$refs.searchInput.focus();
        }
      });
    },
    select(item) {
      this.$emit('change', item);
      this.hide();
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/v-effetcs';
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
$ec-dropdown-search-maximum-number-of-items-visible: 5 !default; // search included

.ec-dropdown-search {
  $item-vertical-padding: 16px;
  $item-horizontal-padding: 8px;
  $search-icon-margin-right: $item-horizontal-padding;

  &__popover {
    @include box-shadow-level-1;
    @include body-text;

    border: 1px solid $ec-dropdown-search-border-color;
    background-color: $ec-dropdown-search-background-color;
    color: $ec-dropdown-search-color;
  }

  &__search-area {
    border-bottom: $ec-dropdown-search-item-delimiter-size solid $ec-dropdown-search-border-color;
    position: relative;
    display: flex;
    align-items: center;
  }

  &__search-icon {
    position: absolute;
    left: $item-vertical-padding;
    top: ($ec-dropdown-search-item-height - $ec-dropdown-search-icon-size) / 2;
    width: $ec-dropdown-search-icon-size;
    height: $ec-dropdown-search-icon-size;
    fill: $ec-dropdown-search-icon-color;
  }

  &__search-input {
    @include body-text;

    width: 100%;
    border: 0;
    padding: $item-horizontal-padding $item-vertical-padding;
    padding-left: $item-vertical-padding + $ec-dropdown-search-icon-size + $search-icon-margin-right;
  }

  &__item-list {
    $content-heihgt: $ec-dropdown-search-maximum-number-of-items-visible * $ec-dropdown-search-item-height;
    $delimiters-height: ($ec-dropdown-search-maximum-number-of-items-visible - 1) * $ec-dropdown-search-item-delimiter-size;

    max-height: $content-heihgt + $delimiters-height;
    overflow-y: auto;
  }

  &__item {
    @include ellipsis;

    padding: $item-horizontal-padding $item-vertical-padding;

    &:hover {
      cursor: pointer;
      background-color: $ec-dropdown-search-background-color-hover;
      color: $ec-dropdown-search-color-hover;
    }

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
