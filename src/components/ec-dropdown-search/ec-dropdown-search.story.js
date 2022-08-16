import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

import EcIcon from '../ec-icon';
import EcDropdownSearch from './ec-dropdown-search.vue';

export default {
  title: 'Dropdown Search',
  component: EcDropdownSearch,
};

const items = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3', disabled: true, disabledReason: 'Is disabled for a reason' },
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' },
  { text: 'Item 5' },
  { text: 'Item 6' },
  { text: 'Item 7' },
];

export const all = ({ paragraphText, ...args }) => ({
  components: { EcDropdownSearch, EcIcon },
  setup() {
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

    return {
      dropdowns,
      selectedItem,
      paragraphText,
      args,
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-12" >
          <p v-if="selectedItem">Selected item: {{ selectedItem.text }}</p>
          <p v-else>Selected item: None</p>
          <div v-for="(dropdownSearch, index) in dropdowns" :key="index" class="tw-my-20">
            <h3>{{ dropdownSearch.title }}</h3>
            <div :style="dropdownSearch.style">
              <p class="tw-mb-8"><strong>{{ dropdownSearch.instructions }}</strong></p>
              <ec-dropdown-search
                v-bind="args"
                :popover-options="dropdownSearch.popoverOptions"
                v-model="selectedItem"
                v-on="{ change: onChange }">
                <a href="#" @click.prevent>
                  <span>Open</span>
                  <ec-icon name="simple-arrow-drop-down" :size="16" class="tw-fill-current" />
                </a>
                <template v-if="dropdownSearch.hasCustomTemplate" #item="{ item, index, isSelected }">
                  <div>{{ index + 1 }}. {{ item.text }}</div>
                  <strong>{{ item.disabledReason }}</strong>
                  <div v-if="isSelected">This item is selected</div>
                </template>
              </ec-dropdown-search>
              <p v-if="dropdownSearch.hasParagraph" class="tw-mt-16">{{ paragraphText }}</p>
            </div>
          </div>
        </div>
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
