import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';

import EcDropdown from './ec-dropdown.vue';
import type { DropdownItem, DropdownProps } from './types';

export default {
  title: 'Dropdown',
  component: EcDropdown,
  argTypes: {
    level: {
      options: ['notification', 'modal', 'tooltip', 'level-1', 'level-2', 'level-3'],
      control: { type: 'select' },
    },
    isInGroup: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
  },
} as Meta;

const defaultItems: DropdownItem<never>[] = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3', disabled: true, disabledReason: 'Is disabled for a reason' },
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' },
  { text: 'Item 5' },
  { text: 'Item 6' },
  { text: 'Item 7' },
];

interface MyDropdownItem<T> extends DropdownItem<T> {
  country: string,
  language: string,
}

const complexItems: MyDropdownItem<never>[] = [
  { text: 'My Item 1', country: 'Spain', language: 'Spanish' },
  { text: 'My Item 2', country: 'England', language: 'English' },
  { text: 'My Item 3', country: 'South Africa', language: 'Xhosa' },
  { text: 'My Item 4', country: 'United States of America', language: 'English' },
];

const searchFields = ['country', 'language'];

const Template: StoryFn<DropdownProps<never>> = storyArgs => ({
  components: { EcDropdown },
  setup() {
    const model = ref<DropdownItem<never> | undefined>();
    const args = ref({});

    watchEffect(() => {
      const { modelValue, ...rest } = storyArgs;
      model.value = modelValue;
      args.value = rest;
    });

    return {
      args,
      model,
      onCta: action('cta'),
      onChange: action('change'),
      onFocus: action('focus'),
      onOpen: action('open'),
      onClose: action('close'),
      onSearchChange: action('search-change'),
    };
  },
  template: `
    <div class="tw-p-20">
      <p v-if="model">{{ model.text }}</p>
      <p v-else>Selected item: None</p>
      <div style="width: 300px;">
        <ec-dropdown
          v-bind="args"
          v-model="model"
          v-on="{
            change: onChange,
            focus: onFocus,
            open: onOpen,
            close: onClose,
            searchChange: onSearchChange
          }"
        >
          <template #cta>
            <a href="#" class="tw-block tw-py-8 tw-px-16" @click.prevent="onCta">Do something</a>
          </template>
        </ec-dropdown>
      </div>
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  label: 'Dropdown label',
  placeholder: 'Select item',
  searchPlaceholder: 'Search...',
  noResultsText: 'No results found',
  items: defaultItems,
  isSearchEnabled: true,
  isLoading: false,
  disabled: false,
  isSensitive: false,
  errorMessage: '',
  modelValue: undefined,
};

export const all: StoryFn = args => ({
  components: { EcDropdown },
  setup() {
    const itemsIncludingEmpty = ref<DropdownItem<never>[]>([{ text: '' }, ...defaultItems]);
    const selected = ref<DropdownItem<never>>();
    const disabledModel = ref<DropdownItem<never>>(defaultItems[1]);
    const items = ref<DropdownItem<never>[]>(defaultItems);

    return {
      args,
      items,
      itemsIncludingEmpty,
      selected,
      disabledModel,
      searchFields,
      complexItems,
      onCta: action('CTA'),
    };
  },
  template: `
    <div class="tw-p-20">
      <h2>Single</h2>
      <div class="tw-flex-grid">
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            label="Single value"
            placeholder="Single value"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            label="Single value - with search"
            placeholder="Single value - with search"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            label="Single value - with error"
            placeholder="Single value - with error"
            error-message="Something went wrong"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            disabled
            label="Single value - disabled"
            placeholder="Single value - disabled"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            disabled
            label="Single value - disabled and preselected"
            placeholder="Single value - disabled and preselected"
            v-model="disabledModel">
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="itemsIncludingEmpty"
            label="Single value - with empty item"
            placeholder="Single value - with empty item"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            label="Single value - with CTA"
            placeholder="Single value - with CTA"
            v-model="selected">
            <template #cta>
              <a href="#" @click.prevent="onCta" class="tw-block tw-py-8 tw-px-16">Do something</a>
            </template>
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            label="Single value - custom template"
            placeholder="Single value - custom template"
            v-model="selected">
            <template #item="{ item, index, isSelected }">
              <div>00{{ index }}. {{ item.text }}</div>
              <div>{{ item.disabledReason }}</div>
              <div v-if="isSelected">This item is selected</div>
            </template>
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="complexItems"
            :search-fields="searchFields"
            is-search-enabled
            label="Single value - extended search options"
            placeholder="Single value - extended search options"
            v-model="selected">
            <template #item="{ item, index, isSelected }">
              <div>{{ index }}. {{ item.text }}</div>
              <div>{{ item.country }} | {{ item.language }}</div>
            </template>
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="true"
            label="Single value - with CTA/Loading/Search"
            placeholder="Single value - with CTA/Loading/Search"
            :is-loading="true"
            tooltip-cta="Random tooltip cta"
            v-model="selected">
            <template #cta>
              <a href="#" @click.prevent="onCta" style="display: block; padding: 8px 16px;">Do something</a>
            </template>
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-4">
          <ec-dropdown
            :items="items"
            :is-search-enabled="false"
            label="Single value with tooltip in the label"
            placeholder="Single value with tooltip in the label"
            label-tooltip="This is a tooltip"
            v-model="selected">
          </ec-dropdown>
        </div>
        <div class="tw-flex-col-12 tw-p-12">
          Selected value: {{ selected }}
        </div>
      </div>
    </div>
  `,
});

all.parameters = {
  controls: { disable: true },
};
