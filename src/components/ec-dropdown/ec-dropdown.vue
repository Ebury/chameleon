<template>
  <ec-dropdown-search
    v-model="selectedModel"
    class="ec-dropdown"
    :items="items"
    :placeholder="searchPlaceholder"
    :no-results-text="noResultsText"
    :is-search-enabled="isSearchEnabled"
    v-bind="{ ...$attrs, 'data-test': 'ec-dropdown' }"
    :keep-open="multiple"
    :disabled="disabled"
    :level="level"
    :is-loading="isLoading"
    :popper-modifiers="popperModifiers"
    :popover-options="popoverOptions"
    @change="onSelected"
    @open="$emit('open')"
    @after-open="$emit('after-open')"
  >
    <ec-input-field
      :id="id"
      ref="trigger"
      :error-id="errorId"
      :value="selectedTextValue"
      :label="label"
      :error-message="errorMessage"
      :placeholder="placeholder"
      :disabled="disabled"
      :icon-size="24"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-dropdown__input` : 'ec-dropdown__input'"
      readonly
      icon="simple-arrow-drop-down"
      :is-in-group="isInGroup"
      @mousedown="onMousedown"
      @focus="onFocus"
      @blur="$emit('blur')"
    />

    <template
      #item="{ item }"
      v-if="multiple && !hasItemSlot()"
    >
      <ec-checkbox
        :checked="isItemSelected(item)"
        :disabled="item.disabled"
        class="ec-dropdown__multiple-item"
        @click.prevent.stop
      >
        <template #label>
          <div
            class="ec-dropdown__multiple-item-label"
            :class="{ 'ec-dropdown__multiple-item-label--is-disabled': item.disabled }"
            data-test="ec-dropdown__multiple-item-label"
          >{{ item.text }}</div>
        </template>
      </ec-checkbox>
    </template>
    <template
      #item="{ item, index, isSelected }"
      v-else-if="hasItemSlot()"
    >
      <slot
        name="item"
        v-bind="{
          item,
          index,
          isSelected: !multiple ? isSelected : isItemSelected(item),
        }"
      />
    </template>
    <template
      #cta
      v-if="hasCtaSlot()"
    >
      <slot name="cta" />
    </template>
  </ec-dropdown-search>
</template>

<script>
import EcCheckbox from '../ec-checkbox';
import EcDropdownSearch from '../ec-dropdown-search';
import EcInputField from '../ec-input-field';

export default {
  name: 'EcDropdown',
  components: {
    EcDropdownSearch, EcInputField, EcCheckbox,
  },
  inheritAttrs: false,
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
    selected: {
      type: [Object, Array],
      default: null,
    },
    selectedText: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    level: {
      type: String,
      validator(value) {
        return ['notification', 'modal', 'tooltip', 'level-1', 'level-2', 'level-3'].includes(value);
      },
    },
    errorMessage: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    searchPlaceholder: {
      type: String,
      default: 'Search...',
    },
    isSearchEnabled: {
      type: Boolean,
      default: false,
    },
    noResultsText: {
      type: String,
      default: 'No results found',
    },
    isInGroup: {
      type: String,
    },
    id: {
      type: String,
    },
    errorId: {
      type: String,
    },
    popperModifiers: {
      type: Object,
      default: null,
    },
    popoverOptions: {
      type: Object,
      default: null,
    },
  },
  computed: {
    selectedModel: {
      get() {
        return this.selected;
      },
      set(selectedItem) {
        if (this.multiple) {
          if (this.selected) {
            if (this.selected.includes(selectedItem)) {
              this.$emit('change', this.selected.filter(item => item !== selectedItem));
            } else {
              this.$emit('change', [...this.selected, selectedItem]);
            }
          } else {
            this.$emit('change', [selectedItem]);
          }
        } else {
          this.$emit('change', selectedItem);
        }
      },
    },
    selectedTextValue() {
      if (this.selectedText) {
        return this.selectedText;
      }
      if (this.selected) {
        if (this.multiple) {
          return this.selected.map(item => item.text).join(', ');
        }
        return this.selected.text;
      }
      return '';
    },
  },
  methods: {
    isItemSelected(item) {
      return this.selected && this.selected.includes(item);
    },
    onMousedown: /* istanbul ignore next */ function onMousedown() {
      this.preventFocusToTriggerPopover = true;
      this.shouldEmitFocus = true;
    },
    onFocus() {
      // Input can gain focus by clicking or by tabbing into. Click is handled by the popover, so if
      // the focus was gained by click, don't do anything. If the focus is gained by tabbing into, then
      // open the popover programmatically.
      if (this.shouldEmitFocus) {
        this.$emit('focus');
        this.shouldEmitFocus = false;
      }
      /* istanbul ignore next */
      if (this.preventFocusToTriggerPopover) {
        this.preventFocusToTriggerPopover = false;
      } else {
        this.$refs.trigger.$el.click();
      }
    },
    onSelected() {
      // return focus back to readonly input, but that will re-open the dropdown, so prevent that.
      this.preventFocusToTriggerPopover = true;
      this.$refs.trigger.$el.querySelector('input').focus();
    },
    hasCtaSlot() {
      return !!this.$scopedSlots.cta;
    },
    hasItemSlot() {
      return !!this.$scopedSlots.item;
    },
  },
};
</script>

<style>
.ec-dropdown {
  &__input-wrapper {
    @apply tw-relative;
  }

  &__multiple-item-label {
    @apply tw-truncate;
    @apply tw-body-text;

    &--is-disabled {
      @apply tw-text-gray-6;
    }
  }
}
</style>
