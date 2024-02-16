import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';

import EcIcon from '../ec-icon';
import EcDropdownSearch from './ec-dropdown-search.vue';
import type { DropdownSearchItem, DropdownSearchProps } from './types';

export default {
  title: 'Dropdown Search',
  component: EcDropdownSearch,
} as Meta;

const items: DropdownSearchItem<never>[] = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3', disabled: true, disabledReason: 'Is disabled for a reason' },
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' },
  { text: 'Item 5' },
  { text: 'Item 6' },
  { text: 'Item 7' },
];

interface MyComplexItem<T> extends DropdownSearchItem<T> {
  country: string,
  language: string,
}

const complexItems: MyComplexItem<never>[] = [
  { text: 'My Item 1', country: 'Spain', language: 'Spanish' },
  { text: 'My Item 2', country: 'England', language: 'English' },
  { text: 'My Item 3', country: 'South Africa', language: 'Xhosa' },
  { text: 'My Item 4', country: 'United States of America', language: 'English' },
];

const searchFields = ['country', 'language'] as const;

type EcDropdownSearchStory = StoryFn<DropdownSearchProps<never, DropdownSearchItem<never>> & {
  paragraphText: string,
}>;

export const all: EcDropdownSearchStory = storyArgs => ({
  components: { EcDropdownSearch, EcIcon },
  setup() {
    const paragraphText = ref('');
    const args = ref({});

    watchEffect(() => {
      const {
        paragraphText: paragraphTextFromArgs,
        ...rest
      } = storyArgs;
      paragraphText.value = paragraphTextFromArgs;
      args.value = rest;
    });

    const selectedItem = ref(null);

    const dropdowns = [
      {
        title: 'Basic',
        style: {},
        instructions: '',
      },
      {
        title: 'In a container with a dynamic width',
        style: {
          width: '300px',
          overflow: 'auto',
          resize: 'horizontal',
          border: '1px solid #ccc',
          backgroundColor: '#fafafa',
        },
        instructions: 'This is a block wrapper around the dropdown search. You can resize it and check how dropdown adapts.',
        hasParagraph: true,
      },
      {
        title: 'With custom item template',
        style: {},
        instructions: '',
        hasParagraph: true,
        hasCustomTemplate: true,
      },
    ];

    const argsComplex: DropdownSearchProps<never, MyComplexItem<never>> = {
      noResultsText: 'No results found',
      items: complexItems,
      searchFields,
      isSearchEnabled: true,
      maxVisibleItems: 3,
      disabled: false,
      isLoading: false,
      isSensitive: false,
    };

    return {
      dropdowns,
      selectedItem,
      paragraphText,
      argsComplex,
      args,
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-p-12">
      <p v-if="selectedItem">Selected item: {{ selectedItem.text }}</p>
      <p v-else>Selected item: None</p>
      <div v-for="(dropdownSearch, index) in dropdowns" :key="index" class="tw-my-20">
        <h3>{{ dropdownSearch.title }}</h3>
        <div :style="dropdownSearch.style">
          <p class="tw-mb-8"><strong>{{ dropdownSearch.instructions }}</strong></p>
          <ec-dropdown-search
            v-bind="args"
            v-model="selectedItem"
            :popover-options="dropdownSearch.popoverOptions"
            v-on="{ change: onChange }"
          >
            <a href="#" @click.prevent>
              <span>Open</span>
              <ec-icon name="simple-arrow-drop-down" :size="16" class="tw-fill-current" />
            </a>
            <template v-if="dropdownSearch.hasCustomTemplate" #item="{ item, index, isSelected }">
              <div>{{ index + 1 }}. {{ item.text }}</div>
              <!-- using item.disabledReason in the next line breaks the example code in docs mode -->
              <strong>{{ item['disabledReason'] }}</strong>
              <div v-if="isSelected">This item is selected</div>
            </template>
          </ec-dropdown-search>
          <p v-if="dropdownSearch.hasParagraph" class="tw-mt-16">{{ paragraphText }}</p>
        </div>
      </div>

      <div class="tw-my-20">
        <h3>Search with multiple search categories</h3>
        <ec-dropdown-search
          v-bind="argsComplex"
          v-model="selectedItem"
          v-on="{ change: onChange }"
        >
          <a href="#" @click.prevent>
            <span>Open</span>
            <ec-icon name="simple-arrow-drop-down" :size="16" class="tw-fill-current" />
          </a>
          <template #item="{ item, index, isSelected }">
            <div>{{ item.text }}</div>
            <strong>{{ item.country }}</strong>
            <div>{{ item.language }}</div>
          </template>
        </ec-dropdown-search>
      </div>
    </div>
  `,
});

all.args = {
  noResultsText: 'No results found',
  items,
  isSearchEnabled: true,
  maxVisibleItems: 3,
  disabled: false,
  isLoading: false,
  isSensitive: false,
  paragraphText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Consequat interdum varius sit amet mattis vulputate enim nulla. Eget mi proin sed libero enim sed faucibus turpis.',
};

